"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import DeliveryNote from "@/components/DeliveryNote";

const HOUR = 3_600_000;
function getDeadline(id: string, offsetMs: number): number {
  const key = `pay_deadline_${id}`;
  try {
    const saved = localStorage.getItem(key);
    if (saved) return Number(saved);
    const dl = Date.now() + 24 * HOUR - offsetMs;
    localStorage.setItem(key, String(dl));
    return dl;
  } catch { return Date.now() + 24 * HOUR - offsetMs; }
}
function fmtMs(ms: number) {
  if (ms <= 0) return "00:00:00";
  const h = Math.floor(ms / HOUR), m = Math.floor((ms % HOUR) / 60_000), s = Math.floor((ms % 60_000) / 1_000);
  return [h, m, s].map(n => String(n).padStart(2, "0")).join(":");
}
function useCountdown(id: string, offsetMs: number) {
  const [rem, setRem] = useState<number | null>(null);
  useEffect(() => {
    const dl = getDeadline(id, offsetMs);
    const tick = () => setRem(Math.max(0, dl - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [id, offsetMs]);
  return rem;
}

type Item = { name: string; price: number; qty: number; img: string; status: string; orderId: string; orderIndex: number };

function KonfirmasiCard({ item, onCancel }: { item: Item; onCancel: () => void }) {
  const { t } = useLanguage();
  return (
    <article className="rounded-[8px] border border-neutral-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          <div>
            <p className="text-xs font-bold text-neutral-900">Pesanan {item.orderId}</p>
            <p className="text-[10px] text-neutral-500">10 November 2026</p>
            <p className="text-[10px] text-neutral-500">{t("order.waiting_confirm_status")}</p>
          </div>
        </div>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
      </div>
      <div className="mt-4 flex items-center gap-3 border-y border-neutral-100 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt={item.name} className="h-14 w-14 rounded-[6px] bg-neutral-50 object-contain" />
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-xs text-neutral-700">{item.name}</p>
          <p className="mt-1 text-[10px] text-neutral-500">{item.qty} item · Rp{item.price.toLocaleString("id-ID")}</p>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold text-neutral-900">{t("order.total_order")}</p>
          <p className="text-sm font-bold text-brand">Rp{(item.price * item.qty).toLocaleString("id-ID")}</p>
        </div>
        <button type="button" onClick={onCancel} className="rounded-[8px] border border-brand px-4 py-2 text-xs font-bold text-brand">{t("order.cancel_btn")}</button>
      </div>
    </article>
  );
}

function PembayaranCard({ item }: { item: Item }) {
  const { t } = useLanguage();
  const rem = useCountdown(item.orderId, item.orderIndex * 2 * HOUR);
  const urgent = (rem ?? Infinity) < 2 * HOUR;
  return (
    <article className="rounded-[8px] border border-neutral-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          <div>
            <p className="text-xs font-bold text-neutral-900">Pesanan {item.orderId}</p>
            <p className="text-[10px] text-neutral-500">10 November 2026</p>
            <p className="text-[10px] text-neutral-500">{t("order.awaiting_payment_status")}</p>
          </div>
        </div>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
      </div>
      <div className="mt-4 flex items-center gap-3 border-y border-neutral-100 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt={item.name} className="h-14 w-14 rounded-[6px] bg-neutral-50 object-contain" />
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-xs text-neutral-700">{item.name}</p>
          <p className="mt-1 text-[10px] text-neutral-500">{item.qty} item · Rp{item.price.toLocaleString("id-ID")}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-neutral-900">{t("order.total_order")}</p>
          <p className="text-sm font-bold text-brand">Rp{(item.price * item.qty).toLocaleString("id-ID")}</p>
        </div>
        <div className="flex items-center gap-2">
          {rem !== null && (
            <div className="flex items-center gap-1.5">
              <svg className={`h-3.5 w-3.5 shrink-0 ${urgent ? "text-red-500" : "text-amber-500"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
              <span className={`font-mono text-xs font-bold tabular-nums ${urgent ? "text-red-500" : "text-amber-600"}`}>{fmtMs(rem)}</span>
            </div>
          )}
          <button type="button" className="rounded-[8px] bg-brand px-4 py-2 text-xs font-bold text-white">{t("order.pay_now")}</button>
        </div>
      </div>
    </article>
  );
}

function DalamProsesCard({ item }: { item: Item }) {
  const { t } = useLanguage();
  return (
    <article className="rounded-[8px] border border-neutral-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 shrink-0 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          <div>
            <p className="text-xs font-bold text-neutral-900">Pesanan {item.orderId}</p>
            <p className="text-[10px] text-neutral-500">10 November 2026</p>
          </div>
        </div>
        <svg className="h-5 w-5 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Informasi"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
      </div>
      <div className="mt-4 flex items-center gap-3 border-y border-neutral-100 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt={item.name} className="h-14 w-14 rounded-[6px] bg-neutral-50 object-contain" />
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-xs text-neutral-700">{item.name}</p>
          <p className="mt-1 text-[10px] text-neutral-500">{item.qty} item · Rp{item.price.toLocaleString("id-ID")}</p>
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <p className="text-xs font-bold text-neutral-900">{t("order.total_order")}</p>
        <p className="text-sm font-bold text-brand">Rp{(item.price * item.qty).toLocaleString("id-ID")}</p>
      </div>
    </article>
  );
}

function TelahDikirimCard({ item }: { item: Item }) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [reviewed, setReviewed] = useState(() => {
    try { return new Set<string>(JSON.parse(localStorage.getItem("reviewed_products") || "[]")); } catch { return new Set<string>(); }
  });
  const [noteOpen, setNoteOpen] = useState(false);
  function openNote() { setNoteOpen(true); document.body.style.overflow = "hidden"; }
  function closeNote() { setNoteOpen(false); document.body.style.overflow = ""; }
  function beliLagi() { addItem({ sku: item.name, name: item.name, price: `Rp${item.price.toLocaleString("id-ID")}`, icon: item.img }); }
  const router = useRouter();

  return (
    <article className="rounded-[8px] border border-neutral-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 shrink-0 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          <div>
            <p className="text-xs font-bold text-neutral-900">Pesanan {item.orderId}</p>
            <p className="text-[10px] text-neutral-500">10 November 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={openNote} aria-label="Delivery Note">
            <svg className="h-5 w-5 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
          </button>
          <svg className="h-5 w-5 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Informasi"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 border-y border-neutral-100 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt={item.name} className="h-14 w-14 rounded-[6px] bg-neutral-50 object-contain" />
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-xs text-neutral-700">{item.name}</p>
          <p className="mt-1 text-[10px] text-neutral-500">{item.qty} item · Rp{item.price.toLocaleString("id-ID")}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-neutral-900">{t("order.total_shopping")}</p>
          <p className="text-sm font-bold text-brand">Rp{(item.price * item.qty).toLocaleString("id-ID")}</p>
        </div>
        <div className="flex gap-2">
          {reviewed.has(item.name) ? (
            <button type="button" onClick={() => router.push("/ulasan")} className="rounded-[8px] border border-brand px-3 py-2 text-xs font-bold text-brand">{t("order.view_review")}</button>
          ) : (
            <button type="button" className="rounded-[8px] border border-brand px-3 py-2 text-xs font-bold text-brand">{t("order.review")}</button>
          )}
          <button type="button" onClick={beliLagi} className="rounded-[8px] bg-brand px-3 py-2 text-xs font-bold text-white">{t("order.buy_again")}</button>
        </div>
      </div>
      {noteOpen && <DeliveryNote orderIndex={item.orderIndex % 5} onClose={closeNote} />}
    </article>
  );
}

function DibatalkanCard({ item }: { item: Item }) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [pressed, setPressed] = useState(false);
  function reorder() { addItem({ sku: item.name, name: item.name, price: `Rp${item.price.toLocaleString("id-ID")}`, icon: item.img }); setPressed(true); setTimeout(() => setPressed(false), 300); }
  return (
    <article className="rounded-[8px] border border-neutral-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 shrink-0 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          <div>
            <p className="text-xs font-bold text-neutral-900">Pesanan {item.orderId}</p>
            <p className="text-[10px] text-neutral-500">10 November 2026</p>
          </div>
        </div>
        <svg className="h-5 w-5 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Informasi"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
      </div>
      <div className="mt-4 flex items-center gap-3 border-y border-neutral-100 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt={item.name} className="h-14 w-14 rounded-[6px] bg-neutral-50 object-contain" />
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-xs text-neutral-700">{item.name}</p>
          <p className="mt-1 text-[10px] text-neutral-500">{item.qty} item · Rp{item.price.toLocaleString("id-ID")}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-neutral-900">{t("order.total_order")}</p>
          <p className="text-sm font-bold text-brand">Rp{(item.price * item.qty).toLocaleString("id-ID")}</p>
        </div>
        <button type="button" onClick={reorder} style={{ transform: pressed ? "scale(0.92)" : "scale(1)", transition: "transform 0.15s ease" }} className="rounded-[8px] bg-brand px-3 py-2 text-xs font-bold text-white">{t("order.reorder")}</button>
      </div>
    </article>
  );
}

function CancelSheet({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [sheetY, setSheetY] = useState(0);
  const [reason, setReason] = useState("");
  const startY = useRef(0);
  const dragging = useRef(false);
  useEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true))); }, []);
  function close() { setVisible(false); setTimeout(onClose, 300); }
  const reasons = [t("order.cancel_reason_1"), t("order.cancel_reason_2"), t("order.cancel_reason_3"), t("order.cancel_reason_4")];
  return createPortal(
    <div className={`fixed inset-0 z-[200] flex items-end bg-black/40 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`} onClick={close}>
      <div className="w-full rounded-t-3xl bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ transform: visible ? `translateY(${sheetY}px)` : "translateY(100%)", touchAction: "none" }}
        onClick={e => e.stopPropagation()}
        onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); startY.current = e.clientY; dragging.current = true; }}
        onPointerMove={e => { if (!dragging.current) return; setSheetY(Math.max(0, e.clientY - startY.current)); }}
        onPointerUp={() => { dragging.current = false; if (sheetY > 80) close(); else setSheetY(0); }}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-neutral-300" />
        <h2 className="text-base font-bold text-neutral-900">{t("order.cancel_reason_title")}</h2>
        <p className="mt-1 text-xs text-neutral-500">{t("order.cancel_reason_sub")}</p>
        <div className="mt-3 flex flex-col gap-1.5">
          {reasons.map(r => (
            <label key={r} className="flex items-center gap-2 rounded-[8px] border border-neutral-200 px-3 py-2 text-xs text-neutral-700">
              <input type="radio" name="cancel-reason" checked={reason === r} onChange={() => setReason(r)} className="accent-brand" />{r}
            </label>
          ))}
        </div>
        <button type="button" disabled={!reason} onClick={() => { onConfirm(); close(); }} className={`mt-4 w-full rounded-[8px] py-2.5 text-xs font-bold ${reason ? "bg-brand text-white" : "bg-neutral-200 text-neutral-400"}`}>{t("order.cancel_ok")}</button>
      </div>
    </div>,
    document.body
  );
}

const FILTERS = [
  { key: "order.filter_all", route: "semua" },
  { key: "account.waiting_confirm", route: "menunggu-konfirmasi" },
  { key: "account.waiting_payment", route: "menunggu-pembayaran" },
  { key: "account.in_process", route: "dalam-proses" },
  { key: "account.shipped", route: "telah-dikirim" },
  { key: "account.cancelled", route: "dibatalkan" },
] as const;

export default function PesananPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [filter, setFilter] = useState<typeof FILTERS[number]["key"]>("order.filter_all");
  const [items, setItems] = useState<Item[]>([]);
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pending_confirmation_order");
    const products = [
      ["ABC Alkaline Battery AA", 27900, "battery"],
      ["Sinarline Copy Paper A4", 36900, "paper"],
      ["Tekiro Obeng Plus PH2", 18500, "screwdriver"],
      ["WD-40 Multi-Purpose 333ml", 89900, "wd40"],
      ["Sarung Tangan Safety", 42000, "gloves"],
    ] as const;
    const statuses = ["account.waiting_payment", "account.in_process", "account.shipped", "account.cancelled"] as const;
    const dummy: Item[] = statuses.flatMap((status, si) =>
      products.map(([name, price, slug], pi) => ({
        name, price, qty: 1,
        img: `https://picsum.photos/seed/pesanan-${status}-${slug}/160/160`,
        status,
        orderId: `ORD-DEMO-${String(si * products.length + pi + 1).padStart(3, "0")}`,
        orderIndex: pi,
      }))
    );
    let konfirmasiItems: Item[] = [];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        konfirmasiItems = (parsed.items ?? []).map((it: { name: string; price: number; qty: number; img: string }, i: number) => ({
          ...it, status: "account.waiting_confirm",
          orderId: parsed.id ?? "ORD-DEMO-000",
          orderIndex: i,
        }));
      } catch { /* ignore */ }
    }
    setItems([...konfirmasiItems, ...dummy]);
  }, []);

  const visible = items.filter(it => filter === "order.filter_all" || it.status === filter);

  return (
    <main className="min-h-dvh bg-neutral-50">
      <style>{`@keyframes pageItemIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <header className="sticky top-0 z-20 flex items-center gap-3 rounded-b-3xl bg-brand px-4 py-4 text-white shadow-md">
        <button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-sm font-bold text-white">{t("order.all_orders")}</h1>
      </header>
      <div className="border-b border-neutral-200 bg-white py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4">
          {FILTERS.map(({ key }) => (
            <button key={key} type="button" onClick={() => setFilter(key)} className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${filter === key ? "border-brand bg-brand text-white" : "border-neutral-300 bg-white text-neutral-600"}`}>
              {t(key)}
            </button>
          ))}
          <span className="shrink-0 w-2" aria-hidden />
        </div>
      </div>
      <section className="flex flex-col gap-5 px-4 py-5 pb-8">
        {visible.length === 0
          ? <div className="flex min-h-[calc(100dvh-130px)] items-center justify-center"><p className="text-sm text-neutral-400">{t("order.no_orders")}</p></div>
          : visible.map((item, i) => (
              <div key={`${item.status}-${item.orderId}-${i}`} style={{ animation: `pageItemIn 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s both` }}>
                {item.status === "account.waiting_confirm" && <KonfirmasiCard item={item} onCancel={() => setCancelTarget(item.orderId)} />}
                {item.status === "account.waiting_payment" && <PembayaranCard item={item} />}
                {item.status === "account.in_process" && <DalamProsesCard item={item} />}
                {item.status === "account.shipped" && <TelahDikirimCard item={item} />}
                {item.status === "account.cancelled" && <DibatalkanCard item={item} />}
              </div>
            ))
        }
      </section>
      {cancelTarget && (
        <CancelSheet
          onClose={() => setCancelTarget(null)}
          onConfirm={() => {
            localStorage.removeItem("pending_confirmation_order");
            setItems(prev => prev.filter(it => it.status !== "account.waiting_confirm"));
          }}
        />
      )}
    </main>
  );
}
