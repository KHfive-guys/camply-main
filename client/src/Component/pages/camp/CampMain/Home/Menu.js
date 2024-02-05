import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCampground } from "react-icons/fa";
import { TbCampfire } from "react-icons/tb";
import { GiHabitatDome } from "react-icons/gi";
import { TbCaravan } from "react-icons/tb";
import { GiWoodCabin } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";


function Menu() {
  const navigate = useNavigate();

  const campingLinks = [
    {
      href: "/camp/searchList/tent",
      icon: <FaCampground />,
      text: "텐트",
    },
    {
      href: "/camp/searchList/glamping",
      icon: <GiHabitatDome />,
      text: "글램핑",
    },
    {
      href: "/camp/searchList/caravan",
      icon: <TbCaravan />,
      text: "카라반",
    },
    {
      href: "/camp/searchList/site",
      icon: <TbCampfire />,
      text: "야영장",
    },
    {
      href: "/camp/searchList/pension",
      icon: <GiWoodCabin />,
      text: "펜션",
    },
  ];

  const campingSearch = [
    {
      href: "/camp/searchList",
      icon: <CiSearch />,
      text: "전체 검색",
    },
  ];
  

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        
      <Row className="justify-content-center">
          <Col md={10} className="home-about-social">
            <Row className="justify-content-center">
              {campingSearch.map((searchItem, index) => (
                <Col md={10} key={index} className="social-icons">
                  <Card
                    className="border-0 text-center"
                    style={{
                      borderRadius: "15px",
                      padding: "10px",
                      border: "2px solid #fea92a",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Card.Body>
                      <Card.Link
                        onClick={() => navigate(searchItem.href)}
                        className="icon-colour home-social-icons"
                      >
                        {searchItem.icon}
                      </Card.Link>
                      <p>{searchItem.text}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={10} className="home-about-social">
            <Row className="justify-content-center">
              {campingLinks.map((link, index) => (
                <Col md={2} key={index} className="social-icons">
                  <Card
                    className="border-0 text-center"
                    style={{
                      borderRadius: "15px",
                      padding: "10px",
                      border: "2px solid #fea92a",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Card.Body>
                      <Card.Link
                        onClick={() => navigate(link.href)}
                        className="icon-colour home-social-icons"
                      >
                        {link.icon}
                      </Card.Link>
                      <p>{link.text}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

      </Container>
    </Container>
  );
}

export default Menu;
