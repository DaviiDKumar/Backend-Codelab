import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI stored in environment variables
        const connect = await mongoose.connect(process.env.MONGO_URI, {
           
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected: ${connect.connection.host}`);
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1); // Kill the server if the connection fails
    }
};
