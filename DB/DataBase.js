import mongoose from 'mongoose';
import 'dotenv/config';

const ConnectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default ConnectToDb;