import React, { useState } from "react";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { useSubmitContactFormAdvisorMutation } from "@/features/api/authApi";

export default function PopForm({ onClose }) {
  const { data, isLoading, isError, error } = useGetPublishedCourseQuery();
  const courses = data?.courses || [];
  const [submitContact, { isLoading: isSubmitting }] =
    useSubmitContactFormAdvisorMutation();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    certification: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.fullName || !form.email || !form.phone || !form.certification) {
      setStatus({ type: "error", message: "Please fill all required fields." });
      return;
    }

    try {
      await submitContact({
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        courseTitle: form.certification,
      }).unwrap();

      setStatus({
        type: "success",
        message: "✅ Thank you! Your details have been sent to our advisor.",
      });

      setForm({
        fullName: "",
        email: "",
        phone: "",
        certification: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "❌ Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 sm:px-4">
      <div className="relative w-full max-w-sm sm:max-w-lg rounded-2xl bg-white dark:bg-gray-900 p-4 sm:p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-lg sm:text-xl"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="mb-4 sm:mb-6 flex justify-center">
          <img
            src="https://theduocean.com/assets/theeduoceanlogo-BSIZdgZ3.png"
            alt="Company Logo"
            className="h-10 w-auto sm:h-14 object-contain"
          />
        </div>

        <h2 className="mb-2 text-center text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
          Get Certified with Us
        </h2>
        <p className="mb-4 sm:mb-6 text-center text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Fill in your details and select the course you’re interested in.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Full Name
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Contact Number
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base"
              placeholder="Enter your contact number"
            />
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Select Course
            </label>
            {isLoading ? (
              <p className="mt-2 text-sm text-gray-500">Loading courses…</p>
            ) : isError ? (
              <p className="mt-2 text-sm text-red-500">
                {error?.data?.message || "Failed to load courses"}
              </p>
            ) : (
              <select
                name="certification"
                value={form.certification}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base"
              >
                <option value="">-- Choose a Course --</option>
                {courses.map((c) => (
                  <option key={c._id} value={c.courseTitle}>
                    {c.courseTitle}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-2.5 sm:py-3 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 text-sm sm:text-base"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>

          {status.message && (
            <p
              className={`mt-3 text-center text-sm font-medium ${
                status.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
