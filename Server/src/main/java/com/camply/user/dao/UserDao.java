package com.camply.user.dao;

import org.apache.ibatis.annotations.Mapper;
import com.camply.user.vo.UserVO;

@Mapper
public interface UserDao {

	void emailRegister(UserVO UservO);
	
	void managerEmailRegister(UserVO UservO);
	
	void emailLogin(UserVO UservO);

	UserVO selectEmail(String USER_EMAIL);
	
}

