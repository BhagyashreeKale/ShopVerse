import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { products, categories } from "@/data/mock-data";
import { useIsMobile } from "@/hooks/use-mobile";

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

const brands = [...new Set(products.map((p) => p.brand))];

const Products = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const isMobile = useIsMobile();

  const [sort, setSort] = useState("popularity");
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  const category = slug ? categories.find((c) => c.slug === slug) : null;

  const filtered = useMemo(() => {
    let result = [...products];
    if (category) result = result.filter((p) => p.category.slug === slug);
    if (query) result = result.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
    if (minRating > 0) result = result.filter((p) => p.rating >= minRating);
    if (inStockOnly) result = result.filter((p) => p.inStock);

    switch (sort) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => (a.isNew ? -1 : 1)); break;
    }
    return result;
  }, [slug, query, sort, priceRange, selectedBrands, minRating, inStockOnly, category]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
  };

  const clearFilters = () => {
    setPriceRange([0, 1500]);
    setSelectedBrands([]);
    setMinRating(0);
    setInStockOnly(false);
  };

  const activeFilterCount = (selectedBrands.length > 0 ? 1 : 0) + (minRating > 0 ? 1 : 0) + (inStockOnly ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 1500 ? 1 : 0);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {activeFilterCount > 0 && (
          <button onClick={clearFilters} className="text-xs text-primary font-medium hover:underline">Clear All</button>
        )}
      </div>

      {/* Price */}
      <div className="space-y-3">
        <p className="text-sm font-medium">Price Range</p>
        <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={1500} step={10} className="py-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${priceRange[0]}</span><span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Brands</p>
        {brands.map((brand) => (
          <label key={brand} className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={selectedBrands.includes(brand)} onCheckedChange={() => toggleBrand(brand)} />
            <span className="text-sm">{brand}</span>
          </label>
        ))}
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Minimum Rating</p>
        {[4, 3, 2].map((r) => (
          <label key={r} className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={minRating === r} onCheckedChange={() => setMinRating(minRating === r ? 0 : r)} />
            <span className="text-sm">{r}★ & above</span>
          </label>
        ))}
      </div>

      {/* Availability */}
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox checked={inStockOnly} onCheckedChange={(checked) => setInStockOnly(!!checked)} />
        <span className="text-sm">In Stock Only</span>
      </label>
    </div>
  );

  return (
    <Layout>
      <title>{category ? `${category.name} – Martify` : query ? `Search: ${query} – Martify` : "All Products – Martify"}</title>
      <div className="container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{category ? category.name : query ? `Results for "${query}"` : "All Products"}</h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} products</p>
          </div>
          <div className="flex items-center gap-3">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-xl relative">
                    <SlidersHorizontal className="h-4 w-4 mr-1" /> Filters
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">{activeFilterCount}</span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                  <div className="mt-6"><FilterPanel /></div>
                </SheetContent>
              </Sheet>
            )}
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          {!isMobile && (
            <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-64 shrink-0">
              <div className="sticky top-28 p-5 rounded-2xl border border-border bg-card">
                <FilterPanel />
              </div>
            </motion.aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg font-semibold mb-2">No products found</p>
                <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters</p>
                <Button onClick={clearFilters} variant="outline" className="rounded-xl">Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
