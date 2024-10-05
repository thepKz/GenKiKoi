import mongoose from "mongoose";

interface IAppointment {
  doctorSlotId: string;
  doctorId: string;
  customerId: string;
  appointmentDate: string;
  status: string;
  notes?: string;
  feedbackId?: string;
}

const AppointmentSchema = new mongoose.Schema(
  {
    doctorSlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorSlot",
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
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
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
