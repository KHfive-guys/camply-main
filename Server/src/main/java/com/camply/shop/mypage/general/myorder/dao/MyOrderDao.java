package com.camply.shop.mypage.general.myorder.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.common.vo.OrderVO;

@Mapper
public interface MyOrderDao {

	// 내주문 조회
	OrderVO viewMyOrder(int userId);

	// 내주문 수정
	void updateMyOrder(int orderId);

	// 내주문 삭제
	void deleteMyOrder(int orderId);
}
