import React from "react";

const HeroSection = ({ timeLeft, onReserveClick }) => {
  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <section className="masterclass-hero">
      <div className="masterclass-hero-inner masterclass-container">
        {/* Left Column: Content */}
        <div className="masterclass-hero-content">
          <h1 className="masterclass-hero-title">
            Pass Your PMP in 10 Days : Learn 
            the Exact Strategy LIVE
          </h1>

          <p className="masterclass-hero-subtitle">
            A fast, proven, exam-ready method to help you confidently clear PMP® -
            even if you&apos;re starting late or feeling stuck.
          </p>

          <div className="masterclass-hero-price">
            <span className="masterclass-hero-price-original">$50</span>
            <span className="masterclass-hero-price-current">FREE Today</span>
            <span className="masterclass-hero-price-note">(Limited Seats)</span>
          </div>

          <div className="masterclass-hero-countdown">
            <p className="masterclass-hero-countdown-label">
              Next Session Starts In
            </p>
            <div className="masterclass-countdown-grid">
              <div className="masterclass-countdown-item">
                <span>{days}</span>
                <small>Days</small>
              </div>
              <div className="masterclass-countdown-item">
                <span>{hours}</span>
                <small>Hours</small>
              </div>
              <div className="masterclass-countdown-item">
                <span>{minutes}</span>
                <small>Minutes</small>
              </div>
              <div className="masterclass-countdown-item">
                <span>{seconds}</span>
                <small>Seconds</small>
              </div>
            </div>
          </div>

          <button
            className="masterclass-btn-primary"
            onClick={onReserveClick}
          >
            Reserve Your Free Seat Now
          </button>

          <p className="masterclass-hero-secondary-cta">
            Want faster results?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                console.log("Book a 1:1 Strategy Call");
              }}
            >
              Book a 1:1 Strategy Call
            </a>
          </p>
        </div>

        {/* Right Column: Tutor Image */}
        <div className="masterclass-hero-image-wrap">
          <img
            src="/Instructor.svg"
            alt="PMP Instructor"
            className="masterclass-hero-image"
          />
        </div>
      </div>

      {/* Badges row */}
      <div className="masterclass-hero-benefits-bar">
        <div className="masterclass-container">
          <div className="masterclass-hero-benefits">
            <div className="masterclass-benefit-card">
              <i className="masterclass-benefit-icon fa-solid fa-hand-pointer"></i>
              <span>Hands-On Learning</span>
            </div>

            <div className="masterclass-benefit-card">
              <i className="masterclass-benefit-icon fa-solid fa-chalkboard-teacher"></i>
              <span>Expert-Led Training</span>
            </div>

            <div className="masterclass-benefit-card">
              <i className="masterclass-benefit-icon fa-solid fa-rocket"></i>
              <span>Future-Proof Your Career</span>
            </div>

            <div className="masterclass-benefit-card">
              <i className="masterclass-benefit-icon fa-solid fa-user-group"></i>
              <span>Career Guidance &amp; Support</span>
            </div>

            <div className="masterclass-benefit-card masterclass-benefit-wide">
              <i className="masterclass-benefit-icon fa-solid fa-magnifying-glass-chart"></i>
              <span>Real-World Case Studies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling strip */}
      <div className="masterclass-hero-strip">
        <div className="masterclass-hero-strip-inner">
          <div className="masterclass-hero-strip-item">
            ⏰ 10:30 AM EST | 6:30 PM UAE
          </div>
          <div className="masterclass-hero-strip-item">🔖 Limited Seats!</div>
          <div className="masterclass-hero-strip-item">⏳ Hurry Up!</div>
          <div className="masterclass-hero-strip-item">🚀 Upskill Now!</div>
          <div className="masterclass-hero-strip-item">
            📅 22nd November, Saturday
          </div>

          {/* duplicate for loop effect */}
          <div className="masterclass-hero-strip-item">
            ⏰ 10:30 AM EST | 6:30 PM UAE
          </div>
          <div className="masterclass-hero-strip-item">🔖 Limited Seats!</div>
          <div className="masterclass-hero-strip-item">⏳ Hurry Up!</div>
          <div className="masterclass-hero-strip-item">🚀 Upskill Now!</div>
          <div className="masterclass-hero-strip-item">
            📅 22nd November, Saturday
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
