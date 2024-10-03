import mongoose from "mongoose";

interface IBillModel {
  appointmentId: string;
  appointmentDate: string;
  servicePrice: number;
  medicinePrice: number;
  totalPrice: number;
  status: string;
}

const BillSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  servicePrice: {
    type: Number,
    require: true,
  },
});
