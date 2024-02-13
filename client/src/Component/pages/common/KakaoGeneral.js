// 클라이언트 (SocialKakao 컴포넌트)

import KakaoLogin from 'react-kakao-login';
import axios from 'axios';

const SocialKakao = () => {
  const kakaoClientId = 'e4e518b34dec41360511f03ad7a9ac61';
  const kakaoOnSuccess = async (data) => {
    console.log(data);

    try {
      const accessToken = data.response.access_token;

      const {
        kakao_account: {
          email,
          profile: { nickname },
          name,
        },
      } = data.profile;

      const sendData = { email, name, nickname, userType: 'General' };
      console.log('sendData : ', sendData);

      const response = await axios.post(
        'http://localhost:8080/getKakaoUserData',
        sendData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />
    </>
  );
};

export default SocialKakao;
