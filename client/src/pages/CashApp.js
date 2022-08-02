import { useEffect, useRef, useState } from "react";
import { Card } from "react-daisyui";
import { useSelector, useDispatch } from "react-redux";
import {
  appointment,
  setAppointment,
} from "../app/storeSlices/appointments/appointmentSlice";
import { idbPromise } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const CashApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appointments = useSelector(appointment);

  useEffect(() => {
    async function appointments() {
      const appointLocal = await idbPromise("appointments", "get");
      if (appointLocal.length > 0) {
        dispatch(setAppointment(appointLocal[0]));
        return;
      }
      navigate("/booknow");
    }
    appointments();
  }, [dispatch, navigate]);

  const paymentForm = useRef();
  const paymentAmount = useRef();
  const cashAppPayEl = useRef();
  const paymentStatus = useRef();
  const [containerStatus, setContainerStatus] = useState("");

  var amount = appointments?.price.toString();

  const appId = "sandbox-sq0idb-uc1hM_aoBdq14A5bJynh9Q";
  const locationId = "L9XMGJMVQGY2D";

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
    await cashAppPay.attach(cashAppPayEl.current, buttonOptions);
    return cashAppPay;
  }

  async function createPayment(token) {
    const body = JSON.stringify({
      amount: amount,
      sourceId: token,
    });

    const paymentResponse = await fetch(
      "http://localhost:3001/api/payments/cashapp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    if (paymentResponse.ok) {
      return paymentResponse.json();
    }

    const errorBody = await paymentResponse.text();
    throw new Error(errorBody);
  }

  // status is either SUCCESS or FAILURE;
  function displayPaymentResults(status) {
    if (status === "SUCCESS") {
      setContainerStatus("is-success");
    } else {
      setContainerStatus("is-failure");
    }
  }

  useEffect(() => {
    async function Initialize() {
      paymentAmount.current.innerHTML = "Pay $" + amount;

      if (!window.Square) {
        throw new Error("Square.js failed to load properly");
      }

      let payments;
      try {
        payments = window.Square.payments(appId, locationId);
      } catch {
        const statusContainer = paymentStatus.current;
        statusContainer.className = "missing-credentials";
        statusContainer.style.visibility = "visible";
        return;
      }

      let cashAppPay;

      cashAppPay = await initializeCashApp(payments);

      if (cashAppPay) {
        cashAppPay.addEventListener(
          "ontokenization",
          async function ({ detail }) {
            const tokenResult = detail.tokenResult;
            if (tokenResult.status === "OK") {
              const paymentResults = await createPayment(tokenResult.token);

              displayPaymentResults("SUCCESS");
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
  }, [appointments]);

  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container mt-10'>
        <Card className='bg-base-300'>
          <Card.Body>
            <form ref={paymentForm}>
              <p ref={paymentAmount}></p>
              <div ref={cashAppPayEl}></div>
            </form>
            <div
              ref={paymentStatus}
              className={`${containerStatus !== "" && containerStatus}`}
            ></div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default CashApp;
