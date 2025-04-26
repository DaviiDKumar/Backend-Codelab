import express from "express";
import { createCourse, deleteAllCourses, deleteCourse, fetchCourse, fetchCourses, updateCourse } from "../Controller/courseController.js";
import { protect } from "../Middlewares/jwtMiddleware.js";
import { uploadCourseThumbnail } from "../Controller/coursethumbnailupload.js";
import upload from "../Cloudinary/multerConfig.js";
import { uploadVideo } from "../Controller/uploadVideoController.js";


export const courseRoutes = express.Router();

courseRoutes.get("/fetchCourses", fetchCourses);
courseRoutes.get("/fetchCourse/:id", protect, fetchCourse);
courseRoutes.post("/createCourse", protect, createCourse);
courseRoutes.put("/upload-thumbnail/:courseId", protect, upload.single('thumbnail'), uploadCourseThumbnail)
courseRoutes.put("/updateCourse/:id", protect, updateCourse);
courseRoutes.delete("/deleteCourse/:id", protect, deleteCourse);
courseRoutes.put('/upload-videos/:id', protect, upload.array('videos', 20), uploadVideo);
courseRoutes.delete('/dltcrs', deleteAllCourses);
// End of courseRoutes

courseRoutes.post("/allcoursepost", protect, createCourse, upload.single('thumbnail'), uploadCourseThumbnail, upload.array('videos', 20), uploadVideo)
 