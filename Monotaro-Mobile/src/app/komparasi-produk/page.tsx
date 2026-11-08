"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { ITEM_PRODUCTS } from "../item-products";

const NAMES: [string, string][] = [
  ["MCB", "MCB"],
  ["MCCB", "MCCB"],
  ["ELCB / RCCB", "ELCB / RCCB"],
  ["RCBO", "RCBO"],
  ["ACB", "ACB"],
  ["MCB Panel Box", "MCB Panel Box"],
  ["Circuit Breaker Finder", "Circuit Breaker Finder"],
  ["DIN Rail", "DIN Rail"],
  ["Terminal Block Listrik", "Electrical Terminal Block"],
  ["Kontaktor Listrik", "Electrical Contactor"],
  ["Box Panel Listrik", "Electrical Panel Box"],
  ["ELCB vs RCBO", "ELCB vs RCBO"],
  ["MCB vs ELCB", "MCB vs ELCB"],
  ["ELCB vs RCCB", "ELCB vs RCCB"],
  ["RCCB vs RCBO", "RCCB vs RCBO"],
  ["Kontaktor vs MCB", "Contactor vs MCB"],
  ["Floor Marking Tape", "Floor Marking Tape"],
  ["Lakban Peringatan Fragile", "Fragile Warning Tape"],
  ["Anti-Fatigue Mat", "Anti-Fatigue Mat"],
  ["Absorbant Pad", "Absorbent Pad"],
  ["Sarung Tangan Nitril", "Nitrile Gloves"],
  ["Sarung Tangan Latex", "Latex Gloves"],
  ["Sarung Tangan Tahan Potong (Cut-Resistant Gloves)", "Cut-Resistant Gloves"],
  ["Sarung Tangan Mekanik", "Mechanic Gloves"],
  ["Sarung Tangan Isolator Listrik", "Electrical Insulating Gloves"],
  ["Sarung Tangan Anti Static", "Anti-Static Gloves"],
  ["Sarung Tangan Lapis PU", "PU-Coated Gloves"],
  ["Sarung Tangan Tahan Panas", "Heat-Resistant Gloves"],
  ["Sarung Tangan Tahan Dingin", "Cold-Resistant Gloves"],
  ["Sarung Tangan Pemadam Kebakaran", "Firefighting Gloves"],
  ["Sepatu Boot Karet", "Rubber Boot Shoes"],
  ["Sepatu Safety Ankle Boot", "Safety Ankle Boot"],
  ["Sepatu Safety Sneakers", "Safety Sneakers"],
  ["Sepatu Clog APD Medis", "Medical PPE Clog Shoes"],
  ["Sepatu Safety Anti Statik", "Anti-Static Safety Shoes"],
  ["Gergaji Circular Saw", "Circular Saw"],
  ["Gergaji Jigsaw", "Jigsaw"],
  ["Cordless Chainsaw Mini", "Cordless Mini Chainsaw"],
  ["Mesin Gergaji Meja (Table Saw)", "Table Saw"],
  ["Mesin Potong Keramik/Marmer", "Ceramic/Marble Cutter"],
];

export default function KomparasiProdukPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const en = language === "en";

  return (
    <main className="min-h-dvh bg-neutral-100 pb-8">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-4 text-neutral-800 shadow-sm">
        <button type="button" onClick={() => router.back()} aria-label={t("common.back")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-sm font-bold">{en ? "Product Comparison" : "Komparasi Produk"}</h1>
      </header>
      <section className="px-3 py-5">
        <div className="grid grid-cols-2 gap-3">
          {NAMES.map(([nameId, nameEn], index) => (
            <article key={nameId} className="overflow-hidden rounded-[8px] border border-neutral-200 bg-white">
              <div className="grid grid-cols-3 gap-2 border-b border-neutral-200 p-3">
                {[0, 1, 2].map((offset) => (
                  <div key={offset} className="flex aspect-square items-center justify-center rounded border border-neutral-100 bg-white">
                    <img src={ITEM_PRODUCTS[(index * 3 + offset) % ITEM_PRODUCTS.length].icon} alt="" className="h-full w-full object-contain" />
                  </div>
                ))}
              </div>
              <div className="flex min-h-14 items-center justify-center px-2 py-3 text-center text-xs font-medium text-neutral-800">
                {en ? nameEn : nameId}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
