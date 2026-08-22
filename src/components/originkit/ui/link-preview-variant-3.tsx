import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

type LinkPreviewProps = {
  url: string;
  previewImage: string;
  color: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export default function LinkPreview({
  url,
  previewImage,
  color,
  children,
  style,
  className,
}: LinkPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Parent-relative horizontal coordinate tracking
  const mouseX = useMotionValue(0);
  const springConfig = { damping: 22, stiffness: 220, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    mouseX.set(x - 60); // Offset half width (120px / 2) to center it
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    mouseX.set(x - 60); // Center the 120px wide circle on cursor X
  };

  return (
    <div
      style={{ display: "inline-block", position: "relative", overflow: "visible" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <a
        href={url}
        className={className}
        style={{
          color: isHovered ? color : "var(--text-secondary, #a8a29e)",
          transition: "color 0.25s ease",
          textDecoration: "none",
          fontWeight: 600,
          display: "block",
          ...style,
        }}
      >
        {children}
      </a>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 28,
            }}
            style={{
              position: "absolute",
              top: "calc(100% + 18px)",
              left: springX,
              zIndex: 99999,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: `3px solid ${color}`,
                boxShadow: `0 8px 30px ${color}4d, 0 0 15px ${color}1a`,
                overflow: "hidden",
                background: "#1c1917",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
              }}
            >
              <img
                src={previewImage}
                alt="Link preview"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
