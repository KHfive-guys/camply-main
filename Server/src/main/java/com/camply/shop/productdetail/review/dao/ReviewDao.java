package com.camply.shop.productdetail.review.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.productdetail.review.vo.ReviewVO;

@Mapper
public interface ReviewDao {
	
	// 후기 전체 조회
	List<ReviewVO> selectAllReview();
	// 후기 조회
	ReviewVO getReview(int reviewNo);

	// 후기 작성
	void insertReview(ReviewVO reviewVO);

	// 후기 조회수등가
	void incrementReviewHit(int reviewNo);

	// 후기 수정
	void updateReview(int reviewNo);

	// 후기 삭제
	void deleteReview(int reviewNo);
}
