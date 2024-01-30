import axios from "axios";
import React, {useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";


const ShopReview = () => {


    const { reviewNo } = useParams();
    const [reviews, setReviews] = useState(null);
    const navigate = useNavigate();


    //수정 버튼 클릭시 페이지 이동
    const handleUpdateClick = (reviewNo) => {
        navigate(`review/update/${reviewNo}`);
    };

    const handleDeleteClick = async (reviewNo) => {
        if(window.confirm('리뷰를 삭제하시겠습니까?')) {
            try{
                const response = await axios.delete(`http://localhost:8080/review/delete/${reviewNo}`);

                //성공적으로 삭제된 경우

                if(response.status == 200) {
                    alert('삭제되었습니다.');
                    navigate('review/all');
                } else {
                    alert('삭제에 실패했습니다.');
                }
            
            } catch (error) {
                console.error('삭제중 오류 발생:', error);
                alert('삭제에 실패했습니다.');
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/review/view/${reviewNo}`);
                setReviews(response.data);

            }catch(error) {
                console.error("리뷰글 세부 정보를 불러오는 중 오류 발생", error);
            }
        };
        fetchData();
    }, [reviewNo]);


    return (
        <>
        <div>
            {reviews ? (
                <>
                    <div>
                        <p>작성자 {reviews.reviewName}</p>
                        <p>작성일 {reviews.reviewDate}</p>
                        <p>조회수 {reviews.reviewHit}</p>
                    </div>
                    <p>내용 {reviews.reviewText}</p>
                </>
            ):(
                <p>리뷰를 찾을 수 없습니다.</p>
            )}
        </div>
        <div>
            <button onClick={handleDeleteClick}>삭제</button>
            <button onClick={() => handleUpdateClick(reviews.reviewNo)}>수정</button>
        </div>
        </>
    );
};

export default ShopReview;