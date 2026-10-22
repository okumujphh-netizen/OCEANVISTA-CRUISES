import { getCruises } from "./api.js";

const cruiseList = document.getElementById("cruise-list");
const cruiseStatus = document.getElementById("cruise-status");

async function displayCruises() {
    try {
        cruiseStatus.textContent = "loading cruises...";

        const cruises = await getCruises();
        console.log("Cruises received:", cruises);

        cruiseList.replaceChildren();

        if (cruises.length === 0) {
            cruiseStatus.textContent = "No cruises are available right now";
            return;
        }

        cruises.forEach((cruise) => {
            const card = document.createElement("article");
            card.className = "cruise-card";

            const name = document.createElement("h3");
            name.textContent = cruise.name;

            const destination = document.createElement("p");
            destination.textContent = `Destination ${cruise.destination}`;

            const port = document.createElement("p");
            port.textContent = `Depature port: ${cruise.departurePort}`;

            const duration = document.createElement("p");
            duration.textContent = `Duration: ${cruise.duration} days`;

            const price = document.createElement("p");
            price.textContent = `price: $${cruise.price.toLocaleString()}`;

            const date = document.createElement("p");
            date.textContent = `Departure date : ${cruise.departureDate}`;


            card.append(name, destination, port, duration, price, date);
            cruiseList.appendChild(card);



        });

        cruiseStatus.textContent = `${cruises.length} cruises available.`;



    } catch (error) {
        cruiseStatus.textContent =
            "we couldnt load cruises please try again.";
        console.error("unable to display cruises:", error);
    }
}

displayCruises();