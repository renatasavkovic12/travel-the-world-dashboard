const API_URL = "http://localhost:8080/review";
export const getAllReviews = async () => {

    const response = await fetch(`${API_URL}/find/all`);

    if(!response.ok){
        throw new Error("Greška prilikom učitavanja recenzija");
    }

    return await response.json();

};