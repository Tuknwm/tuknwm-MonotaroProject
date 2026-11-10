"use client";

import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const CATEGORY_ICONS = [
  <svg key="akun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  <svg key="produk" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/></svg>,
  <svg key="quotation" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>,
  <svg key="payment" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  <svg key="pesanan" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  <svg key="invoice" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="11" y2="17"/></svg>,
  <svg key="return" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>,
  <svg key="promo" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
];

export default function BantuanPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const en = language === "en";

  const TOPIC_BUTTONS = [
    { label: en ? "How to Create a Quotation" : "Cara membuat Quotation", highlight: true },
    { label: en ? "Term of Payment" : "Pembayaran Tempo / Termin", highlight: true },
    { label: en ? "How to Get Invoice & Tax Invoice" : "Cara mendapatkan Invoice & Faktur Pajak", highlight: true },
    { label: en ? "How to Check Shipping Status" : "Cara Cek Status Pengiriman", highlight: true },
    { label: en ? "What is Goods Preparation Period" : "Apa yang dimaksud Masa Persiapan Barang" },
    { label: en ? "Price Validity on Quotation" : "Masa Berlaku Harga pada Quotation" },
    { label: en ? "Product Delivery Time" : "Waktu Pengiriman Produk" },
    { label: en ? "Partial Shipment Request" : "Permintaan Pengiriman Sebagian" },
    { label: en ? "Payment Method" : "Metode Pembayaran" },
    { label: en ? "Shipping Cost" : "Biaya Pengiriman Produk" },
    { label: en ? "How to Return a Product" : "Cara Return Produk" },
    { label: en ? "How to Refund an Order" : "Cara Refund Pesanan" },
    { label: en ? "Product Stock at monotaro.id" : "Stock Produk di monotaro.id" },
    { label: en ? "Categories & Product Types at monotaro.id" : "Kategori & Jenis Produk di monotaro.id" },
    { label: en ? "I Cannot Select COD Payment" : "Saya Tidak Dapat Memilih Pembayaran COD" },
    { label: en ? "How to Become a Supplier at monotaro.id" : "Cara menjadi Supplier di monotaro.id" },
  ];

  const FAQS = [
    {
      title: en ? "Benefits of shopping with a Business account" : "Keuntungan belanja menggunakan akun Bisnis",
      preview: en
        ? "At monotaro.id, there are 2 types of accounts you can choose from: Individual and Business. You can register an Individual account if your purchases are only for personal use..."
        : "Di monotaro.id, tersedia 2 jenis akun yang dapat Anda pilih, yaitu akun Individu dan akun Bisnis. Anda dapat melakukan pendaftaran akun Individu apabila pembelanjaan Anda hanya digunakan untuk ke...",
    },
    {
      title: en ? "Introducing AI Product Advisor" : "Mengenal AI Product Advisor",
      preview: en
        ? "Monotaro.id continues to innovate its services through Artificial Intelligence (AI) technology to help customers find and meet their company's operational needs..."
        : "Monotaro.id terus berinovasi mengembangkan layanan melalui dukungan teknologi Artificial Intelligence (AI) untuk bisa memudahkan para pelanggan dalam mencari dan memenuhi kebutuhan operational peru...",
    },
    {
      title: en ? "What is the Goods Preparation Period?" : "Apa yang dimaksud dengan Masa Persiapan Barang?",
      preview: en
        ? "The Goods Preparation Period or lead time is the time required for procurement until the goods are ready in the monotaro.id warehouse (excluding delivery estimate to customer)..."
        : "Masa persiapan barang atau lead time adalah waktu yang diperlukan untuk proses pengadaan barang hingga barang ready di gudang monotaro.id (belum termasuk estimasi pengiriman ke pelanggan). Anda dap...",
    },
    {
      title: en ? "Can I get product certificates MSDS, TDS, COC, COO?" : "Apakah saya bisa mendapatkan sertifikat produk MSDS, TDS, COC, COO?",
      preview: en
        ? "We understand that in fulfilling products for your company's needs, you need to be selective in choosing products regarding material, safety, and origin so as not to violate regulations..."
        : "Kami menyadari bahwa dalam pemenuhan produk untuk kebutuhan perusahaan Anda, tentunya perlu selektif dalam pemilihan produk, baik material, safety, maupun origin produk tersebut agar tidak melangga...",
    },
    {
      title: en ? "How to Get a Quotation (Price Offer Letter)" : "Cara Mendapatkan Quotation (Surat Penawaran Harga)",
      preview: en
        ? "You can easily get a Price Offer Letter in 2 ways: Online (through monotaro.id website) or Offline (through our CS team). Online Quotation can be obtained..."
        : "Surat Penawaran Harga bisa Anda dapatkan dengan mudah melalui 2 cara, yaitu secara Online (melalui web monotaro.id) maupun secara Offline (melalui tim CS kami). Online Quotation Quotation bisa did...",
    },
    {
      title: en ? "Applying for Term of Payment" : "Pengajuan Pembayaran Tempo/Termin",
      preview: en
        ? "What is Term of Payment? Term of Payment is a time-based payment method available only to Business account customers, where you can make payments..."
        : "Apa itu Pembayaran Tempo/Termin?Pembayaran tempo atau pembayaran termin adalah metode pembayaran berjangka yang dapat dinikmati hanya oleh pelanggan dengan akun Bisnis, dimana Anda dapat melakukan ...",
    },
    {
      title: en ? "How to get the Term of Payment service?" : "Bagaimana proses untuk mendapatkan layanan Pembayaran Tempo/Termin?",
      preview: en
        ? "You can apply for Term of Payment by: Download and fill in the Term of Payment Registration Form. Complete and submit the required documents in the Application Form..."
        : "Anda dapat mengajukan metode Pembayaran Tempo/Termin dengan cara: Download dan isi Formulir Pendaftaran Pembayaran Tempo/Termin Lengkapi dan submit dokumen yang dibutuhkan pada Formulir Pengajuan...",
    },
    {
      title: en ? "How to Change Shipping Preference or Request Partial Shipment?" : "Cara Mengubah Preferensi Pengiriman atau Request Pengiriman Parsial?",
      preview: en
        ? "Shipping Preference is a delivery option that depends on the availability of items in the order. Monotaro.id provides 2 types of Shipping Preferences: full shipment and partial shipment..."
        : "Preferensi Pengiriman merupakan pilihan pengiriman yang bergantung pada ketersediaan barang dalam pesanan. Di monotaro.id menyediakan 2 jenis Preferensi Pengiriman, yaitu pengiriman lengkap (full s...",
    },
    {
      title: en ? "How long does it take for my order to arrive?" : "Berapa lama pengiriman pesanan sampai ke alamat saya?",
      preview: en
        ? "Delivery estimate depends on each shipping area. Here are the estimated delivery times by region in Indonesia: Delivery Area Estimate Jabodetabek & Karawang..."
        : "Estimasi pengiriman tergantung pada masing-masing wilayah pengiriman. Berikut adalah estimasi waktu pengiriman berdasarkan wilayah di Indonesia: Delivery Area Estimasi Jabodetabek & Karawa...",
    },
    {
      title: en ? "What is the shipping cost to my address?" : "Berapa biaya pengiriman (ongkos kirim) ke alamat saya?",
      preview: en
        ? "We currently offer FREE SHIPPING PROMO to all areas of Java, Bali, Sumatra, Kalimantan & Sulawesi with the following conditions: Area Minimum Purchase Jabodetabek, Banten, J..."
        : "Saat ini kami memberikan PROMO GRATIS ONGKIR ke seluruh wilayah Pulau Jawa, Bali, Sumatera, Kalimantan & Sulawesi dengan kondisi sebagai berikut: Area Minimum Pembelanjaan Jabodetabek, Banten, J...",
    },
    {
      title: en ? "Purchase contract request for periodic needs (Blanket PO/Blanket Order)" : "Permintaan kontrak pembelian barang untuk kebutuhan berkala (Blanket PO/Blanket Order)",
      preview: en
        ? "Monotaro.id opens opportunities to build long-term cooperation with our loyal customers. We understand that various products are quite volatile in maintaining stock pr..."
        : "Monotaro.id membuka kesempatan untuk membangun hubungan kerja sama secara jangka panjang dengan para pelanggan setia kami. Kami menyadari bahwa beragam produk cukup fluktuatif untuk menjaga stok pr...",
    },
    {
      title: en ? "Purchase contract request with Fixed Price" : "Permintaan kontrak pembelian barang dengan Harga tetap (Fixed Price)",
      preview: en
        ? "Monotaro.id opens opportunities to build long-term cooperation with our loyal customers. We understand that various products are quite volatile in price increases and..."
        : "Monotaro.id membuka kesempatan untuk membangun hubungan kerja sama secara jangka panjang dengan para pelanggan setia kami. Kami menyadari bahwa beragam produk cukup fluktuatif tingkat kenaikan dan ...",
    },
    {
      title: en ? "Can monotaro.id issue invoice and tax invoice for my order?" : "Apakah monotaro.id dapat menerbitkan invoice dan faktur pajak untuk pesanan saya?",
      preview: en
        ? "Invoice and Tax Invoice will be issued and sent via your registered email. If you need Invoice & Tax Invoice documents in hard copy, please inform us..."
        : "Invoice dan Faktur Pajak akan kami terbitkan dan kirimkan melalui email yang terdaftar. Apabila Anda membutuhkan dokumen Invoice & Faktur pajak dalam hard copy silahkan menginformasikan kepada kami...",
    },
    {
      title: en ? "How to Submit a Return or Product Exchange" : "Cara Mengajukan Retur atau Pengembalian Barang",
      preview: en
        ? "Can All Purchased Products Be Returned? You can submit a return for products purchased at monotaro.id with acceptable reasons: The received product has defects..."
        : "Apakah Semua Produk yang Dibeli Dapat Dikembalikan? Anda dapat mengajukan pengembalian barang yang dibeli di monotaro.id dengan alasan yang dapat diterima yaitu: Produk yang diterima terdapat caca...",
    },
    {
      title: en ? "How to Get Free Catalog, Flyer and Private Brand Product Sample" : "Cara Mendapatkan buku Katalog, Flyer dan Sample Produk Private Brand monotaro.id (Gratis)",
      preview: en
        ? "For those registered as a Business account and operating as a PT (Limited Liability Company), you can request a free catalog, Flyer, and Private Brand product samples as well as free..."
        : "Untuk Anda terdaftar sebagai akun Bisnis dan berbadan usaha sebagai PT (Perseroan Terbatas), Anda dapat mengajukan permintaan buku katalog, Flyer, dan sampel produk Private Brand Gratis serta free ...",
    },
  ];

  const CATEGORIES = [
    { label: en ? "Account" : "Akun", desc: en ? "Help with managing your Account and Account Features" : "Bantuan seputar mengelola Akun dan Fitur Akun" },
    { label: en ? "Products at monotaro.id" : "Produk di monotaro.id", desc: en ? "Help with product types, information & overseas product requests" : "Bantuan seputar jenis produk, informasi & permintaan produk luar negeri" },
    { label: "Quotation", desc: en ? "Help with product price offer letters" : "Bantuan seputar surat penawaran harga produk" },
    { label: en ? "Payment Method" : "Metode Pembayaran", desc: en ? "Help with types & payment methods" : "Bantuan seputar jenis & metode pembayaran produk" },
    { label: en ? "Orders" : "Pesanan", desc: en ? "Help with product stock, order status, shipping method & cost, etc." : "Bantuan seputar stok produk, status pemesanan, metode & biaya pengiriman (ongkos kirim) dll." },
    { label: en ? "Invoice & Tax Invoice" : "Invoice & Faktur Pajak", desc: en ? "Help with issuing Invoice & Tax Invoice requests" : "Bantuan seputar penerbitan Invoice & permintaan Faktur Pajak" },
    { label: en ? "Returns, Refunds, & Product Warranty" : "Pengembalian Barang, Dana, & Garansi Produk", desc: en ? "Help with product returns, refunds & warranty claims" : "Bantuan seputar cara pengembalian barang, pengembalian dana & klaim garansi produk", highlight: true },
    { label: en ? "Promo" : "Promo", desc: en ? "Help with becoming a Supplier, product promotions, etc." : "Bantuan seputar cara menjadi Supplier, promo produk dll" },
  ];

  const toggleFaq = (i: number) => setOpenFaqs((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <main className="min-h-dvh bg-white">
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 rounded-b-3xl bg-brand px-4 py-4 text-white shadow-md">
        <button type="button" onClick={() => router.back()} className="text-white shrink-0" aria-label={t("common.back")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-white flex-1">{t("help.title")}</h1>
      </header>

      <div className="page-content pt-[38px]">
        {/* Hero search */}
        <div className="bg-brand px-4 py-6">
          <h2 className="text-base font-bold text-white text-center mb-3">{t("help.welcome")}</h2>
          <div className="flex items-center bg-white rounded-[6px] overflow-hidden shadow">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("help.search_placeholder")}
              className="flex-1 px-3 py-2.5 text-[11px] text-neutral-700 outline-none"
            />
            <button type="button" className="px-3 py-2.5 text-cyan-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          </div>
        </div>

        {/* Topic buttons */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900 text-center mb-3">{t("help.pick_topic")}</h3>
          <div className="grid grid-cols-2 gap-2">
            {TOPIC_BUTTONS.map((btn) => (
              <button
                key={btn.label}
                type="button"
                className={`flex items-center gap-2 px-3 py-2.5 rounded-[6px] border text-left ${
                  btn.highlight
                    ? "bg-brand border-brand text-white"
                    : "bg-white border-neutral-200 text-neutral-700"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                <span className="text-[10px] font-semibold leading-tight">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ section */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900 text-center mb-4">{t("help.frequently_asked")}</h3>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-neutral-200 rounded-[6px] overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-3 bg-neutral-100 text-left"
                >
                  <span className="text-[11px] font-semibold text-neutral-800 leading-snug">{faq.title}</span>
                  <span className="shrink-0 text-neutral-500 text-base font-bold">{openFaqs[i] ? "−" : "+"}</span>
                </button>
                {openFaqs[i] && (
                  <div className="px-3 py-3">
                    <p className="text-[10px] text-neutral-700 leading-relaxed mb-2">{faq.preview}</p>
                    <button type="button" className="bg-brand text-white text-[11px] font-bold px-4 py-2 rounded-[4px]">
                      View More
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 py-4 pb-8">
          <h3 className="text-sm font-bold text-neutral-900 text-center mb-4">{t("help.other_topics")}</h3>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((c, i) => (
              <button key={i} type="button" className="flex items-start gap-2 text-left">
                <div className="w-9 h-9 shrink-0 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
                  {CATEGORY_ICONS[i]}
                </div>
                <div>
                  <p className={`text-[11px] font-bold leading-snug mb-0.5 ${c.highlight ? "text-brand" : "text-brand"}`}>{c.label}</p>
                  <p className="text-[10px] text-neutral-600 leading-relaxed">{c.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
