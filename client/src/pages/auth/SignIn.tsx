import { Button, Checkbox, ConfigProvider, Divider, Form, Input, message } from "antd";
import Logo from "../../assets/logo-transparent.png";
import Banner from "../../assets/banner.jpg";
import { SocialButton } from "../../components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleAPI } from "../../apis/handleAPI";
import { addAuth } from "../../redux/reducers/authReducer";

const SignIn = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (values: any) => {
    const api = `/api/auth/login`;

    try {
      setIsLoading(true);
      const res: any = await handleAPI(api, values, "POST");
      if (res.data) {
        message.success(res.message);
        dispatch(addAuth(res.data));
      }
    } catch (error: any) {
      setIsError(true);
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container m-5 mx-auto px-10 text-black">
      <div className="flex h-[94vh]">
        <div className="w-2/5">
          <div className="mb-16">
            <Link to={"/"}>
              <div className="flex w-20 items-center gap-2">
                <img
                  src={Logo}
                  alt=""
                />
                <h3 className="text-2xl font-bold text-blue-primary">GenKiKoi</h3>
              </div>
            </Link>
          </div>
          <div className="mx-auto w-3/5">
            <div className="">
              <h1 className="heading-2 text-blue-primary">Sign In</h1>
              <p className="my-2 text-slate-500">Please login to continue to your account.</p>
            </div>
            <Form
              disabled={isLoading}
              onFinish={handleSubmit}
              size="large"
              form={form}
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Email"
                required={false}
                validateStatus={isError ? "warning" : ""}
                help={isError ? "Need to be checked" : ""}
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email!",
                    warningOnly: true,
                  },
                ]}
              >
                <Input
                  placeholder="Please input your email!"
                  allowClear
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                validateStatus={isError ? "warning" : ""}
                help={isError ? "Need to be checked" : ""}
                required={false}
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password placeholder="Please input your password!" />
              </Form.Item>
            </Form>
            <div className="">
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
                  type="primary"
                  className="mt-3 w-full"
                  onClick={() => form.submit()}
                >
                  Sign In
                </Button>
              </ConfigProvider>
              <Divider
                style={{
                  margin: "12px 0",
                }}
              >
                <p className="text-sm font-bold text-slate-500">Or</p>
              </Divider>
              <SocialButton text="Sign In with Google" />
            </div>
            <div className="my-3 flex items-center justify-center gap-1">
              <p className="text-base text-slate-500">Need an account?</p>
              <Link
                to="/sign-up"
                className="text-base font-bold text-blue-500 underline"
              >
                Create one
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img
            src={Banner}
            alt=""
            className="h-full rounded-lg object-cover object-[25%]"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
