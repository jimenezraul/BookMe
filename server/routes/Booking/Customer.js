const client = require("../Client");
const date = require("date-and-time");
const { Auth } = require("../../utils/Auth");

const router = require("express").Router();

// Get customer by email
router.post("/", async (req, res) => {
  const { given_name, family_name, email, phoneNumber } = req.body;

  if (!email) {
    res.status(400).send({
      error: "Email is required",
    });
    return;
  }
  let customer;
  try {
    const response = await client.customersApi.searchCustomers({
      query: {
        filter: {
          emailAddress: {
            exact: email
          },
        },
      },
    });
    customer = response.result;
  } catch (error) {
    console.log(error);
  }

  if (Object.keys(customer).length === 0) {
    try {
      const response = await client.customersApi.createCustomer({
        idempotencyKey: randomUUID(),
        givenName: given_name,
        familyName: family_name,
        emailAddress: email.toLowerCase(),
        phoneNumber: `+1${phoneNumber}`,
      });

      customer = response.result.customer;
    } catch (error) {
      console.log(error);
    }
  } else {
    customer = customer.customers[0];
  }

  res.send(customer);
});

// Get booking by customer id
router.get("/booking/:customerId", async (req, res) => {
  const id = req.params.customerId;
  const location = req.body.location;

  const now = new Date();

  try {
    const response = await client.bookingsApi.listBookings(
      20,
      "",
      "",
      location,
      now.toISOString()
    );

    // Customer's booking
    const booking = response.result.bookings.filter(
      (booking) => booking.customerId === id && booking.status === "ACCEPTED"
    );

    // All services
    let services = await client.catalogApi.searchCatalogItems({
      productTypes: ["APPOINTMENTS_SERVICE"],
    });

    services = services.result.items;

    // Customer's booking services
    const data = booking.map((b) => {
      const start = new Date(b.startAt);
      // List of ids in customer's booking
      const serviceVariationIds = b.appointmentSegments.map(
        (segment) => segment.serviceVariationId
      );
      // Filter services by ids
      const filteredData = services
        .map((item) => {
          return item.itemData.variations.filter((variation) => {
            return serviceVariationIds.includes(variation.id);
          });
        })
        .flat();
      return {
        ...b,
        appointments: filteredData,
        appointmentDate: date.format(start, "ddd, MMM DD YYYY"),
        appointmentTime: date.format(start, "hh:mm A"),
      };
    });

    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
