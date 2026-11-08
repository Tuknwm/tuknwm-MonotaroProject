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
    <div className="min-h-dvh">
      <header className="relative flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-3">
        <button type="button" aria-label={t("common.back")} onClick={backToAccountSection} className="text-neutral-500">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Logo.png" alt="monotaro.id" className="absolute left-1/2 top-1/2 h-7 w-auto -translate-x-1/2 -translate-y-1/2 object-contain" />
      </header>
      <div className="page-content">
      <h1 className="px-4 pt-5 text-lg font-extrabold text-neutral-900">{t("settings.title")}</h1>
      <div className="flex flex-col gap-3 px-4 py-5">
        <button type="button" onClick={() => router.push("/setting/akun")} className="flex items-center justify-between gap-4 rounded-[8px] border border-neutral-200 bg-white px-4 py-4 text-left">
          <span><span className="block text-sm font-bold text-neutral-900">{t("settings.account_dashboard")}</span><span className="mt-1 block text-xs text-neutral-500">{t("settings.account_sub")}</span></span>
          <svg className="h-4 w-4 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
        </button>
        <button type="button" onClick={() => router.push("/setting/akun/info")} className="flex items-center justify-between gap-4 rounded-[8px] border border-neutral-200 bg-white px-4 py-4 text-left">
          <span><span className="block text-sm font-bold text-neutral-900">{t("settings.account_info")}</span><span className="mt-1 block text-xs text-neutral-500">{t("settings.account_info_sub")}</span></span>
          <svg className="h-4 w-4 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
        </button>
        <button type="button" onClick={() => router.push("/setting/akun/alamat")} className="flex items-center justify-between gap-4 rounded-[8px] border border-neutral-200 bg-white px-4 py-4 text-left">
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
        <button type="button" onClick={() => { localStorage.removeItem("logged_in"); localStorage.removeItem("user_email"); sessionStorage.setItem("open_account", "1"); router.push("/"); }} className="mt-2 w-full rounded-[8px] border border-brand py-3 text-sm font-bold text-brand active:bg-red-50">{t("account.logout")}</button>
        <div className="mt-4 flex flex-col items-center gap-2 pb-2">
          <p className="text-xs text-neutral-400">Monotaro Mobile Project</p>
          <a href="https://monotaro.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-brand hover:underline">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              monotaro.id<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>
            </a>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Tuknwm/tuknwm-MonotaroProject" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
            <a href="mailto:kurokyu.project@gmail.com" className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              kurokyu.project@gmail.com
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
