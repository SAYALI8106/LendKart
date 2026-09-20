import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-brand-primary text-white hover:bg-brand-primaryHover shadow-lg shadow-brand-primary/25 focus:ring-brand-primary border border-brand-primary/40',
    secondary:
      'bg-brand-secondary/15 text-brand-secondary hover:bg-brand-secondary/25 border border-brand-secondary/30 focus:ring-brand-secondary',
    accent:
      'bg-brand-accent text-slate-950 hover:bg-[#a5f34f] font-semibold shadow-lg shadow-brand-accent/20 focus:ring-brand-accent',
    outline:
      'bg-transparent border border-white/15 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white/5 hover:border-brand-primary/50 focus:ring-brand-primary',
    ghost:
      'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-white/10 hover:text-white focus:ring-slate-500',
    danger:
      'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30 focus:ring-rose-500'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-2xl'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 text-current" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
