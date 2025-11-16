import React from "react";

const CtaSection = ({ onReserveClick }) => {
  return (
    <section className="cta-section">
      <div className="masterclass-container">
        <div className="cta-card">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Pass Your PMP Exam?
            </h2>
            <p className="cta-subtitle">
              Join our FREE live masterclass and learn the proven 10-day strategy to clear your PMP certification with confidence.
            </p>
            
            <div className="cta-highlights">
              <div className="cta-highlight-item">
                <i className="fa-solid fa-check-circle cta-highlight-icon"></i>
                <span>100% FREE Session</span>
              </div>
              <div className="cta-highlight-item">
                <i className="fa-solid fa-check-circle cta-highlight-icon"></i>
                <span>Limited Seats Available</span>
              </div>
              <div className="cta-highlight-item">
                <i className="fa-solid fa-check-circle cta-highlight-icon"></i>
                <span>Live Q&A with Expert</span>
              </div>
            </div>

            <button
              className="masterclass-btn-primary cta-button"
              onClick={onReserveClick}
            >
              Reserve Your Free Seat Now →
            </button>

            <p className="cta-note">
              ⏰ Next session starts soon • <span className="cta-price-strike">$50</span> FREE today
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
