/**
 * APPROVED ENGLISH COPY — ported verbatim from
 * "AXEL SAFE TRANSPORTING — Website Content & Structure — English Version".
 * Integrate, do not rewrite. Business facts (phone, email, hours…) come from companyData.ts.
 * Blocks marked as placeholder in comments are prototype-only additions, not approved copy.
 */
export const en = {
  meta: {
    home: {
      title: "AXEL SAFE TRANSPORTING | Road Freight Coordination",
      description:
        "AXEL SAFE TRANSPORTING organises road freight through independent carrier partnerships. Contact our team to discuss your business transport requirements.",
    },
    services: {
      title: "Road Freight Coordination Services | AXEL SAFE TRANSPORTING",
      description:
        "Explore road freight organisation, transport planning and carrier coordination services from AXEL SAFE TRANSPORTING.",
    },
    howWeWork: {
      title: "How We Organise Freight Transport | AXEL SAFE TRANSPORTING",
      description:
        "Learn how AXEL SAFE TRANSPORTING coordinates road freight through independent transport providers, from the initial enquiry to confirmed arrangements.",
    },
    about: {
      title: "About AXEL SAFE TRANSPORTING | Road Freight Company",
      description:
        "Learn about AXEL SAFE TRANSPORTING, a Romanian company established in 2018 that organises road freight through independent carriers.",
    },
    forCarriers: {
      title: "Carrier Partnerships | AXEL SAFE TRANSPORTING",
      description:
        "Interested in cooperating with AXEL SAFE TRANSPORTING? Introduce your transport company and discuss potential carrier partnerships.",
    },
    contact: {
      title: "Request a Transport Quote | AXEL SAFE TRANSPORTING",
      description:
        "Contact AXEL SAFE TRANSPORTING to request road freight arrangements or discuss your company's shipping requirements.",
    },
  },

  nav: {
    items: [
      { key: "home", label: "Home" },
      { key: "services", label: "Services" },
      { key: "howWeWork", label: "How We Work" },
      { key: "about", label: "About" },
      { key: "forCarriers", label: "For Carriers" },
    ],
    cta: "Request a Quote",
    menu: "Menu",
    close: "Close",
  },

  footer: {
    statement: "Road freight coordination through independent carrier partnerships.",
    explore: "Explore",
    exploreItems: [
      { key: "home", label: "Home" },
      { key: "services", label: "Services" },
      { key: "howWeWork", label: "How We Work" },
      { key: "about", label: "About Us" },
      { key: "forCarriers", label: "For Carriers" },
      { key: "contact", label: "Contact" },
    ],
    contact: "Contact",
    legal: "Legal",
    legalItems: [
      { key: "privacy", label: "Privacy Policy" },
      { key: "cookies", label: "Cookie Policy" },
      { key: "terms", label: "Terms of Use" },
    ],
    rights: "AXEL SAFE TRANSPORTING. All rights reserved.",
    credit: "Website by",
    social: "Follow us",
    cta: "Request a Quote",
    nav: "Footer navigation",
    legalNav: "Legal",
    services: "Services",
    servicesItems: [
      { id: "road-freight-organisation", label: "Road Freight Organisation" },
      { id: "freight-planning", label: "Freight Planning & Coordination" },
      { id: "carrier-network", label: "Independent Carrier Network" },
    ],
    labels: {
      office: "Office",
      dispatch: "Transport & dispatch",
      registeredOffice: "Registered office",
      regNo: "Reg. No.",
      vat: "VAT",
      activity: "Activity",
      backToTop: "Back to top",
    },
  },

  home: {
    hero: {
      eyebrow: "AXEL SAFE TRANSPORTING / ROAD FREIGHT COORDINATION",
      titleLines: ["Moving goods.", "Connecting business."],
      text: "We organise road freight transport through a network of independent carriers, connecting shipping requirements with suitable transport solutions.",
      primary: "Request a Quote",
      secondary: "Explore Our Services",
      micro: ["Road Freight", "Transport Coordination", "Business Logistics"],
    },
    intro: {
      eyebrow: "01 / THE COMPANY",
      title: "Every shipment starts with the right connection.",
      paragraphs: [
        "Moving goods requires more than finding an available truck. It takes planning, communication and the ability to bring the right people together.",
        "At AXEL SAFE TRANSPORTING, we coordinate road freight by connecting businesses with independent transport providers.",
      ],
      emphasis: "One point of contact. A process built around your transport requirements.",
      cta: "How We Work",
    },
    approach: {
      eyebrow: "02 / WHAT WE DO",
      titleLines: ["The right transport.", "The right coordination."],
      text: "We work between businesses that need goods transported and the carriers that move them.",
      cards: [
        {
          title: "Transport Planning",
          text: "Understanding the shipment, destination, timing and specific transport requirements before arranging the next steps.",
        },
        {
          title: "Carrier Coordination",
          text: "Identifying suitable transport options through independent carriers and coordinating the arrangements for each shipment.",
        },
        {
          title: "Communication",
          text: "Keeping transport-related information organised and maintaining a clear point of contact throughout the coordination process.",
        },
        {
          title: "Flexible Solutions",
          text: "Approaching each transport request individually, rather than restricting options to a fixed company-owned fleet.",
        },
      ],
      cta: "Explore Our Services",
    },
    services: {
      eyebrow: "03 / OUR SERVICES",
      title: "Transport solutions built around your requirements.",
      text: "No two shipments have exactly the same requirements. We approach each enquiry by looking at the cargo, destination, available transport options and necessary arrangements.",
      cards: [
        {
          title: "Road Freight Coordination",
          text: "Organising road freight transport through independent carriers, with a focus on matching each shipment to an appropriate solution.",
          anchor: "road-freight-organisation",
        },
        {
          title: "Transport Planning",
          text: "Coordinating essential shipment details, collection requirements and delivery arrangements before transport begins.",
          anchor: "freight-planning",
        },
        {
          title: "Carrier Network",
          text: "Working with transport partners to identify available capacity and respond to different freight requirements.",
          anchor: "carrier-network",
        },
      ],
      cardCta: "Explore Service",
    },
    process: {
      eyebrow: "04 / THE PROCESS",
      title: "From request to delivery.",
      text: "A structured approach to every transport enquiry.",
      steps: [
        { title: "Share the details", text: "Tell us what needs to be transported, where it needs to go and when." },
        { title: "Review the options", text: "We assess your request and identify suitable transport arrangements." },
        {
          title: "Confirm the transport",
          text: "Once the details are agreed, we coordinate the arrangements with the selected transport provider.",
        },
        { title: "Stay connected", text: "We remain your point of contact for transport coordination and relevant updates." },
      ],
      cta: "Discover Our Process",
    },
    carriers: {
      eyebrow: "05 / OUR NETWORK",
      title: "Strong logistics begin with strong partnerships.",
      paragraphs: [
        "Reliable transport coordination depends on productive relationships between shippers, organisers and carriers.",
        "We welcome enquiries from transport companies interested in exploring cooperation with AXEL SAFE TRANSPORTING.",
      ],
      cta: "Become a Carrier Partner",
    },
    finalCta: {
      eyebrow: "LET'S TALK LOGISTICS",
      titleLines: ["Have goods to move?", "Let's discuss the route."],
      text: "Share your transport requirements and get in touch with our team.",
      primary: "Request a Transport Quote",
      secondary: "Contact Us",
    },
    /** [PLACEHOLDER] prototype-only labels for the network visual — not approved copy. */
    network: {
      caption: "Principal European road network · illustrative, not AXEL SAFE's own routes.",
      origin: "Reghin, Romania",
      coverageLabel: "Coverage",
      equipmentLabel: "Equipment",
      baseLabel: "Coordinated from",
      baseValue: "Reghin, Romania · since 2018",
    },
  },

  services: {
    hero: {
      eyebrow: "AXEL SAFE / SERVICES",
      titleLines: ["Road freight.", "Organised around your business."],
      text: "Transport requirements change from shipment to shipment. Our role is to help businesses arrange road freight through suitable transport providers.",
      cta: "Request a Quote",
    },
    intro: {
      eyebrow: "01 / TRANSPORT COORDINATION",
      title: "A practical approach to freight transport.",
      paragraphs: [
        "Whether you need to arrange a single shipment or discuss ongoing transport requirements, the process begins with understanding the details.",
        "We assess the requested movement of goods and work to identify suitable arrangements through our carrier network.",
        "The objective is straightforward: clear communication, appropriate transport options and coordinated execution.",
      ],
    },
    core: [
      {
        id: "road-freight-organisation",
        label: "01 / Road Freight Organisation",
        title: "Transport arrangements without unnecessary complexity.",
        paragraphs: [
          "We coordinate road freight requirements between customers and independent transport providers.",
          "From the initial enquiry to the agreed arrangements, we help bring together the information, parties and practical details involved in organising a shipment.",
        ],
        listTitle: "What this includes:",
        list: [
          "Reviewing cargo and shipment requirements.",
          "Identifying suitable transport arrangements.",
          "Coordinating collection and delivery details.",
          "Facilitating communication between the parties involved.",
        ],
        cta: "Discuss Your Shipment",
        ctaTarget: "contact",
      },
      {
        id: "freight-planning",
        label: "02 / Freight Planning & Coordination",
        title: "The details matter before the journey begins.",
        paragraphs: [
          "Every transport request includes decisions about timing, cargo characteristics, loading arrangements and delivery expectations.",
          "We work through the essential information before confirming transport arrangements, reducing avoidable uncertainty.",
        ],
        listTitle: "Key considerations:",
        list: [
          "Cargo type and quantity.",
          "Collection and delivery locations.",
          "Requested loading and delivery dates.",
          "Loading and unloading requirements.",
          "Shipment-specific instructions.",
        ],
        cta: "Send Transport Details",
        ctaTarget: "contact",
      },
      {
        id: "carrier-network",
        label: "03 / Independent Carrier Network",
        title: "More options through connected partners.",
        paragraphs: [
          "Our business model is built on working with independent transport companies rather than operating a fixed company-owned fleet.",
          "This allows us to explore transport options according to the requirements of each enquiry and the capacity available within our network.",
        ],
        listTitle: "",
        list: [] as string[],
        cta: "Learn How We Work",
        ctaTarget: "howWeWork",
      },
    ],
    requirements: {
      eyebrow: "02 / YOUR SHIPMENT",
      title: "Tell us what needs to move.",
      text: "The more precisely a shipment is described, the easier it is to assess the required transport arrangements.",
      listTitle: "Information we may need:",
      list: "Cargo description, approximate weight, dimensions or loading units, pickup and delivery locations, preferred dates and any special handling requirements.",
      note: "For shipments requiring particular equipment or transport conditions, availability must be confirmed before an offer can be made.",
      cta: "Request a Quote",
    },
    /** [PLACEHOLDER] prototype-only section headings for companyData transport types / industries. */
    extras: {
      typesEyebrow: "03 / TRANSPORT TYPES",
      typesTitle: "Equipment we can arrange through our partners.",
      industriesEyebrow: "04 / SECTORS",
      industriesTitle: "Businesses we organise transport for.",
    },
    finalCta: {
      title: "A transport requirement on your desk?",
      text: "Send us the essential details. We'll review your enquiry and discuss the available next steps.",
      cta: "Get in Touch",
    },
  },

  howWeWork: {
    hero: {
      eyebrow: "AXEL SAFE / OUR PROCESS",
      titleLines: ["Behind every shipment,", "a coordinated process."],
      text: "Road freight brings together several moving parts. Our work is to connect them into a clear transport arrangement.",
    },
    model: {
      eyebrow: "01 / OUR ROLE",
      titleLines: ["We organise the transport.", "Our carrier partners move the goods."],
      paragraphs: [
        "AXEL SAFE TRANSPORTING operates through a network of independent transport providers.",
        "Rather than relying on a company-owned fleet, we focus on arranging freight transport and coordinating the parties involved.",
        "This distinction defines how we work: understanding requirements, identifying suitable options and maintaining clear communication.",
      ],
      diagram: ["Shipper", "AXEL SAFE TRANSPORTING", "Independent Carrier"],
      diagramNotes: ["Has goods to move", "Coordinates the transport", "Performs the transport"],
    },
    stages: {
      eyebrow: "02 / STEP BY STEP",
      title: "A clear process from the first enquiry.",
      items: [
        {
          title: "Understanding the Shipment",
          paragraphs: [
            "Every enquiry begins with the relevant transport information.",
            "We review the cargo details, origin, destination, requested timing and other requirements that may affect the transport arrangement.",
          ],
        },
        {
          title: "Identifying Transport Options",
          paragraphs: [
            "With the requirements established, we look for suitable transport options through independent carrier partners.",
            "Availability, equipment requirements and specific shipment conditions are considered as part of the enquiry.",
          ],
        },
        {
          title: "Confirming the Arrangements",
          paragraphs: [
            "The proposed transport details are reviewed and agreed before the shipment is arranged.",
            "Relevant information is coordinated with the transport provider to support the agreed collection and delivery process.",
          ],
        },
        {
          title: "Coordinating Communication",
          paragraphs: [
            "Once transport has been arranged, we remain a point of contact for relevant coordination matters and updates under the agreed service arrangements.",
          ],
        },
      ],
    },
    why: {
      eyebrow: "03 / OUR APPROACH",
      title: "A network-based approach to road freight.",
      paragraphs: [
        "A fixed fleet provides a defined set of vehicles and capacity. An independent carrier network offers a different way of organising transport.",
        "Our model allows us to assess each enquiry against available carrier options rather than limiting transport arrangements to vehicles owned by the company.",
        "For customers, the benefit is a single organisation through which transport requirements and arrangements can be discussed.",
      ],
    },
    transparency: {
      eyebrow: "04 / WORKING TOGETHER",
      titleLines: ["Clear arrangements.", "Clear communication."],
      paragraphs: [
        "Before a shipment is confirmed, the relevant conditions, transport arrangements and responsibilities should be understood by the parties involved.",
        "We believe that accurate information and clear communication are essential to a professional transport relationship.",
      ],
      cta: "Discuss Your Transport Requirements",
    },
  },

  about: {
    hero: {
      eyebrow: "AXEL SAFE / ABOUT THE COMPANY",
      titleLines: ["Built around connections.", "Focused on transport."],
      text: "AXEL SAFE TRANSPORTING is a Romania-based company organising road freight transport through independent carrier partnerships.",
    },
    intro: {
      eyebrow: "01 / WHO WE ARE",
      title: "Logistics is a business of people, decisions and timing.",
      paragraphs: [
        "Behind every freight movement are businesses with deadlines, transport providers with available capacity and numerous details that need to come together.",
        "AXEL SAFE TRANSPORTING operates between these elements.",
        "Established in 2018 and based in Reghin, Romania, the company works in the road freight sector, organising transport through independent carriers.",
        "Our business is built around the practical work of connecting freight requirements with transport arrangements.",
      ],
    },
    philosophy: {
      eyebrow: "02 / WHAT GUIDES OUR WORK",
      title: "Good coordination begins with understanding the details.",
      items: [
        { title: "Clarity", text: "Transport requirements should be discussed clearly before arrangements are confirmed." },
        { title: "Communication", text: "The parties involved need relevant, accurate information throughout the process." },
        {
          title: "Adaptability",
          text: "Different shipments require different arrangements. We approach enquiries according to their individual requirements.",
        },
        {
          title: "Professional Relationships",
          text: "Long-term cooperation depends on consistent communication and clearly agreed expectations.",
        },
      ],
    },
    details: {
      eyebrow: "03 / COMPANY DETAILS",
      labels: {
        legalName: "Legal Name",
        established: "Established",
        office: "Registered Office",
        registration: "Registration Number",
        vat: "VAT / Fiscal Number",
        activity: "Primary Business Activity",
        website: "Website",
      },
    },
    finalCta: {
      title: "Looking for a transport coordination partner?",
      text: "Tell us about your business and the freight requirements you need to manage.",
      cta: "Contact AXEL SAFE",
    },
  },

  forCarriers: {
    hero: {
      eyebrow: "AXEL SAFE / CARRIER PARTNERSHIPS",
      titleLines: ["Your fleet.", "New connections."],
      paragraphs: [
        "We work with independent transport providers to organise road freight shipments for business customers.",
        "If you operate a transport company and are interested in discussing potential cooperation, we'd like to hear from you.",
      ],
      cta: "Become a Partner",
    },
    intro: {
      eyebrow: "01 / WORKING TOGETHER",
      title: "Professional transport starts with professional partnerships.",
      paragraphs: [
        "Our business model relies on cooperation with independent carriers.",
        "We connect customer transport requirements with available transport options and coordinate the relevant arrangements.",
        "We are interested in building relationships with transport operators who value clear communication, agreed conditions and professional cooperation.",
      ],
    },
    process: {
      eyebrow: "02 / GET CONNECTED",
      title: "Let's discuss how we can work together.",
      steps: [
        { title: "Introduce Your Company", text: "Tell us about your transport business, operating regions and vehicle types." },
        {
          title: "Share Your Capabilities",
          text: "Provide information about your available equipment, preferred routes and types of freight handled.",
        },
        {
          title: "Discuss Cooperation",
          text: "Our team can review your details and discuss possible transport opportunities and cooperation conditions.",
        },
        {
          title: "Stay in Contact",
          text: "Where there is a suitable basis for cooperation, we can remain in contact regarding relevant transport enquiries.",
        },
      ],
    },
    /** [PLACEHOLDER] prototype-only headings for companyData carrier requirements / conditions. */
    extras: {
      requirementsEyebrow: "03 / WHAT WE ASK FOR",
      requirementsTitle: "Before we work together.",
      conditionsEyebrow: "04 / HOW WE COOPERATE",
      conditionsTitle: "Clear conditions on every shipment.",
    },
    enquiry: {
      title: "Interested in working with AXEL SAFE?",
      text: "Introduce your company and tell us about your transport capabilities.",
      cta: "Send a Partnership Enquiry",
    },
  },

  contact: {
    hero: {
      eyebrow: "AXEL SAFE / CONTACT",
      title: "Let's move the conversation forward.",
      text: "Whether you have freight to arrange, a question about our services or an interest in carrier cooperation, you can contact us here.",
    },
    quote: {
      title: "Tell us about your shipment.",
      text: "Complete the form with the essential transport details so we can review your enquiry.",
    },
    direct: {
      eyebrow: "PREFER TO CONTACT US DIRECTLY?",
      title: "Let's talk.",
      labels: { email: "Email", phone: "Phone", location: "Location", hours: "Business Hours" },
      location: "Reghin, Mureș County, Romania",
    },
    carriers: {
      title: "Looking to collaborate as a transport provider?",
      text: "Use our dedicated carrier partnership enquiry form.",
      cta: "Become a Carrier Partner",
    },
  },

  forms: {
    quote: {
      fields: {
        companyName: "Company Name",
        contactPerson: "Contact Person",
        email: "Business Email",
        phone: "Phone Number",
        pickupLocation: "Pickup Location",
        deliveryLocation: "Delivery Location",
        cargoDescription: "Cargo Description",
        weight: "Approximate Weight / Loading Units",
        pickupDate: "Preferred Pickup Date",
        deliveryDate: "Preferred Delivery Date",
        additional: "Additional Requirements",
      },
      submit: "Send Transport Enquiry",
    },
    /** Carrier form labels — derived from the approved partnership process copy. */
    carrier: {
      fields: {
        companyName: "Company Name",
        contactPerson: "Contact Person",
        email: "Business Email",
        phone: "Phone Number",
        country: "Country of Registration",
        fleetSize: "Number of Vehicles",
        vehicleTypes: "Vehicle Types",
        regions: "Operating Regions / Preferred Routes",
        message: "Additional Information",
      },
      submit: "Send a Partnership Enquiry",
    },
    consent:
      "I agree that AXEL SAFE TRANSPORTING may process the information submitted through this form to respond to my enquiry, as described in the Privacy Policy.",
    success: {
      title: "Your enquiry has been received.",
      text: "Thank you for contacting AXEL SAFE TRANSPORTING. Our team will review the information you provided and respond using your contact details.",
    },
    required: "Required",
    optional: "Optional",
    sending: "Sending…",
    errors: {
      required: "Please complete this field.",
      email: "Please enter a valid business email.",
      consent: "Please confirm that we may process your enquiry.",
      generic: "Something went wrong and your enquiry was not sent. Please try again, or contact us directly.",
      notConfigured:
        "Online enquiries are not connected yet, so your message was not sent. Please contact us directly by email or phone.",
      rateLimited: "Too many attempts in a short time. Please wait a minute and try again.",
    },
  },

  /** [PLACEHOLDER] prototype-only copy for the equipment explorer + example enquiry — needs client approval. */
  showcase: {
    equipment: {
      title: "Equipment at a glance.",
      text: "Typical figures for the trailer types we arrange through our carrier partners.",
      note: "Typical figures for standard European semi-trailers. Exact dimensions and capacity are confirmed with the carrier for each shipment.",
      labels: {
        length: "Loading length",
        pallets: "EUR pallets",
        payload: "Payload",
        height: "Internal height",
        volume: "Volume",
        temperature: "Temperature range",
      },
      units: { m: "m", t: "t", m3: "m³" },
      topView: "Top view · 13.6 m deck",
    },
    enquiry: {
      label: "Example enquiry",
      route: { from: "Reghin, RO", to: "Munich, DE", distance: "≈ 1,050 km" },
      fields: { cargo: "Cargo", trailer: "Trailer", dates: "Dates" },
      cargo: "24 EUR pallets · furniture",
      trailer: "Curtainsider",
      dates: "03.11 → 05.11",
      steps: ["Request received", "Options reviewed", "Transport confirmed", "In coordination"],
    },
    watermark: "Precision",
  },

  /**
   * FAQ — [PLACEHOLDER] DRAFT written by EDH from verified facts only; needs client approval before launch.
   * Feeds the visible FAQ sections AND the FAQPage JSON-LD (same source).
   */
  faq: {
    title: "Questions we are often asked.",
    shippers: [
      {
        q: "Does AXEL SAFE TRANSPORTING own its own trucks?",
        a: "No. We organise road freight transport through a network of independent carrier partners. The carriage itself is performed by those transport companies, while we handle the coordination of each shipment.",
      },
      {
        q: "Which countries do you organise road freight for?",
        a: "We organise road freight across Europe. Share the collection and delivery locations, and we will review the available transport options for that route.",
      },
      {
        q: "Which trailer types can you arrange?",
        a: "Through our carrier partners we arrange curtainsider (tautliner), refrigerated and mega trailers. For shipments that need other equipment or particular transport conditions, availability is confirmed for each enquiry.",
      },
      {
        q: "What information do you need to prepare a quote?",
        a: "A cargo description, approximate weight, dimensions or loading units, pickup and delivery locations, preferred dates and any special handling requirements. The more precise the details, the easier it is to assess the transport arrangements.",
      },
      {
        q: "How does the process work?",
        a: "You share the shipment details, we review the request and identify suitable transport options, the arrangements are agreed before the shipment is confirmed, and we coordinate them with the selected transport provider.",
      },
      {
        q: "Who is my point of contact once transport is arranged?",
        a: "AXEL SAFE TRANSPORTING remains your point of contact for coordination matters and relevant updates under the agreed service arrangements.",
      },
      {
        q: "Where is the company based?",
        a: "AXEL SAFE TRANSPORTING S.R.L. was established in 2018 and is based in Reghin, Mureș County, Romania.",
      },
    ],
    carriers: [
      {
        q: "Which transport companies can become partners?",
        a: "We welcome enquiries from transport operators interested in cooperation who value clear communication, agreed conditions and professional cooperation.",
      },
      {
        q: "What should I include in a partnership enquiry?",
        a: "Information about your company, operating regions, vehicle types, available equipment, preferred routes and the types of freight you handle.",
      },
      {
        q: "What happens after I send an enquiry?",
        a: "Our team reviews your details and can discuss possible transport opportunities and cooperation conditions. Where there is a suitable basis for cooperation, we stay in contact regarding relevant transport enquiries.",
      },
    ],
  },

  legal: {
    reviewNote:
      "This page is a structural draft prepared for professional legal review. It is not final legal text and must be reviewed before publication.",
  },

  common: {
    skip: "Skip to content",
    language: "Language",
  },
} as const;

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends object
      ? { readonly [K in keyof T]: Widen<T[K]> }
      : T;

/** Shape every locale dictionary must match (same keys, any strings). */
export type Dictionary = Widen<typeof en>;
