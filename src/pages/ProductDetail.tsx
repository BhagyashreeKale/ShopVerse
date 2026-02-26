import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart, Heart, Truck, Shield, RotateCcw, ChevronRight,
  Minus, Plus, Check, Zap, Share2, ThumbsUp, Award, Package
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RatingStars } from "@/components/RatingStars";
import { PriceDisplay } from "@/components/PriceDisplay";
import { ProductCard } from "@/components/ProductCard";
import { RecentlyViewedProducts } from "@/components/RecentlyViewedProducts";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductOffers } from "@/components/product/ProductOffers";
import { ProductSellerCard } from "@/components/product/ProductSellerCard";
import { RatingBreakdown } from "@/components/product/RatingBreakdown";
import { ProductHighlights } from "@/components/product/ProductHighlights";
import { StickyMobileCTA } from "@/components/product/StickyMobileCTA";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { products, reviews } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addViewed } = useRecentlyViewed();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [pincode, setPincode] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (product) addViewed(product.id);
  }, [product?.id, addViewed]);

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild><Link to="/products">Browse Products</Link></Button>
        </div>
      </Layout>
    );
  }

  const related = products.filter((p) => p.category.id === product.category.id && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);
  const emiPrice = (product.price / 12).toFixed(0);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success("Added to cart!", { description: `${product.name} × ${quantity}` });
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate("/checkout");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    }
  };

  const toggleHelpful = (reviewId: string) => {
    setHelpfulReviews((prev) => {
      const next = new Set(prev);
      if (next.has(reviewId)) next.delete(reviewId);
      else next.add(reviewId);
      return next;
    });
  };

  return (
    <Layout>
      <title>{product.name} – Martify</title>
      <div className="container py-4 lg:py-6 pb-32 lg:pb-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs lg:text-sm text-muted-foreground mb-4 lg:mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-foreground shrink-0">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link to={`/category/${product.category.slug}`} className="hover:text-foreground shrink-0">{product.category.name}</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Image Gallery — Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5 lg:sticky lg:top-20 lg:self-start">
            <ProductImageGallery images={product.images} name={product.name} discount={product.discount} />
          </motion.div>

          {/* Product Info — Center */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-4 space-y-5">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</p>
                {product.isBestseller && (
                  <Badge className="bg-accent/10 text-accent border-accent/20 text-[10px] gap-1">
                    <Award className="h-2.5 w-2.5" /> Bestseller
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">New</Badge>
                )}
              </div>
              <h1 className="text-xl lg:text-2xl font-bold leading-tight">{product.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-primary/10">
                  <span className="text-sm font-bold text-primary">{product.rating}</span>
                  <RatingStars rating={product.rating} showCount={false} size="sm" />
                </div>
                <span className="text-xs text-muted-foreground">{product.reviewCount.toLocaleString()} ratings</span>
                <button onClick={handleShare} className="ml-auto p-1.5 rounded-lg hover:bg-secondary transition-colors">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Price */}
            <div className="space-y-1">
              <PriceDisplay price={product.price} originalPrice={product.originalPrice} discount={product.discount} size="lg" />
              <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
              <p className="text-xs text-primary font-medium">EMI from ${emiPrice}/mo · No Cost EMI available</p>
            </div>

            <div className="h-px bg-border" />

            {/* Highlights */}
            <ProductHighlights product={product} />

            <div className="h-px bg-border" />

            {/* Offers */}
            <ProductOffers />

            {/* Description */}
            <div className="space-y-2">
              <p className="text-sm font-semibold">About this item</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </motion.div>

          {/* Buy Box — Right (Amazon-style) */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
            <div className="lg:sticky lg:top-20 space-y-4 p-4 lg:p-5 rounded-2xl border border-border bg-card">
              <PriceDisplay price={product.price} originalPrice={product.originalPrice} discount={product.discount} size="md" />

              {/* Delivery */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="font-medium">FREE Delivery</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => { setPincode(e.target.value); setDeliveryChecked(false); }}
                    className="flex-1 h-9 px-3 rounded-xl border border-border bg-secondary text-xs"
                  />
                  <Button variant="outline" size="sm" className="rounded-xl text-xs" onClick={() => setDeliveryChecked(true)}>Check</Button>
                </div>
                {deliveryChecked && pincode && (
                  <p className="text-xs text-primary font-medium">✓ Delivery by Feb 18-20, 2026</p>
                )}
              </div>

              <div className="h-px bg-border" />

              {/* Stock */}
              <p className={cn("text-sm font-semibold", product.inStock ? "text-primary" : "text-destructive")}>
                {product.inStock ? "In Stock" : "Currently Unavailable"}
              </p>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold">Color</p>
                  <div className="flex gap-2">
                    {product.variants.filter((v) => v.type === "color").map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariants((prev) => ({ ...prev, color: v.id }))}
                        disabled={!v.inStock}
                        className={cn(
                          "h-9 w-9 rounded-full border-2 transition-all relative",
                          selectedVariants.color === v.id ? "border-primary ring-2 ring-primary/30" : "border-border",
                          !v.inStock && "opacity-40 cursor-not-allowed"
                        )}
                        style={{ backgroundColor: v.value }}
                        title={v.label}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold">Quantity</p>
                <div className="flex items-center border border-border rounded-xl w-fit">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="h-9 w-9 flex items-center justify-center hover:bg-secondary rounded-l-xl">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)} className="h-9 w-9 flex items-center justify-center hover:bg-secondary rounded-r-xl">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button className="w-full rounded-xl font-semibold" onClick={handleAddToCart} disabled={!product.inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                </Button>
                <Button className="w-full rounded-xl font-semibold bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleBuyNow} disabled={!product.inStock}>
                  <Zap className="h-4 w-4 mr-2" /> Buy Now
                </Button>
                <Button variant="outline" className="w-full rounded-xl" onClick={() => toggleWishlist(product.id)}>
                  <Heart className={cn("h-4 w-4 mr-2", wishlisted && "fill-destructive text-destructive")} />
                  {wishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
              </div>

              <div className="h-px bg-border" />

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Truck, label: "Free Shipping" },
                  { icon: Shield, label: "1 Year Warranty" },
                  { icon: RotateCcw, label: "30-Day Returns" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-secondary text-center">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[10px] font-medium leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border" />

              {/* Seller */}
              <ProductSellerCard seller={product.seller} />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="reviews" className="mt-10 lg:mt-14">
          <TabsList className="w-full justify-start rounded-xl bg-secondary p-1 overflow-x-auto">
            <TabsTrigger value="description" className="rounded-lg text-xs lg:text-sm">Description</TabsTrigger>
            <TabsTrigger value="specifications" className="rounded-lg text-xs lg:text-sm">Specifications</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg text-xs lg:text-sm">Reviews ({product.reviewCount.toLocaleString()})</TabsTrigger>
            <TabsTrigger value="qna" className="rounded-lg text-xs lg:text-sm">Q&A</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="pt-6">
            <div className="max-w-3xl space-y-4">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              <ProductHighlights product={product} />
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl">
              {(product.specifications ? Object.entries(product.specifications) : [
                ["Brand", product.brand], ["Category", product.category.name],
                ["Rating", `${product.rating}/5`], ["Seller", product.seller.name],
                ["Warranty", "1 Year"], ["In the Box", "Product, Manual, Warranty Card"],
              ]).map(([key, val]) => (
                <div key={key} className="flex justify-between p-3 rounded-xl bg-secondary/50 even:bg-secondary/30">
                  <span className="text-sm text-muted-foreground">{key}</span>
                  <span className="text-sm font-medium text-right">{val}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="pt-6">
            <div className="max-w-3xl space-y-6">
              <RatingBreakdown rating={product.rating} reviewCount={product.reviewCount} />

              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 rounded-2xl border border-border bg-card space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          {r.userName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{r.userName}</p>
                          <p className="text-[11px] text-muted-foreground">{r.date}</p>
                        </div>
                      </div>
                      {r.verified && (
                        <Badge variant="outline" className="text-[10px] gap-0.5">
                          <Check className="h-2.5 w-2.5" /> Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 w-fit">
                        <span className="text-xs font-bold text-primary">{r.rating}</span>
                        <RatingStars rating={r.rating} showCount={false} size="sm" />
                      </div>
                      <p className="text-sm font-semibold">{r.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.content}</p>
                    <button
                      onClick={() => toggleHelpful(r.id)}
                      className={cn(
                        "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors",
                        helpfulReviews.has(r.id)
                          ? "border-primary/30 bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:bg-secondary"
                      )}
                    >
                      <ThumbsUp className="h-3 w-3" />
                      Helpful ({r.helpful + (helpfulReviews.has(r.id) ? 1 : 0)})
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qna" className="pt-6">
            <div className="max-w-3xl space-y-4">
              {[
                { q: "Is this product covered under warranty?", a: "Yes, this product comes with a 1-year manufacturer warranty covering defects.", by: "Seller" },
                { q: "Does it work with all devices?", a: "Yes, it's compatible with iOS, Android, Windows, and macOS devices.", by: "Seller" },
                { q: "What's included in the box?", a: "You get the product, user manual, warranty card, and all necessary accessories.", by: "Community" },
              ].map(({ q, a, by }, i) => (
                <div key={i} className="p-4 rounded-2xl border border-border bg-card space-y-2">
                  <p className="text-sm font-semibold flex items-start gap-2">
                    <span className="text-primary font-bold">Q:</span> {q}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary font-bold">A:</span> {a}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Answered by {by}</p>
                </div>
              ))}
              <Button variant="outline" className="rounded-xl text-sm">
                <Package className="h-4 w-4 mr-2" /> Ask a Question
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-10 lg:mt-14">
            <h2 className="text-xl lg:text-2xl font-bold mb-5">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
        {/* Recently Viewed */}
        <div className="mt-10 lg:mt-14">
          <RecentlyViewedProducts excludeProductId={product.id} />
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA product={product} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
    </Layout>
  );
};

export default ProductDetail;
