import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTickets, calculatePrice, deleteTicket } from "../../redux/slices/ticketSlice";
import "./tickets.css";

const Tickets = () => {
    const dispatch = useDispatch();
    const { tickets, seatData, total } = useSelector((store) => store.tickets);


    useEffect(() => {
        dispatch(calculatePrice())
    }, [dispatch, tickets]);

    const isExist = (seatNumber) =>
        tickets.some((item) => item.seatNumber === seatNumber);

    const handleBooking = (e) => {
        if (e.target.tagName === "LI") {
            const seatDetails = JSON.parse(e.target.dataset.value);
            if (isExist(seatDetails.seatNumber)) {
                dispatch(deleteTicket({ seatNumber: seatDetails.seatNumber }))
            } else {
                dispatch(addTickets({ seatDetails }));
            }
        }
    }
    return (
        <>
            <div>
                <div className="heading">{total > 0 && `Total Price - ${total}`}</div>
                <ul className="container" onClick={handleBooking}>
                    {seatData.map((seat) => {
                        return (
                            <li
                                className={`list ${isExist(seat.seatNumber) ? 'active' : ''}`}
                                data-value={JSON.stringify(seat)}
                                key={seat.seatNumber}
                            >
                                {seat.seatNumber}
                            </li>
                        );
                    })}
                </ul>
                {tickets.length > 0 &&
                    <div className="container">
                        <div className="heading">Your Tickets</div>
                        <div className="flex" onClick={handleBooking}>
                            {tickets.map((seat) => {
                                return (
                                    <li
                                        className={`list ${isExist(seat.seatNumber) ? 'active' : ''}`}
                                        data-value={JSON.stringify(seat)}
                                        key={seat.seatNumber}>
                                        {seat.seatNumber}
                                    </li>
                                );
                            })}
                        </div>
                    </div>}
            </div>
        </>
    );
};

export default Tickets;

