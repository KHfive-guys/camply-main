package com.camply.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.camply.user.dao.UserDao;
import com.camply.user.vo.UserVO;


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

}
