"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";

const PROMOS = [
  {
    title: "PROMO WEEKEND",
    desc: "Diskon 10% Semua Produk di monotaro.id",
    kode: "WEEKEND10",
    berlaku: "Berlaku 7-8 November 2026",
  },
  { title: "PROMO KEBUTUHAN KANTOR", desc: "Diskon khusus produk kebutuhan kantor", kode: "KANTOR15", berlaku: "Berlaku s/d 30 November 2026" },
  { title: "PROMO ALAT LABORATORIUM", desc: "Diskon 5% alat laboratorium pilihan", kode: "LAB5", berlaku: "Berlaku s/d 15 November 2026" },
];

const PAYMENTS = [
  { id: "tempo", label: "Pembayaran Tempo / Termin", sub: "Pesanan akan segera diproses", badge: "TEMPO", badgeColor: "bg-orange-500", icon: "/Payment/Tempo Logo - Colored - zonalogo.com.svg", disabled: true },
  { id: "cod", label: "Cash On Delivery / COD", sub: "Biaya COD Gratis, syarat dan ketentuan berlaku", badge: "COD", badgeColor: "bg-green-600", icon: "/Payment/cash-on-delivery-logo-free-png.webp", disabled: true },
  { id: "bca", label: "BCA Virtual Account", sub: "Transfer antar rekening BCA", badge: "BCA", badgeColor: "bg-blue-600", icon: "/Payment/Bank Central Asia (BCA) Logo - Colored - zonalogo.com.svg" },
  { id: "permata", label: "Permata Virtual Account", sub: "Transfer antar Bank (semua bank)", badge: "PERMATA", badgeColor: "bg-red-600", icon: "/Payment/Permata Bank Logo - Colored - zonalogo.com.svg" },
  { id: "mandiri", label: "Mandiri Virtual Account", sub: "", badge: "MANDIRI", badgeColor: "bg-yellow-500", icon: "/Payment/Bank Mandiri Logo - Colored - zonalogo.com.svg" },
  { id: "bni", label: "BNI Virtual Account", sub: "", badge: "BNI", badgeColor: "bg-orange-600", icon: "/Payment/Bank Negara Indonesia (BNI) Logo - Colored - zonalogo.com.svg" },
  { id: "bri", label: "BRI Virtual Account", sub: "", badge: "BRI", badgeColor: "bg-blue-800", icon: "/Payment/Bank Rakyat Indonesia (BRI) Logo - Horizontal With Full Name Colored - zonalogo.com.svg" },
  { id: "kartu", label: "Kartu Kredit / Debit Online", sub: "", badge: "VISA/MC", badgeColor: "bg-neutral-700", icon: "/Payment/Visa Logo - Colored - zonalogo.com.svg" },
  { id: "instan", label: "Pembayaran Instan", sub: "Pembayaran dengan Gopay atau scan QRIS", badge: "QRIS", badgeColor: "bg-purple-600", icon: "/Payment/QRIS Logo - Black - zonalogo.com.svg" },
];

const ITEMS = [
  { name: "ABC (Battery) Alkaline Battery AA LR6 Millenium Power 4B+2B 1pack(4+2pcs)", sku: "S000001674", price: 27900, weight: 0.15, qty: 1, img: "https://picsum.photos/seed/battery/200/200" },
];

function formatRp(n: number) {
  return "Rp" + n.toLocaleString("id-ID");
}

function PaymentIcon({ pm, size = "sm" }: { pm: typeof PAYMENTS[0]; size?: "sm" | "lg" }) {
  const dim = size === "lg" ? "w-14 h-8" : "w-12 h-7";
  if (pm.icon) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={pm.icon} alt={pm.badge} className={`${dim} object-contain`} />;
  }
  return (
    <div className={`${pm.badgeColor} rounded-[6px] px-2 py-1 flex items-center justify-center ${size === "lg" ? "h-8" : "h-7"}`}>
      <p className="text-[10px] font-bold text-white">{pm.badge}</p>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [userName, setUserName] = useState("Nama Penerima");
  const [alamat, setAlamat] = useState("");
  const [noPO, setNoPO] = useState("");
  const [voucher, setVoucher] = useState("");
  const [items] = useState(ITEMS);
  const [selectedPayment, setSelectedPayment] = useState("bca");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const paymentDragY = useRef(0);
  const [paymentDragging, setPaymentDragging] = useState(false);
  const [paymentDy, setPaymentDy] = useState(0);

  const [showAlamat, setShowAlamat] = useState(false);
  const [alamatVisible, setAlamatVisible] = useState(false);
  const alamatDragY = useRef(0);
  const [alamatDragging, setAlamatDragging] = useState(false);
  const [alamatDy, setAlamatDy] = useState(0);
  const [formNama, setFormNama] = useState("");
  const [formHp, setFormHp] = useState("");
  const [formProvinsi, setFormProvinsi] = useState("");
  const [formDetail, setFormDetail] = useState("");
  const [formBadanUsaha, setFormBadanUsaha] = useState("");
  const [formPerusahaan, setFormPerusahaan] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [showPromo, setShowPromo] = useState(false);
  const [promoVisible, setPromoVisible] = useState(false);
  const [openPromo, setOpenPromo] = useState(0);
  const promoDragY = useRef(0);
  const [promoDragging, setPromoDragging] = useState(false);
  const [promoDy, setPromoDy] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("user_name");
    const email = localStorage.getItem("user_email") ?? "";
    if (saved) { setUserName(saved); }
    else if (email) {
      const local = email.split("@")[0];
      setUserName(local.charAt(0).toUpperCase() + local.slice(1));
    }
  }, []);

  useEffect(() => {
    if (showPromo) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setPromoVisible(true));
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showPromo]);

  useEffect(() => {
    const anyOpen = showPromo || showPayment || showAlamat;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showPromo, showPayment, showAlamat]);

  useEffect(() => {
    if (showAlamat) requestAnimationFrame(() => setAlamatVisible(true));
    else { setAlamatDy(0); setFormSubmitted(false); }
  }, [showAlamat]);

  function closeAlamat() {
    setAlamatVisible(false);
    setAlamatDy(0);
    setTimeout(() => setShowAlamat(false), 320);
  }

  function handleAlamatDragStart(e: React.TouchEvent) {
    alamatDragY.current = e.touches[0].clientY;
    setAlamatDragging(true);
  }
  function handleAlamatDragMove(e: React.TouchEvent) {
    const dy = e.touches[0].clientY - alamatDragY.current;
    if (dy > 0) setAlamatDy(dy);
  }
  function handleAlamatDragEnd() {
    setAlamatDragging(false);
    if (alamatDy > 80) closeAlamat();
    else setAlamatDy(0);
  }

  function submitAlamat() {
    setFormSubmitted(true);
    if (!formNama || !formHp || !formProvinsi || !formDetail) return;
    setAlamat(`${formNama} · ${formHp}\n${formProvinsi}\n${formDetail}`);
    closeAlamat();
  }

  useEffect(() => {
    if (showPayment) requestAnimationFrame(() => setPaymentVisible(true));
    else setPaymentDy(0);
  }, [showPayment]);

  function closePayment() {
    setPaymentVisible(false);
    setPaymentDy(0);
    setTimeout(() => setShowPayment(false), 320);
  }

  function handlePaymentDragStart(e: React.TouchEvent) {
    paymentDragY.current = e.touches[0].clientY;
    setPaymentDragging(true);
  }
  function handlePaymentDragMove(e: React.TouchEvent) {
    const dy = e.touches[0].clientY - paymentDragY.current;
    if (dy > 0) setPaymentDy(dy);
  }
  function handlePaymentDragEnd() {
    setPaymentDragging(false);
    if (paymentDy > 80) closePayment();
    else setPaymentDy(0);
  }

  function closePromo() {
    setPromoVisible(false);
    setPromoDy(0);
    setTimeout(() => setShowPromo(false), 320);
  }

  function handlePromoDragStart(e: React.TouchEvent) {
    promoDragY.current = e.touches[0].clientY;
    setPromoDragging(true);
  }
  function handlePromoDragMove(e: React.TouchEvent) {
    const dy = e.touches[0].clientY - promoDragY.current;
    if (dy > 0) setPromoDy(dy);
  }
  function handlePromoDragEnd() {
    setPromoDragging(false);
    if (promoDy > 80) closePromo();
    else setPromoDy(0);
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const ppn = Math.round(subtotal * 0.11);
  const total = subtotal + ppn;
  const beratTotal = items.reduce((s, i) => s + i.weight * i.qty, 0);

  return (
    <main className="min-h-dvh pb-28">
      {/* Header */}
      <header className="relative flex items-center border-b border-neutral-200 bg-white px-4 py-3 sticky top-0 z-10">
        <button type="button" onClick={() => router.back()} className="text-neutral-500">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Logo.png" alt="monotaro.id" className="absolute left-1/2 top-1/2 h-7 w-auto -translate-x-1/2 -translate-y-1/2 object-contain" />
      </header>

      <div className="page-content px-5 py-6 flex flex-col gap-6">

        {/* Alamat Pengiriman */}
        <div className="bg-white rounded-[8px] border border-neutral-200 p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold text-neutral-900">{t("checkout.shipping_address")}</p>
            <button type="button" onClick={() => setShowAlamat(true)} className="shrink-0 text-xs font-semibold text-neutral-900 bg-white rounded-[8px] px-4 py-2" style={{boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"}}>
              {alamat ? t("checkout.change_btn") : t("checkout.add_address")}
            </button>
          </div>
          {alamat ? (
            <p className="text-xs text-neutral-700">{alamat}</p>
          ) : (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-[8px] px-3 py-2">
              <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              <p className="text-[11px] text-red-500">{t("checkout.fill_address")}</p>
            </div>
          )}
        </div>

        {/* Nomor PO & Faktur Pajak */}
        <div className="bg-white rounded-[8px] border border-neutral-200 p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-bold text-neutral-900">{t("checkout.po_number")}</p>
            <input
              type="text"
              value={noPO}
              onChange={(e) => setNoPO(e.target.value)}
              placeholder="Masukkan nomor PO"
              className="field text-xs"
            />
            <p className="text-[10px] text-brand">Kami akan menerbitkan Invoice sesuai dengan nomor PO permintaan Anda</p>
          </div>
          <div className="border-t border-neutral-100 pt-4 flex flex-col gap-1">
            <p className="text-xs font-bold text-neutral-900">Butuh Faktur Pajak</p>
            <p className="text-[11px] text-neutral-500">
              Fitur Faktur Pajak hanya tersedia untuk Akun Bisnis,{" "}
              <button type="button" className="text-brand font-semibold">lihat selengkapnya</button>
            </p>
          </div>
        </div>

        {/* Review Pesanan */}
        <div className="bg-white rounded-[8px] border border-neutral-200 p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-neutral-900">Review Pesanan</p>
            <button type="button" onClick={() => { sessionStorage.setItem("open_keranjang", "1"); router.push("/"); }} className="text-xs font-semibold text-neutral-900 bg-white rounded-[8px] px-4 py-2" style={{boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"}}>
              Ubah produk
            </button>
          </div>
          <p className="text-[11px] text-neutral-500">{t("checkout.total_weight")} (Estimasi {beratTotal.toFixed(1)} kg)</p>
          <div className="border-t border-neutral-100 pt-3 flex flex-col gap-3">
            {items.map((item, i) => (
              <div key={i} className="flex gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.name} className="w-14 h-14 rounded-[6px] object-cover bg-neutral-50 shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <p className="text-[11px] text-neutral-700 leading-snug line-clamp-2">{item.name}</p>
                  <p className="text-[10px] text-neutral-400">No. SKU: {item.sku}</p>
                  <p className="text-[10px] text-neutral-500">{formatRp(item.price)} · {item.weight} kg / unit</p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-0.5 pt-0.5">
                  <p className="text-[10px] text-neutral-400">{t("cart.total_price")}</p>
                  <p className="text-xs font-bold text-neutral-900">{formatRp(item.price * item.qty)}</p>
                  <p className="text-[10px] text-neutral-400">{(item.weight * item.qty).toFixed(2)} kg</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kode Voucher & Pembayaran */}
        {(() => {
          const pm = PAYMENTS.find(p => p.id === selectedPayment);
          return (
            <div className="bg-white rounded-[8px] border border-neutral-200 flex flex-col divide-y divide-neutral-100">
              {/* Voucher */}
              <div className="p-4 flex flex-col gap-2">
                <p className="text-xs font-bold text-neutral-900">Punya Kode Voucher?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    placeholder="Masukkan kode diskon"
                    className="field flex-1 text-xs"
                  />
                  <button type="button" className="text-xs font-semibold text-neutral-900 bg-white rounded-[8px] px-4 py-2.5 shrink-0" style={{boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"}}>Gunakan</button>
                </div>
                <button type="button" onClick={() => setShowPromo(true)} className="text-[11px] font-semibold text-brand text-left">Kupon promo yang tersedia &gt;</button>
              </div>
              {/* Pembayaran */}
              <div className="p-4 flex flex-col gap-3">
                <p className="text-xs font-bold text-neutral-900">Pembayaran</p>
                {pm && (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-neutral-800">{pm.label}</p>
                      {pm.sub && <p className="text-[10px] text-neutral-500">{pm.sub}</p>}
                    </div>
                    <PaymentIcon pm={pm} />
                  </div>
                )}
                <button type="button" onClick={() => setShowPayment(true)} className="text-xs font-semibold text-neutral-900 bg-white rounded-[8px] px-4 py-2.5" style={{boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"}}>
                  {pm ? t("checkout.change_payment") : t("checkout.select_payment_btn")}
                </button>
              </div>
            </div>
          );
        })()}

        {/* Rangkuman Pesanan */}
        <div className="bg-brand/5 rounded-[8px] p-4 flex flex-col gap-2">
          <p className="text-xs font-bold text-neutral-900">Rangkuman Pesanan</p>
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex justify-between">
              <p className="text-xs text-neutral-500">{t("checkout.subtotal_before_vat")}</p>
              <p className="text-xs font-semibold text-neutral-800">{formatRp(subtotal)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-neutral-500">{t("checkout.shipping_cost")}</p>
              <p className="text-xs font-semibold text-neutral-800">Rp0</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-neutral-500">{t("cart.ppn")}</p>
              <p className="text-xs font-semibold text-neutral-800">{formatRp(ppn)}</p>
            </div>
            <div className="flex justify-between border-t border-neutral-300 pt-2 mt-1">
              <p className="text-xs font-bold text-neutral-900">{t("checkout.total_order")}</p>
              <p className="text-sm font-bold text-neutral-900">{formatRp(total)}</p>
            </div>
          </div>
        </div>

        {/* Promo ongkir */}
        <div className="bg-white rounded-[8px] border border-neutral-200 p-4 flex gap-3">
          <svg className="w-8 h-8 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-bold text-neutral-800">
              Promo <span className="text-brand">GRATIS ONGKIR*</span> ke Jabodetabek, Banten, Jabar, & Jatim dengan minimum pembelian Rp200.000
            </p>
            <div className="border-t border-neutral-200 my-1" />
            <p className="text-[10px] text-neutral-500">
              Promo <span className="text-brand font-semibold">GRATIS ONGKIR*</span> ke seluruh wilayah Pulau Jawa, Bali, Sumatera, Kalimantan & Sulawesi*.{" "}
              <button type="button" className="text-brand font-semibold">Lihat S&K di sini</button>
            </p>
          </div>
        </div>

        <p className="text-[10px] text-neutral-400 text-center px-4 pb-2">
          Dengan melakukan pesanan ini, Anda setuju dengan{" "}
          <button type="button" className="text-brand">kebijakan privasi</button> dan{" "}
          <button type="button" className="text-brand">syarat dan ketentuan</button> monotaro.id
        </p>
      </div>

      {/* Bottom sheet promo */}
      {showPromo && typeof document !== "undefined" && createPortal(
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[200] transition-opacity duration-280"
            style={{ opacity: promoVisible ? 1 : 0 }}
            onClick={closePromo}
          />
          <div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-[16px] z-[201] flex flex-col max-h-[80dvh]"
            style={{
              transform: promoVisible ? `translateY(${promoDy}px)` : "translateY(100%)",
              transition: promoDragging ? "none" : "transform 320ms cubic-bezier(0.32,0.72,0,1)",
            }}
          >
            {/* Drag handle */}
            <div
              className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing"
              style={{ touchAction: "none" }}
              onTouchStart={handlePromoDragStart}
              onTouchMove={handlePromoDragMove}
              onTouchEnd={handlePromoDragEnd}
            >
              <div className="w-10 h-1 rounded-full bg-neutral-300" />
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
              <p className="text-sm font-bold text-neutral-900">Promo yang sedang berlangsung</p>
              <button type="button" onClick={closePromo} className="text-neutral-400">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>
              </button>
            </div>
            <div className="overflow-y-auto flex flex-col divide-y divide-neutral-100 pb-4">
              {PROMOS.map((p, i) => (
                <div key={i} className="px-4 py-4 flex flex-col gap-2">
                  <p className="text-xs font-bold text-neutral-900">{p.title}</p>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-neutral-700">{p.desc}</p>
                    <button
                      type="button"
                      onClick={() => { setVoucher(p.kode); closePromo(); }}
                      className="shrink-0 text-xs font-semibold text-neutral-900 bg-white rounded-[8px] px-4 py-2"
                      style={{boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"}}
                    >
                      SALIN
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500">Kode Voucher: <span className="font-semibold">{p.kode}</span></p>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-neutral-400 italic">{p.berlaku}</p>
                    <button type="button" className="text-[11px] font-semibold text-neutral-700">Lihat selengkapnya</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Bottom sheet alamat */}
      {showAlamat && typeof document !== "undefined" && createPortal(
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[200] transition-opacity duration-280"
            style={{ opacity: alamatVisible ? 1 : 0 }}
            onClick={closeAlamat}
          />
          <div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-[16px] z-[201] flex flex-col max-h-[92dvh]"
            style={{
              transform: alamatVisible ? `translateY(${alamatDy}px)` : "translateY(100%)",
              transition: alamatDragging ? "none" : "transform 320ms cubic-bezier(0.32,0.72,0,1)",
            }}
          >
            {/* Drag handle */}
            <div
              className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing shrink-0"
              style={{ touchAction: "none" }}
              onTouchStart={handleAlamatDragStart}
              onTouchMove={handleAlamatDragMove}
              onTouchEnd={handleAlamatDragEnd}
            >
              <div className="w-10 h-1 rounded-full bg-neutral-300" />
            </div>
            {/* Header */}
            <div className="flex items-start justify-between px-4 pt-2 pb-3 shrink-0">
              <p className="text-lg font-bold text-neutral-900">{t("checkout.shipping_address")}</p>
              <div className="flex flex-col items-end gap-1">
                <button type="button" onClick={closeAlamat} className="text-neutral-400">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>
                </button>
                <p className="text-[11px] font-semibold text-brand">*Wajib Diisi</p>
              </div>
            </div>
            {/* Form */}
            <div className="overflow-y-auto px-4 pb-6 flex flex-col gap-4">
              {/* Nama & HP */}
              <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-xs font-semibold text-neutral-700">Nama Penerima <span className="text-brand">*</span></p>
                  <input
                    type="text"
                    value={formNama}
                    onChange={(e) => setFormNama(e.target.value)}
                    placeholder={userName}
                    className={`field text-xs ${formSubmitted && !formNama ? "border-brand" : ""}`}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-xs font-semibold text-neutral-700">Nomor Handphone/Telp. <span className="text-brand">*</span></p>
                  <input
                    type="tel"
                    value={formHp}
                    onChange={(e) => setFormHp(e.target.value)}
                    placeholder="Contoh: 08000000000 atau 021556789"
                    className={`field text-xs ${formSubmitted && !formHp ? "border-brand" : ""}`}
                  />
                  {formSubmitted && !formHp && <p className="text-[10px] text-brand font-semibold">Harus diisi.</p>}
                </div>
              </div>
              {/* Provinsi */}
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-neutral-700">Provinsi/Kota/Kabupaten/Kecamatan/Kode Pos <span className="text-brand">*</span></p>
                <input
                  type="text"
                  value={formProvinsi}
                  onChange={(e) => setFormProvinsi(e.target.value)}
                  placeholder="Contoh: Jawa Barat/Bekasi/Jati Asih/17423"
                  className={`field text-xs ${formSubmitted && !formProvinsi ? "border-brand" : ""}`}
                />
                {formSubmitted && !formProvinsi && <p className="text-[10px] text-brand font-semibold">Harus diisi.</p>}
              </div>
              {/* Detail Alamat */}
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-neutral-700">Detail Alamat (Gedung, Kawasan, Nama Jalan dan Blok) <span className="text-brand">*</span></p>
                <textarea
                  value={formDetail}
                  onChange={(e) => setFormDetail(e.target.value)}
                  placeholder="Contoh: Wisma BNI 46 Lt. 6, Jl. Jenderal Sudirman No.Kav. 1, RT.1/RW.8, Karet Tengsin"
                  rows={3}
                  className={`field text-xs resize-none ${formSubmitted && !formDetail ? "border-brand" : ""}`}
                />
                {formSubmitted && !formDetail && <p className="text-[10px] text-brand font-semibold">Harus diisi.</p>}
              </div>
              {/* Badan Usaha & Perusahaan */}
              <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-xs font-semibold text-neutral-700">Badan Usaha <span className="text-amber-500 font-normal">(Opsional)</span></p>
                  <select
                    value={formBadanUsaha}
                    onChange={(e) => setFormBadanUsaha(e.target.value)}
                    className="field text-xs"
                  >
                    <option value=""></option>
                    <option value="PT">PT</option>
                    <option value="CV">CV</option>
                    <option value="UD">UD</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-xs font-semibold text-neutral-700">Perusahaan <span className="text-amber-500 font-normal">(Opsional)</span></p>
                  <input
                    type="text"
                    value={formPerusahaan}
                    onChange={(e) => setFormPerusahaan(e.target.value)}
                    placeholder="Masukkan nama perusahaan"
                    className="field text-xs"
                  />
                </div>
              </div>
              {/* Submit */}
              {(() => {
                const valid = !!(formNama && formHp && formProvinsi && formDetail);
                return (
                  <button
                    type="button"
                    onClick={submitAlamat}
                    disabled={!valid}
                    className={`w-full text-xs font-semibold rounded-[8px] py-2.5 transition-opacity ${valid ? "text-neutral-900 bg-white" : "text-neutral-400 bg-white opacity-50 cursor-not-allowed"}`}
                    style={{boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"}}
                  >
                    {t("checkout.use_address")}
                  </button>
                );
              })()}
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Bottom sheet payment */}
      {showPayment && typeof document !== "undefined" && createPortal(
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[200] transition-opacity duration-280"
            style={{ opacity: paymentVisible ? 1 : 0 }}
            onClick={closePayment}
          />
          <div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-[16px] z-[201] flex flex-col max-h-[85dvh]"
            style={{
              transform: paymentVisible ? `translateY(${paymentDy}px)` : "translateY(100%)",
              transition: paymentDragging ? "none" : "transform 320ms cubic-bezier(0.32,0.72,0,1)",
            }}
          >
            <div
              className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing"
              style={{ touchAction: "none" }}
              onTouchStart={handlePaymentDragStart}
              onTouchMove={handlePaymentDragMove}
              onTouchEnd={handlePaymentDragEnd}
            >
              <div className="w-10 h-1 rounded-full bg-neutral-300" />
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
              <p className="text-sm font-bold text-neutral-900">{t("checkout.select_payment_title")}</p>
              <button type="button" onClick={closePayment} className="text-neutral-400">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>
              </button>
            </div>
            <div className="overflow-y-auto flex flex-col divide-y divide-neutral-100 pb-4">
              {PAYMENTS.map((pm) => (
                <div key={pm.id} className="px-4 py-4 flex items-center gap-3">
                  <div className="shrink-0 w-14 flex items-center justify-start">
                    <PaymentIcon pm={pm} size="lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-800">{pm.label}</p>
                    {pm.sub && <p className="text-[10px] text-neutral-500 mt-0.5">{pm.sub}</p>}
                  </div>
                  <button
                    type="button"
                    disabled={pm.disabled}
                    onClick={() => { if (!pm.disabled) { setSelectedPayment(pm.id); closePayment(); } }}
                    className={`shrink-0 text-xs font-semibold rounded-[8px] px-4 py-2 ${pm.disabled ? "bg-neutral-100 text-neutral-400 cursor-not-allowed" : selectedPayment === pm.id ? "bg-brand text-white" : "text-neutral-900 bg-white"}`}
                    style={(!pm.disabled && selectedPayment !== pm.id) ? {boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"} : undefined}
                  >
                    {pm.disabled ? t("checkout.unavailable") : selectedPayment === pm.id ? t("checkout.selected") : t("checkout.select")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-neutral-200 px-4 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))] flex items-center justify-between gap-3 z-10">
        <div>
          <p className="text-[10px] text-neutral-500">{t("checkout.total_order")}</p>
          <p className="text-sm font-bold text-neutral-900">{formatRp(total)}</p>
        </div>
        <button
          type="button"
          disabled={!alamat}
          className={`text-xs font-bold px-6 py-2.5 rounded-[8px] transition-colors ${alamat ? "bg-brand text-white" : "bg-neutral-200 text-neutral-400 cursor-not-allowed"}`}
        >
          {t("checkout.pay_now")}
        </button>
      </div>
    </main>
  );
}
