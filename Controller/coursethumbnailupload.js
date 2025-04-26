import cloudinary from "../Cloudinary/cloudinaryConfig.js";
import fs from "fs";
import { Course } from "../Model(Schema)/coursesSchema.js";

export const uploadCourseThumbnail = async (req, res) => {
  try {
    const { courseId } = req.params; // Get course ID from request params

    if (!req.file) {
      return res.status(400).json({ message: "No thumbnail uploaded" });
    }

    // ✅ Check if course exists BEFORE uploading
    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      console.log(`❌ Course not found with ID: ${courseId}`);
      return res.status(404).json({ message: "Course not found" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "thumbnails",
    });

    // Remove the file from server after upload
    fs.unlinkSync(req.file.path);

    console.log(`✅ Thumbnail uploaded successfully: ${result.secure_url}`);

    // ✅ Update course with the new thumbnail
    existingCourse.thumbnail = result.secure_url;
    await existingCourse.save(); // Save the updated course

    res.status(200).json({
      message: "Thumbnail uploaded successfully",
      thumbnail: result.secure_url,
      course: existingCourse,
    });

  } catch (error) {
    console.error("❌ Thumbnail upload failed:", error);
    res.status(500).json({ message: "Thumbnail upload failed", error: error.message });
  }
};
