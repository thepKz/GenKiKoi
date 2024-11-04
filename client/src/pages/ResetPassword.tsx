import { Button, ConfigProvider, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleAPI } from "../apis/handleAPI";
import Logo from "../assets/logo-transparent.png";
import { handleEnterPress } from "../utils";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const res: any = await handleAPI("/api/users/reset-password", values, "POST");
      if (res.message) {
        message.success(res.message);
        form.resetFields();
        navigate("/sign-in");
      }
    } catch (error: any) {
      console.log(error);
      form.setFields([{ name: "token", errors: error.token ? [error.token] : [] }]);
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
      <div className="container m-5 mx-auto px-10 text-black">
        <div className="">
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
          <div className="mx-auto w-2/5">
            <div className="mx-auto w-3/5">
              <div className="mb-3 text-center">
                <h1 className="heading-2 text-blue-primary">Đặt lại mật khẩu</h1>
                <p className="my-2 text-slate-500">Nhập mã xác nhận và mật khẩu mới của bạn</p>
              </div>
              <Form
                disabled={isLoading}
                onFinish={handleSubmit}
                size="large"
                form={form}
                layout="vertical"
              >
                <Form.Item
                  name="token"
                  label="Mã xác nhận"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã xác nhận!" },
                    {
                      pattern: /^[0-9]{6}$/,
                      message: "Mã xác nhận phải là 6 chữ số!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập mã xác nhận từ email"
                    onPressEnter={() => handleEnterPress(form, "token", "newPassword")}
                    maxLength={6}
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label="Mật khẩu mới"
                  hasFeedback
                  tooltip="Mật khẩu chỉ chứa chữ thường, in hoa, số và trên 8 ký tự!"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu mới!",
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
                    placeholder="Mật khẩu mới"
                    onPressEnter={() => handleEnterPress(form, "newPassword", "confirmPassword")}
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
                  tooltip="Mật khẩu xác nhận phải khớp nhau!"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng xác nhận lại mật khẩu!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                      },
                    }),
                  ]}
                  validateDebounce={1000}
                >
                  <Input.Password
                    placeholder="Xác nhận mật khẩu"
                    onPressEnter={() => handleEnterPress(form, "confirmPassword", null)}
                  />
                </Form.Item>

                <Button
                  loading={isLoading}
                  size="large"
                  type="primary"
                  className="mt-3 w-full"
                  onClick={() => form.submit()}
                >
                  Đặt lại mật khẩu
                </Button>
              </Form>
              <div className="my-3 flex items-center justify-center gap-1">
                <Link
                  to="/sign-in"
                  className="text-base font-bold text-blue-500 underline"
                >
                  Quay lại đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ResetPassword;
