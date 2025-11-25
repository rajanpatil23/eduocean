import dotenv from "dotenv";
import { encrypt, formatCCAvenueRequest } from "./utils/ccavenue.js";

dotenv.config();

console.log("\n=== CCAvenue Configuration Test ===\n");

// Check if environment variables are set
console.log("1. Environment Variables Check:");
console.log("   CCAVENUE_MERCHANT_ID:", process.env.CCAVENUE_MERCHANT_ID ? "✓ Set" : "✗ Missing");
console.log("   CCAVENUE_ACCESS_CODE:", process.env.CCAVENUE_ACCESS_CODE ? "✓ Set" : "✗ Missing");
console.log("   CCAVENUE_WORKING_KEY:", process.env.CCAVENUE_WORKING_KEY ? "✓ Set" : "✗ Missing");
console.log("   CCAVENUE_REDIRECT_URL:", process.env.CCAVENUE_REDIRECT_URL ? "✓ Set" : "✗ Missing");
console.log("   CCAVENUE_CANCEL_URL:", process.env.CCAVENUE_CANCEL_URL ? "✓ Set" : "✗ Missing");

console.log("\n2. Working Key Details:");
console.log("   Length:", process.env.CCAVENUE_WORKING_KEY?.length || 0, "characters");
console.log("   First 4 chars:", process.env.CCAVENUE_WORKING_KEY?.substring(0, 4) || "N/A");
console.log("   Last 4 chars:", process.env.CCAVENUE_WORKING_KEY?.substring(process.env.CCAVENUE_WORKING_KEY.length - 4) || "N/A");

console.log("\n3. Test Encryption:");
try {
  const testData = {
    merchant_id: process.env.CCAVENUE_MERCHANT_ID,
    order_id: "TEST_123",
    currency: "USD",
    amount: "1.00",
    redirect_url: process.env.CCAVENUE_REDIRECT_URL,
    cancel_url: process.env.CCAVENUE_CANCEL_URL,
    language: "EN",
    billing_name: "Test User",
    billing_email: "test@example.com",
    billing_tel: "1234567890",
    billing_address: "Test Address",
    billing_city: "Test City",
    billing_state: "Test State",
    billing_zip: "12345",
    billing_country: "USA",
  };

  const requestString = formatCCAvenueRequest(testData);
  console.log("   Request String (first 100 chars):", requestString.substring(0, 100) + "...");
  
  const encrypted = encrypt(requestString, process.env.CCAVENUE_WORKING_KEY);
  console.log("   ✓ Encryption successful");
  console.log("   Encrypted length:", encrypted.length, "characters");
  console.log("   Encrypted (first 50 chars):", encrypted.substring(0, 50) + "...");
} catch (error) {
  console.log("   ✗ Encryption failed:", error.message);
}

console.log("\n4. Common Issues to Check:");
console.log("   - Working Key should be 32 characters (hexadecimal)");
console.log("   - No extra spaces or line breaks in .env file");
console.log("   - Working Key is case-sensitive");
console.log("   - Make sure you're using the correct key (test vs production)");

console.log("\n5. Test URL:");
console.log("   https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction");
console.log("   (Use https://test.ccavenue.com/... for test credentials)");

console.log("\n=== End of Test ===\n");
