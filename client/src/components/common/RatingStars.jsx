import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5, max = 5, size = 'sm', interactive = false, onRatingChange }) => {
  const sizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const starSize = sizeMap[size] || sizeMap.sm;

  return (
    <div className="flex items-center gap-0.5 select-none">
      {[...Array(max)].map((_, i) => {
        const starIndex = i + 1;
        const isFilled = starIndex <= Math.round(rating);

        return (
          <Star
            key={i}
            onClick={() => interactive && onRatingChange && onRatingChange(starIndex)}
            className={`${starSize} ${
              isFilled ? 'text-amber-400 fill-amber-400' : 'text-slate-600/40 dark:text-slate-600'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;
