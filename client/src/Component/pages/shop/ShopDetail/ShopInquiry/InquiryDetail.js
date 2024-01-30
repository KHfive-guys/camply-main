import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentWriter from './InquiryComment/CommentWriter';
import '../../css/ShopDetail/ShopInquiry/InquiryDetail.css';



const InquiryDetail = () => {
    const { questionNo } = useParams();
    const [question, setQuestion] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    const updateComments = async () => {
    try {
        if (questionNo) {
            const response = await axios.get(`http://localhost:8080/comment/${questionNo}`);
            // 만약 댓글이 배열로 구성되어 있다면 실제 댓글을 담고 있는 키로 수정
            setComments(response.data.comments);  // 'comments'를 실제 댓글을 담고 있는 키로 교체
        } else {
            console.error('questionNo가 정의되지 않았습니다.');
        }
    } catch (error) {
        console.error('댓글 목록을 가져오는 중 오류 발생', error);
    }
};
    
 

  const handleDeleteClick = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await axios.delete(
          `http://localhost:8080/shop/question/delete/${questionNo}`
        );
        
        alert('삭제 완료');
        navigate(`/shop/question/view`);    
      } catch (error) {
        console.error('삭제중 애러: ', error);
      }
    }
  };


    const moveToUpdate = () => {
        navigate(`/inquiry/update/${questionNo}`);
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/shop/question/view/${questionNo}`);
                setQuestion(response.data);
            } catch (error) {
                console.error('문의글 세부 정보를 불러오는 중 오류 발생', error);
            }
        };
        fetchData();
        updateComments(); // 페이지 로딩 시 덧글 목록을 가져오도록 호출
    }, [questionNo]);

    return (
        <>
            <div className="container-question">
                {question ? (
                    <>
                        <div className="details">
                            <p className="writer">작성자 {question.questionName}</p>
                            <p className="date">작성날짜 {question.questionDate}</p>
                            <p className="hit">조회수: <span className="hit-count">{question.questionHit}</span></p>
                        </div>
                        <p>내용 {question.questionText}</p>
                        <div>
                            <button onClick={moveToUpdate}>수정</button>
                            <button onClick={handleDeleteClick}>삭제</button>
                            
                        </div>
                    </>
                ) : (
                    <p>덧글을 찾을 수 없습니다.</p>
                )}
            </div>

            {/* 덧글 작성 폼과 덧글 목록을 표시 */}
            <CommentWriter questionNo={questionNo} updateComments={updateComments} />
            <div className="comment-list">
                <h3>덧글 목록</h3>
                {Array.isArray(comments) && comments.map((comment) => (
                    <div key={comment.commentNo} className="comment">
                        <p>{comment.commentText}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default InquiryDetail;
