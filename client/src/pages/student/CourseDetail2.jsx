import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { FaCertificate } from "react-icons/fa";
import { BadgeInfo, Check, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";

// ────────────────────────────────
// Small reusable helpers
// ────────────────────────────────
function SectionHeading({ children }) {
  return (
    <h2 className="font-bold text-xl md:text-2xl mb-3 text-center text-gray-800">
      {children}
    </h2>
  );
}

function ToggleText({ expanded, onToggle }) {
  return (
    <button
      className="mt-3 text-blue-600 hover:underline text-sm font-medium"
      onClick={onToggle}
    >
      {expanded ? "Show Less" : "Read More"}
    </button>
  );
}

// ────────────────────────────────
// Main Component
// ────────────────────────────────
export default function CourseDetail2() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [expandedLectureIdx, setExpandedLectureIdx] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showMore, setShowMore] = useState({});

  const batchesSectionRef = useRef(null);

  useEffect(() => {
    if (batchesSectionRef.current) {
      batchesSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedOption]);

  if (isLoading) return <h1 className="text-center mt-10">Loading…</h1>;
  if (isError || !data) return <h1 className="text-center mt-10">Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) navigate(`/course-progress/${courseId}`);
  };

  const handleBatchSelect = (batch, option) => {
    setSelectedBatch(batch);
    setSelectedOption(option);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setSelectedBatch(null); // reset batch selection on option change
  };



  return (
    <div className="mb-20">
      {/* ===== Banner ===== */}
      <header
        className="relative w-full text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, rgb(151,147,215) 0%, rgb(119,101,193) 20%, rgb(80,48,149) 40%, rgb(59,167,188) 60%, rgb(110,165,177) 80%)",
        }}
      >
        <div className="max-w-7xl mx-auto py-10 md:py-12 px-4 sm:px-6 md:px-12 space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold flex items-center gap-2 sm:gap-3">
            <FaCertificate className="text-yellow-400 text-2xl sm:text-3xl md:text-4xl animate-bounce" />
            {course?.courseTitle || "Course Title"}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200">{course?.subTitle || "Course Sub-title"}</p>
          <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-300">
            Created By{" "}
            <span className="text-blue-300 underline italic">{course?.creator?.name || "Instructor Name"}</span>
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-300">
            <BadgeInfo size={14} />
            <p>Last updated {course?.createdAt?.split("T")[0]}</p>
          </div>
        </div>
      </header>

      {/* ===== Overview + Video ===== */}
      <section className="max-w-7xl mx-auto mt-8 md:mt-12 grid gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:grid-cols-3">
        {/* Overview */}
        <div className="lg:col-span-2 rounded-2xl p-4 sm:p-6 border bg-[#fdf6e3] shadow-md sm:shadow-lg">
          <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-3 text-gray-800">🌟 Course Overview</h2>
          <div
            className={`prose max-w-none text-gray-700 leading-relaxed ${showFullOverview ? "" : "line-clamp-6"
              }`}
            dangerouslySetInnerHTML={{ __html: course.courseOverview }}
          />
          <ToggleText expanded={showFullOverview} onToggle={() => setShowFullOverview((s) => !s)} />
        </div>

        {/* Video */}
        <aside className="lg:col-span-1">
          <Card className="shadow-md sm:shadow-lg">
            <CardContent className="p-3 sm:p-4 flex flex-col">
              <div className="w-full aspect-video mb-3 sm:mb-4">
                {course?.lectures?.[0]?.videoUrl ? (
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={course.lectures[0].videoUrl}
                    controls
                    light={course?.courseThumbnail || "/default-thumbnail.jpg"}
                  />
                ) : (
                  <img
                    src={course?.courseThumbnail || "/default-thumbnail.jpg"}
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>

      {/* ===== Description ===== */}
      <section className="max-w-7xl mx-auto mt-8 md:mt-12 px-4 sm:px-6 md:px-8">
        <SectionHeading>Description</SectionHeading>
        <div
          className={`prose max-w-none text-gray-700 ${showFullDescription ? "" : "line-clamp-6"}`}
          dangerouslySetInnerHTML={{ __html: course?.description }}
        />
        <ToggleText expanded={showFullDescription} onToggle={() => setShowFullDescription((s) => !s)} />
      </section>

      {/* ===== Curriculum + Pricing ===== */}
      <section className="max-w-7xl mx-auto mt-8 md:mt-16 grid gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:grid-cols-3">
        {/* Curriculum */}
        <div className="lg:col-span-2">
          <Card className="shadow-md sm:shadow-lg">
            <CardHeader>
              <CardTitle>Curriculum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              {course?.lectures?.length ? (
                course.lectures.map((lecture, idx) => {
                  const isExpanded = idx === expandedLectureIdx;
                  return (
                    <div key={idx} className="border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div
                        onClick={() => setExpandedLectureIdx(isExpanded ? null : idx)}
                        className="flex justify-between items-center px-4 sm:px-5 h-14 sm:h-16 cursor-pointer"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </div>
                          <p className="text-sm sm:text-base font-medium">{lecture.lectureTitle}</p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="text-gray-500" size={18} />
                        ) : (
                          <ChevronDown className="text-gray-500" size={18} />
                        )}
                      </div>
                      {isExpanded && (
                        <div
                          className="px-4 sm:px-5 pb-3 sm:pb-4 text-sm sm:text-base text-gray-600"
                          dangerouslySetInnerHTML={{ __html: lecture.lectureDescription }}
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center">No lectures available.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Pricing */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky top-20">
            <Card className="shadow-md sm:shadow-lg">
              <CardContent className="p-3 sm:p-4">
                <h1 className="text-lg sm:text-xl md:text-xl font-semibold mb-2 sm:mb-3">Pricing Options</h1>

                <div className="space-y-2 sm:space-y-3">
                  {[
                    "Boost Your Skills, Elevate Your Career!",
                    "Your Growth Starts Here!",
                    "Turn Knowledge into Action!",
                    "Learn Fast, Earn Faster!",
                  ].map((text, i) => (
                    <div className="flex items-center mt-1 sm:mt-3 text-sm sm:text-base" key={i}>
                      <CheckCircle2 size={20} className="text-green-500 mx-1 sm:mx-2" />
                      <p>{text}</p>
                    </div>
                  ))}

                  {course?.pricingOptions?.map((option) => (
                    <label
                      key={option._id}
                      className={`flex items-center justify-between border rounded-xl px-3 sm:px-4 py-2 sm:py-3 cursor-pointer transition
                      ${selectedOption?._id === option._id ? "border-blue-500 ring-2 ring-blue-300" : "hover:bg-gray-100"}`}
                      onClick={() => handleSelectOption(option)}
                    >
                      <input
                        type="radio"
                        name="pricingOptionGlobal"
                        checked={selectedOption?._id === option._id}
                        readOnly
                        className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 accent-blue-600 border-gray-300"
                      />
                      <div className="flex justify-between w-full text-sm sm:text-base ml-2 sm:ml-3">
                        <span className="font-medium">{option.optionName}</span>
                        <span className="font-semibold">${option.price}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <Separator className="my-3 sm:my-4" />

                {selectedOption && (
                  <p className="text-xs sm:text-sm text-gray-700 mb-2">
                    Selected Option: <strong>{selectedOption.optionName}</strong>
                  </p>
                )}
                {selectedBatch && (
                  <p className="text-xs sm:text-sm text-green-700 mb-2 sm:mb-4">
                    Batch: <strong>{selectedBatch.batchName}</strong> ({selectedBatch.startDate} – {selectedBatch.endDate})
                  </p>
                )}
              </CardContent>

              <CardFooter className="flex justify-center p-3 sm:p-4">
                {purchased ? (
                  <Button onClick={handleContinueCourse} className="w-full text-sm sm:text-base">
                    Continue Course
                  </Button>
                ) : (
                  <BuyCourseButton courseId={courseId} selectedOption={selectedOption} selectedBatch={selectedBatch} />
                )}
              </CardFooter>
            </Card>
          </div>
        </aside>
      </section>

      {/* ===== Batches ===== */}
      <section className="mt-12 md:mt-16 py-8 md:py-10 bg-gray-50 border-t">
        <div className="max-w-3xl sm:max-w-4xl md:max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading>Select a Pricing Option & Batch</SectionHeading>

          {course?.pricingOptions?.length ? (
            course.pricingOptions.map((option) => (
              <div
                key={option._id}
                className="mb-6 md:mb-8 relative rounded-2xl border-2 border-gray-300 overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl transition"
              >
                {/* Corner highlights */}
                <div className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-indigo-500 rounded-tl-full"></div>

                {/* Option Header */}
                <div
                  className={`flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6 cursor-pointer ${selectedOption?._id === option._id ? "bg-blue-50" : "bg-white"
                    }`}
                  onClick={() => handleSelectOption(option)}
                >
                  <div className="flex items-center mb-2 sm:mb-0">
                    <input
                      type="radio"
                      name="priceOptionMain"
                      checked={selectedOption?._id === option._id}
                      onChange={() => handleSelectOption(option)}
                      className="mr-3 h-4 sm:h-5 w-4 sm:w-5 text-blue-600 accent-blue-600 border-gray-300"
                    />
                    <div className="flex flex-col">
                      <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                        {option.optionName} – ${option.price}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500">
                        Choose this option to start learning
                      </span>
                    </div>
                  </div>
                </div>

                {/* Batches */}
                {option.batches?.length && selectedOption?._id === option._id && (
                  <div ref={batchesSectionRef} className="p-4 sm:p-6 grid gap-3 sm:gap-4">
                    {(showMore[option._id] ? option.batches : option.batches.slice(0, 2)).map((batch) => {
                      const isSelected = selectedBatch?._id === batch._id;
                      return (
                        <label
                          key={batch._id}
                          className={`w-full flex items-center rounded-xl p-3 sm:p-5 transition-shadow duration-300 shadow-sm hover:shadow-md cursor-pointer ${isSelected
                              ? "bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-2 border-blue-600 scale-105"
                              : "bg-white border border-gray-200"
                            }`}
                        >
                          <input
                            type="radio"
                            name={`batch-${option._id}`}
                            className="hidden"
                            checked={isSelected}
                            onChange={() => handleBatchSelect(batch, option)}
                          />
                          <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full mr-3 sm:mr-4 ${isSelected ? "bg-white text-blue-500" : "bg-blue-100 text-blue-700"
                              }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 sm:h-6 sm:w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h4 className={`text-sm sm:text-lg md:text-xl font-semibold ${isSelected ? "text-white" : "text-gray-900"}`}>
                              {batch.batchName}
                            </h4>
                            <p className={`text-xs sm:text-sm md:text-base mt-1 ${isSelected ? "text-white/80" : "text-gray-600"}`}>
                              {batch.startDate} – {batch.endDate}
                            </p>
                          </div>
                        </label>
                      );
                    })}

                    {/* Show More button */}
                    {option.batches.length > 2 && (
                      <div className="flex justify-center mt-2 sm:mt-3">
                        <button
                          className="text-gray-700 font-medium flex items-center gap-1 hover:text-indigo-500 hover:underline transition-colors text-sm sm:text-base"
                          onClick={() =>
                            setShowMore((prev) => ({ ...prev, [option._id]: !prev[option._id] }))
                          }
                        >
                          {showMore[option._id] ? "Show Less" : "Show More"}
                          <span className={`transform transition-transform duration-300 ${showMore[option._id] ? "rotate-180" : ""}`}>
                            ▼
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 italic">No pricing options available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
