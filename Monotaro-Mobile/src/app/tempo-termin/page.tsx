"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function TempoTerminPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ email: "", name: "", phone: "", company: "", npwp: "", address: "", city: "", captcha: "" });

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm(prev => ({ ...prev, [k]: e.target.value }));
  }

  const BENEFITS = [
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>,
      text: language === "en"
        ? "Term of Payment is a feature managed directly by monotaro.id without using third parties, ensuring the security and confidentiality of customer information."
        : "Pembayaran Tempo/Termin merupakan fitur yang dikelola langsung oleh monotaro.id tanpa menggunakan pihak ketiga sehingga keamanan dan kerahasiaan informasi pelanggan terjamin.",
    },
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>,
      text: language === "en"
        ? "Customers can pay for orders after receiving the goods with a payment period starting from 14 days from the invoice issuance date."
        : "Pelanggan bisa melakukan pembayaran pesanan setelah barang diterima dengan jangka waktu pembayaran mulai dari 14 hari sejak tanggal diterbitkannya invoice.",
    },
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      text: language === "en" ? "Helps your company's cash flow." : "Membantu cash flow (arus kas) perusahaan pelanggan.",
    },
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4M3 7h18"/></svg>,
      text: language === "en"
        ? "The verification process for term payment applications is easy and fast (max. 3 business days from receipt of complete documents)."
        : "Proses verifikasi pengajuan pembayaran tempo/termin mudah dan cepat (maks. 3 hari kerja sejak dokumen lengkap diterima).",
    },
  ];

  const FILE_FIELDS = language === "en"
    ? [
        { label: "Term Payment Registration Form (Must be stamped and signed)", required: true },
        { label: "NPWP (Tax Identification Number)", required: true },
        { label: "NIB (Business Registration Number) or", required: false },
        { label: "VAT Centralization Letter (if any) or", required: false },
        { label: "TDP (Company Registration Certificate) or", required: false },
        { label: "SIUP (Business Trading License) or", required: false },
      ]
    : [
        { label: "Formulir Registrasi Pembayaran Tempo/Termin (Wajib dicap dan ditandatangani)", required: true },
        { label: "NPWP (Nomor Pokok Wajib Pajak)", required: true },
        { label: "NIB (Nomor Induk Berusaha) atau", required: false },
        { label: "Surat Pemusatan PPN (jika ada) atau", required: false },
        { label: "TDP (Tanda Daftar Perusahaan) atau", required: false },
        { label: "SIUP (Surat Izin Usaha Perdagangan) atau", required: false },
      ];

  const FORM_FIELDS = language === "en"
    ? [
        { key: "email" as const, label: "Email Address", required: true },
        { key: "name" as const, label: "Full Name", required: true },
        { key: "phone" as const, label: "Company Phone Number", required: false },
        { key: "company" as const, label: "Company Name", required: true },
        { key: "npwp" as const, label: "Company NPWP", required: true },
        { key: "address" as const, label: "Company Address", required: true },
        { key: "city" as const, label: "City", required: true },
      ]
    : [
        { key: "email" as const, label: "Alamat Email", required: true },
        { key: "name" as const, label: "Nama Lengkap", required: true },
        { key: "phone" as const, label: "Nomor Telepon Perusahaan", required: false },
        { key: "company" as const, label: "Nama Perusahaan", required: true },
        { key: "npwp" as const, label: "NPWP Perusahaan", required: true },
        { key: "address" as const, label: "Alamat Perusahaan", required: true },
        { key: "city" as const, label: "Kota", required: true },
      ];

  return (
    <main className="min-h-dvh bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="text-neutral-500 shrink-0" aria-label={t("common.back")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-neutral-900 flex-1">
          {language === "en" ? "Term of Payment" : "Tempo/Termin"}
        </h1>
      </header>

      <div className="page-content">
        {/* Hero */}
        <div className="px-4 py-5 border-b border-neutral-100">
          <h2 className="text-xl font-extrabold text-neutral-900 mb-3">
            {language === "en" ? "Term of Payment" : "Pembayaran Tempo/Termin"}
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed text-justify">
            {language === "en"
              ? "Term of Payment is a deferred payment method available only for Business Account customers, where you can make payment after receiving the goods with a payment period starting from 14 days from the invoice issuance date."
              : "Pembayaran tempo/termin adalah metode pembayaran berjangka yang dapat dinikmati hanya oleh pelanggan akun Bisnis, di mana Anda dapat melakukan pembayaran setelah barang diterima dengan jangka waktu pembayaran mulai dari 14 hari sejak tanggal diterbitkannya invoice."}
          </p>
        </div>

        {/* Benefits */}
        <div className="mx-4 mb-4 rounded-[12px] border border-neutral-200 bg-neutral-50 p-4">
          <h3 className="text-sm font-bold text-neutral-900 mb-5">
            {language === "en" ? "Benefits of Using Term of Payment" : "Keuntungan Menggunakan Pembayaran Tempo/Termin"}
          </h3>
          <div className="flex flex-col gap-4">
            {BENEFITS.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="shrink-0">{b.icon}</div>
                <p className="text-[10px] text-neutral-600 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="px-4 mb-4">
          <h3 className="text-sm font-bold text-neutral-900 mb-3">
            {language === "en" ? "Term of Payment Application Requirements" : "Syarat Pengajuan Pembayaran Tempo/Termin"}
          </h3>
          <p className="text-[11px] text-brand font-semibold mb-2">
            {language === "en"
              ? "Important: Term of Payment applies to customers with the following conditions:"
              : "Penting diketahui : Pembayaran Tempo/Termin berlaku untuk pelanggan dengan ketentuan sebagai berikut:"}
          </p>
          <ol className="list-decimal list-inside space-y-1 text-[11px] text-neutral-700">
            {language === "en" ? (
              <>
                <li>Customer is registered as a <strong>Business Account</strong>.</li>
                <li>Company is domiciled on the islands of <strong>Java, Bali, Sumatra, Riau Islands, and Kalimantan</strong>.</li>
              </>
            ) : (
              <>
                <li>Pelanggan terdaftar sebagai <strong>Akun Bisnis</strong>.</li>
                <li>Perusahaan berdomisili di pulau <strong>Jawa, Bali, Sumatera, Kepulauan Riau, dan Kalimantan</strong>.</li>
              </>
            )}
          </ol>
        </div>

        {/* How to Apply */}
        <div className="mx-4 mb-4 rounded-[12px] border border-neutral-200 bg-neutral-50 p-4">
          <h3 className="text-sm font-bold text-neutral-900 text-center mb-3">
            {language === "en" ? "How to Apply for Term of Payment" : "Cara Menggunakan/Mengajukan Pembayaran Tempo/Termin"}
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-[11px] text-neutral-700 mb-4">
            <li>
              {language === "en"
                ? <>Click to download the <strong>Term Payment Registration Form</strong> below.</>
                : <>Klik download <strong>Formulir Registrasi Pembayaran Tempo/Termin</strong> berikut ini.</>}
            </li>
          </ol>
          <div className="flex gap-2 mb-4">
            <button type="button" className="flex-1 bg-green-700 text-white text-xs font-bold py-2.5 rounded-[6px]">
              {language === "en" ? "Download Form (Indonesian)" : "Download Formulir (Bahasa)"}
            </button>
            <button type="button" className="flex-1 bg-green-700 text-white text-xs font-bold py-2.5 rounded-[6px]">
              {language === "en" ? "Download Form (English)" : "Download Formulir (English)"}
            </button>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-[11px] text-neutral-700" start={2}>
            {language === "en" ? (
              <>
                <li>Fill in the form with valid data and affix your signature and company stamp.</li>
                <li>Fill in the <strong>Term of Payment Application Form</strong> below.</li>
                <li>Attach the required documents:
                  <ul className="list-disc list-inside mt-1 space-y-0.5 ml-3">
                    <li>Term Payment Registration Form</li>
                    <li>NPWP</li>
                    <li>NIB / TDP / SIUP</li>
                    <li>VAT Centralization Letter (if any)</li>
                  </ul>
                </li>
                <li>Enter the captcha code.</li>
                <li>Finally, click the <strong>Submit Application</strong> button.</li>
              </>
            ) : (
              <>
                <li>Isi formulir tersebut menggunakan data-data yang valid serta bubuhkan tandatangan dan cap perusahaan.</li>
                <li>Mengisi <strong>Formulir Pengajuan Pembayaran Tempo/Termin</strong> di bawah ini.</li>
                <li>Lampirkan dokumen-dokumen yang dibutuhkan:
                  <ul className="list-disc list-inside mt-1 space-y-0.5 ml-3">
                    <li>Formulir Registrasi Pembayaran Tempo/Termin</li>
                    <li>NPWP</li>
                    <li>NIB/ TDP/ SIUP</li>
                    <li>Surat Pemusatan PPN (jika ada)</li>
                  </ul>
                </li>
                <li>Mengisi kode captcha.</li>
                <li>Terakhir, klik tombol <strong>Kirim Pengajuan</strong>.</li>
              </>
            )}
          </ol>
          <div className="mt-4 space-y-2 text-[11px] text-neutral-600 leading-relaxed text-justify">
            <p>
              {language === "en"
                ? <>The Term of Payment application process takes <strong>3 business days</strong> from when we receive all complete documents. PT Monotaro Indonesia will verify the Term of Payment application and reserves the right to reject it in accordance with the company's applicable policies.</>
                : <>Proses pengajuan Pembayaran Tempo/Termin membutuhkan waktu <strong>3 hari kerja</strong> terhitung sejak kami menerima semua dokumen dengan lengkap. PT Monotaro Indonesia akan melakukan proses verifikasi atas pengajuan Pembayaran Tempo/Termin dan berhak untuk menolak pengajuan Pembayaran Tempo/Termin sesuai dengan kebijakan yang berlaku di perusahaan.</>
              }
            </p>
            <p className="text-brand">
              {language === "en"
                ? <>For more information about Term of Payment, please visit <span className="underline">here</span>, or contact our Customer Support at <span className="underline">cs@monotaro.id</span>.</>
                : <>Informasi selengkapnya terkait dengan Pembayaran Tempo/Termin dapat ditemukan <span className="underline">di sini</span>, atau silahkan menghubungi Customer Support kami di <span className="underline">cs@monotaro.id</span>.</>
              }
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="px-4 pb-4">
          <h3 className="text-base font-bold text-neutral-900 mb-4 pt-4 border-t border-neutral-200">
            {language === "en" ? "Term of Payment Application Form" : "Formulir Pengajuan Pembayaran Tempo/Termin"}
          </h3>
          <div className="space-y-4">
            {FORM_FIELDS.map(({ key, label, required }) => (
              <div key={key} className="flex items-start gap-3">
                <label className="w-28 shrink-0 text-xs text-neutral-700 pt-2.5">
                  {label} {required && <span className="text-brand">*</span>}
                </label>
                <input
                  type="text"
                  value={form[key]}
                  onChange={set(key)}
                  className="field flex-1"
                />
              </div>
            ))}
          </div>

          {/* Attachments */}
          <div className="mt-6 pt-4 border-t border-neutral-200">
            <h4 className="text-base font-bold text-neutral-900 mb-1">
              {language === "en" ? "Document Attachments" : "Lampiran Berkas"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              {language === "en"
                ? "Attached files must be scanned copies with complete information &amp; signed. monotaro.id guarantees the confidentiality of your attached files."
                : "Berkas yang dilampirkan berupa hasil scan yang telah dilengkapi informasinya &amp; telah ditandatangani. monotaro.id menjamin kerahasian berkas yang Anda lampirkan."}
            </p>
            <p className="text-[9px] text-brand mt-1 mb-4">Format .pdf, .jpg, .jpeg, .png | Max. file size 500kb</p>
            <div className="space-y-4">
              {FILE_FIELDS.map((f, i) => (
                <div key={f.label}>
                  {i > 0 && <hr className="border-neutral-200 my-3 mx-auto w-3/4" />}
                  <div className="flex items-center gap-3">
                    <label className="flex-1 text-[11px] font-bold text-neutral-700 leading-tight">
                      {f.label} {f.required && <span className="text-brand">*</span>}
                    </label>
                    <div className="shrink-0 text-right">
                      <label className="inline-flex cursor-pointer text-xs font-normal text-neutral-900 bg-white rounded-[8px] px-5 py-2.5" style={{boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"}}>
                        {language === "en" ? "Browse File" : "Cari File"}
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              {/* Captcha */}
              <div className="flex items-start gap-3">
                <label className="w-28 shrink-0 text-xs text-neutral-700 pt-2.5">
                  {language === "en" ? "Captcha Code" : "Kode Captcha"} <span className="text-brand">*</span>
                </label>
                <div className="flex-1 space-y-2">
                  <div className="border border-neutral-300 rounded-[4px] px-3 py-2 bg-neutral-100 font-mono text-sm text-neutral-500 line-through select-none">
                    Monotaro
                  </div>
                  <input
                    type="text"
                    value={form.captcha}
                    onChange={set("captcha")}
                    className="field"
                    placeholder={language === "en" ? "Enter the captcha code above" : "Masukkan kode captcha di atas"}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full bg-brand text-white text-sm font-bold py-3 rounded-[8px]"
            >
              {language === "en" ? "SUBMIT APPLICATION" : "KIRIM PENGAJUAN"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
