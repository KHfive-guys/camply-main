import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewWriter = () => {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState({
    reviewNo: '', // 변경: 초기값을 빈 문자열로 설정
    userId: '',
    productId: '',
    reviewTitle: '',
    reviewText: '',
    reviewName: '',
  });

  const { userId, productId, reviewTitle, reviewText, reviewName } = reviews;

  useEffect(() => {
    const fetchUserAndProductInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/shop/main/view/${productId}`);
        setReviews((prevReviews) => ({
          ...prevReviews,
          userId: response.data.userId,
          productId: response.data.productId,
        }));
      } catch (error) {
        console.error('사용자 ID 및 상품 ID 가져오기 에러', error);
      }
    };

    fetchUserAndProductInfo();
  }, []);

  const onChange = (event) => {
    const { value, name } = event.target;
    setReviews((prevReviews) => ({
      ...prevReviews,
      [name]: value,
    }));
  };

  const saveReview = async () => {
    try {
      await axios.post(`http://localhost:8080/review/post`, reviews);
      alert('리뷰 작성완료');
      navigate('/review/all');
    } catch (error) {
      alert('리뷰 작성 실패');
      console.error('리뷰 저장 중 에러', error);
    }
  };

  const backToList = () => {
    navigate('/review');
  };

  return (
    <>
      <div>
        <span>유저ID</span>
        <input
          type='text'
          name='userId'
          value={userId}
          onChange={onChange}
        />
      </div>
      <br />
      <div>
        <span>제목</span>
        <input type="text" name="reviewTitle" value={reviewTitle} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>작성자</span>
        <input type="text" name="reviewName" value={reviewName} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>내용</span>
        <textarea name="reviewText" value={reviewText} onChange={onChange} />
      </div>
      <br />
      <div>
        <button onClick={saveReview}>작성</button>
        <button onClick={backToList}>취소</button>
      </div>
    </>
  );
};

export default ReviewWriter;
