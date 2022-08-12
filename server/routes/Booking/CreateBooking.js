const client = require("../Client");
const router = require("express").Router();
const { randomUUID } = require("crypto");

async function getOrCreateCustomer(user) {
  let customer;
  try {
    const response = await client.customersApi.searchCustomers({
      query: {
        filter: {
          emailAddress: {
            exact: user.email,
          },
        },
      },
    });
    customer = response.result;
  } catch (error) {
    console.log(error);
  }

  let phone;
  if (user.phoneNumber) {
    phone = { phoneNumber: `+1${user.phoneNumber}` };
  }

  if (Object.keys(customer).length === 0) {
    try {
      const response = await client.customersApi.createCustomer({
        idempotencyKey: randomUUID(),
        givenName: user.given_name,
        familyName: user.family_name,
        emailAddress: user.email.toLowerCase(),
        ...phone,
      });

      customer = response.result.customer;
    } catch (error) {
      console.log(error);
    }
  } else {
    customer = customer.customers[0];
  }
  return customer;
}

router.post("/", async (req, res) => {
  const { data } = req.body;
  const { payment, guest, appointment } = data;

  if (!data) {
    res.status(400).send({
      error: "Data is required",
    });
    return;
  }

  let customer;

  try {
    const response = await getOrCreateCustomer(guest);
    customer = response;
  } catch (error) {
    console.log(error);
  }

  const {
    durationMinutes,
    serviceVariationId,
    serviceVariationVersion,
    teamMemberId,
  } = appointment.time.appointmentSegments[0];

  const { receiptNumber, receiptUrl, totalMoney } = payment || {};
  const { startAt, locationId } = appointment.time;

  // distructor payment if payment is not null

  let sellerNote = "";
  if (payment) {
    sellerNote = `Receipt Number: ${receiptNumber} | Receipt Link: ${receiptUrl} | Total: $${
      totalMoney.amount / 100
    }`;
  }

  try {
    const response = await client.bookingsApi.createBooking({
      idempotencyKey: randomUUID(),
      booking: {
        startAt: startAt,
        locationId: locationId,
        customerId: customer.id,
        sellerNote: sellerNote,
        appointmentSegments: [
          {
            durationMinutes: durationMinutes,
            serviceVariationId: serviceVariationId,
            teamMemberId: teamMemberId,
            serviceVariationVersion: serviceVariationVersion,
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
