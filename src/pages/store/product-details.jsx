import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../redux/slices/productSlice";
import { TiPlus, TiMinus, TiArrowLeftThick } from "react-icons/ti";
import { addItem, removeItem } from "../../redux/slices/cartSlice";
import "./products.css";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { product, loading, error } = useSelector((state) => state.products);

    const getquantityById = () => {
        const foundItem = cartItems.find((item) => item.id === product.id)
        return foundItem ? foundItem.quantity : undefined
    }

    useEffect(() => {
        dispatch(fetchSingleProduct(id));
    }, [dispatch, id]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;
    if (!product) return <h2>Product not found</h2>;

    return (
        <div className="page-container">
            <button onClick={() => { navigate(-1) }} className="g-back-btn">
                <TiArrowLeftThick />
                <h3>Back</h3>
            </button>
            <div className="container">
                <div className="image-container">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="details">
                    <h2 className="title">{product.title}</h2>
                    <p className="price">${product.price}</p>
                    <p className="description">{product.description}</p>
                    <p className="rating">⭐ {product.rating?.rate} / 5 ({product.rating?.count} reviews)</p>
                    {
                        getquantityById() > 0
                            ? <div className="update-cart-btn">
                                <button onClick={() => { dispatch(removeItem(product)) }}><TiMinus />
                                </button>
                                <div>{getquantityById()}</div>
                                <button onClick={() => { dispatch(addItem(product)) }}><TiPlus />
                                </button>
                            </div>
                            : <button onClick={() => { dispatch(addItem(product)) }} className="cart-button">Add to Cart</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;