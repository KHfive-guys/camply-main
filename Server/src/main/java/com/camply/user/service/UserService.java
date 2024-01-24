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
	public void registerUser(UserVO uservo) {
		
		UserVO userVO = new UserVO();
		
		userVO.setUSER_EMAIL(uservo.getUSER_EMAIL());
		userVO.setUSER_PASSWORD(passwordEncoder.encode(uservo.getUSER_PASSWORD()));
		userVO.setUSER_TYPE(uservo.getUSER_TYPE());
		userVO.setUSER_NAME(uservo.getUSER_NAME());
		if (uservo.getUSER_TYPE().equals("General")) {
			userVO.setUSER_NICKNAME(uservo.getUSER_NICKNAME());
			
			Userdao.emailRegister(userVO);
			
		} else if (uservo.getUSER_TYPE().equals("Admin")) {
			userVO.setUSER_BUSINESSNAME(uservo.getUSER_BUSINESSNAME());
			userVO.setUSER_BUSINESSNUMBER(uservo.getUSER_BUSINESSNUMBER());
			userVO.setUSER_ADDRESS(uservo.getUSER_ADDRESS());
			userVO.setUSER_BUSINESSPHONE(uservo.getUSER_BUSINESSPHONE());
			
			Userdao.managerEmailRegister(userVO);
		}
		

	}
	

    public UserVO getMemberByUsername(String USER_EMAIL) {
    	
        return Userdao.selectEmail(USER_EMAIL);
    }

	
}
