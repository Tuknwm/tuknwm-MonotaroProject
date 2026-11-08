"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const TESTIMONIALS = [
  ["Oktober 2026", "manufaktur (Jawa Timur)", "Sulivan Sulivan - Purchasing", "Saya puas berbelanja di Monotaro. Produk yang tersedia cukup lengkap, mulai dari kebutuhan industri, peralatan kerja, hingga perlengkapan operasional perusahaan. Proses pemesanan mudah dan informasi produk jelas."],
  ["November 2026", "Otomotif (Jakarta)", "Amelia Andika Putri - Purchasing", "Terima kasih sudah bekerja sama dengan kami selama kurang lebih 5 tahun sebagai vendor General. Monotaro memberikan respons cepat untuk pengiriman barang dan penanganan komplain."],
  ["November 2026", "Distributor Buah Segar (Tangerang)", "Fictor Tambupolon - Purchasing", "Saya merasa sangat puas berbelanja di Monotaro ID. Beragam jenis produk yang saya butuhkan tersedia dengan pilihan lengkap dan harga yang kompetitif."],
  ["November 2026", "Fabrikasi (Cilegon)", "Fitri Alfiana - Procurement", "Memudahkan pekerjaan karena bisa membuat quotation sendiri dan memudahkan memilih jenis barang karena ada detail kualifikasinya."],
  ["Oktober 2026", "Perdagangan (Jakarta)", "Danis Arisanti - Direktur", "Pembelian mudah untuk B2B, bisa payment tempo. Pilihan produk beragam dan proses pemesanan praktis."],
  ["Oktober 2026", "Logistik (Gresik)", "Khodir Safii - Procurement", "Barang yang kami pesan tepat spesifikasinya. Kami berharap waktu pelayanan bisa lebih cepat dari biasanya."],
  ["Oktober 2026", "Obat Tradisional (Karawang)", "Beny Dwi Hatmoko - QA", "Selama belanja di Monotaro, saya merasa terbantu karena pilihan barangnya lengkap dan beragam sehingga mudah mencari kebutuhan dalam satu tempat."],
  ["Oktober 2026", "Jasa Perdagangan Umum (Bekasi)", "Rendi Indra Komara - Purchasing", "Sangat membantu purchasing dalam mencari kebutuhan pengadaan barang. Harga sangat kompetitif dan lengkap."],
  ["September 2026", "Farmasi (Kab. Bekasi)", "Samuel Tambupolon - Procurement", "Belanja di Monotaro cukup praktis karena bisa cek harga dan ketersediaan produk secara real time serta menarik penawaran harga."],
];

export default function TestimonialPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <main className="min-h-dvh bg-neutral-50 pb-8">
      <header className="sticky top-0 z-20 flex items-center gap-3 bg-brand px-4 py-4 text-white shadow-md">
        <button type="button" onClick={() => router.back()} aria-label="Kembali"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button>
        <h1 className="text-sm font-bold">Testimonial</h1>
      </header>
      <section className="px-3 py-5">
        <h2 className="mb-4 text-center text-lg font-bold text-neutral-700">{t("testimonial.customers_say")}</h2>
        <div className="grid gap-3">
          {TESTIMONIALS.map(([date, industry, name, body]) => (
            <article key={name} className="rounded-[8px] border border-neutral-300 bg-white p-4">
              <div className="mb-2 flex items-start justify-between gap-3 text-[10px] font-bold text-neutral-800"><span>{date}</span><span className="text-right">{industry}</span></div>
              <p className="mb-2 text-xs text-neutral-700 underline underline-offset-2">{name}</p>
              <p className="text-xs leading-relaxed text-neutral-700">{body}</p>
            </article>
          ))}
        </div>
        <button type="button" className="mt-5 w-full rounded-[8px] border border-neutral-300 bg-white py-3 text-xs font-semibold text-neutral-600">{t("testimonial.show_more")}</button>
      </section>
    </main>
  );
}
