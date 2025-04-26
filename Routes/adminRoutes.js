import express from "express";
import { adminLogin, createAdmin } from "../Controller/adminController.js";
import { fetchCourse } from "../Controller/courseController.js";

export const adminRoutes = express.Router()

adminRoutes.post("/admin_signup", createAdmin)
adminRoutes.post("/admin_login",adminLogin)
adminRoutes.get("/adminfetchCourse/:id", fetchCourse);