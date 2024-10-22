import mongoose, { Schema, Document } from "mongoose";
import { IDoctor } from "./Doctor";

export interface IDoctorSchedule extends Document {
  doctorId: IDoctor; // ID của bác sĩ
  start: Date; // Thời gian bắt đầu
  end: Date; // Thời gian kết thúc
  slots: Array<{
    slotTime: string;
    isBooked: boolean;
  }>;
}

const DoctorScheduleSchema = new Schema<IDoctorSchedule>(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    start: { type: Date, required: true }, // Thời gian bắt đầu
    end: { type: Date, required: true }, // Thời gian kết thúc
    slots: [
      {
        slotTime: {
          type: String,
          enum: [
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
          ],
        },
        isBooked: {
          type: Boolean,
          default: false,
        },
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
