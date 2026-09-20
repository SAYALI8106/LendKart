import React from 'react';

export const GlassCard = ({ children, className = '', hoverEffect = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl border transition-all duration-300 ${
        hoverEffect ? 'glass-card' : 'glass-panel'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
