import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ShopReview = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/review/view/${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("리뷰 불러오는 중 에러 발생!!", error);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleReviewClick = (selectedReview) => {
    console.log("Selected Review:", selectedReview);
  };

  const handleWriteClick = () => {
    navigate('/review/writer');
  };

  return (
    <div>
      <section>
        <h2 style={{ textAlign: 'center' }}>리뷰</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review.reviewNo || review.productId}>
              <p>작성자 {review.reviewName}</p>
              <div onClick={() => handleReviewClick(review)}>
                <Link to={`/review/view/${review.reviewNo}`}>
                  <h3>{review.reviewTitle}</h3>
                </Link>
              </div>
            </li>
          ))}
          <div>
            <button type="button" onClick={handleWriteClick}>
              작성하기
            </button>
          </div>
        </ul>
      </section>
    </div>
  );
};

export default ShopReview;
