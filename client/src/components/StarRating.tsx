import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ rating, onRatingChange, readonly = false, size = "md" }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  
  const starSize = sizeClasses[size];
  
  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };
  
  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };
  
  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };
  
  const displayRating = hoverRating || rating;
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          <Star
            className={`${starSize} ${
              value <= displayRating
                ? 'fill-[oklch(0.72_0.12_60)] text-[oklch(0.72_0.12_60)]'
                : 'fill-none text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
