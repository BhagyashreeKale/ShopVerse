import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { categories } from "@/data/mock-data";

const Categories = () => {
  return (
    <Layout>
      <title>All Categories – Martify</title>
      <div className="container py-6 space-y-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold">Shop by Category</h1>
          <p className="text-sm text-muted-foreground mt-1">Browse all {categories.length} categories</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover-lift"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-semibold text-lg">{cat.name}</p>
                    {cat.productCount && (
                      <p className="text-white/70 text-xs">{cat.productCount.toLocaleString()} products</p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
