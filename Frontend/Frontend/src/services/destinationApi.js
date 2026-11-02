const API_URL = "http://localhost:8080/destination";


export const getAllDestinations = async () => {
    const response = await fetch(`${API_URL}/find/all`);
    return await response.json();
};

export const saveDestination = async (destination) => {

    const formData = new FormData();

    formData.append(
        "destination",
        new Blob(
            [
                JSON.stringify({
                    titleBs: destination.titleBs,
                    titleEn: destination.titleEn,
                    typeBs: destination.typeBs,
                    typeEn: destination.typeEn,
                    price: destination.price,
                    totalSeats: destination.totalSeats,
                    bookedSeats: destination.bookedSeats || 0,
                    departure: destination.departure,
                    returnDate: destination.returnDate,
                    nights: destination.nights,
                    itineraryBs: destination.itineraryBs,
                    itineraryEn: destination.itineraryEn,

                    continent: {
                        id: destination.continent.id
                    }
                })
            ],
            {
                type: "application/json"
            }
        )
    );

    if(destination.imageFile){
        formData.append(
            "image",
            destination.imageFile
        );
    }
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        body: formData
    });


    return await response.json();
};
export const deleteDestination = async (id) => {
    const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Greška prilikom brisanja destinacije");
    }
};
export const updateDestination = async (destination) => {

    const formData = new FormData();

    formData.append(
        "destination",
        new Blob(
            [JSON.stringify(destination)],
            { type: "application/json" }
        )
    );
    if(destination.imageFile){
        formData.append(
            "image",
            destination.imageFile
        );
    }
    const response = await fetch(

        `${API_URL}/${destination.id}`,

        {
            method: "PUT",
            body: formData
        }

    );
    return await response.json();
};
