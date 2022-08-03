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
  const { sourceId, amount, bookId } = req.body;
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
    console.log(error);
  }
});

module.exports = router;
