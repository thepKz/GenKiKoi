import { Button, message } from 'antd';
import React, { useState } from 'react';
import { initiateVnPayPayment } from '../utils/vnpay';

const CheckoutPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      // Thay thế các giá trị này bằng dữ liệu thực tế từ đơn hàng của bạn
      const amount = 100000; // Số tiền cần thanh toán (VND)
      const orderInfo = 'thanhtoandonhang'; // Thông tin đơn hàng

      await initiateVnPayPayment(amount, orderInfo);
      // Nếu thành công, người dùng sẽ được chuyển hướng đến trang thanh toán của VNPay
    } catch (error) {
      console.error('Lỗi khi khởi tạo thanh toán:', error);
      message.error('Có lỗi xảy ra khi tạo giao dịch. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Trang thanh toán</h2>
      <Button onClick={handlePayment} loading={isLoading} type="primary">
        Thanh toán với VNPay
      </Button>
      
    </div>
  );
};

export default CheckoutPage;