package com.camply.camp.search.controller;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.camp.search.service.CampSearchService;
import com.camply.camp.search.vo.CampSearchVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/camp/search")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")

public class CampSearchController {

	private final CampSearchService campsearchsearvice;
	
	@GetMapping("/campList")
	public ResponseEntity<?> searchCampList(@RequestBody CampSearchVO campsearchvo) {
		
		System.out.println("code check CampSearchController campsearchvo : " + campsearchvo.getCAMP_SELECT());
		try {

			ArrayList<CampSearchVO> campList = campsearchsearvice.searchCampList(campsearchvo);
			
			if (campList != null) {

				return ResponseEntity.ok(campList);
				
			} else {
				
				return ResponseEntity.ok("일치하는 데이터가 없습니다,");
				
			}
			
		} catch (Exception e) {

			return ResponseEntity.status(500).body(e + "	: 데이터 요청에 실패 하였습니다.");
		}
	}
}
