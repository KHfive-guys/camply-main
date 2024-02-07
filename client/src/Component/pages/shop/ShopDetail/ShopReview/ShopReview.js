import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import "../../css/ShopDetail/ShopReview/ShopReview.css"; 
import ReviewDetail from "./ReviewDetail"; 
import {Button} from '@mui/material';
import { FaCheck } from "react-icons/fa";

const ShopReview = () => {
  // 컴포넌트 이름 변경: ShopInquiry -> ShopReview
  const [reviews, setReviews] = useState([]); // 변수명 변경: questions -> reviews
  const navigate = useNavigate();
  const { productId } = useParams(); // URL 파라미터에서 productId 추출

  useEffect(() => {
    const fetchReviews = async () => {
      // 함수명 변경: fetchQuestions -> fetchReviews
      try {
        // productId를 사용하여 해당 제품의 리뷰만 가져오는 엔드포인트로 수정
        const response = await axios.get(
          `http://localhost:8080/shop/review/view/${productId}` // 경로 변경: question -> review
        );
        setReviews(response.data); // 상태 변경 함수명 수정: setQuestions -> setReviews
      } catch (error) {
        console.error("리뷰 불러오는 중 에러 발생!!", error);
      }
    };

    if (productId) {
      fetchReviews();
    } else {
      console.error("productId가 정의되지 않았습니다.");
    }
  }, [productId]);

  // 리뷰 클릭 시 상세 정보 페이지로 이동하는 함수
  const handleReviewClick = (reviewNo) => {
    // 함수명 변경: handleQuestionClick -> handleReviewClick
    navigate(`/shop/review/view/${reviewNo}`); // 경로 변경: question -> review
  };

  // 작성하기 버튼 클릭 시 이동하는 함수
  const handleWriteClick = () => {
    // 리뷰 작성 경로에 productId를 포함하여 수정
    navigate(`/review/writer?productId=${productId}`); // 경로 변경: inquiry -> review
  };

  return (
    <div className='review-main'>
      <section>
        <h2 style={{ textAlign: "center" }}>리뷰</h2>
        <ul className='comment-list'>
          {reviews.map(
            (
              review // 변수명 변경: questions -> reviews
            ) => (
              <li key={review.reviewNo}>
                <p className='author'>작성자 {review.reviewName}</p>
                <div
                  className='comment'
                  onClick={() => handleReviewClick(review.reviewNo)} // 함수 호출 변경: handleQuestionClick -> handleReviewClick
                >
                  <h3 className='title'>{review.reviewTitle}</h3>
                </div>
              </li>
            )
          )}
          <div className='inquiry-btn'>
            <Button type='button' variant="contained" color="success" onClick={handleWriteClick}>
              작성하기<FaCheck/>
            </Button>
          </div>
        </ul>
      </section>

      
    </div>
  );
};

export default ShopReview; // 변경된 컴포넌트 이름 반영
