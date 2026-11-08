"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function OnlineApprovalPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const PROCESS_STEPS = [
    { num: "01", bg: "bg-orange-400", title: language === "en" ? "Checkout Order" : "Checkout Pesanan", note: "", icon: "🛒" },
    { num: "02", bg: "bg-cyan-400", title: language === "en" ? "Online Approval Process" : "Proses Online Approval", note: language === "en" ? "*up to 3 approvers" : "*hingga 3 approver", icon: "📋" },
    { num: "03", bg: "bg-neutral-800", title: language === "en" ? "User will receive an email notification whether the order is approved or rejected" : "User akan mendapatkan email pemberitahuan apakah pesanan disetujui atau ditolak", note: "", icon: "✉️" },
    { num: "04", bg: "bg-purple-400", title: language === "en" ? "Order ready to ship" : "Pesanan siap dikirim", note: "", icon: "🚚" },
  ];

  const CARA_STEPS = language === "en"
    ? [
        { num: "01", desc: <>Log in or register with a Business Account type — <span className="text-brand underline">click here</span> to log in or <span className="text-brand underline">click here</span> to register.</> },
        { num: "02", desc: <>Contact our Customer Support team at <span className="text-brand underline">cs@monotaro.id</span></> },
        { num: "03", desc: <>Inform us that you want to use the <strong>Online Approval System</strong> feature</> },
        { num: "04", desc: "Register the names and email addresses of the approvers (maximum 3 names and emails) with the monotaro.id Customer Support team" },
        { num: "05", desc: "The monotaro.id team will inform you of the next steps so you can start enjoying the convenience of this feature." },
      ]
    : [
        { num: "01", desc: <>Login atau daftar dengan tipe Akun Bisnis <span className="text-brand underline">klik disini</span> untuk login atau <span className="text-brand underline">klik disini</span> untuk daftar.</> },
        { num: "02", desc: <>Hubungi tim Customer Support di <span className="text-brand underline">cs@monotaro.id</span></> },
        { num: "03", desc: <>Informasikan bahwa Anda ingin menggunakan fitur <strong>Online Approval System</strong></> },
        { num: "04", desc: "Daftarkan nama-nama dan alamat email approver (maksimum 3 nama dan email) kepada tim Customer Support monotaro.id" },
        { num: "05", desc: "Tim monotaro.id akan menginformasikan langkah-langkah selanjutnya agar dapat segera menikmati kemudahan fitur ini." },
      ];

  const BENEFITS = [
    {
      icon: "/OnlineApproval/icon-control.webp",
      label: language === "en" ? "Better Control" : "Lebih Terkontrol",
      color: "text-teal-500",
      desc: language === "en"
        ? "All orders are known and approved by the person in charge of your company's policy flow"
        : "Semua pesanan diketahui & disetujui oleh pimpinan alur kebijakan perusahaan Anda",
    },
    {
      icon: "/OnlineApproval/icon-clock.webp",
      label: language === "en" ? "Efficient" : "Efisien",
      color: "text-cyan-500",
      desc: language === "en"
        ? "Saves time and is fast because approval is done online"
        : "Hemat waktu & cepat karena persetujuan dilakukan secara online",
    },
    {
      icon: "/OnlineApproval/icon-email.webp",
      label: language === "en" ? "Easy" : "Mudah",
      color: "text-purple-500",
      desc: language === "en"
        ? "Simply place an order as usual, and an approval request email will automatically be sent directly to your manager"
        : "Cukup dengan melakukan pesanan seperti pada umumnya, otomatis email permintaan persetujuan akan langsung diterima oleh pimpinan Anda",
    },
  ];

  const STEP_ITEMS = language === "en"
    ? [
        {
          n: 1,
          items: [
            { label: "a", text: "Log in to your account on monotaro.id, find the items you want to order, and proceed through checkout" },
            { label: "b", text: "Once you complete your order, the approver will receive an email notification to approve or reject the order. Click the link provided to proceed." },
            { label: "c", text: "The approval period is valid for a maximum of 14 calendar days from the date the order is created" },
          ],
          note: "Note: Maximum 3 registered approvers",
        },
        {
          n: 2,
          items: [
            { label: "a", text: <>The approver will be directed to the order detail page and approve or reject by clicking the <strong>Approve or Decline</strong> button.</> },
            { label: "b", text: "The order must receive approval from all approvers to be processed. If even 1 approver rejects it, the order cannot be processed (cancelled)." },
          ],
          note: null,
        },
        {
          n: 3,
          items: [
            { label: "a", text: "You will receive an email notification when the approver approves your order" },
          ],
          note: "Note: You can resend the notification email to the approver via the order detail page in your account dashboard.",
        },
        {
          n: 4,
          items: [
            { label: "a", text: "You will also receive an email notification if an approver does not approve or rejects your order, and the order will be automatically cancelled" },
            { label: "b", text: "If approved, your order will be processed immediately" },
          ],
          note: <>Note: Only applicable for Business Account type customers with <strong>Term of Payment (TOP)</strong> method. For more information <span className="text-brand underline">click here</span></>,
        },
      ]
    : [
        {
          n: 1,
          items: [
            { label: "a", text: "Login akun Anda di monotaro.id, cari barang yang ingin Anda pesan dan lanjutkan hingga checkout" },
            { label: "b", text: "Pada saat Anda selesai melakukan pesanan, approver akan menerima e-mail notifikasi untuk menyetujui atau menolak pesanan yang telah dibuat. Klik link yang diberikan untuk proses selanjutnya." },
            { label: "c", text: "Jangka waktu approval maksimum berlaku sampai dengan 14 hari kalender sejak pesanan dibuat" },
          ],
          note: "Catatan : Maksimal 3 approver yang terdaftar",
        },
        {
          n: 2,
          items: [
            { label: "a", text: <>Approver akan diarahkan ke halaman detail pesanan, lalu melakukan persetujuan / penolakan dengan cara klik tombol <strong>Approve atau Decline.</strong></> },
            { label: "b", text: "Pesanan harus mendapatkan persetujuan dari semua approver agar dapat diproses. Jika ada 1 approver yang menolak, pesanan tidak dapat di proses (dibatalkan)." },
          ],
          note: null,
        },
        {
          n: 3,
          items: [
            { label: "a", text: "Anda akan menerima e-mail notifikasi saat approver menyetujui pesanan Anda" },
          ],
          note: "Catatan : Anda dapat mengirim ulang e-mail notifikasi kepada approver melalui detail pesanan di dashboard akun Anda.",
        },
        {
          n: 4,
          items: [
            { label: "a", text: "Anda juga akan menerima e-mail notifikasi jika approver tidak menyetujui atau menolak pesanan Anda dan pesanan akan otomatis terbatalkan" },
            { label: "b", text: "Jika disetujui, pesanan anda akan segera diproses" },
          ],
          note: <>Catatan : Hanya berlaku untuk pelanggan tipe Akun Bisnis dan dengan <strong>metode Pembayaran Tempo (TOP)</strong>, untuk mendapatkan info lebih lanjut silahkan <span className="text-brand underline">klik disini</span></>,
        },
      ];

  return (
    <main className="min-h-dvh bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="text-neutral-500 shrink-0" aria-label={t("common.back")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-neutral-900 flex-1">Online Approval</h1>
      </header>

      <div className="page-content">
        {/* Hero */}
        <div className="px-4 py-5 border-b border-neutral-100">
          <h2 className="text-base font-bold text-neutral-900 mb-2">
            {language === "en" ? "Order Process with Online Approval System" : "Proses Pemesanan dengan Online Approval System"}
          </h2>
          <p className="text-[11px] text-brand leading-relaxed mb-1">
            {language === "en"
              ? "Online Approval System is an order approval feature performed by approvers online, so the ordering process can be done faster and more controlled"
              : "Online Approval System adalah fitur persetujuan pesanan yang dilakukan oleh para approver secara online, sehingga proses pemesanan barang dapat dilakukan secara lebih cepat dan terkontrol"}
          </p>
          <p className="text-[10px] text-neutral-500 italic mb-4">
            {language === "en" ? "*Business Account and Term of Payment (TOP) only" : "*Khusus Akun Bisnis dan metode Pembayaran Tempo (TOP)"}
          </p>
          <button type="button" className="w-full bg-brand text-white text-xs font-bold py-3 rounded-[8px]">
            {language === "en" ? "Download Order Guide with Online Approval System" : "Download Panduan Proses Pemesanan dengan Online Approval System"}
          </button>
        </div>

        {/* Flow images */}
        <div className="px-4 py-4 border-b border-neutral-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/OnlineApproval/cara-pesan-online-approval3.avif" alt="Online Approval guide" className="w-full rounded-[8px] mb-3" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/OnlineApproval/flow-approval-b.avif" alt="Approval Flow" className="w-full rounded-[8px]" />
        </div>

        {/* Step images 1-4 */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <p className="text-[10px] text-neutral-500 italic leading-relaxed mb-3">
            {language === "en"
              ? <>Note: For more information about the <strong>Multiple Login</strong> feature (1 company account used by multiple users) please <span className="text-brand underline">click here</span></>
              : <>Catatan : Penjelasan lebih lanjut mengenai fitur <strong>Multiple Login</strong> (1 akun perusahaan digunakan oleh beberapa user) silahkan <span className="text-brand underline">klik disini</span></>
            }
          </p>
          <div className="flex flex-col gap-5">
            {STEP_ITEMS.map(({ n, items, note }) => (
              <div key={n} className="flex flex-col gap-2 pt-4 border-t border-neutral-200 first:border-t-0 first:pt-0">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/OnlineApproval/instant-approval-step${n}.avif`} alt={`Step ${n}`} className="w-full rounded-[8px]" />
                  <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center shadow">{n}</span>
                </div>
                <div className="space-y-1.5">
                  {items.map((item) => (
                    <div key={item.label} className="flex items-start gap-1.5">
                      <span className="shrink-0 w-4 h-4 rounded bg-teal-500 text-white text-[8px] font-bold flex items-center justify-center mt-0.5">{item.label}</span>
                      <p className="text-[11px] text-neutral-700 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                  {note && <p className="text-[8px] text-neutral-500 italic leading-relaxed mt-1">{note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Get */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900 text-center mb-1">
            {language === "en"
              ? <>How to Get the <span className="text-purple-500">Online Approval System</span> Feature</>
              : <>Cara Mendapatkan Fitur <span className="text-purple-500">Online Approval System</span></>
            }
          </h3>
          <p className="text-[10px] text-neutral-500 text-center mb-4">
            {language === "en"
              ? "To get the Online Approval System feature, follow these steps"
              : "Untuk mendapatkan fitur Online Approval System Anda dapat mengikuti langkah-langkah sebagai berikut"}
          </p>
          <div className="flex flex-col gap-3">
            {CARA_STEPS.map((s) => (
              <div key={s.num} className="flex items-start gap-3">
                <span className="shrink-0 w-7 h-7 rounded-[6px] bg-teal-100 text-teal-700 text-[11px] font-bold flex items-center justify-center">{s.num}</span>
                <p className="text-[11px] text-neutral-700 leading-relaxed pt-0.5">{s.desc}</p>
              </div>
            ))}
          </div>
          <button type="button" className="mt-4 w-full bg-purple-500 text-white text-xs font-bold py-3 rounded-[8px]">
            {language === "en" ? "Send email now" : "Kirim email sekarang"}
          </button>
        </div>

        {/* Benefits */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900 text-center mb-4">
            {language === "en" ? "Benefits of Online Order Approval" : "Benefit Approval Pesanan Secara Online"}
          </h3>
          <div className="flex flex-col gap-3">
            {BENEFITS.map((b) => (
              <div key={b.label} className="border border-neutral-200 rounded-[10px] p-3 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.icon} alt={b.label} className="w-10 h-10 shrink-0 object-contain" />
                <div>
                  <p className={`text-[11px] font-bold mb-0.5 ${b.color}`}>{b.label}</p>
                  <p className="text-[10px] text-neutral-600 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download button */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <button type="button" className="w-full bg-brand text-white text-xs font-bold py-3 rounded-[8px]">
            {language === "en" ? "Download Order Guide with Online Approval System" : "Download Panduan Proses Pemesanan dengan Online Approval System"}
          </button>
        </div>

        {/* Banner opinion */}
        <div className="mx-4 my-4 rounded-[12px] overflow-hidden relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/OnlineApproval/bn-opinion.avif" alt={language === "en" ? "Share your opinion" : "Berikan pendapat Anda"} className="w-full" />
        </div>
      </div>
    </main>
  );
}
