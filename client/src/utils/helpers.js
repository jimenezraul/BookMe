export function formatPhoneNumber(phoneNumberString, prevousValue) {
  if (phoneNumberString.length < prevousValue.length) {
    return phoneNumberString;
  }
  // if number contains ( and - ) remove them
  if (phoneNumberString.includes("(") && phoneNumberString.includes(")")) {
    phoneNumberString = phoneNumberString.replace(/[()]/g, "");
  }
  // if number contains - remove them
  if (phoneNumberString.includes("-")) {
    phoneNumberString = phoneNumberString.replace(/-/g, "");
  }
  const phone = phoneNumberString
    .replace(/\D/g, "")
    .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

  return `(${phone[1]}) ${phone[2]}-${phone[3]}`;
}

export function validation(value, type) {
  // validate first name, last name, email, phone
  if (type === "firstName") {
    if (value.length < 3) {
      return "First name must be at least 3 characters";
    }
  }
  if (type === "lastName") {
    if (value.length < 3) {
      return "Last name must be at least 3 characters";
    }
  }
  if (type === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Invalid email address";
    }
  }
  if (type === "phone") {
    if (value.length < 14) {
      return "Phone number must be at least 10 Digits";
    }

    if (!/^\(\d{3}\)\s\d{3}-\d{4}$/.test(value)) {
      return "Invalid phone number";
    }
  }
  return "";
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to the database `shop-shop` with the version of 1
    const request = window.indexedDB.open("salon", 1);

    // create variables to hold reference to the database, transaction (tx), and object store
    let db, tx, store;

    // if version has changed (or if this is the first time using the database), run this method and create the three object stores
    request.onupgradeneeded = function (e) {
      const db = request.result;
      // create object store for each type of data and set "primary" key index to be the `id` of the data
      db.createObjectStore("appointments", { keyPath: "id" });
      db.createObjectStore("guest", { keyPath: "id" });
    };

    // handle any errors with connecting
    request.onerror = function (e) {
      console.log("There was an error");
    };

    // on database open success
    request.onsuccess = function (e) {
      // save a reference of the database to the `db` variable
      db = request.result;
      // open a transaction do whatever we pass into `storeName` (must match one of the object store names)
      tx = db.transaction(storeName, "readwrite");
      // save a reference to that object store
      store = tx.objectStore(storeName);

      // if there's any errors, let us know
      db.onerror = function (e) {
        console.log("error", e);
      };

      switch (method) {
        case "put":
          store.put(object);
          resolve(object);
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          store.delete(object.id);
          break;
        default:
          console.log("No valid method");
          break;
      }

      // when the transaction is complete, close the connection
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}

export function cashAppInit(
  amount,
  cashAppPayEl,
  cashAppPriceDiv,
  cachAppContainer,
  setStatus
) {
  const appId = "sandbox-sq0idb-uc1hM_aoBdq14A5bJynh9Q";
  const locationId = "L9XMGJMVQGY2D";

  if (amount === undefined) {
    return;
  }

  function buildPaymentRequest(payments) {
    const paymentRequest = payments.paymentRequest({
      countryCode: "US",
      currencyCode: "USD",
      total: {
        amount: amount,
        label: "Total",
      },
    });
    return paymentRequest;
  }

  async function initializeCashApp(payments) {
    const paymentRequest = buildPaymentRequest(payments);

    const cashAppPay = await payments.cashAppPay(paymentRequest, {
      redirectURL: window.location.href,
      referenceId: "my-website-00000001",
    });

    const buttonOptions = {
      shape: "semiround",
      width: "full",
    };
    try {
      await cashAppPay.attach(cashAppPayEl, buttonOptions);
    } catch (e) {
      const error_msg = e.message;
      if (error_msg.match("already rendered")) {
        await cashAppPay.destroy();
        await cashAppPay.attach(cashAppPayEl, buttonOptions);
      }
    }

    return cashAppPay;
  }

  async function createPayment(token) {
    const body = JSON.stringify({
      amount: amount,
      sourceId: token,
    });

    const paymentResponse = await fetch("/api/payments/cashapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (paymentResponse.ok) {
      return paymentResponse.json();
    }

    const errorBody = await paymentResponse.text();
    throw new Error(errorBody);
  }

  // status is either SUCCESS or FAILURE;
  function displayPaymentResults(status) {
    if (status === "SUCCESS") {
      console.log("success");
    } else {
      console.log("failure");
    }
  }

  async function Initialize() {
    if (!window.Square) {
      throw new Error("Square.js failed to load properly");
    }

    let payments;
    try {
      payments = window.Square.payments(appId, locationId);
    } catch {
      const statusContainer = cachAppContainer;
      statusContainer.className = "missing-credentials";
      statusContainer.style.visibility = "visible";
      return;
    }

    let cashAppPay;

    try {
      cashAppPay = await initializeCashApp(payments);
    } catch (error) {
      console.log("initializing CashApp", error);
    }

    if (cashAppPay) {
      cashAppPay.addEventListener(
        "ontokenization",
        async function ({ detail }) {
          const tokenResult = detail.tokenResult;
          if (tokenResult.status === "OK") {
            const paymentResults = await createPayment(tokenResult.token);
            displayPaymentResults("SUCCESS");
            setStatus("success");
            console.debug("Payment Success", paymentResults);
          } else {
            let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;

            if (tokenResult.errors) {
              errorMessage += ` and errors: ${JSON.stringify(
                tokenResult.errors
              )}`;
            }
            displayPaymentResults("FAILURE");
            throw new Error(errorMessage);
          }
        }
      );
    }
  }
  Initialize();
}
