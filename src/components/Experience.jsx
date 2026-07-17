export default function Experience() {
  return (
    <section className="container" id="experience">
      <h2 className="section-title word-reveal">
        Experience and focus
      </h2>
      <div className="experience-list">
        <div className="experience-item reveal">
          <div className="experience-meta">
            <small>2024 — Present</small>
            <strong>Full Stack Development Student</strong>
          </div>
          <div className="experience-body">
            <h4>Building practical applications from scratch</h4>
            <p>
              Designing and building complete web products with clear
              architecture, relational databases, and user-facing features
              that solve daily problems.
            </p>
            <ul>
              <li>Built REST APIs with Node.js and Express.js</li>
              <li>Connected frontend interfaces to backend services</li>
              <li>Modeled and connected MySQL schemas for real projects</li>
              <li>Used Git and GitHub to manage version-controlled builds</li>
            </ul>
          </div>
        </div>

        <div className="experience-item reveal">
          <div className="experience-meta">
            <small>2026 — Present</small>
            <strong>Full Stack Developer (MERN)</strong>
          </div>
          <div className="experience-body">
            <h4>Industry-oriented MERN internship experience</h4>
            <p>
              Completed an industry-oriented MERN Stack internship through{' '}
              <strong>CSC India</strong> under the{' '}
              <strong>APSCHE Student Internship Initiative</strong>, gaining
              hands-on experience in building scalable web applications from
              frontend to backend.
            </p>
            <ul>
              <li>Built complete CRUD applications using the MERN Stack</li>
              <li>Developed secure REST APIs with Express.js and Node.js</li>
              <li>Designed relational databases using MySQL</li>
              <li>Connected React frontend with backend APIs</li>
              <li>Implemented authentication and API testing workflows</li>
              <li>Used Git, GitHub, and Postman throughout development</li>
            </ul>
          </div>
        </div>

        <div className="experience-item reveal">
          <div className="experience-meta">
            <small>Academic</small>
            <strong>Project-led learning</strong>
          </div>
          <div className="experience-body">
            <h4>Turning coursework into product thinking</h4>
            <p>
              Taking academic work beyond the assignment by focusing on
              maintainability, user experience, and deployment readiness.
            </p>
            <ul>
              <li>Shipped an agriculture booking platform with user and owner flows</li>
              <li>Improved API reliability through testing and structured routes</li>
              <li>Applied responsive design patterns for mobile-first experiences</li>
              <li>Preparing for software engineering placements with system design practice</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
