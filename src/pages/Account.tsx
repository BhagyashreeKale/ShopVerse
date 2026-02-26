import { motion } from "framer-motion";
import { User, Package, MapPin, Heart, Settings, LogOut, ChevronRight, Bell, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { icon: Package, label: "My Orders", desc: "Track, return, or buy things again", path: "/orders", badge: "3" },
  { icon: Heart, label: "Wishlist", desc: "Your saved items", path: "/wishlist" },
  { icon: MapPin, label: "Addresses", desc: "Manage delivery addresses", path: "/account" },
  { icon: CreditCard, label: "Payment Methods", desc: "Saved cards & wallets", path: "/account" },
  { icon: Bell, label: "Notifications", desc: "Manage notification preferences", path: "/account" },
  { icon: Settings, label: "Account Settings", desc: "Password, email, preferences", path: "/account" },
];

const mockOrders = [
  { id: "ORD-7829", date: "Feb 10, 2026", total: 249.99, status: "shipped", item: "Premium Wireless Headphones" },
  { id: "ORD-7614", date: "Feb 3, 2026", total: 189.99, status: "delivered", item: "Italian Leather Messenger Bag" },
  { id: "ORD-7401", date: "Jan 22, 2026", total: 59.99, status: "delivered", item: "Minimalist Ceramic Vase Set" },
];

const statusColors: Record<string, string> = {
  placed: "bg-muted text-muted-foreground",
  shipped: "bg-primary/10 text-primary",
  delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-destructive/10 text-destructive",
};

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // If not logged in, show login prompt
  if (!user) {
    return (
      <Layout>
        <title>Account – Martify</title>
        <div className="container py-20 text-center max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-2">Sign in to your account</h1>
              <p className="text-sm text-muted-foreground">Access orders, wishlist, and more</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button className="rounded-xl font-semibold" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="outline" className="rounded-xl" asChild>
                <Link to="/signup">Create Account</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <title>My Account – Martify</title>
      <div className="container py-6 space-y-8 max-w-4xl">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-2xl border border-border bg-card"
        >
          <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
            <User className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-1">Member since {user.joinedAt}</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl shrink-0">Edit Profile</Button>
        </motion.div>

        {/* Quick menu */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {menuItems.map(({ icon: Icon, label, desc, path, badge }) => (
            <Link
              key={label}
              to={path}
              className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:bg-secondary/50 transition-colors group"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{label}</p>
                  {badge && <Badge variant="secondary" className="text-[10px] h-5">{badge}</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          ))}
        </motion.div>

        {/* Recent orders */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {mockOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card">
                <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{order.item}</p>
                  <p className="text-xs text-muted-foreground">{order.id} • {order.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold">${order.total}</p>
                  <Badge className={`text-[10px] ${statusColors[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => { logout(); navigate("/"); }}
        >
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </div>
    </Layout>
  );
};

export default Account;
