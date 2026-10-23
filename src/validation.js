
function validateBooking(booking) {
    const errors = [];

    // Check the customer's name
    if (
        typeof booking.customerName !== "string" ||
        booking.customerName.trim().length < 2
    ) {
        errors.push("Please enter a name with at least 2 characters.");
    }

    // Check the customer's email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        typeof booking.customerEmail !== "string" ||
        !emailPattern.test(booking.customerEmail.trim())
    ) {
        errors.push("Please enter a valid email address.");
    }

    // Check the selected cruise
    if (
        booking.cruiseId === undefined ||
        booking.cruiseId === null ||
        String(booking.cruiseId).trim() === ""
    ) {
        errors.push("Please select a cruise.");
    }

    // Check the number of guests
    const guests = Number(booking.guests);

    if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
        errors.push("The number of guests must be between 1 and 10.");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export { validateBooking };
