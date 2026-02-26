import { useState } from "react";
import { Heart, ShoppingCart, Check, GitCompareArrows } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { RatingStars } from "./RatingStars";
import { PriceDisplay } from "./PriceDisplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCompare } from "@/contexts/CompareContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCompare, removeFromCompare, isComparing } = useCompare();
  const wishlisted = isWishlisted(product.id);
  const comparing = isComparing(product.id);
  const [added, setAdded] = useState(false);

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (comparing) {
      removeFromCompare(product.id);
      toast.info("Removed from compare");
    } else {
      addToCompare(product);
      toast.success("Added to compare");
    }
  };

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative rounded-2xl bg-card/70 backdrop-blur-sm border border-border/40 overflow-hidden hover-lift transition-all hover:shadow-soft-lg hover:bg-card"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isNew && <Badge className="bg-primary text-primary-foreground text-[10px]">NEW</Badge>}
        {product.isBestseller && <Badge className="bg-accent text-accent-foreground text-[10px]">BESTSELLER</Badge>}
        {product.discount > 0 && <Badge variant="destructive" className="text-[10px]">{product.discount}% OFF</Badge>}
      </div>

      {/* Wishlist & Compare */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center border border-border/50 transition-colors hover:bg-card"
        >
          <Heart className={cn("h-4 w-4 transition-colors", wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground")} />
        </button>
        <button
          onClick={handleToggleCompare}
          className={cn(
            "h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center border transition-colors hover:bg-card",
            comparing ? "border-primary/50 bg-primary/10" : "border-border/50"
          )}
          title="Compare"
        >
          <GitCompareArrows className={cn("h-4 w-4 transition-colors", comparing ? "text-primary" : "text-muted-foreground")} />
        </button>
      </div>

      {/* Image */}
      <Link to={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 space-y-2">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{product.brand}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <PriceDisplay price={product.price} originalPrice={product.originalPrice} discount={product.discount} size="sm" />
        <Button
          size="sm"
          className={cn("w-full mt-2 rounded-xl transition-all", added && "bg-success hover:bg-success text-success-foreground")}
          onClick={handleAddToCart}
        >
          {added ? (
            <><Check className="h-4 w-4 mr-1" /> Added!</>
          ) : (
            <><ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart</>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
