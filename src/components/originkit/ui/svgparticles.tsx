import * as React from "react";
import { useEffect, useRef, useState } from "react";

type SVGParticlesProps = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
};

type Particle = {
  x: number;       // Home X (percentage)
  y: number;       // Home Y (percentage)
  px: number;      // Current X (percentage)
  py: number;      // Current Y (percentage)
  vx: number;      // Velocity X
  vy: number;      // Velocity Y
  r: number;
  g: number;
  b: number;
  a: number;
  size: number;
  age: number;     // Lifespan counter for drift
  maxAge: number;  // Max lifespan for drift loop
  angle: number;   // Outward direction angle from center
};

export default function SVGParticles({ src, className, style }: SVGParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Define internal downsampled grid size
      const gridW = 65;
      const gridH = 80;

      // Create a temporary hidden canvas to sample colors
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = gridW;
      tempCanvas.height = gridH;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      tempCtx.drawImage(img, 0, 0, gridW, gridH);
      const imgData = tempCtx.getImageData(0, 0, gridW, gridH);
      const pixels = imgData.data;

      // Calculate grid center to project outward drift vectors
      const gridCenterX = gridW / 2;
      const gridCenterY = gridH / 2;

      const particles: Particle[] = [];

      // Loop through the downsampled grid to build particles
      for (let y = 0; y < gridH; y++) {
        for (let x = 0; x < gridW; x++) {
          const idx = (y * gridW + x) * 4;
          const r = pixels[idx] ?? 255;
          const g = pixels[idx + 1] ?? 255;
          const b = pixels[idx + 2] ?? 255;
          const a = pixels[idx + 3] ?? 255;

          // Skip transparent or near-black/background pixels
          if (a < 30) continue;
          if (r < 30 && g < 30 && b < 30) continue;

          const homeX = (x / gridW) * 100; // in percentage
          const homeY = (y / gridH) * 100; // in percentage

          // Outward angle relative to center
          const angle = Math.atan2(y - gridCenterY, x - gridCenterX);

          particles.push({
            x: homeX,
            y: homeY,
            px: homeX,
            py: homeY,
            vx: 0,
            vy: 0,
            r,
            g,
            b,
            a,
            size: 1.6 + Math.random() * 0.8,
            age: Math.random() * 120, // Offset initial ages so fade loops are staggered
            maxAge: 100 + Math.random() * 120,
            angle,
          });
        }
      }

      particlesRef.current = particles;
      setIsLoaded(true);
    };

    // Animation physics loop
    let animationFrameId: number;

    const updatePhysics = () => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;

      const w = canvasEl.width;
      const h = canvasEl.height;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      const repelRadius = 75; // radius of mouse repulsion in pixels
      const repelForce = 0.08; // force constant
      const springStiffness = 0.05; // spring back stiffness
      const friction = 0.88; // friction / damping

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;

        if (mouse.active) {
          // --- Interactive mouse active state ---
          // Convert percentage home coordinates to absolute pixel positions
          const homeAbsX = (p.x / 100) * w;
          const homeAbsY = (p.y / 100) * h;

          // Convert current percentage coordinates to absolute pixel positions
          let absPx = (p.px / 100) * w;
          let absPy = (p.py / 100) * h;

          // Mouse repulsion force
          const dx = absPx - mouse.x;
          const dy = absPy - mouse.y;
          const dist2 = dx * dx + dy * dy;
          const dist = Math.sqrt(dist2);

          if (dist < repelRadius && dist > 0) {
            const force = (repelRadius - dist) / repelRadius;
            const pushX = (dx / dist) * force * repelRadius * repelForce;
            const pushY = (dy / dist) * force * repelRadius * repelForce;

            p.vx += pushX;
            p.vy += pushY;
          }

          // Spring acceleration back to home position
          const ax = (homeAbsX - absPx) * springStiffness;
          const ay = (homeAbsY - absPy) * springStiffness;

          p.vx = (p.vx + ax) * friction;
          p.vy = (p.vy + ay) * friction;

          absPx += p.vx;
          absPy += p.vy;

          // Convert absolute back to percentages
          p.px = (absPx / w) * 100;
          p.py = (absPy / h) * 100;

          // Reset age during interactive hover
          p.age = 0;
        } else {
          // --- Outgoing drift state when mouse is NOT there ---
          p.age += 0.75; // Increment age

          // Slow drift speed outward along the angle vector
          const driftSpeed = 0.04 + Math.random() * 0.03; 
          p.vx = Math.cos(p.angle) * driftSpeed;
          p.vy = Math.sin(p.angle) * driftSpeed;

          // Move current coordinates outward (percentage coordinates)
          p.px += p.vx;
          p.py += p.vy;

          // Once particle reaches max lifespan, reset to original coordinates at rest
          if (p.age >= p.maxAge) {
            p.px = p.x;
            p.py = p.y;
            p.vx = 0;
            p.vy = 0;
            p.age = 0;
          }
        }
      }
    };

    const draw = () => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;

      const w = canvasEl.width;
      const h = canvasEl.height;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouseActive = mouseRef.current.active;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        const absX = (p.px / 100) * w;
        const absY = (p.py / 100) * h;

        // Apply fading opacity based on lifespan only when drifting (mouse inactive)
        const opacity = mouseActive ? 1 : Math.max(0, 1 - p.age / p.maxAge);

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${(p.a / 255) * opacity})`;
        ctx.beginPath();
        ctx.arc(absX, absY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      updatePhysics();
      animationFrameId = requestAnimationFrame(draw);
    };

    // Resize handler to keep canvas matching container size
    const resizeCanvas = () => {
      const containerEl = containerRef.current;
      const canvasEl = canvasRef.current;
      if (!containerEl || !canvasEl) return;

      const rect = containerEl.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasEl.width = rect.width * dpr;
      canvasEl.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [src]);

  // Pointer event tracking
  const handlePointerMove = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        ...style,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none",
        }}
      />
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            color: "rgba(255, 255, 255, 0.4)",
            fontSize: "0.85rem",
          }}
        >
          Loading particles...
        </div>
      )}
    </div>
  );
}
