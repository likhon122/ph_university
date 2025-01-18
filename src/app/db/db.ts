import mongoose from 'mongoose';
import { monoDBUrl } from '../configs';
import AppError from '../errors/AppError';

const connectDB = async (): Promise<void> => {
  if (!monoDBUrl) {
    throw new AppError(
      400,
      'MongoDB connection URI is not defined in the environment variables.',
    );
  }

  try {
    await mongoose.connect(monoDBUrl);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
