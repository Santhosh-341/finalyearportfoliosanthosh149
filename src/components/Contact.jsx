export default function Contact() {
  return (
    <section className="container" id="contact">
      <div className="contact-card reveal">
        <h2 className="contact-title">
          Got a problem worth <span className="accent">solving?</span>
        </h2>
        <a className="contact-email" href="mailto:santhureddy085@example.com">
          santhureddy085@example.com <span className="arrow">↗</span>
        </a>
        <div className="footer-grid">
          <div>
            <strong>Elsewhere</strong>
            <div>
              <a
                href="https://www.linkedin.com/in/santhosh-kumar-reddy-gajjala?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div>
              <a
                href="https://github.com/Santhosh-341"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          <div>
            <strong>Direct</strong>
            <div>
              <a href="tel:+917780497986">+91 77804 97986</a>
            </div>
            <div>
              <a href="mailto:santhureddy085@example.com">Email</a>
            </div>
          </div>
          <div>
            <strong>Status</strong>
            <div>Final-year student</div>
            <div>Open to internships</div>
          </div>
        </div>
        <div className="footer-line">
          built with intention. powered by curiosity. ◆
        </div>
      </div>
    </section>
  );
}
