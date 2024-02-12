import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentWriter from "./InquiryComment/CommentWriter";
import "../../css/ShopDetail/ShopInquiry/InquiryDetail.css";
import Nav from '../../../camp/CampNavbar';
import { Button } from "@mui/material";

const InquiryDetail1 = () => {
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
    <Nav/>
    <h2 style={{marginTop:'100px'}}>상품문의</h2>
    <div className="review-table-view">
        <table summary="게시글 보기">
            {question ? (
                <>
            <thead>
                <tr>
                    <th>
                        <div className="tb-center">{question.questionTitle}</div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="line">
                        <div className="content-sub">
                            <div>
                                <span>
                                    <em>Date :</em>
                                    {question.questionDate}
                                </span>
                            </div>
                            <div>
                                <span className="writer">
                                   <em>작성자 :</em>
                                   {question.userName}
                                </span>
                                <span>
                                    <em>조회수:</em>
                                    {question.questionHit}
                                </span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="data-content">
                            {question.questionText}
                        </div>
                    </td>
                </tr>
            </tbody>
            <div>
          {question.userId === currentUser && ( // question -> review로 변경
            <>
              <div style={{marginTop:'30px',marginRight:'10px'}} className="Detail-btn">
                <div style={{marginRight:'10px'}} className="edit-btn">
                  <button
                  type='button'className="btn-update"
                    onClick={() => navigate(`/inquiry/update/${questionNo}`)} // inquiry -> review로 변경
                  >
                    수정
                  </button>
                </div>
                <div className="delete-btn">
                  <button
                  className="delete-btn1"
                  onClick={handleDeleteClick}>삭제</button>
                  </div>
              </div>
            </>
          )}
        </div>
            </>
            ):(
            <p>문의글을 찾을 수 없습니다.</p>
            )}
        </table>
    </div>
    <br/>
    <div className="comment-container">
        <div style={{marginTop:'70px'}}>
        <CommentWriter questionNo={+questionNo} updateComments={() => {}} />
        <div className='comment-list'>
            <h3>덧글 목록</h3>
            {comments.map((comment) => (
                <div key={comment.commentNo} className='comment-list'>
                <div className="commentDate">
                    <p>{comment.commentDate}</p>
                </div>
                <div className="commentText">
                <p>{comment.commentText}</p>
                </div>

                </div>
            ))}
        </div>
        </div>
    </div>
    </>
)
};

export default InquiryDetail1;