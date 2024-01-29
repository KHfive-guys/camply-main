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
	private int cartId;
	private int productId;
	private String cartCategory;
	private String cartImg;
	private String cartName;
	private String cartPrice;
	private String cartAmount;

}
