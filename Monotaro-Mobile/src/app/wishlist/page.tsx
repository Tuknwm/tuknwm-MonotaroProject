"use client";

import { useRouter } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function WishlistPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { items, toggle } = useWishlist();
  const { addItem } = useCart();

  return (
    <main className="min-h-dvh">
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="text-neutral-500 shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-neutral-900 flex-1">{t("account.wishlist")}</h1>
        <span className="text-xs text-neutral-400">{items.length} {t("cart.items_count")}</span>
      </header>

      <div className="page-content">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 px-8 text-center">
          <svg className="w-16 h-16 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <p className="text-sm font-semibold text-neutral-500">{t("wishlist.empty")}</p>
          <p className="text-xs text-neutral-400">{t("wishlist.empty_sub")}</p>
          <button type="button" onClick={() => router.push("/")} className="mt-2 bg-brand text-white text-xs font-bold px-5 py-2.5 rounded-[8px]">{t("wishlist.start_shopping")}</button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-4">
          {items.map((item) => (
            <div key={item.sku} className="bg-white rounded-[10px] border border-neutral-200 p-3 flex gap-3 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.icon} alt={item.name} className="w-16 h-16 rounded-[6px] object-cover bg-neutral-50 shrink-0" onClick={() => router.push("/produk/1")} />
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <p className="text-xs text-neutral-700 leading-snug line-clamp-2">{item.name}</p>
                <p className="text-[10px] text-neutral-400">SKU: {item.sku}</p>
                <p className="text-sm font-bold text-brand">{item.price}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => { addItem({ sku: item.sku, name: item.name, price: item.price, icon: item.icon }); }}
                  className="text-[10px] font-bold text-white bg-brand px-2.5 py-1.5 rounded-[6px]"
                >
                  {t("cart.add_to_cart")}
                </button>
                <button
                  type="button"
                  onClick={() => toggle(item)}
                  className="text-[10px] font-semibold text-neutral-500 border border-neutral-200 px-2.5 py-1.5 rounded-[6px]"
                >
                  {t("wishlist.remove")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </main>
  );
}
