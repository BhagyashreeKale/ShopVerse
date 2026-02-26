import { useState, useRef, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X, MapPin, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { categories } from "@/data/mock-data";
import { trendingSearches } from "@/data/mock-data";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5 text-center font-medium tracking-wide">
        🚀 Free shipping on orders above $49 | Use code <span className="font-bold">WELCOME20</span> for 20% off
      </div>

      <div className="container flex items-center gap-4 h-16">
        {/* Mobile menu toggle */}
        {isMobile && (
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        )}

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-xl gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          {!isMobile && <span className="text-xl font-bold tracking-tight">Martify</span>}
        </Link>

        {/* Delivery location */}
        {!isMobile && (
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0">
            <MapPin className="h-3.5 w-3.5" />
            <div className="text-left">
              <p className="text-[10px]">Deliver to</p>
              <p className="font-semibold text-foreground">New York 10001</p>
            </div>
          </button>
        )}

        {/* Search */}
        <div ref={searchRef} className="flex-1 relative max-w-2xl">
          <form onSubmit={(e: FormEvent) => { e.preventDefault(); if (searchQuery.trim()) { navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`); setSearchOpen(false); } }} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, brands, categories..."
              className="pl-10 pr-4 h-10 rounded-xl bg-secondary border-0 focus-visible:ring-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
            />
          </form>

          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-full bg-card rounded-xl border shadow-soft-lg p-4 z-50"
              >
                <p className="text-xs font-semibold text-muted-foreground mb-2">TRENDING SEARCHES</p>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button key={term} onClick={() => { navigate(`/search?q=${encodeURIComponent(term)}`); setSearchOpen(false); }} className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {!isMobile && (
            <Button variant="ghost" size="icon" className="rounded-xl" asChild>
              <Link to="/account"><User className="h-5 w-5" /></Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="rounded-xl relative" asChild>
            <Link to="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Category nav (desktop) */}
      {!isMobile && (
        <nav className="border-t border-border/50">
          <div className="container flex items-center gap-1 h-10 overflow-x-auto scrollbar-none">
            <button
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
              className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors relative"
            >
              <Menu className="h-4 w-4" /> All Categories <ChevronDown className="h-3 w-3" />
              <AnimatePresence>
                {megaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 mt-1 w-[600px] grid grid-cols-3 gap-2 p-4 bg-card rounded-xl border shadow-soft-lg z-50"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <img src={cat.image} alt={cat.name} className="h-10 w-10 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm font-medium">{cat.name}</p>
                          <p className="text-[10px] text-muted-foreground">{cat.productCount} items</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="text-sm px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors whitespace-nowrap text-muted-foreground hover:text-foreground">
                {cat.name}
              </Link>
            ))}
            <Link to="/deals" className="text-sm px-3 py-1.5 rounded-lg text-destructive font-semibold hover:bg-destructive/10 transition-colors whitespace-nowrap">
              🔥 Deals
            </Link>
          </div>
        </nav>
      )}

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/50"
          >
            <div className="p-4 space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <img src={cat.image} alt={cat.name} className="h-8 w-8 rounded-lg object-cover" />
                  <span className="text-sm font-medium">{cat.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
