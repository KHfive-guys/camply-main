package com.camply.user.dao;

import com.camply.user.vo.KakaoVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KakaoDao {
    void insertKakaoUser(KakaoVO user);
}
