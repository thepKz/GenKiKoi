import { Button, ConfigProvider, Divider, Form, Input, message } from "antd";
import Logo from "../../assets/logo-transparent.png";
import Banner from "../../assets/banner.jpg";
import { SocialButton } from "../../components";
import { Link } from "react-router-dom";
import { SignUpData } from "../../models/AuthModels";
import { useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";

const SignUp = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (values: SignUpData) => {
    const api = `/api/auth/register`;

    try {
      setIsLoading(true);
      const res: any = await handleAPI(api, values, "POST");
      if (res.data) {
        message.success(res.message);
        dispatch(addAuth(res.data));
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container m-5 mx-auto px-10 text-black">
      <div className="flex h-[94vh]">
        <div className="w-2/5">
          <div className="mb-5">
            <div className="flex w-20 items-center gap-2">
              <img
                src={Logo}
                alt=""
              />
              <h3 className="text-2xl font-bold text-blue-primary">GenKiKoi</h3>
            </div>
          </div>
          <div className="mx-auto w-3/5">
            <div className="">
              <h1 className="heading-2 text-blue-primary">Sign Up</h1>
              <p className="my-2 text-slate-500">Sign up to enjoy the feature of Revolute</p>
            </div>
            <Form
              disabled={isLoading}
              size="large"
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item
                name="username"
                label="Name"
                required={false}
                hasFeedback
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  placeholder="Please input your name!"
                  allowClear
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                hasFeedback
                required={false}
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input
                  placeholder="Please input your email!"
                  allowClear
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                required={false}
                hasFeedback
                tooltip="Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: "Password not strong enough!",
                    warningOnly: true,
                  },
                ]}
              >
                <Input.Password placeholder="Please input your password!" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                hasFeedback
                required={false}
                tooltip="Password and Confirm Password must match each other!"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The new password that you entered do not match!"),
                      );
                    },
                    warningOnly: true,
                  }),
                ]}
              >
                <Input.Password placeholder="Please input your confirm password!" />
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
                  Sign Up
                </Button>
              </ConfigProvider>
              <Divider
                style={{
                  margin: "12px 0",
                }}
              >
                <p className="text-sm font-bold text-slate-500">Or</p>
              </Divider>
              <SocialButton text="Continue with Google" />
            </div>
            <div className="my-3 flex items-center justify-center gap-1">
              <p className="text-base text-slate-500">Already have an account?</p>
              <Link
                to="/sign-in"
                className="text-base font-bold text-blue-500 underline"
              >
                Sign In
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

export default SignUp;
