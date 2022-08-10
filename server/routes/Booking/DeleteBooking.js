const Router = require("express").Router();
const { randomUUID } = require("crypto");
const client = require("../Client");

Router.post("/", async (req, res) => {
  const { bookingId } = req.body;
  
  try {
    const response = await client.bookingsApi.cancelBooking(bookingId, {
      idempotencyKey: randomUUID(),
    });
    
    res.send(response.result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Router;
