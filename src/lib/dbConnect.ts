import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
}
