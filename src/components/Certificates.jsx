import { useEffect, useRef, useState } from 'react';

const certificates = [
  {
    id: 1,
    img: 'assets/Screenshot 2026-07-10 194021.png',
    badge: 'Udemy',
    name: 'HTML and CSS for Beginners',
    meta: 'From Basic to Advance • Stephen Koel Soren',
  },
  {
    id: 2,
    img: 'assets/Screenshot 2026-07-10 194000.png',
    badge: 'Forage',
    name: 'Web Development Job Simulation',
    meta: 'Entrepreneurship & Innovation • April 2025',
  },
  {
    id: 3,
    img: 'assets/Screenshot 2026-07-10 193920.png',
    badge: 'Infosys',
    name: 'Basics of Python',
    meta: 'Course completion certificate • July 1, 2025',
  },
  {
    id: 4,
    img: 'assets/Screenshot 2026-07-10 193653.png',
    badge: 'TCS iON',
    name: 'Career Edge - Young Professional',
    meta: 'Communication & interview skills • March 2026',
  },
  {
    id: 5,
    img: 'assets/Screenshot 2026-07-10 194047.png',
    badge: 'CodeKaro',
    name: 'How To CSS',
    meta: 'Certificate of achievement • March 28, 2025',
  },
];

export default function Certificates() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewportRef = useRef(null);
  const autoPlayRef = useRef(null);
  const gap = 18;

  const getCardStep = () => {
    if (!viewportRef.current) return 0;
    const card = viewportRef.current.querySelector('.card');
    return card ? Math.round(card.getBoundingClientRect().width + gap) : 0;
  };

  const scrollToIndex = (index, behavior = 'smooth') => {
    const count = certificates.length;
    // Handle wrap-around index
    const nextIndex = ((index % count) + count) % count;
    setCurrentIndex(nextIndex);

    if (viewportRef.current) {
      const step = getCardStep();
      viewportRef.current.scrollTo({ left: nextIndex * step, behavior });
    }
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      // Use functional state updates to reference the latest index correctly
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % certificates.length;
        if (viewportRef.current) {
          viewportRef.current.scrollTo({
            left: nextIndex * getCardStep(),
            behavior: 'smooth',
          });
        }
        return nextIndex;
      });
    }, 4500);
  };

  const handlePrev = () => {
    stopAutoPlay();
    scrollToIndex(currentIndex - 1);
    startAutoPlay();
  };

  const handleNext = () => {
    stopAutoPlay();
    scrollToIndex(currentIndex + 1);
    startAutoPlay();
  };

  useEffect(() => {
    startAutoPlay();

    const handleResize = () => {
      // Snap instantly on resize to ensure alignment
      if (viewportRef.current) {
        viewportRef.current.scrollTo({
          left: currentIndex * getCardStep(),
          behavior: 'auto', // instant snap
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      stopAutoPlay();
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <section className="container certificates-section" id="certificates">
      <h2 className="section-title word-reveal">
        Certificates <span className="word accent">Showcase</span>
      </h2>
      <div className="cert-carousel">
        <button
          className="carousel-btn left"
          aria-label="Previous"
          onClick={handlePrev}
        >
          ◀
        </button>
        <div
          ref={viewportRef}
          className="carousel-viewport"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          <div className="carousel-track">
            {certificates.map((cert, idx) => (
              <div
                key={cert.id}
                className={`card ${idx === currentIndex ? 'current' : ''}`}
              >
                <div className="inner-wrap certificate-card">
                  <div className="certificate-preview">
                    <a className="certificate-link" href={cert.img}>
                      <img
                        className="certificate-image"
                        src={cert.img}
                        alt={`${cert.name} certificate`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </a>
                    <span className="certificate-badge">{cert.badge}</span>
                    <div className="certificate-name">{cert.name}</div>
                    <div className="certificate-meta">{cert.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="carousel-btn right"
          aria-label="Next"
          onClick={handleNext}
        >
          ▶
        </button>
      </div>
    </section>
  );
}
