package com.camply.shop.cart.dao;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.cart.vo.CartVO;
import com.camply.shop.common.vo.ProductVO;

@Mapper
public interface CartDao {

	// 장바구니에 상품정보 가져오기
	ProductVO getProduct(int productId);

	// 장바구니 값 넣기
	void insertCart(CartVO cartVO);
}
