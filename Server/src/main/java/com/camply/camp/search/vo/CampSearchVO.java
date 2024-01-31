package com.camply.camp.search.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampSearchVO {

	@JsonProperty("CAMP_ID")
    private Long CAMP_ID;
	
	@JsonProperty("USER_ID")
    private Long USER_ID;
	
	@JsonProperty("CAMP_SELECT")
    private String CAMP_SELECT;
	
	@JsonProperty("CAMP_LOCATION")
    private String CAMP_LOCATION;
	
	@JsonProperty("CAMP_NAME")
    private String CAMP_NAME;
	
	@JsonProperty("CAMP_ADDRESS")
    private String CAMP_ADDRESS;
	
	@JsonProperty("CAMP_PHONE")
    private String CAMP_PHONE;
	
	@JsonProperty("CAMP_ADULT")
    private Long CAMP_ADULT;
	
	@JsonProperty("CAMP_CHILD")
    private Long CAMP_CHILD;
	
	@JsonProperty("CAMP_PRICE")
    private Long CAMP_PRICE;
	
	@JsonProperty("CAMP_IMAGE")
    private String CAMP_IMAGE;
	
	@JsonProperty("CAMP_DESCRIPTION")
    private String CAMP_DESCRIPTION;
	
	@JsonProperty("CAMP_FACILTIY")
    private String CAMP_FACILTIY;

}
