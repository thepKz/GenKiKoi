import { Button, ConfigProvider, message } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { handleAPI } from "../apis/handleAPI";
import { auth } from "../firebase/firebaseConfig";
import { addAuth } from "../redux/reducers/authReducer";
import { replaceName } from "../utils";

interface Props {
  text: string;
}

const provider = new GoogleAuthProvider();

const SocialButton = (props: Props) => {
  const { text } = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const { displayName, email, photoURL, uid } = user;
        const data = {
          username: replaceName(displayName || ""),
          email,
          photoUrl: photoURL,
          googleId: uid,
        };

        const api = `/api/auth/login-google`;
        const res: any = await handleAPI(api, data, "POST");

        message.success(res.message);
        dispatch(addAuth(res.data));
      } else {
        message.error("Không thể đăng nhập bằng Google");
      }
    } catch (error: any) {
      console.error("Lỗi đăng nhập Google:", error);
      message.error(error.message || "Đã xảy ra lỗi khi đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          fontFamily: "Pro-Rounded",
        },
      }}
    >
      <Button
        loading={isLoading}
        size="large"
        icon={<FcGoogle size={30} />}
        onClick={handleLoginWithGoogle}
        className="w-full"
      >
        {text}
      </Button>
    </ConfigProvider>
  );
};

export default SocialButton;
