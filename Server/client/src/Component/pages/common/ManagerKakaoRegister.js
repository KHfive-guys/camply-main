import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../img/Logo.png";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CampNavbar from "../camp/CampNavbar";
import axios from "axios";

function ManagerEmailRegister() {
  const [companyNumber, setCompanyNumber] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");

  const [checkedCompanyNumber, setCheckedCompanyNumber] = useState("");
  const [checkedCompanyAddress, setCheckedCompanyAddress] = useState("");
  const [checkedCompanyPhone, setCheckedCompanyPhone] = useState("");

  const [userData, setUserData] = useState({});
  const [userType, setUserType] = useState("");

  const [map, setMap] = useState({});
  const [marker, setMarker] = useState(null);

  const navigate = useNavigate();

  const companyNumberCheck = async () => {
    if (companyNumber === "") {
      setCheckedCompanyNumber("필수 항목입니다.");
    }
  };

  const companyAddressCheck = async () => {
    if (companyAddress === "") {
      setCheckedCompanyAddress("필수 항목입니다.");
    }
  };

  const companyPhoneCheck = async () => {
    if (companyPhone === "") {
      setCheckedCompanyPhone("필수 항목입니다.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("yourTokenKey");
    if (token) {
      axios
        .get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((userInfoResponse) => {
          const email = userInfoResponse.data.kakao_account.email;
          console.log("User Email:", email);
          axios
            .get(`http://camply.store/api/user/kakao/${email}`)
            .then((response) => {
              const userType = response.data.USER_TYPE;
              console.log("User Type:", userType);
              setUserType(userType);
            })
            .catch((error) => {
              console.error("Error fetching user type:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, []);

  useEffect(() => {
    const initializeMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        setMap(new window.kakao.maps.Map(container, options));
        setMarker(new window.kakao.maps.Marker());
      });
    };

    return () => {
      window.onload = null;
    };
  }, []);

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (addrData) {
        var geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(addrData.address, function (result, status) {
          setCompanyAddress(addrData.address);
        });
      },
    }).open();
  };

  return (
    <section>
      <CampNavbar />
      <Container fluid className='home-section' id='home'>
        <Container className='home-content'></Container>
      </Container>

      <WrapLogin>
        <HeadBannerGroup />
        <ReauthPhone>
          <LoginWrap>
            <LoginSection>
              <LoginTitle>정말 간단한 회원가입하기</LoginTitle>
              <SignupStep className='wrap'>
                <Title>판매자 가입하기</Title>
              </SignupStep>

              <FormBlock>
                <FormBlockHead>
                  <AsteriskRed>*</AsteriskRed> 사업자 번호
                </FormBlockHead>
                <FormBlockBody>
                  <InputTextSizeWTypeL>
                    <NicknameInput
                      id='companyNumber'
                      value={companyNumber}
                      type='text'
                      placeholder='사업자 번호를 입력해 주세요'
                      required
                      onChange={(e) => {
                        setCompanyNumber(e.target.value);
                      }}
                      onBlur={() => companyNumberCheck()}
                    />
                  </InputTextSizeWTypeL>
                </FormBlockBody>
                <FormError>{checkedCompanyNumber}</FormError>
              </FormBlock>

              <FormBlock>
                <FormBlockHead>
                  <AsteriskRed>*</AsteriskRed> 사업자 주소
                </FormBlockHead>
                <FormBlockBody>
                  <InputTextSizeWTypeL>
                    <NicknameInput
                      id='companyAddress'
                      value={companyAddress}
                      type='text'
                      placeholder='사업자 주소를 입력해 주세요'
                      required
                      onClick={onClickAddr}
                      onBlur={() => companyAddressCheck()}
                    />
                  </InputTextSizeWTypeL>
                </FormBlockBody>
                <FormError>{checkedCompanyAddress}</FormError>
              </FormBlock>

              <FormBlock>
                <FormBlockHead>
                  <AsteriskRed>*</AsteriskRed> 사업자 전화번호
                </FormBlockHead>
                <FormBlockBody>
                  <InputTextSizeWTypeL>
                    <NicknameInput
                      id='companyPhone'
                      value={companyPhone}
                      type='text'
                      placeholder='사업자 전화번호를 입력해 주세요'
                      required
                      onChange={(e) => {
                        setCompanyPhone(e.target.value);
                      }}
                      onBlur={() => companyPhoneCheck()}
                    />
                  </InputTextSizeWTypeL>
                </FormBlockBody>
                <FormError>{checkedCompanyPhone}</FormError>
              </FormBlock>

              <FormBlockSubmit>
                <FormBlockBody>
                  <BtnLogin type='button' onClick={() => {}}>
                    회원가입하기
                  </BtnLogin>
                </FormBlockBody>
              </FormBlockSubmit>
            </LoginSection>
          </LoginWrap>
        </ReauthPhone>
      </WrapLogin>
    </section>
  );
}

const BtnLogin = styled.button`
  border-radius: 2px;
  text-align: center;
  white-space: nowrap;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  color: #fff;
  background: #f1c333;
  border: 1px solid #f1c333;
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 16px;
`;

const FormBlockSubmit = styled.div`
  text-align: left;
  margin: 20px 0 0;
`;

const TermsError = styled.span`
  display: none;
  cursor: default !important;
  color: #ff4b50;
  margin: 10px 0 0;
`;

const Terms1Error = styled.span`
  color: #ff4b50;
  margin: 10px 0 0;
  display: block !important;
  cursor: default !important;
`;

const Terms1Label = styled.label`
  overflow: hidden;
  display: block;
  font-size: 14px;
`;

const TermsItem = styled.div`
  margin-top: 5px;
`;

const InputCheckBox = styled.div`
  float: left;
  margin-right: 10px;
  display: inline-block;
`;

const TermsBody = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
`;

const Terms = styled.div`
  text-align: left;
  margin: 20px 0 0;
`;

const FormBlockCheckAllWrap = styled.div`
  text-align: left;
  margin: 20px 0 0;
`;

const EmailInput = styled.input`
  font-size: 14px;
  height: 48px;
  background: #fff;
  line-height: 16px;
  border: 1px solid #acacac;
  width: 100%;
  box-sizing: border-box;
  padding: 2px 8px;
  border-radius: 2px;
  appearance: none;
`;

const PasswordInput = styled.input.attrs({ type: "password" })`
  font-size: 14px;
  height: 48px;
  background: #fff;
  line-height: 16px;
  border: 1px solid #acacac;
  width: 100%;
  box-sizing: border-box;
  padding: 2px 8px;
  border-radius: 2px;
  appearance: none;
`;

const NameInput = styled.input`
  font-size: 14px;
  height: 48px;
  background: #fff;
  line-height: 16px;
  border: 1px solid #acacac;
  width: 100%;
  box-sizing: border-box;
  padding: 2px 8px;
  border-radius: 2px;
  appearance: none;
`;

const NicknameInput = styled.input`
  font-size: 14px;
  height: 48px;
  background: #fff;
  line-height: 16px;
  border: 1px solid #acacac;
  width: 100%;
  box-sizing: border-box;
  padding: 2px 8px;
  border-radius: 2px;
  appearance: none;
`;

const InputTextSizeWTypeL = styled.div`
  box-sizing: border-box;
  vertical-align: middle;
  height: 48px;
  display: block;
  width: 100%;
  margin-top: 10px;
  text-align: left;
`;

const FormError = styled.span`
  color: #ff4b50;
  margin: 10px 0 0;
  display: block;
  cursor: default !important;
`;

const InputTextSizeW = styled.div`
  &.formError {
    cursor: default !important;
  }
  display: block;
  width: 100%;
  margin-top: 10px;
  text-align: left;
  vertical-align: middle;
  box-sizing: border-box;
`;

const FormBlockBody = styled.div`
  text-align: left;
`;

const AsteriskRed = styled.em`
  color: #ff4b50;
  font-size: 18px;
  display: inline-block;
`;

const FormBlockHead = styled.label`
  font-size: 14px;
`;

const FormBlock = styled.div`
  text-align: left;
  margin: 20px 0 0;
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
  padding-bottom: 100px;
`;

const LogoA = styled.div`
  display: block;
`;

const LoginLogo = styled.div`
  padding-top: 40px;
  text-align: center;
  padding: 40px 0 0;
`;

const LoginWrap = styled.div`
  padding: 1px 0 50px;
  min-height: 100%;
  background: #fff;
`;

const ReauthPhone = styled.form`
  width: 384px;
  display: block;
  margin: 0 auto;
`;

const HeadBannerGroup = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const WrapLogin = styled.div`
  padding: 1px 0 50px;
  min-height: 100%;
  background: #fff;
`;

export default ManagerEmailRegister;
