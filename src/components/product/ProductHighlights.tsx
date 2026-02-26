import { CheckCircle2 } from "lucide-react";
import type { Product } from "@/types";

interface ProductHighlightsProps {
  product: Product;
}

const defaultHighlights = [
  "Premium build quality with durable materials",
  "Designed for comfort during extended use",
  "Industry-leading performance metrics",
  "Compatible with all major platforms",
  "Eco-friendly packaging and manufacturing",
];

export function ProductHighlights({ product }: ProductHighlightsProps) {
  const highlights = product.specifications
    ? Object.entries(product.specifications).slice(0, 5).map(([k, v]) => `${k}: ${v}`)
    : defaultHighlights;

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">Highlights</p>
      <ul className="space-y-1.5">
        {highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}
