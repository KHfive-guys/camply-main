package com.camply.shop.productdetail.reviewcomment.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewCommentVO {
/*
 COMMENT_NO
REVIEW_NO
COMMENT_TITLE
COMMENT_DATE
 * */
	private int commentNo;
	private int reviewNo;
	private String commentTtile;
	private String commentDati;
}
