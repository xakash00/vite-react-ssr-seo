import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../redux/slices/productSlice";
import "./products.css";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchSingleProduct(id));
    }, [dispatch, id]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;
    if (!product) return <h2>Product not found</h2>;

    return (
        <div className="container">
            <div className="image-container">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="details">
                <h2 className="title">{product.title}</h2>
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>
                <p className="rating">⭐ {product.rating?.rate} / 5 ({product.rating?.count} reviews)</p>
                {/* <button className="button">Add to Cart</button> */}
            </div>
        </div>
    );
};

export default ProductDetails;