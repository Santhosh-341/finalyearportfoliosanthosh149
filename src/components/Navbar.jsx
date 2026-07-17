import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState('00:00 IST');

  useEffect(() => {
    // Scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    // Clock update logic
    const updateClock = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
      });
      setTimeStr(`${formatter.format(now)} IST`);
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <nav id="nav" className={isScrolled ? 'scrolled' : ''}>
      <div className="container nav-wrap">
        <a className="brand" href="#top" aria-label="Go to top">
          <span className="brand-mark">L</span>
          <span>Santhosh.dev</span>
        </a>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#stack">Stack</a>
          <a href="#experience">Experience</a>
          <a href="#certificates">certificates</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-meta">
          <span id="live-clock">{timeStr}</span>
          <span className="status-pill">
            <span className="dot"></span>available
          </span>
        </div>
      </div>
    </nav>
  );
}
