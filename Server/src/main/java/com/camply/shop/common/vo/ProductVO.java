package com.camply.shop.common.vo;

import java.sql.Date;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.util.Locale;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductVO {
	
	private Long PRODUCT_ID;
	private String PRODUCT_NAME;
	private String PRODUCT_DESCRIPTION;
	private int PRODUCT_PRICE;
	private String PRODUCT_CATEGORY;
	private String PRODUCT_COLOR;
	private String PRODUCT_THUMBNAIL;
	private String PRODUCT_MAIN;
	private String PRODUCT_MAIN2;
	private String PRODUCT_MAIN3;
	private String PRODUCT_CONTENT;
	private int PRODUCT_STOCK;
	private String PRODUCT_CREATE_DATE;
	private Long USER_ID;
	private String PRODUCT_STATUS;

}
