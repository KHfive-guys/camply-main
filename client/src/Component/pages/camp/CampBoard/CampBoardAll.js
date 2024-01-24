import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/CampBoardAll.css";
import { Container } from "react-bootstrap";

function CampBoardAll() {
  const [boardData, setBoardData] = useState([]);

  const handleRowClick = (camp_id) => {
    window.location.href = `/camp/board/get/${camp_id}`;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/camp/board/all")
      .then((response) => {
        setBoardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content"></Container>
      </Container>

      <h1>Camp Board - All Camps</h1>
      <table>
        <thead>
          <tr>
            <th>게시글 번호</th>
            <th>카테고리</th>
            <th>캠핑장 위치</th>
            <th>캠핑장 이름</th>
            <th>1박 가격</th>
          </tr>
        </thead>
        <tbody>
          {boardData.map((board) =>
            board ? (
              <tr
                key={board.camp_id}
                onClick={() => handleRowClick(board.camp_id)}
              >
                <td>{board.camp_id}</td>
                <td>{board.camp_select}</td>
                <td>{board.camp_location}</td>
                <td>{board.camp_name}</td>
                <td>{board.camp_price}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      <Link to="/camp/board/add">
        <button>게시글 작성하기</button>
      </Link>
    </section>
  );
}

export default CampBoardAll;
