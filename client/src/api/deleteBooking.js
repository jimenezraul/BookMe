export const deleteBooking = async (bookingId) => {
    try {
        const response = await fetch("/api/delete-booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ bookingId }),
        });
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
