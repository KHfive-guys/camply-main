import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../../../App.css';
const UpdateProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams(); // URL에서 productId를 추출
  const [product, setProduct] = useState(null); // 초기 상태를 null로 설정

  //수정할 페이지 불러옴
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error('No productId provided');
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/shop/mypage/product/${productId}`
        );
        setProduct(response.data); // 응답 데이터로 상태를 업데이트
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [productId]); // 의존성 배열에 productId를 추가하여 productId가 변경될 때마다 함수를 실행

  // 입력 필드의 변경을 처리하는 함수
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  // 폼 제출을 처리하는 함수
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/shop/mypage/product/edit/${productId}`,
        product
      );
      alert('상품이 성공적으로 수정되었습니다.');
      navigate('/seller/list');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('상품 수정에 실패했습니다.');
    }
  };

  //조회 페이지로 되돌아가기
  const handleCancel = () => {
    navigate('/seller/list');
  };

  if (!product) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }

  return (
    <div>
      <h2>상품수정</h2>
      <form onSubmit={handleSubmit}>
        {/* 각 필드를 입력할 수 있는 입력 요소를 생성합니다. */}
        <div className="form-group">
          <label htmlFor="userId">판매자: </label>
          <input
            type="text"
            name="userId"
            value={product.userId || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* 상품코드 입력 필드 */}
        <div className="form-group">
          <label htmlFor="productCode">상품코드: </label>
          <input
            type="text"
            name="productCode"
            value={product.productCode || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* 상품명 입력 필드 */}
        <div className="form-group">
          <label htmlFor="productName">상품명: </label>
          <input
            type="text"
            name="productName"
            value={product.productName || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* 상품설명 입력 필드 */}
        <div className="form-group">
          <label htmlFor="productDescription">상품설명: </label>
          <input
            type="text"
            name="productDescription"
            value={product.productDescription || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* 판매가 입력 필드 */}
        <div className="form-group">
          <label htmlFor="productPrice">판매가: </label>
          <input
            type="text"
            name="productPrice"
            value={product.productPrice || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* 카테고리 선택 드롭다운 */}
        <div className="form-group">
          <label htmlFor="productCategory">카테고리: </label>
          <div className="dropdown">
            <select
              name="productCategory"
              onChange={handleInputChange}
              value={product.productCategory || ''}
              className="form-control"
            >
              <option value="tent">텐트(10)</option>
              <option value="sleepingbag">침낭(20)</option>
              <option value="lamp">램프(30)</option>
              <option value="fireplace">화로BBQ(40)</option>
              <option value="chair">의자(50)</option>
              <option value="kitchen">키친(60)</option>
            </select>
            <div className="dropdown-icon">&#9660;</div>
          </div>
        </div>
        {/* 색상 입력 필드 */}
        <div className="form-group">
          <label htmlFor="productColor">색상: </label>
          <input
            type="text"
            name="productColor"
            value={product.productColor || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* 썸네일 이미지 URL 입력 필드 */}
        <div className="form-group">
          <label htmlFor="productThumbnail">썸네일 이미지 URL: </label>
          <input
            type="text"
            name="productThumbnail"
            value={product.productThumbnail || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* 메인이미지 URL 입력 필드 */}
        <div className="form-group">
          <label htmlFor="productMain">메인이미지 URL: </label>
          <input
            type="text"
            name="productMain"
            value={product.productMain || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* 컨텐츠 이미지 URL 입력 필드 */}
        <div className="form-group">
          <label htmlFor="productContent">컨텐츠 이미지 URL: </label>
          <input
            type="text"
            name="productContent"
            value={product.productContent || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* 재고 입력 필드 */}
        <div className="form-group">
          <label htmlFor="productStock">재고: </label>
          <input
            type="text"
            name="productStock"
            value={product.productStock || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* 등록일 입력 필드 */}
        <div className="form-group">
          <label htmlFor="productCreateDate">상품등록일: </label>
          <input
            type="text"
            name="productCreateDate"
            value={product.productCreateDate || ''}
            readOnly
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* 상품상태 선택 드롭다운 */}
        <div className="form-group">
          <label htmlFor="productStatus">상품상태: </label>
          <div className="dropdown">
            <select
              name="productStatus"
              onChange={handleInputChange}
              value={product.productStatus || ''}
              className="form-control"
            >
              <option value="판매중">판매중</option>
              <option value="판매중지">판매중지</option>
              <option value="판매종료">품절</option>
            </select>
            <div className="dropdown-icon">&#9660;</div>
          </div>
        </div>
        {/* 버튼 그룹 */}
        <div className="form-group">
          <button type="submit" className="btn">
            저장
          </button>
          &nbsp;
          <button type="button" onClick={handleCancel} className="btn">
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
