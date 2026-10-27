/**
 * LEGAL PAGES — STRUCTURAL DRAFTS for professional legal review.
 * Not final legal text. Every unconfirmed item is marked "[to be confirmed]" in the visible copy.
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

const controllerTable = [
  ["Controller", legalName],
  ["Registered office", addressLine],
  ["Trade register no.", fact("registrationNumber")],
  ["VAT / fiscal number", fact("vatNumber")],
  ["Contact for data matters", companyData.email.value],
] as const;

export const privacyPolicy: LegalDoc = {
  key: "privacy",
  eyebrow: "LEGAL / PRIVACY",
  title: "Privacy Policy",
  description: `How ${legalName} processes personal data collected through this website, in line with Regulation (EU) 2016/679 (GDPR).`,
  status: `Version: draft for legal review · Last updated: ${TBC}`,
  sections: [
    {
      id: "controller",
      title: "Who we are",
      blocks: [
        {
          type: "p",
          text: `${legalName} ("AXEL SAFE TRANSPORTING", "we") is the controller of the personal data processed through this website. We are a Romanian company that organises road freight transport through independent carriers.`,
        },
        { type: "table", rows: controllerTable },
        {
          type: "p",
          text: `A data protection officer has not been appointed ${TBC}. Questions about this policy can be sent to the contact address above.`,
        },
      ],
    },
    {
      id: "data-we-collect",
      title: "What personal data we collect",
      blocks: [
        { type: "p", text: "We collect personal data only when you provide it to us, mainly through the two enquiry forms on this website." },
        {
          type: "list",
          items: [
            "Transport quote form: company name, contact person, business email, phone number, pickup and delivery locations, cargo description, approximate weight or loading units, preferred dates and any additional requirements you enter.",
            "Carrier partnership form: company name, contact person, business email, phone number, country of registration, number of vehicles, vehicle types, operating regions or preferred routes and any additional information you enter.",
            "Direct correspondence: data you include when you email or call us.",
            `Technical data: server logs (IP address, browser type, time of request) kept by our hosting provider for security and operation ${TBC}.`,
          ],
        },
        { type: "p", text: "Please do not include special categories of personal data (such as health data) in free-text fields; the forms are intended for business transport enquiries." },
      ],
    },
    {
      id: "purposes",
      title: "Why we process it and on what legal basis",
      blocks: [
        {
          type: "table",
          rows: [
            ["Responding to a transport enquiry and preparing an offer", "Steps prior to entering into a contract (Art. 6(1)(b) GDPR) and our legitimate interest in handling business enquiries (Art. 6(1)(f))"],
            ["Assessing a potential carrier partnership", "Steps prior to entering into a contract (Art. 6(1)(b)) and legitimate interest (Art. 6(1)(f))"],
            ["Coordinating a confirmed transport with the parties involved", "Performance of a contract (Art. 6(1)(b))"],
            ["Keeping accounting and tax records", "Legal obligation (Art. 6(1)(c)) under Romanian accounting and fiscal law"],
            ["Security, abuse prevention and rate limiting on the forms", "Legitimate interest (Art. 6(1)(f))"],
            ["Analytics cookies, if and when configured", "Consent (Art. 6(1)(a)) — see the Cookie Policy"],
          ],
        },
        { type: "p", text: "We do not use the data from the forms for marketing emails or newsletters, and we do not make automated decisions that produce legal effects concerning you." },
      ],
    },
    {
      id: "recipients",
      title: "Who receives the data",
      blocks: [
        { type: "p", text: "Personal data is shared only to the extent needed for the purposes above." },
        {
          type: "list",
          items: [
            "Independent transport providers: the contact and shipment details required to arrange a confirmed transport.",
            `Website hosting and infrastructure provider: ${TBC}`,
            `Form and database service used to store enquiries: ${TBC}`,
            `Email service used to notify our team of new enquiries: ${TBC}`,
            "Professional advisers (accountants, lawyers) and public authorities where required by law.",
          ],
        },
        { type: "p", text: "Service providers act as processors under written agreements and may process data only on our instructions." },
      ],
    },
    {
      id: "transfers",
      title: "Transfers outside the EU/EEA",
      blocks: [
        {
          type: "p",
          text: `Our service providers may store or access data outside the European Economic Area ${TBC}. Where this happens, we rely on an adequacy decision of the European Commission or on Standard Contractual Clauses, and you can request a copy of the relevant safeguards.`,
        },
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      blocks: [
        {
          type: "list",
          items: [
            `Enquiries that do not lead to a contract: ${TBC} (proposed: 12 months from the last contact).`,
            `Enquiries that lead to a transport or partnership: for the duration of the business relationship and thereafter as required for legal claims ${TBC}.`,
            "Accounting documents: 10 years, as required by Romanian law.",
            `Server logs: ${TBC} (set by the hosting provider).`,
          ],
        },
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      blocks: [
        { type: "p", text: "Under the GDPR you have the right to:" },
        {
          type: "list",
          items: [
            "access the personal data we hold about you;",
            "have inaccurate data corrected and incomplete data completed;",
            "request erasure, where there is no legal ground for continued processing;",
            "request restriction of processing in the situations set out in Art. 18 GDPR;",
            "receive the data you provided in a portable format, where processing is based on contract or consent;",
            "object to processing based on our legitimate interests;",
            "withdraw consent at any time, where processing is based on consent, without affecting the lawfulness of prior processing.",
          ],
        },
        {
          type: "p",
          text: "To exercise these rights, contact us using the details in section 1. We respond within one month, extendable by two further months for complex requests, and we may ask you to confirm your identity.",
        },
        {
          type: "p",
          text: "You also have the right to lodge a complaint with the Romanian supervisory authority: Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru 28–30, Sector 1, 010336 Bucharest, Romania — www.dataprotection.ro.",
        },
      ],
    },
    {
      id: "security",
      title: "Security",
      blocks: [
        {
          type: "p",
          text: "We apply technical and organisational measures appropriate to the risk, including encrypted connections (HTTPS), access limited to the people who handle enquiries, and rate limiting on the forms. No method of transmission over the internet is completely secure.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        { type: "p", text: "We may update this policy to reflect changes in our processing or in the law. The current version is always published on this page together with its date of last update." },
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  key: "cookies",
  eyebrow: "LEGAL / COOKIES",
  title: "Cookie Policy",
  description: `Which cookies and similar technologies this website uses, and how ${legalName} asks for consent.`,
  status: `Version: draft for legal review · Last updated: ${TBC}`,
  sections: [
    {
      id: "what-are-cookies",
      title: "What cookies are",
      blocks: [
        {
          type: "p",
          text: "Cookies are small text files stored on your device by a website. Similar technologies (such as local storage) can serve the same purpose. This policy covers both.",
        },
      ],
    },
    {
      id: "cookies-we-use",
      title: "Cookies currently used on this website",
      blocks: [
        {
          type: "p",
          text: "At present this website sets only strictly necessary cookies and storage, which are required for the site to work and do not need your consent under Article 4(5) of Romanian Law 506/2004 and the ePrivacy Directive.",
        },
        {
          type: "table",
          rows: [
            ["Form protection", `Technical values used to prevent automated submissions and to rate-limit the enquiry forms. Session only. ${TBC}`],
            ["Preferences", `Your choice regarding optional cookies, once a consent banner is in place. 12 months ${TBC}`],
          ],
        },
        { type: "p", text: "No advertising, social media or cross-site tracking cookies are used." },
      ],
    },
    {
      id: "analytics",
      title: "Analytics cookies (only after consent)",
      blocks: [
        {
          type: "p",
          text: `We may introduce privacy-respecting analytics to understand how the website is used. Analytics cookies will be set only after you give consent through the cookie banner, and you will be able to withdraw that consent at any time from the same banner. Tool and retention period: ${TBC}.`,
        },
      ],
    },
    {
      id: "managing",
      title: "Managing cookies",
      blocks: [
        {
          type: "p",
          text: "You can delete or block cookies through your browser settings. Blocking strictly necessary cookies may prevent the enquiry forms from working. Instructions for common browsers are available on their support pages.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        { type: "p", text: `Questions about cookies can be sent to ${legalName}, ${addressLine}, or by email to ${companyData.email.value}.` },
        { type: "p", text: "For how we process personal data more generally, see the Privacy Policy." },
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
