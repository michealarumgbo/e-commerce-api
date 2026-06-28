import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectURI = process.env.MONGOOSE_URI;

export const connectDB = async () => {
  // try establishing a connection
  await mongoose.connect(connectURI);
  console.log("Database Connection Successful");
};
