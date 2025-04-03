import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mehdi:12345@wanderlist.cjdb4.mongodb.net/?retryWrites=true&w=majority&appName=wanderlist");
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
  }
};

export default connectDB;
