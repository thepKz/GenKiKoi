import mongoose, { Schema, Document } from "mongoose";
import { IDoctor } from "./Doctor";

export interface IDoctorSchedule extends Document {
  doctorId: IDoctor; // ID của bác sĩ
  title?: string; // Tiêu đề
  start: Date; // Thời gian bắt đầu
  end: Date; // Thời gian kết thúc
  description?: string; // Mô tả
  isBooked: boolean; // Trạng thái đã được đặt
}

const DoctorScheduleSchema = new Schema<IDoctorSchedule>(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    title: { type: String, required: true }, // Tiêu đề
    start: { type: Date, required: true }, // Thời gian bắt đầu
    end: { type: Date, required: true }, // Thời gian kết thúc
    description: { type: String, required: true }, // Mô tả
    isBooked: { type: Boolean, default: false }, // Trạng thái đã được đặt
  },
  {
    timestamps: true,
  }
);

const DoctorSchedule = mongoose.model<IDoctorSchedule>(
  "DoctorSchedule",
  DoctorScheduleSchema
);

export default DoctorSchedule;
