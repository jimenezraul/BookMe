const client = require("../Client");
const { randomUUID } = require("crypto");
const { Auth } = require("../../utils/Auth");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const response = await client.paymentsApi.listPayments();
    res.send(response.result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const response = await client.paymentsApi.getPayment(req.params.id);
    res.send(response.result);
  } catch (error) {
    console.log(error);
  }
});

// CashApp Pay
router.post("/cashapp", async (req, res) => {
  const { sourceId, amount} = req.body;
  const amountInCents = Math.round(parseFloat(amount) * 100);

  try {
    const response = await client.paymentsApi.createPayment({
      sourceId: sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: amountInCents,
        currency: "USD",
      },
    });

    res.send(response.result);
  } catch (error) {
    console.log(error.message);
  }
});

// Credit Card Pay
router.post("/creditcard", async (req, res) => {
  const { service, customerId } = req.body;
  const url = new URL(req.headers.referer).origin;

  if (!service) {
    res.status(400).send("Missing service");
    return;
  }

  try {
    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: randomUUID(),
      order: {
        locationId: service.time.locationId,
        customerId: customerId,
        lineItems: [
          {
            name: service.category,
            quantity: "1",
            variationName: service.itemVariationData.name,
            basePriceMoney: {
              amount: service.itemVariationData.priceMoney.amount,
              currency: "USD",
            },
          },
        ],
      },
      checkoutOptions: {
        allowTipping: true,
        redirectUrl: `${url}/payment/success`,
        askForShippingAddress: false,
        acceptedPaymentMethods: {
          applePay: true,
          googlePay: true,
          afterpayClearpay: true,
        },
      },
    });

    res.send(response.result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
