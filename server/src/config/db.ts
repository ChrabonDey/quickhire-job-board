import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ FATAL ERROR: MONGO_URI is not defined in environment variables.');
    process.exit(1);
  }

  // Debug: Log masked URI to check if it's localhost or Atlas
  const maskedUri = uri.replace(/\/\/.*@/, '//****:****@');
  console.log(`📡 Attempting to connect to: ${uri.includes('localhost') ? 'LOCALHOST (Error!)' : 'REMOTE DATABASE'}`);
  console.log(`🔗 URI Masked: ${maskedUri}`);

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed!');
    if (error instanceof Error) {
      console.error(`Error Details: ${error.message}`);
    }
    process.exit(1);
  }
};

export default connectDB;
