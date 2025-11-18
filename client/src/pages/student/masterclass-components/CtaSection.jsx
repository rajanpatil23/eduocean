import React from "react";

const CtaSection = ({ onReserveClick, config }) => {
  const title = config.ctaTitle;
  const subtitle = config.ctaSubtitle;
  
  return (
    <section className="cta-section">
      <div className="masterclass-container">
        <div className="cta-card">
          <div className="cta-content">
            <h2 className="cta-title">
              {title}
            </h2>
            <p className="cta-subtitle">
              {subtitle}
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
