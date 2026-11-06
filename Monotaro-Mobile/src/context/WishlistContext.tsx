"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type WishlistItem = {
  sku: string;
  name: string;
  price: string;
  icon: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  toggle: (item: WishlistItem) => void;
  has: (sku: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(items));
    } catch {}
  }, [items]);

  function toggle(item: WishlistItem) {
    setItems((prev) =>
      prev.find((i) => i.sku === item.sku)
        ? prev.filter((i) => i.sku !== item.sku)
        : [...prev, item]
    );
  }

  function has(sku: string) {
    return items.some((i) => i.sku === sku);
  }

  return (
    <WishlistContext.Provider value={{ items, toggle, has }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
