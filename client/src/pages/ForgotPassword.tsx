import { Button, ConfigProvider, Form, Input, message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { handleAPI } from "../apis/handleAPI";
import Logo from "../assets/logo-transparent.png";
import { handleEnterPress } from "../utils";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: { email: string }) => {
    try {
      setIsLoading(true);
      const res: any = await handleAPI("/api/users/forgot-password", values, "POST");
      message.success(res.message);
      form.resetFields();
    } catch (error: any) {
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
        <div className="mx-auto mt-24 w-96">
          <div className="text-center">
            <h1 className="heading-2 text-blue-primary">Quên mật khẩu</h1>
            <p className="my-2 text-slate-500">Nhập email của bạn để nhận link đặt lại mật khẩu</p>
          </div>
          <Form
            form={form}
            disabled={isLoading}
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            className="mt-4"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                placeholder="Email"
                onPressEnter={() => handleEnterPress(form, "email", null)}
              />
            </Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Gửi link đặt lại mật khẩu
            </Button>
          </Form>
          <div className="mt-4 text-center">
            <Link to="/sign-in">
              <Button
                type="link"
                className="text-base"
              >
                Quay lại đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ForgotPassword;
