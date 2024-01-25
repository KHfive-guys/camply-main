import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShopMore = () => {
  
  const { productId  } = useParams();
  const [product, setproduct] = useState(null);

  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/shop/detail/${productId}`);
        setproduct(response.data.image);
      } catch (error) {
        console.error('Error fetching product image', error);
       
      }
    };

    fetchProductImage();
  }, [productId]);

  return (
    <div>
      <h2>상품 Content</h2>
      
      {product ? (
        <>
        <img
          src={product.productContent}
          alt="Product Details"
          style={{ width: '100%', height: 'auto' }}
        />
        </>
      ):(
        <p>상품을 찾을 수 없습니다.</p>
      )}
    </div>
  );
}

export default ShopMore;

