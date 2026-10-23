
const API_URL = "http://localhost:3000";

// Reusable function for sending API requests
async function request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

// GET: retrieve all cruises
function getCruises() {
    return request("/cruises");
}

// GET: retrieve all bookings
function getBookings() {
    return request("/bookings");
}

// POST: create a new booking
function createBooking(booking) {
    return request("/bookings", {
        method: "POST",
        body: JSON.stringify(booking)
    });
}

// PUT: replace an existing booking
function updateBooking(id, booking) {
    return request(`/bookings/${id}`, {
        method: "PUT",
        body: JSON.stringify(booking)
    });
}

// PATCH: update selected fields of a booking
function patchBooking(id, changes) {
    return request(`/bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify(changes)
    });
}

// DELETE: remove a booking
function deleteBooking(id) {
    return request(`/bookings/${id}`, {
        method: "DELETE"
    });
}

export {
    getCruises,
    getBookings,
    createBooking,
    updateBooking,
    patchBooking,
    deleteBooking
};
