import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-brand-primary/15 text-brand-primary border border-brand-primary/30',
    secondary: 'bg-brand-secondary/15 text-brand-secondary border border-brand-secondary/30',
    accent: 'bg-brand-accent/20 text-emerald-400 border border-brand-accent/40 font-medium',
    neutral: 'bg-white/5 text-slate-400 border border-white/10',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide ${
        variants[variant] || variants.primary
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
