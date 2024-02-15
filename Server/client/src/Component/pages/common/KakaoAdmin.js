import KakaoLogin from "react-kakao-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SocialKakao = () => {
  const navigate = useNavigate();
  const kakaoClientId = "e4e518b34dec41360511f03ad7a9ac61";
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

      const sendData = { email, name, nickname, userType: "Admin" };
      console.log("sendData : ", sendData);

      const response = await axios.post(
        "http://camply.store/getKakaoUserData",
        sendData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      alert("카카오 회원가입 완료!");
      navigate("/login");
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
