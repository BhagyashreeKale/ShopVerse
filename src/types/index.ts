export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  currency: string;
  images: string[];
  category: Category;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
  seller: Seller;
  variants?: Variant[];
  specifications?: Record<string, string>;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  description?: string;
  subcategories?: Category[];
  productCount?: number;
}

export interface Seller {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
  logo?: string;
}

export interface Variant {
  id: string;
  type: "color" | "size" | "storage";
  label: string;
  value: string;
  priceModifier?: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "placed" | "confirmed" | "shipped" | "delivered" | "cancelled" | "returned";
  date: string;
  address: Address;
  paymentMethod: string;
  trackingId?: string;
}
