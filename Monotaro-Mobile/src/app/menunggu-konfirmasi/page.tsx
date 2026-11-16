"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

type Order = { id: string; items: Array<{ name: string; price: number; qty: number; img: string }> };

export default function MenungguKonfirmasiPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const reasons = () => [t("order.cancel_reason_1"), t("order.cancel_reason_2"), t("order.cancel_reason_3"), t("order.cancel_reason_4")];
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [sheetY, setSheetY] = useState(0);
  const [reason, setReason] = useState("");
  const startY = useRef(0);
  const currentY = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("pending_confirmation_order");
    if (saved) { try { setOrder(JSON.parse(saved)); } catch { localStorage.removeItem("pending_confirmation_order"); } }
    setLoaded(true);
  }, []);

  function openSheet() { setSheet(true); setSheetY(0); requestAnimationFrame(() => requestAnimationFrame(() => setSheetVisible(true))); }
  function closeSheet() { setSheetVisible(false); setTimeout(() => { setSheet(false); setSheetY(0); }, 300); }
  function pointerDown(event: React.PointerEvent<HTMLDivElement>) { event.currentTarget.setPointerCapture(event.pointerId); startY.current = event.clientY; currentY.current = 0; dragging.current = true; }
  function pointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const delta = event.clientY - startY.current;
    // swipe up: rubber-band resistance (dampened), swipe down: free
    currentY.current = delta > 0 ? delta : delta / 3;
    setSheetY(currentY.current);
  }
  function pointerUp() {
    if (!dragging.current) return;
    const distance = currentY.current;
    dragging.current = false;
    if (distance > 80) closeSheet(); else setSheetY(0);
  }

  if (!loaded) return null;
  if (!order) return <main className="min-h-dvh bg-neutral-50 pt-[60px]"><header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 rounded-b-3xl bg-brand px-4 py-4 text-white shadow-md"><button type="button" onClick={() => { sessionStorage.setItem("open_account", "1"); router.replace("/"); }} className="text-white"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button><h1 className="ml-2 text-sm font-bold">{t("account.waiting_confirm")}</h1></header><p className="flex min-h-[calc(100dvh-60px)] items-center justify-center text-sm text-neutral-400">{t("order.no_orders_yet")}</p></main>;

  return <main className="min-h-dvh bg-neutral-50 pt-[60px]"><style>{`@keyframes pageItemIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style><header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 rounded-b-3xl bg-brand px-4 py-4 text-white shadow-md"><button type="button" onClick={() => { sessionStorage.setItem("open_account", "1"); router.replace("/"); }} className="text-white"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button><h1 className="ml-2 text-sm font-bold">{t("account.waiting_confirm")}</h1></header><div className="flex flex-col gap-5 px-4 pb-8">{order.items.map((item, index) => <article key={`${item.name}-${index}`} style={{ animation: `pageItemIn 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s both` }} className="rounded-[8px] border border-neutral-200 bg-white p-4"><div className="flex items-start justify-between"><div className="flex items-center gap-2"><svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg><div><p className="text-xs font-bold text-neutral-900">Pesanan {order.id}</p><p className="text-[10px] text-neutral-500">10 November 2026</p><p className="text-[10px] text-neutral-500">{t("order.waiting_confirm_status")}</p></div></div><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg></div><div className="mt-4 flex items-center gap-3 border-y border-neutral-100 py-3"><img src={item.img} alt={item.name} className="h-14 w-14 rounded-[6px] bg-neutral-50 object-contain" /><div className="min-w-0 flex-1"><p className="line-clamp-2 text-xs text-neutral-700">{item.name}</p><p className="mt-1 text-[10px] text-neutral-500">{item.qty} item · Rp{item.price.toLocaleString("id-ID")}</p></div></div><div className="mt-3 flex items-end justify-between"><div><p className="text-xs font-bold text-neutral-900">{t("order.total_order")}</p><p className="text-sm font-bold text-brand">Rp{(item.price * item.qty).toLocaleString("id-ID")}</p></div><button type="button" onClick={openSheet} className="rounded-[8px] border border-brand px-4 py-2 text-xs font-bold text-brand">{t("order.cancel_btn")}</button></div></article>)}</div>{sheet && createPortal(<div className={`fixed inset-0 z-[100] flex items-end bg-black/40 transition-opacity duration-300 ${sheetVisible ? "opacity-100" : "opacity-0"}`} onClick={closeSheet}><div className="w-full rounded-t-3xl bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]" onClick={(e) => e.stopPropagation()} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} style={{ transform: `translateY(${sheetVisible ? sheetY : "100%"})`, touchAction: "none" }}><div className="mx-auto mb-3 h-1 w-10 rounded-full bg-neutral-300" /><h2 className="text-base font-bold text-neutral-900">{t("order.cancel_reason_title")}</h2><p className="mt-1 text-xs text-neutral-500">{t("order.cancel_reason_sub")}</p><div className="mt-3 flex flex-col gap-1.5">{reasons().map((item) => <label key={item} className="flex items-center gap-2 rounded-[8px] border border-neutral-200 px-3 py-2 text-xs text-neutral-700"><input type="radio" name="cancel-reason" checked={reason === item} onChange={() => setReason(item)} className="accent-brand" />{item}</label>)}</div><button type="button" disabled={!reason} onClick={() => { localStorage.removeItem("pending_confirmation_order"); closeSheet(); setOrder(null); }} className={`mt-4 w-full rounded-[8px] py-2.5 text-xs font-bold ${reason ? "bg-brand text-white" : "bg-neutral-200 text-neutral-400"}`}>{t("order.cancel_ok")}</button></div></div>, document.body)}</main>;
}
