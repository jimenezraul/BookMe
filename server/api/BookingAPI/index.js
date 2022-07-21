const router = require("express").Router();

const services = require("./Services");
const staff = require("./Staff");

router.use("/services", services);
router.use("/staff", staff);

module.exports = router;