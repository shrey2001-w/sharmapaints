import mongoose from "mongoose";

let isConnected = false; // ← add this outside the function

export async function connectDB() {
  try {
    if (isConnected || mongoose.connection.readyState >= 1) {
      return; // silent return, no need to log every time
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log("✅ MongoDB connected:", conn.connection.host);
    
  } catch (error) {
    console.error("❌ Database Error:", error);
    throw error;
  }
}