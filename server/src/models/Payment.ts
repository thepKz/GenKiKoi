import mongoose from "mongoose";

interface IPayment {
  customerId: mongoose.Types.ObjectId;
  serviceName: string;
  date: Date;
  accountNumber: string;
  accountName: string;
  description: string;
  paymentLinkId: string;
  totalPrice: number;
  status: "PENDING" | "PAID" | "CANCELLED";
}

const PaymentSchema = new mongoose.Schema<IPayment>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "CANCELLED"],
      default: "PENDING",
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    paymentLinkId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
export default Payment;
