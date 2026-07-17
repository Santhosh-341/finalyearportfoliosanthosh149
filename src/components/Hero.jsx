import { useEffect, useRef, useState } from 'react';

const words = [
  'APIs',
  'databases',
  'interfaces',
  'deployments',
  'products',
];

export default function Hero({ isReady }) {
  const [typedText, setTypedText] = useState('APIs');
  const photoCardRef = useRef(null);

  // Typing effect loop
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 4; // length of 'APIs' initially
    let isDeleting = true; // start deleting after 'APIs' is loaded or just standard typeLoop
    let timeoutId = null;

    // Start fresh typing cycle
    isDeleting = false;
    wordIndex = 0;
    charIndex = 0;

    const typeLoop = () => {
      const word = words[wordIndex];
      if (!isDeleting) {
        setTypedText(word.slice(0, charIndex + 1));
        charIndex += 1;
        if (charIndex === word.length) {
          isDeleting = true;
          timeoutId = setTimeout(typeLoop, 1800);
          return;
        }
      } else {
        setTypedText(word.slice(0, charIndex - 1));
        charIndex -= 1;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      timeoutId = setTimeout(typeLoop, isDeleting ? 60 : 110);
    };

    timeoutId = setTimeout(typeLoop, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  // Card 3D tilt effect on mousemove
  const handleMouseMove = (e) => {
    if (!photoCardRef.current) return;
    const rect = photoCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    photoCardRef.current.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (!photoCardRef.current) return;
    photoCardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0px)';
  };

  return (
    <section className={`hero container ${isReady ? 'ready' : ''}`}>
      <div>
        <div className="eyebrow">
          <span className="dot"></span>Full Stack Developer • Open to work • Open to Internships
        </div>
        <h1>
          <span className="hero-line">Building</span>
          <span className="hero-line">practical</span>
          <span className="hero-line">
            <span className="accent-text">intelligent</span>
          </span>
          <span className="hero-line">products.</span>
        </h1>
        <div className="typing-chip" aria-label="Core focus keywords">
          <span className="prompt">→</span>
          <span className="typed-word">{typedText}</span>
          <span className="typed-cursor"></span>
        </div>
        <p>
          I’m <code>Santhosh Kumar Reddy GAJJALA</code>, a final-year Computer
          Science student crafting polished <code>REST APIs</code>,{' '}
          <code>MySQL-backed</code> products, and thoughtful <code>React</code>{' '}
          interfaces. I enjoy turning real problems into reliable full-stack
          experiences, especially in booking systems, agriculture tech, and
          practical web tools.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            See projects
          </a>
          <a className="btn btn-ghost" href="#contact">
            Let’s connect
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div
          ref={photoCardRef}
          className="photo-card"
          id="photo-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="assets/photo2.jpeg"
            alt="Portrait of Santhosh Kumar Reddy Gajjala"
          />
          <div className="scan" aria-hidden="true"></div>
          <div className="hud-bracket tl"></div>
          <div className="hud-bracket tr"></div>
          <div className="hud-bracket bl"></div>
          <div className="hud-bracket br"></div>
          <div className="agent-card">
            <small>Current focus</small>
            <strong>
              Building a reliable booking platform for farmers with a clean
              admin workflow.
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
