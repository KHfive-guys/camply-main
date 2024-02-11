// ShopInquiry.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom"; // useParams 추가
import '../../css/ShopDetail/ShopInquiry/ShopInquiry.css';
import {Button} from '@mui/material';
import Pagination from "react-js-pagination";



const ShopInquiry = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const response = await axios.get(
          `http://localhost:8080/shop/question/view/${productId}`,
          {
            
          }
        );

        console.log("Fetched questions data:", response.data);

        setQuestions(response.data);
      } catch (error) {
        console.error("질문을 불러오는 중 에러 발생", error);
      }
    };

    if (productId) {
      fetchQuestions();
    } else {
      console.error("productId가 정의되지 않았습니다.");
    }
  }, [productId, currentPage]);

  const handleQuestionClick = (questionNo) => {
    navigate(`/shop/question/view/${questionNo}`);
  };

  const handleWriteClick = () => {
    navigate(`/inquiry/writer?productId=${productId}`);
  };


  return (
    <>
     <h2 style={{textAlign:'center', marginTop:'50px', marginBlock:'50px'}}>상품문의</h2>
     <a name="reviewboard"></a>
     <div className="tit-detail">
        <p className="more fe"></p>
     </div>
     <div className="table-slide review-list smaller-table">
        <table summary="번호, 제목, 작성자, 작성일, 조회">
            <colgroup>
                <col width={5}></col>
                <col width={5}></col>
                <col width={15}></col>
                <col width={15}></col>
                <col width={10}></col>
                <col width={5}></col>
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">
                        <div className="tb-center">NO</div>
                    </th>
                    <th scope="col"></th>
                    <th scope="col">
                        <div className="tb-center">제목</div>
                    </th>
                    <th scope="col">
                        <div className="tb-center">작성자</div>
                    </th>
                    <th scope="col">
                        <div className="tb-center">작성일</div>
                    </th>
                    <th scope="col">
                        <div className="tb-center">조회수</div>
                    </th>
                </tr>
            </thead>
            {questions.map((question) => (
            <tbody key={question.questionNo}>
                <tr className="nbg">
                    <td>
                       <div className="tb-center">
                         <span className="reviewnum">
                          {question.questionNo}
                         </span>
                       </div> 
                    </td>
                    <td>
                        <div className="tb-center"></div>
                    </td>
                    <td>
                        <div style={{cursor:'pointer'}}
                          onClick={() => handleQuestionClick(question.questionNo)}
                        className="tb-left reply_depth0">
                          <span>{question.questionTitle}</span>
                        </div>
                    </td>
                    <td>
                        <div className="tb-center writer">
                            <span>
                             {question.userName}
                            </span>
                        </div>
                    </td>
                    <td>
                      <div className="tb-center">{question.questionDate}</div>
                    </td>
                    <td>
                      <div className="tb-center">
                        <span className="review_board_showhits1">{question.questionHit}</span>
                      </div>
                    </td>
                </tr>
                <tr className="ms_review_content_box cnt" style={{display:'none'}}>
                  <td colSpan={6}>
                    <div className="tb-left">
                      <div className="review-board-content">
                        <div style={{paddingBottom:'15px',paddingLeft:'80px',paddingRight:'15px',paddingTop:'15px'}}></div>
                        <div className="ms_cmt_list_box"></div>
                      </div>
                    </div>
                  </td>
                </tr>
               
            </tbody>
             ))}
        </table>
        <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={2}
            totalItemsCount={questions.length}
            pageRangeDisplayed={5}
            onChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </div>

        <div className="btm-writer">
            <Button type='button' variant="contained" color="success" onClick={handleWriteClick}>글쓰기</Button>
        </div>
        
     
     </div>
     
    </>
    
  )
};

export default ShopInquiry;
