import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';

const VnPayReturn: React.FC = () => {
  const [paymentStatus, setPaymentStatus] = useState<string>('Đang xử lý...');
  const location = useLocation();
// Code đỏ nhưng chạy đúng vui lòng không sửa
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        console.log('Sending request to:', `/api/vnpay/vnpay_return${location.search}`);
        const response = await axiosInstance.get(
          `/api/vnpay/vnpay_return${location.search}`
        );
        if (response && response.code === '00') {
          setPaymentStatus('Thanh toán thành công');
        } else {
          setPaymentStatus(`Thanh toán thất bại: ${response?.message || 'Không xác định'}`);
        }
      } catch (error: any) {
        console.error('Lỗi khi xác minh thanh toán:', error);
        setPaymentStatus('Lỗi khi xác minh thanh toán. Vui lòng thử lại sau.');
      }
    };

    verifyPayment();
  }, [location]);

  return (
    <div>
      <h2>Kết quả thanh toán</h2>
      <p>{paymentStatus}</p>
    </div>
  );
};

export default VnPayReturn;
