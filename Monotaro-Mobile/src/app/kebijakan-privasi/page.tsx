"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function KebijakanPrivasiPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  return (
    <main className="min-h-dvh bg-neutral-50 pb-8">
      <header className="sticky top-0 z-20 flex items-center gap-3 bg-white px-4 py-3 border-b border-neutral-200">
        <button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-neutral-500">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-[15px] font-bold text-neutral-900">
          {language === "en" ? "Privacy Policy" : "Kebijakan Privasi"}
        </h1>
      </header>

      <article className="mx-3 mt-3 rounded-[10px] bg-white p-4 text-xs leading-relaxed text-neutral-700 shadow-sm space-y-4">
        <p className="text-[11px] text-neutral-500">
          {language === "en" ? "Last updated: November 8, 2026" : "Terakhir diperbarui: 8 November 2026"}
        </p>

        {language === "en" ? <EnContent /> : <IdContent />}
      </article>
    </main>
  );
}

function EnContent() {
  return <>
    <p className="text-justify font-semibold text-sm text-neutral-900">PRIVACY POLICY</p>

    <p className="text-justify">Monotaro.id always strives to protect and respect your personal rights.</p>

    <p className="text-justify">We are committed to ensuring that your privacy is protected. If we ask you to provide certain identifiable information when using this website, that information will only be used in accordance with this privacy statement.</p>

    <p className="text-justify">We may change this Privacy Policy from time to time by revising or updating the terms on this page. All changes related to this policy will be published at monotaro.id or through other media. You are expected to check this page periodically to be aware of any changes. By accessing and using the services provided by monotaro.id, you are deemed to have agreed to the changes made in the terms of this Privacy Policy.</p>

    <p className="text-justify">This policy will determine how the personal information we collect or that you provide will be processed. Please read the following sections carefully to understand the terms relating to your personal data and how we handle that information.</p>

    <Section title="USE OF INFORMATION">
      <p className="text-justify mb-2">We will use information relating to you for the following purposes:</p>

      <SubSection label="A. Providing our services at monotaro.id specifically:">
        <ul className="list-disc pl-4 space-y-1">
          <li>To confirm your order;</li>
          <li>To deliver your order;</li>
          <li>Providing services to answer your questions or complaints periodically in accordance with the information we receive;</li>
          <li>Monitoring and/or investigating potential suspicious or fraudulent actions or transactions and other actions prohibited in the Terms and Conditions and/or applicable legal regulations;</li>
          <li>In addition to the above, to provide services to you and protect your rights and benefits.</li>
        </ul>
      </SubSection>

      <SubSection label="B. Providing advertisements and/or offers and improving our services or products:">
        <ul className="list-disc pl-4 space-y-1">
          <li>Contacting you in connection with market research or the development of the monotaro.id site, so that we can continue to improve our services and/or meet your requests for products and services provided by Monotaro.id;</li>
          <li>To provide you with information about product marketing, advertising, surveys, and to provide information directly including making visits to your location (if necessary) in connection with special offers or promotions provided by Monotaro.id.</li>
        </ul>
      </SubSection>

      <SubSection label="C. Responding to requirements and/or requests in accordance with applicable legal regulations:">
        <ul className="list-disc pl-4 space-y-1">
          <li>Conducting monitoring and taking preventive measures, if there is potential data leakage, unauthorized access, and/or violations of information data security as well as other actions deemed necessary and permitted by applicable laws or regulations;</li>
          <li>Fulfilling requirements stipulated in applicable laws and regulations in connection with tax interests and complying with court orders or decisions and applicable legal provisions.</li>
        </ul>
      </SubSection>
    </Section>

    <Section title="INFORMATION WE COLLECT FROM YOU">
      <p className="text-justify mb-2">The purposes of information use include the following:</p>

      <SubSection label="A. Processing your purchase orders and delivery. Types of information collected:">
        <ul className="list-disc pl-4 space-y-1">
          <li>Full Name;</li>
          <li>Email Address;</li>
          <li>Phone Number;</li>
          <li>Full Address;</li>
          <li>Shipping Address;</li>
        </ul>
      </SubSection>

      <SubSection label="B. Providing Monotaro.id services and offers. Types of information collected:">
        <ul className="list-disc pl-4 space-y-1">
          <li>Full Name;</li>
          <li>Email Address;</li>
          <li>Phone Number;</li>
          <li>Full Address;</li>
          <li>Shipping Address;</li>
          <li>Cookies</li>
        </ul>
      </SubSection>

      <SubSection label="C. Monitoring and Compliance with Data Security and Regulations at Monotaro.id. Types of information collected:">
        <ul className="list-disc pl-4 space-y-1">
          <li>Full Name;</li>
          <li>Email Address;</li>
          <li>Phone Number;</li>
          <li>Full Address;</li>
          <li>Shipping Address;</li>
          <li>Tax Identification Number (NPWP);</li>
          <li>Bank Account (such as bank name, bank branch, account number, and account holder name).</li>
        </ul>
      </SubSection>

      <p className="text-justify mt-2">We consider that all information and changes you provide above, now and in the future, are authentic, accurate, true, and not misleading.</p>
      <p className="text-justify mt-2">In certain situations, you may provide us with personal data of other data subjects (such as relatives, friends, your company representatives, or people in your contact list). If you provide us with their personal data, you hereby represent and warrant that you have obtained consent from the data subjects for such data to be processed in accordance with this Privacy Policy.</p>
      <p className="text-justify mt-2">If the information and changes you provide prove to be incorrect, we hereby declare that we will not be responsible for any consequences that may arise in connection with the inaccuracy of the information and changes provided.</p>
    </Section>

    <Section title="COOKIES">
      <p className="text-justify">At any time, we or our authorized service providers may use &ldquo;cookies&rdquo; or other features to enable us to collect or share information in connection with your use of the Service on the monotaro.id website. These features help us improve the Service we offer, or help us offer services to you.</p>
      <p className="text-justify mt-2">Cookies are identifiers stored on your computer or mobile device that record data about your computer or device, how and when the monotaro.id service site is used or visited, by how many people, and other activities on our service site. We may link cookie information with personal data.</p>
      <p className="text-justify mt-2">Cookies also link to information about what items you have chosen to purchase and the site pages you have viewed. This information is also used to track your shopping cart, to deliver content relevant to your interests, to perform data analysis, and to monitor the use of our Service. You have the right and are permitted to refuse the use of cookies by selecting the appropriate settings on your browser or device. However, please be aware that if you refuse the use of cookies, this means you will not be able to use all the services available on the monotaro.id site.</p>
    </Section>

    <Section title="DATA SECURITY & RETENTION PERIOD">
      <p className="text-justify">To prevent unauthorized access and misuse of information, we will implement the necessary physical, electronic, and managerial-procedural safeguards to protect the information we handle.</p>
      <p className="text-justify mt-2">Your Personal Data will only be handled to fulfill the purpose of use and/or as permitted under Applicable Laws and Regulations. We will promptly delete or destroy your personal information when we have achieved the purpose of use or when you request to withdraw your consent and/or we realize that you are not in line with the provisions stated in monotaro.id.</p>
      <p className="text-justify mt-2">Please note that even though your Personal Data has been deleted, it does not rule out the possibility that your Personal Data may still be stored or controlled by other parties including government institutions in certain ways.</p>
      <p className="text-justify mt-2">In the event that We share your Personal Data with authorized government institutions and/or other institutions that may be appointed by the authorized government or have a working relationship with Us, you agree and acknowledge that the storage of your Personal Data by the relevant institution will follow the data storage provisions and policies of each respective institution.</p>
      <p className="text-justify mt-2">You hereby agree to release Us from any and all claims, losses, liabilities, damages, and costs (including but not limited to legal fees and compensation costs) caused directly or indirectly by the use of Personal Data between you and other parties outside the provisions contained in the monotaro.id site to the extent permitted by applicable laws and regulations.</p>
    </Section>

    <Section title="USE OF OR ACCESS TO THIRD PARTY SERVICES">
      <p className="text-justify">We will not sell, distribute, or lease your personal information to third parties unless required by applicable law in Indonesia.</p>
      <p className="text-justify mt-2">We may release personal information if we are required by law or believe that such action is necessary to:</p>
      <ol className="list-decimal pl-4 mt-1.5 space-y-1">
        <li>Legal compliance and Court proceedings;</li>
        <li>Protect and defend Our copyrights and property;</li>
        <li>Protect against misuse of Our website, or;</li>
        <li>Protect the personal safety or property of our users or the public (in this way it means that if you provide false information or pretend to be someone else, information about you may be provided as part of an investigation).</li>
      </ol>
    </Section>

    <Section title="PROCEDURE TO WITHDRAW CONSENT, REQUEST ACCESS, AND CORRECT INFORMATION PROVIDED TO US">
      <p className="text-justify">You may withdraw your consent to our collection, use, and/or disclosure and/or request deletion of personal data and/or submit a request to change/update your personal data that we hold, or that is under our control, via email to the Personal Data Protection Officer at <span className="text-brand font-medium">dpo@monotaro.id</span>, and we will process your request in accordance with this Privacy Policy and our obligations under the Personal Data Protection Law and its derivatives. Withdrawal of your consent may mean that we will not be able to continue providing services to you, and we may need to terminate our relationship with you and/or any contract you have made with us.</p>
    </Section>

    <Section title="APPLICABLE LAW" last>
      <p className="text-justify">All terms and conditions in this Privacy Policy are subject to the laws applicable in the territory of the Republic of Indonesia.</p>
    </Section>
  </>;
}

function IdContent() {
  return <>
    <p className="text-justify font-semibold text-sm text-neutral-900">KEBIJAKAN PRIVASI</p>

    <p className="text-justify">Monotaro.id selalu berusaha untuk melindungi dan menghormati hak-hak pribadi Anda.</p>

    <p className="text-justify">Kami berkomitmen untuk memastikan bahwa privasi Anda tetap terlindungi. Jika kami meminta Anda untuk memberikan informasi tertentu yang dapat diidentifikasi saat menggunakan situs web ini, informasi tersebut hanya akan digunakan sesuai dengan pernyataan privasi ini.</p>

    <p className="text-justify">Kami dapat mengubah Kebijakan Privasi ini dari waktu ke waktu dengan merevisi atau memperbarui ketentuan pada halaman ini. Semua perubahan yang terkait dengan kebijakan ini akan dipublikasikan di monotaro.id atau melalui media lainnya. Anda diharapkan untuk memeriksa halaman ini secara berkala untuk mengetahui perubahannya. Dengan mengakses dan menggunakan layanan yang disediakan oleh monotaro.id, Anda dianggap telah menyetujui perubahan-perubahan yang dibuat dalam ketentuan Kebijakan Privasi ini.</p>

    <p className="text-justify">Kebijakan ini akan menentukan informasi pribadi yang kami kumpulkan atau yang Anda berikan akan diproses. Mohon baca bagian berikut ini dengan seksama untuk memahami ketentuan-ketentuan yang berkaitan dengan data pribadi Anda dan bagaimana kami menangani informasi tersebut.</p>

    <Section title="PENGGUNAAN INFORMASI">
      <p className="text-justify mb-2">Kami akan menggunakan informasi yang berkaitan dengan Anda untuk tujuan-tujuan sebagai berikut:</p>

      <SubSection label="A. Menyediakan layanan kami di monotaro.id secara khusus:">
        <ul className="list-disc pl-4 space-y-1">
          <li>Untuk mengkonfirmasi pesanan Anda;</li>
          <li>Untuk mengirimkan pesanan Anda;</li>
          <li>Menyediakan layanan untuk menjawab pertanyaan atau keluhan Anda secara berkala sesuai dengan informasi yang kami terima;</li>
          <li>Memantau dan/atau melakukan investigasi terhadap potensi tindakan atau transaksi yang mencurigakan atau curang serta tindakan-tindakan lain yang dilarang dalam Syarat dan Ketentuan dan/atau peraturan hukum yang berlaku;</li>
          <li>Selain yang tercantum di atas, untuk memberikan layanan kepada Anda dan melindungi hak-hak dan manfaat Anda.</li>
        </ul>
      </SubSection>

      <SubSection label="B. Menyediakan iklan dan/atau penawaran dan meningkatkan layanan atau produk kami:">
        <ul className="list-disc pl-4 space-y-1">
          <li>Menghubungi Anda sehubungan dengan riset pasar atau pengembangan situs monotaro.id, agar kami dapat terus meningkatkan layanan kami dan/atau memenuhi permintaan Anda atas produk dan layanan yang disediakan oleh Monotaro.id;</li>
          <li>Untuk memberikan informasi kepada Anda mengenai pemasaran produk, iklan, survei, dan memberikan informasi secara langsung termasuk melakukan kunjungan ke lokasi Anda (jika diperlukan) sehubungan dengan penawaran khusus atau promosi yang disediakan oleh Monotaro.id.</li>
        </ul>
      </SubSection>

      <SubSection label="C. Menanggapi persyaratan dan/atau permintaan sesuai dengan peraturan hukum yang berlaku:">
        <ul className="list-disc pl-4 space-y-1">
          <li>Melakukan pengawasan dan melakukan tindakan pencegahan, apabila terdapat potensi kebocoran data, penyusupan akses secara ilegal dan/atau pelanggaran terhadap keamanan data informasi serta tindakan lain yang dianggap perlu dan dimungkinkan oleh ketentuan atau peraturan hukum yang berlaku;</li>
          <li>Memenuhi persyaratan yang ditentukan dalam peraturan perundang-undangan yang berlaku sehubungan dengan kepentingan perpajakan dan mematuhi perintah atau putusan pengadilan serta ketentuan hukum yang berlaku.</li>
        </ul>
      </SubSection>
    </Section>

    <Section title="INFORMASI YANG KAMI KUMPULKAN DARI ANDA">
      <p className="text-justify mb-2">Tujuan Penggunaan Informasi meliputi sebagai berikut:</p>

      <SubSection label="A. Memproses pesanan pembelian dan pengiriman Anda. Jenis informasi yang dikumpulkan:">
        <ul className="list-disc pl-4 space-y-1">
          <li>Nama Lengkap;</li>
          <li>Alamat E-mail;</li>
          <li>Nomor Telepon;</li>
          <li>Alamat Lengkap;</li>
          <li>Alamat Pengiriman;</li>
        </ul>
      </SubSection>

      <SubSection label="B. Menyediakan layanan dan penawaran Monotaro.id. Jenis informasi yang dikumpulkan:">
        <ul className="list-disc pl-4 space-y-1">
          <li>Nama Lengkap;</li>
          <li>Alamat E-mail;</li>
          <li>Nomor Telepon;</li>
          <li>Alamat Lengkap;</li>
          <li>Alamat Pengiriman;</li>
          <li>Cookies</li>
        </ul>
      </SubSection>

      <SubSection label="C. Pemantauan dan Kepatuhan terhadap Keamanan Data dan Peraturan di Monotaro.id. Jenis informasi yang dikumpulkan:">
        <ul className="list-disc pl-4 space-y-1">
          <li>Nama Lengkap;</li>
          <li>Alamat E-mail;</li>
          <li>Nomor Telepon;</li>
          <li>Alamat Lengkap;</li>
          <li>Alamat Pengiriman;</li>
          <li>Nomor Pokok Wajib Pajak (NPWP);</li>
          <li>Rekening Bank (seperti nama bank, kantor cabang bank, nomor rekening, dan nama pemegang rekening).</li>
        </ul>
      </SubSection>

      <p className="text-justify mt-2">Kami menganggap bahwa setiap informasi dan perubahan yang Anda berikan di atas untuk saat ini dan di masa mendatang merupakan informasi yang otentik, akurat, benar, dan tidak menyesatkan.</p>
      <p className="text-justify mt-2">Dalam situasi tertentu, Anda dapat memberikan kami data pribadi subjek data lainnya (seperti kerabat, teman, perwakilan perusahaan Anda, atau orang yang ada dalam daftar kontak Anda). Jika Anda memberikan data pribadi mereka kepada kami, dengan ini Anda menyatakan dan menjamin bahwa Anda telah mendapatkan persetujuan dari subjek data agar data tersebut dapat diproses sesuai dengan Kebijakan Privasi ini.</p>
      <p className="text-justify mt-2">Apabila informasi dan perubahan yang Anda berikan terbukti tidak benar, dengan ini kami menyatakan bahwa kami tidak akan bertanggung jawab atas segala akibat yang mungkin terjadi sehubungan dengan ketidakbenaran informasi dan perubahan yang diberikan.</p>
    </Section>

    <Section title="COOKIES">
      <p className="text-justify">Setiap saat, kami atau penyedia layanan resmi kami dapat menggunakan &ldquo;cookies&rdquo; atau fitur lain untuk memungkinkan kami mengumpulkan atau berbagi informasi sehubungan dengan penggunaan Anda atas Layanan di situs web monotaro.id. Fitur-fitur ini membantu kami meningkatkan Layanan yang kami tawarkan, atau membantu kami menawarkan layanan kepada Anda.</p>
      <p className="text-justify mt-2">Cookies adalah pengidentifikasi yang disimpan di komputer atau perangkat seluler Anda yang merekam data tentang komputer atau perangkat Anda bagaimana dan kapan situs layanan monotaro.id digunakan atau dikunjungi, oleh berapa banyak orang, dan aktivitas lain di situs layanan kami. Kami dapat menghubungkan informasi cookies dengan data pribadi.</p>
      <p className="text-justify mt-2">Cookies juga menautkan ke informasi tentang item apa yang telah Anda pilih untuk dibeli dan halaman situs yang Anda lihat. Informasi ini juga digunakan untuk melacak keranjang belanja Anda, untuk mengirimkan konten yang sesuai dengan minat Anda, untuk melakukan analisis data, dan untuk memantau penggunaan Layanan kami. Anda memiliki hak dan diizinkan untuk menolak penggunaan cookies dengan memilih pengaturan yang sesuai pada browser atau perangkat Anda. Namun perlu Anda ketahui, bahwa jika Anda menolak penggunaan cookies, ini berarti Anda tidak dapat menggunakan semua layanan yang tersedia di situs monotaro.id.</p>
    </Section>

    <Section title="KEAMANAN DATA & PERIODE PENYIMPANAN">
      <p className="text-justify">Untuk menghindari akses yang tidak sah dan penyalahgunaan informasi, kami akan menerapkan pengamanan fisik, elektronik, dan manajerial-prosedural yang diperlukan untuk melindungi informasi yang kami tangani.</p>
      <p className="text-justify mt-2">Data Pribadi Anda hanya akan ditangani untuk memenuhi tujuan penggunaan dan/atau diizinkan berdasarkan Hukum dan Peraturan yang Berlaku. Kami akan segera menghapus atau memusnahkan informasi pribadi Anda ketika kami telah mencapai tujuan penggunaan atau ketika Anda meminta untuk mencabut persetujuan Anda dan/atau kami menyadari bahwa Anda tidak sejalan dengan ketentuan yang tercantum dalam monotaro.id.</p>
      <p className="text-justify mt-2">Perlu diketahui, meskipun Data Pribadi Anda telah dihapus, tidak menutup kemungkinan Data Pribadi Anda masih dapat disimpan atau dikuasai oleh pihak lain termasuk institusi pemerintah dengan cara-cara tertentu.</p>
      <p className="text-justify mt-2">Dalam hal Kami membagikan Data Pribadi Anda kepada institusi pemerintah yang berwenang dan/atau institusi lain yang mungkin ditunjuk oleh pemerintah yang berwenang atau memiliki hubungan kerja sama dengan Kami, Anda menyetujui dan mengakui bahwa penyimpanan Data Pribadi Anda oleh institusi yang bersangkutan akan mengikuti ketentuan dan kebijakan penyimpanan data masing-masing institusi tersebut.</p>
      <p className="text-justify mt-2">Anda dengan ini setuju untuk membebaskan Kami dari setiap dan seluruh tuntutan, kerugian, kewajiban, kerusakan, dan biaya (termasuk namun tidak terbatas pada biaya hukum dan biaya ganti rugi) yang diakibatkan secara langsung maupun tidak langsung dari penggunaan Data Pribadi antara Anda dengan pihak-pihak lain di luar ketentuan yang terdapat di dalam situs monotaro.id sepanjang diizinkan oleh peraturan perundang-undangan yang berlaku.</p>
    </Section>

    <Section title="PENGGUNAAN ATAU AKSES KE LAYANAN PIHAK KETIGA">
      <p className="text-justify">Kami tidak akan menjual, mendistribusikan, atau menyewakan informasi pribadi Anda kepada pihak ketiga kecuali diwajibkan oleh hukum yang berlaku di Indonesia.</p>
      <p className="text-justify mt-2">Kami dapat merilis informasi pribadi jika kami diwajibkan oleh hukum atau meyakini bahwa tindakan tersebut diperlukan untuk:</p>
      <ol className="list-decimal pl-4 mt-1.5 space-y-1">
        <li>Kepatuhan hukum dan proses Pengadilan;</li>
        <li>Melindungi dan mempertahankan hak cipta dan properti Kami;</li>
        <li>Melindungi dari adanya penyalahgunaan situs web Kami, atau;</li>
        <li>Melindungi keamanan pribadi atau properti pengguna kami atau publik (dengan cara ini berarti jika Anda memberikan informasi palsu atau berpura-pura menjadi orang lain, informasi tentang Anda dapat diberikan sebagai bagian dari penyelidikan).</li>
      </ol>
    </Section>

    <Section title="PROSEDUR UNTUK MENCABUT PERSETUJUAN, MEMINTA AKSES, DAN MENGOREKSI INFORMASI YANG DIBERIKAN KEPADA KAMI">
      <p className="text-justify">Anda dapat mencabut persetujuan Anda atas pengumpulan, penggunaan, dan/atau pengungkapan kami dan/atau meminta penghapusan data pribadi dan/atau mengajukan permintaan untuk mengubah/memperbaharui data pribadi Anda yang kami miliki, atau yang berada di bawah kendali kami, melalui email ke Petugas Perlindungan Data Pribadi di <span className="text-brand font-medium">dpo@monotaro.id</span>, dan kami akan memproses permintaan Anda sesuai dengan Kebijakan Privasi ini serta kewajiban kami menurut Undang-Undang Perlindungan Data Pribadi dan turunannya. Pencabutan persetujuan Anda dapat berarti bahwa kami tidak akan dapat terus memberikan layanan kepada Anda, dan kami mungkin harus mengakhiri hubungan kami dengan Anda dan/atau kontrak yang Anda buat dengan kami.</p>
    </Section>

    <Section title="HUKUM YANG BERLAKU" last>
      <p className="text-justify">Setiap syarat dan ketentuan dalam Kebijakan Privasi disesuaikan dengan hukum yang berlaku di wilayah Republik Indonesia.</p>
    </Section>
  </>;
}

function Section({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={last ? "" : "border-b border-neutral-100 pb-4"}>
      <h2 className="text-xs font-bold text-neutral-900 mb-2">{title}</h2>
      {children}
    </div>
  );
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-2 mb-2">
      <p className="font-semibold text-neutral-800 mb-1">{label}</p>
      {children}
    </div>
  );
}
