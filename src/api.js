
const SUPABASE_URL = "https://siewfhnjfgtcqxljnuxf.supabase.co";
const SUPABASE_KEY = "sb_publishable_BvZeBdaLj53JIm7dY_s9NA_j-YJplT8";

// Reusable function for Supabase API requests
async function request(endpoint, options = {}) {
    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${endpoint}`,
        {
            ...options,
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
                "Content-Type": "application/json",
                ...options.headers
            }
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(
            `Supabase request failed: ${response.status} ${error}`
        );
    }

    if (response.status === 204) {
        return null;
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

// GET: retrieve all cruises
function getCruises() {
    return request("cruises?select=*");
}

// GET: retrieve all bookings
function getBookings() {
    return request("bookings?select=*");
}

// POST: create a new booking
function createBooking(booking) {
    return request("bookings", {
        method: "POST",
        headers: {
            Prefer: "return=representation"
        },
        body: JSON.stringify(booking)
    });
}

// Update an existing booking
function updateBooking(id, booking) {
    return request(`bookings?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: {
            Prefer: "return=representation"
        },
        body: JSON.stringify(booking)
    });
}

// PATCH: update selected booking fields
function patchBooking(id, changes) {
    return request(`bookings?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: {
            Prefer: "return=representation"
        },
        body: JSON.stringify(changes)
    });
}

// DELETE: remove a booking
function deleteBooking(id) {
    return request(`bookings?id=eq.${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
            Prefer: "return=representation"
        }
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

