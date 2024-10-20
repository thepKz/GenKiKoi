import mongoose from "mongoose";
import { IDoctor } from "./Doctor";
import { ICustomer } from "./Customer";
import { IService } from "./Service";
import { IDoctorSchedule } from "./DoctorSchedule";

export interface IAppointment {
  doctorScheduleId: IDoctorSchedule;
  customerId: ICustomer;
  serviceId: IService;
  feedback?: string;
  appointmentDate: Date;
  status: string;
  reasons?: string;
  notes?: string;
}

const AppointmentSchema = new mongoose.Schema<IAppointment>(
  {
    doctorScheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorSchedule",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
      default: new Date(),
    },

    status: {
      type: String,
      enum: [
        "Đang chờ xử lý",
        "Đã xác nhận",
        "Đã hoàn thành",
        "Đã hủy",
        "Đã thay đổi lịch",
      ],
      default: "Đang chờ xử lý",
    },
    reasons: {
      type: String,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);

export default Appointment;
