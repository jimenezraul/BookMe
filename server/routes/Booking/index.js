const router = require("express").Router();

const services = require("./Services");
const staff = require("./Staff");
const payments = require("./Payments");
const customer = require("./Customer");
const locations = require("./Locations");
const availablity = require("./Availability");
const createBooking = require("./CreateBooking");

router.use("/services", services);
router.use("/staff", staff);
router.use("/payments", payments);
router.use("/customer", customer);
router.use("/locations", locations);
router.use("/availability", availablity);
router.use("/create-booking", createBooking);

module.exports = router;
