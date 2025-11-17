import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { useSubmitContactFormAdvisorMutation } from "@/features/api/authApi";

const MasterClasses = () => {
  const navigate = useNavigate();
  const { data: coursesData, isLoading: coursesLoading } = useGetPublishedCourseQuery();
  const courses = coursesData?.courses || [];
  const [submitContact, { isLoading: isSubmitting }] = useSubmitContactFormAdvisorMutation();

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

  // Master classes data - 2 featured, rest past events
  const masterClasses = [
    {
      id: 1,
      title: "PMP Certification Masterclass",
      description: "Intensive workshop covering PMP exam strategies and project management best practices",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
      date: "2025-02-15",
      time: "10:30 AM - 11:30 AM EST",
      instructor: "The Edu Ocean Expert",
      isPast: false
    },
    {
      id: 2,
      title: "AWS Solutions Architect Bootcamp",
      description: "Master AWS architecture patterns and prepare for SAA-C03 certification",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
      date: "2024-11-22",
      time: "9:00 AM - 5:00 PM",
      instructor: "Priya Sharma, AWS Certified",
      isPast: true
    },
    {
      id: 3,
      title: "CISSP Security Fundamentals",
      description: "Comprehensive cybersecurity training for CISSP certification preparation",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop",
      date: "2024-12-10",
      time: "1:00 PM - 5:00 PM",
      instructor: "Amit Patel, CISSP",
      isPast: true
    },
    {
      id: 4,
      title: "Scrum Master Certification Workshop",
      description: "Agile methodologies and CSM certification exam preparation",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=300&fit=crop",
      date: "2024-11-20",
      time: "10:00 AM - 3:00 PM",
      instructor: "Sneha Reddy, CSM",
      isPast: true
    },
    {
      id: 5,
      title: "Azure Administrator Intensive",
      description: "Hands-on training for AZ-104 Microsoft Azure Administrator certification",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
      date: "2024-10-15",
      time: "9:00 AM - 4:00 PM",
      instructor: "Vikram Singh, Azure Expert",
      isPast: true
    },
    {
      id: 6,
      title: "ITIL 4 Foundation Masterclass",
      description: "IT service management best practices and ITIL 4 certification prep",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      date: "2024-09-28",
      time: "11:00 AM - 3:00 PM",
      instructor: "Kavita Desai, ITIL Expert",
      isPast: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#141414]">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&h=600&fit=crop')"
          }}
        ></div>
        {/* Dark Overlay Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 dark:from-black/80 dark:to-blue-900/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Master Classes
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
            Join our expert-led intensive sessions to accelerate your career and master industry-leading certifications
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Industry Certifications</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span>Flexible Schedule</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Master Class Cards - 3 cards taking 75% */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masterClasses.map((masterClass) => (
              <div
                key={masterClass.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
                  masterClass.isPast 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'transform hover:scale-105'
                }`}
              >
                <div className="relative">
                  <img
                    src={masterClass.image}
                    alt={masterClass.title}
                    className="w-full h-48 object-cover"
                  />
                  {masterClass.isPast && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">Past Event</span>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {masterClass.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {masterClass.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">📅 Date:</span>
                      <span>{new Date(masterClass.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">⏰ Time:</span>
                      <span>{masterClass.time}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">By {masterClass.instructor}</span>
                    </div>
                  </div>

                  <button
                    disabled={masterClass.isPast}
                    onClick={() => {
                      if (masterClass.id === 1) {
                        navigate('/master-classes/pmp-certification');
                      }
                    }}
                    className={`mt-4 w-full py-2 rounded-lg font-medium transition-colors ${
                      masterClass.isPast
                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {masterClass.isPast ? 'Event Ended' : 'Register Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Registration Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="mb-6 text-center">
                <img
                  src="https://theduocean.com/assets/theeduoceanlogo-BSIZdgZ3.png"
                  alt="Company Logo"
                  className="h-12 w-auto mx-auto object-contain mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Get Certified with Us
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Fill in your details to register for a master class
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Full Name *
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 dark:bg-gray-700 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 dark:bg-gray-700 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Contact Number *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 dark:bg-gray-700 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your contact number"
                    required
                  />
                </div>

                {/* Course Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Select Course *
                  </label>
                  {coursesLoading ? (
                    <p className="text-sm text-gray-500">Loading courses…</p>
                  ) : (
                    <select
                      name="certification"
                      value={form.certification}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 dark:bg-gray-700 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
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
                  className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>

                {status.message && (
                  <p
                    className={`text-center text-sm font-medium ${
                      status.type === "success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterClasses;
