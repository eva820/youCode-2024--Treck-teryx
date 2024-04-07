import React, { useState, useEffect } from 'react';

const ProductsComponent = () => {
  const [products, setProducts] = useState([]);

  const [userSelections, setUserSelections] = useState({
    gender: 'men',
    categoryUrl: '/ca/en/c/mens/shell-jackets',
    productType: 'shell-jackets',
    // baseColor: '',
  });

  const handleGenderChange = (e) => {
    const newGender = e.target.value;
    setUserSelections(prev => ({
      ...prev,
      gender: newGender,
      categoryUrl: `/ca/en/c/${newGender}/${prev.productType}`,
    //   baseColor: color === 'any' ? '' : color,
    }));
  };

  const handleProductTypeChange = (e) => {
    const newProductType = e.target.value;
    setUserSelections(prev => ({
      ...prev,
      productType: newProductType,
      categoryUrl: `/ca/en/c/${prev.gender}/${newProductType}`,
    }));
  };


//   const handleColorChange = (color) => {
//     setUserSelections(prev => ({
//       ...prev,
//       baseColor: color === 'any' ? '' : color,
//     }));
//   };

  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = new URLSearchParams({
        account_id: '7358',
        domain_key: 'arcteryx',
        fl: 'analytics_name,collection,colour_images_map,colour_images_map_ca,description,discount_price_ca,gender,hover_image,is_new,is_pro,is_revised,price_ca,pid,review_count,rating,slug,title,thumb_image',
        efq: `genders:("${userSelections.gender}")`, // Dynamic gender value
        _br_uid_2: 'uid=8986126272758:v=15.0:ts=1709256759599:hc=469',
        // colorQuery: (userSelections.baseColor ? `?base_colours=${userSelections.baseColor}` : ''),
        ref_url: `https://arcteryx.com/ca/en`,

        url: `https://arcteryx.com${userSelections.categoryUrl}`, //ACTUAL URL TO LIST OF PRODUCTS 
        request_id: '5483043020827',
        rows: '200',
        start: '0',
        view_id: 'ca',
        request_type: 'search',
        search_type: 'category',
        
        q: userSelections.productType, 
      }).toString();

      const url = `https://core.dxpapi.com/api/v1/core/?${queryParams}`;
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
  }, [userSelections]); 

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



        

    
    </div>
    <ul>
      {products.map((product) => (
        <li key={product.pid}>
          {product.title} - {product.gender} - <img src={product.hover_image} alt={product.title} style={{ width: '50px' }} />
        </li>
      ))}
    </ul>
  </div>
  );
};

export default ProductsComponent;






