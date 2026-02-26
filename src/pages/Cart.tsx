import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { coupons } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const Cart = () => {
  const { items, updateQuantity, removeItem, total, itemCount, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof coupons[0] | null>(null);
  const [couponError, setCouponError] = useState("");

  const applyCoupon = () => {
    const found = coupons.find((c) => c.code === couponCode.toUpperCase());
    if (!found) { setCouponError("Invalid coupon code"); setAppliedCoupon(null); return; }
    if (total < found.minOrder) { setCouponError(`Minimum order $${found.minOrder} required`); return; }
    setAppliedCoupon(found);
    setCouponError("");
  };

  const discount = appliedCoupon
    ? appliedCoupon.type === "percent" ? total * (appliedCoupon.discount / 100) : appliedCoupon.discount
    : 0;
  const shipping = total >= 49 ? 0 : 5.99;
  const finalTotal = total - discount + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
          <Button asChild className="rounded-xl"><Link to="/products">Start Shopping</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <title>Cart – Martify</title>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart ({itemCount} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 p-4 rounded-2xl border border-border bg-card"
              >
                <Link to={`/product/${item.product.slug}`} className="shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="h-24 w-24 rounded-xl object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.slug}`}>
                    <h3 className="text-sm font-semibold line-clamp-2 hover:text-primary transition-colors">{item.product.name}</h3>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">{item.product.brand}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-xl">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center hover:bg-secondary rounded-l-xl">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center hover:bg-secondary rounded-r-xl">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-2xl border border-border bg-card space-y-4">
              <h2 className="font-bold text-lg">Order Summary</h2>

              {/* Coupon */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="rounded-xl"
                  />
                  <Button variant="outline" className="rounded-xl shrink-0" onClick={applyCoupon}>Apply</Button>
                </div>
                {couponError && <p className="text-xs text-destructive">{couponError}</p>}
                {appliedCoupon && (
                  <div className="flex items-center gap-2 text-xs text-success font-medium bg-success/10 p-2 rounded-lg">
                    <Tag className="h-3 w-3" />
                    {appliedCoupon.description} applied!
                    <button onClick={() => setAppliedCoupon(null)} className="ml-auto text-muted-foreground hover:text-foreground"><Trash2 className="h-3 w-3" /></button>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${total.toFixed(2)}</span></div>
                {discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span><span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full rounded-xl font-semibold" size="lg" asChild>
                <Link to="/checkout">Checkout <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>

              <p className="text-[11px] text-muted-foreground text-center">
                {shipping > 0 ? `Add $${(49 - total).toFixed(2)} more for free shipping` : "🎉 You qualify for free shipping!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
