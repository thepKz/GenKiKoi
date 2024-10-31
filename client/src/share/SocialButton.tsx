import { Button, message } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { handleAPI } from "../apis/handleAPI";
import { auth } from "../firebase/firebaseConfig";
import { addAuth } from "../redux/reducers/authReducer";
import { replaceName } from "../utils";

interface Props {
  text: string;
  loading?: boolean;
  onLoginStart?: () => void;
  onLoginEnd?: () => void;
}

const provider = new GoogleAuthProvider();

const SocialButton = (props: Props) => {
  const { text, loading, onLoginStart, onLoginEnd } = props;
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    try {
      onLoginStart?.();
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
      }
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user' || 
          error.code === 'auth/cancelled-popup-request') {
        return;
      }
      console.error("Lỗi đăng nhập Google:", error);
      message.error('Đã xảy ra lỗi khi đăng nhập với Google');
    } finally {
      onLoginEnd?.();
    }
  };

  return (
    <Button
      loading={loading}
      size="large"
      icon={<FcGoogle size={30} />}
      onClick={handleLoginWithGoogle}
      className="w-full"
    >
      {text}
    </Button>
  );
};

export default SocialButton;
