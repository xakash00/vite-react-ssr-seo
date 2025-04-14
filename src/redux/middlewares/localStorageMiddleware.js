

export const localStorageMiddleware = ({ getState }) => {
    return (next) => (action) => {
        if (typeof window !== "undefined") {
            const result = next(action);
            localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems))
            localStorage.setItem("tickets", JSON.stringify(getState().tickets.tickets))
            return result;
        }
    }
}