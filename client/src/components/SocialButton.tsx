import { Button, ConfigProvider, message } from "antd";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase/firebaseConfig";
import { replaceName } from "../utils";
import { handleAPI } from "../apis/handleAPI";
import { useDispatch } from "react-redux";
import { addAuth } from "../redux/reducers/authReducer";
import { useState } from "react";

interface Props {
  text: string;
}

const SocialButton = (props: Props) => {
  const { text } = props;

  const [isLoading, setIsLoading] = useState(false);

  const provider = new GoogleAuthProvider();

  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    try {
      setIsLoading(true);

      const res = await signInWithPopup(auth, provider);
      const api = `api/auth/login-google`;

      if (res.user) {
        const data = {
          username: replaceName(res.user.displayName || ""),
          email: res.user.email,
        };
        try {
          const res: any = await handleAPI(api, data, "POST");
          message.success(res.message);
          dispatch(addAuth(res.data));
        } catch (error: any) {
          console.log(error);
          message.error(error.message);
        }
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
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
