import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import kakaoRegister from '../../img/Register/kakao_login_medium_narrow.png';


const SocialKakao = () => {
  const navigate = useNavigate();
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

      const sendData = { email, name, nickname, userType: 'Admin' };
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

      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return (
    <>
    <div>
    <KakaoLogin
      token={kakaoClientId}
      onSuccess={kakaoOnSuccess}
      onFail={kakaoOnFailure}
    >
      <img src={kakaoRegister} alt="Kakao Register" />
    </KakaoLogin>
      </div>
    </>
  );
};

export default SocialKakao;
