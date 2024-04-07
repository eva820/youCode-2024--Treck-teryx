import React, { useState, useEffect } from 'react';
import Stores from "./Stores";

const ProductsComponent = () => {
  const [products, setProducts] = useState([]);
  // const [gender, setGender] = useState('men');
  // const [productType, setProductType] = useState('shell-jackets');
  // const [baseColor, setBaseColor] = useState('');
  // const [size, setSize] = useState(''); // New state for size
  const [filteredProducts, setFilteredProducts] = useState([]);



  const [userSelections, setUserSelections] = useState({
    gender: 'men',
    categoryUrl: '/ca/en/c/mens/shell-jackets',
    productType: 'shell-jackets',
    baseColor: '', // Initialize baseColor in the state
    size: '', // Initialize size in the state, 
    activity: '', 
  });

  const handleGenderChange = (e) => {
    const newGender = e.target.value;
    setUserSelections(prev => ({
      ...prev,
      gender: newGender,
      categoryUrl: `/ca/en/c/${newGender}/${prev.productType}`,
    }));
  };

  const handleAcitivityChange = (e) => {
    const newActivity = e.target.value; 
    setUserSelections(prev => ({
      ...prev,
      activity: newActivity, //updated based on activity  
    }))
  }

  const handleColorChange = (e) => {
    const newBaseColor = e.target.value;
    setUserSelections(prev => ({
      ...prev,
      baseColor: newBaseColor, // Update baseColor in the state based on selection
      
    }));
 

  };

  useEffect(() => {
    console.log(userSelections.baseColor); // This will log the updated color after state has changed
  }, [userSelections.baseColor]); // Dependency array, rerun this effect when baseColor changes

  const handleProductTypeChange = (e) => {
    const newProductType = e.target.value;
    setUserSelections(prev => ({
      ...prev,
      productType: newProductType,
      categoryUrl: `/ca/en/c/${prev.gender}/${newProductType}`,
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = new URLSearchParams({
        account_id: '7358',
        domain_key: 'arcteryx',
        fl: 'analytics_name,collection,colour_images_map,colors,colour_images_map_ca,description,discount_price_ca,gender,hover_image,is_new,is_pro,is_revised,price_ca,pid,review_count,rating,slug,title,thumb_image',
        efq: `genders:("${userSelections.gender}")`,
        _br_uid_2: 'uid=8986126272758:v=15.0:ts=1709256759599:hc=469',
        ref_url: `https://arcteryx.com/ca/en`,
        url: `https://arcteryx.com/ca/en/c/${userSelections.gender}/${userSelections.productType}`,
        request_id: '5483043020827',
        rows: '200',
        start: '0',
        view_id: 'ca',
        
        request_type: 'search',
        search_type: 'category',
        q: userSelections.productType,
      });
      
      if (userSelections.baseColor) {
        queryParams.append('base_colours', userSelections.baseColor); // Append the base_colours query parameter
      }

      const url = `https://core.dxpapi.com/api/v1/core/?${queryParams.toString()}`;
      console.log("Fetching URL: ", url);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.response && data.response.docs) {
          setProducts(data.response.docs);
        } else {
          console.error('Data received does not have the expected format', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [userSelections]); // React to changes in user selections



  useEffect(() => {
    const activityKeywords = {
      hiking: ['hike', 'trail', 'outdoor'],
      running: ['run', 'marathon', 'speed'],
      climbing: ['climb', 'boulder', 'mountain'],
      // Add other activities as necessary
    };
  
    // First, filter by color
    const colorFiltered = products.map(product => {
      let matchedImageUrl = '';
  
      // Handle the 'any' color case or specific color selection
      if (userSelections.baseColor.toLowerCase() === 'any') {
        matchedImageUrl = product.hover_image;
      } else {
        const colorMatchEntry = product.colour_images_map_ca?.find(entry =>
          entry.toLowerCase().startsWith(userSelections.baseColor.toLowerCase() + ":::")
        );
        if (colorMatchEntry) {
          matchedImageUrl = colorMatchEntry.split(':::')[3];
        }
      }
  
      return {
        ...product,
        displayImage: matchedImageUrl
      };
    }).filter(product => product.displayImage); // Ensure there's a display image
  
    let filteredProducts;
    if (userSelections.activity && userSelections.activity !== 'any' && activityKeywords[userSelections.activity]) {
      filteredProducts = colorFiltered.filter(product => {
        return activityKeywords[userSelections.activity].some(keyword =>
          product.description.toLowerCase().includes(keyword)
        );
      });
  
      // If no products match the activity, keep the array empty or fallback to a specific behavior
      if (filteredProducts.length === 0) {
        // Optional: Set filteredProducts to null or [] depending on how you want to handle no matches
      }
    } else {
      // If activity is 'any', or no specific activity filtering logic is needed, use all products filtered by color
      filteredProducts = colorFiltered;
    }
  
    setFilteredProducts(filteredProducts);
  
  }, [products, userSelections.baseColor, userSelections.activity]);
  
  
  
  



  return (

    <div>
    <h1>Filtered Products</h1>
    <div>
      <label>
        Gender:
        <select value={userSelections.gender} onChange={handleGenderChange}>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
        
      </label>
      <label>
        Product Type:
                <select value={userSelections.productType} onChange={handleProductTypeChange}>
                <option value="shoes">Shoes</option>
                
                <option value="shell-jackets">Shell Jacket</option>
              
                <option value="pants">Pants</option>
                <option value="insulated-jackets">Insulated Jackets</option>
                <option value="fleece">Fleece</option>
                <option value="base-layer">Base Layer</option>
                <option value="shirts-and-tops">Shirts & Tops</option>
                <option value="shorts">Shorts</option>




                
                {/* Add more options as needed */}
            </select>
        </label>

        <label>
          Color:
          <select value={userSelections.baseColor} onChange={handleColorChange}>
            <option value="any">Any</option>
            <option value="black">Black</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="brown">brown</option>
            <option value="purple">purple</option>
            <option value="pink">pink</option>



            {/* Add more color options as needed */}
          </select>
        </label>

        <label>
          Acitivity:
          <select value={userSelections.baseColor} onChange={handleAcitivityChange}>
            <option value="hiking">Hiking</option>
            <option value="biking">Biking</option>
            <option value="running">Running</option>
            <option value="climbing">Climbing</option>
            <option value="skiing">Skiing</option>
            <option value="Any">Any</option>
            {/* Add more color options as needed */}
          </select>
        </label>
    
    </div>
    <ul>
  {filteredProducts.map((product) => {
    // Standard URL format
    let productUrl = `https://arcteryx.com/ca/en/shop/mens/${product.slug}`;

    // Handle special cases where the URL doesn't follow the standard format
    const specialCases = {
      "mens/gamma-lightweight-hoody": "https://arcteryx.com/ca/en/shop/mens/gamma-lightweight-hoody?CMPID=ps|shp|std|google|Arc%27teryx_Google-Standard-Shopping_S23_Performance_BOF_R:NAM_C:CA_L:EN|||151538539338-663122094952&utm_souce=&utm_medium=ps|shp|std&utm_campaign=Arc%27teryx_Google-Standard-Shopping_S23_Performance_BOF_R:NAM_C:CA_L:EN&gclsrc=aw.ds&gad_source=1&gclid=Cj0KCQjwiMmwBhDmARIsABeQ7xRtg9BieWTTGjWCqV9nVAWWc2L-Zeq1bL_7MrF6pJHICTEwExnXu3AaArxwEALw_wcB",
      // Add other special cases here
    };

    // Check if the current product is a special case and adjust the URL if so
    if (specialCases[product.slug]) {
      productUrl = specialCases[product.slug];
    }

    // Log the URL to the console for each product
    console.log(`Product URL for ${product.title}: ${productUrl}`);

    return (
      <li key={product.pid}>
        <a href={productUrl} target="_blank" rel="noopener noreferrer">
          {product.title} - {product.gender} - <img src={product.displayImage} alt={product.title} style={{ width: '50px' }} />
        </a>
      </li>
    );
  })}
</ul>

  </div>
  );
}


export default ProductsComponent;






