import mongoose, { Document, Schema } from 'mongoose';

export interface IReport extends Document {
  type: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  generatedBy: string;
  data: any;
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema: Schema = new Schema({
  type: { type: String, required: true },
  dateRange: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  generatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

export default mongoose.model<IReport>('Report', ReportSchema);