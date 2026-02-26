import { ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

interface StickyMobileCTAProps {
  product: Product;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export function StickyMobileCTA({ product, onAddToCart, onBuyNow }: StickyMobileCTAProps) {
  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 lg:hidden border-t border-border bg-background/95 backdrop-blur px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          {product.originalPrice > product.price && (
            <p className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          className="rounded-xl"
          onClick={onAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          className="rounded-xl font-semibold px-6"
          onClick={onBuyNow}
          disabled={!product.inStock}
        >
          <Zap className="h-4 w-4 mr-1" /> Buy Now
        </Button>
      </div>
    </div>
  );
}
