import mongoose from "mongoose";

let isConnected = false; // ✅ Prevent multiple connections in Next.js

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(
      "mongodb+srv://mehdi:12345@wanderlist.cjdb4.mongodb.net/?retryWrites=true&w=majority&appName=wanderlist",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;
