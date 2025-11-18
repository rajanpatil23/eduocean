import React, { useState } from "react";
import { X } from "lucide-react";
import { useSubmitContactFormMutation } from "@/features/api/authApi";

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    termsAccepted: false,
  });
  
  const [submitContactForm, { isLoading, error, isSuccess }] = useSubmitContactFormMutation();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactForm(formData).unwrap();
      setFormData({ name: "", email: "", phone: "", message: "", termsAccepted: false });
      // Optionally close modal after successful submission
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg w-full max-w-6xl relative flex flex-col md:flex-row overflow-y-auto max-h-screen">
        {/* Left Section */}
        <div className="w-full md:w-1/2 md:pr-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Please Drop a Message
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Get in touch and let me know how I can help. Fill out the form, and I'll be in touch as soon as possible.
          </p>

          <div className="mt-6 space-y-4">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <span className="text-xl text-gray-500 dark:text-gray-400">📍</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Address:</p>
                <p className="text-gray-600 dark:text-gray-300">
                  <b>A1 Eduocean Solutions Private limited</b> <br />
                  45, 3rd Floor Village Dun, Near Yadav Hospital, Industrial Complex Dund, Industrial Complex Dundahera, Gurgaon, Industrial Complex Dundahera, Haryana, India, 122016
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <span className="text-xl text-gray-500 dark:text-gray-400">📞</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Phone:</p>
                <p className="text-gray-600 dark:text-gray-300">+12019754817, +919569720281</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <span className="text-xl text-gray-500 dark:text-gray-400">✉️</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Email:</p>
                <p className="text-gray-600 dark:text-gray-300">info@theduocean.org</p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://www.linkedin.com/company/theeduocean/?viewAsMember=true"
              className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-white hover:w-36 transition-all overflow-hidden"
            >
              <span className="hidden group-hover:inline whitespace-nowrap mr-2">LinkedIn</span>💼
            </a>
            <a
              href="https://www.facebook.com/TheEduOcean"
              className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white hover:w-36 transition-all overflow-hidden"
            >
              <span className="hidden group-hover:inline whitespace-nowrap mr-2">Facebook</span>📘
            </a>
            <a
              href="https://www.youtube.com/@theeduocean"
              className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-800 text-white hover:w-36 transition-all overflow-hidden"
            >
              <span className="hidden group-hover:inline whitespace-nowrap mr-2">YouTube</span>▶️
            </a>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 bg-white dark:bg-gray-700 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            <X size={24} />
          </button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                Your Email <span className="text-xs">(Required)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 outline-none"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 mb-2">
                Phone Number <span className="text-xs">(Required)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                Your Message <span className="text-xs">(Required)</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 outline-none"
              />
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
              <label htmlFor="terms" className="text-gray-700 dark:text-gray-300 text-sm">
                I agree to the{" "}
                <a href="/terms.html" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                  Terms and Conditions
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !formData.termsAccepted}
              className={`w-full py-3 px-6 bg-blue-500 text-white rounded-lg font-semibold transition ${
                isLoading || !formData.termsAccepted ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>

          {/* Feedback Message */}
          {isSuccess && <p className="mt-4 text-green-500 text-center">Your message was submitted successfully!</p>}
          {error && <p className="mt-4 text-red-500 text-center">Failed to submit. Please try again.</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
