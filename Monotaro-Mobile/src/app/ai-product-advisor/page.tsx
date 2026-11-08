"use client";

import { useRouter } from "next/navigation";

export default function AiProductAdvisorPage() {
  const router = useRouter();

  return (
    <main className="min-h-dvh bg-white pb-8">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-4 text-neutral-800 shadow-sm">
        <button type="button" onClick={() => router.back()} aria-label="Kembali" className="text-neutral-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-sm font-bold">AI-Product Advisor</h1>
      </header>

      <article className="px-4 py-5 text-sm leading-relaxed text-neutral-800">
        <h2 className="text-xl font-bold">Apa itu Mosa AI?</h2>
        <div className="mt-4 flex items-center gap-4">
          <img src="/Ai-ProductAdvisor/mosa_ai_product_advisor.avif" alt="Mosa AI" className="h-24 w-24 shrink-0 object-contain" />
          <p>Mosa AI adalah fitur Chatbot Product Advisor berbasis AI yang didukung oleh teknologi ChatGPT dari OpenAI. Mosa AI dapat membantu pengguna dalam pencarian produk melalui kanal WhatsApp sehingga memberikan kemudahan, kepraktisan dan kecepatan dalam pencarian produk. Serta memberikan pengalaman berbelanja yang lebih menarik, kaya informasi dan terpersonalisasi.</p>
        </div>

        <hr className="my-7 border-neutral-300" />
        <h2 className="text-base font-bold">Apa kegunaan Mosa AI?</h2>
        <p className="mt-4">Mosa AI mampu merespon pertanyaan pengguna secara cerdas, cepat dan responsif, sehingga akan bertindak sebagai asisten belanja pelanggan, dengan memberikan rekomendasi produk yang terbaik. Setelah Mosa AI mendapatkan cukup informasi produk dari input pelanggan, Mosa AI akan melakukan pencarian dan memberikan jawaban berupa rekomendasi produk-produk terkait.</p>

        <hr className="my-7 border-neutral-300" />
        <h2 className="text-base font-bold">Bagaimana Cara Mengakses Mosa AI?</h2>
        <p className="mt-4">Mosa AI dapat diakses melalui langkah-langkah berikut:</p>
        <p className="mt-3">1. Klik tombol AI-Product Advisor yang ada di pojok kanan bawah di website monotaro.id.</p>
        <img src="/Ai-ProductAdvisor/step1.avif" alt="Langkah pertama mengakses Mosa AI" className="mt-3 w-full rounded-lg object-contain" />
        <p className="mt-4">2. Lalu klik tombol <b>Tanya Produk Sekarang</b> pada popup AI-Product Advisor.</p>
        <img src="/Ai-ProductAdvisor/step2.avif" alt="Langkah kedua mengakses Mosa AI" className="mt-3 w-full rounded-lg object-contain" />
        <p className="mt-4">3. Anda akan diarahkan ke aplikasi WhatsApp untuk memulai pencarian produk dengan Mosa AI.</p>
        <img src="/Ai-ProductAdvisor/step3.avif" alt="Langkah ketiga mengakses Mosa AI" className="mt-3 w-full rounded-lg object-contain" />

        <p className="mt-6"><b>Note:</b><br />- Cukup masukkan nama produk/tipe produk/nama brand/model number produk<br />- Untuk pertanyaan selain produk, silakan hubungi tim CS kami.</p>
        <hr className="my-7 border-neutral-300" />
        <h2 className="text-base font-bold">Apakah Mosa AI dapat mengetahui, menunjukkan, mengambil, atau membagikan informasi pribadi saya?</h2>
        <p className="mt-4">Tidak, tidak ada informasi identitas pribadi yang tersimpan di dalam Mosa AI. Pengguna juga tidak diperkenankan membagikan informasi identitas pribadi di dalam dan selama menggunakan Mosa AI.</p>
      </article>
    </main>
  );
}
