"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function SyaratKetentuanPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  return (
    <main className="min-h-dvh bg-neutral-50 pb-8 pt-[72px]">
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 rounded-b-3xl bg-brand px-4 py-4 text-white shadow-md">
        <button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-sm font-bold">{language === "en" ? "Terms & Conditions" : "Syarat & Ketentuan"}</h1>
      </header>

      <article className="mx-3 mt-3 rounded-[10px] bg-white p-4 text-xs leading-relaxed text-neutral-700 shadow-sm">
        <p className="mb-5 text-[11px] text-neutral-500">
          {language === "en" ? "Last updated: November 8, 2026" : "Terakhir diperbarui: 8 November 2026"}
        </p>

        <p className="mb-5 text-justify">
          {language === "en"
            ? <>PT MONOTARO INDONESIA (hereinafter referred to as the &ldquo;Company&rdquo;), an online retail store, hereby establishes terms and conditions (hereinafter referred to as the &ldquo;Policy&rdquo;) that must be understood and complied with by Users (as defined below) in using and/or accessing the website &lsquo;monotaro.id&rsquo; and other services or features therein (hereinafter referred to as the &ldquo;Site&rdquo;) for the purpose of online retail transactions and other activities related to such transactions, the contents of which are as follows:</>
            : <>PT MONOTARO INDONESIA (selanjutnya disebut sebagai &ldquo;Perusahaan&rdquo;) yang merupakan toko ritel daring (online) dengan ini menetapkan syarat dan ketentuan (selanjutnya disebut sebagai &ldquo;Kebijakan&rdquo;) yang wajib dimengerti dan dipatuhi oleh Pengguna (sebagaimana didefinisikan di bawah ini) dalam menggunakan dan/atau mengakses situs web &lsquo;monotaro.id&rsquo; maupun layanan-layanan ataupun fitur-fitur lainnya yang ada di dalamnya (selanjutnya disebut sebagai &ldquo;Situs&rdquo;) untuk keperluan bertransaksi secara ritel daring (online) aktivitas lainnya sehubungan dengan transaksi tersebut, yang isinya sebagai berikut:</>
          }
        </p>

        {language === "en" ? <EnContent /> : <IdContent />}
      </article>
    </main>
  );
}

function EnContent() {
  return <>
    <Bab title="CHAPTER 1 - General Provisions" />

    <Pasal title="Article 1 - Scope of Policy">
      <p className="mb-2 text-justify">This Policy governs the relationship between the Company and Users who use the Site for shopping or transaction services and other related services or features provided by the Company through the Site (hereinafter collectively referred to as the &ldquo;Service&rdquo;).</p>
      <TermDef term="&ldquo;Account&rdquo;" def="means the User&apos;s transaction account opened by a method determined by the Company in order for the Company to provide the Service to the User after the User agrees to this Policy." />
      <TermDef term="&ldquo;Personal Data&rdquo;" def="means any data of the Applicant/Service User, whether identified and/or identifiable individually or in combination with other information, directly or indirectly." />
      <TermDef term="&ldquo;Cookies&rdquo;" def="means traces or history of pages visited;" />
      <TermDef term="&ldquo;Applicable Law&rdquo;" def="means laws, rules, regulations, customs, practices, decisions, interpretations, directions, decisions, guidelines, notices, practice notes and circulars of all competent Regulatory Bodies for the time being applicable and binding on the relevant party or the use or offering of the Service." />
      <TermDef term="&ldquo;Content&rdquo;" def="means online digital information or material provided by the Company or Third Parties to Users in the form of signs, letters, diagrams, colors, sounds, images, videos (or any combination thereof)." />
      <TermDef term="&ldquo;Intellectual Property Rights&rdquo;" def="means copyrights, patents, utility model rights, trademark rights, design rights or other intellectual property rights (including the right to obtain such rights or to apply for registration, and other similar rights);" />
      <TermDef term="&ldquo;Losses&rdquo;" def="means all losses, liabilities, costs (including legal costs), charges, expenses, actions, proceedings, claims and demands;" />
      <TermDef term="&ldquo;Applicant&rdquo;" def="means a person or legal entity that intends to become a Service User on the Site by registering their Personal Data on the Site." />
      <TermDef term="&ldquo;User&rdquo;" def="means a person or legal entity who has successfully registered to have an Account on the Company&apos;s Site and is entitled to use the Service facilities on the Site." />
      <TermDef term="&ldquo;Rating&rdquo;" def="means the rating feature provided by Users for products displayed by the Company on the Site." />
      <TermDef term="&ldquo;Third Party&rdquo;" def="means any party, whether an individual or business entity (whether or not a legal entity) other than the Company and its affiliates and/or Users." />
      <TermDef term="&ldquo;Help Center&rdquo;" def="means the Site&apos;s help page available at: https://support.monotaro.id/hc/id" />
      <TermDef term="&ldquo;SARA&rdquo;" def="refers to ethnicity, religion, race, and inter-group relations." />
      <TermDef term="&ldquo;Review&rdquo;" def="means the review feature provided by Users for products displayed by the Company on the Site." />
    </Pasal>

    <Pasal title="Article 2 - Agreement and Modification">
      <Ol items={[
        "Applicants/Users warrant, promise, and are deemed to have read and agreed to this Policy governing the terms and conditions of the offering or use of the Service. The Policy applies to Applicants/Users at all times when providing information for the purpose of creating a Membership Account in accordance with the procedures established on the Site.",
        "The Company has the right to make changes to this Policy at any time, subject to Applicable Law. The Company will notify Users of changes made to the Policy by posting a notice on or through the Site or in accordance with methods reasonably determined by the Company.",
        "If the User disagrees with changes made by the Company to the Policy, the User has the right to terminate the Service in accordance with the method provided on the Site. Use of the Service after the Effective Date of the Change constitutes the User&apos;s agreement to be bound by the Policy as amended by the Company.",
      ]} />
    </Pasal>

    <Pasal title="Article 3 - Service Use Eligibility">
      <Ol items={[
        "Users must use the Service in accordance with the provisions regulated by the Company in this Policy, or policies regulated separately in the Help Center. Users are prohibited from using the Service for purposes that are contrary to or prohibited by applicable laws and regulations.",
        <>Applicants must comply with the terms and conditions as established by the Company under this Policy. Applicants must provide the Company with information and documents showing that the Applicant meets the following criteria:
          <Ol sub items={[
            "The Applicant must fulfill the information requests and/or registration forms required by the Company on the Site;",
            "The Applicant must have legal capacity to enter into agreements;",
            "The Applicant must confirm that the application is made in their own name and that the Account, once activated, will be used by the Applicant for their own account and not as an agent of any Third Party;",
            "The Applicant must meet the criteria and procedures as may be determined by the Company and notified to the Applicant from time to time in accordance with the Company&apos;s internal policies or as required by Applicable Law.",
          ]} /></>,
        "The Company has sole and absolute discretion to determine the eligibility of Applicants for Service membership registration. The Company is not, however, obliged to provide any reason to an Applicant when rejecting the Applicant&apos;s application.",
      ]} />
    </Pasal>

    <Pasal title="Article 4 - Service Termination and Membership Deregistration">
      <Ol items={[
        <>The Company may suspend the provision of Service, delete the Account and take other legal measures deemed necessary by the Company without prior notice to the User if the User commits any of the following:
          <Ol sub items={[
            "The User is known to have violated the Policy;",
            "Late payment of Service fees or failure to meet other requirements stipulated by the Company in the Help Center;",
            "The User commits actions as regulated in Article 42;",
          ]} /></>,
        "In the event of Losses to the Company or a Third Party caused by the User&apos;s violation of the Policy, the User must compensate all Losses suffered by the Company or such Third Party.",
      ]} />
    </Pasal>

    <Pasal title="Article 5 - Publication Content">
      <Ol items={[
        "The Company ensures not to include information that is prohibited under Applicable Law. However, Users must evaluate information related to the Service, particularly information provided by Third Parties, including, but not limited to, reliance on the completeness and accuracy of the information contained therein.",
        "The Company has the right to change and delete any information on the Site as needed by the Company.",
      ]} />
    </Pasal>

    <Bab title="CHAPTER 2 - Customers" />

    <Pasal title="Article 6 - Registration">
      <Ol items={[
        "Applicants who wish to register for membership must comply with the procedures on the Site as required by the Company.",
        <>Membership registration is considered complete when the Company approves the registration referred to in paragraph (1). However, in the following circumstances, the Company must refuse registration or cancel registration after the Company discovers that:
          <Ol sub items={[
            "The Applicant has made an inaccurate statement;",
            "Other matters as determined by the Company that the Applicant is not entitled to membership status.",
          ]} /></>,
      ]} />
    </Pasal>

    <Pasal title="Article 7 - Email Address & Password Management and Responsibility">
      <Ol items={[
        "Users must register an email address and password to obtain membership status on the Site. Users may not transfer, lend, or sell the email address and password or use them as collateral to a Third Party.",
        "The registered email address and password can be used throughout the Site.",
        "Users are solely responsible for the use and management of their email address and password, and must be responsible for all activities conducted on the Site.",
        "The Company is not responsible for User Losses caused by use of the email address and password by a Third Party, whether intentional or unintentional, or due to the User&apos;s own fault.",
      ]} />
    </Pasal>

    <Pasal title="Article 8 - Membership Termination">
      <Ol items={[
        "If the User commits any of the prohibited actions as regulated in Article 42, the Company may suspend the provision of Service without prior notice or warning to the User or permanently deactivate their membership.",
        "Users must compensate the Company if the User commits actions as regulated in Article 42, and Users must also bear Losses if the Company undertakes legal proceedings arising from the User&apos;s violation of Article 42.",
        "Users must notify the Company if the User cancels membership for their own reasons by contacting the Company by email at cs@monotaro.id for the purpose of deactivating the account.",
      ]} />
    </Pasal>

    <Bab title="CHAPTER 3 - Ratings & Reviews" />

    <Pasal title="Article 9 - Use of Rating and Review Services">
      <p className="text-justify">Users may use the Rating &amp; Review service on the Company&apos;s Site.</p>
    </Pasal>

    <Pasal title="Article 10 - Use of Review Content">
      <Ol items={[
        "The Company may use Reviews without prior notice to contributing Users. Users agree that the Company may also use Reviews in reproduction, quotation, disclosure, offering, publication, online distribution and other forms without having to pay any fees to Users.",
        "Users are not allowed to reproduce, modify, edit or copy the content of Reviews contributed by others or other Users unless otherwise determined by the Company.",
        "Users agree that the display and storage period of Reviews is determined solely by the Company in accordance with its own assessment.",
      ]} />
    </Pasal>

    <Pasal title="Article 11 - Limitations on Review Contributions and User Responsibility">
      <Ol items={[
        <>The Company may cancel vouchers/coupons without prior notice to Users if the Company considers that the User is suspected of and/or involved in any of the following:
          <Ol sub items={[
            "Defamation against the Company or Third Parties;",
            "Related to crime or encouraging crime;",
            "Violation of Applicable Law;",
            "Generating publicity for the purpose of profit;",
            "Spreading specific political and religious claims;",
            "Endangering the Company&apos;s reputation without basis or potentially exacerbating credit problems;",
            "Violating or potentially violating Intellectual Property Rights, credit, privacy and other rights of the Company or Third Parties;",
            "Expressing discrimination;",
            "Vulgar, harmful, abusive and threatening content, violence, or intimidation towards others;",
            "Contrary to public order or generally accepted social norms;",
            "Containing personal information such as name, phone number, email address, home address, place of work, credit card number and bank account number;",
            "Containing malicious programs or scripts such as viruses and others; and/or",
            "Other matters related to the foregoing that the Company deems inappropriate.",
          ]} /></>,
        <>If a violation of the provisions mentioned in paragraph (1) is found, the Company may take the following measures:
          <Ol sub items={[
            "Deletion of Ratings and Reviews that violate the provisions in the preceding paragraph;",
            "Suspension of the use of Ratings and Reviews for the violating User.",
            "Other measures deemed necessary by the Company.",
          ]} /></>,
        "Users who provide Reviews as regulated in paragraph (1) shall compensate all Losses to the Company or Third Parties arising from such violation.",
        "Users are fully responsible for questions, complaints and requests from Third Parties related to User&apos;s Reviews that violate the Policy.",
        "In the event that a Third Party files a claim regarding a Review provided by a User, the Company may disclose the User&apos;s Personal Data in accordance with Applicable Law.",
      ]} />
    </Pasal>

    <Pasal title="Article 12 - Disclaimer">
      <Ol items={[
        "Review content must be based on the User&apos;s experience. Users must independently analyze the products to be purchased through the Service, as experiences of individual users may differ.",
        "Users are fully responsible for questions, complaints and requests from Third Parties related to the User&apos;s Reviews that violate the Policy.",
        "Users are fully aware that temporary or permanent suspension of the Service may occur due to unavoidable circumstances such as Company system maintenance or communication line failures.",
        "The Company is not responsible for the loss of User information in connection with the Service arising from or in connection with the Company&apos;s gross negligence. The Company will notify Users within 3×24 hours if such an event occurs.",
      ]} />
    </Pasal>

    <Bab title="CHAPTER 4 - Promotions" />

    <Pasal title="Article 13 - Promotional Coupons">
      <Ol items={[
        "The Site provides promotional programs that may include vouchers/coupons and gifts (hereinafter collectively referred to as \"Promotions\") for Users under certain conditions.",
        "The Company may provide vouchers/coupons to Users, in accordance with conditions and procedures separately established by the Company.",
        "Users agree that the Company may modify the existence, conditions and procedures for granting vouchers/coupons at any time without prior notice to Users in accordance with Applicable Law.",
        "In obtaining and using vouchers/coupons, Users must comply with the Policy.",
      ]} />
    </Pasal>

    <Pasal title="Article 14 - Prohibition on Accumulation/Registration of Vouchers/Coupons and Multiple Account Registration">
      <Ol items={[
        "If a User holds multiple vouchers/coupons, Users are prohibited from accumulating their vouchers/coupons.",
        "Users agree that the Company has the right to cancel the granting of vouchers/coupons if the User takes any action suspected of harming the Company, including creating fake accounts to obtain vouchers/coupons.",
      ]} />
    </Pasal>

    <Pasal title="Article 15 - Cancellation">
      <Ol items={[
        "The Company may cancel vouchers/coupons and gifts given to Users for reasons deemed appropriate in the Company&apos;s sole judgment, such as product cancellation by suppliers, etc., without prior notice to Users.",
        <>The Company may cancel vouchers/coupons without prior notice to Users if the Company considers that the User is suspected of and/or involved in any of the following:
          <Ol sub items={[
            "Illegal acts or dishonest acts;",
            "A violation of the Policy;",
            "Other matters deemed by the Company appropriate for cancellation of vouchers/coupons granted to Users.",
          ]} /></>,
        "The coupon validity period has expired.",
        "The Company is not obligated to replace cancelled or expired coupons.",
      ]} />
    </Pasal>

    <Pasal title="Article 16 - Settlement of Voucher/Coupon Disputes">
      <Ol items={[
        "Users may pay for orders in whole or in part with vouchers/coupons, the discount rate and amount of which are determined by the Company for payment on the Site.",
        "The Company may add terms regarding the use of vouchers/coupons mentioned in paragraph (1) without prior notice to Users.",
        "If a User cancels an order, the Company will not replace the vouchers/coupons or replace them in cash in the amount related to the order cancellation.",
        "If a User uses a voucher/coupon for payment and the amount to be paid is lower than the face value of the voucher/coupon, the Company will not return the difference in value.",
        "If a User uses a voucher/coupon for payment and the invoice becomes higher, the User must pay the shortfall in another form of payment.",
      ]} />
    </Pasal>

    <Pasal title="Article 17 - Cancellation After Voucher/Coupon Use">
      <p className="text-justify">If a voucher/coupon is cancelled as referred to in Article 14 after the User has used the voucher/coupon to complete a purchase, the product order may be cancelled and will be held by the Company. If the User still wishes to obtain the product, the User must pay in cash or another payment method determined by the Company.</p>
    </Pasal>

    <Pasal title="Article 18 - No Money Conversion and Trading of Promotions">
      <Ol items={[
        "Users may not convert Promotions into money for any reason.",
        "Users entitled to Promotions are not allowed to trade Promotions designated by the Company to Users who are not entitled.",
      ]} />
    </Pasal>

    <Pasal title="Article 19 - Use of Promotions by Third Parties">
      <Ol items={[
        "Promotions will be used by entitled Users and not for Third Parties or others, unless otherwise determined by the Company.",
        "If Promotions are used by another party, the Company will not replace such Promotions or be responsible for any User Losses.",
      ]} />
    </Pasal>

    <Pasal title="Article 20 - Taxes and Fees">
      <p className="text-justify">Taxes will be borne by each party in accordance with applicable general tax provisions. Any unexpected costs that arise when using the Service will be charged to Users unless applicable regulations require such additional costs to be borne by the Company.</p>
    </Pasal>

    <Pasal title="Article 21 - Loss of Membership Status">
      <p className="text-justify">If a User loses their membership status, the User will lose all Promotion rights they hold. With the loss of membership status, Users also lose their rights against the Company.</p>
    </Pasal>

    <Pasal title="Article 22 - Promotion Changes">
      <Ol items={[
        "Users agree that the Company may remove Promotions, suspend the granting of vouchers/coupons and modify the content of Promotion Services such as changes to, subject matter and discount amounts, validity periods, and others at any time.",
        "The Company is not responsible for anything if Losses or damage occur to Users due to the changes mentioned in paragraph (1).",
      ]} />
    </Pasal>

    <Bab title="CHAPTER 5 - Purchases" />

    <Pasal title="Article 23 - Price Quotation">
      <Ol items={[
        "The Company provides a Service for price quotations, both online through the Site, conducted independently by Users, or offline requests that will be processed by the Company.",
        "Offline price quotation requests only apply to Users who already have an account on the Site with a Business Account type.",
        "Offline price quotations require processing time in accordance with the Policy.",
        "Users agree that the Company has the right to refuse to provide a price quotation if there is non-conformity with the Company&apos;s policies.",
      ]} />
    </Pasal>

    <Pasal title="Article 24 - Product Purchases">
      <Ol items={[
        "Users are entitled to purchase products through the Site.",
        "Users will receive an order number that will serve as identification of the order after each placement.",
      ]} />
    </Pasal>

    <Pasal title="Article 25 - Order Acceptance">
      <p className="text-justify">After a User places an order on the Site, the Company&apos;s system will send an email to the User to confirm receipt of the order and provide information on the order completion mechanism.</p>
    </Pasal>

    <Pasal title="Article 26 - Transfer of Ownership">
      <p className="text-justify">Regardless of the payment method and form of delivery, ownership of all products purchased will be transferred to the User at the time the User receives the product.</p>
    </Pasal>

    <Pasal title="Article 27 - Cancellation">
      <Ol items={[
        <>If any of the following occurs, the Company may cancel or stop the sales process of a User&apos;s order without prior notice:
          <Ol sub items={[
            "The User violates the Policy;",
            "There has been a payment rejection notice from the debit or credit card used by the User;",
            "The product cannot be delivered due to incorrect or inaccessible address or the absence of the relevant User;",
            "False information data is found in the Personal Data provided by the relevant User;",
          ]} /></>,
        "In addition to the provisions mentioned in the preceding paragraph, the Company may cancel or stop sales and take appropriate action if there is any dishonest act or improper conduct related to the User&apos;s use of the Service and Site.",
        "Users may cancel or stop the purchase of an order using features available on the Site and/or if the order has been received by the Company as stated in the Purchase Order (\"PO\"), the User may cancel within 2 (two) business days from the time the PO is processed by the Company.",
        "Without prejudice to the provisions in paragraph 4 of this Article, cancellation requests submitted beyond the stipulated time period may still be processed based on the Company&apos;s consideration and policies.",
        "In the event that the User does not provide notice regarding order cancellation within the period specified in paragraph 4 of this Article, the User is deemed to have approved the order and is obligated to make payment to the Company.",
      ]} />
    </Pasal>

    <Bab title="CHAPTER 6 - Payment" />

    <Pasal title="Article 28 - Scope of Payment">
      <Ol items={[
        "Users must pay all order costs including value added tax, shipping and handling, and other fees determined by the Company, as will be reasonably notified by the Company to Users at the time of the checkout process.",
        "The Company may accept payment by bank account transfer in Indonesian Rupiah currency.",
        "Users who provide a deposit/security deposit for the total value of an order to the Company at the time of placing an order may have such deposit returned by the Company in the event of the circumstances mentioned in Article 27 and/or Article 31 and/or as determined by the Company.",
      ]} />
    </Pasal>

    <Pasal title="Article 29 - Late Payment Penalty (Term of Payment Only)">
      <Ol items={[
        "The provisions in this Article apply specifically to Customers who agree to and/or are approved to use the payment mechanism based on a Term of Payment (TOP).",
        "Customers must make full payment of each invoice on time in accordance with the TOP period established by the Company.",
        "In the event that the User makes a late payment or fails to make invoice payment beyond the due date, the Company has the right to impose a late payment penalty in accordance with the provisions applicable and established by the Company from time to time.",
        "The imposition of late payment penalties does not eliminate the Customer&apos;s obligation to pay the remaining principal invoice and does not limit the Company&apos;s right to suspend subsequent shipments, terminate Service, or pursue other collection legal actions.",
      ]} />
    </Pasal>

    <Pasal title="Article 30 - Payment Methods">
      <Ol items={[
        "Several payment methods provided by the Company on the Site may be selected by Users when placing orders, subject to the terms of each payment method.",
        "The Company cooperates with Third Parties in a Payment Gateway for several types of available payment methods.",
        "Payment by debit or credit card must be in accordance with the contract agreed between the User and the debit or credit card issuing company. The Company is not responsible for conflicts that may arise between Users and the debit or credit card issuing company.",
      ]} />
    </Pasal>

    <Bab title="CHAPTER 7 - Invoices and Tax Invoices" />

    <Pasal title="Article 31 - Invoice and Tax Invoice Terms">
      <Ol items={[
        "The Company may issue invoices and tax invoices for orders placed by Users representing a company.",
        "The Company will send invoices and tax invoices, either in soft copy or printed form if requested by Users, in accordance with the Company&apos;s applicable rules.",
        <>In the event of a tax invoice request, Users must provide the following information to the Company:
          <Ol sub items={[
            "Company name;",
            "Address and phone number;",
            "NPWP number;",
            "NPWP registered address.",
          ]} /></>,
        "The content and timing of issuance and/or delivery of invoices and tax invoices follow the rules determined by the Company in the Help Center.",
        "Users are allowed to request changes to invoice and/or tax invoice information from the Company if there are discrepancies with related documents issued by the User.",
      ]} />
    </Pasal>

    <Bab title="CHAPTER 8 - Returns and Refunds" />

    <Pasal title="Article 32 - Returns">
      <Ol items={[
        <>Users are entitled to request product returns if the following conditions of the received product are found:
          <Ol sub items={[
            "Manufacturing defect;",
            "Not functioning properly (malfunction);",
            "Not in accordance with information provided on the Site;",
            "Missing parts;",
            "Damaged during delivery;",
            "Wrong delivery of goods, in terms of type or quantity.",
          ]} /></>,
        <>In terms of return policy, the Company stipulates the following conditions that must be met by Users:
          <Ol sub items={[
            "The acceptable submission period is from when the goods are received by the User until the deadline informed on the Site;",
            "Users may include parts of the item to be returned that form an integral part of the sold item;",
            "Users provide truthful information regarding the condition of the goods received, supported by photo attachments;",
            "Users are willing to wait for the validation process conducted by the Company;",
            "Users comply with the decision or solution provided by the Company regarding the submitted return request.",
          ]} /></>,
      ]} />
    </Pasal>

    <Pasal title="Article 33 - Refunds">
      <Ol items={[
        "The Company will refund funds to Users in the event of order cancellation, product returns, overpayment, or other matters that may cancel the purchase and payment process without harming the Company.",
        "The Company determines the refund period in accordance with the Company&apos;s capacity and the policies of each bank designated by the User.",
        "Refunds will be made through bank transfer or credit balance return to the User&apos;s credit card used to make payment for the relevant goods.",
        <>For refund processing via bank transfer, the Company requires bank account information including:
          <Ol sub items={[
            "Bank Name;",
            "City and Bank Branch;",
            "Account Number;",
            "Account Holder Name (must match the name in the savings book/bank statement)",
          ]} /></>,
        "The Company is not obligated to verify the accuracy of the account submitted by the User for the refund process.",
        "The Company is not responsible for any legal consequences and Losses arising from the User&apos;s provision of information and/or misuse of account numbers and account holder names.",
        "The Company has the right to request proof of payment transfer made by the User for the Company&apos;s internal needs.",
        "The Company will send information via email that the refund process has been completed.",
      ]} />
    </Pasal>

    <Bab title="CHAPTER 9 - Products and Prices" />

    <Pasal title="Article 34 - Product Procurement">
      <Ol items={[
        "The terms regarding the provision of goods to be sold are determined solely by the Company.",
        "The Company provides goods legally, whether obtained from local sources or imported from abroad.",
        "In the process of providing goods until the goods are ready to be shipped (hereinafter referred to as the \"Goods Preparation Period\"), the Company requires varying amounts of time, the information for which is displayed on the Site.",
        "The Company has the right to change the Goods Preparation Period at any time in accordance with the Company&apos;s interests without prior notice to Users.",
        "Users understand that delays may occur in the Goods Preparation Period for reasonable reasons, including transportation delays due to force majeure such as traffic conditions or bad weather, public holidays, and religious holidays.",
      ]} />
    </Pasal>

    <Pasal title="Article 35 - Product Information">
      <Ol items={[
        "The Company will make its best efforts to maintain the accuracy and quality of information delivered through the Site. However, the Company cannot guarantee and is not legally responsible for the accuracy or completeness of information provided regarding product information on the Site.",
        "The Company will communicate with suppliers if there is inaccurate product information, descriptions, prices or images based on complaints or reports from Users.",
        "All objections from Users regarding discrepancies between goods received and product information provided through the Site will follow the provisions of Article 31 on Returns.",
      ]} />
    </Pasal>

    <Pasal title="Article 36 - Prices">
      <Ol items={[
        "The price to be paid by the User is the price displayed when the User confirms payment of the order on the Site.",
        "All product prices listed on the Site exclude VAT, except for Non-Taxable Goods (BTKP), in accordance with tax regulations in Indonesia.",
        "The Company has the right to change product prices on the Site at any time without providing any reason or prior notice.",
        "If there is an unintentional pricing error for goods on the Service, the Company will notify Users in writing of the error and will offer Users the option to cancel the order or proceed with the ordering process using the correct price.",
        "Users agree to pay the total amount due, consisting of the price of goods, shipping costs, handling fees and other costs that may arise.",
      ]} />
    </Pasal>

    <Bab title="CHAPTER 10 - Shipping and Delivery" />

    <Pasal title="Article 37 - Shipping Terms">
      <Ol items={[
        "In addition to using the Company&apos;s delivery service known as Monotaro Express, the Company also cooperates with Third Parties in delivery services designated by the Company.",
        <>The Company has full authority over the matters listed below and Users are subject to the conditions determined by the Company:
          <Ol sub items={[
            "Determining the operational working hours of the Company&apos;s logistics team;",
            "Appointing the delivery service to be used for each User, product or delivery area;",
            "Scheduling order deliveries in accordance with the Company&apos;s interests.",
          ]} /></>,
        "Taking into account the capacity of delivery service companies, the Company has the authority to determine the delivery period for goods to each destination delivery area.",
        "Delivery periods listed on the Site are estimates and the Company has the right to change them at any time without prior notice.",
        "The Company does not guarantee that every delivery period will not experience delays due to reasonable reasons, including transportation delays due to force majeure such as traffic conditions or bad weather, public holidays, and religious holidays.",
        "The estimated delivery period stated on the Site is calculated from when the goods are ready to be shipped by the logistics team, and such period does not include the goods procurement period.",
        "Delivery of certain types of goods, such as liquids, gases and flammable materials, may take longer than indicated on the Site due to different shipping handling requirements.",
        "Delivery to certain difficult-to-reach areas such as isolated islands or remote locations may take longer than indicated on the Site or even result in a refusal to deliver to such areas.",
      ]} />
    </Pasal>

    <Bab title="CHAPTER 11 - Privacy and Personal Data Protection" />

    <Pasal title="Article 38 - Use of Personal Data">
      <Ol items={[
        <>The Company has full authority to process Personal Data in the following cases:
          <Ol sub items={[
            "Processing all forms of requests, activities and transactions made by Users through the Site, including for the purpose of delivering products to Users.",
            "Providing features to deliver, realize, maintain and improve the Company&apos;s products and services.",
            "Assisting Users when communicating with the Company&apos;s customer service.",
            "Contacting Users via email, letter, telephone, fax, or other means deemed reasonable by the Company.",
            "Using information obtained from Users for the purposes of research, analysis, product development and testing.",
            "Informing Users about products, services, promotions, studies, surveys, news, latest developments, events and other matters related to the Service.",
            "Monitoring or investigating suspicious transactions or transactions that are indicated to contain elements of fraud or violation of the Terms and Conditions.",
          ]} /></>,
        "The Site uses Cookie functions and other tracking technologies for better Service. By using the Site, Applicants/Users agree to use our Cookie functions.",
        "The Company will use Personal Data for a limited period and will deactivate the User&apos;s Personal Data without delay if the User submits termination of their membership and/or withdraws consent for Personal Data processing, in accordance with Applicable Law.",
      ]} />
    </Pasal>

    <Pasal title="Article 39 - Personal Data Protection">
      <Ol items={[
        "The Company collects, processes and uses the Personal Data of Applicants/Users only within the necessary scope and in a lawful and proper manner.",
        "The Company will take technological, administrative and physical measures to ensure that Applicants&apos;/Users&apos; Personal Data is not lost, misused, accessed and disclosed without authorization, falsified, or damaged.",
        <>The Company does not sell, lend, transfer or disclose Personal Data to any Third Party without the consent of the Applicant/User, except for the following:
          <Ol sub items={[
            "Complying with legal provisions or decisions of administrative authorities or judicial institutions;",
            "User violations related to Indonesian law or policies;",
            "Other matters decided by the Company in accordance with Applicable Law or the Site&apos;s usage policies.",
          ]} /></>,
        "In the event of a failure in Personal Data protection as regulated in this Article, the Company will provide written notification to the owner of such Personal Data.",
      ]} />
    </Pasal>

    <Bab title="CHAPTER 12 - Other Provisions" />

    <Pasal title="Article 40 - Prohibition on Transfer">
      <p className="text-justify">Users will not transfer, lend or sell their rights from the Service to Third Parties.</p>
    </Pasal>

    <Pasal title="Article 41 - Compensation">
      <p className="text-justify">The Company is not responsible or obligated to provide compensation for Losses suffered by Users or Third Parties arising from delays in use, suspension of modifications, deletion of disclosure of Service, or loss of information provided by Users or Third Parties to the Company in connection with the use of the Service, where such matters are not caused by acts or errors actually committed by the Company.</p>
    </Pasal>

    <Pasal title="Article 42 - Intellectual Property Rights">
      <p className="text-justify">Users are not permitted to copy Intellectual Property Rights from the Service. All Intellectual Property Rights of service pages and images are absolutely owned by the Company, and therefore it is prohibited to duplicate, distribute, transfer, lend, translate, use, reproduce, exploit or reuse Content in accordance with Applicable Law.</p>
    </Pasal>

    <Pasal title="Article 43 - Prohibited Actions" last>
      <p className="mb-2 text-justify">Users are prohibited from committing the following actions in using the Service:</p>
      <Ol items={[
        "Disrupting the operation of the Service and obstructing the Service;",
        "Unauthorized use of debit or credit cards;",
        "Conduct that causes or may cause damage or harm to the Company or Third Parties;",
        "Violation of Intellectual Property Rights, privacy or other rights of the Company or Third Parties;",
        "Conduct that disturbs general conventions and/or social order;",
        "Criminal acts or related conduct;",
        "Inaccurate statements or submissions during registration, such as email address or related information;",
        "Business activities conducted using Service facilities illegally for profit purposes;",
        "Damaging the objectivity and credibility of the Company;",
        "Using or providing malicious programs such as computer viruses or hacking activities;",
        "Stealing email addresses and passwords from other members;",
        "Failure to pay invoices and/or delaying payment for products purchased through the Service;",
        "Failure to pay invoices and/or delaying payment for any invoice arising from product purchases through the Service using the Term of Payment (TOP) method, which may be subject to late payment penalties as regulated in Article 29 of this Policy;",
        "Violation of the Policy;",
        "Violation of Applicable Law, both domestic and international;",
        "Using the Service in a manner inconsistent with its intended purpose;",
        "Connecting the Service to other databases without the Company&apos;s approval;",
        "Illegal access to and damage of data on the Service&apos;s computer servers;",
        "Using the Service to facilitate acts related to money laundering offenses or offenses related to facilitation of terrorism;",
        "Using the Service in actions that may cause conflict or harm aspects of SARA;",
        "Reselling goods purchased from the Company for profit as a repeated business activity or livelihood; and/or",
        "Other actions not mentioned above that result in or cause harm to the Company.",
        "The Company hereby reserves all rights it has under applicable laws and regulations to take any legal action that may be taken or carried out by the Company arising from or in connection with violations by Users of the prohibited matters as described above.",
      ]} />
    </Pasal>
  </>;
}

function IdContent() {
  return <>
    {/* BAB 1 */}
    <Bab title="BAB 1 - Ketentuan Umum" />

    <Pasal title="Pasal 1 - Lingkup Kebijakan">
      <p className="mb-2 text-justify">Kebijakan ini mengatur hubungan antara Perusahaan dengan para Pengguna yang menggunakan Situs dalam penggunaan layanan belanja atau transaksi maupun layanan-layanan atau fitur-fitur terkait lainnya yang diselenggarakan oleh Perusahaan melaui Situs dimana Perusahaan beroperasi (selanjutnya bersama-sama disebut sebagai &ldquo;Layanan&rdquo;).</p>
      <TermDef term="&ldquo;Akun&rdquo;" def="berarti akun transaksi Pengguna yang dibuka dengan metode yang ditentukan Perusahaan dalam rangka agar Perusahaan menyediakan Layanan kepada Pengguna setelah Pengguna setuju terhadap Kebijakan." />
      <TermDef term="&ldquo;Data Pribadi&rdquo;" def="berarti setiap data Pemohon/Pengguna Layanan baik yang teridentifikasi dan/atau dapat diidentifikasi secara tersendiri atau dikombinasi dengan informasi lainnya baik secara langsung maupun tidak langsung." />
      <TermDef term="&ldquo;Cookies&rdquo;" def="berarti jejak atau riwayat halaman yang dikunjungi;" />
      <TermDef term="&ldquo;Hukum yang Berlaku&rdquo;" def="berarti undang-undang, aturan, peraturan, adat, penggunaan, praktik, putusan, interpretasi, arahan, arah, keputusan, pedoman, pemberitahuan, catatan praktik dan surat edaran dari semua Badan Pengatur yang berwenang untuk waktu berlaku yang berlaku dan mengikat pihak terkait atau penggunaan atau penawaran dari Layanan." />
      <TermDef term="&ldquo;Konten&rdquo;" def="berarti informasi digital daring (online) atau material yang disediakan oleh Perusahaan atau Pihak Ketiga kepada Pengguna dalam bentuk tanda, surat, diagram, warna, suara, bunyi, gambar, video (atau dalam bentuk kombinasi apapun dari apa yang telah disebut di atas)." />
      <TermDef term="&ldquo;Hak Kekayaan Intelektual&rdquo;" def="berarti hak cipta, paten, hak atas model utilitas, hak merek dagang, hak desain atau hak kekayaan intelektual lainnya (termasuk hak untuk mendapatkan hak tersebut atau untuk memohonkan pendaftaran, dan hak lainya sejenis);" />
      <TermDef term="&ldquo;Kerugian&rdquo;" def="berarti semua kerugian, pertanggungan, biaya (termasuk biaya hukum), pembebanan, pengeluaran, tindakan, proses-proses beracara, klaim dan tuntutan;" />
      <TermDef term="&ldquo;Pemohon&rdquo;" def="berarti orang atau badan hukum yang bertujuan untuk menjadi Pengguna Layanan di Situs dengan mendaftarkan Data Pribadinya di Situs." />
      <TermDef term="&ldquo;Pengguna&rdquo;" def="berarti orang atau badan hukum yang berhasil terdaftar untuk memiliki Akun dalam Situs Perusahaan dan berhak untuk menggunakan fasilitas-fasilitas Layanan pada Situs." />
      <TermDef term="&ldquo;Peringkat&rdquo; (rating)" def="berarti fitur tingkat penilaian yang diberikan oleh Pengguna pada produk yang ditampilkan oleh Perusahaan di Situs." />
      <TermDef term="&ldquo;Pihak Ketiga&rdquo;" def="berarti setiap pihak baik perorangan atau badan usaha (baik yang berupa badan hukum maupun bukan badan hukum) selain daripada Perusahaan maupun pihak terafiliasinya dan/atau Pengguna." />
      <TermDef term="&ldquo;Pusat Bantuan&rdquo;" def="berarti laman bantuan Situs yang terdapat pada tautan: https://support.monotaro.id/hc/id" />
      <TermDef term="&ldquo;SARA&rdquo;" def="berarti suku, agama, ras, dan antargolongan." />
      <TermDef term="&ldquo;Ulasan&rdquo; (review)" def="berarti fitur ulasan yang diberikan oleh Pengguna pada produk yang ditampilkan oleh Perusahaan di Situs." />
    </Pasal>

    <Pasal title="Pasal 2 - Perjanjian dan Modifikasi">
      <Ol items={[
        "Pemohon/Pengguna menjamin, berjanji, dan dianggap telah membaca dan menyetujui Kebijakan yang mengatur ketentuan dan kondisi penawaran atau penggunaan Layanan. Kebijakan berlaku kepada Pemohon/Pengguna pada setiap saat penyampaian informasi-informasi untuk tujuan pembuatan Akun Keanggotaan sesuai prosedur yang ditetapkan di Situs.",
        "Perusahaan berhak untuk membuat perubahan atas Kebijakan sewaktu-waktu dengan tunduk pada Hukum yang Berlaku. Perusahaan akan memberitahukan Pengguna atas perubahan yang dilakukan pada Kebijakan, dengan mem-posting sebuah pemberitahuan pada atau melalui Situs atau sesuai dengan metode yang ditentukan Perusahaan secara wajar.",
        "Jika Pengguna tidak setuju terhadap perubahan yang dilakukan Perusahaan terhadap Kebijakan, Pengguna berhak untuk mengakhiri Layanan sesuai dengan metode yang disediakan di Situs. Penggunaan Layanan setelah Tanggal Berlaku Perubahan merupakan persetujuan Pengguna untuk diikat oleh Kebijakan sebagaimana telah diubah oleh Perusahaan.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 3 - Kelayakan Penggunaan Layanan">
      <Ol items={[
        "Pengguna wajib menggunakan Layanan sesuai dengan ketentuan-ketentuan yang diatur oleh Perusahaan dalam Kebijakan ini, atau kebijakan yang diatur secara terpisah di Pusat Bantuan. Pengguna dilarang melakukan penggunaan Layanan untuk keperluan yang bertentangan atau yang dilarang oleh hukum dan peraturan perundangan yang berlaku.",
        <>Pemohon wajib tunduk dan mengikuti syarat dan ketentuan yang sebagaimana ditetapkan oleh Perusahaan berdasarkan Kebijakan ini. Pemohon harus menyediakan Perusahaan dengan informasi dan dokumen bahwa Pemohon memenuhi kriteria:
          <Ol sub items={[
            "Pemohon harus memenuhi permohonan informasi dan/atau formulir registrasi yang disyaratkan Perusahaan dalam Situs;",
            "Pemohon harus memiliki kapasitas hukum untuk mengadakan perjanjian;",
            "Pemohon harus memberi konfirmasi bahwa permohonan dibuat atas namanya sendiri dan bahwa Akun, setelah aktivasi akan digunakan oleh Pemohon untuk akunnya sendiri dan bukan sebagai agen dari Pihak Ketiga manapun;",
            "Pemohon harus memenuhi kriteria dan prosedur sebagaimana dapat ditentukan oleh Perusahaan dan diberitahukan kepada Pemohon dari waktu ke waktu sesuai dengan kebijakan internal Perusahaan atau yang disyaratkan oleh Hukum yang Berlaku.",
          ]} /></>,
        "Perusahaan mempunyai diskresi tunggal dan absolut untuk menentukan kelayakan Pemohon terkait pendaftaran keanggotaan Layanan. Perusahaan namun tidak diwajibkan untuk memberikan alasan apapun kepada Pemohon dalam menolak permohonan Pemohon.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 4 - Pemutusan Layanan dan Penghapusan Pendaftaran Keanggotaan">
      <Ol items={[
        <>Perusahaan dapat menangguhkan penyediaan Layanan, menghapus Akun dan mengambil langkah-langkah hukum lain yang diperlukan oleh Perusahaan tanpa pemberitahuan sebelumnya kepada Pengguna, jika Pengguna melakukan salah satu dari hal-hal sebagai berikut:
          <Ol sub items={[
            "Pengguna diketahui telah melanggar Kebijakan;",
            "Keterlambatan dalam membayar biaya Layanan atau kegagalan dalam memenuhi persyaratan lain yang disyaratkan oleh Perusahaan di Pusat Bantuan;",
            "Pengguna melakukan tindakan-tindakan sebagaimana diatur dalam Pasal 42;",
          ]} /></>,
        "Dalam hal terjadi Kerugian pada Perusahaan atau Pihak Ketiga yang ditimbulkan akibat pelanggaran Kebijakan oleh Pengguna, Pengguna harus mengganti semua biaya Kerugian yang dialami oleh Perusahaan atau Pihak Ketiga tersebut.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 5 - Isi Publikasi">
      <Ol items={[
        "Perusahaan memastikan untuk tidak memuat informasi yang dilarang dalam Hukum Yang Berlaku. Namun, Pengguna harus mengevaluasi informasi berkaitan dengan Layanan, khususnya untuk informasi yang diberikan oleh Pihak Ketiga, termasuk, namun tidak terbatas pada, kepercayaan pada kelengkapan dan keakuratan informasi yang tercantum.",
        "Perusahaan berhak untuk mengubah dan menghapus informasi apapun dalam Situs sesuai dengan kebutuhan Perusahaan.",
      ]} />
    </Pasal>

    <Bab title="BAB 2 - Pelanggan" />

    <Pasal title="Pasal 6 - Registrasi">
      <Ol items={[
        "Pemohon yang akan melakukan pendaftaran keanggotaan wajib mematuhi prosedur di Situs sebagaimana dipersyaratkan oleh Perusahaan.",
        <>Pendaftaran keanggotaan dianggap selesai ketika Perusahaan menyetujui pendaftaran yang disebutkan dalam ayat (1). Akan tetapi, dalam hal-hal berikut, Perusahaan wajib menolak pendaftaran atau membatalkan pendaftaran setelah ditemukan oleh Perusahaan bahwa:
          <Ol sub items={[
            "Pemohon membuat pernyataan yang tidak akurat;",
            "Hal lain yang ditentukan oleh Perusahaan bahwa Pemohon tidak berhak untuk mendapatkan status keanggotaannya.",
          ]} /></>,
      ]} />
    </Pasal>

    <Pasal title="Pasal 7 - Manajemen dan Tanggung Jawab Alamat Surel & Kata Sandi">
      <Ol items={[
        "Pengguna harus mendaftarkan alamat surel dan kata sandi untuk mendapatkan status keanggotaan pada Situs. Pengguna tidak boleh mengalihkan, meminjamkan, atau menjual alamat surel dan kata sandi atau menggunakannya sebagai jaminan kepada Pihak Ketiga.",
        "Alamat surel dan kata sandi yang terdaftar dapat digunakan di semua bagian Situs.",
        "Pengguna adalah satu-satunya pihak yang bertanggung jawab atas penggunaan dan pengelolaan alamat surel dan kata sandinya, dan harus bertanggung jawab atas semua hal yang dilakukan di Situs.",
        "Perusahaan tidak bertanggung jawab atas Kerugian Pengguna yang diakibatkan oleh penggunaan alamat surel dan kata sandi oleh Pihak Ketiga, baik disengaja atau tidak disengaja atau merupakan kesalahan dari Pengguna.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 8 - Pengakhiran Keanggotaan">
      <Ol items={[
        "Jika Pengguna melakukan salah satu tindakan yang dilarang sebagaimana diatur dalam Pasal 42, Perusahaan dapat menangguhkan penyediaan Layanan tanpa pemberitahuan atau peringatan sebelumnya kepada Pengguna maupun menonaktifkan keanggotaannya secara permanen.",
        "Pengguna harus mengganti rugi kepada Perusahaan jika Pengguna melakukan tindakan sebagaimana diatur dalam Pasal 42, dan Pengguna juga harus menanggung Kerugian jika Perusahaan melakukan proses hukum yang timbul akibat tindakan pelanggaran Pengguna atas Pasal 42.",
        "Pengguna harus memberitahu Perusahaan jika Pengguna membatalkan keanggotaan karena alasannya sendiri dengan menghubungi Perusahaan melalui surel ke cs@monotaro.id dengan tujuan untuk menonaktifkan akun.",
      ]} />
    </Pasal>

    <Bab title="BAB 3 - Peringkat & Ulasan" />

    <Pasal title="Pasal 9 – Penggunaan Layanan Peringkat dan Ulasan">
      <p className="text-justify">Pengguna dapat menggunakan layanan Peringkat &amp; Ulasan di Situs Perusahaan.</p>
    </Pasal>

    <Pasal title="Pasal 10 - Penggunaan Ulasan Konten">
      <Ol items={[
        "Perusahaan dapat menggunakan Ulasan tanpa pemberitahuan sebelumnya kepada Pengguna yang berkontribusi. Pengguna setuju bahwa Perusahaan juga dapat menggunakan Ulasan dalam reproduksi, kutipan, pengungkapan, penawaran, publikasi, distribusi daring (online) dan bentuk lainnya tanpa harus membayar biaya apapun kepada Pengguna.",
        "Pengguna tidak diperbolehkan untuk mereproduksi, mengubah, mengedit atau menyalin isi Ulasan yang dikontribusikan oleh orang lain atau Pengguna lain kecuali ditentukan lain oleh Perusahaan.",
        "Pengguna setuju bahwa periode penampilan dan penyimpanan Ulasan ditentukan sepenuhnya oleh Perusahaan sesuai dengan penilaiannya.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 11 - Batasan Kontribusi Ulasan dan Tanggung Jawab Pengguna">
      <Ol items={[
        <>Perusahaan dapat membatalkan voucher/kupon tanpa pemberitahuan sebelumnya kepada Pengguna jika Perusahaan menilai bahwa Pengguna diduga dan/atau terlibat dalam salah satu hal berikut:
          <Ol sub items={[
            "Fitnah terhadap Perusahaan atau Pihak Ketiga;",
            "Terkait dengan kejahatan atau mendorong kejahatan;",
            "Melanggar Hukum Yang Berlaku;",
            "Menghasilkan publisitas untuk tujuan keuntungan;",
            "Memberitakan klaim politik dan agama tertentu;",
            "Membahayakan reputasi Perusahaan tanpa dasar atau dapat meningkatkan permasalahan kredit;",
            "Melanggar atau mungkin melanggar Hak Kekayaan Intelektual, kredit, privasi dan hak-hak lain Perusahaan atau Pihak Ketiga;",
            "Mengungkapkan diskriminasi;",
            "Unsur vulgar, berbahaya, kasar dan ancaman, kekerasan, atau menakut-nakuti bagi pihak lain;",
            "Bertentangan dengan ketertiban umum atau norma sosial yang berlaku umum;",
            "Mengandung informasi pribadi, seperti nama, nomor telepon, alamat surel, alamat rumah, tempat kerja, nomor kartu kredit dan nomor rekening bank;",
            "Mengandung program atau script berbahaya, seperti virus dan lainnya; dan/atau",
            "Hal-hal lain yang berhubungan dengan hal-hal sebagaimana disebutkan di atas yang menurut Perusahaan dirasakan tidak pantas.",
          ]} /></>,
        <>Bila ditemukan suatu pelanggaran terhadap ketentuan yang disebutkan pada ayat (1), Perusahaan dapat mengambil langkah-langkah sebagai berikut:
          <Ol sub items={[
            "Penghapusan Peringkat dan Ulasan yang melanggar ketentuan pada ayat sebelumnya;",
            "Menangguhkan penggunaan Peringkat dan Ulasan untuk Pengguna yang melanggar.",
            "Langkah-langkah lain yang dianggap perlu oleh Perusahaan.",
          ]} /></>,
        "Pengguna yang memberikan Ulasan sebagaimana diatur dalam ayat (1) akan mengganti semua Kerugian kepada Perusahaan atau Pihak Ketiga yang timbul akibat pelanggaran tersebut.",
        "Pengguna bertanggung jawab sepenuhnya atas pertanyaan, keluhan dan permintaan dari Pihak Ketiga yang terkait dengan Ulasan Pengguna yang melanggar Kebijakan.",
        "Dalam hal Pihak Ketiga mengajukan klaim atas Ulasan yang diberikan oleh Pengguna, Perusahaan dapat mengungkapkan Data Pribadi Pengguna sesuai dengan Hukum Yang Berlaku.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 12 - Pembebasan Klausul">
      <Ol items={[
        "Isi Ulasan harus didasarkan pada pengalaman Pengguna. Pengguna wajib melakukan analisa tersendiri atas produk-produk yang akan dibeli melalui Layanan mengingat pengalaman dari masing-masing pengguna dapat berbeda-beda.",
        "Pengguna bertanggung jawab sepenuhnya atas pertanyaan, keluhan dan permintaan dari Pihak Ketiga yang terkait dengan Ulasan Pengguna yang melanggar Kebijakan.",
        "Pengguna sepenuhnya menyadari bahwa dapat terjadi penghentian secara sementara atau permanen dari Layanan karena keadaan yang tidak dapat dihindari seperti pemeliharaan sistem Perusahaan atau kerusakan pada jalur komunikasi.",
        "Perusahaan tidak bertanggung jawab atas hilangnya informasi Pengguna sehubungan dengan Layanan yang timbul akibat dari atau sehubungan dengan kelalaian yang nyata oleh Perusahaan. Perusahaan akan menginformasikan Pengguna dalam waktu 3x24 jam apabila terjadi peristiwa tersebut.",
      ]} />
    </Pasal>

    <Bab title="BAB 4 - Promosi" />

    <Pasal title="Pasal 13 - Kupon Promosi">
      <Ol items={[
        "Situs menyediakan program promosi yang dapat berupa voucher/kupon dan hadiah (selanjutnya bersama-sama disebut sebagai \"Promosi\") untuk Pengguna dengan ketentuan tertentu.",
        "Perusahaan dapat memberikan voucher/kupon kepada Pengguna, sesuai dengan kondisi dan prosedur yang ditetapkan Perusahaan secara terpisah.",
        "Pengguna setuju bahwa Perusahaan dapat memodifikasi keberadaan, kondisi dan prosedur pemberian voucher/kupon setiap saat tanpa pemberitahuan sebelumnya kepada Pengguna sesuai Hukum Yang Berlaku.",
        "Dalam hal perolehan dan penggunaan voucher/kupon, Pengguna harus mematuhi Kebijakan.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 14 - Larangan Akumulasi/Pendaftaran Voucher/Kupon dan Pendaftaran Banyak Akun">
      <Ol items={[
        "Jika Pengguna memiliki beberapa voucher/kupon, Pengguna dilarang mengakumulasi voucher/kupon yang dimilikinya.",
        "Pengguna setuju bahwa Perusahaan berhak untuk membatalkan pemberian voucher/kupon jika Pengguna melakukan tindakan apapun yang diduga akan merugikan Perusahaan, antara lain membuat akun palsu untuk mendapatkan voucher/kupon.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 15 - Pembatalan">
      <Ol items={[
        "Perusahaan dapat membatalkan voucher/kupon dan hadiah yang diberikan kepada Pengguna untuk alasan yang tepat menurut penilaian Perusahaan sendiri seperti pembatalan produk dari pemasok, dan lain-lain tanpa pemberitahuan sebelumnya kepada Pengguna.",
        <>Perusahaan dapat membatalkan voucher/kupon tanpa pemberitahuan sebelumnya kepada Pengguna jika Perusahaan menilai bahwa Pengguna diduga dan/atau terlibat dalam salah satu hal berikut:
          <Ol sub items={[
            "Tindakan ilegal atau tindakan tidak jujur;",
            "Suatu pelanggaran atas Kebijakan;",
            "Hal-hal lain yang dinilai oleh Perusahaan sesuai untuk pembatalan pemberian voucher/kupon kepada Pengguna.",
          ]} /></>,
        "Masa berlaku kupon telah berakhir.",
        "Perusahaan tidak wajib untuk mengganti jika kupon dibatalkan atau kadaluwarsa.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 16 - Penyelesaian Sengketa Penggunaan Voucher/Kupon">
      <Ol items={[
        "Pengguna dapat membayar pesanan baik sebagian atau seluruhnya dengan voucher/kupon yang tingkat potongan dan jumlahnya ditentukan oleh Perusahaan untuk pembayaran di Situs.",
        "Perusahaan dapat menambahkan ketentuan tentang penggunaan voucher/kupon yang disebutkan dalam ayat (1) tanpa pemberitahuan sebelumnya kepada Pengguna.",
        "Jika Pengguna membatalkan pesanan, Perusahaan tidak akan mengganti voucher/kupon atau mengganti dalam bentuk nilai tunai dengan jumlah yang terkait dengan pembatalan pesanan.",
        "Jika Pengguna menggunakan voucher/kupon untuk pembayaran dan jumlah yang harus dibayarkan lebih rendah dari jumlah nominal voucher/kupon, Perusahaan tidak akan mengembalikan selisih nilai.",
        "Jika Pengguna menggunakan voucher/kupon untuk pembayaran dan tagihan berubah menjadi lebih tinggi, maka Pengguna harus membayar kekurangan dalam bentuk pembayaran lain.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 17 - Pembatalan Setelah Penggunaan Voucher/Kupon">
      <p className="text-justify">Jika voucher/kupon dibatalkan sebagaimana dimaksud dalam Pasal 14 setelah Pengguna menggunakan voucher/kupon untuk penyelesaian pembelian, pesanan produk dapat dibatalkan dan akan ditahan oleh Perusahaan. Jika Pengguna ingin tetap mendapatkan produk tersebut, Pengguna harus membayar secara tunai atau metode pembayaran lainnya yang ditentukan oleh Perusahaan.</p>
    </Pasal>

    <Pasal title="Pasal 18 - Tidak Ada Konversi Uang dan Jual Beli Promosi">
      <Ol items={[
        "Pengguna tidak dapat mengkonversi Promosi menjadi uang dengan alasan apapun.",
        "Pengguna yang berhak mendapatkan Promosi tidak diperbolehkan untuk memperdagangkan Promosi yang telah ditentukan Perusahaan kepada Pengguna yang tidak berhak.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 19 - Penggunaan Promosi Oleh Pihak Ketiga">
      <Ol items={[
        "Penggunaan Promosi akan dilakukan oleh Pengguna yang berhak dan bukan untuk Pihak Ketiga atau orang lain, kecuali ditentukan lain oleh Perusahaan.",
        "Jika Promosi digunakan oleh pihak lain, maka Perusahaan tidak akan mengganti Promosi tersebut atau bertanggung jawab untuk setiap Kerugian Pengguna.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 20 - Pajak dan Biaya">
      <p className="text-justify">Pajak akan ditanggung oleh masing-masing pihak sesuai dengan ketentuan umum perpajakan yang berlaku. Adapun biaya tak terduga apapun yang timbul saat menggunakan Layanan akan dibebankan kepada Pengguna kecuali apabila peraturan yang berlaku mensyaratkan biaya tambahan tersebut harus dibebankan kepada Perusahaan.</p>
    </Pasal>

    <Pasal title="Pasal 21 - Kehilangan Status Keanggotaan">
      <p className="text-justify">Jika Pengguna kehilangan status keanggotaannya, Pengguna akan kehilangan semua hak Promosi yang dimilikinya. Dengan hilangnya status keanggotaan, Pengguna juga kehilangan hak-haknya kepada Perusahaan.</p>
    </Pasal>

    <Pasal title="Pasal 22 - Perubahan Promo">
      <Ol items={[
        "Pengguna setuju bahwa Perusahaan dapat menghapus Promosi, menangguhkan pemberian voucher/kupon dan memodifikasi isi dari Layanan Promosi seperti perubahan, subjek dan jumlah diskon, masa berlaku, dan lain lain pada setiap saat.",
        "Perusahaan tidak bertanggung jawab atas apapun jika terjadi Kerugian atau kerusakan pada Pengguna karena perubahan yang disebutkan dalam ayat (1).",
      ]} />
    </Pasal>

    <Bab title="BAB 5 - Pembelian" />

    <Pasal title="Pasal 23 - Penawaran Harga">
      <Ol items={[
        "Perusahaan menyediakan Layanan untuk memberikan penawaran harga, baik secara daring (online) melalui Situs, yang dilakukan secara independen oleh Pengguna, atau permintaan secara luring (offline) yang akan diproses oleh Perusahaan.",
        "Permintaan penawaran harga secara luring (offline) hanya berlaku untuk Pengguna yang telah memiliki akun di Situs dengan jenis Akun Bisnis.",
        "Penawaran harga secara luring (offline) membutuhkan waktu pengerjaan dengan Kebijakan.",
        "Pengguna setuju bahwa Perusahaan memiliki hak untuk menolak memberikan penawaran harga jika terdapat ketidaksesuaian dengan kebijakan Perusahaan.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 24 - Pembelian Produk">
      <Ol items={[
        "Pengguna berhak untuk membeli produk melalui Situs.",
        "Pengguna akan mendapatkan nomor pesanan yang akan menjadi identifikasi pesanan yang telah dilakukan setelah setiap pemesanan.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 25 - Penerimaan Pesanan">
      <p className="text-justify">Setelah Pengguna melakukan pemesanan di Situs, sistem Perusahaan akan mengirim surel kepada Pengguna untuk mengkonfirmasi penerimaan pesanan dan memberikan informasi mekanisme penyelesaian pesanan.</p>
    </Pasal>

    <Pasal title="Pasal 26 - Pengalihan Kepemilikan">
      <p className="text-justify">Terlepas dari metode pembayaran dan bentuk pengiriman, kepemilikan semua produk yang dibeli akan dialihkan kepada Pengguna pada saat Pengguna menerima produk.</p>
    </Pasal>

    <Pasal title="Pasal 27 - Pembatalan">
      <Ol items={[
        <>Jika salah satu hal berikut terjadi, Perusahaan dapat membatalkan atau menghentikan proses penjualan pesanan dari Pengguna tanpa pemberitahuan sebelumnya:
          <Ol sub items={[
            "Pengguna melanggar Kebijakan;",
            "Telah terdapat pemberitahuan pembayaran yang ditolak dari kartu debit atau kartu kredit yang digunakan oleh Pengguna;",
            "Produk tidak dapat dikirim karena alamat yang salah atau tidak dapat diakses atau tidak adanya Pengguna yang bersangkutan;",
            "Data informasi palsu ditemukan dalam Data Pribadi yang diberikan oleh Pengguna yang bersangkutan;",
          ]} /></>,
        "Selain ketentuan yang disebutkan dalam ayat sebelumnya, Perusahaan dapat membatalkan atau menghentikan penjualan dan mengambil langkah yang tepat jika ada tindakan tidak jujur atau tindakan yang tidak pantas terkait penggunaan Layanan dan Situs oleh Pengguna.",
        "Pengguna dapat membatalkan atau menghentikan pembelian pesanan dengan menggunakan fitur yang tersedia di situs dan/atau jika pesanan telah diterima oleh Perusahaan sebagaimana tercantum dalam Purchase Order (\"PO\"), maka Pengguna dapat melakukan pembatalan dalam kurun waktu 2 (dua) hari kerja sejak PO diproses oleh Perusahaan.",
        "Tanpa mengesampingkan ketentuan pada ayat 4 Pasal ini, Pembatalan pesanan yang diajukan lebih dari kurun waktu yang telah ditentukan dapat tetap diproses berdasarkan pertimbangan dan kebijakan yang ditetapkan oleh Perusahaan.",
        "Dalam hal Pengguna tidak memberikan pemberitahuan sehubungan dengan pembatalan pesanan dalam kurun waktu sebagaimana disebutkan dalam ayat 4 Pasal ini, maka Pengguna dianggap telah menyetujui pemesanan dan wajib untuk melakukan pembayaran kepada Perusahaan.",
      ]} />
    </Pasal>

    <Bab title="BAB 6 - Pembayaran" />

    <Pasal title="Pasal 28 - Cakupan Pembayaran">
      <Ol items={[
        "Pengguna harus membayar semua biaya pemesanan termasuk pajak pertambahan nilai, pengiriman dan penanganan, serta biaya-biaya lain yang ditentukan oleh Perusahaan, sebagaimana akan diberitahukan secara wajar oleh Perusahaan kepada Pengguna pada saat proses penutupan pemesanan (check out).",
        "Perusahaan dapat menerima jenis pembayaran dengan transfer rekening Bank dan dalam mata uang Rupiah.",
        "Pengguna yang memberikan deposit/uang titipan/uang jaminan atas total nilai pesanan kepada Perusahaan pada saat pemesanan barang maka deposit tersebut dapat dikembalikan oleh Perusahaan apabila terjadi hal-hal yang disebutkan dalam Pasal 27 dan/atau Pasal 31 dan/atau ditentukan oleh Perusahaan.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 29 - Denda Keterlambatan Pembayaran (Khusus Pembayaran Tempo/Termin)">
      <Ol items={[
        "Ketentuan dalam Pasal ini berlaku khusus bagi Pelanggan yang menyetujui dan/atau disetujui untuk menggunakan mekanisme pembayaran berdasarkan Jangka Waktu (Term of Payment / TOP).",
        "Pelanggan wajib melakukan pelunasan penuh atas setiap tagihan tepat waktu sesuai dengan jangka waktu TOP yang telah ditetapkan oleh Perusahaan.",
        "Dalam hal Pengguna melakukan keterlambatan pembayaran atau tidak melakukan pembayaran tagihan hingga melewati tanggal jatuh tempo, Perusahaan berhak mengenakan denda keterlambatan sesuai dengan ketentuan yang berlaku dan ditetapkan oleh Perusahaan dari waktu ke waktu.",
        "Pengenaan denda keterlambatan tidak menghapuskan kewajiban Pelanggan untuk melunasi sisa pokok tagihan serta tidak membatasi hak Perusahaan untuk menangguhkan pengiriman barang berikutnya, menghentikan Layanan, atau menempuh upaya hukum penagihan lainnya.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 30 - Metode Pembayaran">
      <Ol items={[
        "Beberapa metode pembayaran yang disediakan oleh Perusahaan di Situs dapat dipilih oleh Pengguna saat melakukan pemesanan dengan mematuhi ketentuan dari masing-masing metode pembayaran.",
        "Perusahaan bekerja sama dengan Pihak Ketiga dalam 'Payment Gateway' untuk beberapa jenis metode pembayaran yang tersedia.",
        "Pembayaran dengan kartu debit atau kartu kredit harus sesuai dengan kontrak yang disepakati antara Pengguna dan perusahaan penerbit kartu debit atau kartu kredit. Perusahaan tidak bertanggung jawab atas konflik yang dapat terjadi antara Pengguna dan perusahaan penerbit kartu debit atau kartu kredit.",
      ]} />
    </Pasal>

    <Bab title="BAB 7 - Tagihan dan Faktur Pajak" />

    <Pasal title="Pasal 31 - Ketentuan Tagihan dan Faktur Pajak">
      <Ol items={[
        "Perusahaan dapat mengeluarkan tagihan dan faktur pajak atas pesanan yang dilakukan Pengguna sebagai perwakilan suatu perusahaan.",
        "Perusahaan akan mengirimkan tagihan dan faktur pajak, baik dalam bentuk soft copy atau lembaran yang dicetak jika diminta oleh Pengguna, sesuai dengan aturan yang berlaku di Perusahaan.",
        <>Dalam hal permintaan faktur pajak, Pengguna harus memberikan informasi berikut kepada Perusahaan:
          <Ol sub items={[
            "Nama perusahaan;",
            "Alamat dan nomor telepon;",
            "Nomor NPWP;",
            "Alamat terdaftar NPWP.",
          ]} /></>,
        "Isi dan waktu penerbitan dan/atau pengiriman tagihan dan faktur pajak mengikuti aturan yang ditentukan oleh Perusahaan di Pusat Bantuan.",
        "Pengguna diperbolehkan untuk mengajukan perubahan informasi tagihan dan/atau faktur pajak kepada Perusahaan jika terdapat perbedaan informasi yang tidak sesuai dengan dokumen terkait yang dikeluarkan oleh Pengguna.",
      ]} />
    </Pasal>

    <Bab title="BAB 8 - Pengembalian Barang dan Dana" />

    <Pasal title="Pasal 32 - Pengembalian Barang">
      <Ol items={[
        <>Pengguna berhak untuk mengajukan permintaan pengembalian barang jika ditemukan kondisi produk yang diterima sebagai berikut:
          <Ol sub items={[
            "Cacat produksi;",
            "Tidak berfungsi sebagaimana mestinya (malfungsi);",
            "Tidak sesuai dengan informasi yang diberikan di Situs;",
            "Terdapat bagian yang tidak lengkap;",
            "Rusak pada saat pengiriman;",
            "Salah pengiriman barang, baik jenis maupun jumlah.",
          ]} /></>,
        <>Dalam hal kebijakan pengembalian barang, Perusahaan menentukan hal-hal berikut yang harus dipenuhi oleh Pengguna:
          <Ol sub items={[
            "Masa berlaku pengajuan yang dapat diterima oleh Perusahaan adalah sejak barang diterima oleh Pengguna sampai batas waktu yang diinformasikan di Situs;",
            "Pengguna dapat menyertakan bagian-bagian dari barang yang akan dikembalikan yang menjadi satu kesatuan dari barang yang dijual;",
            "Pengguna memberikan informasi yang sebenarnya mengenai kondisi barang yang diterimanya dan dibuktikan dengan lampiran foto;",
            "Pengguna bersedia menunggu proses validasi yang dilakukan oleh Perusahaan;",
            "Pengguna tunduk terhadap hasil keputusan atau solusi yang diberikan oleh Perusahaan atas permintaan pengembalian barang yang diajukan.",
          ]} /></>,
      ]} />
    </Pasal>

    <Pasal title="Pasal 33 - Pengembalian Dana">
      <Ol items={[
        "Perusahaan akan mengembalikan dana kepada Pengguna jika terjadi pembatalan pesanan, pengembalian barang, kelebihan pembayaran, atau hal-hal lain yang dapat membatalkan proses pembelian dan pembayaran yang tidak merugikan Perusahaan.",
        "Perusahaan menentukan periode pengembalian dana sesuai dengan kemampuan Perusahaan, serta kebijakan setiap bank yang ditunjuk oleh Pengguna.",
        "Pengembalian dana akan dilakukan melalui proses transfer bank atau pengembalian saldo limit ke kartu kredit Pengguna yang digunakan untuk melakukan pembayaran barang terkait.",
        <>Untuk proses pengembalian dana melalui transfer bank, Perusahaan membutuhkan informasi akun bank yang mencakup:
          <Ol sub items={[
            "Nama Bank;",
            "Kota dan Cabang Bank;",
            "Nomor Rekening;",
            "Nama Pemilik Rekening (harus sesuai dengan nama yang tertera di buku tabungan/rekening koran)",
          ]} /></>,
        "Perusahaan tidak berkewajiban untuk memeriksa kebenaran rekening yang diajukan oleh Pengguna untuk proses pengembalian dana.",
        "Perusahaan tidak bertanggung jawab atas segala konsekuensi hukum dan Kerugian yang timbul dari penyampaian informasi Pengguna dan/atau penyalahgunaan nomor dan nama pemilik rekening.",
        "Perusahaan berhak meminta bukti transfer transaksi pembayaran yang dilakukan Pengguna untuk kebutuhan internal Perusahaan.",
        "Perusahaan akan mengirimkan informasi melalui surel bahwa proses pengembalian dana telah selesai dilakukan.",
      ]} />
    </Pasal>

    <Bab title="BAB 9 - Produk dan Harga" />

    <Pasal title="Pasal 34 - Pengadaan Barang">
      <Ol items={[
        "Ketentuan tentang penyediaan barang yang akan dijual ditentukan sepenuhnya oleh Perusahaan.",
        "Perusahaan menyediakan barang secara sah, baik yang diperoleh dari sumber lokal maupun diimpor dari luar negeri.",
        "Dalam proses penyediaan barang sampai barang siap dikirim (selanjutnya disebut sebagai \"Masa Persiapan Barang\"), Perusahaan membutuhkan waktu yang bervariasi dimana informasi tersebut ditampilkan pada Situs.",
        "Perusahaan berhak untuk setiap saat mengubah Masa Persiapan Barang sesuai dengan kepentingan Perusahaan tanpa pemberitahuan sebelumnya kepada Pengguna.",
        "Pengguna mengerti bahwa dapat terjadi keterlambatan pada Masa Persiapan Barang dikarenakan alasan yang wajar, termasuk keterlambatan transportasi karena keadaan kahar seperti kondisi lalu lintas atau cuaca buruk, hari libur, dan hari besar keagamaan.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 35 - Informasi Produk">
      <Ol items={[
        "Perusahaan akan melakukan upaya terbaiknya untuk menjaga keakuratan dan kualitas informasi yang disampaikan melalui Situs. Namun, Perusahaan tidak dapat menjamin dan tidak bertanggung jawab secara hukum atas keakuratan atau kelengkapan informasi yang diberikan mengenai informasi produk yang terdapat dalam Situs.",
        "Perusahaan akan berkomunikasi dengan pemasok jika terdapat informasi, deskripsi, harga atau gambar Produk yang tidak akurat berdasarkan keluhan atau laporan dari Pengguna.",
        "Semua keberatan dari Pengguna atas perbedaan barang yang diterima dengan informasi produk yang disampaikan melalui Situs akan mengikuti ketentuan Pasal 31 tentang Pengembalian Barang.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 36 - Harga">
      <Ol items={[
        "Harga yang harus dibayar oleh Pengguna adalah harga yang ditampilkan ketika Pengguna melakukan konfirmasi pembayaran pesanan di Situs.",
        "Semua harga barang yang dicantumkan di Situs belum termasuk PPN, kecuali Barang Tidak Kena Pajak (BTKP), sesuai dengan ketentuan perpajakan di Indonesia.",
        "Perusahaan berhak untuk mengubah harga produk di Situs setiap saat tanpa memberikan alasan apapun atau pemberitahuan sebelumnya.",
        "Apabila terdapat kesalahan pengetikan dalam harga barang pada Layanan yang tidak disengaja, Perusahaan akan memberitahukan secara tertulis kepada Pengguna mengenai kesalahan tersebut dan akan memberikan pilihan kepada Pengguna untuk membatalkan pesanan atau meneruskan proses pemesanan menggunakan harga yang benar.",
        "Pengguna setuju untuk membayar total biaya yang harus dibayar, yang terdiri dari harga barang, biaya pengiriman, biaya penanganan dan biaya-biaya lain yang mungkin timbul.",
      ]} />
    </Pasal>

    <Bab title="BAB 10 - Pengiriman dan Pengantaran" />

    <Pasal title="Pasal 37 - Ketentuan Pengiriman">
      <Ol items={[
        "Selain menggunakan layanan pengiriman Perusahaan yang disebut sebagai Monotaro Express, Perusahaan juga bekerja sama dengan Pihak Ketiga dalam jasa pengiriman yang ditunjuk oleh Perusahaan.",
        <>Perusahaan memiliki wewenang penuh untuk hal-hal yang disebutkan di bawah ini dan Pengguna tunduk pada ketentuan yang ditentukan oleh Perusahaan:
          <Ol sub items={[
            "Menentukan jam kerja operasional tim logistik Perusahaan;",
            "Menunjuk jasa pengiriman yang akan digunakan untuk setiap Pengguna, produk atau wilayah pengiriman;",
            "Mengatur jadwal pengiriman pesanan sesuai dengan kepentingan Perusahaan.",
          ]} /></>,
        "Dengan mempertimbangkan kemampuan perusahaan jasa pengiriman, Perusahaan memiliki wewenang untuk menentukan periode pengiriman barang ke setiap wilayah pengiriman yang dituju.",
        "Periode pengiriman barang yang tercantum di Situs adalah perkiraan dan Perusahaan berhak untuk merubahnya setiap saat tanpa pemberitahuan sebelumnya.",
        "Perusahaan tidak menjamin bahwa setiap periode pengiriman barang tidak akan mengalami keterlambatan dikarenakan alasan yang wajar, termasuk keterlambatan transportasi karena keadaan kahar seperti kondisi lalu lintas atau cuaca buruk, hari libur, dan hari besar keagamaan.",
        "Perkiraan masa pengiriman yang tertera di Situs terhitung sejak barang siap dikirim oleh tim logistik, dan periode tersebut tidak termasuk periode pengadaan barang.",
        "Pengiriman untuk jenis barang tertentu, seperti cairan, gas dan bahan mudah terbakar dapat memakan waktu lebih lama dari yang telah disampaikan di Situs karena perbedaan penanganan pengiriman.",
        "Pengiriman ke beberapa wilayah yang sulit dijangkau seperti pulau-pulau terisolasi atau tempat-tempat terpencil dapat memakan waktu lebih lama dari yang telah disampaikan di Situs atau bahkan penolakan proses pengiriman ke wilayah tersebut.",
      ]} />
    </Pasal>

    <Bab title="BAB 11 - Privasi dan Perlindungan Data Pribadi" />

    <Pasal title="Pasal 38 - Penggunaan Data Pribadi">
      <Ol items={[
        <>Perusahaan memiliki wewenang penuh untuk memproses Data Pribadi dalam hal berikut:
          <Ol sub items={[
            "Memproses segala bentuk permintaan, aktivitas dan transaksi yang dilakukan oleh Pengguna melalui Situs, termasuk untuk tujuan pengiriman produk kepada Pengguna.",
            "Menyediakan fitur-fitur untuk memberikan, mewujudkan, memelihara dan memperbaiki produk dan layanan Perusahaan.",
            "Membantu Pengguna pada saat berkomunikasi dengan layanan pelanggan Perusahaan.",
            "Menghubungi Pengguna melalui surel, surat, telepon, faksimili, atau cara lain yang dianggap Perusahaan wajar.",
            "Menggunakan informasi yang diperoleh dari Pengguna untuk tujuan penelitian, analisis, pengembangan dan pengujian produk.",
            "Menginformasikan kepada Pengguna terkait produk, layanan, promosi, studi, survei, berita, perkembangan terkini, acara dan hal-hal lain terkait Layanan.",
            "Memantau atau menyelidiki transaksi-transaksi mencurigakan atau transaksi yang diindikasikan mengandung unsur penipuan atau pelanggaran terhadap Syarat dan Ketentuan.",
          ]} /></>,
        "Situs menggunakan fungsi Cookies dan teknologi pelacakan lainnya untuk Layanan yang lebih baik. Dengan menggunakan Situs, Pemohon/Pengguna menyetujui untuk menggunakan fungsi Cookies kami.",
        "Perusahaan akan menggunakan Data Pribadi untuk jangka waktu terbatas dan akan menonaktifkan Data Pribadi Pengguna tanpa penundaan jika Pengguna mengajukan pengakhiran untuk keanggotaannya dan/atau menarik kembali persetujuan pemrosesan Data Pribadi, sesuai dengan Hukum yang Berlaku.",
      ]} />
    </Pasal>

    <Pasal title="Pasal 39 - Perlindungan Data Pribadi">
      <Ol items={[
        "Perusahaan mengumpulkan memproses, dan menggunakan Data Pribadi Pemohon/Pengguna hanya dalam lingkup yang diperlukan dan dengan cara yang sah dan sesuai.",
        "Perusahaan akan mengambil langkah-langkah teknologi, administratif dan fisik untuk memastikan Data Pribadi Pemohon/Pengguna tidak hilang, disalahgunakan, diakses dan diungkapkan secara tidak sah, dipalsukan, atau dirusak.",
        <>Perusahaan tidak menjual, meminjamkan, mengalihkan dan mengungkapkan Data Pribadi kepada Pihak Ketiga manapun tanpa persetujuan Pemohon/Pengguna kecuali untuk hal berikut:
          <Ol sub items={[
            "Mematuhi ketentuan hukum atau keputusan dari otoritas administratif atau lembaga peradilan;",
            "Pelanggaran Pengguna terkait hukum atau kebijakan Indonesia;",
            "Hal-hal lain di mana Perusahaan putuskan sesuai dengan Hukum Yang Berlaku atau kebijakan penggunaan Situs.",
          ]} /></>,
        "Jika terjadi kegagalan dalam perlindungan terhadap Data Pribadi sebagaimana diatur dalam Pasal ini, Perusahaan akan memberikan pemberitahuan secara tertulis kepada pemilik Data Pribadi tersebut.",
      ]} />
    </Pasal>

    <Bab title="BAB 12 - Ketentuan Lainnya" />

    <Pasal title="Pasal 40 - Larangan Pengalihan">
      <p className="text-justify">Pengguna tidak akan mengalihkan, meminjamkan atau menjual hak-haknya dari Layanan kepada Pihak Ketiga.</p>
    </Pasal>

    <Pasal title="Pasal 41 - Kompensasi">
      <p className="text-justify">Perusahaan tidak bertanggung jawab atau berkewajiban untuk memberikan kompensasi atas Kerugian yang dialami oleh Pengguna atau Pihak Ketiga yang timbul dari keterlambatan penggunaan, penangguhan modifikasi, penghapusan pengungkapan Layanan, atau hilangnya informasi yang diberikan oleh Pengguna atau Pihak Ketiga kepada Perusahaan terkait dengan penggunaan Layanan, yang mana hal-hal tersebut bukan diakibatkan dari perbuatan atau kesalahan yang dilakukan secara nyata oleh Perusahaan.</p>
    </Pasal>

    <Pasal title="Pasal 42 - Hak Kekayaan Intelektual">
      <p className="text-justify">Pengguna tidak diizinkan menyalin Hak Kekayaan Intelektual dari Layanan. Semua Hak Kekayaan Intelektual dari halaman layanan dan gambar secara mutlak dimiliki oleh Perusahaan, dan oleh karena itu dilarang untuk menggandakan, mendistribusikan, mengalihkan, meminjamkan, menerjemahkan, menggunakan, mereproduksi, mengusahakan atau menggunakan kembali Konten sesuai dengan Hukum Yang Berlaku.</p>
    </Pasal>

    <Pasal title="Pasal 43 - Hal-hal Yang Dilarang" last>
      <p className="mb-2 text-justify">Pengguna dilarang melakukan tindakan-tindakan berikut dalam penggunaan Layanan:</p>
      <Ol items={[
        "Mengganggu pengoperasian Layanan dan menghambat Layanan;",
        "Penggunaan kartu debit atau kartu kredit secara tidak sah;",
        "Perilaku yang menyebabkan atau dapat menyebabkan kerusakan atau kerugian bagi Perusahaan atau Pihak Ketiga;",
        "Pelanggaran Hak Kekayaan Intelektual, privasi atau hak-hak lain Perusahaan atau Pihak Ketiga;",
        "Perilaku yang mengganggu kebiasaan umum (general convention) dan/atau ketertiban sosial (social order);",
        "Tindakan kriminal atau perilaku terkait;",
        "Pernyataan atau pengajuan yang tidak akurat dalam pendaftaran seperti alamat surel atau informasi terkait lainnya;",
        "Kegiatan bisnis yang dilakukan dengan menggunakan fasilitas Layanan secara tidak sah untuk tujuan keuntungan;",
        "Merusak obyektivitas dan kredibilitas Perusahaan;",
        "Menggunakan atau menyediakan program berbahaya seperti virus komputer atau aktivitas peretasan;",
        "Mencuri alamat surel dan kata sandi dari anggota lain;",
        "Tidak membayar tagihan dan/atau menunda pembayaran untuk produk yang dibeli lewat Layanan;",
        "Tidak membayar tagihan dan/atau menunda pembayaran atas setiap tagihan yang timbul dari pembelian produk melalui Layanan dengan metode Pembayaran Tempo/Termin (TOP), yang mana tindakan tersebut dapat dikenakan denda keterlambatan sebagaimana diatur dalam Pasal 29 Kebijakan ini;",
        "Pelanggaran terhadap Kebijakan;",
        "Pelanggaran Hukum Yang Berlaku, baik domestik maupun internasional;",
        "Penggunaan Layanan dengan cara yang tidak sesuai dengan peruntukannya;",
        "Menghubungkan Layanan ke basis data (database) lain tanpa persetujuan dari Perusahaan;",
        "Akses ilegal dan merusak data pada server komputer Layanan;",
        "Menggunakan Layanan untuk memfasilitasi perbuatan-perbuatan yang terkait dengan tindak pidana pencucian uang atau tindak pidana yang berkaitan dengan fasilitasi terhadap kejahatan terorisme;",
        "Menggunakan Layanan dengan tindakan yang dapat menimbulkan pertentangan atau mencederai aspek SARA;",
        "Memperjualbelikan kembali barang-barang yang sudah dibeli dari Perusahaan untuk mendapatkan keuntungan yang dilakukan sebagai suatu kegiatan usaha berulang atau mata pencaharian; dan/atau",
        "Tindakan-tindakan lain selain yang disebutkan di atas yang berakibat atau menimbulkan kerugian kepada Perusahaan.",
        "Perusahaan dengan ini mereservasi setiap hak yang dimilikinya berdasarkan hukum dan peraturan perundang-undangan yang berlaku untuk mengajukan segala tindakan hukum yang mungkin diambil atau dilakukan oleh Perusahaan yang timbul dari atau sehubungan dengan terjadinya pelanggaran-pelanggaran oleh Pengguna atas hal-hal yang dilarang yang sebagaimana diuraikan di atas.",
      ]} />
    </Pasal>
  </>;
}

function Bab({ title }: { title: string }) {
  return (
    <div className="mt-6 mb-3 py-2 border-y border-neutral-100 bg-neutral-50 -mx-4 px-4">
      <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">{title}</p>
    </div>
  );
}

function Pasal({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <section className={last ? "mb-0" : "mb-5"}>
      <h2 className="mb-2 text-xs font-bold text-neutral-900">{title}</h2>
      {children}
    </section>
  );
}

function TermDef({ term, def }: { term: string; def: string }) {
  return (
    <p className="mb-1.5 text-justify">
      <span className="font-semibold text-neutral-800" dangerouslySetInnerHTML={{ __html: term }} />{" "}
      <span dangerouslySetInnerHTML={{ __html: def }} />
    </p>
  );
}

function Ol({ items, sub }: { items: (string | React.ReactNode)[]; sub?: boolean }) {
  return (
    <ol className={`list-none ${sub ? "mt-1.5 ml-3" : ""} space-y-1.5`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-justify">
          <span className="shrink-0 text-neutral-500 font-medium min-w-[1.25rem]">
            {sub ? `${String.fromCharCode(96 + i + 1)}.` : `${i + 1}.`}
          </span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ol>
  );
}
