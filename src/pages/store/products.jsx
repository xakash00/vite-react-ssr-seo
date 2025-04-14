import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductCard from "../../components/ProductCard";
import "./products.css"

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const isExist = useCallback((id) => {
        return cartItems.some((item) => item.id === id ? item : null)
    }, [cartItems])

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;



    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} isExist={() => isExist(product.id)} />
            ))}
        </div>
    );
};

export default ProductList;
