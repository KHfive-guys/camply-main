package com.camply.shop.cart.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.shop.cart.dao.CartDao;
import com.camply.shop.cart.vo.CartVO;

@Service
public class CartService {
	
	@Autowired
	private CartDao cartDao;
	public void insertCart(CartVO cartVO) {
		cartDao.insertCart(cartVO);
	}
}
