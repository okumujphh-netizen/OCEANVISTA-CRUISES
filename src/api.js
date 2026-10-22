const API_URL = "http://localhost:3000";

//API FUNCTIONS

async function getCruises() {
    try {
        const response = await fetch(`${API_URL}/cruises`);

        if (!response.ok) {
            throw new Error("failed to fetch cruises");

        }

        return await response.json();

    } catch (error) {
        console.error("error fetching cruises:", error);
        throw error;
    }
}
//ADDED EXPORT FUNCTION
export { getCruises };