import { useState } from 'react';

interface NeonBorderProps {
  children: React.ReactNode;
  variant?: 'variant-3' | 'variant-4';
  color1?: string;
  color2?: string;
  duration?: string;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
  hoverReaction?: boolean;
}

export default function NeonBorder({
  children,
  variant = 'variant-3',
  color1 = 'var(--cyan)',
  color2 = 'var(--neon)',
  duration = '4s',
  borderRadius = '9999px',
  className = '',
  style = {},
  isActive = true,
  hoverReaction = true,
}: NeonBorderProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!isActive) {
    return (
      <div 
        className={className} 
        style={{ 
          borderRadius, 
          width: '100%', 
          height: '100%', 
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          ...style 
        }}
      >
        {children}
      </div>
    );
  }

  // Determine active variant based on hover state
  const activeVariant = hoverReaction && isHovered ? 'variant-3' : variant;

  return (
    <div
      className={`neon-border-wrapper ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius,
        padding: '1.2px', // Thin border for buttons
        background: 'rgba(255, 255, 255, 0.02)',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        ...style,
      }}
    >
      <style>{`
        @keyframes border-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes border-pulse {
          0%, 100% {
            opacity: 0.35;
            filter: blur(6px);
          }
          50% {
            opacity: 0.7;
            filter: blur(10px);
          }
        }
      `}</style>
      
      {activeVariant === 'variant-3' ? (
        <>
          {/* Animated laser trace layer */}
          <div
            className="neon-border-glow"
            style={{
              position: 'absolute',
              inset: '-250%',
              background: `conic-gradient(
                from 0deg,
                transparent 0deg,
                ${color1} 90deg,
                transparent 180deg,
                ${color2} 270deg,
                transparent 360deg
              )`,
              animation: `border-rotate ${isHovered ? '2s' : duration} linear infinite`,
              zIndex: 1,
            }}
          />
          
          {/* Soft blurred glow aura projected behind */}
          <div
            className="neon-border-aura"
            style={{
              position: 'absolute',
              inset: '-250%',
              background: `conic-gradient(
                from 0deg,
                transparent 0deg,
                ${color1} 90deg,
                transparent 180deg,
                ${color2} 270deg,
                transparent 360deg
              )`,
              animation: `border-rotate ${isHovered ? '2s' : duration} linear infinite`,
              zIndex: 0,
              filter: 'blur(10px)',
              opacity: isHovered ? 0.75 : 0.45,
            }}
          />
        </>
      ) : (
        <>
          {/* Breathing Neon Aura (Variant 4) */}
          <div
            className="neon-border-glow"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius,
              border: `1.2px solid ${color1}`,
              boxShadow: `0 0 10px ${color1}, inset 0 0 6px ${color1}`,
              zIndex: 1,
              opacity: 0.65,
            }}
          />
          <div
            className="neon-border-aura"
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: `calc(${borderRadius} + 4px)`,
              border: `1.5px solid ${color2}`,
              boxShadow: `0 0 18px ${color2}`,
              zIndex: 0,
              animation: `border-pulse 2.5s ease-in-out infinite`,
            }}
          />
        </>
      )}
      
      {/* Inner Content Layer */}
      <div
        className="neon-border-content"
        style={{
          position: 'relative',
          zIndex: 2,
          borderRadius: `calc(${borderRadius} - 1.2px)`,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(7, 6, 13, 0.94)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
