package com.camply.user.service;

import com.camply.user.dao.KakaoDAO;
import com.camply.user.vo.UserVO;
import com.nimbusds.jose.shaded.gson.JsonElement;
import com.nimbusds.jose.shaded.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Service
public class KakaoService {

    @Autowired
    private KakaoDAO kakaoDAO;
    public void registerUser(UserVO userVO) {
        kakaoDAO.registerUser(userVO);
    }
}
