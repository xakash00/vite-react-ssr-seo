import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { closeCart, deleteItem, showCart } from "../../redux/slices/cartSlice";
import ProductCard from "../ProductCard";
import "./header.css";

const Header = () => {
    const { openCart, cartItems } = useSelector(store => store.cart)
    const dispatch = useDispatch();

    const cartTotalItems = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)
    const cartTotalPrice = cartItems.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)

    const handleShow = () => dispatch(showCart())
    const handleHide = () => dispatch(closeCart())

    const handleDelete = (e) => {
        console.log(e.target.tagName)
        if (e.target.tagName === "BUTTON") {
            dispatch(deleteItem({ id: Number(e.target.dataset.id) }))
        }
    }

    return (
        <>
            <header className="header">
                <Link to="/" className="logo">Store | {cartTotalPrice}</Link>
                <button className="cart-icon" onClick={() => {
                    if (openCart !== "show") {
                        return handleShow()
                    }
                    return handleHide()
                }}><FaCartShopping size={30} color="#f77233" />
                    {cartItems.length > 0 && <div className="cart-total-items">
                        <span className="cart-number">
                            {cartTotalItems}
                        </span>
                    </div>}
                </button>
            </header>
            <Modal open={openCart} onClose={handleHide}>
                <div className="modal-content">
                    <h2>Your Cart</h2>
                    {
                        cartItems.length > 0
                            ?
                            <ul className="no-style" onClick={handleDelete}>
                                {
                                    cartItems.map((product) => {
                                        return (
                                            <li key={product.id}>
                                                <ProductCard fromCart={true} {...{ product }} />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            : <div className="empty-card-text">Cart is empty</div>
                    }
                </div>
            </Modal>
        </>
    );
};

export default Header;


const Card = ({ product }) => {
    return (
        <div className="card">
            <img
                src={product.image}
                alt={product.title}
                className="card-image"
            />
            <div className="card-content">
                <div className="card-header">
                    <h3 className="card-title">{product.title}</h3>
                    <span className="card-price">{product.price}</span>
                </div>
            </div>
        </div>
    )
}   