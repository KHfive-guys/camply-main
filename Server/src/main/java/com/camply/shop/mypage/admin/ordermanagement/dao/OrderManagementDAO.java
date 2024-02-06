package com.camply.shop.mypage.admin.ordermanagement.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.camply.shop.common.vo.OrderVO;

@Mapper
public interface OrderManagementDAO {

	List<OrderVO> getOrderList(@Param("userId") int userId);
}