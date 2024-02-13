import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavDropdown } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Nav from '../../camp/CampNavbar';
import OrderMangement from '../../../img/Seller/주문관리.png';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';

const OrderProduct = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // 상품 조회 시 0번째에서 1번째로 넘어가기 위한 로딩 변수
  const [selectedProducts, setSelectedProducts] = useState([]); // 선택된 제품을 저장할 상태 변수
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태
  const [itemsPerPage, setItemsPerPage] = useState(20); // 페이지당 표시할 아이템 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageCount, setPageCount] = useState(0);
  const token = localStorage.getItem('yourTokenKey'); // 토큰을 로컬 스토리지에서 가져옵니다.
  //주문 리스트 조회
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // 서버에서 주문 목록을 가져옵니다. 여기서는 판매자 ID가 1이라고 가정합니다.
        const response = await axios.get(
          'http://localhost:8080/shop/mypage/orderList',
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
            },
          }
        );

        // 응답 데이터를 state에 저장합니다.
        setOrders(response.data);
        console.log(response.data);
        setPageCount(Math.ceil(response.data.length / itemsPerPage));
        setLoading(false);
      } catch (error) {
        // 오류가 발생한 경우 콘솔에 오류를 출력합니다.
        console.error('주문 목록을 불러오는데 실패했습니다:', error);
      }
    };

    fetchOrders();
  }, [itemsPerPage, token]);

  // 페이지네이션 컨트롤 (예: 페이지 번호 변경)
  const handlePageClick = (data) => {
    let selectedPage = data.selected;
    setCurrentPage(selectedPage + 1);
  };

  // 페이지당 표시할 아이템 수 변경
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // 아이템 수가 변경되면 항상 첫 페이지로 이동
  };

  // 현재 페이지에 표시할 상품 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // //제품 개별 선택
  // const handleCheckboxChange = (productId) => {
  //   // 체크 박스 변경 시 호출되는 함수
  //   if (selectedProducts.includes(productId)) {
  //     // 이미 선택된 항목인 경우 선택 해제
  //     setSelectedProducts(selectedProducts.filter((id) => id !== productId));
  //   } else {
  //     // 선택되지 않은 항목인 경우 선택
  //     setSelectedProducts([...selectedProducts, productId]);
  //   }
  // };

  // //제품 전체 선택
  // const handleSelectAllChange = () => {
  //   if (selectAll) {
  //     // 전체 선택 해제
  //     setSelectedProducts([]);
  //   } else {
  //     // 전체 선택
  //     const allProductIds = orders.map((ShopProduct) => ShopProduct.productId);
  //     setSelectedProducts(allProductIds);
  //   }
  //   setSelectAll(!selectAll); // 전체 선택 상태 반전
  // };

  //조회 시 0번째 빈 배열에서 1번째 값으로 넘어가기 위한 로딩
  if (loading) {
    return (
      <div class="spinner-border m-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }
  console.log(orders);

  return (
    <>
      <Nav />

      <div className="orderList">
        <h2>
          &nbsp;&nbsp;
          <img src={OrderMangement} alt="ordermanagement" />
          주문관리
        </h2>
        <span className="itemsPerPage-position">
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={10}>10개씩 보기</option>
            <option value={20}>20개씩 보기</option>
            <option value={50}>50개씩 보기</option>
            <option value={100}>100개씩 보기</option>
          </select>
        </span>
        <table>
          <thead>
            <tr>
              {/* <th className="checkbox-no-th">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th> */}
              <th className="no-th-size">No</th>
              <th>주문일</th>
              <th>주문번호</th>
              <th>주문자</th>
              <th>상품명</th>
              <th>총결제금액</th>
              <th>주문수량</th>
              <th>상품금액</th>
              {/* <th>주문상태</th> */}
            </tr>
          </thead>
          <tbody>
            {currentItems
              .filter((order) => order !== null && order !== undefined)
              .map((order, index) => (
                <tr key={order.orderNo || index}>
                  {/* <td className="checkbox-td">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(order.productId)}
                    onChange={() => handleCheckboxChange(order.productId)}
                  />
                </td> */}
                  {/* 고유 식별자 order_no 유지하되 프론트에 보여지기 위한 No 값 */}
                  <td className="no-td-size">
                    {' '}
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td> {order.orderDate}</td>
                  <td> {order.orderNo}</td>
                  <td> {order.orderOrdererName}</td>
                  <td> {order.productName}</td>
                  <td>
                    {new Intl.NumberFormat('ko-KR', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(order.totalPrice)}
                    원
                  </td>
                  <td> {order.orderProductAmount}</td>
                  <td> {order.product.formattedProductPrice}</td>
                  {/* <td>
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
                </td> */}
                </tr>
              ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'이전'}
          nextLabel={'다음'}
          breakLabel={'...'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          forcePage={currentPage - 1} // 현재 페이지를 강제로 설정
        />
      </div>
    </>
  );
};

export default OrderProduct;
