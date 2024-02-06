package com.camply.shop.mypage.admin.ordermanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.common.vo.OrderVO;
import com.camply.shop.mypage.admin.ordermanagement.service.OrderManagementService;

@RestController
@RequestMapping("/shop/mypage")
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true", allowedHeaders="*")
public class OrderManagementController {
	@Autowired
	private OrderManagementService orderManagementService;
	
	//주문 리스트 조회
	@GetMapping("/orderList/{userId}")
	public ResponseEntity<List<OrderVO>> getOrderList(@PathVariable int userId) {
		try {
			List<OrderVO> orderList = orderManagementService.getOrderList(userId);
			System.out.println("order : " + orderList);
			return ResponseEntity.ok(orderList);
			
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}