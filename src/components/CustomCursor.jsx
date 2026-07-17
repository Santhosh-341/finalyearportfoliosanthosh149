import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if hover is supported
    if (window.matchMedia('(hover: none)').matches) {
      setIsVisible(false);
      return;
    }

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursor = { x: mouse.x, y: mouse.y };
    const ring = { x: mouse.x, y: mouse.y };
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.opacity = '1';
        ringRef.current.style.opacity = '1';
      }
    };

    const handleMouseOver = (e) => {
      const isHoverable = e.target.closest('a, button, .project-card, .photo-card, .stack-pill, .btn, .experience-item, .contact-email');
      setIsHovered(!!isHoverable);
    };

    const animate = () => {
      cursor.x += (mouse.x - cursor.x) * 0.16;
      cursor.y += (mouse.y - cursor.y) * 0.16;
      ring.x += (mouse.x - ring.x) * 0.13;
      ring.y += (mouse.y - ring.y) * 0.13;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursor.x}px`;
        cursorRef.current.style.top = `${cursor.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.x}px`;
        ringRef.current.style.top = `${ring.y}px`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={isHovered ? 'hovered' : ''}>
      <div
        ref={cursorRef}
        className="cursor"
        aria-hidden="true"
        style={{ opacity: 0 }}
      ></div>
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{ opacity: 0 }}
      ></div>
    </div>
  );
}
