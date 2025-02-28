import { createSlice } from '@reduxjs/toolkit';

const storedData = () => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem("Booked-Tickets");
        if (data) {
            return JSON.parse(data);
        }
        return [];
    }
};

let rowNum = 5;
let colNum = 10;

const basePrice = 400;
const priceDecrease = 50;

const seatArray = Array.from({ length: rowNum }, (i, row) =>
    Array.from({ length: colNum }, (j, col) => ({
        row: row + 1,
        column: col + 1,
        seatNumber: `${String.fromCharCode(65 + row)}${col + 1}`,
        price: Math.max(basePrice - row * priceDecrease),
    }))
).flat();

const initialState = {
    seatData: seatArray,
    tickets: storedData() || [],
    total: 0,
};

const ticketSlice = createSlice({
    name: 'tickets',
    initialState: initialState,
    reducers: {
        addTickets: (state, action) => {
            state.tickets = [...state.tickets, action.payload.seatDetails]
        },
        deleteTicket: (state, action) => {
            const newTickets = state.tickets.filter(
                (item) => item.seatNumber !== action.payload.seatNumber
            );
            state.tickets = newTickets
        },
        calculatePrice: (state) => {
            const totalPrice = state.tickets
                .reduce((acc, curr) => acc + curr.price, 0)
                .toFixed(2);
            state.total = totalPrice
        }
    },
})
export const { addTickets, deleteTicket, calculatePrice } = ticketSlice.actions;
export default ticketSlice.reducer