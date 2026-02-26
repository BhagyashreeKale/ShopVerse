import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RatingBreakdownProps {
  rating: number;
  reviewCount: number;
}

// Simulated breakdown based on average rating
function generateBreakdown(rating: number, total: number) {
  const weights = [
    Math.round(total * (rating > 4 ? 0.6 : rating > 3 ? 0.35 : 0.1)),
    Math.round(total * (rating > 4 ? 0.2 : rating > 3 ? 0.3 : 0.15)),
    Math.round(total * (rating > 4 ? 0.1 : rating > 3 ? 0.2 : 0.35)),
    Math.round(total * 0.06),
    Math.round(total * 0.04),
  ];
  return weights;
}

export function RatingBreakdown({ rating, reviewCount }: RatingBreakdownProps) {
  const breakdown = generateBreakdown(rating, reviewCount);

  return (
    <div className="flex gap-8 items-start p-5 rounded-2xl bg-secondary/50">
      {/* Big Score */}
      <div className="text-center shrink-0">
        <div className="text-5xl font-extrabold text-foreground">{rating}</div>
        <div className="flex justify-center mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{reviewCount.toLocaleString()} ratings</p>
      </div>

      {/* Bars */}
      <div className="flex-1 space-y-1.5">
        {[5, 4, 3, 2, 1].map((star, i) => {
          const count = breakdown[i];
          const pct = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs font-medium w-4 text-right">{star}</span>
              <Star className="h-3 w-3 fill-accent text-accent" />
              <Progress value={pct} className="h-2 flex-1" />
              <span className="text-[10px] text-muted-foreground w-10 text-right">{count.toLocaleString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
