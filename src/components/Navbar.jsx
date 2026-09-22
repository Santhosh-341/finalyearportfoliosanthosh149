import { useEffect, useState } from 'react';
import LinkPreview from './originkit/ui/link-preview-variant-3';
import NeonBorder from './originkit/ui/neon-border';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState('00:00 IST');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const navItems = [
    { label: 'Projects', url: '#projects', color: 'var(--cyan)', preview: '/assets/preview_projects.png' },
    { label: 'About', url: '#about', color: 'var(--neon)', preview: '/assets/preview_about.png' },
    { label: 'Stack', url: '#stack', color: '#10b981', preview: '/assets/preview_stack.png' },
    { label: 'Experience', url: '#experience', color: '#00f5ff', preview: '/assets/preview_experience.png' },
    { label: 'Certificates', url: '#certificates', color: '#f59e0b', preview: '/assets/cert_quizoff.png' },
    { label: 'Contact', url: '#contact', color: '#f43f5e', preview: '/assets/preview_contact.png' },
  ];

  return (
    <nav
      id="nav"
      style={{
        position: 'fixed',
        top: 0,
        insetInline: 0,
        padding: isScrolled ? '12px 0' : '20px 0',
        zIndex: 200,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'visible',
          width: '100%',
        }}
      >
        <div
          className={isScrolled ? 'nav-scrolled-capsule' : ''}
          style={{
            width: isScrolled ? 'min(980px, 95%)' : '100%',
            transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            background: isScrolled ? 'rgba(7, 6, 13, 0.85)' : 'transparent',
            boxShadow: isScrolled ? '0 20px 48px rgba(0, 0, 0, 0.45)' : 'none',
            backdropFilter: isScrolled ? 'blur(16px)' : 'none',
            border: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '9999px',
            padding: isScrolled ? '8px 24px' : '0',
            overflow: 'visible',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            className="nav-wrap"
            style={{
              width: '100%',
              padding: isScrolled ? '4px 8px' : '12px 0',
              transition: 'all 0.3s ease',
            }}
          >
            <a className="brand" href="#top" aria-label="Go to top">
              <span className="brand-mark">L</span>
              <span>Santhosh.dev</span>
            </a>

            <div className="nav-links" aria-label="Primary navigation">
              {navItems.map((item) => (
                <NeonBorder key={item.label} variant="variant-4" color1={item.color} color2={item.color} borderRadius="9999px" hoverReaction={true}>
                  <LinkPreview url={item.url} previewImage={item.preview} color={item.color}>{item.label}</LinkPreview>
                </NeonBorder>
              ))}
            </div>

            <div className="nav-meta">
              <span id="live-clock">{timeStr}</span>
              <span className="status-pill">
                <span className="dot"></span>available
              </span>
            </div>

            <button
              type="button"
              className="mobile-menu-toggle"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mobile-menu-backdrop ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      />

      <aside className={`mobile-menu-panel ${isMenuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        <div className="mobile-menu-header">
          <span className="brand-mark">L</span>
          <span className="mobile-menu-title">Menu</span>
          <button
            type="button"
            className="mobile-menu-close"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="mobile-menu-links">
          {navItems.map((item) => (
            <a key={item.label} href={item.url} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      </aside>
    </nav>
  );
}
