import mongoose from "mongoose";
import { IAppointment } from "./Appointment";
import { ICustomer } from "./Customer";
import { IDoctor } from "./Doctor";
import { IService } from "./Service";
import { IPayment } from "./Payment";

interface IBill {
  appointmentId: IAppointment;
  paymentId: IPayment;
  appointmentDate: Date;
  servicePrice: number;
  movingPrice: number;
  totalPrice: number;
  status: "Đang xử lý" | "Hoàn thành" | "Lỗi thanh toán" | "Hủy";
  paymentMethod: "vnpay"; // Chỉ cho phép 'vnpay'
}

const BillSchema = new mongoose.Schema<IBill>(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    appointmentDate: {
      type: Date,
      default: Date.now,
    },
    servicePrice: {
      type: Number,
      required: true,
    },
    movingPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Đang xử lý", "Hoàn thành", "Lỗi thanh toán", "Hủy"],
      default: "Đang xử lý",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["vnpay"], // Chỉ cho phép 'vnpay'
      default: "vnpay",
      required: true,
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model<IBill>("Bill", BillSchema);
export default Bill;
