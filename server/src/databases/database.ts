import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB is already connected');
      return;
    }

    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      retryWrites: true,
    });

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    // Don't exit the process, allow for retry or graceful handling
  }
};

export default connectDB;