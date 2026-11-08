"use client";

import { useRouter, useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";
import { DUMMY_CATEGORY_PRODUCTS, HIGHLIGHT, POPULAR, type Product } from "../../data";
import { ITEM_PRODUCTS } from "../../item-products";

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
  const { toggle: toggleWishlist, has: isWishlisted } = useWishlist();
  return (
    <div className="relative">
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
  );
}

export default function SubkategoriPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const { items: cartItems } = useCart();
  const { t } = useLanguage();
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const subCategoryName = decodeURIComponent(slug).replace(/-/g, " ");
  const products = ALL_PRODUCTS.filter((p) => p.subCategory === subCategoryName);

  return (
    <div className="min-h-dvh pb-6 bg-neutral-50">
      <header className="bg-brand sticky top-0 z-40 px-4 py-4 shadow-md rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.back()} className="text-white shrink-0" aria-label={t("common.back")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="text-white font-bold text-sm flex-1 truncate">{subCategoryName}</h1>
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

      <div className="mt-3 px-3">
        <p className="text-xs font-bold text-neutral-700 mb-3">{t("category.products_label")} ({products.length})</p>
        {products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <svg className="w-16 h-16 text-neutral-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h18v18H3zM9 9h6M9 12h6M9 15h4" />
            </svg>
            <p className="text-sm font-semibold text-neutral-500">{t("category.no_products")}</p>
            <p className="text-xs text-neutral-400">{t("category.no_products_sub_desc")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {products.map((p, index) => (
              <ProductCard key={`${p.name}-${index}`} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
