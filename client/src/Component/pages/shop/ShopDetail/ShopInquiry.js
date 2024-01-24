import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShopInquiry = () => {
  const {productId} = useParams();
  const [setQuestNo] = useState('');

  useEffect(() => {
    const questtion = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/question/all`);
        setQuestNo(response.data.image);
      } catch (error) {
        console.error('Error fetching product image', error);
      }
    };

    questtion();
  }, [productId]);

  return (
    <div>
      <h2>문의</h2>
      
      
    </div>
  );
}

export default ShopInquiry;

