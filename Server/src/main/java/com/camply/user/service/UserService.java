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
	private UserDao userdao;

	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public void registerUser(UserVO userVO) {
		userVO.setUSER_PASSWORD(passwordEncoder.encode(userVO.getUSER_PASSWORD()));
		userdao.emailRegister(userVO);
	}

	public void registerAdmin(UserVO userVO) {
		userVO.setUSER_PASSWORD(passwordEncoder.encode(userVO.getUSER_PASSWORD()));
		userdao.managerRegister(userVO);
	}

	public UserVO getMemberByUsername(String USER_EMAIL) {
		return userdao.selectEmail(USER_EMAIL);
	}

	public void kakaoRegister(String email, String name, String nickname) {
		try {
			UserVO user = new UserVO();
			user.setUSER_EMAIL(email);
			user.setUSER_NAME(name);
			user.setUSER_NICKNAME(nickname);
			userdao.emailRegister(user);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Error during user registration with Kakao", e);
		}
	}

	public UserVO getUserVOByUsername(String USER_EMAIL) {
		return userdao.selectEmail(USER_EMAIL);
	}

	public Long getUserIdFromUserVO(UserVO userVO) {
		return userVO.getUSER_ID();
	}
}
