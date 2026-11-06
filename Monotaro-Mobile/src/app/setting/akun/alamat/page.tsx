"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function AlamatPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [namaPenerima, setNamaPenerima] = useState("");
  const [telepon, setTelepon] = useState("");
  const [kota, setKota] = useState("");
  const [detail, setDetail] = useState("");

  const isValid = namaPenerima.trim() !== "" && telepon.trim() !== "" && kota.trim().length >= 3 && detail.trim() !== "";

  return (
    <main className="min-h-dvh">
      <header className="relative flex items-center border-b border-neutral-200 bg-white px-4 py-3">
        <button type="button" aria-label={t("common.back")} onClick={() => router.back()} className="text-neutral-500">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Logo.png" alt="monotaro.id" className="absolute left-1/2 top-1/2 h-7 w-auto -translate-x-1/2 -translate-y-1/2 object-contain" />
      </header>

      <form onSubmit={(e) => e.preventDefault()} className="page-content px-5 py-6 flex flex-col gap-6">

        <section className="flex flex-col gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">Alamat Pengiriman</p>
          <hr className="border-neutral-200" />

          <Row label="Nama Penerima" required>
            <input type="text" value={namaPenerima} onChange={(e) => setNamaPenerima(e.target.value)} placeholder="Nama Penerima" className="field" />
          </Row>

          <Row label="Nama Perusahaan">
            <input type="text" placeholder="Masukkan nama perusahaan" className="field" />
          </Row>

          <Row label="Nomor Handphone/Telp." required>
            <input type="tel" value={telepon} onChange={(e) => setTelepon(e.target.value)} placeholder="Contoh: 08000000000 atau 021556789" className="field" />
          </Row>

          <Row label="Kota/Kabupaten/Kecamatan/Kode Pos" required>
            <input type="text" value={kota} onChange={(e) => setKota(e.target.value)} placeholder="Masukkan 3 atau lebih karakter" className="field" />
          </Row>

          <Row label="Detail Alamat" required>
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Contoh: Wisma BNI 46 Lt. 6, Jl. Jenderal Sudirman No.Kav. 1, RT.1/RW.8, Karet Tengsin"
              className="field min-h-[90px] resize-none"
            />
          </Row>
        </section>

        <div className="pb-6 flex justify-end">
          <button type="submit" disabled={!isValid} className={`text-xs font-semibold rounded-[8px] px-4 py-2.5 transition-colors ${isValid ? "text-neutral-900 bg-white" : "text-neutral-400 bg-neutral-100 cursor-not-allowed"}`} style={isValid ? {boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"} : undefined}>
            Simpan Alamat
          </button>
        </div>

      </form>
    </main>
  );
}

function Row({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold text-neutral-800">
        {label}{required && <span className="text-brand ml-0.5">*</span>}
      </span>
      {children}
    </div>
  );
}
