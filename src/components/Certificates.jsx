import { useState, useRef } from 'react';
import RoundCarousel from './originkit/ui/roundcarousel';

const certificates = [
  {
    id: 1,
    img: '/assets/cert_quizoff.png',
    badge: 'Unstop',
    name: "QuizOff 2026: India's Biggest AI Quiz",
    meta: 'National-Level AI Quiz Participant • July 2026',
  },
  {
    id: 2,
    img: '/assets/cert_guvi.png',
    badge: 'GUVI',
    name: 'Future of Full Stack Development',
    meta: 'Key Skills Needed in 2026 Workshop • April 2026',
  },
  {
    id: 3,
    img: '/assets/Screenshot 2026-07-10 194000.png',
    badge: 'AWS',
    name: 'Solutions Architecture Job Simulation',
    meta: 'Designing Scalable Hosting Architectures • April 2025',
    pdf: '/assets/cert_aws_solarch.pdf'
  },
  {
    id: 4,
    img: '/assets/Screenshot 2026-07-10 194021.png',
    badge: 'Udemy',
    name: 'HTML and CSS for Beginners',
    meta: 'From Basic to Advance • Stephen Koel Soren',
  },
  {
    id: 5,
    img: '/assets/Screenshot 2026-07-10 193920.png',
    badge: 'Infosys',
    name: 'Basics of Python',
    meta: 'Course completion certificate • July 1, 2025',
  },
  {
    id: 6,
    img: '/assets/Screenshot 2026-07-10 193653.png',
    badge: 'TCS iON',
    name: 'Career Edge - Young Professional',
    meta: 'Communication & interview skills • March 2026',
  },
  {
    id: 7,
    img: '/assets/Screenshot 2026-07-10 194047.png',
    badge: 'CodeKaro',
    name: 'How To CSS',
    meta: 'Certificate of achievement • March 28, 2025',
  }
];

export default function Certificates() {
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);

  const carouselImages = certificates.map((cert) => ({
    src: cert.img,
    badge: cert.badge,
    name: cert.name,
    meta: cert.meta,
  }));

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Rotate the entire container slightly in 3D
    containerRef.current.style.transform = `perspective(2000px) rotateY(${x * 6}deg) rotateX(${y * -6}deg)`;
    containerRef.current.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = `perspective(2000px) rotateY(0deg) rotateX(0deg)`;
    containerRef.current.style.transition = 'transform 0.5s ease-out';
  };

  return (
    <section className="container certificates-section" id="certificates" style={{ overflow: 'visible' }}>
      <h2 className="section-title word-reveal">
        Certificates <span className="word accent">Showcase</span>
      </h2>
      <div 
        ref={containerRef}
        className="cert-carousel-container" 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          margin: '60px 0', 
          height: '420px', 
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'visible',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <RoundCarousel
          images={carouselImages}
          imageWidth={345}
          imageHeight={240}
          spacing={4}
          speed={3.5}
          tilt={-7}
          background="transparent"
          perspective={1800}
          onItemClick={(img) => {
            const cert = certificates.find((c) => c.img === img.src);
            if (cert && cert.pdf) {
              setSelectedImage(cert.pdf);
            } else {
              setSelectedImage(img.src);
            }
          }}
        />
      </div>

      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 6, 13, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              fontSize: '1.2rem',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            ✕
          </button>
          {selectedImage.endsWith('.pdf') ? (
            <iframe
              src={`${selectedImage}#toolbar=0`}
              title="Certificate PDF"
              style={{
                width: '90%',
                height: '85vh',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: '#ffffff',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                animation: 'zoomIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={selectedImage}
              alt="Full size certificate preview"
              style={{
                maxWidth: '90%',
                maxHeight: '85vh',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                objectFit: 'contain',
                animation: 'zoomIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </section>
  );
}
