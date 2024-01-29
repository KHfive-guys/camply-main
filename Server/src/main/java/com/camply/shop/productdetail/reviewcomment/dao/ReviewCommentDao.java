package com.camply.shop.productdetail.reviewcomment.dao;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.productdetail.reviewcomment.vo.ReviewCommentVO;

@Mapper
public interface ReviewCommentDao {

	// 댓글 조회
	ReviewCommentVO getComment(int commentNo);

	// 댓글 작성
	void insertComment(ReviewCommentVO commentVO);
}
