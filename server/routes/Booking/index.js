const router = require("express").Router();

const services = require("./Services");
const staff = require("./Staff");
const payments = require("./Payments");
const customer = require("./Customer");

router.use("/services", services);
router.use("/staff", staff);
router.use("/payments", payments);
router.use("/customer", customer);

module.exports = router;
