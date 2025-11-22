import Razorpay from "razorpay";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

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
