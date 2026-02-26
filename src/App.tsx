import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { CompareProvider } from "@/contexts/CompareContext";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Deals from "./pages/Deals";
import Categories from "./pages/Categories";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
            <CompareProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter basename="/zenith-commerce">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/category/:slug" element={<Products />} />
                  <Route path="/search" element={<Products />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/deals" element={<Deals />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/bestsellers" element={<Products />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </CompareProvider>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
