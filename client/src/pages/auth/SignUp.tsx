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
  // Handle check exists
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
    <div className="container m-5 mx-auto px-10 text-black">
      <div className="flex h-[94vh]">
        <div className="w-2/5">
          <div className="mb-5">
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
              <h1 className="heading-2 text-blue-primary">Đăng ký</h1>
              <div className="flex items-center gap-2">
                <p className="my-2 text-slate-500">Chọn sức khỏe, chọn GenKiKoi</p>
              </div>
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
                label="Tên tài khoản"
                required={false}
                hasFeedback
                tooltip="Tên tài khoản phải bao gồm chữ thường, in hoa, số và có thể có dấu _!"
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
                      if (!/^(?=.*[a-z])(?=.*\d)[a-zA-Z0-9_]+$/.test(value)) {
                        return Promise.reject(
                          new Error(
                            "Tên tài khoản phải bao gồm chữ thường, số và có thể có dấu _!",
                          ),
                        );
                      }

                      const exists = await handleCheckExistence("username", value);
                      if (exists) {
                        return Promise.reject(new Error("Tên tài khoản đã tồn tại!")); // Thêm dòng này
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
                validateDebounce={1000}
              >
                <Input
                  placeholder="Tên tài khoản"
                  onPressEnter={() => handleEnterPress(form, "username", "email")}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
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
                  placeholder="Email"
                  onPressEnter={() => handleEnterPress(form, "email", "password")}
                  onChange={(e) => handleCheckExistence("email", e.target.value)}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
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
                  onPressEnter={() => handleEnterPress(form, "password", "confirmPassword")}
                  placeholder="Mật khẩu"
                  onChange={() => {
                    if (form.getFieldValue(["confirmPassword"])) {
                      form.validateFields(["confirmPassword"]);
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu"
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
                  onPressEnter={() => handleEnterPress(form, "confirmPassword", null)}
                  placeholder="Xác nhận mật khẩu"
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
                  Đăng ký
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
              <p className="text-base text-slate-500">Bạn đã có tài khoản?</p>
              <Link
                to="/sign-in"
                className="text-base font-bold text-blue-500 underline"
              >
                Đăng nhập
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
