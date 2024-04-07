import React, { useState, useEffect } from 'react';
import RecommendProduct from './RecommendProduct';
import Stores from "./Stores";

const ProductsComponent = ({ selections }) => {
  const [products, setProducts] = useState([]);
  console.log("SELECTIONS: ", selections)

  useEffect(() => {
    // Define the function to fetch products based on selections from props
    const fetchProducts = async () => {
      // Construct your API endpoint with query parameters based on selections
      const queryParams = new URLSearchParams({
        gender: selections[3],
        productType: selections.productType,
        // Include other relevant query parameters based on your API's requirements
      });

      const response = await fetch(`API_ENDPOINT?${queryParams.toString()}`);
      const data = await response.json();
      setProducts(data.products); // Assuming the API returns an object with a products array
    };

    if (selections.gender && selections.productType) {
      fetchProducts();
    }
  }, [selections]); // Fetch products when selections change

  // Function to filter products by color and type of activity, based on selections
  const getFilteredProducts = () => {
    return products.filter(product => {
      const matchesColor = selections.baseColor === 'any' || product.baseColor === selections.baseColor;
      const matchesActivity = selections.activity === 'any' || product.description.toLowerCase().includes(selections.activity.toLowerCase());
      return matchesColor && matchesActivity;
    });
  };

  return (
    <div>
      <RecommendProduct products={getFilteredProducts()} />
    </div>
  );
}


export default ProductsComponent;
