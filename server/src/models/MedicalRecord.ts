import mongoose from "mongoose";

interface IMedicalRecord {
  customerId: mongoose.Types.ObjectId;
  description?: string;
  appointmentId: mongoose.Types.ObjectId;
}

const MedicalRecordSchema = new mongoose.Schema<IMedicalRecord>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    description: {
      type: String,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MedicalRecord = mongoose.model<IMedicalRecord>(
  "MedicalRecord",
  MedicalRecordSchema
);

export default MedicalRecord;
