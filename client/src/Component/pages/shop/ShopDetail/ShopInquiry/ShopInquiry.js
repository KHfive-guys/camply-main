// ShopInquiry.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import '../../css/ShopDetail/ShopInquiry/ShopInquiry.css';
import InquiryDetail from './InquiryDetail';

const ShopInquiry = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const navigate = useNavigate(); // 

  useEffect(() => {
    const questionList = async () => {
      try {
        const response = await axios.get('http://localhost:8080/shop/question/all');
        setQuestions(response.data);
      } catch (error) {
        console.error("문의글 불러오는 중 에러 발생!!", error);
      }
    };
    questionList();
  }, []);

  
  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  // 작성하기 버튼 클릭 시 이동하는 함수
  const handleWriteClick = () => {
    navigate('/inquiry/writer'); // 
  };

  return (
    <div className='inquiry-main'>
      <section>
        <h2 style={{textAlign:'center'}}>문의</h2>
        <ul className="comment-list">
          {questions.map((question) => (
            <li key={question.questionNo}>
              <p className="author">작성자 {question.questionName}</p>
              <div className="comment" onClick={() => handleQuestionClick(question)}>
                <Link to={`/shop/question/view/${question.questionNo}`}>
                  <h3 className="title">{question.questionTitle}</h3>
                </Link>
              </div>
            </li>
          ))}
          <div className='inqueiry-btn'>
            <button type='button' onClick={handleWriteClick}>작성하기</button>
          </div>
        </ul>
        
      </section>
      {selectedQuestion && <InquiryDetail questionNo={selectedQuestion.questionNo} />}
    </div>
  );
};

export default ShopInquiry;
