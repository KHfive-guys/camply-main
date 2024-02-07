package com.camply.shop.mypage.admin.productmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.camply.shop.common.vo.ProductVO;
import com.camply.shop.mypage.admin.productmanagement.service.ProductManagementService;

@RestController
@RequestMapping("/shop/mypage")
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true", allowedHeaders="*")
public class ProductManagementController {
    @Autowired
    private ProductManagementService productManagementService;

    //상품 등록
    @PostMapping("/productAdd")
    public void insertProduct(@RequestBody ProductVO productVO) {
        productManagementService.insertProduct(productVO);
    }

    @GetMapping("/getUserProductCount")
    public int getUserProductCount(@PathVariable Long userId) {
        return productManagementService.getUserProductCount(userId);
    }

    // 등록 상품 리스트 조회
    @GetMapping("/productList")
    public List<ProductVO> getAllProductsByUserId(@PathVariable("user_id") Long userId) {
        return productManagementService.getAllProductsByUserId(userId);
    }


    //등록 상품 단일 조회
    @GetMapping("/product/{productId}")
    public ProductVO getProductById(@PathVariable Long productId, @RequestParam Long userId) {
        return productManagementService.getProductById(productId, userId);
    }


    //등록 상품 수정
    //판매자의 userId를 토큰에서 추출하여 사용하여 getProductById 호출
    @PutMapping("/product/edit/{productId}")
    public void updateProduct(@RequestBody ProductVO productVO, @RequestParam Long userId) {
        productManagementService.updateProduct(productVO, userId);
    }

    //등록 상품 상태 수정
    //판매자의 userId를 토큰에서 추출하여 사용하여 updateProduct 호출
    @PutMapping("/product/statusEdit/{productId}")
    public void statusUpdateProduct(@RequestParam Long productId, @RequestParam String productStatus, @RequestParam Long userId) {
        productManagementService.statusUpdateProduct(productId, productStatus, userId);
    }



    //등록 상품 삭제
    //판매자의 userId를 토큰에서 추출하여 사용하여 deleteProduct 호출
    @DeleteMapping("/productDelete/{productId}")
    public void deleteProduct(@RequestParam Long productId, @RequestParam Long userId) {
        productManagementService.deleteProduct(productId, userId);
    }
}