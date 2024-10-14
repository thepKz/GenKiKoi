import axiosInstance from '../apis/axiosInstance';

/**
 * Initiates a VNPAY payment by sending a request to the server to create a payment URL.
 * 
 * @param amount The amount to be paid in VND.
 * @param orderInfo A description of the order being paid for.
 */
export const initiateVnPayPayment = async (
  amount: number,
  orderInfo: string
) => {
  console.log('Initiating VNPAY payment:', { amount, orderInfo });
  try {
    const response = await axiosInstance.post<{ paymentUrl: string }>('/api/vnpay/create_payment_url', {
      amount,
      orderDescription: orderInfo,
      orderType: 'billpayment',
      language: 'vn',
    });
    
    // Log toàn bộ response để kiểm tra
    console.log('VNPAY payment URL response:', response);

    if (response.data.paymentUrl) {
      console.log("Redirecting to:", response.data.paymentUrl);
      window.location.href = response.data.paymentUrl;
    } else {
      throw new Error('paymentUrl not found in response');
    }
  } catch (error) {
    console.error('Error initiating VnPay payment:', error);
    throw error;
  }
};
