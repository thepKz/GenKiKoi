import { Button, ConfigProvider, Form, Input, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleAPI } from "../apis/handleAPI";
import Logo from "../assets/logo-transparent.png";
import { removeAuth } from "../redux/reducers/authReducer";
import { handleEnterPress } from "../utils";

const ChangePassword = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (values: any) => {
    const api = `/api/users/change-password`;

    try {
      setIsLoading(true);
      const res: any = await handleAPI(api, values, "PATCH");
      if (res.message) {
        message.success(res.message);
        dispatch(removeAuth({}));
      }
    } catch (error: any) {
      console.log(error);
      form.setFields([{ name: "password", errors: error.password ? [error.password] : [] }]);
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
            <h1 className="heading-2 text-blue-primary">Đổi mật khẩu</h1>
            <p className="my-2 text-slate-500">Chọn sức khỏe, chọn GenKiKoi</p>
          </div>
          <Form
            disabled={isLoading}
            onFinish={handleSubmit}
            size="large"
            form={form}
            layout="vertical"
            className="mt-4"
          >
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              validateDebounce={1000}
            >
              <Input.Password
                onPressEnter={() => handleEnterPress(form, "password", "newPassword")}
                placeholder="Mật khẩu"
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
                onPressEnter={() => handleEnterPress(form, "newPassword", "confirmPassword")}
                placeholder="Mật khẩu mới"
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
                onPressEnter={() => handleEnterPress(form, "confirmPassword", null)}
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>
          </Form>
          <div className="">
            <Button
              loading={isLoading}
              size="large"
              type="primary"
              className="mt-3 w-full"
              onClick={() => form.submit()}
            >
              Xác nhận đổi mật khẩu
            </Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ChangePassword;
