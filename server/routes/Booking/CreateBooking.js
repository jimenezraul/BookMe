const client = require("../Client");
const router = require("express").Router();
const { randomUUID } = require("crypto");

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
    const response = await client.customersApi.searchCustomers({
      query: {
        filter: {
          emailAddress: {
            exact: guest.emailAddress,
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
        givenName: guest.givenName,
        familyName: guest.familyName,
        emailAddress: guest.emailAddress.toLowerCase(),
        phoneNumber: `+1${guest.phoneNumber}`,
      });

      customer = response.result.customer;
    } catch (error) {
      console.log(error);
    }
  } else {
    customer = customer.customers[0];
  }

  const {
    durationMinutes,
    serviceVariationId,
    serviceVariationVersion,
    teamMemberId,
  } = appointment.time.appointmentSegments[0];

  const { receiptNumber, receiptUrl, totalMoney } = payment;
  const { startAt, locationId } = appointment.time;

  try {
    const response = await client.bookingsApi.createBooking({
      idempotencyKey: randomUUID(),
      booking: {
        startAt: startAt,
        locationId: locationId,
        customerId: customer.id,
        sellerNote: `Receipt Number: ${receiptNumber} Receipt Link: ${receiptUrl} Total: $${
          totalMoney.amount / 100
        }`,
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
