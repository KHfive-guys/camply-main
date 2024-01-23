package com.camply.shop.productdetail.review.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.camply.shop.productdetail.review.dao.ReviewDao;
import com.camply.shop.productdetail.review.vo.ReviewVO;


@Service
public class ReviewService {
	@Autowired
	private ReviewDao reviewDao;
	
	//후기 조회
	public ReviewVO getReview(int reviewNo) {
		return reviewDao.getReview(reviewNo);
	}
	
	//후기 작성
	public void postReview(ReviewVO reviewVO) {
		reviewDao.insertReview(reviewVO);
	}
	
	//후기 조회수 증가
	 @Transactional
	    public void incrementReviewHit(int reviewNo) {
		 reviewDao.incrementReviewHit(reviewNo);
	    }
}
