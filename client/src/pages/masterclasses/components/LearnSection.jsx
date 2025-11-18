import React from "react";

const LearnSection = ({ onReserveClick, config }) => {
  const items = config.learningItems;
  return (
    <section className="learn-section">
      <h2 className="learn-title">What You'll Learn</h2>

      <div className="learn-card">
        <div className="learn-grid">
          {items.map((item) => (
            <div
              key={item.id}
              className={`learn-item ${item.color}`}
            >
              ● {item.text}
            </div>
          ))}
        </div>
      </div>

      <div className="learn-cta-wrapper">
        <button
          className="masterclass-btn-primary"
          onClick={onReserveClick}
        >
          Reserve Your Free Seat →
        </button>
        
      </div>
    </section>
  );
};

export default LearnSection;



