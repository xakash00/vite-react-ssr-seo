import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from "./slices/ticketSlice"
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice"
import { localStorageMiddleware } from './middlewares/localStorageMiddleware'

const middleware = [localStorageMiddleware];

export const store = configureStore({
    reducer: {
        tickets: ticketReducer,
        products: productReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
})