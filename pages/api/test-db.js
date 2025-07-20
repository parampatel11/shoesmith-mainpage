// ✅ test-db.js (safe version)
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err);
  }
};

export default connectDB;
