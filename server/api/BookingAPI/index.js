const router = require("express").Router();

router.get("/appointments", (req, res) => {
  res.send({
    appointments: [
      {
        id: 1,
        name: "John Doe",
        date: "2020-01-01",
        time: "12:00",
        service: "Haircut",
        stylist: "Jane Doe",
        status: "Confirmed",
      },
    ],
  });
});

module.exports = router;
