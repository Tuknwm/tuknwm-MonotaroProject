"use client";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import DeliveryNote from "@/components/DeliveryNote";

const PAGE_ANIM = `
@keyframes pageItemIn {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

const TOAST_STYLE = `
@keyframes toastIn {
  from { opacity: 0; transform: translateX(-50%) translateY(12px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
.toast-anim { animation: toastIn 0.25s ease both; }
@keyframes starPop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.4); }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}
.star-pop { animation: starPop 0.35s ease both; }
`;

export const ORDER_COUNT = 5;
const PRODUCTS = [["ABC Alkaline Battery AA", "Rp27.900", "https://picsum.photos/seed/order-battery/160/160"], ["Sinarline Copy Paper A4", "Rp36.900", "https://picsum.photos/seed/order-paper/160/160"], ["Tekiro Obeng Plus PH2", "Rp18.500", "https://picsum.photos/seed/order-screwdriver/160/160"], ["WD-40 Multi-Purpose 333ml", "Rp89.900", "https://picsum.photos/seed/order-wd40/160/160"], ["Sarung Tangan Safety", "Rp42.000", "https://picsum.photos/seed/order-gloves/160/160"]];

export default function OrderStatusPage({ title }: { title: string }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [toast, setToast] = useState(false);
  const [pressed, setPressed] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem("reviewed_products") || "[]")); } catch { return new Set(); }
  });
  const [infoSheet, setInfoSheet] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  function openInfo() { setInfoSheet(true); document.body.style.overflow = "hidden"; requestAnimationFrame(() => requestAnimationFrame(() => setInfoVisible(true))); }
  function closeInfo() { setInfoVisible(false); document.body.style.overflow = ""; setTimeout(() => setInfoSheet(false), 300); }

  const [noteIndex, setNoteIndex] = useState<number | null>(null);
  function openNote(i: number) { setNoteIndex(i); document.body.style.overflow = "hidden"; }
  function closeNote() { setNoteIndex(null); document.body.style.overflow = ""; }

  const [sheetProduct, setSheetProduct] = useState<[string, string, string] | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [stars, setStars] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [animStar, setAnimStar] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [sheetY, setSheetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);

  function openReview(product: [string, string, string]) {
    setSheetProduct(product);
    setStars(0); setHoverStar(0); setAnimStar(0); setReviewText(""); setSheetY(0);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => requestAnimationFrame(() => setSheetVisible(true)));
  }
  function closeReview() {
    setSheetVisible(false);
    document.body.style.overflow = "";
    setTimeout(() => { setSheetProduct(null); setSheetY(0); }, 300);
  }
  function handleDragStart(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = e.clientY;
    setIsDragging(true);
  }
  function handleDragMove(e: React.PointerEvent) {
    if (!isDragging) return;
    setSheetY(Math.max(0, e.clientY - dragStart.current));
  }
  function handleDragEnd() {
    if (!isDragging) return;
    setIsDragging(false);
    if (sheetY > 80) closeReview(); else setSheetY(0);
  }
  function clickStar(s: number) {
    setStars(s); setAnimStar(s);
    setTimeout(() => setAnimStar(0), 400);
  }
  function submitReview() {
    if (!sheetProduct || !stars) return;
    setReviewed(prev => {
      const next = new Set(prev).add(sheetProduct[0]);
      localStorage.setItem("reviewed_products", JSON.stringify([...next]));
      return next;
    });
    closeReview();
  }

  function beliLagi(name: string, price: string, image: string) {
    addItem({ sku: name, name, price, icon: image });
    setPressed(name);
    setTimeout(() => setPressed(null), 300);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

  return (
    <main className="min-h-dvh bg-neutral-50 pt-[60px]">
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 rounded-b-3xl bg-brand px-4 py-4 text-white shadow-md">
        <button type="button" onClick={() => router.back()} className="text-white" aria-label="Kembali"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button>
        <h1 className="ml-2 text-sm font-bold">{title}</h1>
      </header>
      <style>{PAGE_ANIM}</style>
    <div className="flex flex-col gap-5 px-4 pb-8 pt-0">
        {PRODUCTS.map(([name, price, image], index) => (
          <article key={name} style={{ animation: `pageItemIn 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s both` }} className="rounded-[8px] border border-neutral-200 bg-white p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 shrink-0 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Pesanan ORD-DEMO-{String(index + 1).padStart(3, "0")}</p>
                  <p className="text-[10px] text-neutral-500">10 November 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {title === "Telah Dikirim" && (
                  <button type="button" onClick={() => openNote(index)} aria-label="Delivery Note">
                    <svg className="h-5 w-5 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
                  </button>
                )}
                <button type="button" onClick={openInfo}><svg className="h-5 w-5 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Informasi"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg></button>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 border-y border-neutral-100 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={name} className="h-14 w-14 rounded-[6px] bg-neutral-50 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs text-neutral-700">{name}</p>
                <p className="mt-1 text-[10px] text-neutral-500">1 item · {price}</p>
              </div>
            </div>
            {title === "Telah Dikirim" ? (
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-900">{t("order.total_shopping")}</p>
                  <p className="text-sm font-bold text-brand">{price}</p>
                </div>
                <div className="flex gap-2">
                  {reviewed.has(name) ? (
                    <button type="button" onClick={() => router.push("/ulasan")} className="rounded-[8px] border border-brand px-3 py-2 text-xs font-bold text-brand">{t("order.view_review")}</button>
                  ) : (
                    <button type="button" onClick={() => openReview([name, price, image])} className="rounded-[8px] border border-brand px-3 py-2 text-xs font-bold text-brand">{t("order.review")}</button>
                  )}
                  <button type="button" onClick={() => beliLagi(name, price, image)} style={{ transform: pressed === name ? "scale(0.92)" : "scale(1)", transition: "transform 0.15s ease" }} className="rounded-[8px] bg-brand px-3 py-2 text-xs font-bold text-white">{t("order.buy_again")}</button>
                </div>
              </div>
            ) : title === "Dibatalkan" ? (
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-900">{t("order.total_order")}</p>
                  <p className="text-sm font-bold text-brand">{price}</p>
                </div>
                <button type="button" onClick={() => beliLagi(name, price, image)} style={{ transform: pressed === name ? "scale(0.92)" : "scale(1)", transition: "transform 0.15s ease" }} className="rounded-[8px] bg-brand px-3 py-2 text-xs font-bold text-white">{t("order.reorder")}</button>
              </div>
            ) : (
              <div className="mt-3 flex justify-between">
                <p className="text-xs font-bold text-neutral-900">{t("order.total_order")}</p>
                <p className="text-sm font-bold text-brand">{price}</p>
              </div>
            )}
          </article>
        ))}
      </div>

      {infoSheet && createPortal(
        <div className={`fixed inset-0 z-[200] flex items-end bg-black/40 transition-opacity duration-300 ${infoVisible ? "opacity-100" : "opacity-0"}`} onClick={closeInfo}>
          <div className="w-full rounded-t-3xl bg-white p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]" style={{ transform: infoVisible ? "translateY(0)" : "translateY(100%)" }} onClick={e => e.stopPropagation()}>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-neutral-300" />
            <p className="mb-4 text-xs text-neutral-500">{t("order.contact_info")}</p>
            <button type="button" disabled className="w-full rounded-[8px] bg-neutral-200 py-2.5 text-xs font-bold text-neutral-400 cursor-not-allowed">{t("order.contact_customer")}</button>
          </div>
        </div>,
        document.body
      )}

      {sheetProduct && createPortal(
        <div className={`fixed inset-0 z-[200] flex items-end bg-black/40 transition-opacity duration-300 ${sheetVisible ? "opacity-100" : "opacity-0"}`} onClick={closeReview}>
          <div className="w-full rounded-t-3xl bg-white p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.18)]" style={{ transform: sheetVisible ? `translateY(${sheetY}px)` : "translateY(100%)", transition: isDragging ? "none" : "transform 300ms cubic-bezier(0.32,0.72,0,1)" }} onClick={e => e.stopPropagation()} onPointerDown={handleDragStart} onPointerMove={handleDragMove} onPointerUp={handleDragEnd}>
            <div className="mx-auto -mt-1 mb-3 flex cursor-grab touch-none items-center justify-center py-2" style={{ touchAction: "none" }}>
              <div className="h-1 w-10 rounded-full bg-neutral-300" />
            </div>
            <div className="mb-4 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sheetProduct[2]} alt={sheetProduct[0]} className="h-14 w-14 rounded-[8px] bg-neutral-50 object-contain border border-neutral-100" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-neutral-900 line-clamp-2">{sheetProduct[0]}</p>
                <p className="mt-0.5 text-[11px] text-neutral-500">1 item · {sheetProduct[1]}</p>
              </div>
            </div>
            <style>{TOAST_STYLE}</style>
            <div className="mb-3 flex justify-center gap-2">
              {[1,2,3,4,5].map(s => (
                <button key={s} type="button" onMouseEnter={() => setHoverStar(s)} onMouseLeave={() => setHoverStar(0)} onClick={() => clickStar(s)} className={animStar === s ? "star-pop" : ""}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill={(hoverStar || stars) >= s ? "#f59e0b" : "none"} stroke={(hoverStar || stars) >= s ? "#f59e0b" : "#d1d5db"} strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </button>
              ))}
            </div>
            <div className="relative">
              <textarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value.slice(0, 100))}
                placeholder={t("order.review_placeholder")}
                className="w-full rounded-[8px] border border-neutral-200 px-3 py-2.5 pb-6 text-xs outline-none focus:border-brand resize-none"
                rows={4}
              />
              <span className="absolute bottom-2 right-3 text-[10px] text-neutral-400">{reviewText.length}/100</span>
            </div>
            <button type="button" disabled={!stars || !reviewText.trim()} onClick={submitReview} className={`mt-3 w-full rounded-[8px] py-2.5 text-xs font-bold ${stars && reviewText.trim() ? "bg-brand text-white" : "bg-neutral-200 text-neutral-400"}`}>
              {t("order.submit_review")}
            </button>
          </div>
        </div>,
        document.body
      )}

      {toast && createPortal(<><style>{TOAST_STYLE}</style><div className="toast-anim fixed bottom-24 left-1/2 z-[9999] rounded-[10px] bg-neutral-900/90 px-4 py-2.5 text-xs font-semibold text-white shadow-lg whitespace-nowrap" style={{ transform: "translateX(-50%)" }}>{t("order.added_to_cart")}</div></>, document.body)}
      {noteIndex !== null && <DeliveryNote orderIndex={noteIndex} onClose={closeNote} />}
    </main>
  );
}
