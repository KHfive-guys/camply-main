package com.camply.user.controller;

import com.camply.user.service.UserService;
import com.camply.user.vo.KakaoVO;
import com.camply.user.vo.UserVO;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
public class KakaoController {

    @Autowired
    private UserService userService;

    @PostMapping("/getKakaoUserData")
    public ResponseEntity<String> getKakaoUserData(@RequestBody Map<String, Object> data) {
        String email = (String) data.get("email");
        String name = (String) data.get("name");
        String nickname = (String) data.get("nickname");

        UserVO userVO = new UserVO();
        userVO.setUSER_EMAIL(email);
        userVO.setUSER_NAME(name);
        userVO.setUSER_NICKNAME(nickname);
        userVO.setUSER_PASSWORD("qweqwe");
        userVO.setUSER_TYPE("General");

        userService.registerUser(userVO);

        System.out.println("Email: " + email);
        System.out.println("Name: " + name);
        System.out.println("Nickname: " + nickname);

        return ResponseEntity.ok("Kakao user registration Success");
    }
}


