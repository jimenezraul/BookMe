export const getOrCreate = async (client) => {
  let customer;
  try {
    const response = await fetch("/api/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...client[0] }),
    });
   
    if (response.ok) {
      customer = await response.json();
    }
  } catch (error) {
    console.log(error);
  }
  return customer;
};
