const router = require("express").Router();

const booking = require("./Booking");

router.use("/api", booking);

module.exports = router;