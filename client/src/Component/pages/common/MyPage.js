import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import CampNavbar from "../camp/CampNavbar";

function MyPage() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("yourTokenKey");

    if (token) {
      const USER_ID = parseUserIdFromToken(token);

      axios
        .get(`http://localhost:8080/api/user/get/${USER_ID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("User Data Response:", response.data);
          setUserData(response.data[0] || {});
          setLoading(false);
        })
        .catch((error) => {
          console.error("사용자 정보 가져오기 실패:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const parseUserIdFromToken = (token) => {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload.user_id;
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("정말로 회원 탈퇴하시겠습니까?");

    if (confirmDelete) {
      const token = localStorage.getItem("yourTokenKey");

      setDeleting(true);

      const USER_ID = parseUserIdFromToken(token);

      axios
        .delete(`http://localhost:8080/api/user/delete/${USER_ID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          localStorage.removeItem("yourTokenKey");
          setUserData({});
          navigate("/login");
        })
        .catch((error) => {
          console.error("회원 탈퇴 실패:", error);
        })
        .finally(() => {
          setDeleting(false);
        });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <CampNavbar />
      <Container fluid className="home-section" id="home">
        <Container className="home-content"></Container>
      </Container>

      <h1>마이페이지</h1>
      <div>
        <p>이름: {userData.USER_NAME}</p>
        <p>이메일: {userData.USER_EMAIL}</p>
        <button onClick={handleDeleteAccount} disabled={deleting}>
          {deleting ? "회원 탈퇴 중..." : "회원 탈퇴"}
        </button>
      </div>
    </section>
  );
}

export default MyPage;