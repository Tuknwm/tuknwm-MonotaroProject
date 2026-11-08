"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";
import { DUMMY_CATEGORY_PRODUCTS, HIGHLIGHT, POPULAR, type Product } from "../data";
import { ITEM_PRODUCTS } from "../item-products";

const ALL_PRODUCTS: Product[] = [
  ...HIGHLIGHT,
  ...POPULAR.filter((p) => !HIGHLIGHT.some((h) => h.name === p.name)),
  ...ITEM_PRODUCTS.filter((p) => !HIGHLIGHT.some((h) => h.name === p.name) && !POPULAR.some((pp) => pp.name === p.name)),
  ...DUMMY_CATEGORY_PRODUCTS,
];

function Stars() {
  return <span className="text-[11px] tracking-[-1px] text-orange-500">★★★★★</span>;
}

function ProductCard({ p }: { p: Product }) {
  const router = useRouter();
  return (
    <button
      type="button"
        onClick={() => {
          sessionStorage.setItem("selected_product", JSON.stringify(p));
          router.push("/produk/1");
        }}
      className="rounded-[8px] border border-neutral-200 overflow-hidden bg-white text-left w-full flex flex-col"
    >
      <div className={`relative aspect-square w-full ${p.bg ?? "bg-neutral-50"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.icon} alt={p.name} className="w-full h-full object-contain" />
        {p.discount && (
          <span className="absolute top-2 left-0 bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded-r">
            {p.discount}
          </span>
        )}
      </div>
      <div className="p-2 flex flex-col gap-1 flex-1">
        <p className="text-[11px] text-neutral-700 leading-snug line-clamp-2 min-h-[30px]">{p.name}</p>
        <div className="mt-auto flex flex-col gap-1">
          {p.oldPrice && <p className="text-[10px] text-neutral-400 line-through leading-none">{p.oldPrice}</p>}
          <p className={`text-[13px] font-bold leading-none ${p.oldPrice ? "text-brand" : "text-neutral-900"}`}>{p.price}</p>
          {p.reviews && (
            <div className="flex items-center gap-1 mt-0.5">
              <Stars />
              <span className="text-[10px] text-neutral-500">({p.reviews})</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

const POPULAR_SEARCHES = [
  "Baterai AA", "Kertas A4", "Sabun cuci piring", "WD-40", "Lakban", "Post-it",
  "Sarung tangan", "Kantong sampah", "Obeng", "Kopi bubuk",
];

function SearchPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const { items: cartItems } = useCart();
  const { toggle: toggleWishlist, has: isWishlisted } = useWishlist();
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const initialQ = searchParams.get("q") ?? "";
  const [inputVal, setInputVal] = useState(initialQ);
  const inputRef = useRef<HTMLDivElement>(null);

  // keep input in sync when URL changes (e.g. browser back/forward)
  useEffect(() => {
    const val = searchParams.get("q") ?? "";
    setInputVal(val);
    if (inputRef.current && inputRef.current.textContent !== val) {
      inputRef.current.textContent = val;
    }
  }, [searchParams]);

  // autofocus when arriving with empty query
  useEffect(() => {
    if (!initialQ) inputRef.current?.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const results = q
    ? ALL_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q))
    : [];

  function submit(val: string) {
    const trimmed = val.trim();
    if (!trimmed) return;
    router.replace(`/cari?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="min-h-dvh pb-6">
      {/* Header with search bar */}
      <header className="bg-brand sticky top-0 z-40 px-4 pt-2.5 pb-3 shadow-md rounded-b-3xl">
        <div className="flex items-center gap-3 mb-2.5">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-white shrink-0"
            aria-label={t("common.back")}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <div className="relative flex flex-1 items-center bg-white rounded-[8px] overflow-hidden px-3 gap-2">
            <svg className="w-4 h-4 shrink-0 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="m21 21-4.3-4.3M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
            </svg>
            <div
              ref={inputRef}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setInputVal((e.currentTarget as HTMLDivElement).textContent ?? "")}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit((e.currentTarget as HTMLDivElement).textContent ?? ""); } }}
              spellCheck={false}
              className="flex-1 min-w-0 py-2.5 pr-1 text-xs outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-neutral-400"
              data-placeholder={t("search.placeholder")}
            />
            {inputVal && (
              <button
                type="button"
                onClick={() => { setInputVal(""); if (inputRef.current) inputRef.current.textContent = ""; inputRef.current?.focus(); }}
                className="text-neutral-400 shrink-0 flex items-center justify-center w-4 h-4"
              >
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3 h-3"><path d="M2 2l10 10M12 2L2 12"/></svg>
              </button>
            )}
          </div>
          {inputVal.trim() && (
            <button
              type="button"
              onClick={() => submit(inputVal)}
              className="text-white text-xs font-bold shrink-0"
            >
              {t("common.search")}
            </button>
          )}
          <button
            type="button"
            onClick={() => { sessionStorage.setItem("open_keranjang", "1"); router.push("/"); }}
            className="relative text-white shrink-0"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4h2l2.4 11h10.8L21 7.5H6.1" /><circle cx="9" cy="19.5" r="1.25" /><circle cx="17" cy="19.5" r="1.25" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-yellow-300 text-brand text-[9px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="page-content">
        {/* No query yet — show popular searches */}
        {!q && (
          <div className="px-4 pt-5">
            <p className="text-xs font-bold text-neutral-700 mb-3">{t("search.popular")}</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setInputVal(s); submit(s); }}
                  className="text-xs font-semibold text-neutral-700 bg-neutral-100 px-3 py-1.5 rounded-full"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {q && (
          <div className="px-4 pt-4">
            <p className="text-xs text-neutral-500 mb-3">
              {results.length > 0
                ? `${results.length} ${t("search.result_count")} "${searchParams.get("q")}"`
                : `${t("search.no_result")} "${searchParams.get("q")}"`}
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 gap-2.5">
                {results.map((p, index) => (
                  <div key={`${p.name}-${index}`} className="relative">
                    <ProductCard p={p} />
                    <button
                      type="button"
                      onClick={() => toggleWishlist({ sku: p.name, name: p.name, price: p.price, icon: p.icon })}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center shadow-sm"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill={isWishlisted(p.name) ? "#f59e0b" : "none"} stroke={isWishlisted(p.name) ? "#f59e0b" : "#a3a3a3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <svg className="w-16 h-16 text-neutral-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path strokeLinecap="round" d="m21 21-4.3-4.3M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
                </svg>
                <p className="text-sm font-semibold text-neutral-500">{t("search.not_found")}</p>
                <p className="text-xs text-neutral-400">{t("search.try_different")}</p>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {POPULAR_SEARCHES.slice(0, 4).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { setInputVal(s); submit(s); }}
                      className="text-xs font-semibold text-brand bg-brand/10 px-3 py-1.5 rounded-full"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageInner />
    </Suspense>
  );
}
