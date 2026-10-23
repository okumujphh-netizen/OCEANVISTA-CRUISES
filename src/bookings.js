
import {
    getCruises,
    getBookings,
    createBooking,
    deleteBooking
} from "./api.js";

import { validateBooking } from "./validation.js";

import {
    showMessage,
    clearElement,
    createTextElement
} from "./ui.js";

const bookingForm = document.getElementById("booking-form");
const cruiseSelect = document.getElementById("booking-cruise");
const bookingStatus = document.getElementById("booking-status");
const bookingsStatus = document.getElementById("bookings-status");
const bookingsList = document.getElementById("bookings-list");

let availableCruises = [];

// Load cruises into the booking dropdown
async function loadCruises() {
    try {
        availableCruises = await getCruises();

        cruiseSelect.replaceChildren();

        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Select a cruise";
        cruiseSelect.appendChild(placeholder);

        availableCruises.forEach((cruise) => {
            const option = document.createElement("option");

            option.value = cruise.id;
            option.textContent =
                `${cruise.name} — $${Number(cruise.price).toLocaleString()}`;

            cruiseSelect.appendChild(option);
        });
    } catch (error) {
        cruiseSelect.replaceChildren();

        const option = document.createElement("option");
        option.value = "";
        option.textContent = "Cruises could not be loaded";
        cruiseSelect.appendChild(option);

        cruiseSelect.disabled = true;

        showMessage(
            bookingStatus,
            "Unable to load cruises. Please try again later.",
            "error"
        );

        console.error("Unable to load cruises:", error);
    }
}

// Display all saved bookings
async function displayBookings() {
    try {
        showMessage(bookingsStatus, "Loading bookings...", "info");

        const bookings = await getBookings();

        clearElement(bookingsList);

        if (bookings.length === 0) {
            showMessage(
                bookingsStatus,
                "No bookings yet. Make your first booking above!",
                "info"
            );
            return;
        }

        bookings.forEach((booking) => {
            const card = document.createElement("article");
            card.className = "booking-card";

            const heading = createTextElement(
                "h3",
                booking.cruiseName || "Cruise booking"
            );

            const customer = createTextElement(
                "p",
                `Customer: ${booking.customerName}`
            );

            const email = createTextElement(
                "p",
                `Email: ${booking.customerEmail}`
            );

            const guests = createTextElement(
                "p",
                `Guests: ${booking.guests}`
            );

            const total = createTextElement(
                "p",
                `Estimated total: $${Number(booking.totalPrice).toLocaleString()}`
            );

            const deleteButton = createTextElement(
                "button",
                "Delete Booking",
                "delete-booking"
            );

            deleteButton.type = "button";
            deleteButton.dataset.bookingId = booking.id;
            deleteButton.setAttribute(
                "aria-label",
                `Delete booking for ${booking.customerName}`
            );

            card.append(
                heading,
                customer,
                email,
                guests,
                total,
                deleteButton
            );

            bookingsList.appendChild(card);
        });

        showMessage(
            bookingsStatus,
            `${bookings.length} booking(s) found.`,
            "success"
        );
    } catch (error) {
        showMessage(
            bookingsStatus,
            "Unable to load bookings. Please try again later.",
            "error"
        );

        console.error("Unable to load bookings:", error);
    }
}

// Handle booking form submissions
async function handleBookingSubmit(event) {
    event.preventDefault();

    const formData = new FormData(bookingForm);

    const booking = {
        customerName: formData.get("customerName").trim(),
        customerEmail: formData.get("customerEmail").trim(),
        cruiseId: formData.get("cruiseId"),
        guests: Number(formData.get("guests"))
    };

    const validation = validateBooking(booking);

    if (!validation.isValid) {
        showMessage(
            bookingStatus,
            validation.errors.join(" "),
            "error"
        );
        return;
    }

    const selectedCruise = availableCruises.find(
        (cruise) => String(cruise.id) === String(booking.cruiseId)
    );

    if (!selectedCruise) {
        showMessage(
            bookingStatus,
            "Please select a valid cruise.",
            "error"
        );
        return;
    }

    if (
        !Number.isFinite(Number(selectedCruise.price)) ||
        Number(selectedCruise.price) < 0
    ) {
        showMessage(
            bookingStatus,
            "This cruise has an invalid price and cannot be booked.",
            "error"
        );
        return;
    }

    booking.cruiseName = selectedCruise.name;
    booking.totalPrice = Number(selectedCruise.price) * booking.guests;
    booking.bookedAt = new Date().toISOString();

    const submitButton = bookingForm.querySelector(
        'button[type="submit"]'
    );

    submitButton.disabled = true;
    showMessage(bookingStatus, "Submitting your booking...", "info");

    try {
        await createBooking(booking);

        showMessage(
            bookingStatus,
            "Your booking was created successfully!",
            "success"
        );

        bookingForm.reset();

        await displayBookings();
    } catch (error) {
        showMessage(
            bookingStatus,
            "Booking failed. Please check your connection and try again.",
            "error"
        );

        console.error("Unable to create booking:", error);
    } finally {
        submitButton.disabled = false;
    }
}

// Handle booking deletion
async function handleBookingDelete(event) {
    const button = event.target.closest(".delete-booking");

    if (!button || !bookingsList.contains(button)) {
        return;
    }

    const bookingId = button.dataset.bookingId;

    if (!bookingId) {
        showMessage(bookingsStatus, "Invalid booking ID.", "error");
        return;
    }

    const confirmed = window.confirm(
        "Are you sure you want to delete this booking?"
    );

    if (!confirmed) {
        return;
    }

    button.disabled = true;

    try {
        await deleteBooking(bookingId);

        showMessage(
            bookingsStatus,
            "Booking deleted successfully.",
            "success"
        );

        await displayBookings();
    } catch (error) {
        button.disabled = false;

        showMessage(
            bookingsStatus,
            "Unable to delete this booking. Please try again.",
            "error"
        );

        console.error("Unable to delete booking:", error);
    }
}

// Start the booking page
bookingForm.addEventListener("submit", handleBookingSubmit);
bookingsList.addEventListener("click", handleBookingDelete);

loadCruises();
displayBookings();
