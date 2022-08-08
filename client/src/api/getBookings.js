export const getBooking = async (client) => {
  let booking;
  
  try {
    const response = await fetch(
      `http://localhost:3001/api/customer/booking/${client}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      booking = await response.json();
    }
  } catch (error) {
    console.log(error);
  }
  return booking;
};
