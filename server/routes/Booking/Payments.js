const client = require("../Client");
const { randomUUID } = require("crypto");

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

router.post("/cashapp", async (req, res) => {
  const uuid = randomUUID();
  const { sourceId, amount } = req.body;
  const amountInCents = Math.round(parseFloat(amount) * 100);

  try {
    const response = await client.paymentsApi.createPayment({
      sourceId: sourceId,
      idempotencyKey: uuid,
      amountMoney: {
        amount: amountInCents,
        currency: "USD",
      },
    });

    console.log(response.result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
