import { useCompare } from "@/contexts/CompareContext";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function CompareBar() {
  const { items, removeFromCompare, clearCompare } = useCompare();

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-lg px-4 py-3 lg:pb-3 pb-20"
      >
        <div className="container flex items-center gap-4">
          <div className="flex items-center gap-3 flex-1 overflow-x-auto">
            <span className="text-sm font-semibold text-muted-foreground shrink-0">
              Compare ({items.length}/4)
            </span>
            {items.map((product) => (
              <div
                key={product.id}
                className="relative shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary border border-border/50"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-8 w-8 rounded-lg object-cover"
                />
                <span className="text-xs font-medium max-w-[100px] truncate">{product.name}</span>
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="h-5 w-5 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/10 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={clearCompare} className="text-xs">
              Clear
            </Button>
            <Button size="sm" className="rounded-xl gap-1" asChild disabled={items.length < 2}>
              <Link to="/compare">
                Compare <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
