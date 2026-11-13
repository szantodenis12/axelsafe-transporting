import type { PageExtras } from "./extras";

/** Page sections added 13.11.2026 (Roland's texts) that sit outside the Dictionary shape. Same shape in en/es. Translated from roExtra. */
export const enExtra: PageExtras = {
  contact: { officeHeading: "Office", transportHeading: "Transport and dispatch" },
  vetting: {
    checkTitles: [
      "Company registration and transport licence",
      "CMR insurance",
      "Vehicle documents",
      "The carrier's legal status",
    ],
  },
  howWeWork: {
    finalCta: {
      titleLines: ["Have a shipment to organise?", "Send us the details."],
      text: "Tell us what goods need to be moved, the route and when you need the truck. We check availability with the carriers in our network and come back to you with a quote.",
      cta: "Request a transport quote",
    },
  },
  about: {
    workStyle: {
      eyebrow: "02 / HOW WE WORK",
      title: "Working relationships built on communication and keeping our word.",
      paragraphs: [
        "In road freight, truck availability, meeting deadlines and communication between the parties are essential.",
        "That is why we pay attention to every stage: from checking availability and confirming the transport terms to staying in touch while the shipment is on the road.",
        "We work both with customers who need occasional transport and with companies that need regular shipments.",
        "We want long-term working relationships, built on clear terms and on keeping the commitments we make.",
      ],
    },
  },
};
