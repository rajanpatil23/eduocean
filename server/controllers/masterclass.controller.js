import Razorpay from "razorpay";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  encrypt,
  decrypt,
  formatCCAvenueRequest,
  parseCCAvenueResponse,
  generateOrderId,
  validateCCAvenueResponse,
} from "../utils/ccavenue.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay order for masterclass registration
export const createMasterClassOrder = async (req, res) => {
  try {
    const { name, email, phone, course, amount, notes, paymentType } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !course || !amount) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided!",
      });
    }

    // Validate amount
    if (amount < 1) {
      return res.status(400).json({
        success: false,
        message: "Amount must be at least $1",
      });
    }

    // Convert amount to cents (Razorpay expects amount in smallest currency unit)
    const amountInCents = Math.round(amount * 100);

    // Create receipt ID (max 40 characters)
    const receipt = `MC-${course}-${Date.now()}`.substring(0, 40);

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInCents,
      currency: "USD",
      receipt: receipt,
      payment_capture: 1,
    });

    return res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: amountInCents,
      currency: "USD",
      key: process.env.RAZORPAY_KEY_ID,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Verify payment and send confirmation email
export const verifyMasterClassPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      registrationData,
    } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification parameters!",
      });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed! Invalid signature.",
      });
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== "captured") {
      return res.status(400).json({
        success: false,
        message: "Payment not captured!",
      });
    }

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email to admin
    const adminMailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Master Class Registration",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Master Class Registration</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Student Name:</strong> ${registrationData.name}</p>
            <p><strong>Email:</strong> ${registrationData.email}</p>
            <p><strong>Phone:</strong> ${registrationData.phone}</p>
            <p><strong>Course:</strong> ${registrationData.course}</p>
            <p><strong>Amount Paid:</strong> $${(payment.amount / 100).toFixed(2)}</p>
            <p><strong>Payment Type:</strong> ${registrationData.paymentType}</p>
            <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
            <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
            ${registrationData.notes ? `<p><strong>Notes:</strong> ${registrationData.notes}</p>` : ""}
          </div>
        </div>
      `,
    };

    // Send confirmation email to student
    const studentMailOptions = {
      from: process.env.SMTP_EMAIL,
      to: registrationData.email,
      subject: `Registration Confirmed - ${registrationData.course} Master Class`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Registration Confirmed!</h2>
          <p>Dear ${registrationData.name},</p>
          <p>Thank you for registering for the <strong>${registrationData.course} Master Class</strong>!</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Registration Details:</h3>
            <p><strong>Course:</strong> ${registrationData.course}</p>
            <p><strong>Amount Paid:</strong> $${(payment.amount / 100).toFixed(2)}</p>
            <p><strong>Payment Type:</strong> ${registrationData.paymentType}</p>
            <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
          </div>
          
          <p>Our team will contact you shortly with further details about the master class schedule and access information.</p>
          
          <p>If you have any questions, please don't hesitate to reach out to us.</p>
          
          <p>Best regards,<br>EduOcean Team</p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(studentMailOptions),
    ]);

    return res.status(200).json({
      success: true,
      message: "Payment verified and confirmation emails sent successfully!",
    });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

// ==================== CCAVENUE PAYMENT FUNCTIONS ====================

// Create CCAvenue order for masterclass registration
export const createCCAvenueOrder = async (req, res) => {
  try {
    const { name, email, phone, course, amount, notes, paymentType } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !course || !amount) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided!",
      });
    }

    // Validate amount
    if (amount < 1) {
      return res.status(400).json({
        success: false,
        message: "Amount must be at least $1",
      });
    }

    // Generate unique order ID
    const orderId = generateOrderId("MC");

    // Prepare CCAvenue request data
    const ccavenueData = {
      merchant_id: process.env.CCAVENUE_MERCHANT_ID,
      order_id: orderId,
      currency: "USD",
      amount: amount.toFixed(2),
      redirect_url: process.env.CCAVENUE_REDIRECT_URL,
      cancel_url: process.env.CCAVENUE_CANCEL_URL,
      language: "EN",
      billing_name: name,
      billing_address: "NA",
      billing_city: "NA",
      billing_state: "NA",
      billing_zip: "000000",
      billing_country: "United States",
      billing_tel: phone,
      billing_email: email,
      delivery_name: name,
      delivery_address: "NA",
      delivery_city: "NA",
      delivery_state: "NA",
      delivery_zip: "000000",
      delivery_country: "United States",
      delivery_tel: phone,
      merchant_param1: course,
      merchant_param2: paymentType,
      merchant_param3: notes || "NA",
      merchant_param4: email,
      merchant_param5: phone,
    };

    // Format and encrypt the request
    const requestString = formatCCAvenueRequest(ccavenueData);
    const encryptedData = encrypt(requestString, process.env.CCAVENUE_WORKING_KEY);

    return res.status(200).json({
      success: true,
      orderId: orderId,
      encRequest: encryptedData,
      accessCode: process.env.CCAVENUE_ACCESS_CODE,
      ccavenueUrl: "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction",
      message: "CCAvenue order created successfully",
    });
  } catch (error) {
    console.error("CCAvenue Create Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create CCAvenue order",
      error: error.message,
    });
  }
};

// Handle CCAvenue payment response (success)
export const handleCCAvenueResponse = async (req, res) => {
  try {
    const { encResp } = req.body;

    if (!encResp) {
      return res.status(400).json({
        success: false,
        message: "No encrypted response received from CCAvenue",
      });
    }

    // Decrypt the response
    const decryptedResponse = decrypt(encResp, process.env.CCAVENUE_WORKING_KEY);
    const responseParams = parseCCAvenueResponse(decryptedResponse);

    // Validate response
    const validation = validateCCAvenueResponse(responseParams);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    // Check payment status
    if (responseParams.order_status !== "Success") {
      return res.status(400).json({
        success: false,
        message: `Payment failed: ${responseParams.status_message}`,
        orderStatus: responseParams.order_status,
      });
    }

    // Extract registration data from merchant params
    const registrationData = {
      name: responseParams.billing_name,
      email: responseParams.merchant_param4,
      phone: responseParams.merchant_param5,
      course: responseParams.merchant_param1,
      paymentType: responseParams.merchant_param2,
      notes: responseParams.merchant_param3,
      amount: parseFloat(responseParams.amount),
    };

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email to admin
    const adminMailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Master Class Registration (CCAvenue)",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Master Class Registration</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Student Name:</strong> ${registrationData.name}</p>
            <p><strong>Email:</strong> ${registrationData.email}</p>
            <p><strong>Phone:</strong> ${registrationData.phone}</p>
            <p><strong>Course:</strong> ${registrationData.course}</p>
            <p><strong>Amount Paid:</strong> $${registrationData.amount.toFixed(2)}</p>
            <p><strong>Payment Type:</strong> ${registrationData.paymentType}</p>
            <p><strong>Payment Gateway:</strong> CCAvenue</p>
            <p><strong>Order ID:</strong> ${responseParams.order_id}</p>
            <p><strong>Tracking ID:</strong> ${responseParams.tracking_id}</p>
            <p><strong>Bank Ref No:</strong> ${responseParams.bank_ref_no}</p>
            <p><strong>Payment Mode:</strong> ${responseParams.payment_mode}</p>
            <p><strong>Card Name:</strong> ${responseParams.card_name}</p>
            ${registrationData.notes ? `<p><strong>Notes:</strong> ${registrationData.notes}</p>` : ""}
          </div>
        </div>
      `,
    };

    // Send confirmation email to student
    const studentMailOptions = {
      from: process.env.SMTP_EMAIL,
      to: registrationData.email,
      subject: `Registration Confirmed - ${registrationData.course} Master Class`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Registration Confirmed!</h2>
          <p>Dear ${registrationData.name},</p>
          <p>Thank you for registering for the <strong>${registrationData.course} Master Class</strong>!</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Registration Details:</h3>
            <p><strong>Course:</strong> ${registrationData.course}</p>
            <p><strong>Amount Paid:</strong> $${registrationData.amount.toFixed(2)}</p>
            <p><strong>Payment Type:</strong> ${registrationData.paymentType}</p>
            <p><strong>Order ID:</strong> ${responseParams.order_id}</p>
            <p><strong>Transaction ID:</strong> ${responseParams.tracking_id}</p>
          </div>
          
          <p>Our team will contact you shortly with further details about the master class schedule and access information.</p>
          
          <p>If you have any questions, please don't hesitate to reach out to us.</p>
          
          <p>Best regards,<br>EduOcean Team</p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(studentMailOptions),
    ]);

    // Return success response with redirect URL for frontend
    return res.status(200).json({
      success: true,
      message: "Payment successful and confirmation emails sent!",
      orderStatus: responseParams.order_status,
      orderId: responseParams.order_id,
      trackingId: responseParams.tracking_id,
      amount: responseParams.amount,
      registrationData: registrationData,
    });
  } catch (error) {
    console.error("CCAvenue Response Handler Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process CCAvenue response",
      error: error.message,
    });
  }
};

// Handle CCAvenue payment cancellation
export const handleCCAvenueCancel = async (req, res) => {
  try {
    const { encResp } = req.body;

    if (!encResp) {
      return res.status(400).json({
        success: false,
        message: "No encrypted response received from CCAvenue",
      });
    }

    // Decrypt the response
    const decryptedResponse = decrypt(encResp, process.env.CCAVENUE_WORKING_KEY);
    const responseParams = parseCCAvenueResponse(decryptedResponse);

    return res.status(200).json({
      success: false,
      message: "Payment was cancelled by user",
      orderStatus: responseParams.order_status || "Cancelled",
      orderId: responseParams.order_id,
      statusMessage: responseParams.status_message,
    });
  } catch (error) {
    console.error("CCAvenue Cancel Handler Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process cancellation",
      error: error.message,
    });
  }
};
