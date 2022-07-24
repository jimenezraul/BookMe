const client = require("../Client");
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const router = require("express").Router();

// All Staff
router.get("/", async (req, res) => {
  try {
    const response = await client.bookingsApi.listTeamMemberBookingProfiles(
      true
    );

    res.send(response.result);
  } catch (error) {
    console.log(error);
  }
});

// Staff by id
router.get("/:id", async (req, res) => {
  try {
    const response = await client.bookingsApi.listTeamMemberBookingProfiles(
      true
    );

    const barber = response.result.teamMemberBookingProfiles.find(
      (staff) => staff.teamMemberId === req.params.id
    );

    res.send(barber);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
