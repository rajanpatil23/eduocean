import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_your_key";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

export default function MasterClassCheckout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "PMP",
    amount: 199,
    notes: "",
    ptype: "Full",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextToReview = () => {
    if (!form.name || !form.email || !form.phone || !form.amount) {
      alert("Please fill all required fields");
      return;
    }
    if (form.amount < 1) {
      alert("Amount must be at least $1");
      return;
    }
    setStep(3);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!form.name || !form.email || !form.phone || !form.amount) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load Razorpay SDK. Please check your internet connection.");
        setLoading(false);
        return;
      }

      // Create order on backend
      const { data } = await axios.post(
        `${API_URL}/masterclass/create-order`,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          course: form.course,
          amount: form.amount,
          notes: form.notes,
          paymentType: form.ptype,
        }
      );

      if (!data.success) {
        alert("Failed to create order. Please try again.");
        setLoading(false);
        return;
      }

      // Razorpay options
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "EduOcean",
        description: `${form.course} Master Class Registration`,
        order_id: data.orderId,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post(
              `${API_URL}/masterclass/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                registrationData: {
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  course: form.course,
                  amount: form.amount,
                  notes: form.notes,
                  paymentType: form.ptype,
                },
              }
            );

            if (verifyResponse.data.success) {
              setStep(4);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification failed. Please contact support with your payment ID.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            alert("Payment cancelled. Please try again.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Bar */}
        <div className="flex gap-3 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex flex-1 items-center gap-3 p-3 rounded-xl transition-all ${
                step >= i ? "bg-blue-100" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold ${
                  step >= i ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                }`}
              >
                {i}
              </div>
              <div className="text-sm font-medium">
                {i === 1 && "Start"}
                {i === 2 && "Details"}
                {i === 3 && "Review"}
                {i === 4 && "Success"}
              </div>
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-bold">Start your certification journey</div>
                <div className="text-gray-500 text-sm">
                  Trusted courses • Flexible timings • Instant certificate
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Register Now
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Enter your details</h2>

            <div className="grid grid-cols-1 gap-4">
              <input
                name="name"
                placeholder="Full Name *"
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.name}
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="email"
                  type="email"
                  placeholder="Email *"
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <input
                  name="phone"
                  placeholder="Phone *"
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="course"
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.course}
                  onChange={handleChange}
                >
                  <option>PMP</option>
                  <option>CISSP</option>
                  <option>CSM</option>
                  <option>Scrum</option>
                  <option>DevOps</option>
                  <option>AWS</option>
                  <option>Azure</option>
                  <option>ITIL</option>
                </select>

                <input
                  name="amount"
                  type="number"
                  min="1"
                  placeholder="Amount (USD) *"
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <textarea
                name="notes"
                placeholder="Notes (optional)"
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.notes}
                onChange={handleChange}
                rows="3"
              />

              <div className="mt-2">
                <label className="mr-4 inline-flex items-center">
                  <input
                    type="radio"
                    name="ptype"
                    value="Full"
                    checked={form.ptype === "Full"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Full Payment</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="ptype"
                    value="Partial"
                    checked={form.ptype === "Partial"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Partial Payment</span>
                </label>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Previous
                </button>
                <button
                  onClick={nextToReview}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex-1 hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW + PAYMENT */}
        {step === 3 && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Review */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-3">Review Details</h2>
              <div className="text-sm space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Name</span>
                  <span>{form.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Email</span>
                  <span>{form.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Phone</span>
                  <span>{form.phone}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Course</span>
                  <span>{form.course}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Amount</span>
                  <span className="text-lg font-bold text-blue-600">${form.amount}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Payment Type</span>
                  <span>{form.ptype}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Notes</span>
                  <span className="text-right">{form.notes || "-"}</span>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="bg-gray-300 mt-4 w-full py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Previous
              </button>
            </div>

            {/* Payment */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-3">Payment</h2>
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  You will be redirected to Razorpay's secure payment gateway to complete your payment.
                </p>
              </div>

              <div className="mb-4">
                <div className="text-2xl font-bold text-center text-blue-600">
                  ${form.amount}
                </div>
                <div className="text-center text-sm text-gray-500">Total Amount</div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loading ? "Processing..." : "Pay Now with Razorpay"}
              </button>

              <div className="mt-4 text-xs text-center text-gray-500">
                <p>🔒 Secure payment powered by Razorpay</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 4 && (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              Thank you, {form.name}! Your registration for {form.course} Master Class is confirmed.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              A confirmation email has been sent to {form.email}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate("/master-classes")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Back to Master Classes
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    course: "PMP",
                    amount: 199,
                    notes: "",
                    ptype: "Full",
                  });
                }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                New Registration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
