"use client";

import { useRouter } from "next/navigation";
import { FOOTER_LINKS, PAYMENTS, SHIPPING, SUPPORT } from "../data";
import { useLanguage } from "@/context/LanguageContext";

const SUPPORT_ICON_PATHS = [
  "M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z",
  "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm7 14h.01M8 6h8",
  "M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 3V6a2 2 0 0 1 2-2Z",
  "M21 11.5a8.4 8.4 0 0 1-9 8.5 9.3 9.3 0 0 1-4-.9L3 20l1.1-3.5A8.1 8.1 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z",
  "M12 6v6l4 2M12 3a9 9 0 1 0 9 9",
];

export default function FaqPage() {
  const router = useRouter();
  const { language, t } = useLanguage();

  function backToAccount() {
    sessionStorage.setItem("open_account", "1");
    router.push("/");
  }

  const isEn = language === "en";

  return (
    <main className="min-h-dvh bg-neutral-50">
      <header className="relative flex items-center border-b border-neutral-200 bg-white px-4 py-3">
        <button type="button" aria-label={t("common.back")} onClick={backToAccount} className="text-neutral-500">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Logo.png" alt="monotaro.id" className="absolute left-1/2 top-1/2 h-7 w-auto -translate-x-1/2 -translate-y-1/2 object-contain" />
      </header>

      <div className="flex flex-col gap-5 px-4 py-5">
        <section>
          <h1 className="text-xl font-extrabold tracking-tight text-neutral-900">{t("faq.title")}</h1>
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">{t("faq.subtitle")}</p>
        </section>

        <section className="rounded-[10px] bg-white px-4 py-4">
          <h2 className="text-sm font-bold text-neutral-900">
            {isEn
              ? "Business Procurement: Industrial Tools & Office Supplies Online"
              : "Belanja Kebutuhan Bisnis: Perkakas Industri & Alat Tulis Kantor secara Online"}
          </h2>
          <div className="mt-3 space-y-3 text-[11px] leading-relaxed text-neutral-600">
            {isEn ? (
              <>
                <p>monotaro.id is a B2B (Business to Business) eCommerce providing various business procurement needs, from MRO (Maintenance, Repair and Operation) products for manufacturing plants and assembly, work safety equipment, hand & power tools, lab supply, automotive supplies, mechanical components, fasteners, bearings, welding machines, abrasives, measuring tools, chemicals, laboratory tools, electrical tools, packaging & logistics, office supplies, HVAC & piping, building materials, cleaning equipment, to kitchen and pantry essentials.</p>
                <p>Across these 16 categories, there are over 3,000,000+ SKUs from 13,000+ brands and 150,000+ Ready Stock expanding daily. By shopping for industrial and office supplies online at monotaro.id, businesses can save time and costs, expedite transaction processes, increase transparency, and procure anytime anywhere.</p>
                <p>Business Account customers can leverage features including Online Approval System for purchase workflows, Multiple Logins for department PICs, and Product-level Discounts during checkout.</p>
                <p>To support corporate accounting and tax compliance, monotaro.id issues official Invoices and Tax Invoices (Faktur Pajak), along with instant Online Quotations.</p>
                <p>Flexible payment terms including Terms of Payment (TOP), COD, Bank Virtual Accounts, Credit Cards, and e-Wallets are fully supported.</p>
              </>
            ) : (
              <>
                <p>monotaro.id merupakan e-Commerce B2B (Business to Business) yang menyediakan berbagai kebutuhan bisnis, mulai dari produk-produk MRO (Maintenance, Repair and Operation) untuk pabrik manufaktur dan perakitan, alat keselamatan kerja, perkakas tangan dan listrik, lab supply, kebutuhan otomotif, komponen mekanikal, fastener, bearing, mesin las, ampelas dan gerinda, alat ukur, bahan kimia, alat laboratorium, alat kelistrikan, pengepakan dan logistik, perlengkapan kantor, alat tulis kantor, AC dan pipa, bahan bangunan, peralatan kebersihan, hingga kebutuhan dapur dan pantry.</p>
                <p>Di dalam 16 kategori produk ini terdapat lebih dari 3.000.000+ SKU dari 13.000+ brand dan 150.000+ Ready Stock yang terus berkembang setiap harinya. Dengan berbelanja kebutuhan industri dan kantor secara online di monotaro.id, perusahaan dapat menghemat waktu dan biaya, mempercepat proses transaksi, meningkatkan transparansi, serta berbelanja kapan saja tanpa terikat waktu dan tempat.</p>
                <p>Di monotaro.id, pelanggan tipe Akun Bisnis dapat menemukan berbagai fitur yang membantu perusahaan berbelanja sambil tetap menjalankan prosedur dan proses birokrasi internalnya. Fitur tersebut meliputi Online Approval System untuk persetujuan transaksi antara staf dan atasan, Multiple Login untuk beberapa PIC di setiap departemen, serta Diskon per Produk yang membantu perusahaan memilih penerapan diskon total atau diskon pada masing-masing produk saat checkout.</p>
                <p>Setiap belanja perusahaan berkaitan dengan pajak yang harus dicatat atau dibayarkan. Karena itu, monotaro.id menyediakan penerbitan Invoice dan Faktur Pajak, serta Online Quotation agar kebutuhan administrasi pelanggan bisnis terpenuhi.</p>
                <p>Pembayaran Tempo (TOP/Terms of Payment) merupakan metode pembayaran yang banyak digunakan perusahaan karena membantu menjaga pengelolaan cashflow. Selain Pembayaran Tempo, tersedia juga COD (Cash on Delivery), Transfer Bank atau Virtual Account, Kartu Kredit, dan e-Wallet seperti GoPay.</p>
              </>
            )}
          </div>
          <h2 className="mt-5 text-sm font-bold text-neutral-900">{isEn ? "Vision" : "Visi"}</h2>
          <p className="mt-2 text-[11px] leading-relaxed text-neutral-600">
            {isEn
              ? "To continuously innovate the Procurement Network for all business sectors in Indonesia."
              : "Melakukan inovasi yang berkesinambungan dalam hal Procurement Network bagi semua bidang usaha di Indonesia."}
          </p>
          <h2 className="mt-4 text-sm font-bold text-neutral-900">{isEn ? "Mission" : "Misi"}</h2>
          <p className="mt-2 text-[11px] leading-relaxed text-neutral-600">
            {isEn
              ? "To become the leading One-Stop-Solution Procurement Platform providing effective and efficient purchasing processes for all businesses across Indonesia."
              : "Menjadi One-Stop-Solution Procurement Platform yang terbaik dan menyediakan proses pembelian yang efektif dan efisien bagi semua pelaku usaha di Indonesia."}
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-bold text-neutral-900">{t("faq.faq_section")}</h2>
          {(isEn
            ? [
                ["What is a business account?", "A business account helps companies manage procurement, quotation requests, tax invoices, and department PIC access."],
                ["How do I get customer assistance?", "Contact our Customer Support via the phone number or email listed at the bottom of the page."],
                ["Is nationwide shipping available across Indonesia?", "Shipping coverage and options follow your delivery address and product availability during checkout."],
              ]
            : [
                ["Apa itu akun bisnis?", "Akun bisnis membantu perusahaan mengatur pembelian, quotation, faktur pajak, dan akses PIC."],
                ["Bagaimana cara mendapatkan bantuan?", "Hubungi Customer Support melalui nomor telepon atau email yang tercantum di bagian bawah halaman."],
                ["Apakah tersedia pengiriman ke seluruh Indonesia?", "Pilihan pengiriman mengikuti alamat dan ketersediaan produk saat checkout."],
              ]
          ).map(([question, answer]) => (
            <details key={question} className="group border-b border-neutral-200 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-neutral-800">{question}<svg className="h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg></summary>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">{answer}</p>
            </details>
          ))}
        </section>

        <footer className="-mx-4 mt-2 bg-white">
          <div className="divide-y divide-neutral-100 px-4">
            {FOOTER_LINKS.map((s) => (
              <div key={s.title} className="py-3">
                <p className="text-sm font-bold text-neutral-800">{s.title}</p>
                <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">{s.links.map((l) => <li key={l} className="text-[11px] text-neutral-600">{l}</li>)}</ul>
              </div>
            ))}
            <div className="py-3"><p className="mb-3 text-sm font-bold text-neutral-800">Customer Support</p><div className="grid grid-cols-2 gap-3">{SUPPORT.map((s, i) => <div key={s.text} className="flex min-w-0 items-center gap-2 text-[11px] text-neutral-700"><svg className="h-5 w-5 shrink-0 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={SUPPORT_ICON_PATHS[i]} /></svg><span className="min-w-0 break-words">{s.text}</span></div>)}</div></div>
            <div className="py-3"><p className="mb-2 text-sm font-bold text-neutral-800">{t("faq.payment_methods")}</p><div className="flex flex-wrap gap-1.5">{PAYMENTS.map((p) => <span key={p} className="rounded-md border border-neutral-200 px-2 py-1 text-[10px] font-bold text-neutral-700">{p}</span>)}</div></div>
            <div className="py-3"><p className="mb-2 text-sm font-bold text-neutral-800">{t("faq.shipping")}</p><div className="flex flex-wrap gap-1.5">{SHIPPING.map((s) => <span key={s} className="rounded-md border border-neutral-200 px-2 py-1 text-[10px] font-bold text-neutral-700">{s}</span>)}</div></div>
            <div className="py-4"><p className="mb-2 text-xs font-bold text-neutral-800">{t("faq.newsletter_label")}</p><div className="flex"><input type="email" placeholder="email@company.com" className="min-w-0 flex-1 rounded-l-md border border-neutral-300 px-3 py-2 text-xs outline-none focus:border-brand" /><button className="rounded-r-md bg-brand px-4 text-xs font-bold text-white">{t("faq.subscribe")}</button></div></div>
          </div>
          <p className="border-t border-neutral-100 py-4 text-center text-[10px] text-neutral-500">{t("common.copyright")}</p>
        </footer>
      </div>
    </main>
  );
}
