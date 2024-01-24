package com.camply.shop.mypage.productmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.shop.common.vo.ProductVO;
import com.camply.shop.mypage.productmanagement.dao.ProductManagementDAO;

@Service
public class ProductManagementService {
	
	@Autowired
	private ProductManagementDAO productManagementDAO;
	
	//상품 등록
	public void insertProduct(ProductVO productVO) {
		productManagementDAO.insertProduct(productVO);
	}
	
	//등록 상품 리스트 조회
	public List<ProductVO> getAllProductsList() {
        return productManagementDAO.getAllProducts();
	}
	
	//단일 상품 조회
	 public ProductVO getProductById(int productId) {
	    return productManagementDAO.getProductById(productId);
	 }
	
	//등록 상품 수정
	public void updateProduct(ProductVO productVO) {
		productManagementDAO.updateProduct(productVO);
	}
	
	//등록 상품 삭제
	public void deleteProduct(int productId) {
		productManagementDAO.deleteProduct(productId);
	}
	
	//장바구니 등록
	public void addCartProduct(ProductVO productId) {
		productManagementDAO.addCartProduct(productId);
	}
	
}