import mongoose from "mongoose";

const ConnectToDb = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

export default ConnectToDb;
