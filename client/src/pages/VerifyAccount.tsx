import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Space, Typography } from "antd";
import { InputRef } from "antd/lib/input";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAuth, checkVerified, updateAuth } from "../redux/reducers/authReducer";
import { IAuth } from "../types";
import { handleAPI } from "../apis/handleAPI";

const { Title, Text } = Typography;

const VerifyAccount: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const inputRefs = useRef<(InputRef | null)[]>([]);

  // const sendOTP = async () => {
  //   try {
  //     setIsSendingOTP(true);
  //     // await axiosInstance.post("/api/mail/send-verification", { auth.email });
  //     message.success("Mã OTP đã được gửi đến email của bạn");
  //     setCountdown(60);
  //   } catch (error) {
  //     console.error("Lỗi khi gửi OTP:", error);
  //     message.error("Có lỗi xảy ra khi gửi mã OTP");
  //   } finally {
  //     setIsSendingOTP(false);
  //   }
  // };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit)) {
      form.submit();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const api = `/api/auth/verify-email`;
      const verifyCode = otp.join("");
      const res: any = await handleAPI(api, { verifyCode }, "POST");

      if (res.message === "Xác nhận tài khoản thành công") {
        message.success("Xác nhận tài khoản thành công");
        dispatch(checkVerified({}));
        navigate("/");
      }
    } catch (error: any) {
      console.log(error.message);
      form.setFields([
        {
          name: "OTP",
          errors: error ? [error.message] : [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-green-dark pt-20">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <div className="mb-5 text-center">
          <div className="mb-4 inline-block rounded-full bg-[#0C3C54] p-4">
            <MailOutlined className="text-5xl text-white" />
          </div>
          <Title
            level={2}
            className="text-[#0C3C54]"
          >
            Xác thực Email
          </Title>
          <p className="text-gray-600">Nhập mã OTP được gửi đến email của bạn.</p>
        </div>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="OTP"
            rules={[
              {
                validator: (_, value) =>
                  !value || !otp.every((digit) => digit)
                    ? Promise.reject("Vui lòng nhập mã OTP đủ 6 ký tự!")
                    : Promise.resolve(),
              },
            ]}
            validateDebounce={1000}
          >
            <div className="flex justify-between">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-12 w-12 rounded-lg border-2 border-[#1A5F7A] text-center text-xl font-bold text-black focus:border-[#2A7F9A] focus:ring-2 focus:ring-[#2A7F9A]"
                  maxLength={1}
                />
              ))}
            </div>
          </Form.Item>
          {otpError && <div className="mb-4 text-red-500">{otpError}</div>}
          <Form.Item>
            <Button
              size="large"
              type="primary"
              onClick={() => form.submit()}
              loading={isLoading}
              className="mt-5 w-full border-none bg-[#1A5F7A] text-lg font-semibold text-white"
            >
              <LockOutlined className="mr-2" />
              Xác thực
            </Button>
          </Form.Item>
        </Form>

        {/* <div className="text-center">
          <Space
            direction="vertical"
            size="small"
          >
            <Button
              type="link"
              // onClick={sendOTP}
              disabled={countdown > 0 || isSendingOTP}
              loading={isSendingOTP}
              className="text-[#1A5F7A] hover:text-[#2A7F9A]"
            >
              {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi OTP XÁC THỰC"}
            </Button>
            <Text className="text-gray-500">
              Không nhận được mã? Kiểm tra hộp thư rác hoặc thử lại sau.
            </Text>
          </Space>
        </div> */}
      </div>
    </div>
  );
};

export default VerifyAccount;
