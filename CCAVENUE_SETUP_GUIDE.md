# CCAvenue Payment Gateway Integration Guide

## Overview
This guide provides complete instructions for setting up CCAvenue payment gateway alongside Razorpay for the EduOcean masterclass checkout system.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Environment Variables](#environment-variables)
5. [Testing](#testing)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### 1. CCAvenue Account
- Register at [CCAvenue](https://www.ccavenue.com/)
- Complete KYC verification
- Get approved merchant account

### 2. Required Credentials from CCAvenue
After approval, you'll receive:
- **Merchant ID**: Your unique merchant identifier
- **Access Code**: Used for API authentication
- **Working Key**: Encryption key for secure data transmission

### 3. System Requirements
- Node.js >= 14.x
- npm or yarn
- Existing Razorpay integration (already present)

---

## Backend Setup

### Step 1: Install Dependencies
No additional npm packages needed - we use built-in Node.js `crypto` module for encryption.

### Step 2: Configure Environment Variables

Create or update `server/.env`:

```env
# ==================== CCAVENUE PAYMENT GATEWAY ====================
# Merchant ID provided by CCAvenue
CCAVENUE_MERCHANT_ID=your_merchant_id_here

# Access Code provided by CCAvenue

# Working Key (Encryption Key) provided by CCAvenue
CCAVENUE_WORKING_KEY=your_working_key_here

# Redirect URLs (Update with your actual domain in production)
CCAVENUE_REDIRECT_URL=http://localhost:8080/api/v1/masterclass/ccavenue-response
CCAVENUE_CANCEL_URL=http://localhost:8080/api/v1/masterclass/ccavenue-cancel
```

### Step 3: Verify Backend Files

The following files have been created/updated:

1. **`server/utils/ccavenue.js`** - Encryption/decryption utilities
2. **`server/controllers/masterclass.controller.js`** - Payment handlers
3. **`server/routes/masterclass.route.js`** - API routes

### Step 4: Test Backend Endpoints

```bash
# Start the server
cd server
npm run dev
```

The following endpoints are now available:
- `POST /api/v1/masterclass/ccavenue-create-order` - Create CCAvenue order
- `POST /api/v1/masterclass/ccavenue-response` - Handle payment success
- `POST /api/v1/masterclass/ccavenue-cancel` - Handle payment cancellation

---

## Frontend Setup

### Step 1: Configure Environment Variables

Create or update `client/.env`:

```env
# ==================== API CONFIGURATION ====================
VITE_API_URL=http://localhost:8080/api/v1

# ==================== RAZORPAY CONFIGURATION ====================
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id

# ==================== CCAVENUE CONFIGURATION ====================
# Set to 'true' to enable CCAvenue payment option
VITE_CCAVENUE_ENABLED=true
```

### Step 2: Verify Frontend Files

The following file has been updated:
- **`client/src/pages/masterclasses/MasterClassCheckout.jsx`** - Payment UI with CCAvenue support

### Step 3: Start Frontend

```bash
# Start the client
cd client
npm run dev
```

---

## Environment Variables Reference

### Server Environment Variables (.env)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `CCAVENUE_MERCHANT_ID` | Your CCAvenue Merchant ID | `123456` | Yes |
| `CCAVENUE_ACCESS_CODE` | CCAvenue Access Code | `ABCD12345678` | Yes |
| `CCAVENUE_WORKING_KEY` | CCAvenue Working/Encryption Key | `1234567890ABCDEF` | Yes |
| `CCAVENUE_REDIRECT_URL` | Success callback URL | `http://localhost:8080/api/v1/masterclass/ccavenue-response` | Yes |
| `CCAVENUE_CANCEL_URL` | Cancel callback URL | `http://localhost:8080/api/v1/masterclass/ccavenue-cancel` | Yes |

### Client Environment Variables (.env)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8080/api/v1` | Yes |
| `VITE_CCAVENUE_ENABLED` | Enable CCAvenue option | `true` or `false` | No (default: false) |
| `VITE_RAZORPAY_KEY_ID` | Razorpay public key | `rzp_test_xxxxx` | Yes |

---

## Testing

### Test Mode Setup

1. **Get Test Credentials**
   - Login to CCAvenue dashboard
   - Navigate to Settings > Test Mode
   - Copy test credentials

2. **Update Environment Variables**
   ```env
   CCAVENUE_MERCHANT_ID=test_merchant_id
   CCAVENUE_ACCESS_CODE=test_access_code
   CCAVENUE_WORKING_KEY=test_working_key
   ```

3. **Test Payment Flow**
   - Go to `http://localhost:3000/master-classes/checkout`
   - Fill in registration details
   - Select CCAvenue as payment method
   - Click "Pay Now with CCAvenue"
   - Use test card details provided by CCAvenue

### Test Card Details (CCAvenue Test Mode)

```
Card Number: 4111111111111111
CVV: 123
Expiry: Any future date
Name: Test User
```

### Testing Checklist

- [ ] CCAvenue payment option appears when `VITE_CCAVENUE_ENABLED=true`
- [ ] Can switch between Razorpay and CCAvenue
- [ ] CCAvenue redirects to payment gateway
- [ ] Successful payment redirects back correctly
- [ ] Confirmation emails are sent
- [ ] Payment cancellation is handled properly
- [ ] Error scenarios are handled gracefully

---

## Production Deployment

### Step 1: Get Production Credentials

1. Complete CCAvenue production approval process
2. Get production credentials from CCAvenue dashboard
3. Configure production redirect URLs in CCAvenue dashboard

### Step 2: Update Environment Variables

**Server (.env)**
```env
# Production CCAvenue Credentials
CCAVENUE_MERCHANT_ID=prod_merchant_id
CCAVENUE_ACCESS_CODE=prod_access_code
CCAVENUE_WORKING_KEY=prod_working_key

# Production URLs (replace with your domain)
CCAVENUE_REDIRECT_URL=https://yourdomain.com/api/v1/masterclass/ccavenue-response
CCAVENUE_CANCEL_URL=https://yourdomain.com/api/v1/masterclass/ccavenue-cancel
```

**Client (.env)**
```env
VITE_API_URL=https://yourdomain.com/api/v1
VITE_CCAVENUE_ENABLED=true
```

### Step 3: Security Checklist

- [ ] HTTPS enabled on production server
- [ ] Environment variables stored securely
- [ ] No sensitive keys in version control
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose sensitive info
- [ ] Logging configured for payment transactions

### Step 4: CCAvenue Dashboard Configuration

1. Login to CCAvenue production dashboard
2. Go to Settings > Integration
3. Add your redirect URLs:
   - Success URL: `https://yourdomain.com/api/v1/masterclass/ccavenue-response`
   - Cancel URL: `https://yourdomain.com/api/v1/masterclass/ccavenue-cancel`
4. Save and test

---

## Troubleshooting

### Common Issues

#### 1. "Encryption failed" Error
**Cause**: Invalid working key
**Solution**: 
- Verify `CCAVENUE_WORKING_KEY` in `.env`
- Ensure no extra spaces or quotes
- Check if using correct key (test vs production)

#### 2. "Invalid Access Code" Error
**Cause**: Incorrect access code
**Solution**:
- Verify `CCAVENUE_ACCESS_CODE` in `.env`
- Ensure it matches CCAvenue dashboard

#### 3. Payment Gateway Not Loading
**Cause**: Network/CORS issues
**Solution**:
- Check browser console for errors
- Verify CCAvenue URL is accessible
- Check if test/production mode matches credentials

#### 4. Redirect URL Not Working
**Cause**: URL mismatch with CCAvenue dashboard
**Solution**:
- Verify URLs in CCAvenue dashboard match `.env` values
- Ensure URLs are publicly accessible (for production)
- Check server logs for incoming requests

#### 5. "No encrypted response" Error
**Cause**: CCAvenue not sending response
**Solution**:
- Check if payment was completed
- Verify redirect URLs are correct
- Check CCAvenue dashboard for transaction status

### Debug Mode

Enable detailed logging:

```javascript
// In server/controllers/masterclass.controller.js
console.log('CCAvenue Request Data:', ccavenueData);
console.log('Encrypted Request:', encryptedData);
console.log('CCAvenue Response:', decryptedResponse);
```

### Support Contacts

- **CCAvenue Support**: support@ccavenue.com
- **CCAvenue Phone**: +91-22-6740 4444
- **Documentation**: https://www.ccavenue.com/developers.jsp

---

## Payment Flow Diagram

```
User fills form → Selects CCAvenue → Clicks Pay Now
                                          ↓
                              Backend creates encrypted order
                                          ↓
                              User redirected to CCAvenue
                                          ↓
                              User completes payment
                                          ↓
                    CCAvenue redirects to success/cancel URL
                                          ↓
                    Backend decrypts and validates response
                                          ↓
                          Sends confirmation emails
                                          ↓
                          Shows success page to user
```

---

## Security Best Practices

1. **Never expose sensitive keys**
   - Keep `.env` files out of version control
   - Use environment-specific configurations
   - Rotate keys periodically

2. **Validate all inputs**
   - Sanitize user inputs
   - Validate amounts and data types
   - Check for SQL injection attempts

3. **Secure communication**
   - Use HTTPS in production
   - Verify SSL certificates
   - Enable HSTS headers

4. **Monitor transactions**
   - Log all payment attempts
   - Set up alerts for failures
   - Regular audit of transactions

5. **Handle errors gracefully**
   - Don't expose system details in errors
   - Provide user-friendly messages
   - Log detailed errors server-side

---

## Additional Resources

- [CCAvenue Integration Guide](https://www.ccavenue.com/developers.jsp)
- [CCAvenue API Documentation](https://www.ccavenue.com/api_documentation.jsp)
- [Node.js Crypto Documentation](https://nodejs.org/api/crypto.html)

---

## Support

For issues or questions:
1. Check this guide first
2. Review CCAvenue documentation
3. Check server logs for errors
4. Contact CCAvenue support if needed

---

**Last Updated**: 2024
**Version**: 1.0.0
