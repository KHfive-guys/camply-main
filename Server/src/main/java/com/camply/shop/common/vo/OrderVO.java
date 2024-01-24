package com.camply.shop.common.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.NumberFormat;
/*
ORDER_ID
USER_ID
ORDER_ORDERER_NAME
ORDER_ORDERER_EMAIL
ORDER_ORDERER_PHONE
ORDER_RECEIVER_NAME
ORDER_RECEIVER_ADDRESS
ORDER_RECEIVER_ADDRESSDETAILL
ORDER_RECEIVER_PHONE
ORDER_RECEIVER_MESSAGE
ORDER_RECEIVER_DELIVERY_MESSAGE
ORDER_PRODUCT_IMG
ORDER_PRODUCT_NAME
ORDER_PRODUCT_AMOUNT
ORDER_PRODCUT_QUANTITY
ORDER_DATE
ORDER_PRODUCT_PRICE
ORDER_STATUS
PRODUCT_ID
 */
import java.time.LocalDateTime;
import java.util.Locale;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderVO {
	private int orderId;
	private int userId;
	private String orderOrdererName;
	private String orderOrderEmail;
	private String orderOrderPhone;	
	private String orderReceiverName;
	private String orderReceiverAddress;
	private String orderReceiverAddressDetail;
	private String orderReceiverPhone;
	private String orderReceiverMessage;
	private String orderReceiverDeleveryMsg;
	private String orderProductImg;
	private String orderProductName;
	private int orderProductAmount;
	private int orderProductQuantity;
	private LocalDateTime orderDate;
	private int orderProductPrice;
	private String orderStatus;
	private int productId;
	
	private ProductVO product;
	
	public ProductVO getProduct() {
		return product;
	}
	public void setProduct(ProductVO product) {
        this.product = product;
    }
	
	//상품가격 * 주문수량 = 총결제금액 계산식
	public int calculateToTalAmount() {
		return this.orderProductQuantity * this.product.getProductPrice();
	}
	
	//클라이언트에서 <td> {order.formattedTotalAmount}</td> 호출할 때 원화로 포맷팅하여 호출
	public String getFormattedTotalAmount() {
		int tatalAmount = calculateToTalAmount();
        return NumberFormat.getNumberInstance(Locale.KOREA).format(tatalAmount) + "원";
	}
	
}
