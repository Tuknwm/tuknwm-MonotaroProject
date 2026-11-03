"use client";

import { useRouter } from "next/navigation";
import CustomSelect from "@/components/CustomSelect";
import { useLanguage } from "@/context/LanguageContext";

export default function SettingPage() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();

  function backToAccountSection() {
    sessionStorage.setItem("open_account", "1");
    router.push("/");
  }

  const selectedOptionValue = language === "en" ? "English" : "Bahasa Indonesia";

  const handleLanguageChange = (val: string) => {
    if (val === "English") {
      setLanguage("en");
    } else {
      setLanguage("id");
    }
  };

  return (
    <main className="min-h-dvh bg-neutral-50">
      <header className="relative flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-3">
        <button type="button" aria-label={t("common.back")} onClick={backToAccountSection} className="text-neutral-500">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Logo.png" alt="monotaro.id" className="absolute left-1/2 top-1/2 h-7 w-auto -translate-x-1/2 -translate-y-1/2 object-contain" />
      </header>
      <h1 className="px-4 pt-5 text-lg font-extrabold text-neutral-900">{t("settings.title")}</h1>
      <div className="flex flex-col gap-3 px-4 py-5">
        <button type="button" onClick={() => router.push("/setting/akun")} className="flex items-center justify-between gap-4 rounded-[8px] border border-neutral-200 bg-white px-4 py-4 text-left">
          <span><span className="block text-sm font-bold text-neutral-900">{t("settings.account")}</span><span className="mt-1 block text-xs text-neutral-500">{t("settings.account_sub")}</span></span>
          <svg className="h-4 w-4 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
        </button>
        <button type="button" onClick={() => router.push("/setting/akun")} className="flex items-center justify-between gap-4 rounded-[8px] border border-neutral-200 bg-white px-4 py-4 text-left">
          <span><span className="block text-sm font-bold text-neutral-900">{t("settings.account_info")}</span><span className="mt-1 block text-xs text-neutral-500">{t("settings.account_info_sub")}</span></span>
          <svg className="h-4 w-4 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
        </button>
        <button type="button" onClick={() => router.push("/setting/akun")} className="flex items-center justify-between gap-4 rounded-[8px] border border-neutral-200 bg-white px-4 py-4 text-left">
          <span><span className="block text-sm font-bold text-neutral-900">{t("settings.address")}</span><span className="mt-1 block text-xs text-neutral-500">{t("settings.address_sub")}</span></span>
          <svg className="h-4 w-4 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
        </button>
        <button type="button" className="flex items-center justify-between gap-4 rounded-[8px] border border-neutral-200 bg-white px-4 py-4 text-left">
          <span>
            <span className="block text-sm font-bold text-neutral-900">{t("settings.notifications")}</span>
            <span className="mt-1 block text-xs text-neutral-500">{t("settings.notifications_sub")}</span>
          </span>
          <svg className="h-4 w-4 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
        </button>
        <div className="flex items-center justify-between gap-4 rounded-[8px] border border-neutral-200 bg-white px-4 py-4 text-left">
          <span>
            <span className="block text-sm font-bold text-neutral-900">{t("settings.language")}</span>
            <span className="mt-1 block text-xs text-neutral-500">{t("settings.language_sub")}</span>
          </span>
          <CustomSelect
            options={["Bahasa Indonesia", "English"]}
            value={selectedOptionValue}
            onChange={handleLanguageChange}
            className="w-44"
          />
        </div>
        <button type="button" className="flex items-center justify-between gap-4 rounded-[8px] border border-neutral-200 bg-white px-4 py-4 text-left">
          <span>
            <span className="block text-sm font-bold text-neutral-900">{t("settings.privacy")}</span>
            <span className="mt-1 block text-xs text-neutral-500">{t("settings.privacy_sub")}</span>
          </span>
          <svg className="h-4 w-4 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
        </button>
        <button type="button" className="flex items-center justify-between gap-4 rounded-[8px] border border-neutral-200 bg-white px-4 py-4 text-left">
          <span><span className="block text-sm font-bold text-neutral-900">{t("settings.quotation")}</span><span className="mt-1 block text-xs text-neutral-500">{t("settings.quotation_sub")}</span></span>
          <svg className="h-4 w-4 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
        </button>
        <button type="button" onClick={() => { localStorage.removeItem("logged_in"); localStorage.removeItem("user_email"); sessionStorage.setItem("open_account", "1"); router.push("/"); }} className="mt-2 w-full rounded-[8px] border border-brand py-3 text-sm font-bold text-brand active:bg-red-50">{t("account.logout")}</button>
      </div>
    </main>
  );
}
