const API_URL = "http://localhost:8080/admin";

export const loginAdmin = async(admin)=>{

    const response = await fetch(`${API_URL}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(admin)
    });

    return await response.json();
};
export const updatePassword = async (admin) => {

    const response = await fetch(`${API_URL}/password`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
    });

    return await response.json();
};
export const getAdmin = async()=>{

    const response = await fetch(`${API_URL}/current`);

    return await response.json();

};