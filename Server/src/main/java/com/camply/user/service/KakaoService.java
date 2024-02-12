package com.camply.user.service;

import com.camply.user.dao.KakaoDao;
import com.camply.user.vo.KakaoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

@Service
public class KakaoService {

    @Autowired
    private KakaoDao kakaoDao;

    public void processKakaoUser(KakaoVO kakaoVO) {

    }

}
