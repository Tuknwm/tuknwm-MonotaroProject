"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

const NAV = [
  {
    label: "Home",
    labelKey: "nav.home",
    icon: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  },
  {
    label: "Kategori",
    labelKey: "nav.category",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    label: "Keranjang",
    labelKey: "nav.cart",
    icon: (
      <>
        <path d="M3 4h2l2.4 11h10.8L21 7.5H6.1" />
        <circle cx="9" cy="19.5" r="1.25" />
        <circle cx="17" cy="19.5" r="1.25" />
      </>
    ),
  },
  {
    label: "Akun",
    labelKey: "nav.account",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
  },
];

type Section = "home" | "akun" | "keranjang" | "kategori";

interface BottomNavProps {
  activeSection?: Section;
  onNavigate?: (section: Section) => void;
}

export default function BottomNav({ activeSection, onNavigate }: BottomNavProps) {
  const { t } = useLanguage();
  const { items: cartItems } = useCart();
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const handleClick = (label: string) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(20);
    const section = label === "Akun" ? "akun" : label === "Keranjang" ? "keranjang" : label === "Kategori" ? "kategori" : "home";
    if (onNavigate) {
      onNavigate(section);
    } else {
      if (section === "kategori") sessionStorage.setItem("home_section", "kategori");
      if (section === "keranjang") sessionStorage.setItem("open_keranjang", "1");
      if (section === "akun") sessionStorage.setItem("open_account", "1");
      window.location.href = "/";
    }
  };

  const isActive = (label: string) => {
    if (!activeSection) return false;
    if (label === "Akun") return activeSection === "akun";
    if (label === "Keranjang") return activeSection === "keranjang";
    if (label === "Kategori") return activeSection === "kategori";
    return activeSection === "home";
  };

  return (
    <nav className="fixed bottom-[calc(20px+env(safe-area-inset-bottom))] left-1/2 z-[100] flex w-[calc(100%-40px)] max-w-[390px] -translate-x-1/2 rounded-full bg-white p-1 shadow-[0_6px_24px_rgba(0,0,0,0.12)] pointer-events-auto">
      {NAV.map((n) => (
        <button
          key={n.label}
          type="button"
          aria-current={isActive(n.label) ? "page" : undefined}
          onClick={() => handleClick(n.label)}
          className={`nav-item flex-1 flex flex-col items-center gap-1 py-2 rounded-[18px] relative ${
            isActive(n.label) ? "text-brand" : "text-neutral-500"
          }`}
        >
          <svg
            className="w-[22px] h-[22px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {n.icon}
          </svg>
          {n.label === "Keranjang" && cartCount > 0 && (
            <span className="absolute top-1 left-1/2 ml-1.5 bg-brand text-white text-[9px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-semibold leading-none">{t(n.labelKey)}</span>
        </button>
      ))}
    </nav>
  );
}
