package com.camply.shop.mypage.productmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.common.vo.ProductVO;
import com.camply.shop.mypage.productmanagement.service.ProductManagementService;

@RestController
@RequestMapping("/shop/mypage")
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true", allowedHeaders="*")
public class ProductManagementController {
	@Autowired
	private ProductManagementService productManagementService;
	
	//상품 등록
	@PostMapping("/productAdd")
    public ResponseEntity<ProductVO> insertProduct(@RequestBody ProductVO shopProduct) {
		try {
			// 나머지 로직은 그대로 유지
			productManagementService.insertProduct(shopProduct);
			return ResponseEntity.status(HttpStatus.CREATED).body(shopProduct);
		} catch(Exception e) {
			e.printStackTrace();
		}
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
	
	//등록 상품 리스트 조회
	@GetMapping("/productList")
	public ResponseEntity<List<ProductVO>> getAllProducts() {
		try {
			List<ProductVO> productList = productManagementService.getAllProductsList();
			System.out.println("product : " + productList);
			return ResponseEntity.ok(productList);
			
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	//등록 상품 단일 조회
	@GetMapping("/product/{productId}")
	public ResponseEntity<ProductVO> getProductById(@PathVariable int productId) {
	    ProductVO product = productManagementService.getProductById(productId);
	    if(product != null) {
	        return ResponseEntity.ok(product);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	
	//등록 상품 수정
	@PutMapping("/product/edit/{productId}")
	public ResponseEntity<ProductVO> updateProduct(@PathVariable int productId, @RequestBody ProductVO productVO) {
		productVO.setProductId(productId); // 받아온 productId를 shopProduct 객체에 설정
		productManagementService.updateProduct(productVO);
	    return ResponseEntity.ok().build();
	}

	//등록 상품 삭제
	@DeleteMapping("/productDelete/{productId}")
	public ResponseEntity<?> deleteProduct	(@PathVariable int productId) {
		productManagementService.deleteProduct(productId);
		return ResponseEntity.ok().build();
	}
	
	/*
	@PostMapping("/addCart/{productId")
	public ResponseEntity<ShopProduct> addCartProduct(@RequestBody @PathVariable ShopProduct productId) {
		shopProductService.addCartProduct(productId);
		return ResponseEntity.ok(null);
	}
	*/
}