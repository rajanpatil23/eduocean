import React from "react";
import { WHO_IS_THIS_FOR } from "./constants";

const WhoSection = ({ onReserveClick }) => {
  const renderItem = (text, index) => (
    <div className="who-item" key={text}>
      <div className="who-icon-wrapper">
        <i className="fa-solid fa-circle-check who-check-icon"></i>
      </div>
      <span className="who-item-text">{text}</span>
    </div>
  );

  return (
    <section className="who-section">
      <div className="who-header">
        <h2 className="who-title">Who Is This Session For?</h2>
      </div>

      <div className="who-grid">
        <div className="who-column">
          {WHO_IS_THIS_FOR.left.map((item, idx) => renderItem(item, idx))}
        </div>
        <div className="who-column">
          {WHO_IS_THIS_FOR.right.map((item, idx) => renderItem(item, idx))}
        </div>
      </div>

      <div className="learn-cta-wrapper" style={{marginTop: '3rem'}}>
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

export default WhoSection;
