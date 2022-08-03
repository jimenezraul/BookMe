const router = require("express").Router();
const { randomUUID } = require("crypto");

router.post("/", async (req, res) => {
  const { data } = req.body;

  if (!data) {
    res.status(400).send({
      error: "Data is required",
    });
    return;
  }

  try {
    // const response = await client.bookingsApi.createBooking({
    //   idempotencyKey: randomUUID(),
    //   booking: {
    //     startAt: "2022-07-21T14:17:10.625Z",
    //     locationId: "L9XMGJMVQGY2D",
    //     customerId: "QGJV5QF1VN6XBD785BRDCBHJ84",
    //     sellerNote: "hello",
    //     appointmentSegments: [
    //       {
    //         durationMinutes: 45,
    //         serviceVariationId: "LAUV3TA7EAHEWUGDJFR7L2DX",
    //         teamMemberId: "TMHdfpf00NyF44FX",
    //         serviceVariationVersion: 1658425207952,
    //       },
    //     ],
    //   },
    // });

    // console.log(response.result);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
