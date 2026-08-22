import { useEffect, useRef, useState } from 'react';
import ScatterText from './originkit/ui/dot-scatter';
import ArrowRevealButton from './originkit/ui/arrow-reveal-button';
import LabelSlideButton from './originkit/ui/label-slide-button';
import { AsciiPortrait } from './originkit/ui/hero-32/ascii-portrait';

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
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px', 
            margin: '0 0 24px 0', 
            maxWidth: '100%',
            overflow: 'visible'
          }}
        >
          <div style={{ height: 'clamp(65px, 12vw, 105px)', width: '100%' }}>
            <ScatterText text="Building" color="var(--text)" align="left" variant="word" cellScale={4.5} fillRatio={0.82} style={{ height: '100%', minHeight: 'unset' }} />
          </div>
          <div style={{ height: 'clamp(65px, 12vw, 105px)', width: '100%' }}>
            <ScatterText text="practical" color="var(--cyan)" align="left" variant="word" cellScale={4.5} fillRatio={0.82} style={{ height: '100%', minHeight: 'unset' }} />
          </div>
          <div style={{ height: 'clamp(65px, 12vw, 105px)', width: '100%' }}>
            <ScatterText text="intelligent" color="url(#scatter-gradient)" align="left" variant="word" cellScale={4.5} fillRatio={0.82} style={{ height: '100%', minHeight: 'unset' }} />
          </div>
          <div style={{ height: 'clamp(65px, 12vw, 105px)', width: '100%' }}>
            <ScatterText text="products." color="var(--neon)" align="left" variant="word" cellScale={4.5} fillRatio={0.82} style={{ height: '100%', minHeight: 'unset' }} />
          </div>
        </div>
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
          <LabelSlideButton
            label="See projects"
            link="#projects"
            newTab={false}
            colors={{
              fill: 'var(--neon)',
              textColor: '#ffffff',
              hoverFill: 'var(--cyan)',
              hoverTextColor: '#07060d'
            }}
            font={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.95rem',
              fontWeight: '600',
              letterSpacing: '-0.01em',
            }}
            icon={{
              side: 'right',
              type: 'symbol',
              restSymbol: '→',
              hoverSymbol: '→',
              background: 'rgba(255, 255, 255, 0.12)',
              hoverBackground: '#07060d',
              color: '#ffffff',
              hoverColor: '#22d3ee',
              size: 12,
              padding: 7,
              angle: 0
            }}
            gap={12}
            padding="12px 18px 12px 24px"
            rounded={100}
            style={{
              height: '46px',
            }}
          />
          <ArrowRevealButton
            label="Let’s connect"
            link="#contact"
            newTab={false}
            colors={{ fill: 'rgba(255, 255, 255, 0.03)', textColor: 'var(--text)' }}
            border={{ borderColor: 'rgba(255, 255, 255, 0.12)', borderStyle: 'solid', borderWidth: 1 }}
            font={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.95rem',
              fontWeight: '600',
              letterSpacing: '-0.01em',
            }}
            icon={{
              side: 'right',
              position: 'right',
              type: 'icon',
              icon: 'arrow',
              background: 'linear-gradient(135deg, var(--neon) 0%, var(--cyan) 100%)',
              color: '#ffffff',
              size: 24,
              iconSize: 14,
              padding: 8,
              restAngle: 0,
              hoverAngle: 45
            }}
            gap={16}
            padding="12px 20px 12px 24px"
            rounded={100}
            style={{
              height: '46px',
            }}
          />
        </div>
      </div>

      <div className="hero-visual" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div
          ref={photoCardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            width: 'min(400px, 100%)',
            height: '520px',
            maxHeight: '70vh',
            borderRadius: '36px',
            overflow: 'hidden',
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.015)',
            border: '3px solid rgba(34, 211, 238, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out',
            boxShadow: '0 20px 56px rgba(0, 0, 0, 0.55), inset 0 0 40px rgba(34, 211, 238, 0.16)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <AsciiPortrait />
        </div>
      </div>
    </section>
  );
}
