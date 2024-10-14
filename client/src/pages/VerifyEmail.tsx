/* eslint-disable @typescript-eslint/no-unused-vars */
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import { updateAuth } from '../redux/reducers/authReducer';

const { Title, Text } = Typography;

const VerifyEmail: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const dispatch = useDispatch();

  // Add this useEffect to check if email is available
  useEffect(() => {
    console.log("Email from location state:", email);
    if (!email) {
      console.warn("Email is not available in location state");
      // Optionally redirect to a different page or show an error message
    }
  }, [email]);

  const sendOTP = async () => {
    console.log("sendOTP function called"); // Add this line
    if (!email) {
      console.error("Email is invalid or not provided"); // Change to console.error
      message.error('Email không hợp lệ');
      return;
    }
    try {
      setIsSendingOTP(true);
      console.log("Sending OTP request for email:", email); // Add this line
      await axiosInstance.post('/api/mail/send-verification-email', { email });
      console.log("OTP sent successfully"); // Add this line
      message.success('Mã OTP đã được gửi đến email của bạn');
      setCountdown(60);
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error); // Add this line
      message.error('Có lỗi xảy ra khi gửi mã OTP');
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleSubmit = async (values: { otp: string }) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post('/api/mail/verify-otp', { email, otp: values.otp });
      if (res.data.message === 'Email verified successfully') {
        message.success('Email xác thực thành công!');
        // Fetch updated user data
        const userRes = await axiosInstance.get('/api/users/profile');
        dispatch(updateAuth({
          ...userRes.data,
          isVerified: true // Explicitly set isVerified to true
        }));
        navigate('/');
      }
    } catch (error) {
      message.error('Mã OTP không hợp lệ hoặc đã hết hạn.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0C3C54] to-[#1A5F7A]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="inline-block p-4 bg-[#0C3C54] rounded-full mb-4">
            <MailOutlined className="text-5xl text-white" />
          </div>
          <Title level={2} className=" !text-white">Xác thực Email</Title>
          <Text className="text-gray-300">Nhấn nút bên dưới để nhận mã OTP qua email.</Text>
        </div>

        {!otpSent ? (
          <Button
            type="primary"
            size="large"
            block
            onClick={() => {
              console.log("Send OTP button clicked"); // Add this line
              sendOTP();
            }}
            loading={isSendingOTP}
            className="bg-[#1A5F7A] hover:bg-[#2A7F9A] border-none h-12 text-lg font-semibold text-white"
            disabled={!email} // Add this line to disable the button if email is not available
          >
            Gửi mã OTP
          </Button>
        ) : (
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="otp"
              rules={[
                { required: true, message: 'Vui lòng nhập mã OTP!' },
                { len: 6, message: 'Mã OTP phải có 6 chữ số!' }
              ]}
            >
              <div className="flex justify-between">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <Input
                    key={index}
                    className="w-12 h-12 text-center text-xl font-bold bg-white bg-opacity-20 border-2 border-[#1A5F7A] rounded-lg focus:border-[#2A7F9A] focus:ring-2 focus:ring-[#2A7F9A] text-white"
                    maxLength={1}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      const nextInput = e.target.nextElementSibling as HTMLInputElement;
                      const prevInput = e.target.previousElementSibling as HTMLInputElement;
                      if (value && nextInput) {
                        nextInput.focus();
                      } else if (!value && prevInput) {
                        prevInput.focus();
                      }
                      const otp = form.getFieldValue('otp') || '';
                      form.setFieldsValue({ otp: otp.substring(0, index) + value + otp.substring(index + 1) });
                    }}
                  />
                ))}
              </div>
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={isLoading} 
                block
                className="bg-[#1A5F7A] hover:bg-[#2A7F9A] border-none h-12 text-lg font-semibold"
              >
                <LockOutlined className="mr-2" />
                Xác thực
              </Button>
            </Form.Item>
          </Form>
        )}

        <div className="text-center">
          <Space direction="vertical" size="small">
            {otpSent && (
              <Button 
                type="link" 
                onClick={sendOTP} 
                disabled={countdown > 0 || isSendingOTP}
                loading={isSendingOTP}
                className="text-[#A0D8EF] hover:text-[#C0E8FF]"
              >
                {countdown > 0 ? `Gửi lại sau ${countdown}s` : 'Gửi lại mã OTP'}
              </Button>
            )}
            <Text className="text-gray-300">
              Không nhận được mã? Kiểm tra hộp thư rác hoặc thử lại sau.
            </Text>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;