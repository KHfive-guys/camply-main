package com.camply.shop.productdetail.review.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewVO {
/*
 REVIEW_NO
USER_ID
PRODUCT_ID
REVIEW_TITLE
REVIEW_TEXT
REVIEW_NAME
REVIEW_DATE
REVIEW_HIT
 * */
	
	private int reviewNo;
	private int userId;
	private int productId;
	private String reviewTitle;
	private String reviewText;
	private String reviewName;
	private LocalDateTime reviewDate;
	private int reviewHit;
}
