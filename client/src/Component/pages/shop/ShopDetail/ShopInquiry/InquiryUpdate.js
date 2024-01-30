import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const InquiryUpdate = () => {
  const navigate = useNavigate();
  const { questionNo } = useParams();
  const [question, setQuestion] = useState({
    questionNo: 0,
    questionTitle: "",
    questionText: "",
    questionName: "",
  });

  const { questionTitle, questionText, questionName } = question;

  const onChange = (event) => {
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  };

  const getQuestion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/shop/question/view/${questionNo}`
      );
      // 문의글 정보를 서버로부터 받아와서 상태를 업데이트
      setQuestion(response.data);
    } catch (error) {
      console.error("문의글 정보를 불러오는 중 오류 발생", error);
      // 문의글 정보를 받아오지 못했을 때 초기 상태로 설정
      setQuestion({
        questionNo: 0,
        questionTitle: "",
        questionText: "",
        questionName: "",
      });
    }
  };

  const updateQuestion = async (event) => {
    event.preventDefault(); // 폼 제출 방지
    try {
      await axios.patch(
        `http://localhost:8080/shop/question/update/ ` + questionNo,
        {
          questionTitle,
          questionText,
        }
      );
      // 문의글 정보를 서버로부터 받아와서 상태를 업데이트
      getQuestion();
      alert("수정 완료!");
      navigate(`/shop/question`);
    } catch (error) {
      console.error("문의글 수정 중 오류 발생", error);
    }
  };

  const backToList = () => {
    navigate(`/shop/question/view/${questionNo}`);
  };

  useEffect(() => {
    getQuestion();
  }, [questionNo]);

  return (
    <div>
      <form onSubmit={updateQuestion}>
        <div>
          <span>제목</span>
          <input
            type='text'
            name='questionTitle'
            value={question.questionTitle}
            onChange={onChange}
          />
        </div>
        <br />

        <br />
        <div>
          <span>내용</span>
          <textarea
            name='questionText'
            value={question.questionText}
            onChange={onChange}
          />
        </div>
        <br />
        <div>
          <button type='submit'>수정</button>
          <button onClick={backToList}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default InquiryUpdate;