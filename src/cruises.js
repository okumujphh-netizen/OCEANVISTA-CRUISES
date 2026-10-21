import { getCruises } from "./api.js";

const cruiseList = document.getElementById("cruise-list");
const cruiseStatus = document.getElementById("cruise-status");

async function displayCruises() {
    try {
        cruiseStatus.textContent = "loading cruises...";

        const cruises = await getCruises();

        cruiseList.list.replaceChildren();

        if (cruises.length === 0) {
            cruiseStatus.textContent = "No cruises are available right now";
            return;
        }

        cruiseList.forEach((cruise)=>{
            const card = document.createElement("article")
        })

  
    }
}