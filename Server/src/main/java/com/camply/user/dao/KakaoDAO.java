package com.camply.user.dao;

import com.camply.user.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KakaoDAO {
    void registerUser(UserVO userVO);
}
