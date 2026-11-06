"use client";

import { useRouter, useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { POPULAR } from "../../data";

const PRODUCT = {
  name: "ABC (Battery) Alkaline Battery AA (Baterai AA) LR6 Millenium Power 4B+2B 1pack(4+2pcs)",
  sku: "S000001674",
  brand: "ABC (Battery)",
  price: 27900,
  priceStr: "Rp27.900",
  unit: "1pack(4+2pcs)",
  reviews: 146,
  stock: "Ready Stock",
  sold: "Terjual > 5",
  images: [
    "https://picsum.photos/seed/abc/400/400",
    "https://picsum.photos/seed/abc2/400/400",
    "https://picsum.photos/seed/abc3/400/400",
  ],
  specs: [
    { label: "Model Number", value: "LR6" },
    { label: "Unit", value: "1pack(4+2pcs)" },
    { label: "Size", value: "AA" },
    { label: "Diameter", value: "13.7–14.5mm" },
    { label: "Total Height", value: "49.5–50.5mm" },
    { label: "Voltage", value: "1.5V" },
    { label: "Blister Pack", value: "Shrink Pack 4+2 pcs" },
    { label: "Lisensi SNI", value: "Ada" },
    { label: "Nomor SNI", value: "Plant 1: 288/..." },
    { label: "Berat", value: "0.1 Kg" },
  ],
  descID: "Baterai Alkalin ABC LR6 (AA) Millenium Power merupakan baterai alkalin berkualitas tinggi yang dirancang untuk memberikan daya tahan lama. Cocok untuk berbagai perangkat elektronik seperti remote control, jam dinding, mainan, dan peralatan rumah tangga lainnya. 1pack berisi 6pcs (4+2 bonus).",
  descEN: "ABC LR6 (AA) Millenium Power Alkaline Battery is a high-quality alkaline battery designed to provide long-lasting power. Suitable for various electronic devices such as remote controls, wall clocks, toys, and other household appliances. 1 pack contains 6pcs (4+2 bonus).",
};

const VARIANTS = [
  { sku: "S000007807", blister: "Shrink Pack 2 pcs",    sni: "Ya",  unit: "1pack(2pcs)",               price: "Rp14.900",    stock: "Ready Stock",    days: null },
  { sku: "S000001674", blister: "Shrink Pack 4+2 pcs",  sni: "Ya",  unit: "1pack(4+2pcs)",             price: "Rp27.900",    stock: "Ready Stock",    days: null },
  { sku: "S043477715", blister: "Shrink Pack 8 pcs",    sni: "-",   unit: "1pack(8pcs)",               price: "Rp35.900",    stock: "Ready Stock",    days: null },
  { sku: "S028361534", blister: "Box (48 pcs)",         sni: "-",   unit: "1box(48pcs)",               price: "Rp329.900",   stock: "Ready Stock",    days: null },
  { sku: "S028113195", blister: "Carton (288 pcs)",     sni: "Ya",  unit: "1carton(24packs/288pcs)",   price: "Rp1.899.900", stock: "Ready Stock",    days: null },
  { sku: "S028113119", blister: "Carton (432 pcs)",     sni: "Ya",  unit: "1carton(72packs/432pcs)",   price: "Rp2.199.900", stock: null,             days: "3–7 hari kerja" },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="text-orange-500 tracking-tight text-sm">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

export default function ProdukDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { addItem, items: cartItems } = useCart();
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartIconRef = useRef<HTMLButtonElement>(null);
  const productImgRef = useRef<HTMLImageElement>(null);
  const [flyDot, setFlyDot] = useState<{ from: {x:number,y:number}; size: number; img: string; to: {x:number,y:number}; active: boolean } | null>(null);
  const [cartBump, setCartBump] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const { toggle: toggleWishlist, has: isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(PRODUCT.sku);
  const [specOpen, setSpecOpen] = useState(true);
  const [infoOpen, setInfoOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // varian bottom sheet
  const [showSheet, setShowSheet] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [sheetMode, setSheetMode] = useState<"keranjang" | "beli">("keranjang");
  const [selectedSku, setSelectedSku] = useState<string | null>(null);
  const [qty, setQtyState] = useState(1);
  const { t } = useLanguage();
  const [reviewFilter, setReviewFilter] = useState("product.filter_latest");
  const dragY = useRef(0);
  const startDragY = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = handleRef.current;
    const sheet = sheetRef.current;
    if (!el || !sheet) return;

    function onStart(e: TouchEvent) {
      startDragY.current = e.touches[0].clientY;
      dragY.current = 0;
      sheet!.style.transition = "none";
      e.preventDefault();
    }
    function onMove(e: TouchEvent) {
      e.preventDefault();
      const dy = e.touches[0].clientY - startDragY.current;
      if (dy > 0) {
        dragY.current = dy;
        sheet!.style.transform = `translateY(${dy}px)`;
      }
    }
    function onEnd() {
      sheet!.style.transition = "transform 320ms cubic-bezier(0.32,0.72,0,1)";
      if (dragY.current > 120) {
        sheet!.style.transform = "translateY(100%)";
        setTimeout(closeSheet, 320);
      } else {
        sheet!.style.transform = "translateY(0)";
      }
      dragY.current = 0;
    }

    el.addEventListener("touchstart", onStart, { passive: false });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSheet]);

  const selectedVariant = VARIANTS.find((v) => v.sku === selectedSku);

  function flyToCart() {
    const cartEl = cartIconRef.current;
    const imgEl = productImgRef.current;
    if (!cartEl) return;
    const cartRect = cartEl.getBoundingClientRect();
    const imgRect = imgEl ? imgEl.getBoundingClientRect() : null;
    const SIZE = 72;
    const from = imgRect
      ? { x: imgRect.left + imgRect.width / 2 - SIZE / 2, y: imgRect.top + imgRect.height / 2 - SIZE / 2 }
      : { x: window.innerWidth / 2 - SIZE / 2, y: window.innerHeight / 2 - SIZE / 2 };
    const to = { x: cartRect.left + cartRect.width / 2 - SIZE / 2, y: cartRect.top + cartRect.height / 2 - SIZE / 2 };
    const img = PRODUCT.images[imgIdx];
    setFlyDot({ from, to, size: SIZE, img, active: false });
    requestAnimationFrame(() => requestAnimationFrame(() => setFlyDot((d) => d ? { ...d, active: true } : null)));
    setTimeout(() => { setCartBump(true); setTimeout(() => setCartBump(false), 300); }, 550);
    setTimeout(() => setFlyDot(null), 750);
  }

  function openSheet(mode: "keranjang" | "beli") {
    setSheetMode(mode);
    setSelectedSku(PRODUCT.sku);
    setQtyState(1);
    setShowSheet(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setSheetVisible(true)));
  }
  function closeSheet() {
    setSheetVisible(false);
    setTimeout(() => setShowSheet(false), 320);
  }
  function setQty(v: number) { setQtyState(Math.max(1, v)); }

  return (
    <div className="min-h-dvh pb-[80px]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 relative flex items-center px-4 py-3 gap-3">
        <button type="button" onClick={() => router.back()} className="text-neutral-500 shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Logo.png" alt="monotaro.id" className="absolute left-1/2 -translate-x-1/2 h-6 w-auto object-contain" />
        <button
          type="button"
          ref={cartIconRef}
          onClick={() => { sessionStorage.setItem("open_keranjang", "1"); router.push("/"); }}
          className={`ml-auto relative text-neutral-500 shrink-0 ${cartBump ? "cart-bump" : ""}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4h2l2.4 11h10.8L21 7.5H6.1"/><circle cx="9" cy="19.5" r="1.25"/><circle cx="17" cy="19.5" r="1.25"/>
          </svg>
          {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-brand text-white text-[9px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center">{cartCount}</span>}
        </button>
      </header>

      <div className="page-content">
      {/* Gambar produk */}
      <div className="bg-white">
        <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={productImgRef} src={PRODUCT.images[imgIdx]} alt={PRODUCT.name} className="w-full h-full object-contain p-4" />
        </div>
        {/* Thumbnail strip */}
        <div className="flex gap-2 px-4 py-3">
          {PRODUCT.images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setImgIdx(i)}
              className={`w-14 h-14 rounded-[6px] border-2 overflow-hidden shrink-0 ${i === imgIdx ? "border-brand" : "border-neutral-200"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      </div>

      {/* Info utama */}
      <div className="bg-white mt-2 px-4 py-4 flex flex-col gap-2">
        {/* Brand */}
        <span className="text-[11px] font-semibold text-brand uppercase tracking-wide">{PRODUCT.brand}</span>
        {/* Nama */}
        <h1 className="text-sm font-bold text-neutral-900 leading-snug">{PRODUCT.name}</h1>
        {/* SKU */}
        <p className="text-[11px] text-neutral-400">No. SKU: {PRODUCT.sku}</p>
        {/* Rating */}
        <div className="flex items-center gap-2 mt-1">
          <Stars />
          <span className="text-xs text-neutral-500">{PRODUCT.reviews} Ulasan</span>
          <span className="text-neutral-300">|</span>
          <span className="text-[11px] text-neutral-500">{PRODUCT.sold}</span>
        </div>
        {/* Harga */}
        <div className="mt-2 p-3 bg-neutral-50 rounded-[8px]">
          <p className="text-[11px] text-neutral-500 mb-0.5">Sebelum PPN</p>
          <p className="text-xl font-extrabold text-brand">{PRODUCT.priceStr}</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">{PRODUCT.unit}</p>
        </div>
      </div>

      {/* Spesifikasi */}
      <div className="bg-white mt-2">
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-4"
          onClick={() => setSpecOpen((o) => !o)}
        >
          <span className="text-sm font-bold text-neutral-900">Spesifikasi Produk</span>
          <svg className={`w-4 h-4 text-neutral-400 transition-transform ${specOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        {specOpen && (
          <table className="w-full text-xs mb-4">
            <tbody>
              {PRODUCT.specs.map((s, i) => (
                <tr key={s.label} className={i % 2 === 0 ? "bg-neutral-50" : "bg-white"}>
                  <td className="px-4 py-2.5 font-semibold text-neutral-600 w-[45%] align-top">{s.label}</td>
                  <td className="px-4 py-2.5 text-neutral-800 align-top">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Informasi Produk */}
      <div className="bg-white mt-2">
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-4"
          onClick={() => setInfoOpen((o) => !o)}
        >
          <span className="text-sm font-bold text-neutral-900">Informasi Produk</span>
          <svg className={`w-4 h-4 text-neutral-400 transition-transform ${infoOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        {infoOpen && (
          <div className="px-4 pb-4 flex flex-col gap-4">
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide mb-1.5">Deskripsi (ID)</p>
              <p className="text-xs text-neutral-700 leading-relaxed">{PRODUCT.descID}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide mb-1.5">Description (EN)</p>
              <p className="text-xs text-neutral-700 leading-relaxed">{PRODUCT.descEN}</p>
            </div>
          </div>
        )}
      </div>

      {/* Dokumentasi Produk */}
      <div className="bg-white mt-2 px-4 py-4">
        <p className="text-sm font-bold text-neutral-900 mb-3">Dokumentasi Produk</p>
        <a href="#" className="flex items-center gap-3 p-3 border border-neutral-200 rounded-[8px]">
          <div className="w-9 h-9 rounded-[6px] bg-red-50 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-neutral-800 line-clamp-1">Alkaline Battery - LR6 Series</p>
            <p className="text-[11px] text-neutral-400">PDF</p>
          </div>
          <svg className="w-4 h-4 text-neutral-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        </a>
      </div>

      {/* Ketentuan */}
      <div className="bg-white mt-2 px-4 py-4 mb-2">
        <p className="text-sm font-bold text-neutral-900 mb-3">Ketentuan dan Kondisi Barang</p>
        <div className="flex items-center gap-3 p-3 bg-brand/5 rounded-[8px] border border-brand/20">
          <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-800">e-Commerce Authorized Partner</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">Produk resmi terjamin keasliannya</p>
          </div>
        </div>
      </div>

      {/* Ulasan Produk */}
      <div className="bg-white mt-2 pt-4">
        <div className="flex items-center justify-between px-4 mb-2">
          <p className="text-sm font-bold text-neutral-900">{t("product.reviews")}</p>
          <button type="button" onClick={() => router.push(`/produk/${params.id}/ulasan`)} className="text-[11px] font-semibold text-brand">{t("common.see_all")}</button>
        </div>
        <div className="flex gap-1.5 px-4 mb-3 overflow-x-auto no-scrollbar">
          {(["product.filter_latest", "product.filter_photo", "product.filter_top_rating", "product.filter_low_rating"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setReviewFilter(f)}
              className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                reviewFilter === f ? "bg-brand text-white border-brand" : "bg-white text-neutral-600 border-neutral-200"
              }`}
            >
              {t(f)}
            </button>
          ))}
        </div>
        <div className="flex flex-col divide-y divide-neutral-100 px-4">
          {[
            { name: "Peter",   date: "19 Okt 2026", rating: 5, title: "Kualitas Baik",       body: "kualitas baik, pengiriman cepat, harga kompetitif, free ongkir",    sku: "S043477715", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Millennium Power 8B 1pack(8pcs)",   isCurrent: false, img: "https://picsum.photos/seed/rev1/80/80" },
            { name: "Neneng",  date: "14 Okt 2026", rating: 5, title: "Kualitas Baik",       body: "kualitas baik",                                                      sku: "S043477715", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Millennium Power 8B 1pack(8pcs)",   isCurrent: false, img: "https://picsum.photos/seed/rev2/80/80" },
            { name: "Tom",     date: "13 Okt 2026", rating: 5, title: "Harga Kompetitif",    body: "baterai terbaik harga kompetitif",                                   sku: "S000001674", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Millenion Power 4B+2B 1pack(4+2pcs)", isCurrent: true,  img: "https://picsum.photos/seed/rev3/80/80" },
            { name: "Sari",    date: "10 Okt 2026", rating: 4, title: "Lumayan Bagus",       body: "produk sesuai deskripsi, pengiriman agak lama tapi oke",             sku: "S000007807", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Shrink Pack 2pcs 1pack(2pcs)",       isCurrent: false, img: "https://picsum.photos/seed/rev4/80/80" },
            { name: "Budi",    date: "05 Okt 2026", rating: 5, title: "Recommended!",        body: "sudah beli berkali-kali, kualitas konsisten dan tahan lama",         sku: "S028361534", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Box (48 pcs)",                        isCurrent: false, img: "https://picsum.photos/seed/rev5/80/80" },
            { name: "Dewi",    date: "01 Okt 2026", rating: 3, title: "Cukup",               body: "baterai standar, tidak ada yang istimewa tapi harga terjangkau",     sku: "S000001674", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Millenion Power 4B+2B 1pack(4+2pcs)", isCurrent: true,  img: "https://picsum.photos/seed/rev6/80/80" },
            { name: "Agus",    date: "28 Sep 2026", rating: 5, title: "Mantap",              body: "fast respon, packing aman, barang ori",                              sku: "S043477715", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Millennium Power 8B 1pack(8pcs)",   isCurrent: false, img: "https://picsum.photos/seed/rev7/80/80" },
            { name: "Rina",    date: "22 Sep 2026", rating: 4, title: "Baik",                body: "produk bagus, sesuai ekspektasi, akan beli lagi",                    sku: "S028113195", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Carton (288 pcs)",                   isCurrent: false, img: "https://picsum.photos/seed/rev8/80/80" },
          ].slice(0, 4).map((r) => (
            <div key={r.name + r.date} className="py-4 flex flex-col gap-2">
              {/* Header: avatar + nama + tanggal */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-neutral-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">{r.name}</span>
                </div>
                <span className="text-[10px] text-neutral-400">{r.date}</span>
              </div>
              {/* Bintang + judul */}
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f97316"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p className="text-xs font-bold text-neutral-900">{r.title}</p>
              {/* Foto + deskripsi sejajar */}
              <div className="flex gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.img} alt="" className="w-16 h-16 rounded-[6px] object-cover border border-neutral-200 shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <p className="text-xs text-neutral-600">{r.body}</p>
                  <p className="text-[11px] text-neutral-500 leading-snug">
                    SKU: <span className="text-brand">{r.sku}</span> {r.skuLabel}
                    {r.isCurrent && <span className="text-brand ml-1">(Anda di SKU ini)</span>}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rekomendasi produk */}
      {[
        "Pembeli yg melihat produk ini juga melihat produk berikut",
        "Pembeli yg melihat produk ini telah membeli produk berikut",
        "Pembeli yg membeli produk ini juga membeli produk berikut",
      ].map((title) => (
        <div key={title} className="bg-white mt-2 py-4">
          <p className="text-sm font-bold text-neutral-900 px-4 mb-3 border-b border-neutral-100 pb-3">{title}</p>
          <div className="flex gap-3 px-4 overflow-x-auto pb-1 no-scrollbar">
            {POPULAR.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => router.push("/produk/1")}
                className="shrink-0 w-[140px] rounded-[8px] border border-neutral-200 bg-white overflow-hidden text-left"
              >
                <div className={`aspect-square w-full ${p.bg ?? "bg-neutral-50"} relative`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.icon} alt={p.name} className="w-full h-full object-contain" />
                  {p.discount && <span className="absolute top-1 left-0 bg-brand text-white text-[9px] font-bold px-1.5 py-0.5 rounded-r">{p.discount}</span>}
                </div>
                <div className="p-2 flex flex-col gap-1 flex-1">
                  <p className="text-[11px] text-neutral-700 leading-snug line-clamp-2 min-h-[28px]">{p.name}</p>
                  <p className="mt-auto text-[10px] text-neutral-500">Mulai <span className="text-sm font-bold text-brand">{p.price}</span></p>
                  <div className="flex gap-1 flex-wrap mt-0.5">
                    <span className="text-[9px] font-bold text-white bg-green-600 px-1.5 py-0.5 rounded-[3px]">Ready Stock</span>
                    <span className="text-[9px] font-semibold text-neutral-500 border border-neutral-200 px-1.5 py-0.5 rounded-[3px]">Terjual &gt; 5</span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <span className="text-[10px] text-orange-400">★★★★★</span>
                    <span className="text-[9px] text-neutral-400">({p.reviews})</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Produk Terpopuler */}
      <div className="bg-white mt-2 py-4">
        <p className="text-sm font-bold text-neutral-900 px-4 mb-3 border-b border-neutral-100 pb-3">{t("section.popular")}</p>
        <div className="flex gap-3 px-4 overflow-x-auto pb-1 no-scrollbar">
          {POPULAR.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => router.push("/produk/1")}
              className="shrink-0 w-[140px] rounded-[8px] border border-neutral-200 bg-white overflow-hidden text-left flex flex-col"
            >
              <div className={`aspect-square w-full ${p.bg ?? "bg-neutral-50"} relative`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.icon} alt={p.name} className="w-full h-full object-contain" />
                {p.discount && <span className="absolute top-1 left-0 bg-brand text-white text-[9px] font-bold px-1.5 py-0.5 rounded-r">{p.discount}</span>}
              </div>
              <div className="p-2 flex flex-col gap-1 flex-1">
                <p className="text-[11px] text-neutral-700 leading-snug line-clamp-2 min-h-[28px]">{p.name}</p>
                <p className="mt-auto text-[10px] text-neutral-500">Mulai <span className="text-sm font-bold text-brand">{p.price}</span></p>
                <div className="flex gap-1 flex-wrap mt-0.5">
                  <span className="text-[9px] font-bold text-white bg-green-600 px-1.5 py-0.5 rounded-[3px]">Ready Stock</span>
                  <span className="text-[9px] font-semibold text-neutral-500 border border-neutral-200 px-1.5 py-0.5 rounded-[3px]">Terjual &gt; 5</span>
                </div>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="text-[10px] text-orange-400">★★★★★</span>
                  <span className="text-[9px] text-neutral-400">({p.reviews})</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      </div>{/* end page-content */}

      {/* Fly-to-cart image */}
      {mounted && flyDot && createPortal(
        <img
          src={flyDot.img}
          alt=""
          style={{
            position: "fixed",
            width: flyDot.size,
            height: flyDot.size,
            borderRadius: 10,
            objectFit: "contain",
            background: "#fff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            pointerEvents: "none",
            zIndex: 9999,
            left: flyDot.active ? flyDot.to.x : flyDot.from.x,
            top: flyDot.active ? flyDot.to.y : flyDot.from.y,
            transition: flyDot.active
              ? "left 550ms cubic-bezier(0.4,0,0.2,1), top 550ms cubic-bezier(0.4,0,0.2,1), transform 550ms cubic-bezier(0.4,0,0.2,1), opacity 200ms 400ms"
              : "none",
            transform: flyDot.active ? "scale(0.15)" : "scale(1)",
            opacity: flyDot.active ? 0 : 1,
          }}
        />,
        document.body
      )}

      {/* Bottom buy bar */}
      {mounted && createPortal(
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))] flex items-center gap-3 z-[90]">
          <button
            type="button"
            onClick={() => { if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(30); toggleWishlist({ sku: PRODUCT.sku, name: PRODUCT.name, price: PRODUCT.priceStr, icon: PRODUCT.images[0] }); }}
            className="shrink-0 w-11 h-11 flex items-center justify-center rounded-[8px] border border-neutral-200 active:bg-neutral-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "#f59e0b" : "none"} stroke={wishlisted ? "#f59e0b" : "#737373"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => openSheet("keranjang")}
            className="flex-1 border border-brand text-brand text-sm font-bold py-2.5 rounded-[8px] active:bg-brand/5"
          >
            {t("product.cart_btn")}
          </button>
          <button
            type="button"
            onClick={() => openSheet("beli")}
            className="flex-1 bg-brand text-white text-sm font-bold py-2.5 rounded-[8px] active:bg-brand/90"
          >
            {t("product.buy_now")}
          </button>
        </div>,
        document.body
      )}

      {/* Varian bottom sheet */}
      {mounted && showSheet && createPortal(
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[100]"
            style={{ opacity: sheetVisible ? 1 : 0, transition: "opacity 300ms ease" }}
            onClick={closeSheet}
          />
          <div
            ref={sheetRef}
            className="fixed left-0 right-0 bottom-0 z-[101] bg-white rounded-t-[16px] flex flex-col"
            style={{
              maxHeight: "85dvh",
              transform: sheetVisible ? "translateY(0)" : "translateY(100%)",
              transition: "transform 320ms cubic-bezier(0.32,0.72,0,1)",
              overscrollBehavior: "none",
            }}
          >
            {/* Handle — drag area untuk swipe down tutup sheet */}
            <div
              ref={handleRef}
              className="flex items-center justify-center px-4 pt-4 pb-3 shrink-0"
            >
              <div className="w-10 h-1 rounded-full bg-neutral-300" />
            </div>
            {/* Close button row */}
            <div className="flex items-center justify-between px-4 pb-2 shrink-0">
              <button type="button" onClick={closeSheet} className="text-neutral-400 p-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Title */}
            <div className="px-4 pb-3 shrink-0">
              <p className="text-sm font-bold text-neutral-900">Pilih jenis produk yang diinginkan</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">{VARIANTS.length} varian tersedia</p>
            </div>

            <div className="h-px bg-neutral-100 shrink-0" />

            {/* List varian — scrollable */}
            <div ref={scrollRef} className="overflow-y-auto flex-1 px-4 py-3 flex flex-col gap-2.5" style={{ overscrollBehavior: "contain" }}>
              {VARIANTS.map((v) => {
                const isCurrent = v.sku === PRODUCT.sku;
                const isSelected = v.sku === selectedSku;
                return (
                  <button
                    key={v.sku}
                    type="button"
                    onClick={() => setSelectedSku(v.sku)}
                    className={`w-full text-left rounded-[12px] border p-3 flex gap-3 transition-colors ${
                      isSelected ? "border-brand bg-brand/[0.03]" : "border-neutral-200 bg-white"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://picsum.photos/seed/abc/200/200" alt="" className="w-14 h-14 rounded-[8px] object-cover bg-neutral-50 shrink-0" />
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <p className="text-[11px] font-semibold text-brand">{v.sku}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                        <span className="text-[11px] text-neutral-500">Model: <span className="text-neutral-700 font-medium">LR6</span></span>
                        <span className="text-[11px] text-neutral-500">SNI: <span className="text-neutral-700 font-medium">{v.sni}</span></span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-[11px] text-neutral-500">Pack: <span className="text-neutral-700 font-medium">{v.blister}</span></span>
                        <span className="text-[11px] text-neutral-500">Unit: <span className="text-neutral-700 font-medium">{v.unit}</span></span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-extrabold text-brand">{v.price}</span>
                        {v.days && <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">{v.days}</span>}
                      </div>
                    </div>
                    {/* Badge + Checkmark */}
                    <div className="shrink-0 flex flex-row items-center gap-1.5 self-start mt-0.5">
                      {isCurrent && <span className="text-[10px] font-bold text-neutral-900 leading-none">SKU saat ini</span>}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-brand bg-brand" : "border-neutral-300"}`}>
                      {isSelected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom: qty + action — muncul setelah pilih varian */}
            <div
              className="shrink-0 border-t border-neutral-100 overflow-hidden transition-all duration-300"
              style={{ maxHeight: selectedVariant ? "160px" : "0px", opacity: selectedVariant ? 1 : 0 }}
            >
              <div className="px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-neutral-400">Jumlah</p>
                    <p className="text-xs font-semibold text-brand">
                      {selectedVariant
                        ? "Rp" + (parseInt(selectedVariant.price.replace(/[^\d]/g, "")) * qty).toLocaleString("id-ID")
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center border border-neutral-200 rounded-[8px] overflow-hidden">
                    <button type="button" onClick={() => setQtyState((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center text-neutral-500 active:bg-neutral-100">
                      <svg width="10" height="2" viewBox="0 0 12 2" fill="currentColor"><rect width="12" height="2" rx="1"/></svg>
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-neutral-800">{qty}</span>
                    <button type="button" onClick={() => setQtyState((q) => q + 1)} className="w-9 h-9 flex items-center justify-center text-neutral-500 active:bg-neutral-100">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><rect x="5" y="0" width="2" height="12" rx="1"/><rect x="0" y="5" width="12" height="2" rx="1"/></svg>
                    </button>
                  </div>
                </div>
                <div className="flex gap-3">
                  {sheetMode === "keranjang" ? (
                    <button type="button" onClick={() => {
                      if (selectedVariant) {
                        addItem({
                          sku: selectedVariant.sku,
                          name: PRODUCT.name,
                          price: selectedVariant.price,
                          icon: PRODUCT.images[0],
                        }, qty);
                        flyToCart();
                      }
                      closeSheet();
                    }} className="flex-1 border border-brand text-brand text-sm font-bold py-2.5 rounded-[10px] active:bg-brand/5">
                      {t("cart.add_to_cart")}
                    </button>
                  ) : (
                    <button type="button" onClick={() => { closeSheet(); setTimeout(() => router.push("/checkout"), 320); }} className="flex-1 bg-brand text-white text-sm font-bold py-2.5 rounded-[10px] active:bg-brand/90">
                      {t("product.buy_now")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
