package com.camply.camp.search.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.camply.camp.search.dao.CampSearchDao;
import com.camply.camp.search.vo.CampSearchVO;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class CampSearchService {

	private final CampSearchDao campsearchdao;
	
	public ArrayList<CampSearchVO> searchCampList(CampSearchVO campsearchvo) {

		System.out.println("code check CampSearchController campsearchvo : " + campsearchvo.getCAMP_SELECT());
		return campsearchdao.searchCampList(campsearchvo);
	}
}
