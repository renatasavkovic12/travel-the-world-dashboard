const API_URL = "http://localhost:8080/continent";

export const getAllContinents = async () => {
    const response = await fetch(`${API_URL}/find/all`);
    return await response.json();
};

export const saveContinent = async (formData) => {
    const response = await fetch(`${API_URL}/save`, {
        method: "POST",
        body: formData
    });

    return await response.json();
};
export const deleteContinent = async (id) => {
    await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE"
    });
};