export const updateBooking = async (bookingData) => {
  try {
    const response = await fetch("/api/update-booking", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
