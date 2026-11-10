"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const PROMOS: [string, string, string, string, string][] = [
  ["mob-cat70-2nov.avif", "Diskon 10% Semua Kategori Kebutuhan Kantor", "Berlaku 2-6 November 2026", "10% Discount All Office Supply Categories", "Valid November 2–6, 2026"],
  ["mob-cat55-2nov.jpg", "Diskon 10% Semua Kategori Alat Laboratorium", "Berlaku 2-6 November 2026", "10% Discount All Laboratory Equipment Categories", "Valid November 2–6, 2026"],
  ["mob-pb-amplop-coklat-21nov.avif", "Amplop Coklat monotaro.id mulai dari Rp16.000/Pack", "Amplop coklat material kertas berkualitas", "monotaro.id Brown Envelopes from Rp16,000/Pack", "Quality paper material brown envelopes"],
  ["mob-sarung-tangan-katun-jul-2025.avif", "Sarung Tangan Katun Private Brand", "Cek Produk monotaro.id Sarung Tangan Katun Private Brand", "Cotton Gloves Private Brand", "Check monotaro.id Cotton Gloves Private Brand Products"],
  ["mob-kain-lap-microfiber-jul-2025.avif", "Kain Lap Microfiber", "Cek Produk monotaro.id Kain Lap Microfiber Private Brand", "Microfiber Cloth", "Check monotaro.id Microfiber Cloth Private Brand Products"],
  ["mob-pb-atk-20nov.avif", "Alat Tulis Kantor monotaro.id", "ATK berkualitas seperti amplop, gunting, box file", "monotaro.id Office Stationery", "Quality stationery such as envelopes, scissors, box files"],
  ["mob-produk-rekomendasi.avif", "Produk Rekomendasi Terbaik Untuk Anda", "Cek di sini daftar produk rekomendasi terbaik di monotaro.id", "Best Recommended Products for You", "Check here the list of best recommended products on monotaro.id"],
  ["mob-gratis-ongkir-29mei.avif", "Gratis Ongkos Kirim*", "Jabodetabek, Banten, Jabar, Jatim, Jateng, Yogyakarta, Bali, Jambi, Lampung & Sumatera Selatan", "Free Shipping*", "Jabodetabek, Banten, West Java, East Java, Central Java, Yogyakarta, Bali, Jambi, Lampung & South Sumatra"],
  ["mob-lakban-jul-2025.avif", "Lakban monotaro.id mulai dari Rp4.000,-/Roll", "Kualitas perekat yang sangat baik dan panjang aktual", "monotaro.id Tape from Rp4,000/Roll", "Excellent adhesive quality and actual length"],
  ["mob-kantong-sampah-jul-2025.avif", "Kantong Sampah HDPE Hanya Rp 7.900", "Tidak mudah sobek, tidak berbau, tidak mudah bocor", "HDPE Garbage Bags Only Rp7,900", "Tear-resistant, odorless, leak-resistant"],
  ["mob-rate-n-win-29mei.avif", "Ulas Produk Gratis Voucher", "Berlaku hingga 31 Desember 2026", "Review Products for Free Voucher", "Valid until December 31, 2026"],
  ["mob-produk-perbandingan.avif", "Perbandingan Produk Terbaik", "Cek di sini daftar perbandingan produk terbaik di monotaro.id", "Best Product Comparisons", "Check here the list of best product comparisons on monotaro.id"],
  ["mob-plastik-wraping-jul-2025.avif", "Plastik Wrapping Private Brand", "Cek Produk monotaro.id Plastik Wrapping Private Brand dengan Harga Terbaik", "Wrapping Plastic Private Brand", "Check monotaro.id Wrapping Plastic Private Brand Products at Best Prices"],
];

export default function PromoPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const en = language === "en";
  return (
    <main className="min-h-dvh bg-neutral-50 pb-8">
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 bg-brand px-4 py-4 text-white shadow-md rounded-b-3xl"><button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button><h1 className="text-sm font-bold">{t("menu.promo")}</h1></header>
      <section className="px-4 py-4 pt-[76px]"><img src="/Promo/banner.webp" alt={en ? "New user promo" : "Promo pengguna baru"} className="w-full rounded-lg object-cover" /><div className="mt-5 grid grid-cols-1 gap-4">{PROMOS.map(([image, titleId, descId, titleEn, descEn]) => <article key={image} className="overflow-hidden rounded-[10px] border border-neutral-200 bg-white shadow-sm"><img src={`/Promo/${image}`} alt={en ? titleEn : titleId} className="h-auto w-full object-cover" /><div className="p-4"><h2 className="text-sm font-bold text-neutral-800">{en ? titleEn : titleId}</h2><p className="mt-3 min-h-8 text-xs leading-relaxed text-neutral-600">{en ? descEn : descId}</p><button type="button" className="mt-4 w-full rounded-[6px] bg-red-600 px-4 py-3 text-xs font-bold text-white">{t("promo.check_now")}</button></div></article>)}</div></section>
    </main>
  );
}
