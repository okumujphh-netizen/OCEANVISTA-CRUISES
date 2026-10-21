const API_URL = "http://localhost:3000";

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

export { getCruises };