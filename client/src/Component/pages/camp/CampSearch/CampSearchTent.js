import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from "axios";

function SearchPage() {
    const [searchResults, setSearchResults] = useState([]);

    const [searchCamp, setSearchCamp] = useState({
       CAMP_ID: "0",
       CAMP_SELECT: "",
        CAMP_LOCATION: "서울",
        CAMP_ADULT: "0",
        CAMP_CHILD: "0",
        CAMP_CHECKIN: "",
        CAMP_CHECKOUT: "",
      });

    const campSearch = async () => {

        try {
           const response = await axios.post("http://localhost:8080/camp/search/campList", searchCamp);
            
            console.log("response.data" + response.data);

            setSearchResults(response.data);
       
        } catch (error) {
        console.error("Error during search:", error.message);
      }
    };

    const handleRowClick = (CAMP_ID) => {
      window.location.href = `/camp/board/get/${CAMP_ID}`;
    };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <h3 className="text-center mb-4">캠핑장 검색</h3>
          <Form>
            <Form.Group controlId="campingType" className="mb-3">
              <Form.Label>캠핑 유형</Form.Label>
              <Form.Control
                as="select"
                value={searchCamp.CAMP_SELECT}
                onChange={(e) => {setSearchCamp({
                    ...searchCamp,
                    CAMP_SELECT: e.target.value,
                  });}}
              >
                <option value="텐트">텐트</option>
                <option value="팬션">팬션</option>
                <option value="글램핑">글램핑</option>
                <option value="카라반">카라반</option>
                <option value="야영장">야영장</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="campingType" className="mb-3">
              <Form.Label>지역</Form.Label>
              <Form.Control
                as="select"
                value={searchCamp.CAMP_LOCATION}
                onChange={(e) => {setSearchCamp({
                    ...searchCamp,
                    CAMP_LOCATION: e.target.value,
                  });}}
              >
                <option value="서울">서울</option>
                <option value="경기">경기</option>
                <option value="강원">강원</option>
                <option value="춘천">춘천</option>
                <option value="대전">대전</option>
                <option value="충청">충청</option>
                <option value="부산">부산</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="campingPeople" className="mb-3">
              <Form.Label>성인</Form.Label>
              <Form.Control
                type="number"
                value={searchCamp.CAMP_ADULT}
                onChange={(e) => {setSearchCamp({
                    ...searchCamp,
                    CAMP_ADULT: e.target.value,
                  });}}
              />
            </Form.Group>
            <Form.Group controlId="campingPeople" className="mb-3">
              <Form.Label>아이</Form.Label>
              <Form.Control
                type="number"
                value={searchCamp.CAMP_CHILD}
                onChange={(e) => {setSearchCamp({
                    ...searchCamp,
                    CAMP_CHILD: e.target.value,
                  });}}
              />
            </Form.Group>
            <Form.Group controlId="campingDate" className="mb-3">
              <Form.Label>체크인 날짜</Form.Label>
              <Form.Control
                type="date"
                value={searchCamp.CAMP_CHECKIN}
                onChange={(e) => {setSearchCamp({
                    ...searchCamp,
                    CAMP_CHECKIN: e.target.value,
                  });}}
              />
            </Form.Group>
            <Form.Group controlId="campingDate" className="mb-3">
              <Form.Label>체크아웃 날짜</Form.Label>
              <Form.Control
                type="date"
                value={searchCamp.CAMP_CHECKOUT}
                onChange={(e) => {setSearchCamp({
                    ...searchCamp,
                    CAMP_CHECKOUT: e.target.value,
                  });}}
              />
            </Form.Group>

          </Form>
          <Button variant="primary" onClick={campSearch} className="mt-3">
            검색하기
          </Button>
        </Col>
      </Row>

      {searchResults.length > 0 && (
        <Row className="mt-3">
          {searchResults.map((site) => (
            <Col key={site.CAMP_ID} md={4} className="mb-3" onClick={() => handleRowClick(site.CAMP_ID)}>
              <Card>
                <Card.Body>
                  <Card.Title>{site.CAMP_SELECT}</Card.Title>
                  <Card.Text>{site.CAMP_LOCATION}</Card.Text>
                  <Card.Text>{site.CAMP_ADULT}</Card.Text>
                  <Card.Text>인원: {site.CAMP_CHILD}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {searchResults.length === 0 && (
        <Row className="mt-3 justify-content-center">
          <Col md={6} className="text-center">
            <p className="lead text-muted">검색 결과가 없습니다.</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SearchPage;