
import { getCruises } from "./api.js";

const cruiseList = document.getElementById("cruise-list");
const cruiseStatus = document.getElementById("cruise-status");
const destinationFilter = document.getElementById("destination-filter");

let allCruises = [];

// Display the cruise cards on the page
function renderCruises(cruises) {
    cruiseList.replaceChildren();

    if (cruises.length === 0) {
        cruiseStatus.textContent = allCruises.length === 0
            ? "No cruises are available right now."
            : "No cruises match this destination.";
        return;
    }

    cruises.forEach((cruise) => {
        const card = document.createElement("article");
        card.className = "cruise-card";

        const name = document.createElement("h3");
        name.textContent = cruise.name;

        const destination = document.createElement("p");
        destination.textContent = `Destination: ${cruise.destination}`;

        const port = document.createElement("p");
        port.textContent = `Departure port: ${cruise.departurePort}`;

        const duration = document.createElement("p");
        duration.textContent = `Duration: ${cruise.duration} days`;

        const price = document.createElement("p");
        price.textContent = `Price: $${Number(cruise.price).toLocaleString()}`;

        const date = document.createElement("p");
        date.textContent = `Departure date: ${cruise.departureDate}`;

        card.append(name, destination, port, duration, price, date);
        cruiseList.appendChild(card);
    });

    cruiseStatus.textContent = `${cruises.length} cruises available.`;
}

// Add destinations from the API to the dropdown
function populateDestinationFilter() {
    if (!destinationFilter) return;

    const destinations = [
        ...new Set(allCruises.map((cruise) => cruise.destination))
    ];

    destinations.sort().forEach((destination) => {
        const option = document.createElement("option");
        option.value = destination;
        option.textContent = destination;
        destinationFilter.appendChild(option);
    });
}

// Filter cruises when a destination is selected
function filterCruises() {
    if (!destinationFilter) return;

    const selectedDestination = destinationFilter.value;

    const filteredCruises =
        selectedDestination === "all"
            ? allCruises
            : allCruises.filter(
                (cruise) => cruise.destination === selectedDestination
            );

    renderCruises(filteredCruises);
}

// Fetch the cruises from JSON Server
async function displayCruises() {
    try {
        cruiseStatus.textContent = "Loading cruises...";

        allCruises = await getCruises();
        console.log("Cruises received:", allCruises);

        populateDestinationFilter();
        renderCruises(allCruises);

        if (destinationFilter) {
            destinationFilter.addEventListener("change", filterCruises);
        }
    } catch (error) {
        cruiseList.replaceChildren();
        cruiseStatus.textContent =
            "We couldn't load cruises. Please try again later.";

        console.error("Unable to display cruises:", error);
    }
}

displayCruises();
