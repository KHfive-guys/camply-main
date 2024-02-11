import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentWriter from "./ReviewComment/CommentWriter"; // 경로명에 question 관련된 부분이 없어 변경하지 않음
import "../../css/ShopDetail/ShopReview/ReviewDetail.css"; // 경로명에 question 관련된 부분이 없어 변경하지 않음
import Nav from '../../../camp/CampNavbar';
import { Button } from "@mui/material";


const ReviewDetail1 = () => {
  const { reviewNo } = useParams(); // questionNo -> reviewNo로 변경
  const [review, setReview] = useState(reviewNo); // question -> review로 변경
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
          `http://localhost:8080/shop/review/${reviewNo}`
        );
        setReview(reviewResponse.data);
        const commentsResponse = await axios.get(
          `http://localhost:8080/shop/review/comment/list/${reviewNo}`
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
        <Nav/>
        <h2 style={{marginTop:'100px'}}>상품리뷰</h2>
        <div className="review-table-view">
            <table summary="게시글 보기">
                {review ? (
                    <>
                <thead>
                    <tr>
                        <th>
                            <div className="tb-center">{review.reviewTitle}</div>
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
                                        {review.reviewDate}
                                    </span>
                                </div>
                                <div>
                                    <span className="writer">
                                       <em>작성자 :</em>
                                       {review.userName}
                                    </span>
                                    <span>
                                        <em>조회수:</em>
                                        {review.reviewHit}
                                    </span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="data-content">
                                {review.reviewText}
                            </div>
                        </td>
                    </tr>
                </tbody>
                <div>
              {review.userId === currentUser && ( // question -> review로 변경
                <>
                  <div style={{marginTop:'30px',marginRight:'10px'}} className="Detail-btn">
                    <div style={{marginRight:'10px'}} className="edit-btn">
                      <Button
                      type='button' variant="contained" color="success"
                        onClick={() => navigate(`/review/update/${reviewNo}`)} // inquiry -> review로 변경
                      >
                        수정
                      </Button>
                    </div>
                    <div className="delete-btn">
                      <Button
                      variant="outlined" color="error"
                      onClick={handleDeleteClick}>삭제</Button>
                      </div>
                  </div>
                </>
              )}
            </div>
                </>
                ):(
                <p>리뷰를 찾을 수 없습니다.</p>
                )}
            </table>
        </div>
        <br/>
        <div className="comment-container">
            <div style={{marginTop:'70px'}}>
            <CommentWriter reviewNo={+reviewNo} updateComments={() => {}} />
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

export default ReviewDetail1;