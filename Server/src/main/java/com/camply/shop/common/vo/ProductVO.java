package com.camply.shop.common.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductVO {
	

	private int productId;
	private String productName;
	private String productDescription;
	private int productPrice;
	private String productCategory;
	private String productColor;
	private String productThumbnail;
	private String productMain;
	private String productMain2;
	private String productMain3;
	private String productContent;
	private Date productCreateDate;
	private int productStock;
	private int userId;
	
	
	
	
	
	
}
