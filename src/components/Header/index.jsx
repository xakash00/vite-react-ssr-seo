import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="logo">Store</Link>
        </header>
    );
};

export default Header;
