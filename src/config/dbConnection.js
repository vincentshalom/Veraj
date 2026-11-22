import mongoose from "mongoose";

export async function dbConnect(url) {
  try {
    const con = await mongoose.connect(url);
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (error) {
    console.log(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
}
