import mongoose from "mongoose";

interface IBill {
  appointmentId: string;
  appointmentDate: string;
  servicePrice: number;
  medicinePrice?: number;
  totalPrice: number;
  status: string;
}

const BillSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    medicinePrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
      required: true,
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model<IBill>("Bill", BillSchema);
export default Bill;
