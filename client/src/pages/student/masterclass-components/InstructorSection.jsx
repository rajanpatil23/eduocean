import React from "react";
import { INSTRUCTOR_INFO } from "./constants";

const InstructorSection = () => {
  return (
    <section className="instructor-section">
      <h2 className="instructor-title">Meet Your Expert Trainer</h2>

      <div className="instructor-wrapper">
        <div className="instructor-avatar-wrap">
          <div className="instructor-avatar-ring">
            <img
              src="/Instructor.svg"
              alt="PMP Instructor"
              className="instructor-avatar"
            />
          </div>
        </div>

        <div className="instructor-card">
          <div className="instructor-name">
            {INSTRUCTOR_INFO.name}
          </div>
          <div className="instructor-role">{INSTRUCTOR_INFO.title}</div>
          <div className="instructor-org">{INSTRUCTOR_INFO.organization}</div>

          <div className="instructor-skill-grid">
            {INSTRUCTOR_INFO.experience.map((exp) => (
              <div key={exp} className="instructor-skill">
                <span className="instructor-skill-check">✓</span>
                <span>{exp}</span>
              </div>
            ))}
          </div>

          <p className="instructor-desc" style={{ fontWeight: 600, marginBottom: '1rem' }}>
            {INSTRUCTOR_INFO.achievement}
          </p>

          <p className="instructor-desc">
            {INSTRUCTOR_INFO.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
