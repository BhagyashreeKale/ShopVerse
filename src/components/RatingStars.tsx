import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export function RatingStars({ rating, reviewCount, size = "sm", showCount = true }: RatingStarsProps) {
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : size === "md" ? "h-4 w-4" : "h-5 w-5";
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`f${i}`} className={`${sizeClass} fill-accent text-accent`} />
        ))}
        {hasHalf && <StarHalf className={`${sizeClass} fill-accent text-accent`} />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`e${i}`} className={`${sizeClass} text-muted-foreground/30`} />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
