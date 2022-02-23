import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  const URL = process.env.CONNECTION_URL;
  const ENV = process.env.ENVIRONMENT;
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_URL);
    ENV === "DEVELOPMENT"
      ? console.log(`MongoDB Connnected: ${connect.connection.host}`)
      : undefined;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
