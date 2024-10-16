import mongoose from "mongoose";
import { ICustomer } from "./Customer";
import { IDoctor } from "./Doctor";

export interface IPond {
  customerId: ICustomer; // Tham chiếu đến Customer
  doctorId: IDoctor; // Tham chiếu đến Doctor
  status: "Tệ" | "Rất tệ" | "Bình thường" | "Tốt"; // Trạng thái hồ
  images?: string[]; // Mảng chứa URL hình ảnh
  ph?: number; // Giá trị pH
  ammoniaLevel?: number; // Mức độ amoniac
  nitrateLevel?: number; // Mức độ nitrat
  oxygenLevel?: number; // Mức độ oxy
  waterTemperature?: number; // Nhiệt độ nước
  cleanliness: "Tệ" | "Rất tệ" | "Bình thường" | "Tốt"; // Mức độ sạch sẽ
  filtrationSystem: "Lớn" | "Vừa" | "Nhỏ"; // Kích thước hệ thống lọc
  pondSize?: number; // Kích thước hồ
  diagnosis?: string; // Chẩn đoán
  notes?: string; // Ghi chú
  createdAt?: Date; // Ngày tạo
}
const PondSchema = new mongoose.Schema<IPond>({
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
  status: {
    type: String,
    enum: ["Tệ", "Rất tệ", "Bình thường", "Tốt"],
    default: "Bình thường",
  },
  images: {
    type: [String],
  },
  ph: {
    type: Number,
  },

  ammoniaLevel: {
    type: Number,
  },
  nitrateLevel: {
    type: Number,
  },
  oxygenLevel: {
    type: Number,
  },
  waterTemperature: {
    type: Number,
  },
  cleanliness: {
    type: String,
    enum: ["Tệ", "Rất tệ", "Bình thường", "Tốt"],
    default: "Bình thường",
  },
  filtrationSystem: {
    type: String,
    enum: ["Lớn", "Vừa", "Nhỏ"],
    default: "Vừa",
  },
  pondSize: {
    type: Number,
  },
  diagnosis: {
    type: String,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pond = mongoose.model<IPond>("Pond", PondSchema);

export default Pond;
