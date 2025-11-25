import dotenv from "dotenv";
import { encrypt, formatCCAvenueRequest } from "./utils/ccavenue.js";

dotenv.config();

console.log("\n=== CCAvenue Request Debug ===\n");

// Test data matching your actual request
const testData = {
  merchant_id: process.env.CCAVENUE_MERCHANT_ID,
  order_id: "MC_TEST_123456",
  currency: "USD",
  amount: "199.00",
  redirect_url: process.env.CCAVENUE_REDIRECT_URL,
  cancel_url: process.env.CCAVENUE_CANCEL_URL,
  language: "EN",
  billing_name: "Test User",
  billing_address: "NA",
  billing_city: "NA",
  billing_state: "NA",
  billing_zip: "000000",
  billing_country: "United States",
  billing_tel: "1234567890",
  billing_email: "test@example.com",
  delivery_name: "Test User",
  delivery_address: "NA",
  delivery_city: "NA",
  delivery_state: "NA",
  delivery_zip: "000000",
  delivery_country: "United States",
  delivery_tel: "1234567890",
  merchant_param1: "PMP",
  merchant_param2: "Full",
  merchant_param3: "NA",
  merchant_param4: "test@example.com",
  merchant_param5: "1234567890",
};

console.log("1. Request Data:");
console.log(JSON.stringify(testData, null, 2));

console.log("\n2. Formatted Request String:");
const requestString = formatCCAvenueRequest(testData);
console.log(requestString);

console.log("\n3. Encrypted Request:");
const encrypted = encrypt(requestString, process.env.CCAVENUE_WORKING_KEY);
console.log("Length:", encrypted.length);
console.log("First 100 chars:", encrypted.substring(0, 100));

console.log("\n4. Form Data to Submit:");
console.log("URL: https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction");
console.log("Method: POST");
console.log("Parameters:");
console.log("  - encRequest:", encrypted.substring(0, 50) + "...");
console.log("  - access_code:", process.env.CCAVENUE_ACCESS_CODE);

console.log("\n5. Environment Check:");
console.log("  - CCAVENUE_MERCHANT_ID:", process.env.CCAVENUE_MERCHANT_ID);
console.log("  - CCAVENUE_ACCESS_CODE:", process.env.CCAVENUE_ACCESS_CODE);
console.log("  - CCAVENUE_WORKING_KEY length:", process.env.CCAVENUE_WORKING_KEY?.length);
console.log("  - CCAVENUE_REDIRECT_URL:", process.env.CCAVENUE_REDIRECT_URL);
console.log("  - CCAVENUE_CANCEL_URL:", process.env.CCAVENUE_CANCEL_URL);

console.log("\n6. Common Issues to Check:");
console.log("  ❓ Is your Merchant ID correct?");
console.log("  ❓ Is your Access Code correct?");
console.log("  ❓ Is your Working Key exactly 32 characters?");
console.log("  ❓ Are you using PRODUCTION credentials with PRODUCTION URL?");
console.log("  ❓ Are you using TEST credentials with TEST URL?");
console.log("  ❓ Is your account activated by CCAvenue?");

console.log("\n7. Test URLs:");
console.log("  Production: https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction");
console.log("  Test: https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction");

console.log("\n=== End Debug ===\n");
