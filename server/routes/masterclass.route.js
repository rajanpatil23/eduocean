import express from "express";
import {
  createMasterClassOrder,
  verifyMasterClassPayment,
} from "../controllers/masterclass.controller.js";

const router = express.Router();

// Create Razorpay order for masterclass registration
router.post("/create-order", createMasterClassOrder);

// Verify payment after successful Razorpay payment
router.post("/verify-payment", verifyMasterClassPayment);

export default router;
