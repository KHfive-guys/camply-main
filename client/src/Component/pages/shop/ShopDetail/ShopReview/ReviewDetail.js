import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentWriter from "./ReviewComment/CommentWriter"; // 경로명에 question 관련된 부분이 없어 변경하지 않음
import "../../css/ShopDetail/ShopReview/ReviewDetail.css"; // 경로명에 question 관련된 부분이 없어 변경하지 않음

const ReviewDetail = () => {
  const { reviewNo } = useParams(); // questionNo -> reviewNo로 변경
  const [review, setReview] = useState(null); // question -> review로 변경
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  // 토큰에서 사용자 ID 추출하는 함수
  const extractUserIdFromToken = () => {
    const token = localStorage.getItem("yourTokenKey");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedToken = JSON.parse(window.atob(base64));
      return decodedToken.user_id; // 사용자 ID 반환
    }
    return null;
  };

  // 리뷰 세부 정보 및 댓글 목록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewResponse = await axios.get(
          `http://localhost:8080/shop/review/${reviewNo}` // question -> review로 변경
        );
        setReview(reviewResponse.data); // setQuestion -> setReview로 변경
        const commentsResponse = await axios.get(
          `http://localhost:8080/shop/review/comment/list/${reviewNo}` // questionNo -> reviewNo로 변경
        );
        setComments(commentsResponse.data);
        const userId = extractUserIdFromToken();
        setCurrentUser(userId);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생", error);
      }
    };

    fetchData();
  }, [reviewNo]); // questionNo -> reviewNo로 변경

  // 리뷰 삭제 핸들러
  const handleDeleteClick = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(
          `http://localhost:8080/shop/review/delete/${reviewNo}` // question -> review로 변경
        );
        alert("삭제 완료");
        navigate("/shop/main");
      } catch (error) {
        console.error("삭제중 에러 발생: ", error);
      }
    }
  };

  return (
    <>
      <div className='container-review'>
        {review ? ( // question -> review로 변경
          <>
            <div className='details'>
              <p className='writer'>작성자 {review.reviewName}</p>
              <p className='date'>작성날짜 {review.reviewDate}</p>
              <p className='hit'>
                조회수: <span className='hit-count'>{review.reviewHit}</span>
              </p>
            </div>
            <p>내용 {review.reviewText}</p>
            <div>
              {review.userId === currentUser && ( // question -> review로 변경
                <>
                  <button
                    onClick={() => navigate(`/review/update/${reviewNo}`)} // inquiry -> review로 변경
                  >
                    수정
                  </button>
                  <button onClick={handleDeleteClick}>삭제</button>
                </>
              )}
            </div>
          </>
        ) : (
          <p>리뷰를 찾을 수 없습니다.</p> // 문의글 -> 리뷰로 변경
        )}
      </div>

      <CommentWriter reviewNo={+reviewNo} updateComments={() => {}} />
      <div className='comment-list'>
        <h3>덧글 목록</h3>
        {comments.map((comment) => (
          <div key={comment.commentNo} className='comment'>
            <p>{comment.commentText}</p>
            <p>{comment.commentDate}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewDetail;
