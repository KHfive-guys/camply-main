import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavDropdown } from 'react-bootstrap';

const OrderProduct = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // 상품 조회 시 0번째에서 1번째로 넘어가기 위한 로딩 변수
  const [selectedProducts, setSelectedProducts] = useState([]); // 선택된 제품을 저장할 상태 변수
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태

  //주문 리스트 조회
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // 서버에서 주문 목록을 가져옵니다. 여기서는 판매자 ID가 1이라고 가정합니다.
        const response = await axios.get(
          'http://localhost:8080/shop/mypage/orderList/1'
        );

        // 응답 데이터를 state에 저장합니다.
        setOrders(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        // 오류가 발생한 경우 콘솔에 오류를 출력합니다.
        console.error('주문 목록을 불러오는데 실패했습니다:', error);
      }
    };

    fetchOrders();
  }, []);

  //제품 개별 선택
  const handleCheckboxChange = (productId) => {
    // 체크 박스 변경 시 호출되는 함수
    if (selectedProducts.includes(productId)) {
      // 이미 선택된 항목인 경우 선택 해제
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      // 선택되지 않은 항목인 경우 선택
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  //제품 전체 선택
  const handleSelectAllChange = () => {
    if (selectAll) {
      // 전체 선택 해제
      setSelectedProducts([]);
    } else {
      // 전체 선택
      const allProductIds = orders.map((ShopProduct) => ShopProduct.productId);
      setSelectedProducts(allProductIds);
    }
    setSelectAll(!selectAll); // 전체 선택 상태 반전
  };

  //조회 시 0번째 빈 배열에서 1번째 값으로 넘어가기 위한 로딩
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(orders);

  return (
    <div>
      <h2>주문조회</h2>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
            </th>
            <th>주문일</th>
            <th>주문번호</th>
            <th>주문자</th>
            <th>상품명</th>
            <th>총결제금액</th>
            <th>주문수량</th>
            <th>상품금액</th>
            <th>주문상태</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(order.productId)}
                  onChange={() => handleCheckboxChange(order.productId)}
                />
              </td>
              <td> {order.orderDate}</td>
              <td> {order.orderId}</td>
              <td> {order.orderOrdererName}</td>
              <td> {order.product.productName}</td>
              <td> {order.formattedTotalAmount}</td>
              <td> {order.orderProductQuantity}</td>
              <td> {order.product.formattedProductPrice}</td>

              <td>
                {order.orderStatus}
                <NavDropdown title=" " id="basic-nav-dropdown">
                  <NavDropdown.Item
                  // onClick={() => handleDeleteClick(order.productId)}
                  >
                    상품준비중
                  </NavDropdown.Item>
                  <NavDropdown.Item
                  //onClick={() => handleDeleteClick(order.productId)}
                  >
                    배송중
                  </NavDropdown.Item>
                  <NavDropdown.Item
                  // onClick={() => handleDeleteClick(order.productId)}
                  >
                    배송완료
                  </NavDropdown.Item>
                  <NavDropdown.Item
                  //  onClick={() => handleDeleteClick(order.productId)}
                  >
                    취소
                  </NavDropdown.Item>
                </NavDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderProduct;
