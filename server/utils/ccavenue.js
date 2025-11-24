import crypto from "crypto";

/**
 * CCAvenue Encryption and Decryption Utility
 * Uses AES-128-CBC encryption as required by CCAvenue
 */

// Encrypt data using CCAvenue working key
export function encrypt(plainText, workingKey) {
  try {
    const m = crypto.createHash("md5");
    m.update(workingKey);
    const key = m.digest();
    const iv = Buffer.from([
      0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
      0x0c, 0x0d, 0x0e, 0x0f,
    ]);
    const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
    let encoded = cipher.update(plainText, "utf8", "hex");
    encoded += cipher.final("hex");
    return encoded;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Encryption failed");
  }
}

// Decrypt data received from CCAvenue
export function decrypt(encText, workingKey) {
  try {
    const m = crypto.createHash("md5");
    m.update(workingKey);
    const key = m.digest();
    const iv = Buffer.from([
      0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
      0x0c, 0x0d, 0x0e, 0x0f,
    ]);
    const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    let decoded = decipher.update(encText, "hex", "utf8");
    decoded += decipher.final("utf8");
    return decoded;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Decryption failed");
  }
}

// Format data for CCAvenue request
export function formatCCAvenueRequest(data) {
  const params = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      params.push(`${key}=${encodeURIComponent(data[key])}`);
    }
  }
  return params.join("&");
}

// Parse CCAvenue response
export function parseCCAvenueResponse(responseString) {
  const params = {};
  const pairs = responseString.split("&");
  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    if (key && value) {
      params[key] = decodeURIComponent(value);
    }
  }
  return params;
}

// Generate order ID
export function generateOrderId(prefix = "MC") {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}_${timestamp}_${random}`;
}

// Validate CCAvenue response
export function validateCCAvenueResponse(params) {
  const requiredFields = [
    "order_id",
    "tracking_id",
    "bank_ref_no",
    "order_status",
    "payment_mode",
    "card_name",
    "status_code",
    "status_message",
    "currency",
    "amount",
  ];

  for (const field of requiredFields) {
    if (!params[field]) {
      return {
        valid: false,
        message: `Missing required field: ${field}`,
      };
    }
  }

  return {
    valid: true,
    message: "Response is valid",
  };
}
