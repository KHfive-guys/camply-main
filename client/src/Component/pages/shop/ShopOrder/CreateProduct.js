import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const initialProductState = {
  userId: '', //로그인 된 userId 값 받아오기
  productName: '',
  productDescription: '',
  productPrice: '',
  productCategory: 'tent',
  productColor: '',
  productThumbnail: '',
  productMain: '',
  productMain2: '',
  productMain3: '',
  productContent: '',
  productStock: '',
  productCreateDate: '',
  productStatus: '판매중',
  productCode: '',
};

const CreateProduct = () => {
  const [product, setProduct] = useState({ ...initialProductState });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input Changed:', name, value); // 로깅 추가
    setProduct({ ...product, [name]: value });
  };

  //상품등록
  const handleRegister = async () => {
    try {
      // Spring Boot 애플리케이션의 API 엔드포인트에 데이터 전송
      const response = await axios.post(
        'http://localhost:8080/shop/mypage/productAdd',
        product
      );
      console.log(response.data);
      alert('상품이 성공적으로 등록되었습니다.');
      navigate('/sell/list');
    } catch (error) {
      console.error('Error registering product:', error);
      alert('상품 등록에 실패했습니다.');
    }
  };

  return (
    <div>
      <h2>상품등록</h2>
      <div className="form-group">
        <label htmlFor="userId">판매자: </label>
        <input
          type="text"
          name="userId"
          onChange={handleInputChange}
          value={product.userId}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productCode">상품코드: </label>
        <input
          type="text"
          name="productCode"
          onChange={handleInputChange}
          value={product.productCode}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productName">상품명: </label>
        <input
          type="text"
          name="productName"
          onChange={handleInputChange}
          value={product.productName}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productDescription">상품설명: </label>
        <input
          type="text"
          name="productDescription"
          onChange={handleInputChange}
          value={product.productDescription}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productPrice">판매가: </label>
        <input
          type="text"
          name="productPrice"
          onChange={handleInputChange}
          value={product.productPrice}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productCategory">카테고리: </label>
        <div className="dropdown">
          <select
            name="productCategory"
            onChange={handleInputChange}
            value={product.productCategory}
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

      <div className="form-group">
        <label htmlFor="productColor">색상: </label>
        <input
          type="text"
          name="productColor"
          onChange={handleInputChange}
          value={product.productColor}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productThumbnail">썸네일 이미지 URL: </label>
        <input
          type="text"
          name="productThumbnail"
          onChange={handleInputChange}
          value={product.productThumbnail}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productMain">메인이미지 URL: </label>
        <input
          type="text"
          name="productMain"
          onChange={handleInputChange}
          value={product.productMain}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productContent">컨텐츠 이미지 URL: </label>
        <input
          type="text"
          name="productContent"
          onChange={handleInputChange}
          value={product.productContent}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productStock">재고: </label>
        <input
          type="text"
          name="productStock"
          onChange={handleInputChange}
          value={product.productStock}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productCreateDate">상품등록일: </label>
        <input
          type="text"
          name="productCreateDate"
          onChange={handleInputChange}
          value={product.productCreateDate}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productStatus">상품상태: </label>
        <div className="dropdown">
          <select
            name="productStatus"
            onChange={handleInputChange}
            value={product.productStatus}
            className="form-control"
          >
            <option value="판매중">판매중</option>
            <option value="판매중지">판매중지</option>
            <option value="판매종료">품절</option>
          </select>
          <div className="dropdown-icon">&#9660;</div>
        </div>
      </div>
      <div className="form-group">
        <button type="submit" onClick={handleRegister}>
          등록
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
