import React from "react";
import { LEARNING_ITEMS } from "./constants";

const LearnSection = ({ onReserveClick }) => {
  return (
    <section className="learn-section">
      <h2 className="learn-title">What You'll Learn</h2>

      <div className="learn-card">
        <div className="learn-grid">
          {LEARNING_ITEMS.map((item) => (
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



