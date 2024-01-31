import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from "axios";

const SearchPage = () => {

    const [CAMP_SELECT, setCampSelect] = useState("");
    const [CAMP_LOCATION, setCampLocation] = useState("");
    const [CAMP_ADULT, setCamp_ADULT] = useState("");
    const [CAMP_CHILD, setCampChild] = useState("");
    const [CAMP_CHECKIN, setCampCheckIn] = useState("");
    const [CAMP_CHECKOUT, setCampCheckOut] = useState("");

    const [searchResults, setSearchResults] = useState([]);

    const campSearch = async () => {
        try {
            const response = await axios.get("http://localhost:8080/camp/search/campList", {
                CAMP_SELECT: CAMP_SELECT,
                CAMP_LOCATION: CAMP_LOCATION,
                CAMP_ADULT: CAMP_ADULT,
                CAMP_CHILD: CAMP_CHILD,
                CAMP_CHECKIN: CAMP_CHECKIN,
                CAMP_CHECKOUT: CAMP_CHECKOUT,
            });
    
            if (response.status === 200) {
                console.log("aaaa");
                const campList = response.data;
                setSearchResults(campList);
            } else {
                console.error("search error");
            }
        } catch (error) {
            console.error("Camp Search error:", error);
        }
    }

    /**
  const [selectedType, setSelectedType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');

  

  const dummyData = [
    {
      id: 1,
      name: '캠핑 101호',
      location: '서울시 강남구',
      type: '글램핑',
      date: '2024-01-01',
      capacity: 4,
    },
    {
      id: 2,
      name: '캠핑 202호',
      location: '서울시 강남구',
      type: '카라반',
      date: '2024-01-03',
      capacity: 2,
    },
    {
      id: 3,
      name: '캠핑 301호',
      location: '서울시 강남구',
      type: '펜션',
      date: '2024-01-05',
      capacity: 6,
    },
    {
      id: 4,
      name: '캠핑 102호',
      location: '서울시 강남구',
      type: '글램핑',
      date: '2024-02-02',
      capacity: 3,
    },
    {
      id: 5,
      name: '카라반 2호',
      location: '경기도',
      type: '카라반',
      date: '2024-02-04',
      capacity: 5,
    },
  ];

  const handleSearch = () => {
    const results = dummyData.filter(
      (site) =>
        (selectedType === '' || site.type === selectedType) &&
        (selectedRegion === '' || site.location.includes(selectedRegion)) &&
        (selectedDate === '' || site.date === selectedDate) &&
        (selectedPeople === '' || site.capacity >= parseInt(selectedPeople))
    );
    setSearchResults(results);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedType, selectedRegion, selectedDate, selectedPeople]);

     * 
     */
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
                value={CAMP_SELECT}
                onChange={(e) => setCampSelect(e.target.value)}
              >
                <option value="글램핑">글램핑</option>
                <option value="팬션">팬션</option>
                <option value="텐트">텐트</option>
                <option value="카라반">카라반</option>
                <option value="사이트">사이트</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="campingType" className="mb-3">
              <Form.Label>지역</Form.Label>
              <Form.Control
                as="select"
                value={CAMP_LOCATION}
                onChange={(e) => setCampLocation(e.target.value)}
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
                value={CAMP_ADULT}
                onChange={(e) => setCamp_ADULT(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="campingPeople" className="mb-3">
              <Form.Label>아이</Form.Label>
              <Form.Control
                type="number"
                value={CAMP_CHILD}
                onChange={(e) => setCampChild(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="campingDate" className="mb-3">
              <Form.Label>체크인 날짜</Form.Label>
              <Form.Control
                type="date"
                value={CAMP_CHECKIN}
                onChange={(e) => setCampCheckIn(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="campingDate" className="mb-3">
              <Form.Label>체크아웃 날짜</Form.Label>
              <Form.Control
                type="date"
                value={CAMP_CHECKOUT}
                onChange={(e) => setCampCheckOut(e.target.value)}
              />
            </Form.Group>

          </Form>
          <Button variant="primary" onClick={() => {campSearch();}} className="mt-3">
            검색하기
          </Button>
        </Col>
      </Row>

      {searchResults.length > 0 && (
        <Row className="mt-3">
          {searchResults.map((site) => (
            <Col key={site.id} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{site.name}</Card.Title>
                  <Card.Text>{site.location}</Card.Text>
                  <Card.Text>{site.type}</Card.Text>
                  <Card.Text>날짜: {site.date}</Card.Text>
                  <Card.Text>인원: {site.capacity}</Card.Text>
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