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
      'bg-brand-primary text-white hover:bg-brand-primaryHover shadow-sm hover:shadow-forest-glow focus:ring-brand-primary font-semibold',
    secondary:
      'bg-brand-primaryLight text-brand-primary hover:bg-[#D9E9E0] dark:bg-brand-primary/20 dark:text-emerald-300 border border-brand-primary/20 focus:ring-brand-primary font-medium',
    accent:
      'bg-brand-accent text-white hover:bg-brand-accentHover font-semibold shadow-sm hover:shadow-terracotta-glow focus:ring-brand-accent',
    outline:
      'bg-transparent border border-[#DDD7CA] dark:border-white/15 text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 hover:border-brand-primary/50 focus:ring-brand-primary',
    ghost:
      'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-brand-primary focus:ring-slate-400',
    danger:
      'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40 hover:bg-rose-100'
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
