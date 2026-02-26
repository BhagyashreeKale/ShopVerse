import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, CreditCard, Wallet, Banknote, MapPin, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

const steps = ["Address", "Payment", "Review"];

const Checkout = () => {
  const { items, total, clearCart, itemCount } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [address, setAddress] = useState({ name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = total >= 49 ? 0 : 5.99;
  const finalTotal = total + shipping;

  if (items.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  if (orderPlaced) {
    return (
      <Layout>
        <div className="container py-20 text-center max-w-md mx-auto">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-success" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
          <p className="text-muted-foreground mb-2">Order #MTF-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
          <p className="text-sm text-muted-foreground mb-6">Thank you for your order! You'll receive a confirmation email shortly.</p>
          <Button asChild className="rounded-xl"><Link to="/products">Continue Shopping</Link></Button>
        </div>
      </Layout>
    );
  }

  const canProceed = step === 0 ? address.name && address.phone && address.line1 && address.city && address.state && address.pincode : true;

  return (
    <Layout>
      <title>Checkout – Martify</title>
      <div className="container py-6 max-w-4xl">
        <Button variant="ghost" className="mb-4 rounded-xl" asChild><Link to="/cart"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Cart</Link></Button>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              )}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn("text-sm font-medium hidden sm:block", i <= step ? "text-foreground" : "text-muted-foreground")}>{s}</span>
              {i < steps.length - 1 && <div className={cn("w-12 h-0.5 rounded", i < step ? "bg-primary" : "bg-border")} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 0: Address */}
            {step === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <h2 className="font-bold text-lg flex items-center gap-2"><MapPin className="h-5 w-5" /> Delivery Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label className="text-xs">Full Name *</Label><Input value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} className="rounded-xl mt-1" /></div>
                  <div><Label className="text-xs">Phone *</Label><Input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="rounded-xl mt-1" /></div>
                  <div className="sm:col-span-2"><Label className="text-xs">Address Line 1 *</Label><Input value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} className="rounded-xl mt-1" /></div>
                  <div className="sm:col-span-2"><Label className="text-xs">Address Line 2</Label><Input value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} className="rounded-xl mt-1" /></div>
                  <div><Label className="text-xs">City *</Label><Input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="rounded-xl mt-1" /></div>
                  <div><Label className="text-xs">State *</Label><Input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="rounded-xl mt-1" /></div>
                  <div><Label className="text-xs">Pincode *</Label><Input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="rounded-xl mt-1" /></div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <h2 className="font-bold text-lg flex items-center gap-2"><CreditCard className="h-5 w-5" /> Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {[
                    { value: "card", icon: CreditCard, label: "Credit / Debit Card", desc: "Visa, Mastercard, Amex" },
                    { value: "upi", icon: Wallet, label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
                    { value: "cod", icon: Banknote, label: "Cash on Delivery", desc: "Pay when you receive" },
                  ].map(({ value, icon: Icon, label, desc }) => (
                    <label key={value} className={cn("flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors",
                      paymentMethod === value ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"
                    )}>
                      <RadioGroupItem value={value} />
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-semibold">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div><Label className="text-xs">Card Number</Label><Input placeholder="1234 5678 9012 3456" className="rounded-xl mt-1" /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label className="text-xs">Expiry</Label><Input placeholder="MM/YY" className="rounded-xl mt-1" /></div>
                      <div><Label className="text-xs">CVV</Label><Input placeholder="123" className="rounded-xl mt-1" /></div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
                  <h2 className="font-bold text-lg">Order Review</h2>
                  <div className="p-3 rounded-xl bg-secondary">
                    <p className="text-xs text-muted-foreground">Delivering to</p>
                    <p className="text-sm font-medium">{address.name}, {address.line1}, {address.city} {address.pincode}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary">
                    <p className="text-xs text-muted-foreground">Payment</p>
                    <p className="text-sm font-medium capitalize">{paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "upi" ? "UPI" : "Credit Card"}</p>
                  </div>
                  <div className="space-y-2 pt-2">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <img src={item.product.images[0]} alt="" className="h-12 w-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" className="rounded-xl" onClick={() => setStep((s) => s - 1)} disabled={step === 0}>Back</Button>
              {step < 2 ? (
                <Button className="rounded-xl" onClick={() => setStep((s) => s + 1)} disabled={!canProceed}>Continue</Button>
              ) : (
                <Button className="rounded-xl font-semibold" onClick={() => { clearCart(); setOrderPlaced(true); }}>
                  Place Order – ${finalTotal.toFixed(2)}
                </Button>
              )}
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-5 rounded-2xl border border-border bg-card space-y-3">
              <h3 className="font-bold">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Items ({itemCount})</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="border-t border-border pt-2 flex justify-between font-bold"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
