import React from "react";
import { Link } from "react-router-dom";
import { TiPlus, TiMinus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../redux/slices/cartSlice";
import "./productCard.css";

const ProductCard = ({ product, fromCart }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getquantityById = () => {
    const foundItem = cartItems.find((item) => item.id === product.id)
    return foundItem ? foundItem.quantity : undefined
  }

  return fromCart
    ? <div className="card">
      <img
        src={product.image}
        alt={product.title}
        className="card-image"
      />
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{product.title}</h3>
          <button className="no-bg-btn" data-id={product.id}>
            Remove
          </button>
        </div>
        <p className="card-price">${product.price}</p>
        {
          getquantityById() > 0
            ? <div className="update-cart-btn">
              <button onClick={() => { dispatch(removeItem(product)) }}><TiMinus />
              </button>
              <div>{getquantityById()}</div>
              <button onClick={() => { dispatch(addItem(product)) }}><TiPlus />
              </button>
            </div>
            : <button onClick={() => { dispatch(addItem(product)) }} className="button">Add to Cart</button>
        }
      </div>
    </div>
    : (
      <div className="product-card">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price}</p>
        </Link>
        {
          getquantityById() > 0
            ? <div className="update-cart-btn">
              <button onClick={() => { dispatch(removeItem(product)) }}><TiMinus /></button>
              <div>{getquantityById()}</div>
              <button onClick={() => { dispatch(addItem(product)) }}><TiPlus /></button>
            </div>
            : <button onClick={() => { dispatch(addItem(product)) }} className="button">Add to Cart</button>
        }
      </div>
    );
};

export default ProductCard; 