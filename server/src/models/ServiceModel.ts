import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  service_name: string;
  price: number;
  description: string;
}

const ServiceSchema: Schema = new Schema({
  service_name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<IService>('Service', ServiceSchema);