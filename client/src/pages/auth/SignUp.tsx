import { Button, ConfigProvider, Divider, Form, Input, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";
import Banner from "../../assets/banner.jpg";
import Logo from "../../assets/logo-transparent.png";
import { SignUpData } from "../../models/AuthModels";
import { addAuth } from "../../redux/reducers/authReducer";
import { SocialButton } from "../../share";
import { handleEnterPress } from "../../utils";

const SignUp = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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
      form.setFields([
        { name: "username", errors: error.username ? [error.username] : [] },
        { name: "email", errors: error.email ? [error.email] : [] },
        { name: "password", errors: error.password ? [error.password] : [] },
        { name: "confirmPassword", errors: error.confirmPassword ? [error.confirmPassword] : [] },
      ]);
      message.error("Có lỗi xảy ra, vui lòng kiểm tra các trường!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckExistence = async (field: string, value: string) => {
    const api = `/api/auth/check-${field}`;
    try {
      const res: any = await handleAPI(api, { [field]: value }, "POST");
      return res.exists;
    } catch (error) {
      console.log(error);
      return false;
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
                  Đăng ký
                </h1>
                <p className="text-lg text-slate-600">Chọn sức khỏe, chọn GenKiKoi</p>
              </div>

              <Form
                disabled={isLoading}
                size="large"
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-4"
              >
                <Form.Item
                  name="username"
                  label={<span className="text-base font-medium">Tên tài khoản</span>}
                  required={false}
                  hasFeedback
                  tooltip="Tên tài khoản phải bao gồm chữ cái, số và có thể có dấu _!"
                  rules={[
                    {
                      validator: async (_, value) => {
                        if (!value) {
                          return Promise.reject(new Error("Vui lòng nhập tên tài khoản!"));
                        }
                        if (value.trim().length < 8 || value.trim().length > 30) {
                          return Promise.reject(
                            new Error("Tên tài khoản phải có độ dài từ 8 đến 30 ký tự!"),
                          );
                        }
                        if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9_-]+$/.test(value)) {
                          return Promise.reject(
                            new Error(
                              "Tên tài khoản phải bao gồm chữ cái, số và có thể có dấu _!",
                            ),
                          );
                        }

                        const exists = await handleCheckExistence("username", value);
                        if (exists) {
                          return Promise.reject(new Error("Tên tài khoản đã tồn tại!"));
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}
                  validateDebounce={1000}
                >
                  <Input
                    className="rounded-lg shadow-sm transition-all hover:border-blue-400 focus:border-blue-500 focus:shadow-md"
                    placeholder="Nhập tên tài khoản"
                    onPressEnter={() => handleEnterPress(form, "username", "email")}
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={<span className="text-base font-medium">Email</span>}
                  hasFeedback
                  required={false}
                  rules={[
                    {
                      pattern: /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/,
                      message: "Email không hợp lệ!",
                    },
                    {
                      validator: async (_, value) => {
                        if (!value) {
                          return Promise.reject(new Error("Vui lòng nhập email!"));
                        }
                        const exists = await handleCheckExistence("email", value);
                        if (exists) {
                          return Promise.reject(new Error("Email đã tồn tại!"));
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}
                  validateDebounce={1000}
                >
                  <Input
                    className="rounded-lg shadow-sm transition-all hover:border-blue-400 focus:border-blue-500 focus:shadow-md"
                    placeholder="Nhập địa chỉ email"
                    onPressEnter={() => handleEnterPress(form, "email", "password")}
                    onChange={(e) => handleCheckExistence("email", e.target.value)}
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={<span className="text-base font-medium">Mật khẩu</span>}
                  required={false}
                  hasFeedback
                  tooltip="Mật khẩu phải chứa chữ thường, in hoa, số, ký tự đặc biệt và trên 6 ký tự!"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{6,30}$/,
                      message:
                        "Mật khẩu phải chứa chữ thường, in hoa, số, ký tự đặc biệt và trên 6 ký tự!",
                    },
                  ]}
                  validateDebounce={1000}
                >
                  <Input.Password
                    className="rounded-lg shadow-sm transition-all hover:border-blue-400 focus:border-blue-500 focus:shadow-md"
                    onPressEnter={() => handleEnterPress(form, "password", "confirmPassword")}
                    placeholder="Nhập mật khẩu"
                    onChange={() => {
                      if (form.getFieldValue(["confirmPassword"])) {
                        form.validateFields(["confirmPassword"]);
                      }
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label={<span className="text-base font-medium">Xác nhận mật khẩu</span>}
                  hasFeedback
                  required={false}
                  tooltip="Mật khẩu xác nhận phải khớp nhau!"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng xác nhận lại mật khẩu!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                      },
                    }),
                  ]}
                  validateDebounce={1000}
                >
                  <Input.Password
                    className="rounded-lg shadow-sm transition-all hover:border-blue-400 focus:border-blue-500 focus:shadow-md"
                    onPressEnter={() => handleEnterPress(form, "confirmPassword", null)}
                    placeholder="Xác nhận mật khẩu"
                  />
                </Form.Item>

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
                    Đăng ký
                  </Button>
                </ConfigProvider>

                <Divider className="my-6">
                  <span className="text-sm font-medium text-slate-500">Hoặc</span>
                </Divider>

                <SocialButton
                  text="Đăng nhập với Google"
                  loading={isGoogleLoading}
                  onLoginStart={() => setIsGoogleLoading(true)}
                  onLoginEnd={() => setIsGoogleLoading(false)}
                />

                <div className="mt-6 text-center">
                  <p className="text-base text-slate-600">
                    Bạn đã có tài khoản?{" "}
                    <Link to="/sign-in" className="font-semibold text-blue-500 transition-colors hover:text-blue-600">
                      Đăng nhập ngay
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

export default SignUp;
