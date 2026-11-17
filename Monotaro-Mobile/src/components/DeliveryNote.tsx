"use client";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";

type OrderNote = {
  id: string;
  orderDate: string;
  customerName: string;
  companyName: string;
  phone: string;
  address: string;
  awb: string;
  courier: string;
  payment: string;
  deliveryDate: string;
  soNumber: string;
  doNumber: string;
  poNumber: string;
  note: string;
  product: string;
  skuNumber: string;
  quantity: number;
  shipped: number;
};

const DUMMY_ORDERS: OrderNote[] = [
  { id: "ORD-DEMO-001", orderDate: "10 Nov 2026", customerName: "Budi Santoso", companyName: "PT Maju Bersama", phone: "081234567890", address: "Jl. Sudirman No. 45, Jakarta Selatan 12190", awb: "JNE001234567890", courier: "JNE Regular", payment: "Transfer Bank", deliveryDate: "12 Nov 2026", soNumber: "SO-2026-0001", doNumber: "DO-2026-0001", poNumber: "PO-2026-0001", note: "", product: "ABC Alkaline Battery AA", skuNumber: "SKU-BAT-001", quantity: 2, shipped: 2 },
  { id: "ORD-DEMO-002", orderDate: "10 Nov 2026", customerName: "Siti Rahayu", companyName: "CV Teknindo Jaya", phone: "087765432100", address: "Jl. Gatot Subroto No. 12, Bandung 40262", awb: "SICEPAT9876543210", courier: "SiCepat Reguler", payment: "COD", deliveryDate: "12 Nov 2026", soNumber: "SO-2026-0002", doNumber: "DO-2026-0002", poNumber: "PO-2026-0002", note: "Pastikan kertas tidak terlipat.", product: "Sinarline Copy Paper A4", skuNumber: "SKU-PPR-002", quantity: 5, shipped: 5 },
  { id: "ORD-DEMO-003", orderDate: "10 Nov 2026", customerName: "Agus Wijaya", companyName: "UD Serba Ada", phone: "089988776655", address: "Jl. Ahmad Yani No. 88, Surabaya 60231", awb: "TIKI0011223344", courier: "TIKI ONS", payment: "Transfer Bank", deliveryDate: "13 Nov 2026", soNumber: "SO-2026-0003", doNumber: "DO-2026-0003", poNumber: "PO-2026-0003", note: "", product: "Tekiro Obeng Plus PH2", skuNumber: "SKU-TLR-003", quantity: 3, shipped: 3 },
  { id: "ORD-DEMO-004", orderDate: "10 Nov 2026", customerName: "Dewi Lestari", companyName: "PT Karya Mandiri", phone: "081398765432", address: "Jl. Pemuda No. 7, Semarang 50132", awb: "ANTERAJA554433221", courier: "Anteraja", payment: "Kartu Kredit", deliveryDate: "13 Nov 2026", soNumber: "SO-2026-0004", doNumber: "DO-2026-0004", poNumber: "PO-2026-0004", note: "", product: "WD-40 Multi-Purpose 333ml", skuNumber: "SKU-MTC-004", quantity: 1, shipped: 1 },
  { id: "ORD-DEMO-005", orderDate: "10 Nov 2026", customerName: "Eko Prasetyo", companyName: "PT Safety Prima", phone: "082211223344", address: "Jl. Raya Bogor No. 100, Depok 16413", awb: "GOSEND7788990011", courier: "GoSend Same Day", payment: "Transfer Bank", deliveryDate: "11 Nov 2026", soNumber: "SO-2026-0005", doNumber: "DO-2026-0005", poNumber: "PO-2026-0005", note: "Simpan di tempat kering.", product: "Sarung Tangan Safety", skuNumber: "SKU-SFT-005", quantity: 10, shipped: 10 },
];

const v = (x: string) => x || "—";

export default function DeliveryNote({ orderIndex, onClose }: { orderIndex: number; onClose: () => void }) {
  const { t } = useLanguage();
  const o = DUMMY_ORDERS[orderIndex];
  if (!o) return null;
  const remaining = o.quantity - o.shipped;

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", flexDirection: "column", background: "#fff", fontFamily: "'Plus Jakarta Sans Variable', system-ui, sans-serif", color: "#000" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
        <button type="button" onClick={onClose} aria-label="Tutup" style={{ background: "none", border: 0, padding: 4, cursor: "pointer", display: "flex", color: "#374151" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <span style={{ fontSize: 14, fontWeight: 700 }}>{t("dn.title")}</span>
      </div>

      <div style={{ flex: 1, overflow: "hidden", padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #d1d5db" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "-0.01em" }}>MONOTARO.ID</span>
            <span style={{ fontSize: 9, color: "#64748b" }}>monotaro.id · cs@monotaro.id</span>
          </div>
          <h1 style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>{t("dn.title")}</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px", marginBottom: 10 }}>
          <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2px 6px", margin: 0, fontSize: 10, alignContent: "start" }}>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.ship_to")}</dt><dd style={{ margin: 0 }}>{o.customerName}</dd>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.pic")}</dt><dd style={{ margin: 0 }}>{o.companyName}</dd>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.phone")}</dt><dd style={{ margin: 0 }}>{o.phone}</dd>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.order_date")}</dt><dd style={{ margin: 0 }}>{o.orderDate}</dd>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.so_no")}</dt><dd style={{ margin: 0 }}>{v(o.soNumber)}</dd>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.do_no")}</dt><dd style={{ margin: 0 }}>{v(o.doNumber)}</dd>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.po_no")}</dt><dd style={{ margin: 0 }}>{v(o.poNumber)}</dd>
          </dl>
          <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2px 6px", margin: 0, fontSize: 10, alignContent: "start" }}>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.address")}</dt><dd style={{ margin: 0 }}>{o.address}</dd>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.awb")}</dt><dd style={{ margin: 0 }}>{v(o.awb)}</dd>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.transport")}</dt><dd style={{ margin: 0 }}>{v(o.courier)}</dd>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.payment")}</dt><dd style={{ margin: 0 }}>{o.payment}</dd>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.delivery_date")}</dt><dd style={{ margin: 0 }}>{v(o.deliveryDate)}</dd>
            <dt style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{t("dn.printed")}</dt><dd style={{ margin: 0 }}>1×</dd>
          </dl>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10, tableLayout: "auto", marginBottom: 10 }}>
          <thead>
            <tr>
              {[t("dn.col_no"), t("dn.col_product"), t("dn.col_ordered"), t("dn.col_shipped"), t("dn.col_remaining")].map((h, i) => (
                <th key={h} style={{ padding: "4px 5px", borderBottom: "0.5px solid #999", fontWeight: 700, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.04em", textAlign: i >= 2 ? "right" : "left", whiteSpace: "nowrap", background: "none", color: "#000" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "4px 5px", borderBottom: "0.5px solid #d1d5db", color: "#64748b" }}>1</td>
              <td style={{ padding: "4px 5px", borderBottom: "0.5px solid #d1d5db" }}>
                <div style={{ fontWeight: 500 }}>{o.product}</div>
                <div style={{ fontSize: 9, color: "#64748b" }}>{o.skuNumber}</div>
              </td>
              <td style={{ padding: "4px 5px", borderBottom: "0.5px solid #d1d5db", textAlign: "right" }}>{o.quantity}</td>
              <td style={{ padding: "4px 5px", borderBottom: "0.5px solid #d1d5db", textAlign: "right" }}>{o.shipped}</td>
              <td style={{ padding: "4px 5px", borderBottom: "0.5px solid #d1d5db", textAlign: "right" }}>{remaining}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} style={{ padding: "4px 5px", fontWeight: 800 }}>{t("dn.total")}</td>
              <td style={{ padding: "4px 5px", fontWeight: 800, textAlign: "right" }}>{o.quantity}</td>
              <td style={{ padding: "4px 5px", fontWeight: 800, textAlign: "right" }}>{o.shipped}</td>
              <td style={{ padding: "4px 5px", fontWeight: 800, textAlign: "right" }}>{remaining}</td>
            </tr>
          </tfoot>
        </table>

        {o.note && (
          <p style={{ fontSize: 10, margin: "0 0 8px" }}><strong>{t("dn.note")}:</strong> {o.note}</p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, margin: "12px 0 10px", fontSize: 10 }}>
          {[t("dn.sign_warehouse"), t("dn.sign_delivered"), t("dn.sign_received")].map((label) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span>{label}</span>
              <div style={{ height: 32, borderBottom: "0.5px solid #000" }} />
              <span>{t("dn.sign_date")}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 9, color: "#64748b" }}>
          <p style={{ margin: 0 }}>{t("dn.foot1")}</p>
          <p style={{ margin: 0 }}>{t("dn.foot2")}</p>
          <p style={{ margin: 0 }}>monotaro.id · {o.id}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
