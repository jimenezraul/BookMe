const router = require("express").Router();

const booking = require("./BookingAPI");

router.use("/api", booking);

module.exports = router;