import { Button, ConfigProvider } from "antd";
import { FcGoogle } from "react-icons/fc";

interface Props {
  text: string;
}

const SocialButton = (props: Props) => {
  const { text } = props;
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
        size="large"
        icon={<FcGoogle size={30} />}
        className="w-full"
      >
        {text}
      </Button>
    </ConfigProvider>
  );
};

export default SocialButton;
