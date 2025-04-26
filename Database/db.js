import mongoose from "mongoose";


export const connectDB = async () => {
    try {
       const connect= await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1); // Server ko kill kar dega agar DB connect nahi hui
    }
};
