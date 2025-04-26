import express from "express";
import { connectDB } from "./Database/db.js"; // Ensure correct import
import { authRoutes } from "./Routes/authRoutes.js";
import { courseRoutes } from "./Routes/courseRoutes.js";
import dotenv from "dotenv"
import cors from "cors";  // Import CORS
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import { paymentRoutes } from "./Routes/paymentRoutes.js";
import { adminRoutes } from "./Routes/adminRoutes.js";






const app = express();
dotenv.config()
const PORT = Number(process.env.PORT)
connectDB(); // Call the database connection function

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'], // ✅ Allow multiple frontends
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // ✅ Allow cookies
  allowedHeaders: ['Content-Type', 'Authorization'],  // ✅ Allow specific headers
};



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Use the CORS middleware with options
app.use(cors(corsOptions));
app.use(cookieParser());  // Enable cookie parsing middleware
app.use(express.json());  // Body parsing middleware for POST requests


app.use("/api", authRoutes)
app.use("/api", courseRoutes)
app.use("/api", paymentRoutes)
app.use("/api", adminRoutes)







app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT} 🚀`);
});
