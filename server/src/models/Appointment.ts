import mongoose from "mongoose";
import { IDoctor } from "./Doctor";
import { ICustomer } from "./Customer";
import { IService } from "./Service";

export interface IAppointment {
  doctorId: IDoctor;
  customerId: ICustomer;
  serviceId: IService;
  appointmentDate: Date;
  typeOfConsulting: string;
  slotTime: string;
  status: string;
  reasons?: string;
  notes?: string;
}

const AppointmentSchema = new mongoose.Schema<IAppointment>(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
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
    },
    typeOfConsulting: {
      type: String,
      required: true,
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
      required: true,
    },
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
