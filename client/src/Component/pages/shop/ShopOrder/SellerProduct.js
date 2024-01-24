import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductMyPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 상품 조회 시 0번째에서 1번째로 넘어가기 위한 로딩 변수
  const [selectedProducts, setSelectedProducts] = useState([]); // 선택된 제품을 저장할 상태 변수
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태

  //등록 상품 리스트 조회
  useEffect(() => {
    axios
      .get('http://localhost:8080/mypage/productList')
      .then((response) => {
        console.log(response.data); // 서버로부터 받은 데이터 확인
        setProducts(response.data);
        setLoading(false); // 데이터 로드 완료 후 loading 상태 변경
      })
      .catch((error) => {
        console.error(':', error);
        setLoading(false); // 에러 발생 시 loading 상태 변경
      });
  }, []);

  //상품 삭제하기(드롭다운)
  const handleDeleteClick = async (productId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await axios.delete(
          `http://localhost:8080/mypage/productDelete/${productId}`
        );
        setProducts(products.filter((p) => p.productId !== productId));
      } catch (error) {
        console.error('Error deleting product: ', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input Changed:', name, value); // 로깅 추가
  };

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
      const allProductIds = products.map(
        (ShopProduct) => ShopProduct.productId
      );
      setSelectedProducts(allProductIds);
    }
    setSelectAll(!selectAll); // 전체 선택 상태 반전
  };

  //조회 시 0번째 빈 배열에서 1번째 값으로 넘어가기 위한 로딩
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(products);

  return (
    <div>
      <h2>등록상품 조회</h2>
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
            <th>No</th>
            <th>상품명</th>
            <th>판매가</th>
            <th>카테고리</th>
            <th>상태</th>
            <th>재고</th>
            <th>등록일</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter(
              (ShopProduct) => ShopProduct !== null && ShopProduct !== undefined
            )
            .map((ShopProduct, index) => (
              <tr key={ShopProduct.productId || index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(ShopProduct.productId)}
                    onChange={() => handleCheckboxChange(ShopProduct.productId)}
                  />
                </td>
                {/* 고유 식별자 product_id는 유지하되 프론트에 보여지기 위한 No 값 */}
                <td> {index + 1}</td>
                <td>
                  {' '}
                  <img
                    src={ShopProduct.productThumbnail}
                    alt={`Thumbnail for ${ShopProduct.productName}`} // 대체 텍스트 설정 (선택사항)
                    width="100" // 이미지의 폭 설정 (선택사항)
                    height="100" // 이미지의 높이 설정 (선택사항)
                  />{' '}
                  {ShopProduct.productName}
                </td>
                <td> {ShopProduct.formattedProductPrice}</td>
                <td> {ShopProduct.productCategory}</td>
                <td htmlFor="productStatus">
                  <div className="form-group">
                    <div className="dropdown">
                      <select
                        name="productStatus"
                        onChange={handleInputChange}
                        value={ShopProduct.productStatus}
                        className="form-control"
                      >
                        <option value="판매중">판매중</option>
                        <option value="판매중지">판매중지</option>
                        <option value="판매종료">품절</option>
                      </select>
                      <div className="dropdown-icon">&#9660;</div>
                    </div>
                  </div>
                </td>
                <td> {ShopProduct.productStock}</td>
                <td> {ShopProduct.productCreateDate}</td>
                <td>
                  <NavDropdown title="..." id="basic-nav-dropdown">
                    <NavDropdown.Item
                      as={Link}
                      to={`/editProduct/${ShopProduct.productId}`}
                    >
                      수정
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleDeleteClick(ShopProduct.productId)}
                    >
                      삭제
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

export default ProductMyPage;
/*
.filter() 메서드:

배열 내의 모든 요소에 대해 주어진 함수를 실행하고, 그 결과가 true를 반환하는 모든 요소를 모아 새로운 배열을 만듭니다.
여기서는 ShopProduct가 null 또는 undefined가 아닌 요소만을 걸러내어 새로운 배열을 생성하고 있습니다. 
이는 데이터 목록 중 유효하지 않은 항목을 제외시키기 위함입니다.

key는 React가 리스트의 각 항목을 식별하는 데 사용하는 고유한 값입니다. 
ShopProduct.productId가 유효하다면 그 값을 key로 사용하고, 
그렇지 않다면 (예를 들어, productId가 null 또는 undefined인 경우) 배열의 인덱스(index)를 대신 key 값으로 사용합니다.
*/
