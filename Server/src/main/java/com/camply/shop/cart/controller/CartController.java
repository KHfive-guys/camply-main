package com.camply.shop.cart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.cart.service.CartService;
import com.camply.shop.cart.vo.CartVO;

@RestController
@RequestMapping("/shop/cart")
@CrossOrigin(origins="http://localhost:3000", 
allowCredentials="true",
allowedHeaders="*")
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	@PostMapping("/post")
	public ResponseEntity<String> insertCart(@RequestBody CartVO cartVO){
		cartService.insertCart(cartVO);
		return ResponseEntity.ok("success");
	}
}
