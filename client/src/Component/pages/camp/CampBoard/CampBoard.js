import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Container } from 'react-bootstrap';
import './css/CampBoard.css';

function BbsWrite() {
  const navigate = useNavigate();

  const [newBoard, setNewBoard] = useState({
    user_id: 0,
    camp_id:0,
    camp_select: '',
    camp_location: '',
    camp_name: '',
    camp_address: '',
    camp_phone: '',
    camp_adult: 0,
    camp_child: 0,
    camp_price: 0,
    camp_image: '',
    camp_description: ''
  });

  const boardAdd = () => {
    axios
      .post('http://localhost:8080/camp/board/add', newBoard)
      .then((response) => {
        console.log('성공', response.data);
        setNewBoard({
          user_id: 0,
          camp_id: 0,
          camp_select: '',
          camp_location: '',
          camp_name: '',
          camp_address: '',
          camp_phone: '',
          camp_adult: 0,
          camp_child: 0,
          camp_price: 0,
          camp_image: '',
          camp_description: ''
        });
        navigate('/camp/board/all');  // Directly navigate to the desired route
      })
      .catch((error) => {
        console.error('실패', error);
      });
  };
  

  return (

    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">

        </Container>
      </Container>

      <div>
        <table className="table">
          <tbody>
            <tr>
              <th className="table-primary">유저 아이디</th>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={newBoard.user_id}
                  onChange={(e) => setNewBoard({ ...newBoard, user_id: parseInt(e.target.value, 10) })}
                />
              </td>
            </tr>

            <tr>
  <th className="table-primary">캠핑장 카테고리</th>
  <td className="radio-buttons-container">
    <div>
      <input
        type="radio"
        id="tent"
        name="campCategory"
        value="텐트"
        checked={newBoard.camp_select === '텐트'}
        onChange={() => setNewBoard({ ...newBoard, camp_select: '텐트' })}
      />
      <label htmlFor="tent">텐트</label>
    </div>
    <div>
      <input
        type="radio"
        id="glamping"
        name="campCategory"
        value="글램핑"
        checked={newBoard.camp_select === '글램핑'}
        onChange={() => setNewBoard({ ...newBoard, camp_select: '글램핑' })}
      />
      <label htmlFor="glamping">글램핑</label>
    </div>
    <div>
      <input
        type="radio"
        id="caravan"
        name="campCategory"
        value="카라반"
        checked={newBoard.camp_select === '카라반'}
        onChange={() => setNewBoard({ ...newBoard, camp_select: '카라반' })}
      />
      <label htmlFor="caravan">카라반</label>
    </div>
    <div>
      <input
        type="radio"
        id="site"
        name="campCategory"
        value="사이트"
        checked={newBoard.camp_select === '사이트'}
        onChange={() => setNewBoard({ ...newBoard, camp_select: '사이트' })}
      />
      <label htmlFor="site">사이트</label>
    </div>
    <div>
      <input
        type="radio"
        id="pension"
        name="campCategory"
        value="펜션"
        checked={newBoard.camp_select === '펜션'}
        onChange={() => setNewBoard({ ...newBoard, camp_select: '펜션' })}
      />
      <label htmlFor="pension">펜션</label>
    </div>
  </td>
</tr>

<tr>
<th className="table-primary">캠핑장 위치</th>
  <td className="radio-buttons-container">
    <div>
      <input
        type="radio"
        id="seoul"
        name="campLocation"
        value="서울"
        checked={newBoard.camp_location === '서울'}
        onChange={() => setNewBoard({ ...newBoard, camp_location: '서울' })}
      />
      <label htmlFor="seoul">서울</label>
    </div>
    <div>
      <input
        type="radio"
        id="gyeonggi"
        name="campLocation"
        value="경기"
        checked={newBoard.camp_location === '경기'}
        onChange={() => setNewBoard({ ...newBoard, camp_location: '경기' })}
      />
      <label htmlFor="gyeonggi">경기</label>
    </div>
    <div>
      <input
        type="radio"
        id="incheon"
        name="campLocation"
        value="인천"
        checked={newBoard.camp_location === '인천'}
        onChange={() => setNewBoard({ ...newBoard, camp_location: '인천' })}
      />
      <label htmlFor="incheon">인천</label>
    </div>
    <div>
      <input
        type="radio"
        id="gangwon"
        name="campLocation"
        value="강원"
        checked={newBoard.camp_location === '강원'}
        onChange={() => setNewBoard({ ...newBoard, camp_location: '강원' })}
      />
      <label htmlFor="gangwon">강원</label>
    </div>
    <div>
      <input
        type="radio"
        id="chungcheong"
        name="campLocation"
        value="충청"
        checked={newBoard.camp_location === '충청'}
        onChange={() => setNewBoard({ ...newBoard, camp_location: '충청' })}
      />
      <label htmlFor="chungcheong">충청</label>
    </div>
    <div>
      <input
        type="radio"
        id="jeolla"
        name="campLocation"
        value="전라"
        checked={newBoard.camp_location === '전라'}
        onChange={() => setNewBoard({ ...newBoard, camp_location: '전라' })}
      />
      <label htmlFor="jeolla">전라</label>
    </div>
    <div>
      <input
        type="radio"
        id="gyeongsang"
        name="campLocation"
        value="경상"
        checked={newBoard.camp_location === '경상'}
        onChange={() => setNewBoard({ ...newBoard, camp_location: '경상' })}
      />
      <label htmlFor="gyeongsang">경상</label>
    </div>
    </td>
</tr>

            <tr>
              <th className="table-primary">캠핑장 주소</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newBoard.camp_address}
                  onChange={(e) => setNewBoard({ ...newBoard, camp_address: e.target.value })}
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">캠핑장 이름</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newBoard.camp_name}
                  onChange={(e) => setNewBoard({ ...newBoard, camp_name: e.target.value })}
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">캠핑장 전화번호</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newBoard.camp_phone}
                  onChange={(e) => setNewBoard({ ...newBoard, camp_phone: e.target.value })}
                />
              </td>
            </tr>

            <tr>
  <th className="table-primary">성인 인원</th>
  <td>
    <input
      type="number"
      className="form-control"
      value={newBoard.camp_adult}
      onChange={(e) => setNewBoard({ ...newBoard, camp_adult: e.target.value !== "" ? parseInt(e.target.value, 10) : 0 })}
    />
  </td>
</tr>

<tr>
  <th className="table-primary">아동 인원</th>
  <td>
    <input
      type="number"
      className="form-control"
      value={newBoard.camp_child}
      onChange={(e) => setNewBoard({ ...newBoard, camp_child: e.target.value !== "" ? parseInt(e.target.value, 10) : 0 })}
    />
  </td>
</tr>

            <tr>
              <th className="table-primary">1박 가격</th>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={newBoard.camp_price}
                  onChange={(e) => setNewBoard({ ...newBoard, camp_price: e.target.value })}
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">캠핑장 사진</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newBoard.camp_image}
                  onChange={(e) => setNewBoard({ ...newBoard, camp_image: e.target.value })}
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">캠핑장 상세설명</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newBoard.camp_description}
                  onChange={(e) => setNewBoard({ ...newBoard, camp_description: e.target.value })}
                />
              </td>
            </tr>

          </tbody>
        </table>

        <div className="my-5 d-flex justify-content-center">
          <button className="btn btn-outline-secondary" onClick={boardAdd}>
            <i className="fas fa-pen"></i> 등록하기
          </button>
        </div>
      </div>

    </section>

  );
}

export default BbsWrite;