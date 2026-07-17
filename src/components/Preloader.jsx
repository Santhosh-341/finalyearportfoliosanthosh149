import { useEffect, useState } from 'react';

const bootMessages = [
  "[00:00.01] ✓ initializing portfolio.tsx",
  "[00:00.04] ✓ loading stack: MERN, MySQL, APIs",
  "[00:00.09] ✓ hydrating sections (28/28)",
  "[00:00.13] ✓ connecting to portfolio runtime",
  "[00:00.18] ✓ warming up glassmorphism shaders",
  "[00:00.22] ✓ ready. welcome.",
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [shownMessages, setShownMessages] = useState([]);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Increment progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.8;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, 24);

    // Boot messages sequence
    bootMessages.forEach((msg, index) => {
      setTimeout(() => {
        setShownMessages((prev) => [...prev, msg]);
      }, 140 * index + 120);
    });

    // Complete loader
    const completeTimeout = setTimeout(() => {
      setIsHidden(true);
      if (onComplete) {
        onComplete();
      }
    }, 1700);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div className={`preloader ${isHidden ? 'hidden' : ''}`} id="preloader">
      <div className="preloader-card">
        <div className="preloader-title">boot sequence</div>
        <div className="boot-log" id="boot-log">
          {bootMessages.map((msg, index) => {
            const isShown = shownMessages.includes(msg);
            return (
              <span key={index} className={isShown ? 'show' : ''}>
                {msg}
              </span>
            );
          })}
        </div>
        <div className="progress" aria-hidden="true">
          <div
            className="progress-bar"
            id="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
