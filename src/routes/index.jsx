
import { Route, Routes } from 'react-router-dom'
import Tickets from '../pages/Ticekts'
import ProductDetails from '../pages/store/product-details'
import ProductList from '../pages/store/products'
import Header from '../components/Header'

const Routing = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route exact path="/" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/book-tickets" element={<ProductList />} />
            </Routes>
        </>
    )
}

export default Routing