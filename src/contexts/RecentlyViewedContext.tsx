import React, { createContext, useContext, useState, useCallback } from "react";

interface RecentlyViewedContextType {
  viewedIds: string[];
  addViewed: (productId: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_RECENT = 10;

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [viewedIds, setViewedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("martify_recently_viewed") || "[]");
    } catch { return []; }
  });

  const addViewed = useCallback((productId: string) => {
    setViewedIds((prev) => {
      const next = [productId, ...prev.filter((id) => id !== productId)].slice(0, MAX_RECENT);
      localStorage.setItem("martify_recently_viewed", JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ viewedIds, addViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return context;
}
