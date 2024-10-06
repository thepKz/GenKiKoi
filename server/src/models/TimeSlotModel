import mongoose, { Document, Schema } from 'mongoose';

export interface ITimeSlot extends Document {
  startDate: Date;
  endDate: Date;
}

const TimeSlotSchema: Schema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export default mongoose.model<ITimeSlot>('TimeSlot', TimeSlotSchema);