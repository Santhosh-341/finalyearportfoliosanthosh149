import { useEffect, useRef, useState } from 'react';

function StatCard({ target, label }) {
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;

          const duration = 1400;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // Cubic easeOut: f(x) = 1 - (1 - x)^3
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            setValue(current);
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const currentRef = cardRef.current;
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    };
  }, [target]);

  return (
    <div
      ref={cardRef}
      className={`stat-card reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="stat-value">
        {value}
        {target === 100 ? '+' : ''}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="container stats" aria-label="Key metrics">
      <StatCard target={5} label="Projects shipped" />
      <StatCard target={4} label="Years building web apps" />
      <StatCard target={8} label="Core tools in my stack" />
      <StatCard target={100} label="Hours spent refining UX" />
    </section>
  );
}
