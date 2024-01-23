package com.camply.shop.cart.dao;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.cart.vo.CartVO;

@Mapper
public interface CartDao {

		//장바구니 값 넣기
		void insertCart(CartVO cartVO);
}
