import mongoose from "mongoose";

interface IDoctorSchedule {
  doctorId: string;
  weekSchedule: any;
}

const DoctorScheduleSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    weekSchedule: [
      {
        dayOfWeek: { type: String, required: true }, // Ví dụ: "Monday", "Tuesday", ...
        slots: [
          {
            time: { type: String, required: true }, // Khung giờ, ví dụ: "9:00 AM - 10:00 AM"
            isAvailable: { type: Boolean, default: true }, // Trạng thái: Có sẵn hay không
            isBooked: { type: Boolean, default: false }, // Trạng thái: Đã được đặt hay chưa
          },
        ],
      },
    ],
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
