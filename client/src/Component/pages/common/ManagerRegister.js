import React from "react";
import styled from "styled-components";
import logo from '../../img/Logo.png';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import CampNavbar from '../camp/CampNavbar';

function Register() {

  return (
    <section>
      <CampNavbar/>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
        </Container>
      </Container>


      <LoginWrap>
        <HeadBannerGroup />
        <LoginSectionRoot>
          <LoginHeadLogo>
            <h1></h1>
          </LoginHeadLogo>
          <img src={logo} width="300px" />
          <LoginSection>
            <LoginTitle>판매자 회원가입하기</LoginTitle>

            <Title>회원가입 방법 선택하기</Title>
            <LoginSns className="wrap">
              <Item>
                <Kakaotalk href="">
                  <SpIcon className="Kakaotalk" />
                  "카카오톡으로 가입하기"
                </Kakaotalk>
              </Item>
              <Item>
                <Naver href="">
                  <SpIcon className="" />
                  네이버로 가입하기
                </Naver>
              </Item>
              <Item>
                <Link to="/register/manager/email">
                  <Email>
                    <SpIcon className="Email" />
                    "이메일로 가입하기"
                  </Email>
                </Link>
              </Item>
              <AdditionTxt>
                이미 가입하셨다면
                <a href="/login">바로 로그인하기</a>
              </AdditionTxt>
            </LoginSns>
          </LoginSection>
        </LoginSectionRoot>
      </LoginWrap>
    </section>
  );
}
const AdditionTxt = styled.button`
  margin-top: 30px;
  color: #666;
  font-size: 14px;
  a {
    text-decoration: underline;
  }
`;
const Email = styled.a``;
const Naver = styled.a``;
const Hidden = styled.div`
  &.HiddenTag {
    display: none !important; */
  }
`;
const More = styled.button``;
const Kakaotalk = styled.a``;
const Item = styled.div``;

const LoginSns = styled.div`
  &.wrap {
    overflow: hidden;

    ${Item} {
      &:first-child {
        width: 100%;
        -webkit-border-radius: 8px;
        border-radius: 8px;
      }

      a {
        padding: 6px 0;
        margin-top: 10px;
        display: block;
        color: #fff;
        font-size: 14px;
        position: relative;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        min-height: 44px;
      }

      ${Email} {
        border: 2px solid #f1c333;
        background: #fff;
        color: #f1c333;
        line-height: 28px;
      }

      ${Naver} {
        background: #63c33d;
      }

      ${Kakaotalk} {
        background: #fce84d;
        color: #333;
      }

      ${More} {
        font-size: 14px !important;
        line-height: 18px !important;
        width: 100%;
        background: #fff;
        border: 1px solid #d9d9d9;
        color: #333;
        padding: 12px;
        margin-top: 10px;
        margin-left: 0;
        outline: none;
      }
    }
  }
`;

const Title = styled.h3``;
const IsActive = styled.li``;

const SignupStep = styled.div`
  text-align: center;
  margin: 45px 0 20px;

  ${Title} {
    font-size: 18px;
    font-weight: normal;
  }

  &.wrap {
    text-align: center;
    margin: 45px 0 20px;

    ${IsActive} {
      color: #fff;
      border-color: #f1c333;
      background: #f1c333;
    }

    ul {
      display: inline-block;
      position: relative;
      border-top: 1px solid #aaa;
    }

    li {
      position: relative;
      top: -15px;
      z-index: 10;
      background: #fff;
      color: #999;
      border: 1px solid #999;
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      -webkit-border-radius: 20px;
      border-radius: 20px;
    }

    li + li {
      margin-left: 50px;
    }
  }
`;

const LoginTitle = styled.h2`
  font-size: 14px;
  color: #333;
  text-align: center;
  position: relative;
  top: -10px;
  background: #fff;
  display: inline-block;
  padding: 0 10px;
`;

const LoginSection = styled.section`
  text-align: center;
  margin-top: 50px;
  border-top: 1px solid #333;
`;

const SpIcon = styled.span`
  &.SpNaver {
    background-position: -689px 0px;
    width: 32px;
    padding-top: 32px;
  }

  &.Kakaotalk {
    background-position: -631px -626px;
    width: 32px;
    padding-top: 32px;
  }
`;

const NeedLogin = styled.p``;

const LoginHeadText = styled.div`
  margin-bottom: 30px;

  p {
    color: #333333;
    text-align: center;
  }

  ${NeedLogin} {
    display: flex;
    justify-content: center;
    font-size: 16px;
  }
`;

const LoginHeadLogo = styled.div`
  text-align: center;
  padding-top: 40px;
  margin-bottom: 10px;
`;

const LoginSectionRoot = styled.div`
  width: 384px;
  display: block;
  margin: 0 auto;
  border-top: 0;
  text-align: center;
`;

const HeadBannerGroup = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const LoginWrap = styled.div`
  padding: 1px 0 50px;
  min-height: 100%;
  background: #fff;
`;
export default Register;
