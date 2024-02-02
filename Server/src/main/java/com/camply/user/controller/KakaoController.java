package com.camply.user.controller;

import java.util.HashMap;
import java.util.Map;

import com.camply.user.service.KakaoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.camply.user.service.UserService;
import com.camply.user.vo.UserVO;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


@RestController
@RequestMapping("/login/oauth2/code/kakao")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*", methods = { RequestMethod.POST })
public class KakaoController {

    @Autowired
    private KakaoService kakaoService;

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody UserVO userVO) {
        kakaoService.registerUser(userVO);
        return ResponseEntity.ok("User registered successfully");
    }
}




