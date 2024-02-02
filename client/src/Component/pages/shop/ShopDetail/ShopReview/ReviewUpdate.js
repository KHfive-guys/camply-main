import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ReviewUpdate = () => {
  const navigate = useNavigate();
  const { reviewNo } = useParams();
  const [review, setReview] = useState({
    reviewTitle: "",
    reviewText: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const getReview = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/shop/review/${reviewNo}` // 수정: 리뷰 단건 조회 경로로 변경
      );
      setReview(response.data);
    } catch (error) {
      console.error("리뷰 정보를 불러오는 중 오류 발생", error);
    }
  };

  const updateReview = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8080/shop/review/update/${reviewNo}`,
        {
          reviewTitle: review.reviewTitle,
          reviewText: review.reviewText,
        }
      );
      alert("수정 완료!");
      navigate(`/shop/review/view/${reviewNo}`);
    } catch (error) {
      console.error("리뷰 수정 중 오류 발생", error);
    }
  };

  const backToList = () => {
    navigate(`/shop/review/view/${reviewNo}`);
  };

  useEffect(() => {
    getReview();
  }, [reviewNo]);

  return (
    <div>
      <form onSubmit={updateReview}>
        <div>
          <span>제목</span>
          <input
            type='text'
            name='reviewTitle'
            value={review.reviewTitle}
            onChange={onChange}
          />
        </div>
        <br />
        <div>
          <span>내용</span>
          <textarea
            name='reviewText'
            value={review.reviewText}
            onChange={onChange}
          />
        </div>
        <br />
        <div>
          <button type='submit'>수정</button>
          <button onClick={backToList}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewUpdate;
