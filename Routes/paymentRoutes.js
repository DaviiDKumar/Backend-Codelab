import express from "express";
import { createOrder, paymentVerification } from "../Controller/paymentController.js";

export const  paymentRoutes = express.Router();

paymentRoutes.post("/create-order", createOrder);
paymentRoutes.post("/verify-payment", paymentVerification);


