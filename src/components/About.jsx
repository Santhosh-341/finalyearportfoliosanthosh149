export default function About() {
  return (
    <section className="container about" id="about">
      <div>
        <h2 className="section-title word-reveal">
          Half builder, half scientist.
        </h2>
        <p>
          I’m a final-year <span className="accent">B.Tech CSE</span> student at
          Audisankara College of Engineering & Technology, pursuing graduation
          in 2027 with a CGPA of 8.0. My work sits at the intersection of
          reliable engineering and user-centered products.
        </p>
        <p>
          I specialize in{' '}
          <span className="accent">
            HTML, CSS, JavaScript, React, Node.js, Express.js, and MySQL
          </span>
          , and I’m building toward a career as a software engineer who can ship
          complete solutions end to end.
        </p>
        <p>
          I’m especially motivated by practical systems like agriculture tech
          and booking platforms, where product thinking and clean execution matter
          just as much as code quality.
        </p>
      </div>
      <div className="about-card reveal">
        <img
          src="assets/photo2.jpeg"
          alt="Portrait of Santhosh Kumar Reddy Gajjala"
        />
        <div className="facts-list">
          <div className="fact">
            <span>Name</span>
            <strong>Santhosh Kumar Reddy GAJJALA</strong>
          </div>
          <div className="fact">
            <span>Role</span>
            <strong>Full Stack Developer</strong>
          </div>
          <div className="fact">
            <span>Location</span>
            <strong>Andhra Pradesh, India</strong>
          </div>
          <div className="fact">
            <span>Degree</span>
            <strong>B.Tech CSE</strong>
          </div>
          <div className="fact">
            <span>Focus</span>
            <strong>Web apps & APIs</strong>
          </div>
          <div className="fact">
            <span>Status</span>
            <strong>Open to internships</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
