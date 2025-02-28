

export const localStorageMiddleware = ({ getState }) => {
    return (next) => (action) => {
        if (typeof window !== "undefined") {
            const result = next(action);
            localStorage.setItem("Booked-Tickets", JSON.stringify(getState().tickets.tickets))
            return result;
        }
    }
}