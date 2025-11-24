# CCAvenue Payment Gateway Integration Plan

## Overview
Add CCAvenue as an additional payment option alongside existing Razorpay integration for masterclass checkout.

## Backend Changes

### 1. Install Dependencies
```bash
npm install ccavenue
```

### 2. Environment Variables (server/.env)
```
# CCAvenue Configuration
CCAVENUE_MERCHANT_ID=your_merchant_id
CCAVENUE_ACCESS_CODE=your_access_code
CCAVENUE_WORKING_KEY=your_working_key
CCAVENUE_REDIRECT_URL=http://localhost:8080/api/v1/masterclass/ccavenue-response
CCAVENUE_CANCEL_URL=http://localhost:8080/api/v1/masterclass/ccavenue-cancel
```

### 3. Create CCAvenue Utility (server/utils/ccavenue.js)
- Encryption/Decryption functions
- Request data formatting

### 4. Update Controller (server/controllers/masterclass.controller.js)
- Add `createCCAvenueOrder` function
- Add `handleCCAvenueResponse` function
- Add `handleCCAvenueCancel` function

### 5. Update Routes (server/routes/masterclass.route.js)
- POST /ccavenue-create-order
- POST /ccavenue-response
- POST /ccavenue-cancel

## Frontend Changes

### 1. Environment Variables (client/.env)
```
VITE_CCAVENUE_ENABLED=true
```

### 2. Update Checkout Component (client/src/pages/masterclasses/MasterClassCheckout.jsx)
- Add payment method selection (Razorpay/CCAvenue)
- Add CCAvenue payment handler
- Create hidden form for CCAvenue redirect

### 3. Create CCAvenue Response Pages
- Success page
- Failure page

## Security Considerations
1. All sensitive data encrypted using CCAvenue working key
2. Server-side signature verification
3. HTTPS required in production
4. Secure storage of credentials in environment variables
5. Input validation and sanitization
6. CSRF protection for form submissions

## Testing Checklist
- [ ] Test CCAvenue payment flow
- [ ] Test Razorpay payment flow
- [ ] Test payment method switching
- [ ] Test success scenarios
- [ ] Test failure scenarios
- [ ] Test email notifications
- [ ] Verify encryption/decryption
- [ ] Test in both development and production modes
