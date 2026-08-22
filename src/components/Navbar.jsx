import { useEffect, useState } from 'react';
import LinkPreview from './originkit/ui/link-preview-variant-3';
import NeonBorder from './originkit/ui/neon-border';

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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease',
            }}
          >
            <a className="brand" href="#top" aria-label="Go to top">
              <span className="brand-mark">L</span>
              <span>Santhosh.dev</span>
            </a>
            <div className="nav-links" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <NeonBorder variant="variant-4" color1="var(--cyan)" color2="var(--cyan)" borderRadius="9999px" hoverReaction={true}>
                <LinkPreview url="#projects" previewImage="/assets/preview_projects.png" color="var(--cyan)">Projects</LinkPreview>
              </NeonBorder>
              
              <NeonBorder variant="variant-4" color1="var(--neon)" color2="var(--neon)" borderRadius="9999px" hoverReaction={true}>
                <LinkPreview url="#about" previewImage="/assets/preview_about.png" color="var(--neon)">About</LinkPreview>
              </NeonBorder>
              
              <NeonBorder variant="variant-4" color1="#10b981" color2="#10b981" borderRadius="9999px" hoverReaction={true}>
                <LinkPreview url="#stack" previewImage="/assets/preview_stack.png" color="#10b981">Stack</LinkPreview>
              </NeonBorder>
              
              <NeonBorder variant="variant-4" color1="#00f5ff" color2="#00f5ff" borderRadius="9999px" hoverReaction={true}>
                <LinkPreview url="#experience" previewImage="/assets/preview_experience.png" color="#00f5ff">Experience</LinkPreview>
              </NeonBorder>
              
              <NeonBorder variant="variant-4" color1="#f59e0b" color2="#f59e0b" borderRadius="9999px" hoverReaction={true}>
                <LinkPreview url="#certificates" previewImage="/assets/cert_quizoff.png" color="#f59e0b">certificates</LinkPreview>
              </NeonBorder>
              
              <NeonBorder variant="variant-4" color1="#f43f5e" color2="#f43f5e" borderRadius="9999px" hoverReaction={true}>
                <LinkPreview url="#contact" previewImage="/assets/preview_contact.png" color="#f43f5e">Contact</LinkPreview>
              </NeonBorder>
            </div>
            <div className="nav-meta">
              <span id="live-clock">{timeStr}</span>
              <span className="status-pill">
                <span className="dot"></span>available
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
