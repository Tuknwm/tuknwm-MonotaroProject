"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeBottomNav() {
  const router = useRouter();
  const { t } = useLanguage();
  const go = (section: string) => {
    if (section === "kategori") sessionStorage.setItem("home_section", "kategori");
    if (section === "keranjang") sessionStorage.setItem("open_keranjang", "1");
    if (section === "akun") sessionStorage.setItem("open_account", "1");
    router.push(section === "quotation" ? "/quotation" : "/");
  };
  const items: [string, string, string][] = [["home", t("nav.home"), "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"], ["kategori", t("nav.category"), "M3.5 3.5h7v7h-7zM13.5 3.5h7v7h-7zM3.5 13.5h7v7h-7zM13.5 13.5h7v7h-7z"], ["quotation", t("nav.quotation"), "M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8zM14 3v5h5M9 13h6M9 17h4"], ["keranjang", t("nav.cart"), "M3 4h2l2.4 11h10.8L21 7.5H6.1M9 19.5a1.25 1.25 0 1 0 0 .1M17 19.5a1.25 1.25 0 1 0 0 .1"], ["akun", t("nav.account"), "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M4.5 21a7.5 7.5 0 0 1 15 0"]];
  return <nav style={{ position: "fixed", bottom: "calc(20px + env(safe-area-inset-bottom))", left: "50%", transform: "translateX(-50%)" }} className="z-[100] flex w-[calc(100%-40px)] max-w-[390px] rounded-full bg-white p-1 shadow-[0_6px_24px_rgba(0,0,0,0.12)]" aria-label="Navigasi utama">{items.map(([section, label, path]) => <button key={section} type="button" onClick={() => go(section)} className="flex-1 flex flex-col items-center gap-1 py-2 rounded-[18px] text-[10px] font-semibold text-neutral-500"><svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg><span className="leading-none">{label}</span></button>)}</nav>;
}
