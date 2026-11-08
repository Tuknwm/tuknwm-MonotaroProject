"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function OnlineQuotationPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const STEPS = language === "en"
    ? [
        { title: "Register or Login", desc: "Don't have an account? Register here." },
        { title: "Find Products", desc: "Find and add products to your Shopping Cart." },
        { title: "Add to Shopping Cart", desc: "Go to your shopping cart. Click Create Quotation." },
        { title: "Move Products to Online Quotation", desc: "Complete shipping address, billing address, then Email Quotation." },
        { title: "Done, Online Quotation Created", desc: "We will send the quotation to your email. Please check your Quotation Request status in your account dashboard." },
      ]
    : [
        { title: "Daftar Akun atau Login", desc: "Belum punya akun silakan daftarkan akun Anda di sini." },
        { title: "Cari Produk", desc: "Temukan dan tambahkan produk ke Keranjang Belanja." },
        { title: "Tambah ke Keranjang Belanja", desc: "Masuk ke keranjang belanja Anda. Klik Buat Surat Penawaran (Quotation)." },
        { title: "Pindahkan Produk ke Online Quotation", desc: "Lengkapi informasi alamat pengiriman, alamat penagihan lalu Email Quotation." },
        { title: "Selesai, Online Quotation Berhasil dibuat", desc: "Kami akan mengirimkan surat penawaran melalui email Anda. Silakan periksa status Permintaan Quotation di dashboard akun Anda." },
      ];

  return (
    <main className="min-h-dvh bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="text-neutral-500 shrink-0" aria-label={t("common.back")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-neutral-900 flex-1">Online Quotation</h1>
      </header>

      <div className="page-content">
        {/* Hero */}
        <div className="px-4 py-5 border-b border-neutral-100">
          <h2 className="text-xl font-extrabold text-neutral-900 mb-3">{language === "en" ? "Online Quotation (Price Offer)" : "Online Quotation (Surat Penawaran)"}</h2>
          <p className="text-xs text-neutral-600 leading-relaxed text-justify">
            {language === "en" ? "An online price quotation that customers can download directly from the shopping cart page, making it faster, easier, and available anytime." : "Surat Penawaran yang bisa didapatkan secara online oleh pelanggan dengan cara mengunduh sendiri pada halaman keranjang belanja sehingga lebih cepat, mudah, dan dapat tersedia kapan saja saat dibutuhkan."}
          </p>
        </div>

        {/* 3 Keuntungan */}
        <div className="mx-4 my-4 rounded-[12px] border border-neutral-200 bg-neutral-50 p-4">
          <h3 className="text-sm font-bold text-neutral-900 text-center mb-5">{language === "en" ? "3 Benefits of Using Online Quotation" : "3 Keuntungan Menggunakan Online Quotation"}</h3>
          <div className="flex flex-col gap-4">
            {[
              {
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6l-6-4-6 4v5c0 5 6 9 6 9s6-4 6-9Z"/><path d="m9 12 2 2 4-4"/></svg>,
                text: language === "en" ? "Customers can get a quotation online quickly, easily, and anytime with just 1 click and the quotation is sent to your email." : "Pelanggan bisa mendapatkan quotation secara online dengan cepat, mudah, dan dapat tersedia kapan saja saat dibutuhkan, cukup dengan 1 klik dan quotation tersedia di email Anda.",
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="M9 12h6M9 16h4"/><path d="M9 8h1"/></svg>,
                text: language === "en" ? "Simplifies the company's internal approval process." : "Memudahkan proses approval internal perusahaan pelanggan.",
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>,
                text: language === "en" ? "Product prices on the quotation are valid for 30 days from the date the quotation is created." : "Harga produk yang tercantum pada quotation berlaku selama 30 hari sejak quotation dibuat.",
              },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="shrink-0">{b.icon}</div>
                <p className="text-[10px] text-neutral-600 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Langkah */}
        <div className="mx-4 mb-4 rounded-[12px] border border-neutral-200 bg-neutral-50 p-4">
          <h3 className="text-sm font-bold text-neutral-900 mb-4">{language === "en" ? "5 Easy Steps to Get Online Quotation" : "5 Langkah Mudah Mendapatkan Online Quotation"}</h3>

          {/* Step image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/OnlineQuotation/5 Langkah Mudah-${activeStep + 1}.avif`}
            alt={`Panduan langkah ${activeStep + 1}`}
            className="w-full rounded-[8px] mb-2"
          />
          <p className="text-[10px] text-brand mb-4">{language === "en" ? "Click a number to see the step guide image" : "Klik pada nomor untuk melihat panduan gambar"}</p>

          {/* Steps list */}
          <div className="flex flex-col gap-3">
            {STEPS.map((s, i) => (
              <button key={i} type="button" onClick={() => setActiveStep(i)} className="flex items-start gap-3 text-left">
                <span className={`shrink-0 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center ${activeStep === i ? "bg-brand text-white" : "bg-neutral-200 text-neutral-600"}`}>{i + 1}</span>
                <div>
                  <p className="text-[11px] font-bold text-neutral-900">{s.title}</p>
                  <p className="text-[10px] text-neutral-600 leading-relaxed">{s.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Contoh Online Quotation */}
        <div className="mx-4 mb-4">
          <h3 className="text-sm font-bold text-neutral-900 text-center mb-3">{language === "en" ? "Online Quotation Example" : "Contoh Online Quotation"}</h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/OnlineQuotation/ContohOnlineQuotation1.avif" alt="Contoh Online Quotation 1" className="w-full rounded-[8px] mb-2" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/OnlineQuotation/ContohOnlineQuotation2.avif" alt="Contoh Online Quotation 2" className="w-full rounded-[8px] mb-4" />
          <button type="button" className="w-full bg-brand text-white text-xs font-bold py-3 rounded-[8px]">
            {language === "en" ? "Download PDF Example Quotation" : "Download PDF Contoh Surat Penawaran (Online Quotation)"}
          </button>
        </div>

        {/* Catatan */}
        <div className="mx-4 mb-6 rounded-[8px] bg-yellow-50 border border-yellow-200 p-4">
          <h4 className="text-sm font-bold text-neutral-900 mb-2">{language === "en" ? "Note" : "Catatan"}</h4>
          <p className="text-[11px] text-neutral-700 leading-relaxed text-justify">
            {language === "en" ? (
              <>Products that are out of stock cannot be added to Online Quotation. Please contact our CS via email{" "}<span className="text-brand underline">cs@monotaro.id</span>{" "}for products available on the website, or please{" "}<span className="text-brand font-semibold underline">Request Offline Quotation here</span></>
            ) : (
              <>Produk yang tidak memiliki stok, tidak dapat dimasukkan ke dalam Online Quotation. Silahkan hubungi CS kami melalui email{" "}<span className="text-brand underline">cs@monotaro.id</span>{" "}untuk produk yang memiliki stock di website atau silahkan{" "}<span className="text-brand font-semibold underline">Request Offline Quotation di sini</span></>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
