const client = require("../Client");
const router = require("express").Router();
const date = require("date-and-time");

router.get("/", async (req, res) => {
  const { staff, services, selectedDate } = req.query;
  try {
    const response = await client.bookingsApi.searchAvailability({
      query: {
        filter: {
          startAtRange: {
            startAt: `${selectedDate}T00:00:00z`,
            endAt: `${selectedDate}T24:00:00z`,
          },
          locationId: "L9XMGJMVQGY2D",
          segmentFilters: [
            {
              serviceVariationId: services,
              teamMemberIdFilter: {
                any: [staff],
              },
            },
          ],
        },
      },
    });
    response.result.availabilities.map((availability) => {
      const startTime = new Date(availability.startAt);
      availability.open = date.format(startTime, "h:mm A");
      // format date to Wed, Jan 1, 2020
      const day = new Date(availability.startAt);
      availability.date = date.format(day, "dddd, MMM D, YYYY");
    });

    res.send(response.result.availabilities);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
