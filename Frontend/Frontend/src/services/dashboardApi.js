const API_URL="http://localhost:8080/dashboard";
export const getDashboard = async()=>{
    const response =
        await fetch(API_URL);
    return response.json();
}