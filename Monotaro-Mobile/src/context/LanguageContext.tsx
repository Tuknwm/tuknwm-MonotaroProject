"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "id" | "en";

export const DICTIONARY = {
  // Navigation
  "nav.home": { id: "Home", en: "Home" },
  "nav.category": { id: "Kategori", en: "Category" },
  "nav.quotation": { id: "Quotation", en: "Quotation" },
  "nav.cart": { id: "Keranjang", en: "Cart" },
  "nav.account": { id: "Akun", en: "Account" },
  "nav.beranda": { id: "Beranda", en: "Home" },

  // Header / Search
  "search.placeholder": { id: "Cari dari 7 Juta+ Produk", en: "Search across 7 Million+ Products" },
  "search.popular": { id: "Pencarian Populer", en: "Popular Searches" },
  "search.view_all": { id: "Lihat semua", en: "View all" },
  "header.help": { id: "Bantuan", en: "Help" },

  // Sections
  "section.services": { id: "Layanan Bisnis", en: "Business Services" },
  "section.services_sub": { id: "Solusi pengadaan industri terpercaya", en: "Trusted industrial procurement solutions" },
  "section.highlight": { id: "PRODUCT HIGHLIGHT", en: "PRODUCT HIGHLIGHT" },
  "section.popular": { id: "Produk Terpopuler", en: "Most Popular Products" },
  "section.top_categories": { id: "Kategori Unggulan di monotaro.id", en: "Top Categories at monotaro.id" },
  "section.top_categories_sub": { id: "7.000.000+ produk · 18.600+ brand · 890.000+ Ready Stock", en: "7,000,000+ products · 18,600+ brands · 890,000+ Ready Stock" },
  "section.brands": { id: "Brand Terpopuler", en: "Most Popular Brands" },
  "section.articles": { id: "Tips Produk monotaro.id", en: "monotaro.id Product Tips" },
  "section.articles_action": { id: "Lihat Artikel", en: "View Articles" },
  "section.promos": { id: "Promo Menarik monotaro.id", en: "Exciting Promos at monotaro.id" },
  "section.why_us": { id: "Kenapa memilih monotaro.id?", en: "Why Choose monotaro.id?" },

  // Quick Links
  "quick.tempo": { id: "Tempo/Termin", en: "Term of Payment" },
  "quick.online_quo": { id: "Online Quotation", en: "Online Quotation" },
  "quick.tax_invoice": { id: "Faktur Pajak", en: "Tax Invoice" },
  "quick.blanket_order": { id: "Blanket Order", en: "Blanket Order" },
  "quick.review_reminder": { id: "Review Reminder", en: "Review Reminder" },
  "quick.pending_quo": { id: "Pending Quotation", en: "Pending Quotation" },
  "quick.online_approval": { id: "Online Approval", en: "Online Approval" },
  "quick.multiple_login": { id: "Multiple Login", en: "Multiple Login" },
  "quick.pickup_service": { id: "Pickup Service", en: "Pickup Service" },

  // Value props
  "val.exclusive_promo": { id: "Promo Belanja Exclusive", en: "Exclusive Shopping Promos" },
  "val.advisor": { id: "Layanan Produk Advisor", en: "Product Advisor Service" },
  "val.tax_invoice": { id: "Penerbitan Faktur Pajak", en: "Tax Invoice Issuance" },
  "val.voucher_review": { id: "Ulas & Dapat Voucher", en: "Review & Get Vouchers" },

  // Advantages
  "adv.komprehensif.title": { id: "Lengkap & Komprehensif", en: "Complete & Comprehensive" },
  "adv.komprehensif.desc": { id: "3.000.000+ produk industri dari brand terpercaya", en: "3,000,000+ industrial products from trusted brands" },
  "adv.delivery.title": { id: "Pengiriman Cepat", en: "Fast Delivery" },
  "adv.delivery.desc": { id: "Jangkauan seluruh Indonesia dengan opsi express", en: "Nationwide coverage with express options" },
  "adv.b2b.title": { id: "Khusus Bisnis", en: "Built for Business" },
  "adv.b2b.desc": { id: "Harga khusus, faktur pajak resmi & tempo (TOP)", en: "Special corporate pricing, official tax invoices & terms" },
  "adv.procurement.title": { id: "Pengadaan Mudah", en: "Easy Procurement" },
  "adv.procurement.desc": { id: "Online Approval System & Multiple Login", en: "Online Approval System & Multiple Login" },

  // Popups & Promos
  "promo.special": { id: "Penawaran Khusus", en: "Special Offer" },
  "promo.popup_title": { id: "Daftar Akun & Nikmati Diskon 10% Belanja Pertama", en: "Register Account & Enjoy 10% Off First Purchase" },
  "promo.popup_sub": { id: "Tempo/Termin · Online Quotation · Faktur Pajak · Product Advisor", en: "Terms of Payment · Online Quotation · Tax Invoice · Product Advisor" },
  "promo.register_btn": { id: "Daftar Akun", en: "Register Account" },

  // Account / Auth
  "account.login": { id: "Masuk", en: "Login" },
  "account.register": { id: "Daftar", en: "Register" },
  "account.register_now": { id: "Daftar Sekarang", en: "Register Now" },
  "account.email": { id: "Alamat Email", en: "Email Address" },
  "account.password": { id: "Password", en: "Password" },
  "account.old_password": { id: "Password Lama", en: "Old Password" },
  "account.new_password": { id: "Password Baru", en: "New Password" },
  "account.confirm_password": { id: "Konfirmasi Password", en: "Confirm Password" },
  "account.change_password": { id: "Ubah Password", en: "Change Password" },
  "account.forgot_password": { id: "Lupa Password?", en: "Forgot Password?" },
  "account.fullname": { id: "Nama Lengkap", en: "Full Name" },
  "account.phone": { id: "Nomor Handphone/Telp.", en: "Phone Number" },
  "account.telephone": { id: "Telepon", en: "Telephone" },
  "account.account_type": { id: "Pilih Tipe Akun", en: "Select Account Type" },
  "account.business": { id: "Bisnis", en: "Business" },
  "account.individual": { id: "Individu", en: "Individual" },
  "account.company": { id: "Perusahaan", en: "Company" },
  "account.company_name": { id: "Nama Perusahaan", en: "Company Name" },
  "account.business_entity": { id: "Badan Usaha", en: "Business Entity" },
  "account.select_entity": { id: "Pilih jenis perusahaan", en: "Select company type" },
  "account.department": { id: "Nama Departemen", en: "Department Name" },
  "account.business_class": { id: "Klasifikasi Usaha", en: "Business Classification" },
  "account.select_business_class": { id: "Pilih Klasifikasi Usaha Anda", en: "Select Your Business Classification" },
  "account.sub_business_class": { id: "Sub Klasifikasi Usaha", en: "Sub Business Classification" },
  "account.select_sub_class": { id: "Pilih sub klasifikasi", en: "Select sub classification" },
  "account.select_category_first": { id: "Kategori bisnis pertama harus dipilih terlebih dahulu", en: "First select a primary business category" },
  "account.employee_count": { id: "Jumlah Karyawan", en: "Number of Employees" },
  "account.select_employee_count": { id: "Pilih jumlah karyawan di usaha Anda", en: "Select employee count in your business" },
  "account.optional": { id: "(Optional)", en: "(Optional)" },
  "account.or_register_with": { id: "atau daftar dengan", en: "or register with" },
  "account.or_login_with": { id: "atau masuk dengan", en: "or login with" },
  "account.new_customer": { id: "Pelanggan Baru?", en: "New Customer?" },
  "account.register_free": { id: "Daftar akun monotaro.id gratis", en: "Register monotaro.id account for free" },
  "account.already_customer": { id: "Sudah Menjadi Pelanggan?", en: "Already a Customer?" },
  "account.login_here": { id: "Masuk dengan email dan password Anda", en: "Login with your email and password" },
  "account.already_have_account_login": { id: "Sudah punya akun? Masuk", en: "Already have an account? Login" },
  "account.login_here_link": { id: "Login disini", en: "Login here" },
  "account.already_have_account": { id: "Sudah punya akun?", en: "Already have an account?" },
  "account.terms_agree": { id: "Dengan mendaftar, Anda menyetujui", en: "By registering, you agree to the" },
  "account.terms": { id: "Ketentuan Penggunaan", en: "Terms of Use" },
  "account.terms_and_conditions": { id: "Syarat & Ketentuan", en: "Terms & Conditions" },
  "account.and": { id: "dan", en: "and" },
  "account.privacy_policy": { id: "Kebijakan Privasi", en: "Privacy Policy" },
  "account.subscribe_newsletter": { id: "Berlangganan newsletter & WA channel", en: "Subscribe to newsletter & WhatsApp channel" },
  "account.invite_text": { id: "Yuk, daftar sekarang dan nikmati pengalaman belanja yang lebih praktis untuk kebutuhan bisnis Anda.", en: "Join us now and enjoy a more seamless shopping experience for your business needs." },
  "account.help_cs": { id: "Butuh bantuan? Hubungi CS kami", en: "Need help? Contact our Customer Support" },
  "account.logout": { id: "Keluar dari akun", en: "Log out from account" },
  "account.my_profile": { id: "Profil Saya", en: "My Profile" },
  "account.business_banner_title": { id: "Akun Bisnis Monotaro", en: "Monotaro Business Account" },
  "account.business_banner_desc": { id: "Nikmati pengadaan yang lebih teratur dengan quotation online, faktur pajak, dan pembayaran tempo.", en: "Enjoy streamlined procurement with online quotations, official tax invoices, and terms of payment." },
  "account.complete_business_profile": { id: "Lengkapi profil bisnis →", en: "Complete business profile →" },
  "account.my_orders": { id: "Pesanan saya", en: "My Orders" },
  "account.view_all": { id: "Lihat semua", en: "View all" },
  "account.waiting_confirm": { id: "Menunggu konfirmasi", en: "Awaiting confirmation" },
  "account.waiting_payment": { id: "Menunggu pembayaran", en: "Awaiting payment" },
  "account.in_process": { id: "Dalam proses", en: "Processing" },
  "account.shipped": { id: "Telah dikirim", en: "Shipped" },
  "account.cancelled": { id: "Dibatalkan", en: "Cancelled" },
  "account.other_menus": { id: "Menu lainnya", en: "Other menus" },
  "account.wishlist": { id: "Wishlist", en: "Wishlist" },
  "account.quotation": { id: "Quotation", en: "Quotation" },
  "account.reviews": { id: "Ulasan", en: "Reviews" },
  "account.save": { id: "Simpan", en: "Save" },
  "account.note_npwp": { id: "Jika ada perubahan informasi terkait NPWP, silahkan hubungi tim CS", en: "If there are changes regarding NPWP/Tax ID, please contact the CS team" },
  "account.note": { id: "Catatan :", en: "Note :" },
  "account.switch_business": { id: "Ubah ke akun bisnis", en: "Switch to business account" },
  "account.individual_account": { id: "Akun Individu", en: "Individual Account" },
  "account.my_info": { id: "Informasi Saya", en: "My Information" },
  "account.my_company_info": { id: "Informasi Perusahaan Saya", en: "My Company Information" },
  "account.login_id": { id: "Login ID", en: "Login ID" },
  "account.email_login_id": { id: "Alamat Email (Login ID)", en: "Email Address (Login ID)" },
  "account.testimonial": { id: "Testimonial", en: "Testimonial" },
  "account.help_center": { id: "Bantuan dan pusat layanan", en: "Help & Service Center" },
  "account.contact_us": { id: "Hubungi Kami", en: "Contact Us" },
  "account.feedback": { id: "Saran & Kritik", en: "Suggestions & Feedback" },
  "account.popular_products": { id: "Produk Terpopuler", en: "Popular Products" },

  // Settings
  "settings.title": { id: "Pengaturan", en: "Settings" },
  "settings.account": { id: "Akun", en: "Account" },
  "settings.account_sub": { id: "Kelola informasi kontak, password, dan preferensi akun", en: "Manage contact information, password, and account preferences" },
  "settings.account_info": { id: "Informasi akun", en: "Account Information" },
  "settings.account_info_sub": { id: "Lihat detail kontak dan alamat akun", en: "View contact details and account address" },
  "settings.address": { id: "Alamat", en: "Address" },
  "settings.address_sub": { id: "Kelola alamat penagihan dan pengiriman", en: "Manage billing and shipping addresses" },
  "settings.notifications": { id: "Notifikasi", en: "Notifications" },
  "settings.notifications_sub": { id: "Atur notifikasi pesanan dan promosi", en: "Configure order and promo notifications" },
  "settings.language": { id: "Bahasa", en: "Language" },
  "settings.language_sub": { id: "Pilih bahasa aplikasi", en: "Choose application language" },
  "settings.privacy": { id: "Privasi dan keamanan", en: "Privacy and Security" },
  "settings.privacy_sub": { id: "Kelola keamanan akun Anda", en: "Manage your account security" },
  "settings.quotation": { id: "Quotation", en: "Quotation" },
  "settings.quotation_sub": { id: "Lihat dan kelola penawaran harga", en: "View and manage price quotations" },

  // FAQ Page
  "faq.title": { id: "FAQ / Tentang Kami", en: "FAQ / About Us" },
  "faq.subtitle": { id: "Kenali monotaro.id dan temukan jawaban untuk kebutuhan belanja bisnis Anda.", en: "Learn about monotaro.id and find answers for your business procurement needs." },
  "faq.faq_section": { id: "Pertanyaan umum", en: "Frequently Asked Questions" },
  "faq.payment_methods": { id: "Metode Pembayaran", en: "Payment Methods" },
  "faq.shipping": { id: "Pengiriman", en: "Shipping" },
  "faq.newsletter_label": { id: "Dapatkan info produk & promo terkini:", en: "Get the latest product updates & promotions:" },
  "faq.subscribe": { id: "Langganan", en: "Subscribe" },

  // Cart page
  "cart.title": { id: "Keranjang Belanja Anda", en: "Your Shopping Cart" },
  "cart.empty": { id: "Keranjang kamu kosong", en: "Your cart is empty" },
  "cart.empty_sub": { id: "Tambahkan produk untuk mulai belanja", en: "Add products to start shopping" },
  "cart.select_all": { id: "Pilih Semua", en: "Select All" },
  "cart.total_price": { id: "Total Harga", en: "Total Price" },
  "cart.items_count": { id: "produk", en: "items" },
  "cart.ppn": { id: "PPN 11%", en: "VAT 11%" },
  "cart.total_order": { id: "Total Pesanan", en: "Order Total" },
  "cart.checkout_btn": { id: "Lanjutkan ke Checkout", en: "Proceed to Checkout" },
  "cart.wishlist_swipe": { id: "Wishlist", en: "Wishlist" },
  "cart.add_to_cart": { id: "+ Keranjang", en: "+ Cart" },

  // Wishlist page
  "wishlist.empty": { id: "Wishlist kosong", en: "Wishlist is empty" },
  "wishlist.empty_sub": { id: "Simpan produk favorit kamu di sini", en: "Save your favorite products here" },
  "wishlist.start_shopping": { id: "Mulai Belanja", en: "Start Shopping" },
  "wishlist.remove": { id: "Hapus", en: "Remove" },

  // Product detail page
  "product.filter_latest": { id: "Terbaru", en: "Latest" },
  "product.filter_photo": { id: "Dengan Foto", en: "With Photos" },
  "product.filter_top_rating": { id: "Rating tertinggi", en: "Highest Rating" },
  "product.filter_low_rating": { id: "Rating terendah", en: "Lowest Rating" },
  "product.reviews": { id: "Ulasan Produk", en: "Product Reviews" },
  "product.reviews_label": { id: "Ulasan", en: "Reviews" },
  "product.cart_btn": { id: "Keranjang", en: "Cart" },
  "product.buy_now": { id: "Beli Sekarang", en: "Buy Now" },

  // Checkout page
  "checkout.change_payment": { id: "Ubah Metode Pembayaran", en: "Change Payment Method" },
  "checkout.select_payment_btn": { id: "Pilih Metode Pembayaran", en: "Select Payment Method" },
  "checkout.use_address": { id: "Gunakan Alamat", en: "Use Address" },
  "checkout.unavailable": { id: "Tidak Tersedia", en: "Not Available" },
  "checkout.selected": { id: "Dipilih", en: "Selected" },
  "checkout.select": { id: "Pilih", en: "Select" },
  "checkout.pay_now": { id: "Bayar Sekarang", en: "Pay Now" },
  "checkout.add_address": { id: "Tambah alamat", en: "Add address" },
  "checkout.change_btn": { id: "Ubah", en: "Change" },
  "checkout.total_order": { id: "Total Pesanan", en: "Order Total" },
  "checkout.shipping_address": { id: "Alamat Pengiriman", en: "Shipping Address" },
  "checkout.fill_address": { id: "Silakan isi alamat pengiriman Anda untuk melanjutkan transaksi", en: "Please fill in your shipping address to continue" },
  "checkout.po_number": { id: "Nomor PO", en: "PO Number" },
  "checkout.total_weight": { id: "Total Berat Pengiriman", en: "Total Shipping Weight" },
  "checkout.subtotal_before_vat": { id: "Subtotal Sebelum PPN", en: "Subtotal Before VAT" },
  "checkout.shipping_cost": { id: "Biaya Pengiriman", en: "Shipping Cost" },
  "checkout.select_payment_title": { id: "Pilih Metode Pembayaran", en: "Select Payment Method" },

  // Home page
  "home.all_brands": { id: "Semua Brand", en: "All Brands" },
  "home.search_brand": { id: "Cari brand...", en: "Search brand..." },
  "home.brand_not_found": { id: "Brand tidak ditemukan", en: "Brand not found" },
  "home.recently_viewed": { id: "Terakhir Dilihat", en: "Recently Viewed" },

  // More menu items
  "menu.new_products": { id: "Produk Baru", en: "New Products" },
  "menu.brand_monotaro": { id: "Brand Monotaro", en: "Monotaro Brand" },
  "menu.promo": { id: "Promo", en: "Promotions" },
  "menu.compare": { id: "Komparasi Produk", en: "Product Comparison" },
  "menu.blog": { id: "Blog", en: "Blog" },
  "menu.request_quotation": { id: "Request Quotation", en: "Request Quotation" },

  // Product page
  "product.before_vat": { id: "Sebelum PPN", en: "Before VAT" },
  "product.specs_title": { id: "Spesifikasi Produk", en: "Product Specifications" },
  "product.info_title": { id: "Informasi Produk", en: "Product Information" },
  "product.also_viewed": { id: "Pembeli yg melihat produk ini juga melihat produk berikut", en: "Buyers who viewed this also viewed" },
  "product.also_bought_after_view": { id: "Pembeli yg melihat produk ini telah membeli produk berikut", en: "Buyers who viewed this also purchased" },
  "product.also_bought": { id: "Pembeli yg membeli produk ini juga membeli produk berikut", en: "Buyers who bought this also bought" },
  "product.ready_stock": { id: "Ready Stock", en: "Ready Stock" },
  "product.sold_prefix": { id: "Terjual", en: "Sold" },
  "product.select_variant_title": { id: "Pilih jenis produk yang diinginkan", en: "Select product type" },
  "product.variants_available": { id: "varian tersedia", en: "variants available" },
  "product.from_price": { id: "Mulai", en: "From" },
  "product.docs_title": { id: "Dokumentasi Produk", en: "Product Documentation" },
  "product.terms_title": { id: "Ketentuan dan Kondisi Barang", en: "Terms & Product Condition" },

  // Search page
  "search.not_found": { id: "Produk tidak ditemukan", en: "Product not found" },
  "search.try_different": { id: "Coba kata kunci yang berbeda", en: "Try a different keyword" },

  // Orders / pesanan
  "order.all_orders": { id: "Semua Pesanan", en: "All Orders" },
  "order.no_orders": { id: "Belum ada pesanan", en: "No orders yet" },
  "order.filter_all": { id: "Semua", en: "All" },

  // Saran & Kritik page
  "feedback.title": { id: "Saran & Kritik", en: "Suggestions & Feedback" },
  "feedback.heading": { id: "Saran & Kritik Anda Membuat Kami Bahagia :)", en: "Your Feedback Makes Us Happy :)" },
  "feedback.subtitle": { id: "Kami siap mendengarkan", en: "We're ready to listen" },
  "feedback.type_label": { id: "Jenis masukan", en: "Feedback type" },
  "feedback.select_type": { id: "Pilih jenis masukan", en: "Select feedback type" },
  "feedback.suggestion": { id: "Saran", en: "Suggestion" },
  "feedback.criticism": { id: "Kritik", en: "Criticism" },
  "feedback.question": { id: "Pertanyaan", en: "Question" },
  "feedback.message_label": { id: "Ceritakan kepada kami", en: "Tell us" },
  "feedback.attachment_label": { id: "Sertakan temuan Anda (jika ada)", en: "Attach your findings (if any)" },
  "feedback.experience_label": { id: "Pengalaman Anda browsing di monotaro.id", en: "Your browsing experience on monotaro.id" },
  "feedback.captcha_label": { id: "Masukkan kode", en: "Enter code" },
  "feedback.captcha_error": { id: "Kode captcha belum sesuai", en: "Captcha code is incorrect" },
  "feedback.submit_btn": { id: "Kirim saran & kritik", en: "Submit feedback" },

  // Bantuan page
  "help.title": { id: "Pusat Bantuan", en: "Help Center" },
  "help.welcome": { id: "Selamat Datang di Pusat Bantuan monotaro.id!", en: "Welcome to monotaro.id Help Center!" },
  "help.search_placeholder": { id: "Ketik pertanyaan Anda disini dan kami akan membantu menjawab", en: "Type your question here and we'll help answer it" },
  "help.pick_topic": { id: "Pilih Topik Sesuai Kebutuhan Anda", en: "Select a Topic for Your Needs" },
  "help.frequently_asked": { id: "Topik Yang Sering Ditanyakan", en: "Frequently Asked Topics" },

  // Promo page
  "promo.check_now": { id: "Cek Sekarang", en: "Check Now" },

  // Testimonial page
  "testimonial.customers_say": { id: "Apa Kata Pelanggan Kami", en: "What Our Customers Say" },
  "testimonial.show_more": { id: "Tampilkan lagi", en: "Show more" },

  // Settings
  "settings.account_dashboard": { id: "Dashboard Akun", en: "Account Dashboard" },

  // Common buttons & labels
  "common.back": { id: "Kembali", en: "Back" },
  "common.close": { id: "Tutup", en: "Close" },
  "common.search": { id: "Cari", en: "Search" },
  "common.subscribe": { id: "Langganan", en: "Subscribe" },
  "common.see_all": { id: "Lihat semua", en: "View all" },
  "common.select_placeholder": { id: "Pilih...", en: "Select..." },
  "common.copyright": { id: "Copyright © 2021 www.monotaro.id | All Rights Reserved", en: "Copyright © 2021 www.monotaro.id | All Rights Reserved" },
  "common.name": { id: "Nama", en: "Name" },
  "common.email_label": { id: "Surel", en: "Email" },
  "common.loading": { id: "Memuat", en: "Loading" },
  "common.other_menu": { id: "Menu lainnya", en: "More" },
  "common.more_items": { id: "lainnya", en: "more" },

  // Address form
  "addr.recipient": { id: "Nama Penerima", en: "Recipient Name" },
  "addr.city_field": { id: "Kota/Kabupaten/Kecamatan/Kode Pos", en: "City/Regency/District/Postal Code" },
  "addr.city_placeholder": { id: "Masukkan 3 atau lebih karakter", en: "Enter 3 or more characters" },
  "addr.detail_field": { id: "Detail Alamat", en: "Address Detail" },
  "addr.save": { id: "Simpan Alamat", en: "Save Address" },
  "addr.company_placeholder": { id: "Masukkan nama perusahaan", en: "Enter company name" },

  // Settings – account
  "settings.contact_info": { id: "Informasi Kontak", en: "Contact Information" },
  "settings.billing_primary": { id: "Penagihan Utama", en: "Primary Billing" },
  "settings.no_billing_address": { id: "Anda belum memiliki alamat tagihan utama", en: "No primary billing address yet" },
  "settings.add_address": { id: "Tambah Alamat", en: "Add Address" },
  "settings.shipping_primary": { id: "Pengiriman Utama", en: "Primary Shipping" },
  "settings.no_shipping_address": { id: "Anda belum memiliki alamat pengiriman utama", en: "No primary shipping address yet" },
  "settings.edit_address": { id: "Ubah Alamat", en: "Edit Address" },

  // Product badges
  "product.new_badge": { id: "Baru", en: "New" },
  "product.delivery_days": { id: "3 - 7 hari kerja", en: "3 - 7 business days" },

  // Filter / sort
  "filter.title": { id: "Filter & Urutkan", en: "Filter & Sort" },
  "filter.brand": { id: "Merek / Brand", en: "Brand" },
  "filter.search_brand": { id: "Cari merek...", en: "Search brand..." },
  "filter.brand_not_found": { id: "Merek tidak ditemukan", en: "Brand not found" },
  "filter.area": { id: "Area", en: "Area" },
  "filter.price_range": { id: "Rentang Harga", en: "Price Range" },
  "filter.sort": { id: "Urutkan", en: "Sort" },
  "filter.apply": { id: "Terapkan", en: "Apply" },
  "sort.highest_price": { id: "Harga Tertinggi", en: "Highest Price" },
  "sort.lowest_price": { id: "Harga Terendah", en: "Lowest Price" },
  "sort.most_popular": { id: "Paling Diminati", en: "Most Popular" },
  "sort.popular": { id: "Populer", en: "Trending" },
  "sort.new_products": { id: "Produk Baru", en: "New Products" },
  "sort.best_seller": { id: "Terlaris", en: "Best Seller" },

  // Category / subcategory page
  "category.sub": { id: "Sub Kategori", en: "Sub Category" },
  "category.products_available": { id: "produk tersedia", en: "products available" },
  "category.no_products": { id: "Belum ada produk", en: "No products yet" },
  "category.no_products_desc": { id: "Produk untuk kategori ini belum tersedia saat ini", en: "Products for this category are not yet available" },
  "category.no_products_sub_desc": { id: "Produk untuk sub kategori ini belum tersedia saat ini", en: "Products for this sub category are not yet available" },
  "category.explore": { id: "Jelajahi Kategori", en: "Explore Categories" },
  "category.products_label": { id: "Produk", en: "Products" },

  // Help center
  "help.other_topics": { id: "Kategori Topik Lainnya", en: "Other Topic Categories" },

  // Search results
  "search.result_count": { id: "hasil untuk", en: "results for" },
  "search.no_result": { id: "Tidak ada hasil untuk", en: "No results for" },
} as const;

export type TranslationKey = keyof typeof DICTIONARY;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey | string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "id",
  setLanguage: () => {},
  t: (key, fallback) => fallback || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    const saved = localStorage.getItem("app_lang");
    if (saved === "en" || saved === "id") {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  };

  const t = (key: TranslationKey | string, fallback?: string): string => {
    if (key in DICTIONARY) {
      const entry = DICTIONARY[key as TranslationKey];
      return entry[language] || fallback || key;
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
