import { Layout } from "@/components/Layout";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/RatingStars";
import { PriceDisplay } from "@/components/PriceDisplay";
import { Link } from "react-router-dom";
import { X, ShoppingCart, ArrowLeft, Check, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Compare = () => {
  const { items, removeFromCompare, clearCompare } = useCompare();
  const { addItem } = useCart();

  if (items.length < 2) {
    return (
      <Layout>
        <div className="container py-20 text-center space-y-4">
          <h1 className="text-2xl font-bold">Compare Products</h1>
          <p className="text-muted-foreground">Add at least 2 products to compare them side by side.</p>
          <Button asChild className="rounded-xl">
            <Link to="/products"><ArrowLeft className="h-4 w-4 mr-2" /> Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const specKeys = new Set<string>();
  items.forEach((p) => {
    if (p.specifications) Object.keys(p.specifications).forEach((k) => specKeys.add(k));
  });
  const defaultKeys = ["Brand", "Category", "Rating", "Seller", "Warranty"];
  const allKeys = specKeys.size > 0 ? Array.from(specKeys) : defaultKeys;

  const handleAddToCart = (product: typeof items[0]) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Layout>
      <title>Compare Products – Martify</title>
      <div className="container py-6 pb-32 lg:pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Compare Products</h1>
            <p className="text-sm text-muted-foreground">{items.length} products selected</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl" onClick={clearCompare}>
              Clear All
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl" asChild>
              <Link to="/products"><ArrowLeft className="h-4 w-4 mr-1" /> Add More</Link>
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-x-auto rounded-2xl border border-border bg-card"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground bg-secondary/50 w-[150px] lg:w-[200px] sticky left-0 z-10">
                  Feature
                </th>
                {items.map((product) => (
                  <th key={product.id} className="p-4 text-center min-w-[200px]">
                    <div className="space-y-3">
                      <div className="relative inline-block">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-28 w-28 rounded-xl object-cover mx-auto border border-border/50"
                        />
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <Link to={`/product/${product.slug}`} className="block text-sm font-semibold hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price */}
              <CompareRow label="Price" even>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <PriceDisplay price={p.price} originalPrice={p.originalPrice} discount={p.discount} size="sm" />
                  </td>
                ))}
              </CompareRow>

              {/* Rating */}
              <CompareRow label="Rating">
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-primary/10">
                        <span className="text-sm font-bold text-primary">{p.rating}</span>
                        <RatingStars rating={p.rating} showCount={false} size="sm" />
                      </div>
                      <span className="text-[11px] text-muted-foreground">{p.reviewCount.toLocaleString()} ratings</span>
                    </div>
                  </td>
                ))}
              </CompareRow>

              {/* Brand */}
              <CompareRow label="Brand" even>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-center text-sm font-medium">{p.brand}</td>
                ))}
              </CompareRow>

              {/* Category */}
              <CompareRow label="Category">
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-center text-sm text-muted-foreground">{p.category.name}</td>
                ))}
              </CompareRow>

              {/* In Stock */}
              <CompareRow label="Availability" even>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <span className={cn("text-sm font-medium inline-flex items-center gap-1", p.inStock ? "text-primary" : "text-destructive")}>
                      {p.inStock ? <><Check className="h-3.5 w-3.5" /> In Stock</> : <><Minus className="h-3.5 w-3.5" /> Out of Stock</>}
                    </span>
                  </td>
                ))}
              </CompareRow>

              {/* Seller */}
              <CompareRow label="Seller">
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-center text-sm">
                    <span className="font-medium">{p.seller.name}</span>
                    {p.seller.verified && <span className="text-[10px] text-primary ml-1">✓</span>}
                  </td>
                ))}
              </CompareRow>

              {/* Specs */}
              {allKeys.map((key, i) => (
                <CompareRow key={key} label={key} even={i % 2 === 0}>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 text-center text-sm text-muted-foreground">
                      {p.specifications?.[key] || "—"}
                    </td>
                  ))}
                </CompareRow>
              ))}

              {/* Description */}
              <CompareRow label="Description" even={allKeys.length % 2 === 0}>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-center text-xs text-muted-foreground leading-relaxed max-w-[250px]">
                    {p.shortDescription}
                  </td>
                ))}
              </CompareRow>

              {/* Add to Cart */}
              <tr>
                <td className="p-4 text-sm font-semibold text-muted-foreground bg-secondary/50 sticky left-0 z-10">Action</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <Button
                      size="sm"
                      className="rounded-xl"
                      onClick={() => handleAddToCart(p)}
                      disabled={!p.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </Layout>
  );
};

function CompareRow({ label, even, children }: { label: string; even?: boolean; children: React.ReactNode }) {
  return (
    <tr className={even ? "bg-secondary/30" : ""}>
      <td className={cn("p-4 text-sm font-semibold text-muted-foreground sticky left-0 z-10", even ? "bg-secondary/50" : "bg-card")}>
        {label}
      </td>
      {children}
    </tr>
  );
}

export default Compare;
