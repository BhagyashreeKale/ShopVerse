import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Shield, Truck, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Layout } from "@/components/Layout";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { RecentlyViewedProducts } from "@/components/RecentlyViewedProducts";
import { categories, products } from "@/data/mock-data";
import { Button } from "@/components/ui/button";

const trustBadges = [
  { icon: Truck, label: "Free Shipping", desc: "On orders $49+" },
  { icon: Shield, label: "Secure Payments", desc: "256-bit SSL" },
  { icon: RotateCcw, label: "Easy Returns", desc: "30-day policy" },
  { icon: Zap, label: "Fast Delivery", desc: "2-5 business days" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const Index = () => {
  const featuredProducts = products.filter((p) => p.isFeatured);
  const bestSellers = products.filter((p) => p.isBestseller);
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <Layout>
      {/* SEO */}
      <title>Martify – Premium Marketplace | Shop Top Brands</title>

      <div className="container py-6 space-y-12">
        {/* Hero */}
        <HeroCarousel />

        {/* Trust badges */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {trustBadges.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              variants={sectionVariants}
              whileHover={{ scale: 1.03, y: -3 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/40 cursor-default transition-all hover:shadow-soft"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-[11px] text-muted-foreground">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link to="/categories" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </motion.section>

        {/* Featured */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <p className="text-sm text-muted-foreground">Hand-picked by our team</p>
            </div>
            <Button variant="outline" className="rounded-xl" asChild>
              <Link to="/products">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </motion.section>

        {/* Deal banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden gradient-accent p-8 md:p-12 shadow-soft-lg"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200&h=500&fit=crop&q=80')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 max-w-md">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Limited Time</span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mt-2 font-display">
              Mega Deal Days
            </h3>
            <p className="text-white/85 mt-3 leading-relaxed">Up to 60% off on thousands of products. Hurry, offer ends soon!</p>
            <Button size="lg" className="mt-6 rounded-xl bg-card text-foreground hover:bg-card/90 font-semibold shadow-lg">
              Shop Deals
            </Button>
          </div>
        </motion.div>

        {/* Bestsellers */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">🔥 Bestsellers</h2>
            <Link to="/bestsellers" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              See All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </motion.section>

        {/* New arrivals */}
        {newArrivals.length > 0 && (
          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">✨ New Arrivals</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newArrivals.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Recently Viewed */}
        <RecentlyViewedProducts />
      </div>
    </Layout>
  );
};

export default Index;
