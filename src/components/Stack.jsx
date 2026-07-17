export default function Stack() {
  return (
    <section className="container" id="stack">
      <h2 className="section-title word-reveal">
        Stack I use daily
      </h2>
      <div className="stack-grid">
        <div className="stack-column reveal">
          <h4>Languages</h4>
          <span className="stack-pill purple">
            <span className="bullet"></span>HTML
          </span>
          <span className="stack-pill cyan">
            <span className="bullet"></span>CSS
          </span>
          <span className="stack-pill pink">
            <span className="bullet"></span>JavaScript
          </span>
          <span className="stack-pill green">
            <span className="bullet"></span>SQL
          </span>
          <span className="stack-pill purple">
            <span className="bullet"></span>C
          </span>
          <span className="stack-pill cyan">
            <span className="bullet"></span>Python
          </span>
        </div>

        <div className="stack-column reveal">
          <h4>Frontend</h4>
          <span className="stack-pill purple">
            <span className="bullet"></span>React
          </span>
          <span className="stack-pill cyan">
            <span className="bullet"></span>HTML/CSS
          </span>
          <span className="stack-pill pink">
            <span className="bullet"></span>Responsive UI
          </span>
          <span className="stack-pill mixed">
            <span className="bullet"></span>Accessibility
          </span>
        </div>

        <div className="stack-column reveal">
          <h4>Backend</h4>
          <span className="stack-pill purple">
            <span className="bullet"></span>Node.js
          </span>
          <span className="stack-pill cyan">
            <span className="bullet"></span>Express.js
          </span>
          <span className="stack-pill pink">
            <span className="bullet"></span>REST APIs
          </span>
          <span className="stack-pill mixed">
            <span className="bullet"></span>MySQL
          </span>
          <span className="stack-pill green">
            <span className="bullet"></span>Postman
          </span>
        </div>

        <div className="stack-column reveal">
          <h4>Tools</h4>
          <span className="stack-pill purple">
            <span className="bullet"></span>Git
          </span>
          <span className="stack-pill cyan">
            <span className="bullet"></span>GitHub
          </span>
          <span className="stack-pill pink">
            <span className="bullet"></span>VS Code
          </span>
          <span className="stack-pill mixed">
            <span className="bullet"></span>Vercel
          </span>
        </div>
      </div>
    </section>
  );
}
