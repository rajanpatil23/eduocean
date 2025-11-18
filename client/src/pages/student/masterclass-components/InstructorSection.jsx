import React from "react";

const InstructorSection = ({ config }) => {
  const instructor = config.instructor;
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
            {instructor.name}
          </div>
          <div className="instructor-role">{instructor.title}</div>
          <div className="instructor-org">{instructor.organization}</div>

          <div className="instructor-skill-grid">
            {instructor.experience.map((exp) => (
              <div key={exp} className="instructor-skill">
                <span className="instructor-skill-check">✓</span>
                <span>{exp}</span>
              </div>
            ))}
          </div>

          <p className="instructor-desc" style={{ fontWeight: 600, marginBottom: '1rem' }}>
            {instructor.achievement}
          </p>

          <p className="instructor-desc">
            {instructor.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
