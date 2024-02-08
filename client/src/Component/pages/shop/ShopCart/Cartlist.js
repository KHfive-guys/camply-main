import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
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
  const handleCheckout = (product) => {
    navigate(`/shop/order/${product.productId}`, {
      state: { product: product, quantity: product.productAmount },
    });
  };
  const handleRemoveItem = async (cartId) => {
    try {
      await axios.delete(`http://localhost:8080/shop/cart/delete/${cartId}`);
      // 삭제 후 장바구니 목록을 다시 가져오거나 상태를 업데이트
      setCartItems(cartItems.filter((item) => item.cartId !== cartId));
    } catch (error) {
      console.error("장바구니 항목을 삭제하는 중 오류 발생", error);
    }
  };
  // 장바구니 정보 가져오기
  const fetchCartItems = async () => {
    const userId = extractUserIdFromToken();
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/shop/cart/mycart/${userId}`
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
        <table>
          <thead>
            <tr>
              <th>상품 이미지</th>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={item.productThumbnail}
                    alt='상품 이미지'
                  />
                </td>
                <td>{item.productName}</td>
                <td>{item.productPrice}</td>
                <td>{item.productAmount}</td>
                <td>
                  <button onClick={() => handleCheckout(item)}>결제하기</button>
                  <button onClick={() => handleRemoveItem(item.cartId)}>
                    삭제하기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>장바구니에 상품이 없습니다.</p>
      )}
    </div>
  );
};
export default CartList;
