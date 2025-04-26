import express from "express";
import { deleteUser, fetchUserbyID, fetchUsers, login, logout, updateUser } from "../Controller/userController.js";
import { protect } from "../Middlewares/jwtMiddleware.js";
import { signUp } from "../Controller/signupController.js";
import { uploadImage } from "../Controller/uploadController.js";
import upload from "../Cloudinary/multerConfig.js";
import { saveCartItems,} from "../Controller/cartController.js";
import { saveMyLearning } from "../Controller/myLearningController.js";


export const authRoutes = express.Router();

// User routes
authRoutes.post("/signup", signUp);
authRoutes.get("/fetchUsers", fetchUsers);
authRoutes.get("/fetchUser", fetchUserbyID);
authRoutes.put("/updateUser/:id", protect, updateUser);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.delete("/deleteUser/:id", protect, deleteUser);
authRoutes.post('/upload/:id', protect, upload.single('image'), uploadImage);
authRoutes.put("/savethecart/:userId", protect, saveCartItems);
authRoutes.put("/savemylearning/:userId", protect, saveMyLearning);
authRoutes.put("/savemylearning/:userId", protect, saveMyLearning)



// Route for uploading profile picture