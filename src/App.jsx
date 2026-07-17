import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Terminal from './components/Terminal';
import Projects from './components/Projects';
import About from './components/About';
import Stack from './components/Stack';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    // Process word-reveal headers that do not already have manual word spans
    const wordRevealBlocks = document.querySelectorAll('.word-reveal');
    wordRevealBlocks.forEach((block) => {
      if (block.querySelector('.word')) return;
      const words = block.textContent.trim().split(/\s+/).filter(Boolean);
      block.innerHTML = words
        .map((word) => `<span class="word">${word}</span>`)
        .join(' ');
    });

    // Word reveal intersection observer
    const wordObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.word').forEach((word, index) => {
              setTimeout(() => word.classList.add('visible'), index * 50);
            });
            wordObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.word-reveal').forEach((block) => {
      wordObserver.observe(block);
    });

    // General reveal observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      revealObserver.observe(el);
    });

    return () => {
      wordObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [isReady]);

  return (
    <>
      <CustomCursor />
      <Preloader onComplete={() => setIsReady(true)} />

      {/* Ambient background blobs */}
      <div className="blob" aria-hidden="true"></div>
      <div className="blob-2" aria-hidden="true"></div>
      <div className="blob-3" aria-hidden="true"></div>

      <Navbar />

      <main id="top">
        <Hero isReady={isReady} />
        <Stats />

        {/* Technology marquee */}
        <div className="marquee" aria-label="Technology marquee">
          <div className="marquee-track">
            <span>
              HTML <span className="sep">◆</span> CSS <span className="sep">◆</span>{' '}
              JavaScript <span className="sep">◆</span> React <span className="sep">◆</span>{' '}
              Node.js <span className="sep">◆</span> Express.js <span className="sep">◆</span>{' '}
              MySQL <span className="sep">◆</span> REST APIs
            </span>
            <span>
              HTML <span className="sep">◆</span> CSS <span className="sep">◆</span>{' '}
              JavaScript <span className="sep">◆</span> React <span className="sep">◆</span>{' '}
              Node.js <span className="sep">◆</span> Express.js <span className="sep">◆</span>{' '}
              MySQL <span className="sep">◆</span> REST APIs
            </span>
          </div>
        </div>

        <Terminal />
        <Projects />
        <About />
        <Stack />
        <Experience />
        <Certificates />
        <Contact />
      </main>
    </>
  );
}
