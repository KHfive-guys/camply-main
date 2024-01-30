import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../shop/css/ShopMain.css';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProducts, setCategoryProducts] = useState({});
  const [productCategorys] = useState(["tent", "kitchen", "fireplace","lamp","sleepingbag","chair"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await Promise.all(
          productCategorys.map(async (productCategory) => {
            const response = await axios.get(`http://localhost:8080/shop/main/category/${productCategory}`);
            return { category: productCategory, products: response.data };
          })
        );
        const categoryProductMap = {};
        productData.forEach(({ category, products }) => {
          categoryProductMap[category] = products;
        });
        setCategoryProducts(categoryProductMap);
      } catch (error) {
        console.error('상품을 불러오는 중 에러 발생', error);
      }
    };

    fetchData();
  }, [productCategorys]);

  return (
    <div className='category-item' style={{ display: 'flex', justifyContent: 'center' }}>
      <section>
        <h2 style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '50px' }}>카테고리별 상품목록</h2>
        {Object.keys(categoryProducts).map((category) => (
          <div key={category}>
           
            <ul className='swiper-wrapper1'>
            <h2 style={{marginRight:'50px',textAlign:'match-parent'}}>{category}</h2>
              {categoryProducts[category].map((product) => (
                <li
                  key={product.productId}
                  className='swiper-slide swiper-slide-active'
                  style={{
                    width: '272.5px',
                    marginRight: '30px',
                  }}
                >
                  
                  <Link to={`/shop/detail/${product.productId}`}>
                    <div className='imgWrap'>
                      <img src={product.productThumbnail} className='imgs' alt={product.productName} />
                    </div>
                    <div className='textWrap'>
                      <p style={{ fontSize: '20px' }} className='companyName'>{product.productName}</p>
                      <p className='itemName1'>{product.productDescription}</p>
                      <div className='itemsPrice clearfix'>
                        <div className='fr'>
                          <strong className='customerPrice'></strong>
                          <strong className='sellPrice'>{product.formattedProductPrice}</strong>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className='itemFooter clearfix'>
                  </div>
                </li>
                
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CategoryList;
