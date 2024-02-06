import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom"; 

const QuestionPost = () => {
  const [questionData, setQuestionData] = useState({
      productId: 0, // 상품 ID
      questionTitle: '', // 문의 제목
      questionText: '', // 문의 내용
  });
  const location = useLocation(); // URL 정보 사용
  const navigate = useNavigate();
  useEffect(() => {
      // URL에서 productId 추출
      const query = new URLSearchParams(location.search);
      const productId = query.get('productId');
      if (productId) {
          setQuestionData({ ...questionData, productId });
      }
  }, [location]);

    // 입력값 변경 핸들러
    const handleChange = (e) => {
      const { name, value } = e.target;
      setQuestionData({
          ...questionData,
          [name]: value,
      });
  };

    // 문의글 작성 핸들러
    const handleSubmit = async (e) => {
      e.preventDefault();
        const token = localStorage.getItem("yourTokenKey");
        let userName, userId;
        if (token) {
            const decodedToken = JSON.parse(window.atob(token.split('.')[1]));
            userName = decodedToken.USER_NAME; // 토큰에서 추출한 사용자 이름
            userId = decodedToken.user_id;     // 토큰에서 추출한 사용자 ID
         
        }

        const postData = {
            ...questionData,
            userId: userId, // 토큰에서 추출한 사용자 ID
            userName: userName, // 토큰에서 추출한 사용자 이름
        };

        try {
          await axios.post('http://localhost:8080/shop/question/post', postData);
          alert('문의글이 작성되었습니다.');
          navigate(`/shop/detail/${questionData.productId}`);
      } catch (error) {
          console.error('문의글 작성 중 오류 발생', error);
          alert('문의글 작성에 실패했습니다.');
      }
  };

    return (
      <form onSubmit={handleSubmit}>
          {/* productId 필드는 hidden 유형으로 변경 */}
          <input
              type="hidden"
              name="productId"
              value={questionData.productId}
          />
          <input
              type="text"
              name="questionTitle"
              placeholder="문의 제목"
              value={questionData.questionTitle}
              onChange={handleChange}
          />
          <textarea
              name="questionText"
              placeholder="문의 내용"
              value={questionData.questionText}
              onChange={handleChange}
          />
          <button type="submit">문의글 작성</button>
      </form>
  );
};

export default QuestionPost;
