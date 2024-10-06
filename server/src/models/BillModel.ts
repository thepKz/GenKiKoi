import mongoose, { Document, Schema } from 'mongoose';

interface IBill extends Document {
  // Define your bill fields here
  amount: number;
  appointmentId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  date: Date;
  status: string;
  paymentMethod: string;
}

const BillSchema = new Schema({
  amount: { type: Number, required: true },
  appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true },
  // ... other fields
});

const BillModel = mongoose.model<IBill>('Bill', BillSchema);

export default BillModel;