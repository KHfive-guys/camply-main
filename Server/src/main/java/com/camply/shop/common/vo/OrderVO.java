package com.camply.shop.common.vo;

import java.time.LocalDateTime;

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
	
}
