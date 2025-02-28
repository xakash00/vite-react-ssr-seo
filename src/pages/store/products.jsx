import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./products.css"
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductCard from "../../components/ProductCard";

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
