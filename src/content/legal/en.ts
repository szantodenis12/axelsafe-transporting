/**
 * LEGAL PAGES — STRUCTURAL DRAFTS for professional legal review.
 * Privacy and cookie policies translated from the RO source (legal/ro.ts, 13.11.2026).
 * Terms of use: unconfirmed items are marked "[to be confirmed]" in the visible copy.
 * Verified identifiers come from companyData; nothing here asserts facts that are not in that file.
 */
import { companyData, fact } from "@/content/companyData";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "table"; rows: readonly (readonly [string, string])[] };

export type LegalSection = { id: string; title: string; blocks: readonly LegalBlock[] };

export type LegalDoc = {
  key: "privacy" | "cookies" | "terms";
  eyebrow: string;
  title: string;
  description: string;
  /** Shown under the title. */
  status: string;
  sections: readonly LegalSection[];
};

const office = fact("registeredOffice");
const legalName = fact("legalName");
const addressLine = `${office.street}, ${office.postalCode} ${office.city}, ${office.county}, ${office.country}`;
const TBC = "[to be confirmed]";
const UPDATED = "13.11.2026";

const controllerTable = [
  ["Controller", legalName],
  ["Registered office", addressLine],
  ["Trade register no.", fact("registrationNumber")],
  ["VAT / fiscal number", fact("vatNumber")],
  ["Email for personal data", companyData.email.value],
] as const;

export const privacyPolicy: LegalDoc = {
  key: "privacy",
  eyebrow: "LEGAL / PRIVACY",
  title: "Privacy Policy",
  description: `What personal data ${legalName} collects through this website, why, how long it keeps it and what rights you have under Regulation (EU) 2016/679 (GDPR).`,
  status: `Last updated: ${UPDATED}`,
  sections: [
    {
      id: "controller",
      title: "Who we are",
      blocks: [
        {
          type: "p",
          text: `${legalName} ("AXEL SAFE TRANSPORTING", "we") is the controller of the personal data you send us through this website. We organise road freight through independent carriers.`,
        },
        { type: "table", rows: controllerTable },
        {
          type: "p",
          text: "We have not appointed a data protection officer (DPO). For any question about your data, write to us at the email address above.",
        },
      ],
    },
    {
      id: "data-we-collect",
      title: "What data we collect",
      blocks: [
        { type: "p", text: "We only collect the data you send us yourself: through the forms on this website, by email, by phone or on WhatsApp." },
        {
          type: "list",
          items: [
            "Full transport request: company name, contact person, email address, phone number, loading and delivery locations, cargo description, approximate weight and dimensions, preferred dates and other requirements.",
            "Quick request: name, phone number, loading location, destination and any additional information.",
            "Callback request: name, phone number and the time of day you would like us to call.",
            "Carrier form: company name, VAT / company registration number (CUI), contact person, email address, phone number, country of registration, number and types of vehicles, the regions and routes you operate on, transport licence number, whether you hold valid CMR insurance and any other information you choose to give us.",
            "Technical data sent with the form: the page you sent the request from, campaign parameters in the link (UTM), the site language, your browser type, the date and time you gave your consent and an encrypted fingerprint (hash) of your IP address. We do not store your IP address in plain form.",
            "Server logs: the company that hosts the website may record your IP address and the time of access, for security and operation.",
          ],
        },
        {
          type: "p",
          text: "If you are a carrier, we also check public information about your company (for example in the ANAF database), and before the first shipment we confirm your CMR insurance directly with the insurer.",
        },
        { type: "p", text: "Please do not send us sensitive data through the forms, for example about health. The forms are for business-to-business transport requests." },
      ],
    },
    {
      id: "purposes",
      title: "Why we use the data and on what legal basis",
      blocks: [
        {
          type: "table",
          rows: [
            ["To answer your request and send you a quote", "Steps taken at your request before entering into a contract (Art. 6(1)(b) GDPR) and our legitimate interest in answering requests from businesses (Art. 6(1)(f))"],
            ["To call you, if you asked for a call", "Steps taken at your request before entering into a contract (Art. 6(1)(b))"],
            ["To assess and check a possible cooperation with your transport company", "Steps before entering into a contract (Art. 6(1)(b)) and our legitimate interest in working only with checked carriers (Art. 6(1)(f))"],
            ["To organise and coordinate a confirmed shipment", "Performance of the contract (Art. 6(1)(b))"],
            ["To keep accounting and tax records", "Legal obligation (Art. 6(1)(c)), under Romanian law"],
            ["To see which pages and campaigns requests come from", "Legitimate interest (Art. 6(1)(f))"],
            ["To protect the website from abuse and automated submissions", "Legitimate interest (Art. 6(1)(f))"],
          ],
        },
        {
          type: "p",
          text: "We do not send you newsletters or marketing emails based on form data. We do not make automated decisions that have legal effects on you.",
        },
      ],
    },
    {
      id: "recipients",
      title: "Who else sees the data",
      blocks: [
        { type: "p", text: "Your requests are seen by the people in the AXEL SAFE TRANSPORTING team who handle them. Beyond that, we pass them on only as far as needed:" },
        {
          type: "list",
          items: [
            "To the carrier performing the shipment: only the contact details and the information needed for loading and delivery, after you have confirmed the transport.",
            "To our technical providers: the company that hosts the website, the provider of the database where requests are saved and the email service that notifies the team of a new request. They act only on our instructions, under a contract.",
            "To our accountant, lawyer or public authorities, where the law requires it.",
          ],
        },
        {
          type: "p",
          text: "If you write to us on WhatsApp, your messages pass through the WhatsApp service (Meta Platforms), under its own privacy rules.",
        },
        { type: "p", text: "We do not sell or rent your data to anyone." },
      ],
    },
    {
      id: "transfers",
      title: "Transfers outside the EU/EEA",
      blocks: [
        {
          type: "p",
          text: "Some technical providers may have servers or staff outside the European Economic Area. In that case, the transfer takes place only on the basis of an adequacy decision by the European Commission (for example the EU-US Data Privacy Framework) or standard contractual clauses approved by the Commission. You can ask us for a copy of the safeguards that apply.",
        },
      ],
    },
    {
      id: "retention",
      title: "How long we keep the data",
      blocks: [
        {
          type: "list",
          items: [
            "Requests that do not lead to a shipment or a cooperation: 12 months from the last contact, after which we delete them.",
            "Requests that lead to a shipment or a cooperation: for as long as the cooperation lasts and for 3 years afterwards, the general limitation period for possible claims.",
            "Accounting and tax documents: as long as Romanian accounting and tax law requires.",
            "Server logs: a short period, set by the hosting provider.",
          ],
        },
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      blocks: [
        { type: "p", text: "Under the GDPR, you have the right:" },
        {
          type: "list",
          items: [
            "to find out what data we hold about you and to receive a copy of it;",
            "to ask us to correct inaccurate data or to complete it;",
            "to ask us to delete the data when we no longer have a legal reason to keep it;",
            "to ask us to restrict its use, in the situations set out in Art. 18 GDPR;",
            "to receive the data you gave us in an easily transferable format, when we use it on the basis of a contract or your consent;",
            "to object at any time to the use of your data on the basis of our legitimate interest;",
            "to withdraw your consent at any time, when the use of your data is based on consent, without affecting what was done before.",
          ],
        },
        {
          type: "p",
          text: "To exercise these rights, write to us at the email address in section 1. The reply is free and you will receive it within one month at most. For complex requests, this period can be extended by two further months, and we will let you know. We may ask you to confirm your identity.",
        },
        {
          type: "p",
          text: "If you are not satisfied with how we use your data, you can lodge a complaint with the Romanian data protection authority, Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, 010336 București, www.dataprotection.ro.",
        },
      ],
    },
    {
      id: "security",
      title: "How we protect the data",
      blocks: [
        {
          type: "list",
          items: [
            "The website uses an encrypted connection (HTTPS).",
            "Your IP address is not stored in plain form, only as an encrypted fingerprint.",
            "Requests can be accessed only by the team members who handle them, each with their own account and password.",
            "We limit the number of form submissions to stop abuse.",
          ],
        },
        { type: "p", text: "No transmission over the internet is 100% secure, but we take measures that match the real risks." },
      ],
    },
    {
      id: "changes",
      title: "Changes",
      blocks: [
        {
          type: "p",
          text: "We may update this policy when we change how we use data or when the law changes. The version in force is always on this page, with the date of the last update at the top.",
        },
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  key: "cookies",
  eyebrow: "LEGAL / COOKIES",
  title: "Cookie Policy",
  description: `Which cookies the ${legalName} website uses and why we do not show you a cookie banner.`,
  status: `Last updated: ${UPDATED}`,
  sections: [
    {
      id: "what-are-cookies",
      title: "What cookies are",
      blocks: [
        {
          type: "p",
          text: "Cookies are small files that a website saves in your browser. Similar technologies, such as local storage, do much the same thing. This page covers all of them.",
        },
      ],
    },
    {
      id: "cookies-we-use",
      title: "Which cookies this website uses",
      blocks: [
        {
          type: "p",
          text: "In short: none for visitors. The public pages of this website do not save cookies and do not use local storage in your browser. That is why we do not show you a cookie banner.",
        },
        { type: "p", text: "We do not use analytics, advertising or social media cookies, and we do not track you from one website to another." },
        {
          type: "table",
          rows: [
            [
              "axel_admin_session (team only)",
              "Saved only when an AXEL SAFE TRANSPORTING team member logs in to the internal admin area. It keeps the session open for 12 hours at most and is deleted on logout. It is strictly necessary, so it does not require consent (Art. 4(5) of Romanian Law no. 506/2004). Website visitors do not receive it.",
            ],
            ["Form protection", "Handled on the server, with no cookies in your browser."],
            ["Fonts", "Loaded from our own server, not from Google, so opening a page does not send any data to Google Fonts."],
            ["WhatsApp button", "It is only a link. WhatsApp may set cookies only after you click and reach its website or app, under WhatsApp's own rules."],
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "If we add optional cookies",
      blocks: [
        {
          type: "p",
          text: "In future we may use analytics or advertising tools, for example to see which campaigns bring in requests. Before we switch them on:",
        },
        {
          type: "list",
          items: [
            "we will ask for your consent through a banner, and optional cookies will start only if you accept;",
            "you will be able to refuse as easily as you accept, and to withdraw your consent at any time;",
            "we will update this page with the exact list of cookies, what each one does and how long it stays in your browser.",
          ],
        },
      ],
    },
    {
      id: "managing",
      title: "How to control cookies",
      blocks: [
        {
          type: "p",
          text: "You can view, block or delete cookies in your browser settings. Chrome, Firefox, Safari and Edge have help pages that show exactly how. On this website, blocking cookies changes nothing for you, because the public pages do not use them.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        { type: "p", text: `For questions about cookies, write to us at ${companyData.email.value} or by post to ${legalName}, ${addressLine}.` },
        { type: "p", text: "For how we use personal data in general, see the Privacy Policy." },
      ],
    },
  ],
};

export const termsOfUse: LegalDoc = {
  key: "terms",
  eyebrow: "LEGAL / TERMS",
  title: "Terms of Use",
  description: `The conditions under which this website is made available by ${legalName}.`,
  status: `Version: draft for legal review · Last updated: ${TBC}`,
  sections: [
    {
      id: "operator",
      title: "Website operator",
      blocks: [
        { type: "p", text: `This website is operated by ${legalName}, a company registered in Romania.` },
        { type: "table", rows: controllerTable.slice(0, 4) },
      ],
    },
    {
      id: "informational",
      title: "Informational nature of the website",
      blocks: [
        {
          type: "p",
          text: "The content of this website describes the services of AXEL SAFE TRANSPORTING in general terms. It is provided for information only and does not constitute an offer, a quotation or a commitment to arrange any transport.",
        },
        {
          type: "p",
          text: "Submitting an enquiry through the website does not create a contract. A transport arrangement or a carrier partnership exists only once its conditions have been confirmed by AXEL SAFE TRANSPORTING in writing (including by email).",
        },
        {
          type: "p",
          text: "AXEL SAFE TRANSPORTING organises transport through independent carriers. It does not operate its own fleet and does not itself perform the carriage of goods. The rights and obligations relating to a specific transport are set out in the documents agreed for that transport.",
        },
      ],
    },
    {
      id: "use",
      title: "Acceptable use",
      blocks: [
        {
          type: "list",
          items: [
            "Use the enquiry forms only for genuine business enquiries.",
            "Do not submit false, misleading or unlawful information, or information about third parties without authority.",
            "Do not attempt to interfere with the operation or security of the website, or to access it by automated means beyond ordinary search-engine indexing.",
          ],
        },
      ],
    },
    {
      id: "ip",
      title: "Intellectual property",
      blocks: [
        {
          type: "p",
          text: `The texts, graphics, logos and photographs on this website belong to ${legalName} or are used under licence ${TBC}. You may view and print pages for your own business use. Any other reproduction requires our prior written permission.`,
        },
      ],
    },
    {
      id: "liability",
      title: "Liability",
      blocks: [
        {
          type: "p",
          text: "We take care to keep the website accurate and available, but we do not guarantee that it is free of errors or interruptions. To the extent permitted by law, AXEL SAFE TRANSPORTING is not liable for loss arising from reliance on the website's content or from its temporary unavailability.",
        },
        { type: "p", text: "Nothing in these terms limits liability that cannot be limited under Romanian law." },
        { type: "p", text: "Links to third-party websites are provided for convenience; we are not responsible for their content." },
      ],
    },
    {
      id: "privacy",
      title: "Personal data and cookies",
      blocks: [{ type: "p", text: "The processing of personal data through this website is described in the Privacy Policy. The use of cookies is described in the Cookie Policy." }],
    },
    {
      id: "law",
      title: "Governing law and disputes",
      blocks: [
        {
          type: "p",
          text: `These terms are governed by Romanian law. Disputes relating to the use of this website are subject to the competent courts of Romania ${TBC}, without prejudice to mandatory rules that give consumers or other parties the right to a different forum.`,
        },
      ],
    },
    {
      id: "changes",
      title: "Changes",
      blocks: [{ type: "p", text: "We may update these terms from time to time. The version published on this page applies from its date of last update." }],
    },
  ],
};

export const legalDocs = { privacy: privacyPolicy, cookies: cookiePolicy, terms: termsOfUse } as const;
