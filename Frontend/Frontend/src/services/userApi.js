const PASSENGER_URL = "http://localhost:8080/passenger";
export const getAllPassengers = async () => {
    const response = await fetch(
        `${PASSENGER_URL}/find/details`
    );
    return await response.json();
};
export const savePassenger = async (formData) => {
    const response = await fetch(
        `${PASSENGER_URL}/save`,
        {
            method: "POST",
            body: formData
        }
    );
    return await response.json();
};
export const deletePassenger = async (id) => {
    await fetch(
        `${PASSENGER_URL}/delete/${id}`,
        {
            method: "DELETE"
        }
    );
};
export const updatePassenger = async (passenger) => {
    const response = await fetch(
        `${PASSENGER_URL}/${passenger.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(passenger)
        }
    );
    return await response.json();
};