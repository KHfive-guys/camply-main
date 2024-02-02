import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CommentWriter = ({ reviewNo, updateComments }) => {
  // props로 reviewNo 받음
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    commentText: "",
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
      const response = await axios.post(
        `http://localhost:8080/shop/review/comment/post`,
        {
          ...comment,
          reviewNo: reviewNo, // 숫자형 reviewNo 사용
        }
      );
      if (response.status === 200) {
        alert("덧글 등록 완료");
        navigate(`/shop/review/view/${reviewNo}`);
        updateComments(); // 덧글 목록 업데이트
      } else {
        alert("덧글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("덧글 등록 중 오류 발생", error);
      alert("덧글 등록에 실패했습니다.");
    }
  };

  const backToList = () => {
    navigate(`/shop/review/view/${reviewNo}`);
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
