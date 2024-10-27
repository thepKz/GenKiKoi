import mongoose from "mongoose";
import { ICustomer } from "./Customer";
import { IDoctor } from "./Doctor";

export interface IMedicalRecord {
  doctorId: IDoctor;
  customerId: ICustomer;
  fishId: mongoose.Types.ObjectId;
  examType: "Khám bệnh" | "Tái khám";
  serviceName: string;
  diagnosis?: string; // Chuẩn đoán
  treatment?: string; // Phác đồ điều trị
  medicines?: { name: string; quantity: number }[]; // Danh sách thuốc
  images?: string[]; //mang cac hinh anh dieu tri
  date: Date;
}

const MedicalRecordSchema = new mongoose.Schema<IMedicalRecord>(
  {
    fishId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fish",
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
    examType: {
      type: String,
      enum: ["Khám bệnh", "Tái khám"],
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
    },
    treatment: {
      type: String,
    },
    medicines: {
      type: [{ name: String, quantity: Number }],
    },
    images: {
      type: [String],
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const MedicalRecord = mongoose.model<IMedicalRecord>(
  "MedicalRecord",
  MedicalRecordSchema
);

export default MedicalRecord;
