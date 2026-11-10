"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function SaranKritikPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const captchaCode = "S7cR3v";

  function submitFeedback(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (captchaInput.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setCaptchaError(t("feedback.captcha_error"));
      return;
    }
    setCaptchaError("");
  }

  return (
    <main className="min-h-dvh bg-white pb-8 pt-[72px]">
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 rounded-b-3xl bg-brand px-4 py-4 text-white shadow-md">
        <button type="button" onClick={() => router.back()} aria-label="Kembali" className="text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button>
        <h1 className="text-sm font-bold">{t("feedback.title")}</h1>
      </header>
      <form className="mx-4 py-6" onSubmit={submitFeedback}>
        <div className="text-center">
          <h2 className="text-xl font-bold text-neutral-700">{t("feedback.heading")}</h2>
          <p className="mt-2 text-sm text-neutral-600">{t("feedback.subtitle")}</p>
        </div>
        <hr className="my-6 border-neutral-200" />
        <div className="space-y-5">
          <label className="block text-xs font-semibold text-neutral-700">E-mail <span className="text-red-500">*</span><input type="email" required className="mt-2 w-full rounded border border-neutral-300 px-3 py-2.5 font-normal outline-none focus:border-brand" /></label>
          <label className="block text-xs font-semibold text-neutral-700">{t("feedback.type_label")}<select className="mt-2 w-full rounded border border-neutral-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-brand"><option>{t("feedback.select_type")}</option><option>{t("feedback.suggestion")}</option><option>{t("feedback.criticism")}</option><option>{t("feedback.question")}</option></select></label>
          <label className="block text-xs font-semibold text-neutral-700">{t("feedback.message_label")} <span className="text-red-500">*</span><textarea required rows={5} className="mt-2 w-full rounded border border-neutral-300 px-3 py-2.5 font-normal outline-none focus:border-brand" /></label>
          <label className="block text-xs font-semibold text-neutral-700">{t("feedback.attachment_label")}<input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="mt-2 block w-full text-xs font-normal text-neutral-600 file:mr-3 file:rounded file:border file:border-neutral-300 file:bg-white file:px-3 file:py-2 file:text-xs" /><span className="mt-1 block text-[10px] font-normal text-neutral-400">File dalam format: pdf, doc, docx, jpg, jpeg, png (max. 2mb)</span></label>
          <fieldset><legend className="text-xs font-semibold text-neutral-700">{t("feedback.experience_label")}</legend><div className="mt-3 flex items-center justify-between gap-2 text-xs text-neutral-600"><span>Worst</span>{[1, 2, 3, 4, 5].map((value) => <label key={value} className="flex flex-col items-center gap-1"><span>{value}</span><input type="radio" name="rating" checked={rating === value} onChange={() => setRating(value)} /></label>)}<span>Best</span></div></fieldset>
          <label className="block text-xs font-semibold text-neutral-700">{t("feedback.captcha_label")} <span className="text-red-500">*</span>
            <div className="mt-2 flex items-center gap-2">
              <div className="relative flex h-12 flex-1 items-center justify-center overflow-hidden rounded border border-neutral-300 bg-neutral-100 text-lg font-bold tracking-[0.35em] text-neutral-700">
                <span className="absolute inset-x-2 top-1/2 h-px rotate-[-7deg] bg-red-400/70" />
                <span className="absolute inset-x-3 top-1/3 h-px rotate-[9deg] bg-blue-400/60" />
                <span className="relative italic">{captchaCode}</span>
              </div>
              <input required value={captchaInput} onChange={(event) => { setCaptchaInput(event.target.value); setCaptchaError(""); }} className="w-32 rounded border border-neutral-300 px-3 py-2.5 font-normal outline-none focus:border-brand" placeholder="Kode" />
            </div>
            {captchaError && <span className="mt-1 block text-[10px] font-normal text-red-500">{captchaError}</span>}
          </label>
          <button type="submit" className="w-full rounded bg-brand px-4 py-3 text-sm font-bold text-white">{t("feedback.submit_btn")}</button>
        </div>
      </form>
    </main>
  );
}
