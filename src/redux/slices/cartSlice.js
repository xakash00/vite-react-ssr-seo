import { createSlice } from '@reduxjs/toolkit';

const storedData = () => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem("cart");
        if (data) {
            return JSON.parse(data);
        }
        return [];
    }
};


const initialState = {
    cartItems: storedData() || [],
    openCart: "",
    cartTotalItems: ""
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        showCart: (state) => {
            state.openCart = "show"
        },
        closeCart: (state) => {
            state.openCart = ""
        },
        addItem: (state, action) => {
            const isExist = state.cartItems.find((item) => item.id === action.payload.id);
            if (isExist) {
                state.cartItems = state.cartItems.map((item) => {
                    return item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * action.payload.price }
                        : item
                })
            } else {
                state.cartItems = [...state.cartItems, { ...action.payload, quantity: 1, total: action.payload.price }]
            }
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.map((item) => {
                return item.id === action.payload.id
                    ? { ...item, quantity: item.quantity - 1, total: (item.quantity - 1) * action.payload.price }
                    : item
            }).filter((item) => item.quantity > 0)
        },
        deleteItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id)
        }
    }
})
export const { addItem, removeItem, showCart, closeCart, deleteItem } = cartSlice.actions
export default cartSlice.reducer