import React, { useRef } from 'react';

export const TiltCard = ({ children, className = '', maxTilt = 10, scale = 1.02 }) => {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const targetRef = useRef({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    targetRef.current = { rotateX, rotateY };
    if (frameRef.current) return;
    const animate = () => {
      if (!cardRef.current) return;
      const { rotateX: nextX, rotateY: nextY } = targetRef.current;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${nextX.toFixed(2)}deg) rotateY(${nextY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
      frameRef.current = null;
    };
    frameRef.current = requestAnimationFrame(animate);
  };

  const handleMouseLeave = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    targetRef.current = { rotateX: 0, rotateY: 0 };
    cardRef.current?.style.setProperty('transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

export default TiltCard;
