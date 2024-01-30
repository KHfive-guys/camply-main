import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrderCart from './OrderCart';



const OrderMain = {
    orderId: '0',
    userId: '',
    productId: '',
    orderOrdererName:'',
    orderOrderEmail:'',
    orderOrderPhone:'',
    orderReceiverName:'',
    orderReceiverAddress:'',
    orderReceiverAddressDetail:'',
    orderReceiverPhone:'',
    orderReceiverMessage:'',
    orderReceiverDeleveryMsg:'',
};

const OrderSave = () => {
    const [order, setOrder] = useState({ ...OrderMain });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Input Changed:', name, value);
        setOrder({ ...order, [name]: value });
    };

    const handleAddOrder = async () => {
        try {
            const response = await axios.post('http://localhost:8080/shop/order/post', order);
            console.log(response.data);
            alert('주문완료 되었습니다.');
            navigate('/home');
        } catch (error) {
            console.error('주문 중 오류:', error);
            alert('주문 실패');
        }
    };

   






    return (
        <div>
            <h2>주문하기</h2>
            <div>
                <span>유저{order.userId}</span>
            </div>
            <div>
                <span>상품{order.productId}</span>
            </div>
            <div>
                <span>주문자</span>
                <input 
                type='text'
                name='ordererName'
                onChange={handleInputChange}
                value={order.ordererName}
                />
            </div>
            <br/>
            <div>
                <span>이메일</span>
                <input
                    type='email'
                    name='ordererEmail' 
                    onChange={handleInputChange}
                    value={order.ordererEmail}
                />
            </div>
            <br />
            <div>
                <span>전화번호</span>
                <input
                    type='tel' 
                    name='ordererPhone'
                    onChange={handleInputChange}
                    value={order.ordererPhone}
                />
            </div>
            <br />
            <div>
                <span>받는사람주소</span>
                <input
                    type='text' 
                    name='receiverAddress'
                    onChange={handleInputChange}
                    value={order.receiverAddress}
                />
            </div>
            <br />
            <div>
                <span>상세주소</span>
                <input
                    type='text' 
                    name='receiverAddressDetail'
                    onChange={handleInputChange}
                    value={order.receiverAddressDetail}
                />
            </div>
            <br />
            <div>
                <span>핸드폰번호</span>
                <input
                type='text'
                name='receiverPhone'
                onChange={handleInputChange}
                value={order.receiverPhone}
                />
            </div>
            <br/>
            <div>
                <span>주문메세지</span>
                <textarea
                    name='receiverMessage'
                    onChange={handleInputChange}
                    value={order.receiverMessage}
                />
            </div>
            <br />
            <div>
                <span>배송메세지</span>
                <textarea
                    name='deliveryMessage'
                    onChange={handleInputChange}
                    value={order.deliveryMessage}
                />
            </div>
            <br/>
            <div>
                <button type='button' onClick={handleAddOrder}>주문하기</button>
            </div>

        </div>
    )
}

export default OrderSave;