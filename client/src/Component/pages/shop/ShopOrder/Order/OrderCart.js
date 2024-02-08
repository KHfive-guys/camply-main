import React, { useState, useEffect } from "react";
import Layout from "../../../shop/ShopLayout";
import "../../css/ShopOrder/OrderMain.css";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from '@mui/material';
import { MdOutlineClosedCaptionDisabled } from "react-icons/md";
import { TbCamper } from "react-icons/tb";

const OrderCart = () => {
  const [product, setProduct] = useState("");
  const [map, setMap] = useState({});
  const [marker, setMarker] = useState(null);
  const [userIds, setUserIds] = useState(null);
  const [order, setOrder] = useState({
    userId: "", // userId로 변경
    orderOrdererName: "",
    orderOrderEmail: "",
    orderOrderPhone: "",
    orderReceiverName: "",
    orderReceiverAddress: "",
    orderReceiverAddressDetail: "",
    orderReceiverPhone: "",
    orderReceiverMessage: "",
    orderReceiverDeleveryMsg: "",
  });
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation(); // useLocation을 여기로 이동
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [zipCode, setZipcode] = useState("");

  useEffect(() => {
    if (location && location.state && location.state.quantity) {
      // location이 존재하고 state도 존재하며 quantity도 존재할 때만 실행
      // 필요에 따라 추가적인 로직을 수행할 수 있습니다.
      console.log("Quantity:", location.state.quantity);
    }
  }, [location]);

  const {
    userId,
    orderOrdererName,
    orderOrderEmail,
    orderReceiverName,
    orderReceiverAddress,
    orderReceiverAddressDetail,
    orderReceiverPhone,
    orderReceiverMessage,
    orderReceiverDeleveryMsg,
  } = order;

  const onChange = (event) => {
    const { value, name } = event.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const [orderReceiverPhoneParts, setOrderReceiverPhoneParts] = useState({
    part1: "",
    part2: "",
    part3: "",
  });

  const onChangeReceiverPhone = (event) => {
    const { value, name } = event.target;

    setOrderReceiverPhoneParts((prevPhoneParts) => ({
      ...prevPhoneParts,
      [name]: value,
    }));

    const { part1, part2, part3 } = orderReceiverPhoneParts;
    const combinedPhoneNumber = `${part1}-${part2}-${part3}`;

    setOrder((prevOrder) => ({
      ...prevOrder,
      orderReceiverPhone: combinedPhoneNumber,
    }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // useParams로 받아온 productId를 숫자로 변환
        const numericProductId = parseInt(productId, 10); // 10진수로 변환
        if (!isNaN(numericProductId)) {
          // API 호출 시 변환된 numericProductId 사용
          const response = await axios.get(
            `http://localhost:8080/shop/detail/${numericProductId}`
          );
          setProduct(response.data);
        } else {
          console.error("Invalid productId");
        }
      } catch (error) {
        console.error("상품 정보를 가져오는 중 오류 발생", error);
      }
    };

    fetchProduct();
  }, [productId]);

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
          setZipcode(addrData.zipCode);
          setUserAddress(addrData.address);
          setOrder((prevOrder) => ({
            ...prevOrder,
            orderReceiverAddress: addrData.address || "",
          }));
        });
      },
    }).open();
  };
  const productPrice =
    product && product.productPrice ? product.productPrice : 0;
  const formattedPrice = productPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("yourTokenKey");

      const parseJwt = (token) => {
        try {
          return JSON.parse(
            decodeURIComponent(escape(atob(token.split(".")[1])))
          );
        } catch (e) {
          return null;
        }
      };

      if (token) {
        const decodedToken = parseJwt(token);
        console.log("Decoded Token:", decodedToken);

        setUserIds(decodedToken.user_id || "");
        setUserName(decodedToken.USER_NAME || "");
        setUserEmail(decodedToken.email || "");
        // getUserPhoneFormatted 함수를 호출하여 형식화된 전화번호를 설정
        setUserPhone(
          getUserPhoneFormatted(decodedToken.USER_BUSINESSPHONE) || ""
        );
        setUserAddress(decodedToken.userAddress || "");

        setOrder((prevOrder) => ({
          ...prevOrder,
          userId: decodedToken.user_id || "",
          orderOrdererName: decodedToken.USER_NAME || "",
          orderOrderEmail: decodedToken.email || "",
          orderOrderPhone:
            getUserPhoneFormatted(decodedToken.USER_BUSINESSPHONE) || "",
          orderReceiverAddress: decodedToken.userAddress || "",
          // 나머지 필요한 정보들 추가
        }));
      }
    };
    fetchUserData();
  }, []);

  // 핸드폰 번호 010-0000-0000 형식으로 나타내기 위한 함수
  const getUserPhoneFormatted = (phoneNumber) => {
    if (phoneNumber && phoneNumber.length === 11) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
        3,
        7
      )}-${phoneNumber.slice(7)}`;
      // 폰 번호객체에서 0번 인덱스부터 ,2번 인덱스 문자열을 추출하고 - 추가  3번 인덱스부터
      // 6번 인덱스까지 문자열을 추출하고 마지막은 7번 인덱스부터 끝까지의 부분을 출력해서 나머지 4자리를 나타냄
    }

    return phoneNumber;
  };

  // 주소찾기 스타일

  const saveOrder = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const numericProductId = parseInt(productId, 10);
      const orderData = {
        userId: order.userId,
        orderOrdererName: order.orderOrdererName,
        orderOrderEmail: order.orderOrderEmail,
        orderOrderPhone: order.orderOrderPhone,
        orderReceiverName: order.orderReceiverName,
        orderReceiverAddress: order.orderReceiverAddress,
        orderReceiverAddressDetail: order.orderReceiverAddressDetail,
        orderReceiverPhone: order.orderReceiverPhone,
        orderReceiverMessage: order.orderReceiverMessage,
        orderReceiverDeleveryMsg: order.orderReceiverDeleveryMsg,
        productId: numericProductId,
        orderProductAmount: location.state.quantity,
        productPrice: product.productPrice || 0,
        productThumbnail: product.productThumbnail || "",
        productName: product.productName || "",
      };
      console.log("orderData:", orderData);

      const response = await axios.post(
        "http://localhost:8080/shop/order/post",
        orderData
      );

      console.log("Response:", response);

      // 주문 완료 후 추가한 부분
      alert("주문이 성공적으로 완료되었습니다.");
      navigate("/shop/main");
    } catch (error) {
      console.error("주문을 저장하는 중 오류 발생", error);
    }
  };
  const backToList = () => {
    navigate("/shop/main");
  };
  return (
    <div className='root'>
      <div className='order-main'>
        <main className='main-container'>
          {product && Object.keys(product).length > 0 ? (
            <>
            <h3><TbCamper/>Camply</h3>
              <div className="tbl-order-cart">
               <table>
                  <colgroup>
                    <col style={{width:'150px'}}/>
                    <col/>
                    <col style={{width:'150px'}}/>
                    <col style={{width:'300px'}}/>
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">&nbsp;</th>
                      <th scope="col">상품정보</th>
                      <th scope="col" style={{textAlign:'center'}}>수량</th>
                      <th scope="col" style={{textAlign:'center'}}>주문금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="nbg">
                      <td>
                        <div className="tb-center">
                          <div className="thumb">
                          <img src={product.productThumbnail} style={{width:'100px'}} alt='제품 이미지' />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tb-left">
                        <p className='item-title' style={{fontSize:'15px', fontWeight:'bold'}}>{product.productName}</p>
                        </div>
                      </td>
                      <td>
                        <div className="tb-center">
                        <p>
                          수량:<span>{location.state?.quantity || "0"}</span>
                        </p>
                        </div>
                      </td>
                      <td>
                        <div className="tb-center tb-bold">
                          {formattedPrice}원
                        </div>
                      </td>
                    </tr>
                    <tr className="total">
                      <td colSpan={6}>
                        <div className="tb-right">
                          주문 금액
                          <span id="pvd-total-discount-block-etc-0" className="fc-red"></span>
                          <strong>{formattedPrice}원</strong>
                          + 배송비
                          <span id="pvd-total-delivery-0" className="delprice"></span>
                          <strong>무료</strong>
                          =
                          <strong>
                            주문금액
                            <span>{location.state?.quantity * productPrice}원
                          </span>
                          </strong>
                        </div>    
                      </td>
                    </tr>
                  </tbody>
               </table>
              </div>
              <section className='order-info'>
                <div className='order-form'>
                  <p className='eEOGCf'>주문 정보</p>
                  <form className='form'>
                    <div>
                      <p>주문자</p>
                      <div>
                        <input
                          type='text'
                          name='userName'
                          className='input'
                          value={userName || ""}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div>
                      <p>이메일</p>
                      <div>
                        <input
                          type='email'
                          name='userEmail'
                          className='input'
                          value={userEmail || ""}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div>
                      <p>연락처</p>
                      <div>
                        <input
                          type='tel'
                          value={userPhone || ""}
                          name='userPhone'
                          className='form'
                          maxLength={13}
                          placeholder='010-0000-0000'
                        />
                      </div>
                    </div>
                  </form>
                  <form className='form'>
                    <p className='eEOGCf'>배송지</p>
                    <div>
                      <p>받는사람</p>
                      <div>
                        <input
                          type='text'
                          value={orderReceiverName || ""}
                          name='orderReceiverName'
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className='address-form'>
                      <p>주소</p>
                      <div className='address-search'>
                        <div className='address-num'>
                          <input
                            type='text'
                            placeholder='우편번호'
                            id='companyAddress'
                            value={zipCode}
                            required
                            className='address-number-01 from'
                          />
                          <button type='button' onClick={onClickAddr}>
                            주소검색
                          </button>
                        </div>
                        <input
                          type='text'
                          placeholder='기본주소'
                          value={userAddress}
                          name='orderReceiverAddress'
                          onChange={onChange}
                          className='default-address-01 form'
                        ></input>
                        <input
                          type='text'
                          placeholder='상세주소'
                          value={orderReceiverAddressDetail}
                          name='orderReceiverAddressDetail'
                          onChange={onChange}
                          className='default-address-01 form'
                        ></input>
                      </div>
                    </div>
                    <div>
                      <p>휴대전화</p>
                      <div
                        value={orderReceiverPhone}
                        name='orderReceiverPhone'
                        onChange={onChange}
                      >
                        <input
                          type='tel'
                          value={orderReceiverPhoneParts.part1}
                          name='part1'
                          onChange={onChangeReceiverPhone}
                          className='form'
                          maxLength={3}
                        />
                        <input
                          type='tel'
                          value={orderReceiverPhoneParts.part2}
                          name='part2'
                          onChange={onChangeReceiverPhone}
                          className='form'
                          maxLength={4}
                        />
                        <input
                          type='tel'
                          value={orderReceiverPhoneParts.part3}
                          name='part3'
                          onChange={onChangeReceiverPhone}
                          className='form'
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <hr></hr>
                    <div>
                      <section className='order-msg'>
                        <p>주문메세지</p>
                        <textarea
                          rows='6'
                          cols='50'
                          name='orderReceiverMessage'
                          value={orderReceiverMessage}
                          onChange={onChange}
                          placeholder='주문메세지를 입력해주세요.'
                        />
                      </section>
                    </div>
                    <hr></hr>
                    <div>
                      <section className='delivery-msg'>
                        <p>배송메시지</p>
                        <textarea
                          rows='6'
                          cols='50'
                          name='orderReceiverDeleveryMsg'
                          value={orderReceiverDeleveryMsg}
                          onChange={onChange}
                          placeholder='배송메시지 입력해주세요.'
                        />
                      </section>
                    </div>
                  </form>
                </div>
              </section>
              <div className="order">
                <h3>주문 금액</h3>
                <div className="tbl-pay">
                  <table>
                    <colgroup>
                      <col style={{ width: '24%' }} />
                      <col style={{ width: '18%' }} />
                      <col style={{ width: '22%' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope ="col" style={{textAlign:'center'}}>상품금액</th>
                        <th scope ="col" style={{textAlign:'center'}}>배송비</th>
                        <th scope ="col" style={{textAlign:'center'}}>결제 예정금액</th>
                      </tr>
                      <tr>
                        <td>
                          <div className="base">
                            <strong>
                              <em>
                                <span className="op-total">{formattedPrice}</span>
                              </em>
                              원
                            </strong>
                          </div>
                        </td>
                        <td>
                          <div className="base">
                            <strong>
                              <em>
                                <span className="op-total">무료</span>
                              </em>
                            </strong>
                            <a className="plus" style={{marginRight:'50px'}}>
                              <img src="https://www.ocamall.com/images/common/bul_h23_plus.png" alt="plus" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="base">
                            <a className="equal">
                              <img src="https://www.ocamall.com/images/common/bul_h23_equal.png" alt="equal" />
                            </a>
                            <strong> 
                              <em className="fc-red">
                                <span className="op-total">{formattedPrice}</span>
                              </em>
                              원
                            </strong>
                          </div>
                        </td>
                      </tr>
                    </thead>
                  </table>
                </div>
                <h3>결제 정보</h3>
                <div className="tbl-order">
                  <table>
                    <colgroup>
                      <col style={{width:'110px'}}/>
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <div className="text-l">결제방법</div>
                        </th>
                        <td>
                          <ul className="payment">
                            <li>
                              <input type="radio" className="chk-rdo" name="radio_payment"/>

                              신용카드
                              <em>
                                <span className="op-card-dc-price fc-red"></span>
                              </em>
                              <em>
                                <span className="op-c-dc-price fc-red"></span>
                              </em>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <p style={{fontSize:'13px'}}>
                  · 안심클릭 및 인터넷안전결제(ISP)서비스로
                  <font color='blue'>128bit SSL</font>
                  로 암호화된 결제 창이 새로 뜹니다.
                  </p>
                  <p style={{fontSize:'13px'}}>
                  · 결제후, 카드명세서에 [
                    <font color="red">KG모빌리언스(Mobilians)</font>
                    ]로 표시되며, 카드 정보는 상점에 남지 않습니다.
                  </p>
                </div>
                <h3>주문자 동의</h3>
                <div className="tbl-order policy">
                  <table>
                    <colgroup>
                    <col style={{width:'130px'}}/>
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <div className="text-l">주문자동의</div>
                        </th>
                        <td>
                          <div className="order-agree-each">
                            <label className="label">
                              <input className="order-input" type="checkbox"/>
                              <span className="text"> 주문 / 결제 정보를 확인하여 구매 진행에 동의합니다.</span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="tbl-order tot-order">
                  <table>
                    <colgroup>
                      <col style={{width:'100px'}}></col>
                    </colgroup>
                    <thead>
                      <tr>
                        <th>총 결제금액</th>
                      <td>
                        <strong className="totalprice">
                          <em>
                            <span className="op=total-price">{location.state?.quantity * productPrice}</span>
                          </em>
                          <span className="block-unit-won">원</span>
                        </strong>
                        &nbsp; 
                      </td>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="paybutton">
                <button className="CSSbuttonBlack" onClick={saveOrder}>주문하기</button>
                <button className="CSSbuttonWhite" onClick={backToList}>주문취소</button>

                </div>
              </div>
            </>
          ) : (
            <p>상품을 찾을 수 없습니다.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrderCart;
