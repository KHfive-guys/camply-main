import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { IoMdSunny } from 'react-icons/io';
import { AiOutlineHome } from 'react-icons/ai';
import { FaClipboardList } from "react-icons/fa";
import { Modal } from 'react-bootstrap';
import { CgChevronDownO } from "react-icons/cg";
import { CgCloseO } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import logo from '../../Assets/logo.png';
import OpenWeatherMap from '../camp/CampMain/Home/openWeatherMap';


function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isShopPath = currentPath.startsWith('/shop');
  const isCampPath = currentPath.startsWith('/camp');

  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleWeatherModalClose = () => setShowWeatherModal(false);
  const handleWeatherModalShow = () => setShowWeatherModal(true);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? 'sticky' : 'navbar'}
    >
      <Container>
        <Navbar.Brand href={isCampPath ? "/camp" : "/shop"} className="d-flex">
          <img
            src={logo}
            className="logo"
            alt="brand"
            style={{ width: '250px', height: 'auto' }}
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => updateExpanded(expand ? false : 'expanded')}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/home" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: '2px' }} /> 홈페이지
              </Nav.Link>
            </Nav.Item>

            {isCampPath && (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/camp/board/all" onClick={() => updateExpanded(false)}>
                    <FaClipboardList style={{ marginBottom: '2px' }} /> 전체 상품
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
              <Nav.Link href="#" onClick={handleWeatherModalShow}>
                <IoMdSunny style={{ marginBottom: '2px' }} /> 날씨
              </Nav.Link>
            </Nav.Item>

            <Modal show={showWeatherModal} onHide={handleWeatherModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>날씨</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <OpenWeatherMap/>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleWeatherModalClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Nav.Item>
                  <Nav.Link as={Link} to="/shop/main" onClick={() => updateExpanded(false)}>
                    <AiOutlineHome style={{ marginBottom: '2px' }} /> 쇼핑몰
                  </Nav.Link>
                </Nav.Item>
                
              </>
            )}

            {isShopPath && (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/seller" onClick={() => updateExpanded(false)}>
                    <AiOutlineHome style={{ marginBottom: '2px' }} /> 상품등록
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/shop/cart" onClick={() => updateExpanded(false)}>
                    <FiShoppingCart style={{ marginBottom: '2px' }} /> 장바구니
                  </Nav.Link>
                </Nav.Item>
                {/* 추가적인 Shop에 대한 내용 */}
              </>
            )}

            

            <Nav.Item>
              <Nav.Link as={Link} to={isLoggedIn ? "/logout" : "/login"} onClick={() => updateExpanded(false)}>
                {isLoggedIn ? <CgCloseO style={{ marginBottom: '2px' }} /> : <CgChevronDownO style={{ marginBottom: '2px' }} />}
                {isLoggedIn ? "로그아웃" : "로그인"}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
