const client = require("../Client");
const router = require("express").Router();
const { randomUUID } = require("crypto");

router.put("/", async (req, res) => {
  const { data } = req.body;
  const {
    id,
    time,
    customerId,
    locationId,
    appointmentSegments,
  } = data;

  try {
    const response = await client.bookingsApi.updateBooking(id, {
      idempotencyKey: randomUUID(),
      booking: {
        startAt: time.startAt,
        locationId: locationId,
        customerId: customerId,
        appointmentSegments: [
          {
            durationMinutes: appointmentSegments[0].durationMinutes,
            serviceVariationId: appointmentSegments[0].serviceVariationId,
            teamMemberId: appointmentSegments[0].teamMemberId,
            serviceVariationVersion:
              appointmentSegments[0].serviceVariationVersion,
          },
        ],
      },
    });

    res.send(response.result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
