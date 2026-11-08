"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function PickupServicePage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const STEPS = [
    {
      icon: "/PickUpService/icon-order-a.webp",
      title: language === "en" ? "Order" : "Pesan",
      desc: language === "en" ? "Place product orders on monotaro.id through checkout" : "Lakukan pesanan produk melalui monotaro.id hingga checkout",
    },
    {
      icon: "/PickUpService/icon-request-a.webp",
      title: language === "en" ? "Submit Request" : "Ajukan Permintaan",
      desc: language === "en"
        ? <><span className="text-brand underline">Fill in the Pick Up Form</span> to request pick up</>
        : <>Ajukan permintaan untuk pick up dengan mengisi <span className="text-brand underline">Form Pick Up</span></>,
    },
    {
      icon: "/PickUpService/icon-pickup-a.webp",
      title: language === "en" ? "Collect Order" : "Ambil Pesanan",
      desc: language === "en" ? "Pick up your order at the monotaro.id warehouse once you receive confirmation from the monotaro.id team" : "Pick Up pesanan Anda di gudang monotaro.id jika sudah menerima konfirmasi dari tim monotaro.id",
    },
    {
      icon: "/PickUpService/icon-receive-a.webp",
      title: language === "en" ? "Items Ready to Use" : "Barang Siap Dipakai",
      desc: language === "en" ? "Your ordered items are now in your hands" : "Barang pesanan sudah diterima ditangan Anda",
    },
  ];

  return (
    <main className="min-h-dvh bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="text-neutral-500 shrink-0" aria-label={t("common.back")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-neutral-900 flex-1">Pick Up Service</h1>
      </header>

      <div className="page-content">
        {/* Banner */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/PickUpService/BannerAtas.avif" alt="Pick Up Service" className="w-full" />

        {/* Description */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <p className="text-[11px] text-neutral-700 leading-relaxed text-justify">
            {language === "en"
              ? <><strong>Pick Up Service</strong> is a service provided by monotaro.id to help customers receive their ordered goods faster. Customers can directly pick up and check the condition of their ordered goods at the monotaro.id warehouse without waiting in a delivery queue.</>
              : <><strong>Pick Up Service (Ambil Sendiri)</strong> merupakan layanan yang disediakan monotaro.id untuk mempermudah pelanggan memperoleh barang pesanannya dengan lebih cepat. Pelanggan bisa langsung mengambil dan mengecek kondisi barang pesanannya sendiri di gudang monotaro.id tanpa harus menunggu antrian pengiriman.</>
            }
          </p>
        </div>

        {/* How to Use */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900 mb-4">
            {language === "en" ? "How to use Pick Up Service?" : "Bagaimana caranya menggunakan layanan Pick Up Service?"}
          </h3>
          <div className="flex overflow-x-auto no-scrollbar gap-0">
            {STEPS.map((s, i) => {
              const shades = ["bg-orange-600","bg-orange-500","bg-orange-400","bg-orange-300"];
              return (
                <div key={i} className="flex items-stretch shrink-0">
                  <div className={`${shades[i]} p-3 flex flex-col items-center text-center gap-2 w-32`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt={s.title} className="w-9 h-9 object-contain" />
                    <p className="text-[10px] font-bold text-neutral-900">{s.title}</p>
                    <p className="text-[9px] text-neutral-800 leading-relaxed">{s.desc}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`${shades[i]} flex items-center px-0.5`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70 shrink-0"><path d="M9 18l6-6-6-6"/></svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Links */}
        <div className="px-4 py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-neutral-700">{language === "en" ? "Fill in the Pick Up Form" : "Isi Form Pick Up"}</p>
            <button type="button" onClick={() => router.push("/pickup-service/form")} className="text-[11px] font-normal text-neutral-900 bg-white rounded-[8px] px-4 py-1.5" style={{boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"}}>
              {language === "en" ? "here" : "di sini"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-neutral-400">{language === "en" ? "Full information" : "Cek info lengkap"}</p>
            <button type="button" disabled className="text-[11px] font-normal text-neutral-400 bg-neutral-100 rounded-[8px] px-4 py-1.5 cursor-not-allowed">
              {language === "en" ? "here" : "di sini"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-neutral-700">{language === "en" ? "Check monotaro.id warehouse locations" : "Cek lokasi gudang monotaro.id"}</p>
            <button type="button" onClick={() => router.push("/pickup-service/lokasi")} className="text-[11px] font-normal text-neutral-900 bg-white rounded-[8px] px-4 py-1.5" style={{boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"}}>
              {language === "en" ? "here" : "di sini"}
            </button>
          </div>
          <p className="text-[11px] text-neutral-700 leading-relaxed">
            {language === "en"
              ? <>If you have difficulties placing an order or submitting this service, please contact our CS team via email at <span className="text-brand underline">cs@monotaro.id</span></>
              : <>Jika Anda mengalami kesulitan saat melakukan pemesanan dan pengajuan layanan ini silakan hubungi tim CS melalui email ke <span className="text-brand underline">cs@monotaro.id</span></>
            }
          </p>
        </div>
      </div>
    </main>
  );
}
