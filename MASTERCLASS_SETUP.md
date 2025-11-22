# Master Class Registration & Razorpay Integration Setup

This document provides instructions for setting up the Master Class registration feature with Razorpay payment integration.

## Features Implemented

1. **Register Button** in Master Class Hero Section
2. **Multi-Step Checkout Page** with:
   - Step 1: Introduction
   - Step 2: Registration Form (with custom amount support)
   - Step 3: Review & Payment
   - Step 4: Success Confirmation
3. **Razorpay Payment Integration**
4. **Email Notifications** (to admin and student)
5. **Custom Amount Support** - Users can enter any amount they want to pay

## Prerequisites

- Node.js installed
- Razorpay account (for RAZORPAY_KEY_ID and RAZORPAY_SECRET)
- Gmail account for SMTP (or other email service)

## Backend Setup

### 1. Environment Variables

Add the following to your `server/.env` file:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret

# Email Configuration
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
ADMIN_EMAIL=admin@yourdomain.com

# Other existing variables
PORT=8080
CLIENT_URL=http://localhost:5173
```

### 2. Get Razorpay Credentials

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to Settings → API Keys
3. Generate Test/Live keys
4. Copy `Key ID` and `Key Secret` to your `.env` file

### 3. Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security → App Passwords
4. Generate a new app password for "Mail"
5. Use this password in `SMTP_PASSWORD`

### 4. Backend Files Created

- `server/controllers/masterclass.controller.js` - Handles order creation and payment verification
- `server/routes/masterclass.route.js` - API routes for masterclass registration
- Updated `server/index.js` - Registered masterclass routes

### 5. API Endpoints

- `POST /api/v1/masterclass/create-order` - Creates Razorpay order
- `POST /api/v1/masterclass/verify-payment` - Verifies payment and sends emails

## Frontend Setup

### 1. Environment Variables

Create a `client/.env` file:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_API_URL=http://localhost:8080/api/v1
```

**Note:** Use the same `RAZORPAY_KEY_ID` from your backend `.env` file.

### 2. Frontend Files Created/Modified

- `client/src/pages/masterclasses/MasterClassCheckout.jsx` - New checkout page
- `client/src/pages/masterclasses/components/HeroSection.jsx` - Added Register button
- `client/src/App.jsx` - Added checkout route
- `client/.env.example` - Environment variable template

## How It Works

### Registration Flow

1. **User clicks "Register Now"** button on Master Class page
2. **Redirected to Checkout Page** (`/master-classes/checkout`)
3. **Step 1**: Introduction screen
4. **Step 2**: User fills registration form:
   - Name, Email, Phone (required)
   - Course selection
   - Custom amount (can be changed)
   - Payment type (Full/Partial)
   - Optional notes
5. **Step 3**: Review details and initiate payment
6. **Razorpay Payment Gateway** opens
7. **Payment Processing**:
   - User completes payment
   - Backend verifies payment signature
   - Emails sent to admin and student
8. **Step 4**: Success confirmation displayed

### Payment Verification

The backend verifies payment using Razorpay's signature verification:

```javascript
const generatedSignature = crypto
  .createHmac("sha256", RAZORPAY_SECRET)
  .update(`${order_id}|${payment_id}`)
  .digest("hex");
```

### Email Notifications

Two emails are sent after successful payment:

1. **Admin Email**: Contains all registration details and payment info
2. **Student Email**: Confirmation with registration details

## Testing

### Test Mode

1. Use Razorpay **Test Keys** in development
2. Test card details:
   - Card Number: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date

### Production Mode

1. Switch to Razorpay **Live Keys**
2. Update environment variables
3. Test with small real transactions first

## Running the Application

### Start Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on: `http://localhost:8080`

### Start Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Accessing the Feature

1. Navigate to any Master Class page (e.g., `/master-classes/pmp`)
2. Click the green **"Register Now"** button in the hero section
3. Complete the registration and payment process

## Custom Amount Feature

Users can enter any amount they want to pay:

- Minimum: $1
- No maximum limit
- Amount is validated on both frontend and backend
- Razorpay processes the exact amount entered

## Troubleshooting

### Razorpay Script Not Loading

- Check internet connection
- Verify Razorpay CDN is accessible
- Check browser console for errors

### Payment Verification Fails

- Verify `RAZORPAY_SECRET` matches in backend
- Check signature generation logic
- Ensure payment was captured successfully

### Emails Not Sending

- Verify SMTP credentials
- Check Gmail app password is correct
- Ensure 2FA is enabled on Gmail account
- Check spam folder

### CORS Issues

- Verify `CLIENT_URL` in backend `.env`
- Check CORS configuration in `server/index.js`

## Security Considerations

1. **Never expose** `RAZORPAY_SECRET` on frontend
2. **Always verify** payment signature on backend
3. **Use HTTPS** in production
4. **Validate** all user inputs
5. **Store** payment records securely
6. **Use environment variables** for sensitive data

## Future Enhancements

- Add database model for masterclass registrations
- Implement registration history for users
- Add payment receipt generation
- Integrate with calendar for scheduling
- Add refund functionality
- Implement webhook for payment status updates

## Support

For issues or questions:
- Check Razorpay documentation: https://razorpay.com/docs/
- Review error logs in browser console and server terminal
- Verify all environment variables are set correctly

## License

This implementation is part of the EduOcean platform.
