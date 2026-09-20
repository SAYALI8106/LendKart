import React from 'react';
import { PackageOpen } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = PackageOpen,
  title = 'No items found',
  description = 'Try adjusting your search filters or check back later.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-[#14211D] rounded-3xl border border-[#E7E2D6] dark:border-white/10 my-6 shadow-soft-sm">
      <div className="w-14 h-14 rounded-2xl bg-brand-primaryLight dark:bg-emerald-950/40 border border-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-emerald-300 mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
