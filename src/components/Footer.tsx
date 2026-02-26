import { Link } from "react-router-dom";
import { categories } from "@/data/mock-data";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Martify</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your premium marketplace for quality products from trusted sellers worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Shop</h4>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Account</h4>
            <ul className="space-y-2">
              {["My Orders", "Wishlist", "Addresses", "Profile", "Help Center"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "Sell on Martify", "Press", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Martify. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Visa", "Mastercard", "PayPal", "UPI"].map((m) => (
              <span key={m} className="text-[10px] px-2 py-1 rounded bg-secondary text-muted-foreground font-medium">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
