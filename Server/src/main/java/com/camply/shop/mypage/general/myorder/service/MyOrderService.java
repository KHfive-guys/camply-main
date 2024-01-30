package com.camply.shop.mypage.general.myorder.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.camply.shop.common.vo.OrderVO;
import com.camply.shop.mypage.general.myorder.dao.MyOrderDao;

@Service
public class MyOrderService {

	@Autowired
	private MyOrderDao myOrderDao;

	// 내주문 조회
	public OrderVO viewMyOrder(int userId) {
		return myOrderDao.viewMyOrder(userId);
	}

	// 내주문 수정
	@Transactional
	public void updateMyOrder(int orederId) {
		myOrderDao.updateMyOrder(orederId);
	}

	// 내주문 삭제
	public void deleteMyOrder(int orderId) {
		myOrderDao.deleteMyOrder(orderId);
	}
}
