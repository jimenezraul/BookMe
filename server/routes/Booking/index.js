const router = require("express").Router();

const services = require("./Services");
const staff = require("./Staff");
const payments = require("./Payments");
const customer = require("./Customer");
const locations = require("./Locations");

router.use("/services", services);
router.use("/staff", staff);
router.use("/payments", payments);
router.use("/customer", customer);
router.use("/locations", locations);

module.exports = router;
