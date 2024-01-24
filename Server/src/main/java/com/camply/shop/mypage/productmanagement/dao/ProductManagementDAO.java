package com.camply.shop.mypage.productmanagement.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.common.vo.ProductVO;

@Mapper
public interface ProductManagementDAO {
	
	//상품등록
	void insertProduct(ProductVO productVO);
	
	//등록 상품 리스트 조회
	List<ProductVO> getAllProducts();
	
	//단일 상품 조회
	ProductVO getProductById(int productId);
	
	//등록 상품 수정
	void updateProduct(ProductVO productVO);
	
	//등록 상품 삭제
	void deleteProduct(int productId);
	
	//장바구니에 상품등록
	void addCartProduct(ProductVO productId);
	
	
	

}