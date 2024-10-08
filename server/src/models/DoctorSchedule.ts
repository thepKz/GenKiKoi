import mongoose from "mongoose";

type DayOfWeek =
  | "Thứ 2"
  | "Thứ 3"
  | "Thứ 4"
  | "Thứ 5"
  | "Thứ 6"
  | "Thứ 7"
  | "Chủ nhật";

interface ISlot {
  time: string;
  isAvailable: boolean;
  isBooked: boolean;
}

interface IWeekSchedule {
  dayOfWeek: DayOfWeek;
  slots: ISlot[];
}

interface IDoctorSchedule {
  doctorId: mongoose.Types.ObjectId;
  weekSchedule: IWeekSchedule[];
}

const SlotSchema = new mongoose.Schema<ISlot>({
  time: { type: String, required: true }, // Khung giờ, ví dụ: "9:00 AM - 10:00 AM"
  isAvailable: { type: Boolean, default: true }, // Trạng thái: Có sẵn hay không
  isBooked: { type: Boolean, default: false }, // Trạng thái: Đã được đặt hay chưa
});

const WeekScheduleSchema = new mongoose.Schema<IWeekSchedule>({
  dayOfWeek: {
    type: String,
    enum: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
    required: true,
  },
  slots: [SlotSchema],
});

const DoctorScheduleSchema = new mongoose.Schema<IDoctorSchedule>(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    weekSchedule: [WeekScheduleSchema],
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
