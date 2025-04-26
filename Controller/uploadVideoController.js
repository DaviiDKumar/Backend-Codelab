import cloudinary from "../Cloudinary/cloudinaryConfig.js";
import fs from "fs";
import { Course } from "../Model(Schema)/coursesSchema.js"; // Import Course model

export const uploadVideo = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No videos uploaded" });
    }

    const { id } = req.params; // Get Course ID from URL
    const course = await Course.findById(id); // Find Course by ID

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Upload all videos in parallel
    const uploadPromises = req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "videos",
        resource_type: "video",
      });
      fs.unlinkSync(file.path); // Delete local file after upload
      return result.secure_url;
    });

    const videoUrls = await Promise.all(uploadPromises); // Wait for all uploads to finish

    // Append uploaded videos to course
    course.videos = [...course.videos, ...videoUrls];
    await course.save();

    res.status(200).json({
      message: "Videos uploaded successfully",
      videos: videoUrls,
    });
  } catch (error) {
    console.error("Video upload failed:", error);
    res.status(500).json({ message: "Video upload failed", error: error.message });
  }
};
