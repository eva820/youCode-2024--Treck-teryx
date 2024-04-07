import React, { useState } from "react";
import ProductsComponent from "./products";
import RecommendProduct from "./recommendProduct";

const ProductsDisplay = () => {
    const [filteredProducts, setFilteredProducts] = useState([])

    return (
        <div>
            <ProductsComponent setFilteredProducts={setFilteredProducts} />
            <RecommendProduct filteredProducts={filteredProducts} />
        </div>
    );
};