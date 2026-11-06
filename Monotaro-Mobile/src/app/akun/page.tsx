"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { POPULAR } from "@/app/data";
import CustomSelect from "@/components/CustomSelect";
import { useLanguage } from "@/context/LanguageContext";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21">
      <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
      <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
      <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
    </svg>
  );
}

function SupportInfo() {
  return (
    <div className="mt-4 w-full rounded-[8px] border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-left">
      <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e60012" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14a8 8 0 0 1 16 0" /><path d="M4 14v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Zm16 0v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" /><path d="M15 19c-.5 1-1.5 1.5-3 1.5" />
        </svg>
        Butuh bantuan? Hubungi CS kami
      </div>
      <div className="mt-2 flex flex-col gap-1 text-[10px] leading-relaxed text-neutral-600">
        <div className="flex items-start gap-2">
          <svg className="mt-0.5 shrink-0 text-brand" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
          </svg>
          <span>021-3110-6990 | 0855-7467-8400 | cs@monotaro.id | Order via WA</span>
        </div>
        <div className="flex items-start gap-2">
          <svg className="mt-0.5 shrink-0 text-brand" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          <span>Jam Operasional CS: Senin - Jumat | 08.00 - 18.00 WIB</span>
        </div>
      </div>
    </div>
  );
}

function ShippingPromo() {
  return (
    <div className="flex w-full items-center gap-2 rounded-[8px] border border-neutral-300 bg-neutral-50 px-2.5 py-2 text-[10px] leading-snug text-neutral-600">
      <svg className="shrink-0 text-brand" width="28" height="24" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 5h18v13H2zM20 10h5l4 4v4h-9z" /><circle cx="8" cy="19" r="2" /><circle cx="25" cy="19" r="2" /><path d="M24 10v4h5M5 9h6M5 12h4" />
      </svg>
      <p>
        <span className="font-bold text-brand">PROMO GRATIS ONGKIR*</span>{" "}
        ke Jabodetabek, seluruh wilayah Pulau Jawa, Bali &amp; Sumatera*.{" "}
        <span className="font-semibold text-blue-700 underline">Lihat syarat &amp; ketentuan di sini</span>
      </p>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, required, defaultValue, children }: {
  label: string; name?: string; type?: string; placeholder?: string; required?: boolean; defaultValue?: string; children?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const isPass = type === "password";
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-neutral-700">
        {label}{required && <span className="text-brand ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          type={isPass && show ? "text" : type}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-full border border-neutral-300 rounded-[6px] px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand"
        />
        {isPass && (
          <button type="button" onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <EyeIcon open={show} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

function LoginTab({ onSwitch, onLogin }: { onSwitch: () => void; onLogin: (email: string, password: string) => void }) {
  const { t } = useLanguage();
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      onLogin(String(form.get("email") || ""), String(form.get("password") || ""));
    }}>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-xl font-extrabold text-neutral-900">{t("account.already_customer")}</h1>
        <p className="text-xs text-neutral-500">{t("account.login_here")}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Field label={t("account.email")} name="email" type="email" placeholder="contoh@email.com" defaultValue="user@monotaro.id" required />
        <div className="flex flex-col gap-1">
          <Field label={t("account.password")} name="password" type="password" placeholder={t("account.password")} defaultValue="User1234" required />
          <button type="button" className="self-end text-xs font-semibold text-brand">{t("account.forgot_password")}</button>
        </div>
      </div>

      <label className="flex items-start gap-2 text-left text-[11px] text-neutral-500 leading-relaxed cursor-pointer">
        <input type="checkbox" defaultChecked className="mt-0.5 accent-brand shrink-0" />
        <span>
          {t("account.terms_agree")}{" "}
          <a href="#" className="text-brand font-semibold">{t("account.terms_and_conditions")}</a>{" "}
          {t("account.and")}{" "}
          <a href="#" className="text-brand font-semibold">{t("account.privacy_policy")}</a>
        </span>
      </label>

      <button type="submit" className="w-full bg-brand text-white font-bold text-sm py-3 rounded-[8px]">
        {t("account.login")}
      </button>

      <div className="flex items-center gap-3 text-xs text-neutral-400">
        <span className="flex-1 border-t border-neutral-200" />
        {t("account.or_login_with")}
        <span className="flex-1 border-t border-neutral-200" />
      </div>

      <div className="flex flex-col gap-2">
        <button type="button" className="w-full flex items-center justify-center gap-2.5 border border-neutral-300 rounded-[8px] py-2.5 text-sm font-semibold text-neutral-700">
          <GoogleIcon /> Google
        </button>
        <button type="button" className="w-full flex items-center justify-center gap-2.5 border border-neutral-300 rounded-[8px] py-2.5 text-sm font-semibold text-neutral-700">
          <MicrosoftIcon /> Microsoft
        </button>
      </div>

      <p className="text-center text-xs text-neutral-500">
        <span className="font-bold text-neutral-700">{t("account.new_customer")}</span>{" "}
        <button type="button" onClick={onSwitch} className="font-bold text-brand">
          {t("account.register_free")}
        </button>
      </p>

      <SupportInfo />
      <ShippingPromo />

    </form>
  );
}

function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState("user@monotaro.id");
  const [nama, setNama] = useState("Profil Saya");
  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email");
    const savedName = localStorage.getItem("user_name");
    if (savedEmail) {
      setEmail(savedEmail);
      if (savedName) {
        setNama(savedName);
      } else {
        const localPart = savedEmail.split("@")[0];
        setNama(localPart.charAt(0).toUpperCase() + localPart.slice(1));
      }
    }
  }, []);

  const initial = (nama || email || "U").trim().charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-5 px-4 py-6">
      <section className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-100 text-brand text-xl font-extrabold">{initial}</div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-neutral-900">{nama}</h1>
            <p className="mt-0.5 text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" aria-label={t("settings.title")} onClick={() => router.push("/setting")} className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 active:bg-neutral-100">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 1 0-2 3.46l.15.08a2 2 0 0 1 1 1.73v.5a2 2 0 0 1-1 1.73l-.15.08a2 2 0 1 0 2 3.46l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 1 0 2-3.46l-.15-.08a2 2 0 0 1-1-1.73v-.5a2 2 0 0 1 1-1.73l.15-.08a2 2 0 1 0-2-3.46l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </section>

      <section className="rounded-[10px] bg-red-50 px-4 py-4">
        <p className="text-sm font-extrabold text-neutral-900">{t("account.business_banner_title")}</p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-600">{t("account.business_banner_desc")}</p>
        <button type="button" className="mt-3 text-xs font-bold text-brand">{t("account.complete_business_profile")}</button>
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-bold text-neutral-900">{t("account.my_orders")}</h2>
          <button type="button" className="text-xs font-semibold text-brand">{t("account.view_all")}</button>
        </div>
        <div className="grid grid-cols-5 divide-x divide-neutral-200 rounded-[10px] border border-neutral-200 bg-white py-3.5">
          {[
            {
              label: t("account.waiting_confirm"),
              count: 0,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <circle cx="12" cy="14" r="3" />
                  <polyline points="12 13 12 14 13 14" />
                </svg>
              ),
            },
            {
              label: t("account.waiting_payment"),
              count: 1,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              ),
            },
            {
              label: t("account.in_process"),
              count: 0,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              ),
            },
            {
              label: t("account.shipped"),
              count: 0,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14v10Z" />
                  <circle cx="17" cy="18.5" r="2.5" />
                  <circle cx="7" cy="18.5" r="2.5" />
                </svg>
              ),
            },
            {
              label: t("account.cancelled"),
              count: 0,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              ),
            },
          ].map((item) => (
            <button type="button" key={item.label} className="relative flex min-w-0 flex-col items-center gap-1.5 px-0.5 text-center group">
              <div className="relative flex items-center justify-center text-neutral-700 group-hover:text-brand transition-colors">
                {item.icon}
                {item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium leading-tight text-neutral-600 group-hover:text-neutral-900 break-words line-clamp-2 px-0.5">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-bold text-neutral-900">{t("account.other_menus")}</h2>
        </div>
        <div className="grid grid-cols-3 divide-x divide-neutral-200 rounded-[10px] border border-neutral-200 bg-white py-3.5">
          {[
            {
              label: t("account.wishlist"),
              count: 0,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
            },
            {
              label: t("account.quotation"),
              count: 0,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              ),
            },
            {
              label: t("account.reviews"),
              count: 0,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ),
            },
          ].map((item) => (
            <button type="button" key={item.label} className="relative flex min-w-0 flex-col items-center gap-1.5 px-1 text-center group">
              <div className="relative flex items-center justify-center text-neutral-700 group-hover:text-brand transition-colors">
                {item.icon}
                {item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium leading-tight text-neutral-600 group-hover:text-neutral-900">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-neutral-900">Produk Terpopuler</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {POPULAR.slice(0, 8).map((p) => (
            <div key={p.name} className="flex flex-col rounded-[8px] border border-neutral-200 bg-white overflow-hidden">
              <div className={`relative aspect-square w-full ${p.bg ?? "bg-neutral-50"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.icon} alt={p.name} className="w-full h-full object-contain" />
                {p.discount && (
                  <span className="absolute top-2 left-0 bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded-r">
                    {p.discount}
                  </span>
                )}
              </div>
              <div className="p-3 flex flex-col gap-1.5 flex-1">
                <p className="text-[11px] text-neutral-700 leading-snug line-clamp-2 min-h-[30px]">{p.name}</p>
                <div className="mt-auto flex flex-col gap-1">
                  {p.oldPrice && <p className="text-[10px] text-neutral-400 line-through leading-none">{p.oldPrice}</p>}
                  <p className={`text-[13px] font-bold leading-none ${p.oldPrice ? "text-brand" : "text-neutral-900"}`}>{p.price}</p>
                  {p.unit && <p className="text-[10px] text-neutral-500 leading-none">{p.unit}</p>}
                  <div className="flex items-center gap-1 pt-1">
                    <span className="text-[11px] tracking-[-1px] text-orange-500">★★★★★</span>
                    <span className="text-[10px] text-neutral-500">({p.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="divide-y divide-neutral-200 rounded-[10px] border border-neutral-200 bg-white">
        {["Data pribadi", "Alamat pengiriman", "Quotation tersimpan", "FAQ / Tentang Kami", "Bantuan dan pusat layanan"].map((label) => (
          <button type="button" key={label} onClick={() => label === "FAQ / Tentang Kami" && router.push("/faq")} className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm text-neutral-800 active:bg-neutral-50">
            <span>{label}</span>
            <svg className="h-4 w-4 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"/></svg>
          </button>
        ))}
      </section>

    </div>
  );
}

function RegisterTab({ onSwitch, onRegister }: { onSwitch: () => void; onRegister: (email: string, nama?: string) => void }) {
  const { t } = useLanguage();
  const [tipe, setTipe] = useState<"bisnis" | "individu">("bisnis");
  const [isComplete, setIsComplete] = useState(true);

  function checkForm(form: HTMLFormElement) {
    const data = new FormData(form);
    const basicComplete = ["email", "password", "nama", "telepon"].every((name) => String(data.get(name) || "").trim());
    const businessComplete = tipe !== "bisnis" || Boolean(
      String(data.get("badanUsaha") || "").trim() &&
      String(data.get("namaPerusahaan") || "").trim() &&
      String(data.get("klasifikasi") || "").trim()
    );
    setIsComplete(Boolean(basicComplete && businessComplete));
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); if (isComplete) { const fd = new FormData(e.currentTarget); onRegister(String(fd.get("email") ?? ""), String(fd.get("nama") ?? "")); } }} onInput={(e) => checkForm(e.currentTarget)} onChange={(e) => checkForm(e.currentTarget)}>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-xl font-extrabold text-neutral-900">{t("account.new_customer")}</h1>
        <p className="text-xs text-neutral-500">{t("account.register_free")}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Field label={t("account.email")} name="email" type="email" placeholder="contoh@email.com" defaultValue="user2@monotaro.id" required />
        <Field label={t("account.password")} name="password" type="password" placeholder={t("account.password")} defaultValue="User1234" required />
        <Field label={t("account.fullname")} name="nama" placeholder={t("account.fullname")} defaultValue="User Monotaro" required />
        <Field label={t("account.phone")} name="telepon" type="tel" placeholder="08000000000 / 021556789" defaultValue="081234567890" required />

        {/* Tipe Akun */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-neutral-700">{t("account.account_type")}<span className="text-brand ml-0.5">*</span></span>
          <div className="flex gap-4">
            {(["bisnis", "individu"] as const).map((tType) => (
              <label key={tType} className="flex items-center gap-1.5 text-sm text-neutral-700 cursor-pointer">
                <input type="radio" name="tipe" checked={tipe === tType} onChange={() => setTipe(tType)} className="accent-brand" />
                <span>{tType === "bisnis" ? t("account.business") : t("account.individual")}</span>
              </label>
            ))}
          </div>
        </div>

        {tipe === "bisnis" && (
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs font-semibold text-neutral-700 mb-1 block">{t("account.company")}<span className="text-brand ml-0.5">*</span></label>
              <CustomSelect
                name="badanUsaha"
                defaultValue="PT"
                options={["PT", "CV", "UD", "Firma"]}
                placeholder={t("account.business_entity")}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-neutral-700 mb-1 block">&nbsp;</label>
              <input name="namaPerusahaan" type="text" defaultValue="PT Monotaro Indonesia" placeholder={t("account.company_name")} className="w-full border border-neutral-300 rounded-[6px] px-3 py-2.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand" />
            </div>
          </div>
        )}

        {tipe === "bisnis" && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-neutral-700">{t("account.business_class")}<span className="text-brand ml-0.5">*</span></label>
            <CustomSelect
              name="klasifikasi"
              defaultValue="Perdagangan"
              options={["Manufaktur", "Konstruksi", "Perdagangan", "Jasa", "Pertambangan", "Lainnya"]}
              placeholder={t("account.select_business_class")}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs text-neutral-400">
        <span className="flex-1 border-t border-neutral-200" />
        {t("account.or_register_with")}
        <span className="flex-1 border-t border-neutral-200" />
      </div>

      <div className="flex flex-col gap-2">
        <button type="button" className="w-full flex items-center justify-center gap-2.5 border border-neutral-300 rounded-[8px] py-2.5 text-sm font-semibold text-neutral-700">
          <GoogleIcon /> Google
        </button>
        <button type="button" className="w-full flex items-center justify-center gap-2.5 border border-neutral-300 rounded-[8px] py-2.5 text-sm font-semibold text-neutral-700">
          <MicrosoftIcon /> Microsoft
        </button>
      </div>

      {/* Voucher info */}
      <div className="flex items-center justify-between gap-3 bg-neutral-50 border border-neutral-200 rounded-[8px] px-3 py-2.5">
        <p className="text-[11px] text-neutral-600 leading-relaxed flex-1">
          <span className="font-bold text-neutral-900">Diskon 10%</span> untuk pembelanjaan pertama hanya berlaku untuk Akun Bisnis menggunakan kode voucher{" "}
          <span className="font-extrabold text-brand">FIRST10</span>
        </p>
        <button type="button" className="shrink-0 text-[11px] font-bold text-brand border border-brand rounded-[6px] px-2.5 py-1">
          SALIN
        </button>
      </div>

      <button type="submit" disabled={!isComplete} className={`w-full font-bold text-sm py-3 rounded-[8px] transition-colors ${isComplete ? "bg-brand text-white" : "bg-neutral-200 text-neutral-400 cursor-not-allowed"}`}>
        {t("account.register_now")}
      </button>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2 text-[11px] text-neutral-500 leading-relaxed cursor-pointer">
          <input type="checkbox" defaultChecked className="mt-0.5 accent-brand shrink-0" />
          <span>
            {t("account.terms_agree")}{" "}
            <a href="#" className="text-brand font-semibold">{t("account.terms_and_conditions")}</a>{" "}
            {t("account.and")}{" "}
            <a href="#" className="text-brand font-semibold">{t("account.privacy_policy")}</a>
          </span>
        </label>
        <label className="flex items-start gap-2 text-[11px] text-neutral-500 cursor-pointer">
          <input type="checkbox" defaultChecked className="mt-0.5 accent-brand shrink-0" />
          {t("account.subscribe_newsletter")}
        </label>
      </div>

      <p className="text-center text-xs text-neutral-500 pb-2">
        {t("account.already_have_account")}{" "}
        <button type="button" onClick={onSwitch} className="text-brand font-bold">{t("account.login_here_link")}</button>
      </p>

      <SupportInfo />
      <ShippingPromo />
    </form>
  );
}

function InviteScreen({ onMasuk, onDaftar }: { onMasuk: () => void; onDaftar: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-6 text-center">
      {/* Promo banner */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/Ok.webp" alt="Penawaran khusus Monotaro" className="w-[120px] h-[120px] rounded-[12px] object-contain" />

      <p className="px-1 text-center text-sm font-semibold leading-relaxed text-neutral-700">
        {t("account.invite_text")}
      </p>

      {/* CTA row */}
      <div className="w-full flex flex-col items-center gap-2">
        <button onClick={onDaftar} className="w-full max-w-[280px] bg-brand text-white font-bold text-sm py-3 rounded-[8px]">
          {t("account.register_now")}
        </button>
        <button onClick={onMasuk} className="w-full max-w-[280px] border border-neutral-300 text-neutral-700 font-bold text-sm py-3 rounded-[8px]">
          {t("account.already_have_account_login")}
        </button>
      </div>
    </div>
  );
}

const NAV = [
  { label: "Beranda", href: "/", icon: <><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z"/><path d="M9 21V12h6v9"/></> },
  { label: "Quotation", href: "#", icon: <><path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></> },
  { label: "Keranjang", href: "#", badge: 3, icon: <><path d="M3 4h2l2.4 11h10.8L21 7.5H6.1" /><circle cx="9" cy="19.5" r="1.25" /><circle cx="17" cy="19.5" r="1.25" /></> },
  { label: "Akun", href: "/akun", active: true, icon: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></> },
];

export function AkunContent({ onBack }: { onBack?: () => void }) {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [view, setView] = useState<"idle" | "invite" | "profile" | "masuk" | "daftar">("idle");
  const router = useRouter();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const mode = searchParams.get("mode") || sessionStorage.getItem("akun_mode");
    if (onBack) {
      setView(mode ? (mode === "daftar" ? "daftar" : "masuk") : (localStorage.getItem("logged_in") ? "profile" : "invite"));
      setTab(mode === "daftar" ? "daftar" : "masuk");
    } else {
      sessionStorage.removeItem("akun_mode");
      setView(mode === "daftar" ? "daftar" : "masuk");
      setTab(mode === "daftar" ? "daftar" : "masuk");
    }
  }, [onBack, searchParams]);

  const [tab, setTab] = useState<"masuk" | "daftar">("masuk");

  function goMasuk() {
    if (onBack) {
      sessionStorage.setItem("akun_mode", "masuk");
      router.push("/akun");
    }
    setTab("masuk");
    setView("masuk");
  }
  function goDaftar() {
    if (onBack) {
      sessionStorage.setItem("akun_mode", "daftar");
      router.push("/akun");
    }
    setTab("daftar");
    setView("daftar");
  }
  function handleLogin(email: string, password: string) {
    if (email !== "user@monotaro.id" || password !== "User1234") return;
    localStorage.setItem("logged_in", "1");
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_name", "User Monotaro");
    if (onBack) {
      setView("profile");
    } else {
      sessionStorage.setItem("open_account", "1");
      router.push("/");
    }
  }
  function handleLogout() {
    localStorage.removeItem("logged_in");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    setView(onBack ? "invite" : "masuk");
  }
  function handleRegister(email: string, nama?: string) {
    localStorage.setItem("logged_in", "1");
    localStorage.setItem("user_email", email);
    if (nama) localStorage.setItem("user_name", nama);
    if (onBack) {
      setView("profile");
    } else {
      sessionStorage.setItem("open_account", "1");
      router.push("/");
    }
  }

  return (
    <>
      {/* Tab switcher — only when in form view */}
      {(view === "masuk" || view === "daftar") && (
        <div className="bg-white border-b border-neutral-200 px-4">
          <div className="flex">
            {(["masuk", "daftar"] as const).map((tTab) => (
              <button
                key={tTab}
                onClick={() => setTab(tTab)}
                className={`flex-1 py-3 text-sm font-bold transition-colors border-b-2 ${
                  tab === tTab ? "border-brand text-brand" : "border-transparent text-neutral-400"
                }`}
              >
                {tTab === "masuk" ? (language === "en" ? "Login" : "Masuk") : (language === "en" ? "Register" : "Daftar")}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-h-[calc(100dvh-88px)] overflow-y-auto flex flex-col">
        {view === "idle" && <div className="flex-1" />}
        {view === "invite" && <InviteScreen onMasuk={goMasuk} onDaftar={goDaftar} />}
        {view === "profile" && <ProfileScreen onLogout={handleLogout} />}
        {(view === "masuk" || view === "daftar") && (
        <div key={tab} className="akun-form-enter px-4 py-5">
          {tab === "masuk"
            ? <LoginTab onSwitch={() => { setTab("daftar"); setView("daftar"); }} onLogin={handleLogin} />
            : <RegisterTab onSwitch={() => { setTab("masuk"); setView("masuk"); }} onRegister={handleRegister} />
          }
        </div>)}

      </div>

    </>
  );
}

export default function AkunPage() {
  const router = useRouter();

  function backToAccountSection() {
    sessionStorage.setItem("open_account", "1");
    router.push("/");
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="relative bg-white border-b border-neutral-200 px-4 py-3">
        <button
          type="button"
          aria-label="Kembali"
          onClick={backToAccountSection}
          className="text-neutral-500 flex items-center"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Logo.png" alt="monotaro.id" className="absolute left-1/2 top-1/2 h-7 w-auto -translate-x-1/2 -translate-y-1/2 object-contain" />
      </header>
      <Suspense fallback={<div className="flex-1" />}>
        <AkunContent />
      </Suspense>
    </div>
  );
}
