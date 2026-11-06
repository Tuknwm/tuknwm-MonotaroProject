"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function AccountSettingsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email") ?? "";
    const savedName = localStorage.getItem("user_name");
    setEmail(savedEmail);
    if (savedName) {
      setNama(savedName);
    } else if (savedEmail) {
      const localPart = savedEmail.split("@")[0];
      setNama(localPart.charAt(0).toUpperCase() + localPart.slice(1));
    }
  }, []);

  return (
    <main className="min-h-dvh">
      <header className="relative flex items-center border-b border-neutral-200 bg-white px-4 py-3">
        <button type="button" aria-label={t("common.back")} onClick={() => router.push("/setting")} className="text-neutral-500">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <img src="/Logo.png" alt="monotaro.id" className="absolute left-1/2 top-1/2 h-7 w-auto -translate-x-1/2 -translate-y-1/2 object-contain" />
      </header>

      <div className="page-content px-5 py-6 flex flex-col gap-6">

        {/* Informasi Akun */}
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">Informasi Akun</p>
          <div className="rounded-xl bg-white divide-y divide-neutral-100 shadow-sm">

            {/* Informasi Kontak */}
            <div className="px-4 py-4">
              <p className="text-sm font-bold text-neutral-900 mb-3">Informasi Kontak</p>
              <div className="flex flex-col gap-1.5 mb-3">
                <InfoRow label="Nama" value={nama || "—"} />
                <InfoRow label="Surel" value={email || "—"} />
                <InfoRow label="Password" value="••••••" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => router.push("/setting/akun/info")} className="text-xs font-semibold text-neutral-900 bg-white rounded-[8px] px-4 py-2.5 transition-colors" style={{boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"}}>
                  Ubah
                </button>
              </div>
            </div>

            {/* Newsletters */}
            <div className="px-4 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-neutral-900 mb-0.5">Newsletters</p>
                <p className="text-xs text-neutral-500">Newsletter &amp; WA channel</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={newsletter}
                onClick={() => setNewsletter(!newsletter)}
                className={`relative shrink-0 w-12 h-6 rounded-full transition-colors duration-200 ${newsletter ? "bg-brand" : "bg-neutral-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${newsletter ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Alamat */}
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">Alamat</p>
          <div className="rounded-xl bg-white divide-y divide-neutral-100 shadow-sm">

            <div className="px-4 py-4">
              <p className="text-sm font-bold text-neutral-900 mb-1">Penagihan Utama</p>
              <p className="text-xs text-neutral-500 mb-3">Anda belum memiliki alamat tagihan utama</p>
              <button type="button" onClick={() => router.push("/setting/akun/alamat")} className="text-xs font-semibold text-neutral-900 bg-white rounded-[8px] px-4 py-2.5 transition-colors" style={{boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"}}>
                Tambah Alamat
              </button>
            </div>

            <div className="px-4 py-4">
              <p className="text-sm font-bold text-neutral-900 mb-1">Pengiriman Utama</p>
              <p className="text-xs text-neutral-500 mb-3">Anda belum memiliki alamat pengiriman utama</p>
              <button type="button" onClick={() => router.push("/setting/akun/alamat")} className="text-xs font-semibold text-neutral-900 bg-white rounded-[8px] px-4 py-2.5 transition-colors" style={{boxShadow:"0 0 8px 2px rgba(0,0,0,0.10)"}}>
                Ubah Alamat
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-xs text-neutral-500 w-20 shrink-0">{label}</span>
      <span className="text-sm text-neutral-600">{value}</span>
    </div>
  );
}
