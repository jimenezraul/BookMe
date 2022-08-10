export const creditcardPayment = async (service, customer) => {
  const url = "/api/payments/creditcard";
  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service: service,
        customerId: customer.id,
      }),
    });

    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
