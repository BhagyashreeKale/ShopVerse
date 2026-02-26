import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/category/${category.slug}`}
        className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/40 hover-lift text-center transition-all hover:bg-card hover:shadow-soft"
      >
        <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-muted ring-2 ring-border/20 group-hover:ring-primary/30 transition-all">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
        </div>
        <div>
          <p className="text-sm font-semibold">{category.name}</p>
          {category.productCount && (
            <p className="text-[11px] text-muted-foreground">{category.productCount.toLocaleString()} items</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
