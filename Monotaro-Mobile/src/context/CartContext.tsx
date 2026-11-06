"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  sku: string;
  name: string;
  price: string;
  oldPrice?: string;
  icon: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (sku: string) => void;
  changeQty: (sku: string, delta: number) => void;
  setQty: (sku: string, qty: number) => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  function addItem(item: Omit<CartItem, "qty">, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.sku === item.sku);
      if (existing) {
        return prev.map((i) => i.sku === item.sku ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...item, qty }];
    });
  }

  function removeItem(sku: string) {
    setItems((prev) => prev.filter((i) => i.sku !== sku));
  }

  function changeQty(sku: string, delta: number) {
    setItems((prev) => prev.map((i) => i.sku === sku ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }

  function setQty(sku: string, qty: number) {
    setItems((prev) => prev.map((i) => i.sku === sku ? { ...i, qty: Math.max(1, qty) } : i));
  }

  const total = items.reduce((s, i) => {
    const num = parseInt(i.price.replace(/[^\d]/g, ""), 10) || 0;
    return s + num * i.qty;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, changeQty, setQty, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
