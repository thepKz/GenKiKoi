import { Button, ConfigProvider, Divider, Form, Input, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";
import Banner from "../../assets/banner.jpg";
import Logo from "../../assets/logo-transparent.png";
import { addAuth } from "../../redux/reducers/authReducer";
import { SocialButton } from "../../share";
import { handleEnterPress } from "../../utils";

const SignIn = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

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
      console.log(error);
      form.setFields([
        { name: "login", errors: error.login ? [error.login] : [] },
        { name: "password", errors: error.password ? [error.password] : [] },
      ]);
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
              <h1 className="heading-2 text-blue-primary">Đăng nhập</h1>
              <div className="flex items-center gap-2">
                <p className="my-2 text-slate-500">Chọn sức khỏe, chọn GenKiKoi</p>
              </div>
            </div>
            <Form
              disabled={isLoading}
              onFinish={handleSubmit}
              size="large"
              form={form}
              layout="vertical"
            >
              <Form.Item
                name="login"
                label="Email / Tên tài khoản"
                required={false}
                rules={[
                  { required: true, message: "Vui lòng nhập email hoặc tên tài khoản!" },
                  {
                    pattern:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9_]{8,30}$/,
                    message: "Email hoặc tên tài khoản không hợp lệ!",
                  },
                ]}
                validateDebounce={1000}
              >
                <Input
                  placeholder="Email"
                  onPressEnter={() => handleEnterPress(form, "login", "password")}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                required={false}
                tooltip="Mật khẩu chỉ chứa chữ thường, in hoa, số và trên 8 ký tự!"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                validateDebounce={1000}
              >
                <Input.Password
                  onPressEnter={() => handleEnterPress(form, "password", null)}
                  placeholder="Mật khẩu"
                />
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
                  Đăng nhập
                </Button>
              </ConfigProvider>
              <Divider
                style={{
                  margin: "12px 0",
                }}
              >
                <p className="text-sm font-bold text-slate-500">Hoặc</p>
              </Divider>
              <SocialButton text="Đăng nhập với Google" />
            </div>
            <div className="my-3 flex items-center justify-center gap-1">
              <p className="text-base text-slate-500">Bạn chưa có tài khoản?</p>
              <Link
                to="/sign-up"
                className="text-base font-bold text-blue-500 underline"
              >
                Đăng ký
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
