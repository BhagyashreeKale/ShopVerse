import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/types";

interface CompareContextType {
  items: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isComparing: (productId: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE = 4;

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const addToCompare = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.length >= MAX_COMPARE) return prev;
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromCompare = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const isComparing = useCallback((productId: string) => {
    return items.some((p) => p.id === productId);
  }, [items]);

  const clearCompare = useCallback(() => setItems([]), []);

  return (
    <CompareContext.Provider value={{ items, addToCompare, removeFromCompare, isComparing, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
}
