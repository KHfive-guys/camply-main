import React, { useState, useEffect } from 'react';
import Layout from '../../../shop/ShopLayout';
import '../../css/ShopOrder/OrderMain.css';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const OrderCart = () => {
    const [product, setProduct] = useState("");
    const [map, setMap] = useState({});
    const [marker, setMarker] = useState(null);
    const [userIds, setUserIds] = useState(null);
    const [order, setOrder] = useState({

        orderId: '0',
        userIds: '',
        orderOrdererName: '',
        orderOrderEmail: '',
        orderOrderPhone: '',
        orderReceiverName: '',
        orderReceiverAddress: '',
        orderReceiverAddressDetail: '',
        orderReceiverPhone: '',
        orderReceiverMessage: '',
        orderReceiverDeleveryMsg: '',

    });
    const navigate = useNavigate();
    const { productId } = useParams();
    const location = useLocation();  // useLocation을 여기로 이동
    const [userName, setUserName] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        if (location && location.state && location.state.quantity) {
            // location이 존재하고 state도 존재하며 quantity도 존재할 때만 실행
            // 필요에 따라 추가적인 로직을 수행할 수 있습니다.
            console.log('Quantity:', location.state.quantity);
        }
    }, [location]);

    const { orderId, userId, orderOrdererName, orderOrderEmail, orderReceiverName, orderReceiverAddress, orderReceiverAddressDetail, orderReceiverPhone, orderReceiverMessage, orderReceiverDeleveryMsg } = order;

    const onChange = (event) => {
        const { value, name } = event.target;
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    // 핸드폰 번호 상태 관리
    const [orderOrderPhone, setOrderOrderPhone] = useState({
        part1: '',
        part2: '',
        part3: '',
    });

    const onChangePhone = (event) => {
        const { value, name } = event.target;

        setOrderOrderPhone((prevPhone) => ({
            ...prevPhone,
            [name]: value,
        }));
    };


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/shop/detail/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('상품 정보를 가져오는 중 오류 발생', error);
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
                setUserAddress(addrData.address);
            });
          },
        }).open();
      };


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
                setUserPhone(decodedToken.userPhone || "");  // userPhone을 문자열로 변경
                setUserAddress(decodedToken.userAddress || "");

                setOrder((prevOrder) => ({
                    ...prevOrder,
                    userId: decodedToken.user_id || "",
                    orderOrdererName: decodedToken.USER_NAME || "",
                    orderOrderEmail: decodedToken.email || "",
                    orderOrderPhone: decodedToken.userPhone || "",  // userPhone을 바로 대입
                    orderReceiverName: '',
                    orderReceiverAddress: '',
                    orderReceiverAddressDetail: '',
                    orderReceiverPhone: '',
                    orderReceiverMessage: '',
                    orderReceiverDeleveryMsg: '',


                }));

            }
        };
        fetchUserData();
    }, []);
    const saveOrder = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const orderData = {
                orderId: 0,
                userId: order.userIds,
                orderOrdererName: order.orderOrdererName,
                orderOrderEmail: order.orderOrderEmail,
                orderOrderPhone: order.orderOrderPhone,
                orderReceiverName: '',
                orderReceiverAddress: '',
                orderReceiverAddressDetail: '',
                orderReceiverPhone: '',
                orderReceiverMessage: '',
                orderReceiverDeleveryMsg: '',
                productId: productId,
                orderProductAmount: location.state.quantity,
                orderProductPrice: product.productPrice || 0,
                productThumbnail: product.productThumbnail || '',
                orderProductName: product.productName || '',

            };
            console.log('orderData:', orderData);

            const response = await axios.post('http://localhost:8080/shop/order/post/', orderData);

            console.log('Response:', response);

            // 주문 완료 후 추가한 부분
            alert('주문이 성공적으로 완료되었습니다.');
            navigate('/shop/main');

        } catch (error) {
            console.error('주문을 저장하는 중 오류 발생', error);
        }
    };
    const backToList = () => {
        navigate('/shop/main');
    };
    return (
        <div className='root'>
            <div className='order-main'>
                <main className='main-container'>
                    {product && Object.keys(product).length > 0 ? (
                        <>
                            <section className='product-list'>
                                <ul>
                                    <li>
                                        <div>
                                            <img src={product.productThumbnail} alt='제품 이미지' />
                                            <p className='item-title'>{product.productName}</p>
                                        </div>
                                        <p>
                                            수량 : <span>{location.state?.quantity || 0}</span>
                                        </p>
                                        <p>
                                            상품 금액 : <span>{product.orderProductPrice}</span>
                                        </p>
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
                                                <input type='text' name='userName' className='input' value={userName || ""} onChange={onChange} />
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
                                                ></input>
                                                <span>@</span>
                                                <select
                                                    name='emailDomain' // 새로 추가된 부분
                                                    className='input'
                                                    onChange={onChange}

                                                >
                                                    <option value='direct'>직접 입력</option>
                                                    <option value='naver.com'>naver.com</option>
                                                    <option value='gmail.com'>gmail.com</option>
                                                    <option value='yahoo.com'>yahoo.com</option>
                                                    <option value='nate.com'>nate.com</option>
                                                </select>
                                                {order.emailDomain === 'direct' && ( // 새로 추가된 부분
                                                    <input
                                                        type='text'
                                                        className='direct-input form'
                                                        placeholder='직접 입력'
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <p>휴대전화</p>
                                            <div >
                                                <input
                                                    type='number'
                                                    value={userPhone.part1 || ""}
                                                    name='userPhone'
                                                    onChange={onChangePhone}
                                                    className='form'
                                                    maxLength={3}
                                                />
                                                <input
                                                    type='number'
                                                    value={userPhone.part2 || ""}
                                                    name='userPhone                                                     value={userPhone.part2}
                                                    '
                                                    onChange={onChangePhone}
                                                    className='form'
                                                    maxLength={4}
                                                />
                                                <input
                                                    type='number'
                                                    value={userPhone.part3 || ""}
                                                    name='userPhone'
                                                    onChange={onChangePhone}
                                                    className='form'
                                                    maxLength={4}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                    <form className='form'>
                                        <p className='eEOGCf'>배송지</p>
                                        <div>
                                            <p>받는사람</p>
                                            <div>
                                                <input type='text' value={orderReceiverName || ""} name="orderReceiverName" onChange={onChange} />
                                            </div>
                                        </div>
                                        <div className='address-form'>
                                            <p>주소</p>
                                            <div className='address-search'>
                                                <div className='address-num'>
                                                    <input type='text' placeholder='우편번호' id='companyAddress'    required className='address-number-01 from' />
                                                    <button type='button' onClick={onClickAddr}>주소검색</button>
                                                </div>
                                                <input type='text' placeholder='기본주소' value={userAddress}  name='orderReceiverAddress' onChange={onChange}  className='default-address-01 form'></input>

                                            </div>
                                        </div>
                                        <div>
                                            <p >휴대전화</p>
                                            <div value={orderReceiverPhone} name="orderReceiverPhone" onChange={onChange}>
                                                <input type='number' className='form' maxLength={3} />
                                                <input type='number' className='form' maxLength={4} />
                                                <input type='number' className='form' maxLength={4} />
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
                                            <span>상품 금액 :</span> {product.orderProductPrice}
                                        </p>
                                        <p>
                                            <span>배송비 :</span> 무료
                                        </p>
                                        <p className='order-total-price'>
                                            <span>총 금액</span> {product.orderProductAmount * product.orderProductPrice}
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