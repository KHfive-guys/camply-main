import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCampground } from 'react-icons/fa';
import { GiCampingTent, GiForestCamp } from 'react-icons/gi';
import { TbCampfire } from 'react-icons/tb';
function Menu() {
  const campingLinks = [
    {
      href: '/',
      icon: <FaCampground />,
    },
    {
      href: '/',
      icon: <GiCampingTent />,
    },
    {
      href: '/',
      icon: <TbCampfire />,
    },
    {
      href: '/',
      icon: <GiForestCamp />,
    },
  ];

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="justify-content-center">
          <Col md={12} className="home-about-social">
            <Row className="justify-content-center">
              {campingLinks.map((social, index) => (
                <Col md={3} key={index} className="social-icons">
                  <Card
                    className="border-0 text-center"
                    style={{
                      borderRadius: '15px',
                      padding: '10px',
                      border: '2px solid #fea92a',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Card.Body>
                      <Card.Link
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-colour home-social-icons"
                      >
                        {social.icon}
                      </Card.Link>
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
