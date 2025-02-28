import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css"; // Import the CSS file

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="card">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        {/* <button className="button">Add to Cart</button> */}
      </div>
    </Link>
  );
};

export default ProductCard;