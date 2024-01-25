package com.camply.user.dao;

import org.apache.ibatis.annotations.Mapper;
import com.camply.user.vo.UserVO;
import org.springframework.data.repository.query.Param;

@Mapper
public interface UserDao {

	void emailRegister(@Param("uservo") UserVO uservo);
	
	void managerEmailRegister(UserVO Uservo);
	
	void emailLogin(UserVO Uservo);

	UserVO selectEmail(String USER_EMAIL);
	
}

