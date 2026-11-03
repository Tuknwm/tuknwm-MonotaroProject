import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Monotaro ID",
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
    <html lang="id">
      <body>
        <LanguageProvider>
          <main>{children}</main>
          <div id="modal-root" />
        </LanguageProvider>
      </body>
    </html>
  );
}
