import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, XCircle, ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockOrders = [
  {
    id: "ORD-7829",
    date: "Feb 10, 2026",
    total: 249.99,
    status: "shipped",
    items: [
      { name: "Premium Wireless Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop", qty: 1, price: 249.99 },
    ],
    tracking: "TRK-889234",
    eta: "Feb 18, 2026",
  },
  {
    id: "ORD-7614",
    date: "Feb 3, 2026",
    total: 189.99,
    status: "delivered",
    items: [
      { name: "Italian Leather Messenger Bag", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop", qty: 1, price: 189.99 },
    ],
    tracking: "TRK-776123",
    eta: "Feb 8, 2026",
  },
  {
    id: "ORD-7401",
    date: "Jan 22, 2026",
    total: 119.98,
    status: "delivered",
    items: [
      { name: "Minimalist Ceramic Vase Set", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=100&h=100&fit=crop", qty: 1, price: 59.99 },
      { name: "Organic Cotton Throw Blanket", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop", qty: 1, price: 59.99 },
    ],
    tracking: "TRK-665012",
    eta: "Jan 28, 2026",
  },
  {
    id: "ORD-7102",
    date: "Jan 5, 2026",
    total: 34.99,
    status: "cancelled",
    items: [
      { name: "Stainless Steel Water Bottle", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop", qty: 1, price: 34.99 },
    ],
  },
];

const statusConfig: Record<string, { icon: typeof Package; color: string; label: string }> = {
  placed: { icon: Package, color: "bg-muted text-muted-foreground", label: "Placed" },
  shipped: { icon: Truck, color: "bg-primary/10 text-primary", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", label: "Delivered" },
  cancelled: { icon: XCircle, color: "bg-destructive/10 text-destructive", label: "Cancelled" },
};

const Orders = () => {
  return (
    <Layout>
      <title>My Orders – Martify</title>
      <div className="container py-6 max-w-3xl">
        <Button variant="ghost" className="mb-4 rounded-xl" asChild>
          <Link to="/account"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Account</Link>
        </Button>

        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        <div className="space-y-4">
          {mockOrders.map((order, i) => {
            const config = statusConfig[order.status];
            const StatusIcon = config.icon;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl border border-border bg-card space-y-4"
              >
                {/* Order header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge className={`${config.color} text-xs`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {config.label}
                  </Badge>
                </div>

                {/* Items */}
                {order.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                ))}

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-sm font-bold">${order.total.toFixed(2)}</p>
                  </div>
                  {order.tracking && order.status !== "cancelled" && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Tracking: {order.tracking}</p>
                      {order.eta && order.status === "shipped" && (
                        <p className="text-xs text-primary font-medium">ETA: {order.eta}</p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
