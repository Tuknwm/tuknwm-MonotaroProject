"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORY_SECTIONS, ALL_BRANDS, DUMMY_CATEGORY_PRODUCTS, HIGHLIGHT, POPULAR, type Product } from "../../data";
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


const SORT_KEYS = ["sort.highest_price", "sort.lowest_price", "sort.most_popular", "sort.popular", "sort.new_products", "sort.best_seller"] as const;

const AREAS = [
  "Kota Bekasi", "DKI Jakarta", "Jawa Barat", "Banten", "Sumatera Utara",
  "Kota Surabaya", "Kab. Bekasi", "Kota Bandung", "Kota Bogor", "Kota Depok",
  "Jawa Timur", "Kota Medan", "Kota Semarang", "Kota Tangerang",
  "Kota Tangerang Selatan", "Daerah Istimewa Yogyakarta", "Jawa Tengah",
  "Kalimantan Timur", "Sulawesi Selatan", "Sumatera Selatan", "Riau",
  "Kota Palembang", "Kota Makassar", "Kepulauan Riau", "Bali",
];

function FilterSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [brandOpen, setBrandOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [dropdownMounted, setDropdownMounted] = useState(false);
  const [dropdownType, setDropdownType] = useState<"brand" | "area">("brand");
  const [selectedArea, setSelectedArea] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<typeof SORT_KEYS[number] | "">("");
  const brandButtonRef = useRef<HTMLButtonElement>(null);
  const areaButtonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const startY = useRef(0);
  const startX = useRef(0);
  const [dragY, setDragY] = useState(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const filteredBrands = ALL_BRANDS.filter((b) =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const toggleBrand = (name: string) =>
    setSelectedBrands((p) => p.includes(name) ? p.filter((b) => b !== name) : [...p, name]);

  const handleDragStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
    setDragY(0);
  };
  const handleDragMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dy = e.touches[0].clientY - startY.current;
    const dx = Math.abs(e.touches[0].clientX - startX.current);
    if (dx > Math.abs(dy)) return;
    if (dy > 0) { e.preventDefault(); setDragY(dy); }
  };
  const handleDragEnd = () => {
    isDragging.current = false;
    if (dragY > 100) onClose();
    setDragY(0);
  };

  const toggleDropdown = (type: "brand" | "area") => {
    const nextOpen = type === "brand" ? !brandOpen : !areaOpen;
    setBrandOpen(type === "brand" ? nextOpen : false);
    setAreaOpen(type === "area" ? nextOpen : false);

    if (nextOpen) {
      setDropdownType(type);
      setDropdownMounted(true);
      const button = (type === "brand" ? brandButtonRef : areaButtonRef).current;
      if (button) {
        const rect = button.getBoundingClientRect();
        setDropdownPos({ top: rect.bottom + 8, left: rect.left, width: rect.width });
      }
    } else {
      window.setTimeout(() => {
        setDropdownMounted(false);
        setDropdownPos(null);
      }, 180);
    }
  };

  // always render so the close transition plays; sheet slides out when open=false
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end overflow-hidden"
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0 }}
        onClick={onClose}
      />
      <div
        className="relative bg-white rounded-t-2xl max-h-[85dvh] flex flex-col overflow-hidden"
        style={{
          transform: !open ? "translateY(100%)" : dragY > 0 ? `translateY(${dragY}px)` : "none",
          transition: dragY === 0 ? "transform 0.35s cubic-bezier(0.32,0.72,0,1)" : "none",
        }}
      >
        {/* Drag handle — only this area handles swipe */}
        <div
          className="flex justify-center pt-3 pb-1 shrink-0 cursor-grab active:cursor-grabbing"
          style={{ touchAction: "none" }}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="w-10 h-1 rounded-full bg-neutral-300" />
        </div>
        <div className="flex items-center justify-between px-4 pb-3 shrink-0">
          <p className="text-sm font-bold text-neutral-900">{t("filter.title")}</p>
          <button onClick={onClose} className="text-neutral-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Scrollable content — vertical only, no horizontal */}
        <div className="overflow-y-auto overflow-x-hidden overscroll-contain flex-1 px-4 pb-6 flex flex-col gap-5" style={{ touchAction: "pan-y" }}>
          {/* Merek */}
          <div>
            <button
              type="button"
              ref={brandButtonRef}
              onClick={() => toggleDropdown("brand")}
              className="w-full flex items-center justify-between border border-neutral-200 rounded-[8px] px-3 py-2.5"
            >
              <span className="text-xs font-bold text-neutral-700">
                {t("filter.brand")}
                {selectedBrands.length > 0 && (
                  <span className="ml-2 bg-brand text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">{selectedBrands.length}</span>
                )}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`text-neutral-400 transition-transform ${brandOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            {dropdownMounted && dropdownType === "brand" && dropdownPos && (
              <div
                className={`fixed z-[70] bg-white border border-neutral-200 rounded-[8px] overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.16)] transition-all duration-200 ease-out ${brandOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0 pointer-events-none"}`}
                style={{ top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width }}
              >
                {/* Search */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-100">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400 shrink-0">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <input
                    type="text"
                    placeholder={t("filter.search_brand")}
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="flex-1 text-xs outline-none bg-transparent placeholder-neutral-400"
                  />
                  {brandSearch && (
                    <button onClick={() => setBrandSearch("")} className="text-neutral-400 shrink-0">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  )}
                </div>
                {/* Selected chips */}
                {selectedBrands.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 px-3 py-2 border-b border-neutral-100">
                    {selectedBrands.map((b) => (
                      <button key={b} onClick={() => toggleBrand(b)} className="flex items-center gap-1 bg-brand/10 text-brand text-[10px] font-semibold rounded-full px-2 py-1">
                        {b}
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    ))}
                  </div>
                )}
                {/* List */}
                <div className="max-h-48 overflow-y-auto" style={{ touchAction: "pan-y" }}>
                  {filteredBrands.length === 0 ? (
                    <p className="text-xs text-neutral-400 text-center py-4">{t("filter.brand_not_found")}</p>
                  ) : (
                    filteredBrands.map((b) => (
                      <button
                        key={b.name}
                        onClick={() => toggleBrand(b.name)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-left border-b border-neutral-50 last:border-0 active:bg-neutral-50"
                      >
                        <span className="text-xs text-neutral-800">{b.name}</span>
                        {selectedBrands.includes(b.name) && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand shrink-0">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Area */}
          <div>
            <button
              type="button"
              ref={areaButtonRef}
              onClick={() => toggleDropdown("area")}
              className="w-full flex items-center justify-between border border-neutral-200 rounded-[8px] px-3 py-2.5"
            >
              <span className="text-xs font-bold text-neutral-700">
                {t("filter.area")}
                {selectedArea && (
                  <span className="ml-2 text-brand font-normal">({selectedArea})</span>
                )}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`text-neutral-400 transition-transform ${areaOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {dropdownMounted && dropdownType === "area" && dropdownPos && (
              <div
                className={`fixed z-[70] bg-white border border-neutral-200 rounded-[8px] overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.16)] transition-all duration-200 ease-out ${areaOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0 pointer-events-none"}`}
                style={{ top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width }}
              >
                <div className="max-h-48 overflow-y-auto" style={{ touchAction: "pan-y" }}>
                  {AREAS.map((a) => (
                    <button
                      key={a}
                      onClick={() => { setSelectedArea(a === selectedArea ? "" : a); setAreaOpen(false); }}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-left border-b border-neutral-50 last:border-0 active:bg-neutral-50"
                    >
                      <span className={`text-xs ${a === selectedArea ? "text-brand font-semibold" : "text-neutral-800"}`}>{a}</span>
                      {a === selectedArea && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand shrink-0">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rentang Harga */}
          <div>
            <p className="text-xs font-bold text-neutral-700 mb-2">{t("filter.price_range")}</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="flex-1 border border-neutral-200 rounded-[8px] px-3 py-2 text-xs outline-none focus:border-brand"
              />
              <span className="text-neutral-400 text-xs">–</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="flex-1 border border-neutral-200 rounded-[8px] px-3 py-2 text-xs outline-none focus:border-brand"
              />
            </div>
          </div>

          {/* Urutkan */}
          <div>
            <p className="text-xs font-bold text-neutral-700 mb-2">{t("filter.sort")}</p>
            <div className="flex flex-wrap gap-2">
              {SORT_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => setSort(sort === key ? "" : key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${sort === key ? "bg-brand text-white border-brand" : "bg-white text-neutral-700 border-neutral-200"}`}
                >
                  {t(key)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apply */}
        <div className="px-4 py-3 border-t border-neutral-100 shrink-0 flex gap-2">
          <button
            onClick={() => { setSelectedBrands([]); setSelectedArea(""); setAreaOpen(false); setMinPrice(""); setMaxPrice(""); setSort(""); }}
            className="flex-1 py-2.5 rounded-[8px] border border-neutral-200 text-xs font-bold text-neutral-600"
          >
            Reset
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-[8px] bg-brand text-white text-xs font-bold">
            {t("filter.apply")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function KategoriPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const { items: cartItems } = useCart();
  const { t } = useLanguage();
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const [filterOpen, setFilterOpen] = useState(false);

  const name = decodeURIComponent(slug);

  // mode 1: slug matches a main category
  const section = CATEGORY_SECTIONS.find((s) => s.name.toLowerCase() === name.toLowerCase());

  // mode 2: slug matches a group inside any section
  const group = !section
    ? CATEGORY_SECTIONS.flatMap((s) => s.groups).find((g) => g.name.toLowerCase() === name.toLowerCase())
    : null;

  // products: main category → filter by category, group → filter by subCategory
  const products = section
    ? ALL_PRODUCTS.filter((p) => p.category === section.name)
    : group
      ? ALL_PRODUCTS.filter((p) => group.items.includes(p.subCategory ?? ""))
      : ALL_PRODUCTS.filter((p) => p.subCategory === name);

  const title = section?.name ?? group?.name ?? name;

  return (
    <div className="min-h-dvh pb-6 bg-neutral-50">
      <header className="bg-brand sticky top-0 z-40 px-4 py-4 shadow-md rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.back()} className="text-white shrink-0" aria-label={t("common.back")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="text-white font-bold text-sm flex-1 truncate">{title}</h1>
          <button type="button" onClick={() => router.push("/wishlist")} className="text-white shrink-0" aria-label="Wishlist">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          </button>
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

      {/* Mode 1: main category — tampil daftar grup */}
      {section && (
        <div className="bg-white mt-3 mx-3 rounded-[8px] border border-neutral-100 overflow-hidden">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide px-4 pt-3 pb-2">{t("category.sub")}</p>
          <div className="divide-y divide-neutral-100">
            {section.groups.map((g) => (
              <button key={g.name} onClick={() => router.push(`/kategori/${encodeURIComponent(g.name)}`)} className="flex items-center gap-3 px-4 py-2.5 w-full text-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.img} alt={g.name} className="w-10 h-10 rounded-[6px] object-cover shrink-0 border border-neutral-100" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-neutral-800 truncate">{g.name}</p>
                  {g.items.length > 0 && (
                    <p className="text-[10px] text-neutral-400 truncate">{g.items.slice(0, 3).join(", ")}</p>
                  )}
                </div>
                <svg className="w-4 h-4 text-neutral-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>
          {section.stock && (
            <p className="text-[10px] text-neutral-400 px-4 py-2.5 border-t border-neutral-100">
              {section.stock} {t("category.products_available")}
            </p>
          )}
        </div>
      )}

      {/* Mode 2: group — tampil daftar item sub-kategori */}
      {group && group.items.length > 0 && (
        <div className="bg-white mt-3 mx-3 rounded-[8px] border border-neutral-100 overflow-hidden">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide px-4 pt-3 pb-2">{t("category.sub")}</p>
          <div className="divide-y divide-neutral-100">
            {group.items.map((item) => (
              <button key={item} onClick={() => router.push(`/subkategori/${encodeURIComponent(item)}`)} className="flex items-center justify-between gap-2 px-4 py-3 w-full text-left">
                <span className="text-xs font-semibold text-neutral-800">{item}</span>
                <svg className="w-4 h-4 text-neutral-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)} />

      {/* Produk */}
      <div className="mt-3 px-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-neutral-700 self-center">{t("category.products_label")} ({products.length})</p>
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 bg-white rounded-[8px] px-3 py-2"
            style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filter
          </button>
        </div>
        {products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <svg className="w-16 h-16 text-neutral-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h18v18H3zM9 9h6M9 12h6M9 15h4" />
            </svg>
            <p className="text-sm font-semibold text-neutral-500">{t("category.no_products")}</p>
            <p className="text-xs text-neutral-400">{t("category.no_products_desc")}</p>
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
