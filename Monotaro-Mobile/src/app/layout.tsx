import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

export const metadata: Metadata = {
  title: "Monotaro Mobile",
  description: "Ecommerce Perkakas Industri & ATK Perusahaan",
  icons: { icon: "/LogoTab.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className}>
        <ServiceWorkerRegistration />
        <div className="desktop-notice">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo.webp" alt="Monotaro" />
          <h2>Aplikasi ini dirancang untuk perangkat mobile</h2>
          <p style={{fontSize:'0.8rem',color:'#888',margin:'-8px 0 0'}}>This app is designed for mobile devices</p>
          <div className="desktop-notice-langs">
            <div className="desktop-notice-lang">
              <p>
                Untuk pengalaman terbaik, buka di smartphone kamu.<br />
                Atau gunakan DevTools browser:<br />
                Tekan <kbd>F12</kbd> → klik ikon <strong>Toggle Device Toolbar</strong><br />
                (atau <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>)
              </p>
            </div>
            <div className="desktop-notice-divider" />
            <div className="desktop-notice-lang">
              <p>
                For the best experience, open on your smartphone.<br />
                Or use browser DevTools:<br />
                Press <kbd>F12</kbd> → click <strong>Toggle Device Toolbar</strong><br />
                (or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>)
              </p>
            </div>
          </div>
        </div>
        <LanguageProvider>
          <CartProvider>
            <WishlistProvider>
              <main>{children}</main>
              <div id="modal-root" />
            </WishlistProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
