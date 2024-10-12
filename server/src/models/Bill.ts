import mongoose from "mongoose";

interface IBill {
  appointmentId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  paymentId: mongoose.Types.ObjectId;
  appointmentDate: Date;
  servicePrice: number;
  medicinePrice?: number;
  movingPrice?: number;
  totalPrice: number;
  status: "Đang xử lý" | "Hoàn thành" | "Lỗi thanh toán" | "Hủy";
  paymentMethod: "vnpay"; // Chỉ cho phép 'vnpay'
  doctorName: string;
  customerName: string;
  serviceName: string;
  typeOfConsulting: string;
}

const BillSchema = new mongoose.Schema<IBill>(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    servicePrice: {
      type: Number,
      required: true,
    },
    medicinePrice: {
      type: Number,
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
    doctorName: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    typeOfConsulting: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model<IBill>("Bill", BillSchema);
export default Bill;
