import mongoose from "mongoose";

interface IAppointment {
  doctorId: string;
  customerId: string;
  serviceId: string;
  appointmentDate: string;
  typeOfConsulting: string;
  slotTime: string;
  status: string;
  reasons: string;
  notes?: string;
  feedbackId?: string;
}

const AppointmentSchema = new mongoose.Schema(
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
        "Đã xác nhân",
        "Đã hoàn thành",
        "Đã hủy",
        "Đã thay đổi lịch",
      ],
      default: "Đang chờ xử lý",
    },
    reasons: {
      type: String,
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
    feedbackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
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
