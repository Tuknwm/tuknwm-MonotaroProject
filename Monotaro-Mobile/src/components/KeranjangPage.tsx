"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { POPULAR } from "@/app/data";
import type { Product } from "@/app/data";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";

function Stars() {
  return <span className="text-[11px] tracking-[-1px] text-orange-500">★★★★★</span>;
}

function ProductCard({ p }: { p: Product }) {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.push("/produk/1")} className="rounded-[8px] border border-neutral-200 overflow-hidden bg-white text-left w-full flex flex-col">
      <div className={`relative aspect-square w-full ${p.bg ?? "bg-neutral-50"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.icon} alt={p.name} className="w-full h-full object-contain" />
        {p.discount && <span className="absolute top-2 left-0 bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded-r">{p.discount}</span>}
      </div>
      <div className="p-2 flex flex-col gap-1 flex-1">
        <p className="text-[11px] text-neutral-700 leading-snug line-clamp-2 min-h-[30px]">{p.name}</p>
        <div className="mt-auto flex flex-col gap-1">
          {p.oldPrice && <p className="text-[10px] text-neutral-400 line-through leading-none">{p.oldPrice}</p>}
          <p className={`text-[13px] font-bold leading-none ${p.oldPrice ? "text-brand" : "text-neutral-900"}`}>{p.price}</p>
          <div className="flex items-center gap-1 mt-0.5"><Stars /><span className="text-[10px] text-neutral-500">({p.reviews})</span></div>
        </div>
      </div>
    </button>
  );
}

export function KeranjangContent() {
  const router = useRouter();
  const { t } = useLanguage();
  const { items, removeItem: ctxRemove, changeQty: ctxChangeQty } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [wishlisted, setWishlisted] = useState<string[]>([]);
  const [checked, setChecked] = useState<number[]>(() => items.map((_, i) => i));

  // sync checked when items length changes (item removed)
  const prevLen = useRef(items.length);
  if (items.length !== prevLen.current) {
    prevLen.current = items.length;
  }

  const allChecked = checked.length === items.length;

  function toggleAll() {
    setChecked(allChecked ? [] : items.map((_, i) => i));
  }

  function toggleItem(i: number) {
    setChecked((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  }

  function changeQty(i: number, delta: number) {
    const item = items[i];
    if (item) ctxChangeQty(item.sku, delta);
  }

  function removeItem(i: number) {
    const item = items[i];
    if (item) ctxRemove(item.sku);
    setChecked((prev) => prev.filter((x) => x !== i).map((x) => x > i ? x - 1 : x));
  }

  const totalItems = checked.reduce((s, i) => s + (items[i]?.qty ?? 0), 0);
  const totalPrice = checked.reduce((s, i) => {
    const item = items[i];
    if (!item) return s;
    const num = parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0;
    return s + num * item.qty;
  }, 0);
  const totalPriceStr = "Rp" + totalPrice.toLocaleString("id-ID");

  return (
    <div className="min-h-dvh pb-[260px]">
      {/* Header */}
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center bg-brand px-4 py-4 text-white shadow-md rounded-b-3xl">
        <div className="flex w-full items-center gap-2">
        <h1 className="text-[15px] font-bold text-white flex-1">{t("cart.title")}</h1>
        <button type="button" onClick={() => router.push("/wishlist")} className="p-1 relative">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          {wishlistItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand text-white text-[9px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
              {wishlistItems.length}
            </span>
          )}
        </button>
        </div>
      </header>

      <div className="section-transition pt-[72px]">

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 px-8 text-center">
          <svg className="w-16 h-16 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4h2l2.4 11h10.8L21 7.5H6.1" /><circle cx="9" cy="19.5" r="1.25" /><circle cx="17" cy="19.5" r="1.25" />
          </svg>
          <p className="text-sm font-semibold text-neutral-500">{t("cart.empty")}</p>
          <p className="text-xs text-neutral-400">{t("cart.empty_sub")}</p>
        </div>
      ) : (
        <div className="px-4 pt-4 flex flex-col gap-3">
          {/* Select all */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-brand w-4 h-4" />
            <span className="text-xs font-semibold text-neutral-700">{t("cart.select_all")} ({items.length})</span>
          </label>

          {/* Cart items */}
          {items.map((item, i) => (
            <div key={item.name} className="flex items-center gap-2">
              <input type="checkbox" checked={checked.includes(i)} onChange={() => toggleItem(i)} className="accent-brand w-4 h-4 shrink-0" />
              <div className="flex-1 min-w-0">
                <SwipeReveal
                  wishlisted={wishlisted.includes(item.sku)}
                  onWishlist={() => setWishlisted((prev) => prev.includes(item.sku) ? prev.filter((s) => s !== item.sku) : [...prev, item.sku])}
                  onDelete={() => removeItem(i)}
                >
                  <div className="bg-white rounded-[10px] border border-neutral-200 p-3 flex gap-3 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.icon} alt={item.name} className="w-16 h-16 rounded-[6px] object-cover bg-neutral-50 shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <p className="text-xs text-neutral-700 leading-snug line-clamp-2">{item.name}</p>
                  <p className="text-[10px] text-neutral-400">No. SKU: {item.sku}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-sm font-bold ${item.oldPrice ? "text-brand" : "text-neutral-900"}`}>{item.price}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-neutral-200 rounded-[6px] overflow-hidden">
                        <button type="button" onClick={() => changeQty(i, -1)} className="w-7 h-7 flex items-center justify-center text-neutral-500">
                          <svg width="9" height="2" viewBox="0 0 12 2" fill="currentColor"><rect width="12" height="2" rx="1"/></svg>
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-neutral-800">{item.qty}</span>
                        <button type="button" onClick={() => changeQty(i, 1)} className="w-7 h-7 flex items-center justify-center text-neutral-500">
                          <svg width="9" height="9" viewBox="0 0 12 12" fill="currentColor"><rect x="5" y="0" width="2" height="12" rx="1"/><rect x="0" y="5" width="12" height="2" rx="1"/></svg>
                        </button>
                      </div>
                      <button type="button" onClick={() => removeItem(i)} className="text-neutral-400 hover:text-brand transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
                  </div>
                </SwipeReveal>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Produk Terpopuler */}
      <section className="mt-5 py-4 border-t border-neutral-200">
        <div className="flex items-end justify-between px-4 mb-3">
          <h2 className="text-[15px] font-bold text-neutral-900">{t("section.popular")}</h2>
        </div>
        <div className="grid grid-cols-2 gap-2.5 px-4">
          {POPULAR.map((p) => <ProductCard key={p.name} p={p} />)}
        </div>
      </section>

      {/* Checkout bar — portal ke body supaya fixed tidak terpengaruh transform container */}
      {items.length > 0 && typeof document !== "undefined" && createPortal(
        <div className="fixed bottom-[calc(92px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[390px] bg-white rounded-[8px] shadow-[0_0_8px_2px_rgba(0,0,0,0.10)] px-4 py-4 flex flex-col gap-3 z-[90]">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-neutral-500">{t("cart.total_price")} <span className="text-neutral-400">({totalItems} {t("cart.items_count")})</span></p>
              <p className="text-xs font-semibold text-neutral-800">{totalPriceStr}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-neutral-500">{t("cart.ppn")}</p>
              <p className="text-xs font-semibold text-neutral-800">{"Rp" + Math.round(totalPrice * 0.11).toLocaleString("id-ID")}</p>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-100 pt-1.5">
              <p className="text-xs font-bold text-neutral-900">{t("cart.total_order")}</p>
              <p className="text-sm font-bold text-neutral-900">{"Rp" + Math.round(totalPrice * 1.11).toLocaleString("id-ID")}</p>
            </div>
          </div>
          <button
            type="button"
            disabled={checked.length === 0}
            onClick={() => { if (checked.length > 0) { sessionStorage.removeItem("selected_product"); router.push("/checkout"); } }}
            className={`w-full text-xs font-bold py-2.5 rounded-[8px] transition-colors ${checked.length > 0 ? "bg-brand text-white" : "bg-neutral-200 text-neutral-400 cursor-not-allowed"}`}
          >
            {t("cart.checkout_btn")}
          </button>
        </div>,
        document.body
      )}
      </div>
    </div>
  );
}

const REVEAL_WIDTH = 64;
const DELETE_THRESHOLD = 180;

function SwipeReveal({ children, wishlisted, onWishlist, onDelete }: { children: React.ReactNode; wishlisted: boolean; onWishlist: () => void; onDelete: () => void }) {
  const { t } = useLanguage();
  const startX = useRef(0);
  const startY = useRef(0);
  const isScrollGesture = useRef(false);
  const lockedRef = useRef(false);
  const leavingRef = useRef(false);
  const dragging = useRef(false);
  const [offset, setOffset] = useState(0);
  const [leaving, setLeaving] = useState(false);

  function handlePointerDown(e: React.PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    startY.current = e.clientY;
    isScrollGesture.current = false;
    dragging.current = true;
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging.current || leavingRef.current) return;
    const dx = startX.current - e.clientX;
    const dy = Math.abs(e.clientY - startY.current);
    // kalau gerakan vertikal lebih dominan, anggap scroll — batalkan gesture
    if (!isScrollGesture.current && dy > Math.abs(dx) && dy > 6) {
      isScrollGesture.current = true;
      if (!lockedRef.current) { setOffset(0); return; }
    }
    if (isScrollGesture.current && !lockedRef.current) return;
    const next = lockedRef.current ? Math.max(0, REVEAL_WIDTH + dx) : Math.max(0, dx);
    setOffset(next);
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (!dragging.current) return;
    dragging.current = false;
    if (leavingRef.current) return;
    if (isScrollGesture.current && !lockedRef.current) return;
    const delta = startX.current - e.clientX;
    const final = lockedRef.current ? Math.max(0, REVEAL_WIDTH + delta) : Math.max(0, delta);
    if (final >= DELETE_THRESHOLD) {
      leavingRef.current = true;
      setLeaving(true);
      setOffset(9999);
      setTimeout(onDelete, 280);
    } else if (lockedRef.current && final < REVEAL_WIDTH) {
      close();
    } else if (final >= REVEAL_WIDTH / 2) {
      setOffset(REVEAL_WIDTH);
      lockedRef.current = true;
    } else {
      close();
    }
  }

  function close() {
    setOffset(0);
    lockedRef.current = false;
  }

  function handleWishlist() {
    onWishlist();
    close();
  }

  return (
    <>
      {offset > 0 && !dragging.current && <div className="fixed inset-0 z-[5]" onClick={close} />}
      <div
        className={`relative overflow-hidden rounded-[10px] ${offset > 0 ? "z-10" : "z-0"}`}
        style={{ touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${offset}px)`,
            opacity: leaving ? 0 : 1,
            transition: (!dragging.current && (leaving || lockedRef.current || offset === 0)) ? "transform 220ms ease, opacity 220ms ease" : "none",
          }}
        >
          <div className="w-full shrink-0">{children}</div>
          <div
            className="shrink-0 flex items-center justify-center bg-amber-50 z-[6]"
            style={{ width: REVEAL_WIDTH }}
          >
            <button type="button" onClick={handleWishlist} className="flex flex-col items-center gap-1">
              <svg className={`w-5 h-5 ${wishlisted ? "fill-amber-400 stroke-amber-400" : "fill-none stroke-amber-400"}`} viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="text-[9px] font-semibold text-amber-500">{t("cart.wishlist_swipe")}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default KeranjangContent;
