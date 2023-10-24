import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing mongo db url");
  } else if (isConnected) {
    return console.log("Database is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });

    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
};