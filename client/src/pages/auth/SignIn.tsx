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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex min-h-[90vh] flex-col-reverse items-center lg:flex-row lg:gap-8">
          {/* Left side - Form */}
          <div className="w-full lg:w-2/5">
            <div className="mb-8 lg:mb-16">
              <Link to="/" className="inline-block">
                <div className="flex items-center gap-3">
                  <img src={Logo} alt="GenKiKoi Logo" className="h-12 w-12 object-contain" />
                  <h3 className="text-2xl font-bold text-blue-primary">GenKiKoi</h3>
                </div>
              </Link>
            </div>
            
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8">
                <h1 className="heading-2 mb-3 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                  Đăng nhập
                </h1>
                <p className="text-lg text-slate-600">Chọn sức khỏe, chọn GenKiKoi</p>
              </div>

              <Form
                disabled={isLoading}
                onFinish={handleSubmit}
                size="large"
                form={form}
                layout="vertical"
                className="space-y-4"
              >
                <Form.Item
                  name="login"
                  label={<span className="text-base font-medium">Email / Tên tài khoản</span>}
                  required={false}
                  rules={[
                    { required: true, message: "Vui lòng nhập email hoặc tên tài khoản!" },
                    {
                      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9_]{8,30}$/,
                      message: "Email hoặc tên tài khoản không hợp lệ!",
                    },
                  ]}
                  validateDebounce={1000}
                >
                  <Input
                    className="rounded-lg shadow-sm transition-all hover:border-blue-400 focus:border-blue-500 focus:shadow-md"
                    placeholder="Nhập email hoặc tên tài khoản"
                    onPressEnter={() => handleEnterPress(form, "login", "password")}
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={<span className="text-base font-medium">Mật khẩu</span>}
                  required={false}
                  tooltip="Mật khẩu chỉ chứa chữ thường, in hoa, số và trên 8 ký tự!"
                  rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                  validateDebounce={1000}
                >
                  <Input.Password
                    className="rounded-lg shadow-sm transition-all hover:border-blue-400 focus:border-blue-500 focus:shadow-md"
                    onPressEnter={() => handleEnterPress(form, "password", null)}
                    placeholder="Nhập mật khẩu"
                  />
                </Form.Item>

                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-blue-500 transition-colors hover:text-blue-600"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                <ConfigProvider
                  theme={{
                    inherit: false,
                    token: {
                      fontFamily: "Pro-Rounded",
                      colorPrimary: "#2563eb",
                      borderRadius: 8,
                    },
                  }}
                >
                  <Button
                    loading={isLoading}
                    size="large"
                    type="primary"
                    className="mt-6 w-full shadow-md transition-all hover:shadow-lg"
                    onClick={() => form.submit()}
                  >
                    Đăng nhập
                  </Button>
                </ConfigProvider>

                <Divider className="my-6">
                  <span className="text-sm font-medium text-slate-500">Hoặc</span>
                </Divider>

                <SocialButton text="Đăng nhập với Google" />

                <div className="mt-6 text-center">
                  <p className="text-base text-slate-600">
                    Bạn chưa có tài khoản?{" "}
                    <Link to="/sign-up" className="font-semibold text-blue-500 transition-colors hover:text-blue-600">
                      Đăng ký ngay
                    </Link>
                  </p>
                </div>
              </Form>
            </div>
          </div>

          {/* Right side - Banner */}
          <div className="mb-8 hidden w-full lg:mb-0 lg:block lg:w-3/5">
            <div className="relative h-full overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={Banner}
                alt="GenKiKoi Banner"
                className="h-full w-full object-cover object-[25%] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
