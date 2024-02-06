// ShopInquiry.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom"; // useParams 추가
import "../../css/ShopDetail/ShopInquiry/ShopInquiry.css";
import InquiryDetail from "./InquiryDetail";
import {Button} from '@mui/material';
import { FaCheck } from "react-icons/fa";



const ShopInquiry = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const { productId } = useParams(); // URL 파라미터에서 productId 추출


  



  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // productId를 사용하여 해당 제품의 문의글만 가져오는 엔드포인트로 수정
        const response = await axios.get(
          `http://localhost:8080/shop/question/view/${productId}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("문의글 불러오는 중 에러 발생!!", error);
      }
    };

    if (productId) {
      fetchQuestions();
    } else {
      console.error("productId가 정의되지 않았습니다.");
    }
  }, [productId]);

  // 문의글 클릭 시 상세 정보 페이지로 이동하는 함수
  const handleQuestionClick = (questionNo) => {
    navigate(`/shop/question/view/${questionNo}`);
  };

  // 작성하기 버튼 클릭 시 이동하는 함수
  const handleWriteClick = () => {
    // 문의글 작성 경로에 productId를 포함하여 수정
    navigate(`/inquiry/writer?productId=${productId}`);
  };

  return (
    <div className='inquiry-main'>
      <section>
        <h2 style={{ textAlign: "center" }}>문의</h2>
        <ul className='comment-list'>
          {questions.map((question) => (
            <li key={question.questionNo}>
              <p className='author'>작성자 {question.questionName}</p>
              <div
                className='comment'
                onClick={() => handleQuestionClick(question.questionNo)}
              >
                <h3 className='title'>{question.questionTitle}</h3>
              </div>
            </li>
          ))}
          <div className='inquiry-btn'>
          <Button type='button' variant="contained" color="success" onClick={handleWriteClick}>
            작성하기 <FaCheck/>
          </Button>
        </div>
        </ul>
      </section>
    </div>
  );
};

export default ShopInquiry;
