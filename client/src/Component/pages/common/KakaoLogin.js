import React from 'react';
import KakaoLogin from 'react-kakao-login';
import kakaoimg from '../../img/Login/kakao_login_medium_narrow.png'

const KakaoButton = ({ onSuccess, onFailure }) => {
  const kakaoClientId = 'e4e518b34dec41360511f03ad7a9ac61';

  return (
    <KakaoLogin
      token={kakaoClientId}
      onSuccess={onSuccess}
      onFail={onFailure}
      render={(props) => (
        <img
          src={kakaoimg}
          alt="카카오 로그인"
          onClick={props.onClick}
          style={{ cursor: "pointer" }}
        />
      )}
    />
  );
};

export default KakaoButton;
