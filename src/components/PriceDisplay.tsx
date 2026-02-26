interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({ price, originalPrice, discount, currency = "$", size = "md" }: PriceDisplayProps) {
  const priceClass = size === "sm" ? "text-base font-bold" : size === "md" ? "text-xl font-bold" : "text-3xl font-extrabold";

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={`${priceClass} text-foreground`}>
        {currency}{price.toFixed(2)}
      </span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-muted-foreground line-through">
          {currency}{originalPrice.toFixed(2)}
        </span>
      )}
      {discount && discount > 0 && (
        <span className="text-xs font-semibold text-success px-1.5 py-0.5 rounded-md bg-success/10">
          {discount}% OFF
        </span>
      )}
    </div>
  );
}
