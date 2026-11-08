"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function BlanketOrderPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", note: "" });

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }));
  }

  const STEPS = [
    {
      title: language === "en" ? "Submission Form" : "Formulir Pengajuan",
      desc: language === "en"
        ? "Please fill in the submission form with the applicant's information, contact details, and company name"
        : "Silakan isi formulir pengajuan dengan mengisi informasi pemohon, kontak dan nama perusahaan",
    },
    {
      title: language === "en" ? "Submit Application" : "Kirim Pengajuan",
      desc: language === "en"
        ? <>After receiving the Blanket Order request, our Customer Support will confirm the applicant for product list, quantity, contract period, and periodic requirements (e.g. weekly/monthly)</>
        : <>Setelah menerima request Blanket Order, Customer Support kami akan melakukan konfirmasi pemohon untuk list produk, jumlah kuantiti, periode kontrak kerja sama dan kebutuhan berkala (misal per minggu/per bulan)</>,
    },
    {
      title: language === "en" ? "Processing Application" : "Proses Pengajuan",
      desc: language === "en"
        ? <>After receiving the product list, our Customer Support Specialist will check and process the data. Estimated 1-3 business days from when the complete product list and data are received. <span className="text-brand underline">Example blanket order product list</span></>
        : <>Setelah menerima list produknya, Customer Support Specialist kami akan melakukan pengecekan dan pemrosesan data. Estimasinya 1-3 hari kerja sejak list produk dan data lengkap diterima. <span className="text-brand underline">Contoh list produk blanket order</span></>,
    },
    {
      title: language === "en" ? "Sign Application" : "Tanda Tangan Pengajuan",
      desc: language === "en"
        ? <>After completion, our Customer Support Specialist will send a draft cooperation contract for you to review and sign. <span className="text-brand underline">Example draft contract</span></>
        : <>Setelah selesai, Customer Support Specialist kami akan mengirimkan draft kontrak kerja sama yang perlu Anda review dan ditandatangani. <span className="text-brand underline">Contoh draft kontrak</span></>,
    },
    {
      title: language === "en" ? "Application Approved" : "Pengajuan disetujui",
      desc: language === "en"
        ? <>If the agreement is approved, please send back the signed Blanket PO Agreement Contract file via <span className="text-brand underline">cs@monotaro.id</span></>
        : <>Apabila perjanjian disetujui, silakan kirimkan kembali file Kontrak Pejanjian Blanket PO yang sudah Anda tanda tangani melalui <span className="text-brand underline">cs@monotaro.id</span></>,
    },
  ];

  const KLAUSUL = language === "en"
    ? [
        "The agreement only binds the submitted item list, and does not include other items outside the submission.",
        "The agreement only binds stock to speed up order processing; estimates do not include delivery to your location.",
        "At least 90% of the total quantity in the agreement is expected to be absorbed before the agreement expires. If absorption does not reach 90%, it will affect the renewal process for the next Blanket PO period.",
        "Stock shortages or discontinued products may occur subject to market conditions, but our Customer Support will inform you and offer substitute products at a mutually agreed price.",
      ]
    : [
        "Perjanjian hanya mengikat pada list item yang diajukan saja, tidak termasuk pada item lain di luar pengajuan.",
        "Perjanjian hanya mengikat stok untuk mempercepat proses pesanan, estimasi tidak termasuk pengiriman ke lokasi Anda.",
        "Diharapkan minimal 90% dari total kuantiti pada perjanjian berhasil diabsorb sebelum kontrak perjanjian berakhir. Apabila absorption tidak sampai 90%, maka akan mempengaruhi proses perpanjangan Blanket PO pada periode berikutnya.",
        "Memungkinkan terjadinya stok produk kosong maupun discontinued menyesuaikan kondisi pasar, namun Customer Support kami akan menginformasikan maupun menawarkan produk pengganti dengan harga yang disepakati kedua belah pihak",
      ];

  const FORM_FIELDS = language === "en"
    ? [
        { key: "name" as const, label: "Your Name", required: true },
        { key: "phone" as const, label: "Phone/Mobile Number", required: true },
        { key: "email" as const, label: "Your Email Address", required: true },
        { key: "company" as const, label: "Company Name", required: true },
      ]
    : [
        { key: "name" as const, label: "Nama Anda", required: true },
        { key: "phone" as const, label: "Nomor Handphone/Telp", required: true },
        { key: "email" as const, label: "Alamat Email Anda", required: true },
        { key: "company" as const, label: "Nama Perusahaan", required: true },
      ];

  return (
    <main className="min-h-dvh bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="text-neutral-500 shrink-0" aria-label={t("common.back")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-neutral-900 flex-1">Blanket Order</h1>
      </header>

      <div className="page-content">
        {/* Hero */}
        <div className="px-4 py-5 border-b border-neutral-100">
          <h2 className="text-base font-bold text-neutral-900 mb-2">
            {language === "en"
              ? "Purchase contract request for recurring needs (Blanket PO / Blanket Order)"
              : "Permintaan kontrak pembelian barang untuk kebutuhan berkala (Blanket PO / Blanket Order)"}
          </h2>
          <p className="text-xs text-brand leading-relaxed">
            {language === "en"
              ? "Blanket Order is a contract for ordering specific products over a 3-12 month period, where monotaro.id guarantees product availability and monthly delivery"
              : "Blanket Order adalah kontrak untuk pemesanan produk tertentu dalam periode 3-12 bulan, di mana monotaro.id menjamin ketersediaan produk dan pengiriman setiap bulannya"}
          </p>
        </div>

        {/* Steps */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900 mb-4">
            {language === "en" ? "Blanket Order Submission Steps" : "Langkah-langkah Pengajuan Blanket Order"}
          </h3>
          <div className="flex flex-col gap-4">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-brand text-white text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
                <div>
                  <p className="text-[11px] font-bold text-neutral-900 mb-0.5">{s.title}</p>
                  <p className="text-[10px] text-neutral-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clause */}
        <div className="mx-4 my-4 rounded-[8px] border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-[11px] font-bold text-neutral-900 mb-3">
            {language === "en"
              ? "Key points to note in the agreement clauses"
              : "Beberapa poin yang perlu diperhatikan dalam klausul perjanjian"}
          </p>
          <ul className="space-y-2 list-disc list-inside">
            {KLAUSUL.map((k, i) => (
              <li key={i} className="text-[10px] text-neutral-700 leading-relaxed">{k}</li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className="px-4 pb-6">
          <h3 className="text-base font-bold text-neutral-900 mb-4 pt-4 border-t border-neutral-200">
            {language === "en" ? "Blanket Order Submission Form" : "Formulir Pengajuan Blanket Order"}
          </h3>
          <div className="space-y-4">
            {FORM_FIELDS.map(({ key, label, required }) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-xs text-neutral-700">
                  {label} {required && <span className="text-brand">*</span>}
                </label>
                <input type="text" value={form[key]} onChange={set(key)} className="field" />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-xs text-neutral-700">
                {language === "en" ? "Add Notes" : "Tambah Catatan"}
              </label>
              <textarea
                value={form.note}
                onChange={set("note")}
                rows={4}
                placeholder={language === "en" ? "Enter product link, product name or SKU number" : "Masukkan link produk, nama produk atau nomor sku"}
                className="field resize-none"
              />
              <p className="text-[10px] text-brand">
                {language === "en"
                  ? "Enter the product information you need for recurring orders"
                  : "Masukkan informasi produk yang ada butuhkan untuk pesanan berkala"}
              </p>
            </div>
          </div>

          <p className="text-[10px] text-neutral-500 mt-4 leading-relaxed">
            {language === "en"
              ? <>By submitting, I agree to the <span className="text-brand underline">Terms &amp; Conditions</span> and <span className="text-brand underline">Privacy Policy</span></>
              : <>Dengan melakukan pengajuan, saya setuju dengan <span className="text-brand underline">Syarat &amp; Ketentuan</span> dan <span className="text-brand underline">Kebijakan Privasi</span></>
            }
          </p>

          <button type="button" className="mt-4 w-full bg-brand text-white text-sm font-bold py-3 rounded-[8px]">
            {language === "en" ? "Submit Application" : "Kirim Pengajuan"}
          </button>
        </div>
      </div>
    </main>
  );
}
