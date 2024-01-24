import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function ReplyComponent() {
  const [replyData, setReplyData] = useState([]);
  const [newReply, setNewReply] = useState({
    user_id: "",
    camp_rating: 0,
    camp_review: "",
  });
  const { camp_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/reply/${camp_id}`)
      .then((response) => {
        setReplyData(response.data);
      })
      .catch((error) => {
        console.error("리뷰 목록 가져오기 실패:", error);
      });
  }, [camp_id]);

  const handleAddReply = () => {
    axios
      .post(`http://localhost:8080/board/reply/add/${camp_id}`, newReply)
      .then((response) => {
        setReplyData((prevReplies) => [...prevReplies, response.data]);
        setNewReply({
          user_id: "",
          camp_rating: 0,
          camp_review: "",
        });
      })
      .catch((error) => {
        console.error("리뷰 추가 실패:", error);
      })
      .finally(() => {
        axios
          .get(`http://localhost:8080/board/reply/${camp_id}`)
          .then((response) => {
            setReplyData(response.data);
          })
          .catch((error) => {
            console.error("리뷰 목록 가져오기 실패:", error);
          });
      });
  };

  const handleUpdateReply = (replyId) => {
    const selectedReply = replyData.find(
      (reply) => reply.camp_reviewnumber === replyId
    );

    axios
      .put(`http://localhost:8080/board/reply/update`, selectedReply)
      .then(() => {
        console.log("리뷰 수정 성공");
      })
      .catch((error) => {
        console.error("리뷰 수정 실패:", error);
      });
  };

  const handleDeleteReply = (replyId) => {
    axios
      .delete(`http://localhost:8080/board/reply/delete/${replyId}`)
      .then(() => {
        setReplyData((prevReplies) =>
          prevReplies.filter((reply) => reply.camp_reviewnumber !== replyId)
        );
        console.log("Reply deleted successfully");
      })
      .catch((error) => {
        console.error("Failed to delete reply:", error);
      });
  };

  return (
    <div>
      <h1>리뷰</h1>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          value={newReply.user_id}
          onChange={(e) =>
            setNewReply({ ...newReply, user_id: e.target.value })
          }
        />

        <label>평점:</label>
        <input
          type="number"
          value={newReply.camp_rating}
          onChange={(e) =>
            setNewReply({ ...newReply, camp_rating: e.target.value })
          }
        />

        <label>리뷰:</label>
        <input
          type="text"
          value={newReply.camp_review}
          onChange={(e) =>
            setNewReply({ ...newReply, camp_review: e.target.value })
          }
        />

        <button onClick={handleAddReply}>리뷰 추가</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>리뷰 번호</th>
            <th>게시판 번호</th>
            <th>유저 ID</th>
            <th>평점</th>
            <th>리뷰</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {replyData.map((reply) => (
            <tr key={reply.camp_reviewnumber}>
              <td>{reply.camp_reviewnumber}</td>
              <td>{reply.camp_id}</td>
              <td>{reply.user_id}</td>
              <td>{reply.camp_rating}</td>
              <td>{reply.camp_review}</td>
              <td>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleUpdateReply(reply.camp_reviewnumber)}
                >
                  수정
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteReply(reply.camp_reviewnumber)}
                >
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReplyComponent;
