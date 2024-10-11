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
    const response = await axiosInstance.post('/api/vnpay/create_payment_url', {
      amount,
      orderDescription: orderInfo,
      orderType: 'billpayment',
      language: 'vn',
    });
    console.log('VNPAY payment URL response:', response);

    if (response && response.paymentUrl) {
      console.log('Opening VNPAY payment page in a new tab:', response.paymentUrl);
      window.location.href = response.paymentUrl; // Thay đổi này
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('Error initiating VnPay payment:', error);
    throw error;
  }
};
