
import { validateBooking } from "../src/validation.js";

describe("validateBooking", () => {
    const validBooking = {
        customerName: "Jane Doe",
        customerEmail: "jane@example.com",
        cruiseId: "2",
        guests: 2
    };

    test("accepts valid booking details", () => {
        const result = validateBooking(validBooking);

        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    test("rejects a name that is too short", () => {
        const result = validateBooking({
            ...validBooking,
            customerName: "J"
        });

        expect(result.isValid).toBe(false);
        expect(result.errors).toContain(
            "Please enter a name with at least 2 characters."
        );
    });

    test("rejects an invalid email", () => {
        const result = validateBooking({
            ...validBooking,
            customerEmail: "not-an-email"
        });

        expect(result.isValid).toBe(false);
        expect(result.errors).toContain(
            "Please enter a valid email address."
        );
    });

    test("rejects a missing cruise", () => {
        const result = validateBooking({
            ...validBooking,
            cruiseId: ""
        });

        expect(result.isValid).toBe(false);
        expect(result.errors).toContain(
            "Please select a cruise."
        );
    });

    test("rejects more than 10 guests", () => {
        const result = validateBooking({
            ...validBooking,
            guests: 11
        });

        expect(result.isValid).toBe(false);
        expect(result.errors).toContain(
            "The number of guests must be between 1 and 10."
        );
    });

    test("rejects a fractional number of guests", () => {
        const result = validateBooking({
            ...validBooking,
            guests: 1.5
        });

        expect(result.isValid).toBe(false);
    });
});
