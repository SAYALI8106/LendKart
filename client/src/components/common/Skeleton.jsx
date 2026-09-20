import React from 'react';

export const Skeleton = ({ className = '', rounded = 'rounded-xl' }) => {
  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-white/5 ${rounded} ${className}`}
    />
  );
};

export const ItemCardSkeleton = () => {
  return (
    <div className="glass-card rounded-2xl p-4 border border-white/5 space-y-4">
      <Skeleton className="w-full h-48 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="w-1/3 h-4" />
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-1/2 h-4" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-16 h-8" />
      </div>
    </div>
  );
};

export default Skeleton;
