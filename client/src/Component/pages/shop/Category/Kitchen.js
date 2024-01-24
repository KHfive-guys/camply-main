// Tent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../shop/css/ShopMain.css';


const Tent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/category/main/kitchen");
        setProducts(response.data);
      } catch (error) {
        console.error("상품을 불러오는 중 에러 발생", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='category-item' style={{ display: 'flex', justifyContent: 'center' }}>
      {products.length > 0 ? (
        <div>
          <section>
            <h2 style={{ display: 'flex', justifyContent: 'center' }}>식기</h2><br />
            <ul className='swiper-wrapper'>
              {products.map((product) => (
                <li key={product.productId} className='swiper-slide swiper-slide-active' style={{
                  width: "272.5px",
                  marginRight: "30px",
                }}>
                  <Link to={`/shop/detail/${product.productId}`}>
                    <div className='imgWrap'>
                      <img src={product.productThumbnail} className="imgs" alt={product.productName} />
                    </div>
                    <div className="textWrap">
                      <p style={{ fontSize: '20px' }} className="companyName"><b>{product.productName}</b></p>
                      <p className="itemName1">{product.productDescription}</p>
                      <div className="itemsPrice clearfix">
                        <div className="fr">
                          <strong className="sellPrice">{product.formattedProductPrice}</strong>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="itemFotter clearfix">
                    <div className="fr"></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <p>상품을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default Tent;
