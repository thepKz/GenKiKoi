/* eslint-disable @typescript-eslint/no-unused-vars */
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Form, Input, message, Space, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import { addAuth, updateAuth } from '../redux/reducers/authReducer';
import { useAuthSync } from '../utils/useAuthSync';

const { Title, Text } = Typography;

const VerifyEmail: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.authReducer) || {};
  const email = auth?.email;
  const dispatch = useDispatch();
  const [otpError, setOtpError] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(InputRef | null)[]>([]);
  const { syncAuthState } = useAuthSync();

  useEffect(() => {
    if (!email) {
      console.warn("Email is not available");
      navigate('/sign-in');
    }
  }, [email, navigate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendOTP = async () => {
    if (!email) {
      message.error('Email không hợp lệ');
      return;
    }
    try {
      setIsSendingOTP(true);
      await axiosInstance.post('/api/mail/send-verification', { email });
      message.success('Mã OTP đã được gửi đến email của bạn');
      setCountdown(60);
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      message.error('Có lỗi xảy ra khi gửi mã OTP');
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Submit form if all fields are filled
    if (newOtp.every(digit => digit)) {
      form.submit();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const otpString = otp.join('');
      console.log('Sending OTP to backend:', otpString);
      const res = await axiosInstance.post('/api/mail/verify-otp', { email, otp: otpString });
      console.log('Full response:', res);
      if (res.data.message === 'Email verified successfully') {
        message.success('Email xác thực thành công!');
        await syncAuthState(); // Sync auth state after successful verification
        dispatch(addAuth(res.data));
        dispatch(updateAuth({ ...auth, isVerified: true }));
        navigate('/');
      } else {
        form.setFields([
          {
            name: 'otp',
            errors: ['Mã OTP không hợp lệ hoặc đã hết hạn.']
          }
        ]);
      }
    } catch (error: any) {
      console.error('Error details:', error.response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0C3C54] to-[#1A5F7A]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="inline-block p-4 bg-[#0C3C54] rounded-full mb-4">
            <MailOutlined className="text-5xl text-white" />
          </div>
          <Title level={2} className="text-[#0C3C54]">Xác thực Email</Title>
          <Text className="text-gray-600">Nhập mã OTP được gửi đến email của bạn.</Text>
        </div>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="otp"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || !otp.every(digit => digit)) {
                    return Promise.reject('Vui lòng nhập mã OTP đủ 6 ký tự!');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <div className="flex justify-between">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    if (el) {
                      inputRefs.current[index] = el;
                    }
                  }}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-[#1A5F7A] rounded-lg focus:border-[#2A7F9A] focus:ring-2 focus:ring-[#2A7F9A] text-black"
                  maxLength={1}
                />
              ))}
            </div>
          </Form.Item>
          {otpError && <div className="text-red-500 mb-4">{otpError}</div>}
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

        <div className="text-center">
          <Space direction="vertical" size="small">
            <Button 
              type="link" 
              onClick={sendOTP} 
              disabled={countdown > 0 || isSendingOTP}
              loading={isSendingOTP}
              className="text-[#1A5F7A] hover:text-[#2A7F9A]"
            >
              {countdown > 0 ? `Gửi lại sau ${countdown}s` : 'Gửi OTP XÁC THỰC'}
            </Button>
            <Text className="text-gray-500">
              Không nhận được mã? Kiểm tra hộp thư rác hoặc thử lại sau.
            </Text>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
