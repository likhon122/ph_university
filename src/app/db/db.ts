import mongoose from 'mongoose';
import { monoDBUrl } from '../configs';

const connectDB = async (): Promise<void> => {
  if (!monoDBUrl) {
    throw new Error(
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
