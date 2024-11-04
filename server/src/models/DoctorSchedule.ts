import mongoose, { Schema, Document } from "mongoose";
import { IDoctor } from "./Doctor";

export interface IDoctorSchedule extends Document {
  doctorId: IDoctor;
  weekSchedule: Array<{
    dayOfWeek: string;
    slots: Array<{
      slotTime: string;
      isBooked: boolean;
      currentCount: number;
      appointmentIds?: string[];
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
            currentCount: {
              type: Number,
              default: 0,
            },
            appointmentIds: [
              {
                type: String,
              },
            ],
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
