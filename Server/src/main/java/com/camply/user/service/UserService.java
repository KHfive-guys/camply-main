package com.camply.user.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.camply.user.dao.UserDao;
import com.camply.user.vo.UserVO;
import org.springframework.ui.Model;

import java.io.IOException;


@Service
public class UserService {

	@Autowired
	private UserDao Userdao;

	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	
	// 구매자 이메일 회원가입에 필요한 데이터 저장
	public void registerUser(UserVO userVO) {
		userVO.setUSER_PASSWORD(passwordEncoder.encode(userVO.getUSER_PASSWORD()));
		Userdao.emailRegister(userVO);
	}

	public void registerAdmin(UserVO userVO) {
		userVO.setUSER_PASSWORD(passwordEncoder.encode(userVO.getUSER_PASSWORD()));
		Userdao.managerRegister(userVO);
	}

    public UserVO getMemberByUsername(String USER_EMAIL) {

        return Userdao.selectEmail(USER_EMAIL);
    }

	public void naverLogin(String email) {
		// 네이버로 로그인한 사용자 정보를 DB에 저장
		UserVO user = new UserVO();
		user.setUSER_EMAIL(email);

		// 저장
		Userdao.emailRegister(user);
	}

	public void kakaoLogin(String email) {
		// 카카오로 로그인한 사용자 정보를 DB에 저장
		UserVO user = new UserVO();
		user.setUSER_EMAIL(email);

		// 저장
		Userdao.emailRegister(user);
	}

}
