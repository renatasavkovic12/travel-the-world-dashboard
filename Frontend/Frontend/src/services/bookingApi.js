const API_URL = "http://localhost:8080/booking";
export const updateBooking = async (booking) => {
    const response = await fetch(
        `${API_URL}/${booking.id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(booking)
        }
    );
    return await response.json();
};
export const saveBooking = async (booking) => {
    const response = await fetch(
        `${API_URL}/save`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(booking)
        }
    );
    return await response.json();
};
export const deleteBooking = async (id) => {
  const response = await fetch(
    `http://localhost:8080/booking/delete/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Greška prilikom brisanja bookinga");
  }

  return response;
};