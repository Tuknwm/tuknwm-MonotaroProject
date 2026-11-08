"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function FakturPajakPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const SYARAT = [
    {
      num: "01",
      img: "/FakturPajak/faktur-pajak-step1.avif",
      title: language === "en" ? "Registered Business Account" : "Akun Bisnis Terdaftar",
      desc: language === "en"
        ? <p>Customers must be registered as a <strong>Business Account</strong> to request a tax invoice.</p>
        : <p>Pelanggan wajib terdaftar sebagai <strong>Akun Bisnis</strong> untuk pengajuan faktur pajak.</p>,
    },
    {
      num: "02",
      img: "/FakturPajak/faktur-pajak-step2.avif",
      title: language === "en" ? "Complete & Valid NPWP Data" : "Data NPWP Lengkap & Valid",
      desc: language === "en"
        ? <p>Ensure your Company NPWP data is complete, correct, and validated in your account &amp; the <strong>&quot;Need Tax Invoice&quot;</strong> option has been enabled.</p>
        : <p>Pastikan data NPWP Perusahaan sudah lengkap, sesuai, dan tervalidasi di akun Anda &amp; Opsi <strong>&quot;Butuh Faktur Pajak&quot;</strong> telah diaktifkan.</p>,
    },
    {
      num: "03",
      img: "/FakturPajak/faktur-pajak-step3.avif",
      title: language === "en" ? "Request Within the Deadline" : "Permintaan Sesuai Batas Waktu",
      desc: language === "en"
        ? <p>Tax invoice requests must be made <strong>no later than the 10th of the following month</strong> after goods delivery. The tax invoice and invoice will be issued after the order is shipped and sent to the registered email as a softcopy or hardcopy (upon request) to the registered address.</p>
        : <p>Permintaan faktur pajak dilakukan <strong>maksimal tanggal 10 bulan berikutnya</strong> setelah pengiriman barang. Faktur pajak dan invoice akan diterbitkan setelah pesanan dikirim dan disampaikan melalui email terdaftar dalam bentuk softcopy atau hardcopy (sesuai permintaan) ke alamat yang terdaftar.</p>,
    },
  ];

  const FAQS = language === "en"
    ? [
        {
          q: "Can invoices and tax invoices be revised?",
          a: "Yes, revisions to invoices and tax invoices related to NPWP data discrepancies can be requested no later than the 10th of the following month from the month of goods receipt. If the deadline is exceeded, revisions cannot be made.",
        },
        {
          q: "Can one account have two NPWPs?",
          a: "No. One account can only use one company name and one NPWP. For orders with a different NPWP, please create a new account.",
        },
      ]
    : [
        {
          q: "Apakah invoice dan faktur pajak dapat direvisi?",
          a: "Ya, revisi invoice dan faktur pajak terkait ketidaksesuaian data NPWP dapat diajukan maksimal tanggal 10 bulan berikutnya sejak bulan penerimaan barang. Jika melewati batas tersebut, revisi tidak dapat dilakukan.",
        },
        {
          q: "Apakah satu akun bisa memiliki dua NPWP?",
          a: "Tidak bisa. Satu akun hanya dapat menggunakan satu nama perusahaan dan satu NPWP. Untuk pesanan dengan NPWP berbeda, silakan membuat akun baru.",
        },
      ];

  return (
    <main className="min-h-dvh bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="text-neutral-500 shrink-0" aria-label={t("common.back")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-neutral-900 flex-1">
          {language === "en" ? "Tax Invoice" : "Faktur Pajak"}
        </h1>
      </header>

      <div className="page-content">
        {/* Hero */}
        <div className="px-4 py-5 border-b border-neutral-100">
          <h2 className="text-xl font-extrabold text-neutral-900 mb-3">
            {language === "en" ? "Invoice & Tax Invoice Feature" : "Fitur Invoice & Faktur Pajak"}
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed text-justify mb-3">
            {language === "en"
              ? "This feature makes it easy for you to receive official Invoices and Tax Invoices for every company transaction. Documents are issued automatically and sent to the registered email as proof of payment and administrative purposes. If needed, you can also request documents in hard copy form by replying to our email."
              : "Fitur ini memudahkan Anda menerima Invoice dan Faktur Pajak resmi untuk setiap transaksi perusahaan. Dokumen akan diterbitkan secara otomatis dan dikirimkan ke email terdaftar sebagai bukti pembayaran dan kebutuhan administrasi. Apabila diperlukan, Anda juga dapat mengajukan permintaan dokumen dalam bentuk hard copy dengan membalas email dari kami."}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/FakturPajak/FakturPajak.jpg" alt="Invoice & Tax Invoice System" className="w-full rounded-[8px] object-cover mb-3" />
          <p className="text-[10px] text-neutral-500 leading-relaxed italic text-justify">
            {language === "en"
              ? <>*For <strong>Bank Transfer payment</strong>, hard copy requests only apply to transactions above Rp5,000,000.</>
              : <>*Khusus <strong>pembayaran Bank Transfer</strong>, permintaan hard copy hanya berlaku untuk transaksi di atas Rp5.000.000.</>
            }
          </p>
          <button type="button" className="mt-4 bg-brand text-white text-xs font-bold px-4 py-2.5 rounded-[8px]">
            {language === "en" ? "Watch Video Guide" : "Lihat Panduan Video"}
          </button>
        </div>

        {/* Requirements */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-brand mb-4">
            {language === "en" ? "Requirements for Tax Invoice" : "Syarat Mendapatkan Faktur Pajak"}
          </h3>
          <div className="flex flex-col gap-5">
            {SYARAT.map((s) => (
              <div key={s.num} className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.title} className="w-12 h-12 shrink-0 object-contain" />
                <div>
                  <p className="text-lg font-extrabold text-brand leading-none mb-1">{s.num}</p>
                  <p className="text-xs font-bold text-neutral-900 mb-1">{s.title}</p>
                  <div className="text-[10px] text-neutral-600 leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Delivery */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-brand mb-4">
            {language === "en" ? "Document Delivery" : "Pengiriman Dokumen"}
          </h3>
          <div className="border border-neutral-200 rounded-[10px] p-4 flex flex-col gap-5">
            {/* Softcopy */}
            <div className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/FakturPajak/faktur-pajak-softcopy.avif" alt="Softcopy" className="w-12 h-12 object-contain" />
              <p className="text-xs font-bold text-brand">Softcopy</p>
              <ul className="w-full space-y-1.5 text-[10px] text-neutral-700 leading-relaxed list-disc list-inside">
                {language === "en" ? (
                  <>
                    <li>Payment method: Bank Transfer, COD, GoPay/E-Wallet, Credit &amp; Debit Card Online.</li>
                    <li>Documents sent digitally to the registered email.</li>
                    <li>PDF format.</li>
                    <li>Document delivery 2–5 business days after goods are shipped.</li>
                  </>
                ) : (
                  <>
                    <li>Metode pembayaran Bank Transfer, COD, GoPay/E-Wallet, Kartu Kredit &amp; Debit Online.</li>
                    <li>Dokumen dikirim secara digital melalui email terdaftar.</li>
                    <li>Format PDF.</li>
                    <li>Pengiriman dokumen 2–5 hari kerja setelah barang dikirim.</li>
                  </>
                )}
              </ul>
            </div>
            <hr className="border-neutral-200" />
            {/* Hardcopy */}
            <div className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/FakturPajak/faktur-pajak-hardcopy.avif" alt="Hardcopy" className="w-12 h-12 object-contain" />
              <p className="text-xs font-bold text-brand">Hardcopy</p>
              <ul className="w-full space-y-1.5 text-[10px] text-neutral-700 leading-relaxed list-disc list-inside">
                {language === "en" ? (
                  <>
                    <li>Hardcopy delivery only for users with Term of Payment/Installment method</li>
                    <li>Issued 7 business days after goods are shipped</li>
                    <li>Hardcopy requests can be made by replying to the email or contacting <span className="text-brand">Customer Support</span></li>
                    <li>Physical documents sent via courier service</li>
                  </>
                ) : (
                  <>
                    <li>Pengiriman hardcopy hanya untuk pengguna dengan metode Pembayaran Tempo/Termin</li>
                    <li>Diterbitkan 7 hari kerja setelah barang terkirim</li>
                    <li>Pengajuan hardcopy dapat dilakukan dengan cara membalas email atau menghubungi <span className="text-brand">Customer Support</span></li>
                    <li>Dokumen fisik dikirim menggunakan jasa kurir</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Changes & Revisions */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-brand mb-3">
            {language === "en" ? "Changes & Data Revisions" : "Perubahan & Revisi Data"}
          </h3>
          <ul className="space-y-2 text-[11px] text-neutral-700 leading-relaxed list-disc list-inside">
            {language === "en" ? (
              <>
                <li>Data changes can be submitted <strong>before the tax invoice is issued.</strong></li>
                <li>Tax invoice revisions can be made no later than <strong>the 10th of the following month.</strong></li>
                <li>Requests to change Name, Address, and NPWP Number can be submitted by <strong>sending a photo or scan of the latest NPWP</strong> via live chat or Customer Support email.</li>
              </>
            ) : (
              <>
                <li>Perubahan data dapat diajukan <strong>sebelum penerbitan faktur pajak.</strong></li>
                <li>Revisi faktur pajak dapat dilakukan maksimal <strong>tanggal 10 di bulan berikutnya.</strong></li>
                <li>Permintaan perubahan Nama, Alamat, dan Nomor NPWP dapat diajukan dengan <strong>mengirimkan foto atau scan NPWP terbaru</strong> melalui live chat atau email Customer Support.</li>
              </>
            )}
          </ul>
        </div>

        {/* FAQ */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900 mb-3">
            {language === "en" ? "Quick FAQ" : "FAQ Singkat"}
          </h3>
          <div className="flex flex-col gap-2">
            {FAQS.map((f, i) => (
              <div key={i} className="border border-neutral-200 rounded-[8px] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-3 py-3 text-left"
                >
                  <span className="text-[11px] font-semibold text-neutral-900 flex-1 pr-2">{f.q}</span>
                  <span className="text-neutral-400 shrink-0">{openFaq === i ? "×" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-3 pb-3 text-[10px] text-neutral-600 leading-relaxed border-t border-neutral-100 pt-2">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Need Help */}
        <div className="mx-4 my-4 rounded-[12px] bg-neutral-200 p-5 text-center">
          <p className="text-sm font-bold text-neutral-900 mb-1">
            {language === "en" ? "Need Further Assistance?" : "Butuh Bantuan Lebih Lanjut?"}
          </p>
          <p className="text-[11px] text-neutral-600 mb-4">
            {language === "en" ? "Monotaro Customer Support team is ready to help you" : "Tim Customer Support Monotaro siap membantu Anda"}
          </p>
          <button type="button" className="bg-white text-brand text-xs font-bold px-5 py-2.5 rounded-full border border-brand">
            {language === "en" ? "Contact Customer Support" : "Hubungi Customer Support"}
          </button>
        </div>
      </div>
    </main>
  );
}
