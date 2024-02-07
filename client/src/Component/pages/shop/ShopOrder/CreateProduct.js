import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Container } from "react-bootstrap";
import "../../camp/CampBoard/css/CampBoard.css";
import CampNavbar from "../../camp/CampNavbar";

function BbsWrite() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [newBoard, setNewBoard] = useState({
    USER_ID: 0,
    PRODUCT_ID: 0,
    PRODUCT_DESCRIPTION: "",
    PRODUCT_PRICE: 0,
    PRODUCT_CATEGORY: "",
    PRODUCT_COLOR: "",
    PRODUCT_THUMBNAIL: "",
    PRODUCT_MAIN: "",
    PRODUCT_MAIN2: "",
    PRODUCT_MAIN3: "",
    PRODUCT_CONTENT: "",
    PRODUCT_CREATE_DATE: "",
    PRODUCT_STOCK: 0,
    PRODUCT_STATUS:"",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBoard((prevNewBoard) => ({
      ...prevNewBoard,
      [name]: value,
    }));
  };

  const boardAdd = () => {
    axios
      .post("http://localhost:8080/shop/mypage/productAdd", {
        ...newBoard,
      })
      .then((response) => {
        console.log("성공", response.data);
        setNewBoard({
          USER_ID: 0,
    PRODUCT_ID: 0,
    PRODUCT_DESCRIPTION: "",
    PRODUCT_PRICE: 0,
    PRODUCT_CATEGORY: "",
    PRODUCT_COLOR: "",
    PRODUCT_THUMBNAIL: "",
    PRODUCT_MAIN: "",
    PRODUCT_MAIN2: "",
    PRODUCT_MAIN3: "",
    PRODUCT_CONTENT: "",
    PRODUCT_CREATE_DATE: "",
    PRODUCT_STOCK: 0,
    PRODUCT_STATUS:"",
        });
        navigate("/camp/board/all");
      })
      .catch((error) => {
        console.error("실패", error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("yourTokenKey");

    const parseJwt = (token) => {
      try {
        return JSON.parse(
          decodeURIComponent(escape(atob(token.split(".")[1])))
        );
      } catch (e) {
        return null;
      }
    };

    const decodeUTF8 = (input) => {
      try {
        return decodeURIComponent(escape(input));
      } catch (e) {
        return input;
      }
    };

    if (token) {
      try {
        const decodedToken = parseJwt(token);
        console.log("Decoded Token:", decodedToken);

        setUserId(decodedToken.user_id || "");
        setNewBoard((prevNewBoard) => ({
          ...prevNewBoard,
          user_id: decodedToken.user_id || "",
        }));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <div className="create-update-Product">
      <h2>상품등록</h2>

      <div className="form-group">
        <label htmlFor="productName">상품명: </label>
        <input
          type="text"
          name="PRODUCT_NAME"
          onChange={handleInputChange}
          value={newBoard.PRODUCT_NAME}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productDescription">상품설명: </label>
        <input
          type="text"
          name="PRODUCT_DESCRIPTION"
          onChange={handleInputChange}
          value={newBoard.PRODUCT_DESCRIPTION}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productPrice">판매가: </label>
        <input
          type="text"
          name="PRODUCT_PRICE"
          onChange={handleInputChange}
          value={newBoard.PRODUCT_PRICE}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="PRODUCT_CATEGORY">카테고리: </label>
        <div className="dropdown">
          <select
            name="PRODUCT_CATEGORY"
            onChange={handleInputChange}
            value={newBoard.PRODUCT_CATEGORY}
            className="form-control"
          >
            <option value="tent">tent</option>
            <option value="sleepingbag">sleepingbag</option>
            <option value="lamp">lamp</option>
            <option value="fireplace">fireplace</option>
            <option value="chair">chair</option>
            <option value="kitchen">kitchen</option>
          </select>
          <div className="dropdown-icon">&#9660;</div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="PRODUCT_COLOR">색상: </label>
        <input
          type="text"
          name="PRODUCT_COLOR"
          onChange={handleInputChange}
          value={newBoard.PRODUCT_COLOR}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="PRODUCT_THUMBNAIL">썸네일 이미지 URL: </label>
        <input
          type="text"
          name="PRODUCT_THUMBNAIL"
          onChange={handleInputChange}
          value={newBoard.PRODUCT_THUMBNAIL}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="PRODUCT_MAIN">메인이미지 URL: </label>
        <input
          type="text"
          name="PRODUCT_MAIN"
          onChange={handleInputChange}
          value={newBoard.PRODUCT_MAIN}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="PRODUCT_CONTENT">컨텐츠 이미지 URL: </label>
        <input
          type="text"
          name="PRODUCT_CONTENT"
          onChange={handleInputChange}
          value={newBoard.PRODUCT_CONTENT}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="PRODUCT_STOCK">재고: </label>
        <input
          type="text"
          name="PRODUCT_STOCK"
          onChange={handleInputChange}
          value={newBoard.PRODUCT_STOCK}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="PRODUCT_CREATE_DATE">상품등록일: </label>
        <input
          type="text"
          name="PRODUCT_CREATE_DATE"
          onChange={handleInputChange}
          value={newBoard.PRODUCT_CREATE_DATE}
          readOnly
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="PRODUCT_STATUS">상품상태: </label>
        <div className="dropdown">
          <select
            name="PRODUCT_STATUS"
            onChange={handleInputChange}
            value={newBoard.PRODUCT_STATUS}
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
        <button type="submit" onClick={boardAdd}>
          등록
        </button>
      </div>
    </div>
  );
};

export default BbsWrite;
