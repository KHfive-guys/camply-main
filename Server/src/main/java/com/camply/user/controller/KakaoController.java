package com.camply.user.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.camply.user.service.UserService;
import com.camply.user.vo.UserVO;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/login/oauth2/code/kakao")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*", methods = { RequestMethod.POST })
public class KakaoController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> registerWithKakao(@RequestBody UserVO userVO) {
        try {
            System.out.println("Kakao registration request received.");
            userService.kakaoRegister(userVO.getUSER_EMAIL(), userVO.getUSER_NAME(), userVO.getUSER_NICKNAME());
            return ResponseEntity.ok("User registration with Kakao successful");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("User registration with Kakao failed: " + e.getMessage());
        }
    }
}




