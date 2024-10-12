import mongoose, { Schema } from "mongoose";
interface ISchedule {
  day: Date; // Ngày
  startTime: string; // Thời gian bắt đầu
  endTime: string; // Thời gian kết thúc
  isBooked: boolean; // Trạng thái đã được đặt
}

interface IDoctorSchedule extends Document {
  doctorId: mongoose.Types.ObjectId; // ID của bác sĩ
  schedules: ISchedule[]; // Mảng các lịch trình
}

const ScheduleSchema = new Schema<ISchedule>({
  day: { type: Date, required: true },
  startTime: { type: String, required: true }, // Thời gian bắt đầu
  endTime: { type: String, required: true }, // Thời gian kết thúc
  isBooked: { type: Boolean, default: false }, // Trạng thái đã được đặt
});
const DoctorScheduleSchema = new Schema<IDoctorSchedule>(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    schedules: [ScheduleSchema], // Mảng các lịch trình
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
