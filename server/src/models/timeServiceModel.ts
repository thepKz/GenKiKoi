import mongoose, { Document, Schema } from 'mongoose';

export interface ITimeService extends Document {
  service_id: mongoose.Types.ObjectId;
  Time_slot_id: mongoose.Types.ObjectId;
  status: 'available' | 'booked';
}

const TimeServiceSchema: Schema = new Schema({
  service_id: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  Time_slot_id: { type: Schema.Types.ObjectId, ref: 'TimeSlot', required: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' },
});

export default mongoose.model<ITimeService>('TimeService', TimeServiceSchema);