package com.camply.user.dao;

import com.camply.user.vo.UserLoginVO;
import org.apache.ibatis.annotations.Mapper;
import com.camply.user.vo.UserVO;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.repository.query.Param;

@Mapper
public interface UserDao {

	void emailRegister(@Param("uservo") UserVO uservo);
	
	void managerRegister(UserVO Uservo);
	
	UserVO selectEmail(String USER_EMAIL);

	UserLoginVO findByEmailAndPassword(@Param("user_email") String user_email, @Param("user_password") String user_password);

	UserLoginVO findByEmail(@Param("user_email") String user_email);

}

