package com.camply.shop.mypage.admin.ordermanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.shop.common.vo.OrderVO;
import com.camply.shop.mypage.admin.ordermanagement.dao.OrderManagementDAO;

@Service
public class OrderManagementService {

	@Autowired
	private OrderManagementDAO orderManagementDAO;

	public List<OrderVO> getOrderList(Long userId) {
		return orderManagementDAO.getOrderList(userId);
	}
}