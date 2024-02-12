import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/ShopCart/ShopCart.css';
import { Button } from "@mui/material";
import Nav from '../../camp/CampNavbar';


const CartList = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    // 토큰에서 사용자 ID 추출하는 함수
    const extractUserIdFromToken = () => {
        const token = localStorage.getItem("yourTokenKey");
        if (token) {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const decodedToken = JSON.parse(window.atob(base64));
            return decodedToken.user_id; // 사용자 ID 반환
        }   
        return null;
    };
    const handleCheckout = (product) => {
        navigate(`/shop/order/${product.productId}`, {
            state: { product: product, quantity: product.productAmount },
        });
    };
    const handleRemoveItem = async (cartId) => {
        try {
            await axios.delete(`http://localhost:8080/shop/cart/delete/${cartId}`);
            // 삭제 후 장바구니 목록을 다시 가져오거나 상태를 업데이트
            setCartItems(cartItems.filter((item) => item.cartId !== cartId));
        } catch (error) {
            console.error("장바구니 항목을 삭제하는 중 오류 발생", error);
        }
    };


    //뒤로 가기 
    const backtodetail = () => {
        navigate(-1); // 뒤로 가기
      }
    // 장바구니 정보 가져오기
    const fetchCartItems = async () => {
        const userId = extractUserIdFromToken();
        if (userId) {
            try {
                const response = await axios.get(
                    `http://localhost:8080/shop/cart/mycart/${userId}`
                );
                setCartItems(response.data);
            } catch (error) {
                console.error("장바구니 정보를 불러오는 중 오류 발생", error);
            }
        } else {
            console.error("사용자 ID를 찾을 수 없습니다.");
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <>
            <Nav />
            <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px'}} id="content">
                <div id="cartWrap">
                    <h2 className="tit-page">장바구니</h2>
                    <div className="page-body">
                        <div className="table-cart table-fill-prd">
                            <div className="cart-list">
                                <table summary="사진, 제품명, 수량, 가격, 취소">
                                    <colgroup>
                                        <col width={120}></col>
                                        <col width={"*"}></col>
                                        <col width={110}></col>
                                        <col width={100}></col>
                                        <col width={95}></col>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col">
                                                <div className="tb-center">사진</div>
                                            </th>
                                            <th scope="col">
                                                <div className="tb-center">상품명</div>
                                            </th>
                                            <th scope="col">
                                                <div className="tb-center">수량</div>
                                            </th>
                                            <th scope="col">
                                                <div className="tb-center">금액</div>
                                            </th>
                                            <th scope="col">
                                                <div className="tb-center">취소</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={7}>
                                                <div className="total-prices tb-right">
                                                    <div className="prov-icons">
                                                        <p className="ico ico1">본사배송</p>
                                                    </div>
                                                    총 구매금액 : {cartItems.reduce((acc, item) => acc + item.productPrice * item.productAmount, 0)}원 =
                                                    <strong style={{ color: 'red' }}>{cartItems.reduce((acc, item) => acc + item.productPrice * item.productAmount, 0)}원</strong>
                                                    (적립금 0원)
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="tb-center">
                                                        <div className="thumb">
                                                            <img
                                                                style={{ display: 'block', width: "70px", height: "70px" }}
                                                                src={item.productThumbnail}
                                                                alt="상품 이미지"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="tb-left">
                                                        {item.productName}
                                                        <div className="tb-opt"></div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="tb-center">
                                                        {item.productAmount}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="tb-center tb-bold tb-price">
                                                        <span>{item.productPrice}</span>
                                                        원
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="tb-center">
                                                        <span className="d-block">
                                                            <Button color="success" variant="contained" type="submit" onClick={() => handleRemoveItem(item.cartId)}>
                                                                삭제하기
                                                            </Button>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        
                        </div>
                    </div>
                    <div className="basket-totalprice">
                        <div className="totalprice-img">총 결제금액</div>
                        <div className="totalprice-text">
                            {cartItems.reduce((acc, item) => acc + item.productPrice * item.productAmount, 0)}원
                        </div>
                    </div>
                    <div className="btn-order-ctrl">
                        <Button color="success" variant="contained" type="submit" onClick={() => handleCheckout(cartItems[0])}>결제하기</Button>
                        <button onClick={backtodetail}>계속 쇼핑하기</button>
                    </div>
                </div>
            </div>
        </div>                                   
    </>
    );
};

export default CartList;