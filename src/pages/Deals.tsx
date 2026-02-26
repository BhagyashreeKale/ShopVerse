import { motion } from "framer-motion";
import { Flame, Clock, Zap } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";

const Deals = () => {
  const dealProducts = products.filter((p) => p.discount > 0).sort((a, b) => b.discount - a.discount);

  return (
    <Layout>
      <title>Deals & Offers – Martify</title>
      <div className="container py-6 space-y-8">
        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-2xl overflow-hidden gradient-accent p-8 md:p-12"
        >
          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="h-6 w-6 text-white" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Limited Time Offers</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white font-display">
              Today's Best Deals
            </h1>
            <p className="text-white/80 mt-2">Up to 60% off on thousands of products. Grab them before they're gone!</p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-1.5 text-white/90">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Ends in 23h 45m</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/90">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">{dealProducts.length} deals live</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Deal products */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">🔥 All Deals</h2>
            <Badge variant="secondary">{dealProducts.length} offers</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dealProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Deals;
