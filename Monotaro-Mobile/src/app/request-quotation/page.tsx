"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

function BenefitIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 9h16M8 13h.01M12 13h.01M16 13h.01" /></>,
    headset: <><path d="M4 13a8 8 0 0 1 16 0" /><path d="M4 13v4a2 2 0 0 0 2 2h1v-6H4ZM20 13v4a2 2 0 0 1-2 2h-1v-6h3Z" /><path d="M15 19h1" /></>,
    product: <><circle cx="12" cy="12" r="8" /><path d="M12 8v8M9 11h4a2 2 0 1 0 0-4H9v10" /></>,
    users: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 20a6 6 0 0 1 12 0M15 15a5 5 0 0 1 6 5" /></>,
    handshake: <><path d="m4 12 3-3 4 2 3-3 6 4-5 7-4-3-3 2-4-6Z" /><path d="m7 9 3 3M14 8l-3 3" /></>,
  };
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function RequestQuotationPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const en = language === "en";

  const BENEFITS: [string, string][] = [
    ["calendar", en
      ? "Product prices listed on the quotation are valid for 30 days from the date the quotation is created."
      : "Harga produk yang tercantum pada quotation berlaku selama 30 hari sejak quotation dibuat."],
    ["headset", en
      ? "Support from our CS Admin team who will help find all the products you are interested in without having to search one by one."
      : "Dukungan tim CS Admin yang akan membantu menemukan semua produk yang Anda minati tanpa perlu mencarinya satu per satu."],
    ["product", en
      ? "If the product you are looking for is discontinued or out of stock, the Product Advisor team will provide the most suitable alternative product recommendations for your needs."
      : "Jika produk yang Anda cari discontinue atau habis terjual, tim Product Advisor akan memberikan rekomendasi produk alternatif paling sesuai kebutuhan Anda."],
    ["users", en
      ? "Support from our Product Specialist team for products you are interested in but are not yet available on monotaro.id."
      : "Dukungan tim Product Specialist untuk produk yang Anda minati, namun belum tersedia di monotaro.id."],
    ["handshake", en
      ? "Opportunity to negotiate prices for large-scale purchases."
      : "Kesempatan untuk bisa mengajukan negosiasi harga untuk pembelian dengan skala besar."],
  ];

  const TABLE_ROWS: [string, string][] = [
    ["&lt;10", en ? "1 business day" : "1 hari kerja"],
    ["10 - 50", en ? "2 business days" : "2 hari kerja"],
    ["50 - 100", en ? "3 business days" : "3 hari kerja"],
    ["100 - 300", en ? "5 business days" : "5 hari kerja"],
    ["&gt;300", en ? "Contact our CS team for more information" : "Hubungi tim CS untuk info lebih lanjut"],
  ];

  return (
    <main className="min-h-dvh bg-white pb-8">
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 bg-brand px-4 py-4 text-white shadow-md rounded-b-3xl">
        <button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-sm font-bold">Request for Quotation (RFQ)</h1>
      </header>

      <section className="px-3 py-5 pt-[76px]">
        <h2 className="mb-5 text-center text-xl font-bold text-neutral-800">Request for Quotation (RFQ)</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {BENEFITS.map(([icon, text]) => (
            <article key={icon} className="flex items-center gap-3 rounded-[10px] border border-neutral-200 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                <BenefitIcon name={icon} />
              </div>
              <p className="text-left text-xs leading-relaxed text-neutral-700">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          <button type="button" className="rounded-[6px] bg-red-600 px-5 py-3 text-xs font-bold text-white">
            {en ? "Upload File" : "Upload File"}
          </button>
          <button type="button" className="rounded-[6px] border border-neutral-300 bg-white px-5 py-3 text-xs font-bold text-neutral-800">
            {en ? "Input Product" : "Input Produk"}
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-neutral-600">
          {en
            ? <>For terms and conditions read more <button type="button" onClick={() => router.push("/syarat-ketentuan")} className="text-blue-600 underline underline-offset-2">here</button></>
            : <>Untuk syarat dan ketentuan baca selengkapnya <button type="button" onClick={() => router.push("/syarat-ketentuan")} className="text-blue-600 underline underline-offset-2">di sini</button></>
          }
        </p>

        <section className="mt-6 rounded-[10px] bg-violet-50 p-4 shadow-sm">
          <label className="text-sm font-semibold text-neutral-800">
            {en ? "File Upload" : "File Upload"} <span className="text-red-500">*</span>
            <div className="mt-3 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded border border-dashed border-neutral-500 bg-white text-center">
              <span className="text-2xl text-neutral-400">↑</span>
              <span className="text-sm font-bold">{en ? "Browse Files" : "Browse Files"}</span>
              <span className="text-xs text-neutral-500">{en ? "Drag and drop files here" : "Drag and drop files here"}</span>
              <input type="file" accept=".doc,.docx,.xls,.xlsx,.csv" className="hidden" />
            </div>
          </label>
          <p className="mt-2 text-[10px] text-neutral-600">doc, docx, xls, xlsx, csv</p>
          <div className="mt-5 border-t border-neutral-200 pt-5 text-center">
            <button type="button" className="rounded-[6px] bg-red-600 px-5 py-3 text-xs font-bold text-white">
              {en ? "Send Request" : "kirim Permintaan"}
            </button>
          </div>
        </section>

        <section className="mt-7 text-xs leading-relaxed text-neutral-700">
          <h2 className="mb-3 text-sm font-bold text-neutral-900">
            {en ? "Important to know:" : "Penting untuk diketahui :"}
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            {en ? <>
              <li>Only applicable to Business account types.</li>
              <li>Our CS team requires varying amounts of time to process quotation requests depending on the number of products requested.</li>
              <li>We reserve the right to refuse to provide a price offer letter if any discrepancy with company policy is found.</li>
              <li>If you need a faster process, use the Online Quotation feature.</li>
            </> : <>
              <li>Hanya berlaku untuk tipe akun Bisnis.</li>
              <li>Tim CS kami membutuhkan waktu yang bervariasi untuk memproses permintaan penawaran tergantung dari jumlah produk yang diminta.</li>
              <li>Kami berhak menolak memberikan surat penawaran jika ditemukan ketidaksesuaian dengan kebijakan perusahaan.</li>
              <li>Jika membutuhkan proses yang lebih cepat, gunakan fitur Online Quotation.</li>
            </>}
          </ul>

          <table className="mt-5 w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="border border-neutral-300 bg-neutral-100 p-2">{en ? "Number of Items" : "Jumlah Barang"}</th>
                <th className="border border-neutral-300 bg-neutral-100 p-2">{en ? "Processing Time" : "Waktu Proses"}</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(([amount, time]) => (
                <tr key={amount}>
                  <td className="border border-neutral-300 p-2" dangerouslySetInnerHTML={{ __html: amount }} />
                  <td className="border border-neutral-300 p-2">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </main>
  );
}
