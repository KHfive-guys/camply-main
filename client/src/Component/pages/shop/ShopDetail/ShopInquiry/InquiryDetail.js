import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentWriter from "./InquiryComment/CommentWriter";
import "../../css/ShopDetail/ShopInquiry/InquiryDetail.css";

const InquiryDetail = () => {
  const { questionNo } = useParams();
  const [question, setQuestion] = useState(null);
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

  // 문의글 세부 정보 및 댓글 목록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionResponse = await axios.get(
          `http://localhost:8080/shop/question/${questionNo}`
        );
        setQuestion(questionResponse.data);
        const commentsResponse = await axios.get(
          `http://localhost:8080/shop/question/comment/list/${questionNo}`
        );
        setComments(commentsResponse.data);
        const userId = extractUserIdFromToken();
        setCurrentUser(userId);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생", error);
      }
    };

    fetchData();
  }, [questionNo]);

  // 문의글 삭제 핸들러
  const handleDeleteClick = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(
          `http://localhost:8080/shop/question/delete/${questionNo}`
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
      <div className='container-question'>
        {question ? (
          <>
            <div className='details'>
              <p className='writer'>작성자 {question.questionName}</p>
              <p className='date'>작성날짜 {question.questionDate}</p>
              <p className='hit'>
                조회수:{" "}
                <span className='hit-count'>{question.questionHit}</span>
              </p>
            </div>
            <p>내용 {question.questionText}</p>
            <div>
              {question.userId === currentUser && (
                <>
                  <button
                    onClick={() => navigate(`/inquiry/update/${questionNo}`)}
                  >
                    수정
                  </button>
                  <button onClick={handleDeleteClick}>삭제</button>
                </>
              )}
            </div>
          </>
        ) : (
          <p>문의글을 찾을 수 없습니다.</p>
        )}
      </div>

      <CommentWriter questionNo={+questionNo} updateComments={() => {}} />
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

export default InquiryDetail;
