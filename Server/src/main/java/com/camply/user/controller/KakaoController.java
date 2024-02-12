package com.camply.user.controller;

import com.camply.user.service.KakaoService;
import com.camply.user.vo.KakaoVO;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins= "http://localhost:3000", allowCredentials = "true")
public class KakaoController {
    @Autowired
    private KakaoService kakaoService;

    @GetMapping("/kakao/register")
    public void kakaoRegister(HttpServletResponse response, @AuthenticationPrincipal OAuth2User oauth2User) throws IOException {
        if (oauth2User != null) {
            String account_email = oauth2User.getAttribute("account_email");
            String profileNickname = oauth2User.getAttribute("profile_nickname");
            String name = oauth2User.getAttribute("name");

            KakaoVO kakaoVO = new KakaoVO();
            kakaoVO.setAccountEmail(account_email);
            kakaoVO.setProfileNickname(profileNickname);
            kakaoVO.setName(name);

            kakaoService.processKakaoUser(kakaoVO);

            System.out.println(account_email);
            System.out.println(profileNickname);
            System.out.println(name);

            response.sendRedirect("/login");


        }
    }
}



