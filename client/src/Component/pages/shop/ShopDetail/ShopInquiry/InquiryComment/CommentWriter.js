import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const CommentWriter = ({ updateComments }) => {
    const navigate = useNavigate();
    const { questionNo } = useParams();
    const [comment, setComment] = useState({
        
        commentNo: 0,
        commentText: '',
    });
    const { commentText } = comment;

    const onChange = (event) => {
        const { value, name } = event.target;
        setComment({
            ...comment,
            [name]: value,
        });
    };

    const saveComment = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/comment/post`, { ...comment, questionNo });
            if (response.status === 200) {
                alert('덧글 등록 완료');
                navigate(`/shop/question/view/${questionNo}`);
                updateComments(); // 덧글 목록 업데이트
            } else {
                alert('덧글 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('덧글 등록 중 오류 발생', error);
            alert('덧글 등록에 실패했습니다.');
        }
    };

    const backToList = () => {
        navigate(`/shop/question/view/${questionNo}`);
    };

    return (
        <>
            <div>
                <span>내용</span>
                <input
                    type='text'
                    name='commentText'
                    value={commentText}
                    onChange={onChange}
                />
            </div>
            <div>
                <button onClick={saveComment}>작성</button>
                <button onClick={backToList}>취소</button>
            </div>
        </>
    );
};

export default CommentWriter;
