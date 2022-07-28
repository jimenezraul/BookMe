const client = require("../Client");
const router = require("express").Router();
const date = require("date-and-time");

// Get all Business locations
router.get("/", async (req, res) => {
  try {
    const response = await client.locationsApi.listLocations();

    response.result.locations.map((location) => {
      location.businessHours.periods.forEach((day) => {
        // Format open time
        day.open = date.format(
          date.parse(day.startLocalTime, "HH:mm:ss"),
          "h:mm A"
        );
        // Format close time
        day.close = date.format(
          date.parse(day.endLocalTime, "HH:mm:ss"),
          "h:mm A"
        );
      });
      return location;
    });
    // filter out locations that status is not active
    const activeLocations = response.result.locations.filter(
      (location) => location.status === "ACTIVE"
    );

    res.send(activeLocations);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
