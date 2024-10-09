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
  
      console.log("Google sign-in response:", res.user);
  
      if (res.user) {
        const data = {
          username: replaceName(res.user.displayName || ""),
          email: res.user.email,
          photoUrl: res.user.photoURL,
        };
        console.log("Data being sent to backend:", data);
        try {
          const res: any = await handleAPI(api, data, "POST");
          console.log("Backend response:", res);
          message.success(res.message);
          dispatch(addAuth(res.data));
        } catch (error: any) {
          console.error("Error from backend:", error);
          message.error(error.message);
        }
      }
    } catch (error: any) {
      console.error("Google sign-in error:", error);
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
