const router = require("express").Router();

const services = require("./Services");
const staff = require("./Staff");
const payments = require("./Payments");

router.use("/services", services);
router.use("/staff", staff);
router.use("/payments", payments);

module.exports = router;
