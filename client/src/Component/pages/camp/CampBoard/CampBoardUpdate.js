import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function UpdateBoard() {
  const { camp_id } = useParams();
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState({
    user_id: 0,
    camp_select: "",
    camp_location: "",
    camp_name: "",
    camp_address: "",
    camp_phone: "",
    camp_adult: 0,
    camp_child: 0,
    camp_price: 0,
    camp_image: "",
    camp_description: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/camp/board/get/${camp_id}`)
      .then((response) => {
        setBoardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching board data:", error);
      });
  }, [camp_id]);

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8080/camp/board/edit/${camp_id}`, boardData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("수정이 완료되었습니다.");
        console.log("Update successful");
        navigate(`/camp/board/all`);
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  const handleCancel = () => {
    alert("취소되었습니다.");
    navigate(`/camp/board/get/${camp_id}`);
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content"></Container>
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
                  value={boardData.user_id || ""}
                  onChange={(e) =>
                    setBoardData({
                      ...boardData,
                      user_id: parseInt(e.target.value, 10),
                    })
                  }
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
                    checked={boardData.camp_select === "텐트"}
                    onChange={() =>
                      setBoardData({ ...boardData, camp_select: "텐트" })
                    }
                  />
                  <label htmlFor="tent">텐트</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="glamping"
                    name="campCategory"
                    value="글램핑"
                    checked={boardData.camp_select === "글램핑"}
                    onChange={() =>
                      setBoardData({ ...boardData, camp_select: "글램핑" })
                    }
                  />
                  <label htmlFor="glamping">글램핑</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="caravan"
                    name="campCategory"
                    value="카라반"
                    checked={boardData.camp_select === "카라반"}
                    onChange={() =>
                      setBoardData({ ...boardData, camp_select: "카라반" })
                    }
                  />
                  <label htmlFor="caravan">카라반</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="site"
                    name="campCategory"
                    value="사이트"
                    checked={boardData.camp_select === "사이트"}
                    onChange={() =>
                      setBoardData({ ...boardData, camp_select: "사이트" })
                    }
                  />
                  <label htmlFor="site">사이트</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="pension"
                    name="campCategory"
                    value="펜션"
                    checked={boardData.camp_select === "펜션"}
                    onChange={() =>
                      setBoardData({ ...boardData, camp_select: "펜션" })
                    }
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
                    checked={boardData.camp_location === "서울"}
                    onChange={() =>
                      setBoardData({ ...boardData, camp_location: "서울" })
                    }
                  />
                  <label htmlFor="seoul">서울</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gyeonggi"
                    name="campLocation"
                    value="경기"
                    checked={boardData.camp_location === "경기"}
                    onChange={() =>
                      setBoardData({ ...boardData, camp_location: "경기" })
                    }
                  />
                  <label htmlFor="gyeonggi">경기</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="incheon"
                    name="campLocation"
                    value="인천"
                    checked={boardData.camp_location === "인천"}
                    onChange={() =>
                      setBoardData({ ...boardData, camp_location: "인천" })
                    }
                  />
                  <label htmlFor="incheon">인천</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gangwon"
                    name="campLocation"
                    value="강원"
                    checked={boardData.camp_location === "강원"}
                    onChange={() =>
                      setBoardData({ ...boardData, camp_location: "강원" })
                    }
                  />
                  <label htmlFor="gangwon">강원</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="chungcheong"
                    name="campLocation"
                    value="충청"
                    checked={boardData.camp_location === "충청"}
                    onChange={() =>
                      setBoardData({ ...boardData, camp_location: "충청" })
                    }
                  />
                  <label htmlFor="chungcheong">충청</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="jeolla"
                    name="campLocation"
                    value="전라"
                    checked={boardData.camp_location === "전라"}
                    onChange={() =>
                      setBoardData({ ...boardData, camp_location: "전라" })
                    }
                  />
                  <label htmlFor="jeolla">전라</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gyeongsang"
                    name="campLocation"
                    value="경상"
                    checked={boardData.camp_location === "경상"}
                    onChange={() =>
                      setBoardData({ ...boardData, camp_location: "경상" })
                    }
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
                  value={boardData.camp_address || ""}
                  onChange={(e) =>
                    setBoardData({ ...boardData, camp_address: e.target.value })
                  }
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">캠핑장 이름</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={boardData.camp_name || ""}
                  onChange={(e) =>
                    setBoardData({ ...boardData, camp_name: e.target.value })
                  }
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">캠핑장 전화번호</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={boardData.camp_phone || ""}
                  onChange={(e) =>
                    setBoardData({ ...boardData, camp_phone: e.target.value })
                  }
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">성인 인원</th>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={boardData.camp_adult || ""}
                  onChange={(e) =>
                    setBoardData({
                      ...boardData,
                      camp_adult:
                        e.target.value !== ""
                          ? parseInt(e.target.value, 10)
                          : 0,
                    })
                  }
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">아동 인원</th>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={boardData.camp_child || ""}
                  onChange={(e) =>
                    setBoardData({
                      ...boardData,
                      camp_child:
                        e.target.value !== ""
                          ? parseInt(e.target.value, 10)
                          : 0,
                    })
                  }
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">1박 가격</th>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={boardData.camp_price || ""}
                  onChange={(e) =>
                    setBoardData({ ...boardData, camp_price: e.target.value })
                  }
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">캠핑장 사진</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={boardData.camp_image || ""}
                  onChange={(e) =>
                    setBoardData({ ...boardData, camp_image: e.target.value })
                  }
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">캠핑장 상세설명</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={boardData.camp_description || ""}
                  onChange={(e) =>
                    setBoardData({
                      ...boardData,
                      camp_description: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="my-5 d-flex justify-content-center">
          <button className="btn btn-outline-secondary" onClick={handleCancel}>
            <i className="fas fa-pen"></i> 취소하기
          </button>
        </div>
        <div className="my-5 d-flex justify-content-center">
          <button className="btn btn-outline-secondary" onClick={handleUpdate}>
            <i className="fas fa-pen"></i> 수정하기
          </button>
        </div>
      </div>
    </section>
  );
}

export default UpdateBoard;
