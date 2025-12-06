import { Star } from "lucide-react";

interface FeaturedBadgeProps {
  className?: string;
}

export function FeaturedBadge({ className = "" }: FeaturedBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-md ${className}`}>
      <Star className="w-3 h-3 fill-current" />
      <span>Featured</span>
    </div>
  );
}
