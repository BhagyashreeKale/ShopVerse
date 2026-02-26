import { Check, Star, ShieldCheck, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Seller } from "@/types";

interface ProductSellerCardProps {
  seller: Seller;
}

export function ProductSellerCard({ seller }: ProductSellerCardProps) {
  return (
    <div className="p-4 rounded-2xl border border-border bg-card space-y-3">
      <p className="text-sm font-semibold flex items-center gap-2">
        <Store className="h-4 w-4 text-primary" /> Sold by
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Store className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">{seller.name}</p>
              {seller.verified && (
                <Badge variant="outline" className="text-[10px] gap-0.5 px-1.5 py-0">
                  <Check className="h-2.5 w-2.5" /> Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-xs text-muted-foreground">{seller.rating} seller rating</span>
            </div>
          </div>
        </div>
        <ShieldCheck className="h-5 w-5 text-primary/60" />
      </div>
    </div>
  );
}
