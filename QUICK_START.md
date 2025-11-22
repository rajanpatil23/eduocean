# Quick Start Guide - Master Class Registration

## 🚀 What Was Added

A complete registration and payment system for Master Classes with:
- ✅ "Register Now" button in hero section
- ✅ Multi-step checkout page
- ✅ Razorpay payment integration
- ✅ Custom amount support
- ✅ Email notifications

## ⚡ Quick Setup (3 Steps)

### Step 1: Configure Client Environment

Edit `client/.env`:
```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
VITE_API_URL=http://localhost:8080/api/v1
```

### Step 2: Verify Server Environment

Your `server/.env` should have:
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_secret
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
ADMIN_EMAIL=admin@yourdomain.com
```

### Step 3: Start & Test

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

Visit: `http://localhost:5173/master-classes/pmp`
Click: Green "Register Now" button

## 🧪 Test Payment

Use these test credentials in Razorpay:
- Card: `4111 1111 1111 1111`
- CVV: `123`
- Expiry: `12/25`

## 📧 Get Razorpay Keys

1. Go to: https://dashboard.razorpay.com/
2. Sign up/Login
3. Settings → API Keys
4. Copy Key ID and Secret

## 📧 Setup Gmail for Emails

1. Enable 2FA on your Gmail account
2. Go to: Google Account → Security → App Passwords
3. Generate password for "Mail"
4. Use in `SMTP_PASSWORD`

## ✅ That's It!

Your master class registration with Razorpay is ready!

For detailed documentation, see `MASTERCLASS_SETUP.md`
