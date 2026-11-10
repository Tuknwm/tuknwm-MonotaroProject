"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const LOCATIONS = [
  {
    label: "Head Office",
    address: "PT MONOTARO INDONESIA\nWISMA KEIAI Lantai 18,\nJl. Jenderal Sudirman No.Kav. 3, RT.10/RW.11,\nKaret Tengsin, Kecamatan Tanah Abang,\nKota Jakarta Pusat, DKI Jakarta 10250",
    embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3426!2d106.8172!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sWisma%20KEIAI!5e0!3m2!1sid!2sid!4v1699999999999",
  },
  {
    label: "Warehouse Cikarang",
    address: "Jl. Serui Blok AE3, Kawasan Industri MM2100,\nDesa Jatiwangi, Kec. Cikarang Barat,\nBekasi, 17530, Jawa Barat",
    embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d107.1897!3d-6.3521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b8c5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sKawasan%20Industri%20MM2100%20Cikarang%20Barat!5e0!3m2!1sid!2sid!4v1699999999999",
  },
  {
    label: "Warehouse Jakarta",
    address: "Pergudangan Prima Center 1\nBlok F-1 Jl. Pool PPD Kedaung Kali Angke\nCengkareng, Jakarta Barat 11710",
    embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5!2d106.7319!3d-6.1456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f7a0a0a0a0a0%3A0xa0a0a0a0a0a0a0a0!2sPergudangan%20Prima%20Center%20Cengkareng!5e0!3m2!1sid!2sid!4v1699999999999",
  },
  {
    label: "Warehouse Surabaya (Jawa Timur)",
    address: "Fortune Business & Industrial Park Blok C67\nJl. Tambak Sawah No. 4, Tambakrejo, Kec. Waru,\nKab. Sidoarjo, Jawa Timur 61256",
    embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.0!2d112.7508!3d-7.3697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381b2e01%3A0x7c3c6c6c6c6c6c6c!2sFortune%20Business%20%26%20Industrial%20Park%20Waru%20Sidoarjo!5e0!3m2!1sid!2sid!4v1699999999999",
  },
];

export default function HubungiKamiPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const SERVICES = [
    {
      title: language === "en" ? "Sales Consultant" : "Konsultan Penjualan",
      body: language === "en"
        ? <>Serving your needs across all product categories, including product specifications and alternatives. Please contact our Customer Support &amp; Product Advisor team at <strong>0855 7467 8400</strong> or email <a href="mailto:cs@monotaro.id" className="text-brand font-semibold">cs@monotaro.id</a></>
        : <>Melayani kebutuhan Anda untuk seluruh kategori produk, mencakup detail spesifikasi produk maupun produk alternatif. Silakan hubungi Tim Customer Support &amp; Product Advisor kami di nomor <strong>0855 7467 8400</strong> atau email ke <a href="mailto:cs@monotaro.id" className="text-brand font-semibold">cs@monotaro.id</a></>,
    },
    {
      title: language === "en" ? "Warranty Claim Service" : "Layanan Klaim Garansi",
      body: language === "en"
        ? <>For technical support and product warranty claims, please visit the Product Warranty help center <span className="text-brand font-semibold">here</span> or contact our customer support at <strong>021 3110 6990 / 0855 7467 8400</strong> or email <a href="mailto:cs@monotaro.id" className="text-brand font-semibold">cs@monotaro.id</a></>
        : <>Untuk bantuan teknis dan klaim garansi produk, silakan mengunjungi pusat bantuan Garansi Produk <span className="text-brand font-semibold">di sini</span> atau hubungi customer support kami di nomor <strong>021 3110 6990 / 0855 7467 8400</strong> atau email ke <a href="mailto:cs@monotaro.id" className="text-brand font-semibold">cs@monotaro.id</a></>,
    },
    {
      title: language === "en" ? "Returns & Refund Service" : "Layanan Pengembalian Barang & Refund",
      body: language === "en"
        ? <>If the product received is wrong/defective/damaged and you want a refund, please file a report by visiting the Returns help center <span className="text-brand font-semibold">here</span> or contact our customer support at <strong>021 3110 6990 / 0855 7467 8400</strong> or email <a href="mailto:cs@monotaro.id" className="text-brand font-semibold">cs@monotaro.id</a>.</>
        : <>Jika produk yang diterima salah/cacat/rusak dan ingin melakukan pengembalian dana, silakan membuat laporan dengan mengunjungi pusat bantuan Pengembalian Barang <span className="text-brand font-semibold">di sini</span> atau hubungi customer support kami di nomor <strong>021 3110 6990 / 0855 7467 8400</strong> atau email ke <a href="mailto:cs@monotaro.id" className="text-brand font-semibold">cs@monotaro.id</a>.</>,
    },
    {
      title: language === "en" ? "Customer Service" : "Layanan Pelanggan",
      body: language === "en"
        ? <>Please provide feedback on our service. Submit your suggestions via the form <span className="text-brand font-semibold">here</span> or contact our customer support at <strong>021 3110 6990 / 0855 7467 8400</strong> or email <a href="mailto:cs@monotaro.id" className="text-brand font-semibold">cs@monotaro.id</a>.</>
        : <>Silakan berikan feedback atas pelayanan kami. Tuliskan masukan Anda melalui form <span className="text-brand font-semibold">di sini</span> atau hubungi customer support kami di nomor <strong>021 3110 6990 / 0855 7467 8400</strong> atau email ke <a href="mailto:cs@monotaro.id" className="text-brand font-semibold">cs@monotaro.id</a>.</>,
    },
    {
      title: language === "en" ? "Consumer Complaint Service" : "Layanan Pengaduan Konsumen",
      body: language === "en"
        ? <>For consumer complaint assistance, please contact us at 021 3110 6990 / 0855 7467 8400 or email <a href="mailto:cs@monotaro.id" className="text-brand font-semibold">cs@monotaro.id</a> and/or the Directorate General of Consumer Protection and Trade Compliance, Ministry of Trade of the Republic of Indonesia at WhatsApp <strong>0853 1111 1010</strong></>
        : <>Untuk bantuan layanan pengaduan konsumen, silakan hubungi kami di nomor 021 3110 6990 / 0855 7467 8400 atau email ke <a href="mailto:cs@monotaro.id" className="text-brand font-semibold">cs@monotaro.id</a> dan/atau ke Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga Kementerian Perdagangan Republik Indonesia di nomor Whatsapp <strong>0853 1111 1010</strong></>,
    },
    {
      title: language === "en" ? "Delivery Status" : "Status Pengiriman",
      body: language === "en"
        ? <>For assistance tracking order and delivery status, please contact our customer support at <strong>021 3110 6990 / 0855 7467 8400</strong> or email <a href="mailto:cs@monotaro.id" className="text-brand font-semibold">cs@monotaro.id</a>.</>
        : <>Untuk bantuan pelacakan status pesanan dan status pengiriman, silakan hubungi customer support kami di nomor <strong>021 3110 6990 / 0855 7467 8400</strong> atau email ke <a href="mailto:cs@monotaro.id" className="text-brand font-semibold">cs@monotaro.id</a>.</>,
    },
  ];

  return (
    <main className="min-h-dvh bg-neutral-50 pb-8 pt-[64px]">
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 rounded-b-3xl bg-brand px-4 py-4 text-white shadow-md">
        <button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-[15px] font-bold text-white">{t("account.contact_us")}</h1>
      </header>

      <div className="mx-3 mt-3 space-y-3">
        {/* Contact section */}
        <div className="rounded-[10px] bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-100">
            <h2 className="text-sm font-bold text-neutral-900">{t("account.contact_us")}</h2>
          </div>
          <div className="divide-y divide-neutral-100">
            {SERVICES.map((s) => (
              <div key={s.title} className="px-4 py-3">
                <p className="text-xs font-bold text-neutral-900 mb-1">{s.title}</p>
                <p className="text-xs leading-relaxed text-neutral-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Information section */}
        <div className="rounded-[10px] bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-100">
            <h2 className="text-sm font-bold text-neutral-900">
              {language === "en" ? "Company Information" : "Informasi Perusahaan"}
            </h2>
          </div>
          <div className="divide-y divide-neutral-100">
            {LOCATIONS.map((loc) => (
              <div key={loc.label} className="flex flex-col">
                <iframe
                  src={loc.embed}
                  className="w-full h-44 border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={loc.label}
                />
                <div className="px-4 py-3">
                  <p className="text-xs font-bold text-brand mb-1">{loc.label}</p>
                  <p className="text-xs leading-relaxed text-neutral-600 whitespace-pre-line">{loc.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
