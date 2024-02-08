import React, { useState, useEffect } from "react";
import axios from "axios";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);

  // 토큰에서 사용자 ID 추출하는 함수
  const extractUserIdFromToken = () => {
    const token = localStorage.getItem("yourTokenKey");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedToken = JSON.parse(window.atob(base64));
      return decodedToken.user_id; // 사용자 ID 반환
    }
    return null;
  };

  // 장바구니 정보 가져오기
  const fetchCartItems = async () => {
    const userId = extractUserIdFromToken();
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/shop/mycart/${userId}`
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("장바구니 정보를 불러오는 중 오류 발생", error);
      }
    } else {
      console.error("사용자 ID를 찾을 수 없습니다.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div>
      <h2>내 장바구니</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>상품명: {item.productName}</p>
              <p>가격: {item.productPrice}</p>
              <p>수량: {item.cartAmount}</p>
              {/* 추가적인 상품 정보 표시 */}
            </li>
          ))}
        </ul>
      ) : (
        <p>장바구니에 상품이 없습니다.</p>
      )}
    </div>
  );
};

export default CartList;
