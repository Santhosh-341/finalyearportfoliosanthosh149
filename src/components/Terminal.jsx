import { useEffect, useRef, useState } from 'react';

const lines = [
  { id: 1, text: '$ npm run dev', className: '', delay: 0 },
  { id: 2, text: '> starting local server...', className: 'cyan', delay: 220 },
  { id: 3, text: '>> building routes for booking dashboard', className: 'muted', delay: 440 },
  { id: 4, text: '✓ API connected to MySQL · 1.6s', className: 'green', delay: 660 },
  { id: 5, text: '$ curl http://localhost:3000/api/health', className: '', delay: 880 },
  { id: 6, text: '> response: 200 OK', className: 'cyan', delay: 1100 },
  { id: 7, text: '✓ ready to ship', className: 'green', delay: 1320 },
];

export default function Terminal() {
  const [visibleLineIds, setVisibleLineIds] = useState(new Set());
  const [showCursor, setShowCursor] = useState(false);
  const containerRef = useRef(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;

          // Animate each line in order
          lines.forEach((line) => {
            setTimeout(() => {
              setVisibleLineIds((prev) => {
                const next = new Set(prev);
                next.add(line.id);
                return next;
              });
            }, line.delay);
          });

          // Show flashing cursor line
          setTimeout(() => {
            setShowCursor(true);
          }, 1540);

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const currentRef = containerRef.current;
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      }
    };
  }, []);

  return (
    <section ref={containerRef} className="container reveal">
      <div className="terminal-demo">
        <div className="terminal-topbar">
          <span className="dot-btn red"></span>
          <span className="dot-btn yellow"></span>
          <span className="dot-btn green"></span>
          <span className="terminal-title">~/projects/portfolio — zsh</span>
        </div>
        <div className="terminal-body">
          {lines.map((line) => {
            const isVisible = visibleLineIds.has(line.id);
            return (
              <span
                key={line.id}
                className={`terminal-line ${line.className} ${isVisible ? 'is-visible' : ''}`}
              >
                {line.text}
              </span>
            );
          })}
          <span className={`cursor-line ${showCursor ? 'is-visible' : ''}`}>
            <span className="block"></span>
            <span>_</span>
          </span>
        </div>
      </div>
    </section>
  );
}
