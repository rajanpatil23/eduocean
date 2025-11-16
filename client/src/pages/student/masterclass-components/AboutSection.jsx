import React from "react";
import { ABOUT_CONTENT } from "./constants";

const AboutSection = ({ onReserveClick }) => {
  const highlights = [
    { icon: "fa-hand-pointer", text: "Hands-On Learning" },
    { icon: "fa-chalkboard-teacher", text: "Expert-Led Training" },
    { icon: "fa-rocket", text: "Future-Proof Your Career" },
    { icon: "fa-user-group", text: "Career Guidance & Support" },
    { icon: "fa-magnifying-glass-chart", text: "Real-World Case Studies" },
    { icon: "fa-certificate", text: "Certification Focused" }
  ];

  return (
    <section className="about-masterclass">
      <div className="about-masterclass-inner">
        <h2 className="about-title">{ABOUT_CONTENT.title}</h2>
        
        <p className="about-subtitle">
          {ABOUT_CONTENT.description}
        </p>

        {/* Key Highlights Grid */}
        <div className="about-highlights-grid">
          {highlights.map((item, index) => (
            <div key={index} className="about-highlight-card">
              <i className={`fa-solid ${item.icon} about-highlight-icon`}></i>
              <span className="about-highlight-text">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="about-cta-wrap">
          <button className="masterclass-btn-primary" onClick={onReserveClick}>
            Reserve Your Free Seat →
          </button>
          <p className="about-cta-note">
            Limited seats available • <span className="about-price-strikethrough">$50</span> FREE • Live session only
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
