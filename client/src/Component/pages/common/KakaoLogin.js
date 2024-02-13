import React from 'react';
import KakaoLogin from 'react-kakao-login';

const KakaoButton = ({ onSuccess, onFailure }) => {
  const kakaoClientId = 'e4e518b34dec41360511f03ad7a9ac61';

  return (
    <KakaoLogin
      token={kakaoClientId}
      onSuccess={onSuccess}
      onFail={onFailure}
      render={(props) => (
        <button onClick={props.onClick}>
          카카오 로그인
        </button>
      )}
    />
  );
};

export default KakaoButton;
