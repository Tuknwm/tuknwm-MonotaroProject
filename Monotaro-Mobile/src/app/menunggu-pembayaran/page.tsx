"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const PRODUCTS = [["ABC Alkaline Battery AA", "Rp27.900", "https://picsum.photos/seed/order-battery/160/160"], ["Sinarline Copy Paper A4", "Rp36.900", "https://picsum.photos/seed/order-paper/160/160"], ["Tekiro Obeng Plus PH2", "Rp18.500", "https://picsum.photos/seed/order-screwdriver/160/160"], ["WD-40 Multi-Purpose 333ml", "Rp89.900", "https://picsum.photos/seed/order-wd40/160/160"], ["Sarung Tangan Safety", "Rp42.000", "https://picsum.photos/seed/order-gloves/160/160"]];
const HOUR = 3600_000;

function getDeadline(id: string, offsetMs: number): number {
  const key = `pay_deadline_${id}`;
  try {
    const saved = localStorage.getItem(key);
    if (saved) return Number(saved);
    const deadline = Date.now() + 24 * HOUR - offsetMs;
    localStorage.setItem(key, String(deadline));
    return deadline;
  } catch { return Date.now() + 24 * HOUR - offsetMs; }
}

function fmt(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const h = Math.floor(ms / HOUR);
  const m = Math.floor((ms % HOUR) / 60_000);
  const s = Math.floor((ms % 60_000) / 1_000);
  return [h, m, s].map(n => String(n).padStart(2, "0")).join(":");
}

function useCountdown(id: string, offsetMs: number) {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const deadline = getDeadline(id, offsetMs);
    const tick = () => setRemaining(Math.max(0, deadline - Date.now()));
    tick();
    const id_ = setInterval(tick, 1000);
    return () => clearInterval(id_);
  }, [id, offsetMs]);
  return remaining;
}

function CountdownTimer({ orderId, offsetMs }: { orderId: string; offsetMs: number }) {
  const remaining = useCountdown(orderId, offsetMs);
  if (remaining === null) return null;
  const urgent = remaining < 2 * HOUR;
  return (
    <div className="mt-2 flex items-center gap-1.5">
      <svg className={`h-3.5 w-3.5 shrink-0 ${urgent ? "text-red-500" : "text-amber-500"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
      <span className={`font-mono text-xs font-bold tabular-nums ${urgent ? "text-red-500" : "text-amber-600"}`}>{fmt(remaining)}</span>
    </div>
  );
}

export default function MenungguPembayaranPage() {
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <main className="min-h-dvh bg-neutral-50 pt-[60px]">
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 rounded-b-3xl bg-brand px-4 py-4 text-white shadow-md">
        <button type="button" onClick={() => router.back()} className="text-white"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button>
        <h1 className="ml-2 text-sm font-bold">{t("account.waiting_payment")}</h1>
      </header>
      <style>{`@keyframes pageItemIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className="flex flex-col gap-5 px-4 pb-8">
        {PRODUCTS.map(([name, price, image], index) => (
          <article key={name} style={{ animation: `pageItemIn 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s both` }} className="rounded-[8px] border border-neutral-200 bg-white p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Pesanan ORD-DEMO-{String(index + 1).padStart(3, "0")}</p>
                  <p className="text-[10px] text-neutral-500">10 November 2026</p>
                  <p className="text-[10px] text-neutral-500">{t("order.awaiting_payment_status")}</p>
                </div>
              </div>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
            </div>
            <div className="mt-4 flex items-center gap-3 border-y border-neutral-100 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={name} className="h-14 w-14 rounded-[6px] bg-neutral-50 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs text-neutral-700">{name}</p>
                <p className="mt-1 text-[10px] text-neutral-500">1 item · {price}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-neutral-900">{t("order.total_order")}</p>
                <p className="text-sm font-bold text-brand">{price}</p>
              </div>
              <div className="flex items-center gap-2">
                <CountdownTimer orderId={`ORD-DEMO-${String(index + 1).padStart(3, "0")}`} offsetMs={index * 2 * HOUR} />
                <button type="button" className="rounded-[8px] bg-brand px-4 py-2 text-xs font-bold text-white">{t("order.pay_now")}</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
