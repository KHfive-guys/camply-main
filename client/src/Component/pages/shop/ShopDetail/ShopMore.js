import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShopMore = () => {
  
  const { productId  } = useParams();
  const [productContent, setproductContent] = useState(null);

  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/detail/${productId}`);
        setproductContent(response.data.image);
      } catch (error) {
        console.error('Error fetching product image', error);
       
      }
    };

    fetchProductImage();
  }, [productId]);

  return (
    <div>
      <h2>상품 상세정보</h2>
      
      {productContent && (
        <img
          src={productContent.productContent}
          alt="Product Details"
          style={{ width: '100%', height: 'auto' }}
        />
      )}
    </div>
  );
}

export default ShopMore;

