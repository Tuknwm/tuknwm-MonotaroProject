"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function MultipleLoginPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const BENEFITS = language === "en"
    ? ["Easy & fast process", "Efficient", "Easy purchase monitoring", "Better control", "Increase productivity"]
    : ["Proses mudah & cepat", "Efisien", "Mudah memonitoring pembelian", "Lebih terkontrol", "Meningkatkan produktivitas"];

  const CARA_DAPAT = language === "en"
    ? [
        { num: "01", desc: <>Create a Business Account type <span className="text-orange-500 underline">here</span>.</> },
        { num: "02", desc: <>Contact our Customer Support via email at <span className="text-orange-500 underline">cs@monotaro.id</span></> },
        { num: "03", desc: <>Inform us that you want to use the <strong>Multiple Login</strong> feature</> },
        { num: "04", desc: "Follow the next instructions from the Customer Support team to start collaborating in monitoring and placing orders among purchasing staff at your company" },
      ]
    : [
        { num: "01", desc: <>Buat akun dengan tipe Akun Bisnis <span className="text-orange-500 underline">disini</span>.</> },
        { num: "02", desc: <>Hubungi Customer Support kami via email di <span className="text-orange-500 underline">cs@monotaro.id</span></> },
        { num: "03", desc: <>Informasikan bahwa Anda ingin menggunakan fitur <strong>Multiple Login</strong></> },
        { num: "04", desc: "Ikuti petunjuk selanjutnya dari tim Customer Support agar dapat segera berkolaborasi dalam memantau dan melakukan pemesanan antar staff purchasing di kantor Anda" },
      ];

  const CARA_GUNA = language === "en"
    ? [
        { n: 1, desc: "Log in to your monotaro.id account that was previously registered", note: <><em>Note: This feature is only available for <strong>Business Accounts</strong></em></> },
        { n: 2, desc: <>Select <strong>Company History</strong> to view the order history of all staff registered in 1 group</>, note: null },
        { n: 3, desc: <>Each order includes the orderer&apos;s name so you can easily see who placed the order</>, note: null },
        { n: 4, desc: "Each staff member can also view orders placed by other staff and re-order", note: null },
      ]
    : [
        { n: 1, desc: "Login ke dalam akun Anda di monotaro.id yang telah didaftarkan sebelumnya", note: <><em>Catatan : Fitur ini hanya berlaku khusus <strong>Akun Bisnis</strong></em></> },
        { n: 2, desc: <>Pilih <strong>Riwayat Perusahaan</strong> Saya untuk melihat riwayat pesanan dari semua staf yang terdaftar dalam 1 group</>, note: null },
        { n: 3, desc: <>Dalam setiap pesanan terdapat nama pemesan sehingga mudah diketahui siapa yang melakukan pemesanan</>, note: null },
        { n: 4, desc: "Masing-masing staf juga dapat melihat pesanan yang dibuat oleh staf lain dan juga melakukan pemesanan ulang", note: null },
      ];

  return (
    <main className="min-h-dvh bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="text-neutral-500 shrink-0" aria-label={t("common.back")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-neutral-900 flex-1">Multiple Login</h1>
      </header>

      <div className="page-content">
        {/* Hero */}
        <div className="px-4 py-5 border-b border-neutral-100">
          <h2 className="text-2xl font-extrabold text-neutral-900 mb-3">Multiple Login</h2>
          <p className="text-[11px] text-neutral-700 leading-relaxed mb-3 text-justify">
            {language === "en" ? <>monotaro.id introduces the Multiple Login feature to help business customers (companies) with multiple users (purchasing, GA, finance, etc.) to make purchases <span className="text-orange-500">on monotaro.id</span>.</> : <>monotaro.id menghadirkan fitur Multiple Login guna membantu pelanggan bisnis (perusahaan) yang memiliki beberapa user (pengguna) untuk melakukan pembelian <span className="text-orange-500">di website monotaro.id</span>, seperti bagian purchasing/procurement, GA, finance dan lainnya.</>}
          </p>
          <p className="text-[11px] text-orange-500 leading-relaxed mb-3 text-justify">
            {language === "en" ? "With this feature, companies can more easily monitor and control transactions made by each user on monotaro.id." : "Dengan fitur ini, perusahaan dapat lebih mudah untuk memonitor dan mengontrol transaksi yang dilakukan oleh masing-masing user di monotaro.id"}
          </p>
          <p className="text-[10px] text-neutral-500 italic mb-3"><em>{language === "en" ? <>Note: This feature is only available for <strong>Business Accounts</strong></> : <>Catatan : Fitur ini hanya berlaku khusus <strong>Akun Bisnis</strong></>}</em></p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/MultipleLogin/MultipleLogin.avif" alt="Multiple Login" className="w-full object-contain rounded-[8px]" />

          {/* Benefit chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {BENEFITS.map((b) => (
              <div key={b} className="relative bg-white rounded-[8px] px-3 py-2.5 shadow-sm border border-neutral-100 overflow-hidden">
                <p className="text-[10px] font-bold text-orange-500 leading-tight pr-4">{b}</p>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-orange-400 rounded-tl-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Cara Mendapatkan */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900 text-center mb-4">{language === "en" ? "How to Get the Multiple Login Feature" : "Cara Mendapatkan Fitur Multiple Login"}</h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/MultipleLogin/CarMendapatkanFiturMultiplLogin.avif" alt="Cara Mendapatkan" className="w-full rounded-[8px] mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {CARA_DAPAT.map((s) => (
              <div key={s.num} className="flex flex-col gap-1.5">
                <span className="w-8 h-8 rounded-[6px] bg-orange-400 text-white text-sm font-bold flex items-center justify-center">{s.num}</span>
                <p className="text-[11px] text-neutral-700 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <button type="button" className="mt-4 w-full bg-green-600 text-white text-sm font-bold py-3 rounded-[8px]">
            {language === "en" ? "Send email now" : "Kirim email sekarang"}
          </button>
        </div>

        {/* Cara Menggunakan */}
        <div className="px-4 py-4 pb-6">
          <h3 className="text-sm font-bold text-neutral-900 text-center mb-4">{language === "en" ? "How to Use the Multiple Login Feature" : "Cara Menggunakan Fitur Multiple Login"}</h3>
          <div className="flex flex-col gap-5">
            {CARA_GUNA.map(({ n, desc, note }) => (
              <div key={n} className="flex flex-col gap-2 pt-4 border-t border-neutral-200 first:border-t-0 first:pt-0">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/MultipleLogin/step-${n}-ml.avif`} alt={`Step ${n}`} className="w-full rounded-[8px]" />
                  <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center shadow">{n}</span>
                </div>
                <p className="text-[11px] text-neutral-700 leading-relaxed">{desc}</p>
                {note && <p className="text-[10px] text-neutral-500 italic">{note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
