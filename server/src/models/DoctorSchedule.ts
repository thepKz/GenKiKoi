import mongoose, { Schema, Document } from "mongoose";
import { IDoctor } from "./Doctor";

export interface IDoctorSchedule extends Document {
  doctorId: IDoctor; // ID của bác sĩ
  weekSchedule: Array<{
    dayOfWeek: string;
    slots: Array<{
      slotTime: string;
      isBooked: boolean;
      appointmentId?: mongoose.Types.ObjectId | null;
    }>;
  }>;
}

const DoctorScheduleSchema = new Schema<IDoctorSchedule>(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    weekSchedule: [
      {
        dayOfWeek: {
          type: String,
          required: true,
        },
        slots: [
          {
            slotTime: {
              type: String,
              enum: [
                "8:00",
                "9:00",
                "10:00",
                "11:00",
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
            appointmentId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Appointment",
              required: false,
            },
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
