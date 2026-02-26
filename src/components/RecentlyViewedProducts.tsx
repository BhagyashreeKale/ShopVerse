import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { products } from "@/data/mock-data";
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface RecentlyViewedProductsProps {
  excludeProductId?: string;
}

export function RecentlyViewedProducts({ excludeProductId }: RecentlyViewedProductsProps) {
  const { viewedIds } = useRecentlyViewed();

  const recentProducts = viewedIds
    .filter((id) => id !== excludeProductId)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 6);

  if (recentProducts.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl lg:text-2xl font-bold">Recently Viewed</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
        {recentProducts.map((p, i) => (
          <ProductCard key={p!.id} product={p!} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
