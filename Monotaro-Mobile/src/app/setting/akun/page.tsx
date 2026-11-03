"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import { useLanguage } from "@/context/LanguageContext";

const KLASIFIKASI_ID = ["Manufaktur", "Konstruksi", "Pertambangan", "Otomotif", "Kesehatan", "Pendidikan", "Lainnya"];
const KLASIFIKASI_EN = ["Manufacturing", "Construction", "Mining", "Automotive", "Healthcare", "Education", "Others"];
const JUMLAH_KARYAWAN = ["1–10", "11–50", "51–200", "201–500", "500+"];
const JENIS_PERUSAHAAN = [
  { value: "PT", label: "PT" },
  { value: "CV", label: "CV" },
  { value: "UD", label: "UD" },
  { value: "Lainnya", label: "Lainnya" },
];

export default function AccountSettingsPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [ubahPassword, setUbahPassword] = useState(false);
  const [akunBisnis, setAkunBisnis] = useState(false);
  const [jenisPerusahaan, setJenisPerusahaan] = useState("");
  const [klasifikasi, setKlasifikasi] = useState("");
  const [subKlasifikasi, setSubKlasifikasi] = useState("");
  const [jumlahKaryawan, setJumlahKaryawan] = useState("");
  const [email, setEmail] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");

  const klasifikasiOptions = language === "en" ? KLASIFIKASI_EN : KLASIFIKASI_ID;

  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email") ?? "";
    const savedName = localStorage.getItem("user_name");
    setEmail(savedEmail);
    if (savedName) {
      setNamaLengkap(savedName);
    } else if (savedEmail) {
      const localPart = savedEmail.split("@")[0];
      setNamaLengkap(localPart.charAt(0).toUpperCase() + localPart.slice(1));
    }
  }, []);

  return (
    <main className="min-h-dvh bg-white">
      <header className="relative flex items-center border-b border-neutral-200 bg-white px-4 py-3">
        <button type="button" aria-label={t("common.back")} onClick={() => router.push("/setting")} className="text-neutral-500">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Logo.png" alt="monotaro.id" className="absolute left-1/2 top-1/2 h-7 w-auto -translate-x-1/2 -translate-y-1/2 object-contain" />
      </header>

      <form onSubmit={(e) => e.preventDefault()} className="px-6 py-5 flex flex-col gap-6">

        {/* Section 1 — Akun Individu */}
        <div>
          <h2 className="text-sm font-bold text-amber-600 border-b border-amber-400 pb-1 mb-3">{t("account.individual_account")}</h2>

          <label className="flex items-center gap-2 text-sm font-semibold text-neutral-800 mb-4 cursor-pointer">
            <input type="checkbox" checked={akunBisnis} onChange={(e) => setAkunBisnis(e.target.checked)} className="accent-brand w-4 h-4" />
            {t("account.switch_business")}
          </label>

          {/* Step 1 */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-neutral-700 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
            <span className="text-sm font-semibold text-neutral-700">{t("account.login_id")}</span>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <Row label={t("account.email_login_id")} required>
              <input type="email" value={email} readOnly className="field bg-neutral-100 text-neutral-500 cursor-not-allowed" />
            </Row>

            <label className="flex items-center gap-2 text-sm font-semibold text-neutral-800 cursor-pointer">
              <input type="checkbox" checked={ubahPassword} onChange={(e) => setUbahPassword(e.target.checked)} className="accent-brand w-4 h-4" />
              {t("account.change_password")}
            </label>

            {ubahPassword && <>
              <Row label={t("account.old_password")} required><input type="password" placeholder={t("account.old_password")} className="field" /></Row>
              <Row label={t("account.new_password")} required><input type="password" placeholder={t("account.new_password")} className="field" /></Row>
              <Row label={t("account.confirm_password")} required><input type="password" placeholder={t("account.confirm_password")} className="field" /></Row>
            </>}
          </div>

          <hr className="border-neutral-200 mb-4" />

          {/* Step 2 */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-neutral-700 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
            <span className="text-sm font-semibold text-amber-600">{t("account.my_info")}</span>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <Row label={t("account.company_name")} sub={t("account.optional")}>
              <div className="flex gap-2">
                <CustomSelect
                  className="flex-1"
                  options={JENIS_PERUSAHAAN}
                  value={jenisPerusahaan}
                  onChange={setJenisPerusahaan}
                  placeholder={t("account.select_entity")}
                />
                <input type="text" placeholder={t("account.company_name")} className="field flex-1" />
              </div>
            </Row>
            <Row label={t("account.department")} sub={t("account.optional")}>
              <input type="text" placeholder={t("account.department")} className="field" />
            </Row>
            <Row label={t("account.fullname")} required>
              <input
                type="text"
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                placeholder={t("account.fullname")}
                className="field"
              />
            </Row>
            <Row label={t("account.phone")} required>
              <div className="flex gap-2">
                <input type="tel" placeholder="08000000000 / 021556789" className="field flex-1" />
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-xs font-semibold text-neutral-700">{t("account.telephone")}</span>
                  <input type="tel" placeholder="0215255280" className="field w-36" />
                </div>
              </div>
            </Row>
          </div>

          <hr className="border-neutral-200 mb-4" />

          {/* Step 3 */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-neutral-700 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
            <span className="text-sm font-semibold text-amber-600">{t("account.my_company_info")}</span>
          </div>

          <div className="flex flex-col gap-3">
            <Row label={t("account.business_class")} sub={t("account.optional")}>
              <CustomSelect
                options={klasifikasiOptions}
                value={klasifikasi}
                onChange={(val) => {
                  setKlasifikasi(val);
                  setSubKlasifikasi("");
                }}
                placeholder={t("account.select_business_class")}
              />
            </Row>
            <Row label={t("account.sub_business_class")} sub={t("account.optional")}>
              <CustomSelect
                options={[]}
                value={subKlasifikasi}
                onChange={setSubKlasifikasi}
                disabled={!klasifikasi}
                placeholder={klasifikasi ? t("account.select_sub_class") : t("account.select_category_first")}
              />
            </Row>
            <Row label={t("account.employee_count")} sub={t("account.optional")}>
              <CustomSelect
                options={JUMLAH_KARYAWAN}
                value={jumlahKaryawan}
                onChange={setJumlahKaryawan}
                placeholder={t("account.select_employee_count")}
              />
            </Row>
          </div>
        </div>

        {/* Footer note + save */}
        <div className="flex items-center justify-between gap-3 pt-2 pb-6">
          <p className="text-[11px] text-neutral-600 leading-relaxed flex-1">
            <span className="font-bold">{t("account.note")}</span> {t("account.note_npwp")}
          </p>
          <button type="submit" className="shrink-0 bg-brand text-white text-sm font-bold px-6 py-2.5 rounded-[6px]">{t("account.save")}</button>
        </div>
      </form>
    </main>
  );
}

function Row({ label, sub, required, children }: { label: string; sub?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold text-neutral-800">
        {label}{required && <span className="text-brand ml-0.5">*</span>}
        {sub && <span className="text-amber-500 font-normal ml-1">{sub}</span>}
      </span>
      {children}
    </div>
  );
}
