import React, { useState, useEffect } from "react";
import Layout from "../../../shop/ShopLayout";
import "../../css/ShopOrder/OrderMain.css";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const OrderCart = () => {
  const [product, setProduct] = useState("");
  const [map, setMap] = useState({});
  const [marker, setMarker] = useState(null);
  const [userIds, setUserIds] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
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
  const { product: productInfo, quantity } = location.state || { product: null, quantity: 0 };
  const formattedPrice = product
    ? new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(quantity * product.productPrice)
    : "0원";
    const saveOrder = async () => {
        // 주문 데이터 준비 및 API 호출 로직 (생략)
        alert("주문 처리 로직 구현 필요");
        // navigate('/some-success-page'); // 주문 성공 페이지로 이동
      };
    const onChange = (event) => {
        const { name, value } = event.target;
        setOrder((prevOrder) => ({
          ...prevOrder,
          [name]: value,
        }));
      };
  const { productId } = useParams();
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
    const { name, value } = event.target;
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

  const onChangePhoneNumber = (event) => {
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

  // 핸드폰 번호 010-0000-0000 혁식으로 나타내기 위한 함수
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
        {product && (
          <>
    <section className='product-list'>
          <ul>
            <li>
              <div>
                <img src={product.productThumbnail} alt="제품 이미지" />
                <p className='item-title'>{productInfo.productName}</p>
              </div>
              <p>수량 : <span>{quantity}</span></p>
              <p><span>상품 금액 :</span> {formattedPrice}</p>
            </li>
          </ul>
        </section>
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
                <div className='order-price'>
                  <div className='order-price-info'>
                    <p>
                      <span>상품 금액 :</span> {formattedPrice}원
                    </p>
                    <p>
                      <span>배송비 :</span> 무료
                    </p>
                    <p className='order-total-price'>
                      <span>총 금액</span>{" "}
                      {location.state?.quantity * productPrice}원
                    </p>
                    <button onClick={saveOrder}>구매하기</button>
                    <button onClick={backToList}>취소</button>
                  </div>
                </div>
              </section>
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
