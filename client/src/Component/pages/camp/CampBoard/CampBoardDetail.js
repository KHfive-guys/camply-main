import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Reply from './Board/Reply';
import CampNavbar from '../CampNavbar';

function CampBoardDetail() {
  const [boardData, setBoardData] = useState({});
  const { camp_id } = useParams();
  const navigate = useNavigate();

  const initializeMap = useCallback(() => {
    if (window.kakao && boardData.camp_address) {
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        // 지도를 생성
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 주소-좌표 변환 객체를 생성
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색
        geocoder.addressSearch(
          boardData.camp_address,
          function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              // 결과값으로 받은 위치를 마커로 표시
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              // 인포윈도우로 장소에 대한 설명을 표시
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;">${boardData.camp_name}</div>`,
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardData.camp_address]);

  useEffect(() => {
    if (!camp_id) {
      navigate("/camp/board/all");
      alert("없는 페이지입니다.");
      return;
    }

    axios
      .get(`http://localhost:8080/camp/board/get/${camp_id}`)
      .then((response) => {
        if (!response.data) {
          navigate("/camp/board/all");
          alert("해당하는 캠핑장 정보가 없습니다.");
          return;
        }
        setBoardData(response.data);
      })
      .catch((error) => {
        console.error("게시글 가져오기 실패:", error);
      });
  }, [camp_id, navigate]);

  const handleUpdateClick = () => {
    navigate(`/camp/board/edit/${camp_id}`);
  };

  useEffect(() => {
    initializeMap();
  }, [initializeMap, boardData.camp_address]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "게시글이 삭제됩니다. 계속하시겠습니까?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8080/camp/board/delete/${camp_id}`)
        .then(() => {
          alert("삭제되었습니다.");
          navigate("/camp/board/all");
        })
        .catch((error) => {
          alert("게시글 삭제 실패: " + error.response.data.message);
        });
    } else {
      alert("취소 되었습니다.");
    }
  };


  return (
    <section>
      <CampNavbar/>
      <Container fluid className="home-section" id="home">
        <Container className="home-content"></Container>
      </Container>
      <h1>Camp Board - Camp Details</h1>
      <table>
        <thead>
          <tr>
            <th>게시글 번호</th>
            <th>유저 번호</th>
            <th>카테고리</th>
            <th>캠핑장 위치</th>
            <th>캠핑장 주소</th>
            <th>캠핑장 이름</th>
            <th>전화번호</th>
            <th>성인 인원</th>
            <th>아동 인원</th>
            <th>1박 가격</th>
            <th>사진</th>
            <th>부대 시설</th>
            <th>상세설명</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{boardData.camp_id}</td>
            <td>{boardData.user_id}</td>
            <td>{boardData.camp_select}</td>
            <td>{boardData.camp_location}</td>
            <td>{boardData.camp_address}</td>
            <td>{boardData.camp_name}</td>
            <td>{boardData.camp_phone}</td>
            <td>{boardData.camp_adult}</td>
            <td>{boardData.camp_child}</td>
            <td>{boardData.camp_price}</td>
            <td>{boardData.camp_image}</td>
            <td>{boardData.camp_facility}</td>
            <td>{boardData.camp_description}</td>
            <td>
              <div className="my-5 d-flex justify-content-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleUpdateClick}
                >
                  <i className="fas fa-pen"></i> 수정하기
                </button>
              </div>
            </td>
            <td>
              <button onClick={handleDelete}>삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h1>지도</h1>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>

      <Reply/>
    </section>
  );
}

export default CampBoardDetail;
