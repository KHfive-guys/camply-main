package com.camply.shop.productdetail.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.productdetail.review.service.ReviewService;
import com.camply.shop.productdetail.review.vo.ReviewVO;
@RestController
@RequestMapping("/review")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class ReviewController {
	@Autowired
	private ReviewService reviewService;
	
	//후기 조회
	@GetMapping("/view/{reviewNo}")
	public ResponseEntity<ReviewVO> getReview(@PathVariable int reviewNo){
		reviewService.incrementReviewHit(reviewNo);
		ReviewVO reviewVO = reviewService.getReview(reviewNo);
		if(reviewVO != null) {
			return ResponseEntity.ok(reviewVO);
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
	//후기 작성
	@PostMapping("/post")
	  public ResponseEntity<String> postComment(@RequestBody ReviewVO reviewVO) {
		reviewService.postReview(reviewVO);
        return ResponseEntity.ok("Success");
    }
}
