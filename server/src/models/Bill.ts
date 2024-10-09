import mongoose from "mongoose";

interface IBill {
  appointmentId: mongoose.Types.ObjectId;
  appointmentDate: Date;
  servicePrice: number;
  medicinePrice?: number;
  totalPrice: number;
  status: "Đang xử lý" | "Hoàn thành" | "Lỗi thanh toán" | "Hủy";
}

const BillSchema = new mongoose.Schema<IBill>(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
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
  },
  { timestamps: true }
);

const Bill = mongoose.model<IBill>("Bill", BillSchema);
export default Bill;
