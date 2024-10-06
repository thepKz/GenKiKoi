import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
  customer: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  timeService: mongoose.Types.ObjectId;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema: Schema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  timeService: { type: Schema.Types.ObjectId, ref: 'TimeService', required: true },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
}, { timestamps: true });

const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;
