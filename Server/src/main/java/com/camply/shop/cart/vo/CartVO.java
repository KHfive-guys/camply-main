package com.camply.shop.cart.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartVO {
	/*
CART_ID
PRODUCT_ID
CART_CATEGORY
CART_IMG
CART_NAME
CART_PRICE
CART_AMOUNT
	 * */
	private int cartId;
	private int productId;
	private String cartCategory;
	private String cartImg;
	private String cartName;
	private String cartPrice;
	private String cartAmount;
	
}
