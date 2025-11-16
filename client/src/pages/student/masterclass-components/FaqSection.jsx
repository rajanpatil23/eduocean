import React, { useState } from "react";
import { FAQ_ITEMS } from "./constants";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-list-wrapper">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.q}
              className={`faq-item ${isOpen ? "open" : ""}`}
            >
              <div
                className="faq-header"
                onClick={() => toggle(index)}
              >
                <div className="faq-question">{item.q}</div>
                <div className="faq-toggle-icon">▾</div>
              </div>
              {isOpen && (
                <div className="faq-answer">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
