package com.camply.user.controller;

import com.camply.user.service.UserService;
import com.camply.user.vo.KakaoVO;
import com.camply.user.vo.UserVO;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class KakaoController {

    // 멤버(필드)변수
    @Autowired
    private UserService userService;

    // 카카오 로그인 정보 DB & 세션에 저장
    @PostMapping("/kakao/register")
    public ResponseEntity<String> handleKakaoLogin(@RequestBody KakaoVO kakaoVO, HttpSession session) {

        String email = kakaoVO.getAccount_email();
        String nickname = kakaoVO.getProfile_nickname();
        String name = kakaoVO.getName();

        UserVO user = new UserVO();
        user.setUSER_EMAIL(email);
        user.setUSER_NICKNAME(nickname);
        user.setUSER_NAME(name);


        userService.registerKakao(user);

        session.setAttribute("user", email);

        return ResponseEntity.ok("카카오 회원가입 성공");
    }
}




