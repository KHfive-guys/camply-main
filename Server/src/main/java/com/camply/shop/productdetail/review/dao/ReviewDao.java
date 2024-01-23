package com.camply.shop.productdetail.review.dao;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.productdetail.review.vo.ReviewVO;


@Mapper
public interface ReviewDao {
	//댓글 조회
	ReviewVO getReview(int reviewNo);
		
	//댓글 작성
	void insertReview(ReviewVO reviewVO);
	
	//댓글 조회수등가
	void incrementReviewHit(int reviewNo);
		
}
