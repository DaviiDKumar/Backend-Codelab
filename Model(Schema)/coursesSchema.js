import mongoose from "mongoose";
import { deflate } from "zlib";

const courseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        default: "",
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true, // Prevent extra spaces
        required: true,
    },


    longDescription: {
        type: String,
        trim: true,
        default: "",
        required: true,
    },

    keyLearnings: {
        type: [String],
        default: [],
        required: true,
    },

    requirements: {
        type: [String],
        default: [],
        required: true,
        
    },


    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"], // Prevents negative prices
    },
    thumbnail: {
        type: String, // Stores file path like "uploads/userId/profile.jpg"
        default: "",
       
    },
    videos: {
        type: [String], // Can be updated later to store video URLs or IDs
        default: [],
       
    },
}, { timestamps: true }); // Auto adds `createdAt` & `updatedAt`

export const Course = mongoose.model("Course", courseSchema);
