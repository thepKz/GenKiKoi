import mongoose from 'mongoose';

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
  
const PaymentSchema = new mongoose.Schema<IPayment>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    orderInfo: {
      type: String,
      required: true,
    },
    orderType: {
      type: String,
      required: true,
    },
    transactionNo: {
      type: String,
    },
    transactionStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['vnpay'],
      default: 'vnpay',
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
export default Payment;