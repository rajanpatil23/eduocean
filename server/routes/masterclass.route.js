import express from "express";
import {
  createMasterClassOrder,
  verifyMasterClassPayment,
  createCCAvenueOrder,
  handleCCAvenueResponse,
  handleCCAvenueCancel,
} from "../controllers/masterclass.controller.js";

const router = express.Router();

// ==================== RAZORPAY ROUTES ====================
// Create Razorpay order for masterclass registration
router.post("/create-order", createMasterClassOrder);

// Verify payment after successful Razorpay payment
router.post("/verify-payment", verifyMasterClassPayment);

// ==================== CCAVENUE ROUTES ====================
// Create CCAvenue order for masterclass registration
router.post("/ccavenue-create-order", createCCAvenueOrder);

// Handle CCAvenue payment response (success)
router.post("/ccavenue-response", handleCCAvenueResponse);

// Handle CCAvenue payment cancellation
router.post("/ccavenue-cancel", handleCCAvenueCancel);

export default router;
