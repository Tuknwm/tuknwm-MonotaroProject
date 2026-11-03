"use client";
import { createPortal } from "react-dom";
import { AkunContent } from "./akun/page";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import {
  ADVANTAGES, ALL_BRANDS, ARTICLES, BRANDS, CATEGORY_SECTIONS, FOOTER_LINKS, FOOTER_TABS, HERO, HIGHLIGHT,
  PAYMENTS, POPULAR, PROMOS, QUICK_LINKS, SERVICES, SHIPPING, SUPPORT, TOP_CATEGORIES, VALUE_PROPS,
  type Product,
} from "./data";

const NAV = [
  { label: "Home", active: true, icon: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /> },
  { label: "Kategori", icon: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></> },
  { label: "Quotation", icon: <><path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></> },
  { label: "Keranjang", badge: 3, icon: <><path d="M3 4h2l2.4 11h10.8L21 7.5H6.1" /><circle cx="9" cy="19.5" r="1.25" /><circle cx="17" cy="19.5" r="1.25" /></> },
  { label: "Akun", icon: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></> },
];

function SectionTitle({ title, sub, action = "Lihat semua", onAction }: { title: string; sub?: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-end justify-between px-4 mb-3">
      <div>
        <h2 className="text-[15px] font-bold text-neutral-900">{title}</h2>
        {sub && <p className="text-[11px] text-neutral-500 mt-0.5">{sub}</p>}
      </div>
      {action && <button type="button" onClick={onAction} className="text-xs font-semibold text-brand shrink-0">{action}</button>}
    </div>
  );
}

function Stars() {
  return <span className="text-[11px] tracking-[-1px] text-orange-500">★★★★★</span>;
}

function ProductCard({ p, popular }: { p: Product; popular?: boolean }) {
  return (
    <div className="shrink-0 w-[140px] snap-start rounded-[8px] border border-neutral-200 overflow-hidden">
      <div className="relative h-[120px] bg-neutral-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.icon} alt={p.name} className="w-full h-full object-cover" />
        {p.discount && <span className="absolute top-2 left-0 bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded-r">{p.discount}</span>}
      </div>
      <div className="p-2 flex flex-col gap-1">
        <p className="text-[11px] text-neutral-700 leading-snug line-clamp-2 min-h-[30px]">{p.name}</p>
        {p.oldPrice && <p className="text-[10px] text-neutral-400 line-through leading-none">{p.oldPrice}</p>}
        <p className={`text-[13px] font-bold leading-none ${p.oldPrice ? "text-brand" : "text-neutral-900"}`}>{p.price}</p>
        {p.unit && <p className="text-[10px] text-neutral-500 leading-none">{p.unit}</p>}
        {popular && (
          <div className="flex items-center gap-1"><Stars /><span className="text-[10px] text-neutral-500">({p.reviews})</span></div>
        )}
      </div>
    </div>
  );
}

const BANNERS = [
  "iklan1Kecil.jpg",
  "iklan2Kecil.avif",
  "iklan3Kecil.avif",
  "iklan4Kecil.avif",
  "iklan5Kecil.avif",
  "iklan6Kecil.avif",
  "iklan7Kecil.avif",
  "iklan8Kecil.jpg",
];

function HeroCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      const el = ref.current;
      if (!el) return;
      const next = (Math.round(el.scrollLeft / el.clientWidth) + 1) % BANNERS.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={(e) => setIdx(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-[8px]"
      >
        {BANNERS.map((file) => (
          <div key={file} className="relative shrink-0 w-full snap-center">
            <Image src={`/Banner/${file}`} alt="" width={1021} height={1229} className="w-full aspect-[1021/1229] object-cover rounded-[8px]" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {BANNERS.map((f, i) => (
          <span key={f} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/60"}`} />
        ))}
      </div>
    </div>
  );
}

function CategoryExplorer() {
  const [active, setActive] = useState(0);
  const cat = CATEGORY_SECTIONS[active];
  return (
    <section className="py-4">
      <SectionTitle title="Jelajahi Kategori" sub={`${cat.stock} Ready Stock di ${cat.name}`} action="" />
      <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar pt-1 pb-3">
        {CATEGORY_SECTIONS.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setActive(i)}
            className={`shrink-0 flex items-center gap-2 text-[13px] font-semibold pl-1.5 pr-4 py-1.5 rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-colors ${
              i === active ? "bg-brand text-white" : "bg-white text-neutral-700"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.tab} alt="" className="w-8 h-8 rounded-[6px] bg-white object-cover" />
            {c.short}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 px-4">
        {cat.groups.map((g) => (
          <div key={g.name} className="rounded-[8px] bg-white border border-neutral-200 shadow-sm p-3">
            <div className="flex items-center gap-3 pb-3">
              <div className="w-16 h-16 shrink-0 rounded-[8px] bg-neutral-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.img} alt={g.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-neutral-900 leading-tight">{g.name}</p>
                <button className="text-xs font-semibold text-brand mt-1">Lihat semua</button>
              </div>
            </div>
            <div className="grid grid-cols-2">
              {g.items.map((it) => (
                <button key={it} className="flex items-center justify-between gap-2 text-left text-xs text-neutral-700 py-3 border-b border-neutral-100 odd:border-r odd:pr-3 even:pl-3">
                  <span>{it}</span>
                  <svg className="w-4 h-4 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="mx-4 mt-3 w-[calc(100%-2rem)] text-xs font-semibold text-brand px-4 py-3">
        Lihat Semua Produk dalam Kategori {cat.name}
      </button>
    </section>
  );
}

function BrandSheet({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);
  useEffect(() => { setPortalEl(document.getElementById("modal-root")); }, []);
  useEffect(() => {
    if (!portalEl) return;
    // two frames so the off-screen start position is painted before transitioning in
    let id = requestAnimationFrame(() => { id = requestAnimationFrame(() => setShown(true)); });
    return () => cancelAnimationFrame(id);
  }, [portalEl]);
  const filtered = ALL_BRANDS.filter((b) => b.name.toLowerCase().includes(q.toLowerCase()));

  const close = () => {
    setShown(false);
    setDragY(0);
    setTimeout(onClose, 280);
  };
  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    startY.current = e.clientY;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) setDragY(Math.max(0, e.clientY - startY.current));
  };
  const onDragEnd = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragY > 100) close();
    else setDragY(0);
  };

  if (!portalEl) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        style={{ opacity: shown ? 1 : 0 }}
        onClick={close}
      />
      <div
        className="absolute bottom-0 left-1/2 w-full max-w-[430px] bg-white rounded-t-2xl flex flex-col max-h-[92dvh]"
        style={{
          transform: `translate(-50%, ${shown ? `${dragY}px` : "100%"})`,
          transition: dragging ? "none" : "transform 280ms cubic-bezier(.32,.72,0,1)",
        }}
      >
        <div
          className="shrink-0 touch-none cursor-grab"
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
        >
          {/* Handle */}
          <div className="flex justify-center pt-2.5 pb-1">
            <div className="w-10 h-1 rounded-full bg-neutral-300" />
          </div>
          {/* Header */}
          <div className="px-4 pb-2">
            <h2 className="text-[15px] font-bold text-neutral-900">Semua Brand</h2>
          </div>
        </div>
        {/* Search */}
        <div className="px-4 pb-3 shrink-0">
          <div className="flex items-center gap-2 bg-neutral-100 rounded-[8px] px-3">
            <svg className="w-4 h-4 shrink-0 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" d="m21 21-4.3-4.3M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" /></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 py-2 text-xs outline-none bg-transparent placeholder:text-neutral-400" placeholder="Cari brand..." />
            {q && <button onClick={() => setQ("")} className="text-neutral-400 text-base leading-none">×</button>}
          </div>
        </div>
        {/* Grid */}
        <div className="overflow-y-auto px-4 pb-8">
          <div className="grid grid-cols-4 gap-3">
            {filtered.map((b) => (
              <button key={b.name} className="h-12 flex items-center justify-center rounded-[8px] bg-neutral-100 px-1">
                <span className="text-[10px] font-semibold text-neutral-700 text-center leading-tight line-clamp-2">{b.name}</span>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-xs text-neutral-400 py-8">Brand tidak ditemukan</p>
          )}
        </div>
      </div>
    </div>,
    portalEl
  );
}

export default function Home() {
  const { t } = useLanguage();
  const [showPromo, setShowPromo] = useState(false);
  const [promoVisible, setPromoVisible] = useState(false);
  const [promoPortal, setPromoPortal] = useState<HTMLElement | null>(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setPromoPortal(document.getElementById("modal-root"));
    if (!localStorage.getItem("promo_seen")) {
      setShowPromo(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setPromoVisible(true)));
    }
  }, []);
  function closePromo() {
    setPromoVisible(false);
    setTimeout(() => { setShowPromo(false); localStorage.setItem("promo_seen", "1"); }, 300);
  }
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [section, setSection] = useState<"home" | "akun">(() => (
    typeof window !== "undefined" && sessionStorage.getItem("open_account") === "1" ? "akun" : "home"
  ));
  const [qlDot, setQlDot] = useState(0);
  const qlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("open_account") === "1") {
      sessionStorage.removeItem("open_account");
    }
  }, []);

  return (
    <div className="min-h-dvh bg-neutral-100 pb-24 relative">
      {/* Header */}
      {section === "akun" && <div key="akun" className="section-transition"><AkunContent onBack={() => setSection("home")} /></div>}
      {section === "home" && <div key="home" className="section-transition">
      <header className="bg-brand sticky top-0 z-40 px-4 pt-2.5 pb-3 shadow-md rounded-b-3xl">
        <div className="flex items-center justify-between mb-2.5">
          <Image src="/Logo.png" alt="monotaro.id" width={140} height={40} className="h-8 w-auto brightness-0 invert" priority />
          <div className="flex items-center gap-3 text-white">
            <button aria-label="Wishlist" className="text-xl leading-none">☆</button>
            <button aria-label="Keranjang" className="relative hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" /></svg>
              <span className="absolute -top-1.5 -right-1.5 bg-yellow-300 text-brand text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            <button aria-label="Pusat Bantuan" className="bg-orange-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{t("header.help")}</button>
          </div>
        </div>
        <div className="relative flex items-center bg-white rounded-[8px] overflow-hidden px-3 gap-2">
          <svg className="w-4 h-4 shrink-0 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" d="m21 21-4.3-4.3M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" name="product-search" autoComplete="off" autoCorrect="off" spellCheck={false} className="flex-1 min-w-0 py-2.5 pr-1 text-xs outline-none placeholder:text-neutral-400" placeholder={t("search.placeholder")} />
        </div>
      </header>

      {/* Register promo popout — rendered via portal so it overlays correctly on mobile */}
      {showPromo && promoPortal && createPortal(
        <div className="absolute inset-0 z-50 flex items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
            style={{opacity: promoVisible ? 1 : 0}}
            onClick={closePromo}
          />
          <div
            className="relative w-full rounded-[8px] bg-white text-neutral-900 p-5 shadow-2xl transition-all duration-300"
            style={{opacity: promoVisible ? 1 : 0, transform: promoVisible ? "scale(1) translateY(0)" : "scale(0.92) translateY(24px)"}}
          >
            <button aria-label="Tutup" onClick={closePromo} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-neutral-200 text-neutral-600 text-xs flex items-center justify-center">✕</button>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ok.webp" alt="" className="w-24 h-24 object-contain shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-brand mb-1 uppercase tracking-wide">{t("promo.special")}</p>
                <p className="text-sm font-extrabold leading-snug">{t("promo.popup_title")}</p>
                <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed">{t("promo.popup_sub")}</p>
                <div className="mt-3">
                  <button onClick={() => { closePromo(); setSection("akun"); }} className="w-full bg-brand text-white text-xs font-bold py-1.5 rounded-[8px]">{t("promo.register_btn")}</button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        promoPortal
      )}

      {/* Hero + quick links */}
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_88px] items-stretch gap-2 px-4">
        <div className="min-w-0">
          <HeroCarousel />
        </div>
        <div
          className="relative min-h-0 self-start overflow-hidden rounded-[8px] bg-white py-3 max-h-[364px]"
          style={{ height: "calc((100vw - 128px) * 1.203)" }}
        >
          <div ref={qlRef} className="h-full min-h-0 overflow-y-auto no-scrollbar pr-2" onScroll={(e) => {
            const el = e.currentTarget;
            const ratio = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
            setQlDot(Math.round(ratio * 2));
          }}>
            <div className="flex flex-col items-center gap-3 px-2">
              {QUICK_LINKS.map((q) => (
                <button key={q.label} className="flex w-full shrink-0 flex-col items-center gap-1.5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={q.hot ? "#b45309" : "#404040"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d={q.path} />
                  </svg>
                  <span className="text-[9px] text-neutral-700 text-center leading-tight">{q.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="absolute right-1.5 top-1/2 h-12 w-1 -translate-y-1/2 overflow-hidden rounded-full bg-neutral-200">
            <div className="w-full rounded-full bg-brand transition-all duration-300" style={{ height: "33.3%", transform: `translateY(${qlDot * 100}%)` }} />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="flex gap-2.5 px-4 mt-3 overflow-x-auto no-scrollbar">
        {SERVICES.map((s) => (
          <div key={s.title} className="shrink-0 rounded-[13px] overflow-hidden">
            <Image src={`/BadgeHighlight/${s.img}.avif`} alt={s.title} width={108} height={80} className="w-[108px] h-auto object-contain" />
          </div>
        ))}
      </div>

      {/* Product Highlight */}
      <section className="mt-3 py-4">
        <SectionTitle title="PRODUCT HIGHLIGHT" action="" />
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-2.5 px-4 w-max snap-x">
            {HIGHLIGHT.map((p) => <ProductCard key={p.name} p={p} />)}
          </div>
        </div>
      </section>

      {/* Value props */}
      <div className="flex gap-2 px-4 mt-3">
        {[
          { icon: <><path d="M7 7h10M7 11h6"/><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M16 15h2"/></>, text: t("val.exclusive_promo") },
          { icon: <><circle cx="12" cy="8" r="3"/><path d="M4 20c0-4 3.6-7 8-7"/><path d="M17 17h-1m4 0h-1m-1-3v1m0 4v1m-2.5-4.5.7.7m3.6 3.6.7.7M14.5 19.5l.7-.7m3.6-3.6.7-.7"/></>, text: t("val.advisor") },
          { icon: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></>, text: t("val.tax_invoice") },
          { icon: <><path d="M20 12V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9"/><path d="m22 15-3 3-1.5-1.5"/></>, text: t("val.voucher_review") },
        ].map((v) => (
          <div key={v.text} className="flex flex-1 flex-col items-center gap-1.5 py-3 text-center">
            <svg className="h-6 w-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">{v.icon}</svg>
            <span className="text-[10px] font-semibold leading-tight text-neutral-700">{v.text}</span>
          </div>
        ))}
      </div>

      {/* Popular */}
      <section className="mt-3 py-4">
        <SectionTitle title={t("section.popular")} action="" />
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-2.5 px-4 w-max snap-x">
            {POPULAR.map((p) => <ProductCard key={p.name} p={p} popular />)}
          </div>
        </div>
      </section>

      {/* Top categories */}
      <section className="mt-3 py-4">
        <SectionTitle title={t("section.top_categories")} sub={t("section.top_categories_sub")} action="" />
        <div className="grid grid-cols-4 gap-y-4 gap-x-2 px-4">
          {TOP_CATEGORIES.map((c) => (
            <button key={c.label} className="flex flex-col items-center gap-1.5">
              <span className="w-16 h-16 rounded-[8px] overflow-hidden border border-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/KategoriUnggulan/${c.img}`} alt={c.label} className="w-full h-full object-cover" />
              </span>
              <span className="text-[10px] font-semibold text-neutral-800 text-center leading-tight line-clamp-2">{c.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="mt-3 py-4">
        <SectionTitle title={t("section.brands")} onAction={() => setShowAllBrands(true)} />
        <div className="grid grid-cols-4 gap-2 px-4">
          {BRANDS.map((b) => (
            <div key={b.name} className="flex items-center justify-center">
              <img src={`/BrandPopuler/${b.img}`} alt={b.name} className="h-10 w-auto rounded-[8px] object-contain" />
            </div>
          ))}
        </div>
      </section>

      <div className="mt-3"><CategoryExplorer /></div>

      {/* Articles */}
      <section className="mt-3 py-4">
        <SectionTitle title={t("section.articles")} action={t("section.articles_action")} />
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-3 px-4 snap-x" style={{width: "max-content"}}>
          {ARTICLES.map((a) => (
            <article key={a.title} className="shrink-0 w-[260px] snap-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.img} alt={a.title} className="w-full h-36 rounded-[8px] object-cover" />
              <p className="text-[11px] text-neutral-600 mt-2 line-clamp-2">{a.desc}</p>
              <p className="text-[10px] italic text-neutral-400 mt-1">{a.date}</p>
            </article>
          ))}
          </div>
        </div>
      </section>

      {/* Promos */}
      <section className="mt-3 py-4">
        <SectionTitle title={t("section.promos")} action="" />
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-2.5 px-4 snap-x" style={{width: "max-content"}}>
          {PROMOS.map((p) => (
            <div key={p.title} className="shrink-0 w-[270px] h-36 snap-start rounded-[8px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      {false && <footer className="mt-3">
        <div className="bg-neutral-200/70 flex gap-4 px-4 py-3 overflow-x-auto no-scrollbar">
          {FOOTER_TABS.map((t) => <span key={t} className="shrink-0 text-xs font-semibold text-neutral-700">{t}</span>)}
        </div>

        <div className="px-4 divide-y divide-neutral-100">
          {FOOTER_LINKS.map((s) => (
            <details key={s.title} className="group py-3">
              <summary className="list-none flex justify-between items-center cursor-pointer text-sm font-bold text-neutral-800">
                {s.title}<span className="text-neutral-400 transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <ul className="mt-2 grid grid-cols-2 gap-y-1.5 gap-x-3">
                {s.links.map((l) => <li key={l} className="text-[11px] text-neutral-600">{l}</li>)}
              </ul>
            </details>
          ))}

          <div className="py-3">
            <p className="text-sm font-bold text-neutral-800 mb-2">Customer Support</p>
            {SUPPORT.map((s) => (
              <p key={s.text} className="text-[11px] text-neutral-700 py-0.5"><span className="mr-2">{s.icon}</span>{s.text}</p>
            ))}
          </div>

          <div className="py-3">
            <p className="text-sm font-bold text-neutral-800 mb-2">Metode Pembayaran</p>
            <div className="flex flex-wrap gap-1.5">
              {PAYMENTS.map((p) => <span key={p} className="border border-neutral-200 rounded-md px-2 py-1 text-[10px] font-bold text-blue-900">{p}</span>)}
            </div>
          </div>

          <div className="py-3">
            <p className="text-sm font-bold text-neutral-800 mb-2">Pengiriman</p>
            <div className="flex flex-wrap gap-1.5">
              {SHIPPING.map((s) => <span key={s} className="border border-neutral-200 rounded-md px-2 py-1 text-[10px] font-bold text-neutral-700">{s}</span>)}
            </div>
          </div>

          <div className="py-3 flex justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-neutral-800 mb-2">Keamanan</p>
              <span className="border border-neutral-200 rounded-md px-2 py-1 text-[10px] font-bold text-green-700">🔒 GeoTrust Secured</span>
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-800 mb-2">Ikuti Kami</p>
              <div className="flex gap-1.5">
                {[["f", "bg-blue-700"], ["▶", "bg-red-600"], ["◎", "bg-pink-500"], ["in", "bg-sky-700"]].map(([s, c]) => (
                  <span key={s} className={`${c} w-7 h-7 rounded-md text-white text-xs font-bold flex items-center justify-center`}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="py-4">
            <p className="text-xs font-bold text-neutral-800 mb-2">Dapatkan info produk & promo terkini:</p>
            <div className="flex">
              <input type="email" placeholder="Alamat Email Anda" className="flex-1 min-w-0 border border-neutral-300 rounded-l-md px-3 py-2 text-xs outline-none focus:border-brand" />
              <button className="bg-brand text-white text-xs font-bold px-4 rounded-r-md">Langganan</button>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-neutral-500 py-4 border-t border-neutral-100">Copyright © 2021 www.monotaro.id | All Rights Reserved</p>
      </footer>}

      <section className="mt-3 px-4 py-5">
        <h2 className="mb-3 text-sm font-bold text-neutral-900">{t("section.why_us")}</h2>
        <div className="grid grid-cols-2 gap-3">
          {ADVANTAGES.map((a, i) => (
            <div key={a.title} className={`rounded-[10px] border border-neutral-200 bg-white p-3 text-center ${i === ADVANTAGES.length - 1 ? "col-span-2" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.img} alt={a.title} className="mx-auto h-16 w-16 object-contain" />
              <p className="mt-1.5 text-xs font-bold text-neutral-800">{a.title}</p>
              <p className="mt-1 text-[10px] leading-snug text-neutral-500">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {showAllBrands && <BrandSheet onClose={() => setShowAllBrands(false)} />}
      </div>}

      {/* Bottom nav */}
      <nav className="fixed bottom-[calc(20px+env(safe-area-inset-bottom))] left-1/2 z-[100] flex w-[calc(100%-40px)] max-w-[390px] -translate-x-1/2 rounded-full bg-white p-1 shadow-[0_6px_24px_rgba(0,0,0,0.12)] pointer-events-auto">
        {NAV.map((n) => {
          const navLabelKey = n.label === "Home" ? "nav.home" : n.label === "Kategori" ? "nav.category" : n.label === "Quotation" ? "nav.quotation" : n.label === "Keranjang" ? "nav.cart" : "nav.account";
          const displayLabel = t(navLabelKey);
          return (
            <button
              key={n.label}
              aria-current={n.active ? "page" : undefined}
              onClick={() => {
                if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(20);
                if (n.label === "Akun") setSection("akun"); else setSection("home");
              }}
              className={`nav-item flex-1 flex flex-col items-center gap-1 py-2 rounded-[18px] relative ${
                (n.label === "Akun" ? section === "akun" : section === "home" && n.active) ? "text-brand" : "text-neutral-500"
              }`}
            >
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                {n.icon}
              </svg>
              {n.badge && <span className="absolute top-1 left-1/2 ml-1.5 bg-brand text-white text-[9px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center">{n.badge}</span>}
              <span className="text-[10px] font-semibold leading-none">{displayLabel}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
