import React, { useState, useEffect } from "react";
import "../../css/ShopOrder/OrderMain.css";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import Nav from "../../../camp/CampNavbar";

const OrderList = () => {
  const [order, setOrder] = useState([]); // 주문 정보 상태
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

  // 주문 정보 가져오기
  const fetchMyOrder = async () => {
    const userId = extractUserIdFromToken(); // 사용자 ID 추출
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/shop/mypage/general/myorder/view/${userId}`
        );
        setOrder(response.data); // 주문 정보 상태 업데이트
      } catch (error) {
        console.error("주문 정보를 불러오는 중 오류 발생", error);
      }
    } else {
      console.error("사용자 ID를 찾을 수 없습니다.");
    }
  };

  // 주문 삭제
  const handleDeleteMyOrder = async (orderNo) => {
    try {
      await axios.delete(
        `http://localhost:8080/shop/mypage/general/myorder/delete/${orderNo}`
      );
      fetchMyOrder();
      alert("주문이 삭제되었습니다."); // 사용자에게 알림
    } catch (error) {
      console.error("주문을 삭제하는 중 오류 발생", error);
    }
  };

  useEffect(() => {
    fetchMyOrder(); // 컴포넌트 마운트 시 주문 정보 조회
  }, []);
  return (
    <>
      <Nav />
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>주문 번호</th>
              <th>상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th>조치</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order, index) => (
              <tr key={index}>
                <td>{order.orderNo}</td>
                <td>{order.productName}</td>
                <td>{order.orderProductAmount}</td>
                <td>{order.totalPrice}</td>
                <td>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => handleDeleteMyOrder(order.orderNo)}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {order.length === 0 && <p>주문 정보가 없습니다.</p>}
      </div>
    </>
  );
};

export default OrderList;
