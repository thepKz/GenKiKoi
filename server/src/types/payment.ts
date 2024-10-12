interface IPayment {
    orderId: string;
    amount: number;
    orderInfo: string;
    orderType: string;
    transactionNo?: string;
    transactionStatus: 'pending' | 'success' | 'failed';
    paymentMethod: 'vnpay';
    paymentDate: Date;
  }