import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const InquiryWriter = () => {

    const navigate = useNavigate();


    const [question, setQuestion] = useState({
        questionNo:'0',
        questionTitle:'',
        questionText:'',
        questionName:'',

    });

    const {questionNo, questionTitle, questionText,questionName} = question;

    const onChange = (event) => {
        const {value, name } = event.target;
        setQuestion({
            ...question,
            [name]:value,
        });
    };

    const saveQuestion = async () => {
        await axios.post(`http://localhost:8080/shop/question/post`, question)
        .then((res) => {
          console.log(res);
            alert('문의 등록완료!');
            navigate('/inquiry/all')
        });
    };

    const backToList = () => {
        navigate('/inquiry')
    };


    return(
        <>
          <div>
          <span>제목</span>
            <input 
            type="text"
            name="questionTitle"
            value={questionTitle}
            onChange={onChange}
                />
          </div>
          <br/>
          <div>
            <span>작성자</span>
            <input 
            type="text"
            name="questionName"
            value={questionName}
            onChange={onChange}
            />
          </div>
          <br/>
          <div>
            <span>내용</span>
            <textarea
            name='questionText'
            value={questionText}
            onChange={onChange}
            ></textarea>
          </div>
          <br/>
          <div>
            <button onClick={saveQuestion}>저장</button>
            <button onClick={backToList}>취소</button>
          </div>
        </>
    )

}

export default InquiryWriter;