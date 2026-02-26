import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/data/mock-data";

const Wishlist = () => {
  const { items } = useWishlist();
  const wishlistedProducts = products.filter((p) => items.includes(p.id));

  return (
    <Layout>
      <title>Wishlist – Martify</title>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">My Wishlist ({wishlistedProducts.length})</h1>
        {wishlistedProducts.length === 0 ? (
          <div className="py-20 text-center">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Save items you love for later.</p>
            <Button asChild className="rounded-xl"><Link to="/products">Explore Products</Link></Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
