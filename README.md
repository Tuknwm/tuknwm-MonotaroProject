# Monotaro — Project Overview

This repository contains two separate applications that together form the Monotaro Indonesia platform prototype: a customer facing mobile web app and an internal admin dashboard. 

Note: this is not an official app for monotaro.id, just a homework project to make an mobile version and also the dashboard that how monotaro.id maintain the website
                                                                    
---

## Monotaro-Mobile

A Next.js mobile web application simulating the customer experience on monotaro.id — an Indonesian B2B industrial procurement platform.

### Pages & Features

| Area | Pages |
|---|---|
| Home | Landing page with product highlights, top categories, brands, promos, and service quick-links |
| Catalog | Category (`/kategori`), sub-category (`/subkategori`), search (`/cari`), product detail (`/produk/[id]`), product comparison (`/komparasi-produk`), new products (`/produk-baru`) |
| Cart & Checkout | Shopping cart (`/keranjang`), checkout (`/checkout`), purchase success (`/pembelian-berhasil`) |
| Orders | All orders (`/pesanan`), waiting confirmation, waiting payment (with 24-hour countdown), in process, shipped (with delivery note), cancelled |
| Account | Account overview (`/akun`), settings, address management, account info |
| Business Services | Online quotation, request quotation, blanket order, faktur pajak, online approval, multiple login, pickup service, AI product advisor |
| Support | FAQ, help center, contact us, feedback, blog, brand monotaro, promo |

### Key Capabilities

- **Bilingual** — full Indonesian / English toggle stored in `localStorage`; every string goes through a central `DICTIONARY` in `LanguageContext`
- **Delivery Note** — per-order surat jalan overlay on the shipped orders page, visually matching the dashboard's print layout
- **Payment countdown** — persistent 24-hour per-order timer on the waiting-payment page, deadline stored in `localStorage` so it survives page refresh
- **Cart context** — global cart state with add, remove, and quantity controls
- **Order flow** — checkout creates a pending confirmation order written to `localStorage`, picked up by the confirmation page

### Tech Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS

---

## Monotaro-Dashboard

An internal admin dashboard for managing the Monotaro platform, built as a single-page React application.

### Sections

| Section | Description |
|---|---|
| Overview | KPI tiles and charts — revenue, orders, top products, order status breakdown |
| Orders | Full order list with status management, shipping detail input (AWB, courier, DO/SO/PO numbers), and delivery note print view |
| Products | Product and SKU catalog management |
| Catalog | Brands, product categories, SKU attributes, specification attributes |
| Customers | Customer account list with order history |
| Vouchers | Voucher creation and usage tracking |
| Config | System configuration attributes and values |
| VAT Records | Faktur pajak (tax invoice) records |

### Key Capabilities

- **Delivery Note print** — A4-formatted delivery note generated from real order data, printed via the browser
- **Inline editing** — table rows edit in place without a separate form page
- **Shipped quantity tracking** — per-line shipped qty input with running totals
- **Order status workflow** — status transitions from pending through shipped with field validation per stage
- **Charts** — revenue trend, order status distribution, top-selling products (using Chart.js)

### Tech Stack

- React 18 · Vite · plain CSS (no framework)

---

## Relationship Between the Two Apps

The mobile app represents what a customer sees and does browsing, ordering, tracking. The dashboard represents what an internal team sees and does confirming orders, managing shipments, issuing documents. The delivery note format is shared between both: the dashboard generates the authoritative print version; the mobile app shows the customer a read-only view of the same document.
