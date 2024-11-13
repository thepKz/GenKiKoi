import mongoose from "mongoose";
import { IDoctor } from "./Doctor";
import { ICustomer } from "./Customer";
import { IService } from "./Service";
import { IDoctorSchedule } from "./DoctorSchedule";
import { IFeedback } from "./Feedback";

export interface IAppointment {
  doctorScheduleId: IDoctorSchedule;
  doctorId: IDoctor;
  customerId: ICustomer;
  serviceId: IService;
  feedback?: IFeedback;
  appointmentDate: Date;
  slotTime: string;
  typeOfConsulting: string;
  address: string;
  status: string;
  reasons?: string;
  notes?: string;
  isFeedback: boolean;
}

const AppointmentSchema = new mongoose.Schema<IAppointment>(
  {
    doctorScheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorSchedule",
      required: true,
    },
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
    feedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
    appointmentDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    status: {
      type: String,
      enum: ["Đang chờ xử lý", "Đã xác nhận", "Đã hoàn thành", "Đã hủy"],
      default: "Đang chờ xử lý",
    },
    reasons: {
      type: String,
    },
    notes: {
      type: String,
    },
    address: {
      type: String,
      default: "",
    },
    isFeedback: {
      type: Boolean,
      default: false,
    },
    slotTime: {
      type: String,
      required: true,
    },
    typeOfConsulting: {
      type: String,
      enum: ["Tại phòng khám", "Tại nhà", "Tư vấn trực tuyến"],
      required: true,
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
