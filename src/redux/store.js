import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from "./slices/ticketSlice"
import productReducer from "./slices/productSlice";
import { localStorageMiddleware } from './middlewares/localStorageMiddleware'

const middleware = [localStorageMiddleware];

export const store = configureStore({
    reducer: {
        tickets: ticketReducer,
        products: productReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
})