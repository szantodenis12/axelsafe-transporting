/**
 * ENGLISH COPY: translated from the approved Romanian dictionary (ro.ts, 13.11.2026), which is the source.
 * Same keys, structure and array lengths as `ro`. Keys, `key`, `anchor`, `id` and `ctaTarget` values are not translated.
 * Business facts (phone, email, hours…) come from companyData.ts.
 * Blocks marked as placeholder in comments are prototype-only additions, not approved copy.
 */
export const en = {
  meta: {
    home: {
      title: "AXEL SAFE TRANSPORTING | Road freight organisation",
      description:
        "We organise road freight across Europe and the United Kingdom through independent carriers. 24/7 dispatch. Request a quote.",
    },
    services: {
      title: "Road freight services | AXEL SAFE TRANSPORTING",
      description:
        "Transport organisation, trip planning and carrier coordination. What AXEL SAFE TRANSPORTING does for businesses.",
    },
    howWeWork: {
      title: "How we organise transport | AXEL SAFE TRANSPORTING",
      description:
        "How AXEL SAFE TRANSPORTING works, from your request to a confirmed shipment with an independent carrier.",
    },
    about: {
      title: "About AXEL SAFE TRANSPORTING | Road freight",
      description:
        "AXEL SAFE TRANSPORTING is a Romanian company founded in 2018 that organises road freight through independent carriers.",
    },
    forCarriers: {
      title: "Working with carriers | AXEL SAFE TRANSPORTING",
      description:
        "Do you run a transport company and want more loads? Tell us about your company and we will see together whether we can work together.",
    },
    contact: {
      title: "Request a transport quote | AXEL SAFE TRANSPORTING",
      description:
        "Send us the route, the cargo and the date. AXEL SAFE TRANSPORTING will send you a quote for your road freight.",
    },
    vetting: {
      title: "How we vet carriers | AXEL SAFE TRANSPORTING",
      description:
        "Before a carrier loads your goods, we check its EU Community Licence, CMR insurance, truck documents and company status.",
    },
    guides: {
      title: "Road freight guides | AXEL SAFE TRANSPORTING",
      description:
        "Guides for shippers: the CMR consignment note, how the price of a shipment is calculated and the difference between a freight forwarder, a carrier and a freight exchange.",
    },
  },

  nav: {
    items: [
      { key: "home", label: "Home" },
      { key: "services", label: "Services" },
      { key: "howWeWork", label: "How we work" },
      { key: "about", label: "About us" },
      { key: "forCarriers", label: "For carriers" },
    ],
    cta: "Request a quote",
    menu: "Menu",
    close: "Close",
  },

  footer: {
    statement: "We organise road freight through independent carriers.",
    explore: "Pages",
    exploreItems: [
      { key: "home", label: "Home" },
      { key: "services", label: "Services" },
      { key: "howWeWork", label: "How we work" },
      { key: "about", label: "About us" },
      { key: "forCarriers", label: "For carriers" },
      { key: "contact", label: "Contact" },
      { key: "vetting", label: "How we vet carriers" },
      { key: "guides", label: "Guides" },
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
    social: "Find us on",
    cta: "Request a quote",
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
      eyebrow: "AXEL SAFE TRANSPORTING / ROAD FREIGHT ORGANISATION",
      titleLines: ["European road freight,", "built around your business."],
      text: "We organise road freight across Europe and the United Kingdom through a network of checked carriers. From finding the right truck to confirming delivery, we organise and coordinate every shipment.",
      primary: "Request a quote",
      secondary: "See our services",
      micro: ["In freight transport since 2018", "Around 100 shipments a month", "Dispatch available 24/7"],
    },
    intro: {
      eyebrow: "02 / TRANSPORT ORGANISATION AND COORDINATION",
      title: "A partner you can rely on for your company's transport.",
      paragraphs: [
        "We know how much it matters for a shipment to be well organised. The truck has to suit the goods, loading has to happen on schedule, and everyone involved needs the information on time.",
        "At AXEL SAFE TRANSPORTING, we take care of these details. We work with independent carriers, check the options available and organise each shipment around what the customer needs.",
      ],
      emphasis: "Whether you have a single load to send or regular shipments, you have a team that knows every stage of the process and stays in touch with the carrier throughout the trip.",
      cta: "Find out more about us",
    },
    approach: {
      eyebrow: "03 / WHY WORK WITH US",
      titleLines: ["Well-organised transport,", "with less to worry about."],
      text: "",
      cards: [
        {
          title: "More than 30 carriers in our network",
          text: "We work with independent carriers whose documents, licences and insurance have been checked. We choose partners according to the type of goods, the route and the transport conditions.",
        },
        {
          title: "We find the right truck for your goods",
          text: "Every load is different. We take weight, volume, destination and the type of semi-trailer needed into account before proposing a transport option.",
        },
        {
          title: "One point of contact",
          text: "You don't have to keep in touch with each party separately. We handle communication with the carrier and pass on the information you need during the trip.",
        },
        {
          title: "24/7 dispatch",
          text: "We are available for communication and coordination outside normal working hours too.",
        },
        {
          title: "More transport options",
          text: "We don't depend on the availability of a single fleet. Our network of partners lets us look for options based on the route and the period when you need transport.",
        },
        {
          title: "We reply to requests quickly",
          text: "Once we have all the details we need, we usually reply in under an hour.",
        },
      ],
      cta: "See our services",
    },
    services: {
      eyebrow: "04 / OUR SERVICES",
      title: "We organise the transport your business needs.",
      text: "From a single shipment to recurring transport, we find the carrier, agree the details and coordinate delivery.",
      cards: [
        {
          title: "European road freight",
          text: "We organise freight on routes across Europe and the United Kingdom, based on the destination, the characteristics of the load and the delivery deadline. We work with carriers that have different types of semi-trailers, so we can find a suitable option for each shipment.",
          anchor: "road-freight-organisation",
        },
        {
          title: "Logistics planning and coordination",
          text: "We organise the trip, from agreeing loading and unloading conditions to communicating with the carrier. We follow the shipment and stay in touch with the parties involved, so that any changes are communicated in good time.",
          anchor: "freight-planning",
        },
        {
          title: "Independent carrier network",
          text: "We work with checked transport companies that have experience on different European routes. For each request, we check truck availability and select the carrier that can meet the conditions of the trip.",
          anchor: "carrier-network",
        },
      ],
      cardCta: "Details",
    },
    process: {
      eyebrow: "07 / HOW WE WORK",
      title: "From request to delivery, in four steps.",
      text: "",
      steps: [
        { title: "Tell us what needs to be moved", text: "We need the loading place, the destination, the type of goods, weight, volume and the period when the transport has to take place." },
        { title: "We look for a suitable option", text: "We check the availability of carriers in our network and choose the options that match your requirements." },
        { title: "We agree all the details", text: "We send you the rate and the transport conditions. Once you confirm, we set the loading and unloading schedule with the carrier." },
        { title: "We stay in touch until delivery", text: "We coordinate communication during the trip and send you the updates you need until delivery is confirmed." },
      ],
      cta: "Request transport",
    },
    carriers: {
      eyebrow: "08 / WORK WITH US",
      title: "Do you run a transport company? Let's talk.",
      paragraphs: [
        "We want to work with reliable carriers who keep their commitments and communicate clearly.",
        "If you have trucks available and operate on European routes, send us some information about your company, your semi-trailer types and the routes you work on.",
        "We will look at whether we can work together.",
      ],
      cta: "Become an AXEL SAFE partner",
    },
    finalCta: {
      eyebrow: "DISPATCH AVAILABLE 24/7",
      titleLines: ["Have goods to move?", "Send us the details."],
      text: "Tell us where the goods need to be loaded, where they need to go and when you need transport. We check the options available and come back to you with a quote based on your requirements.",
      primary: "Request a transport quote",
      secondary: "Contact us",
    },
    /** [PLACEHOLDER] prototype-only labels for the network visual. Not approved copy. */
    network: {
      caption: "Main European roads. Illustrative map, not AXEL SAFE's routes.",
      origin: "Reghin, Romania",
      coverageLabel: "Coverage",
      equipmentLabel: "Equipment",
      baseLabel: "Registered office",
      baseValue: "Reghin, Romania · since 2018",
    },
  },

  services: {
    hero: {
      eyebrow: "TRANSPORT AND LOGISTICS SERVICES",
      titleLines: ["European road freight,", "built around what your business needs."],
      text: "We organise road freight across Europe through a network of checked carriers. We handle both one-off shipments and recurring transport, based on the goods, the route and the delivery deadlines.",
      cta: "Request a quote",
    },
    intro: {
      eyebrow: "01 / OUR APPROACH",
      title: "We organise transport around the requirements of each trip.",
      paragraphs: [
        "Every shipment comes with different conditions. The type of goods, the route, the delivery deadline and the equipment needed all affect how the trip is organised.",
        "At AXEL SAFE TRANSPORTING, we look at this information, check carrier availability and agree the transport conditions with the customer.",
        "We organise the trip and handle communication with the carrier until delivery.",
      ],
    },
    core: [
      {
        id: "road-freight-organisation",
        label: "Service 01 / Road freight organisation",
        title: "Freight between European destinations.",
        paragraphs: [
          "We organise road freight for companies that need to ship goods within Europe.",
          "We work with independent carriers and select the available options based on the load, the route and the requested period.",
          "We handle both one-off requests and regular transport.",
        ],
        listTitle: "What the service includes:",
        list: [
          "Reviewing the transport requirements.",
          "Finding available carriers.",
          "Choosing the type of semi-trailer.",
          "Agreeing loading and unloading conditions.",
          "Confirming rates and trip details.",
          "Coordinating the shipment until delivery.",
        ],
        cta: "Request a transport quote",
        ctaTarget: "contact",
      },
      {
        id: "freight-planning",
        label: "Service 02 / Planning and coordination",
        title: "We plan every trip before loading.",
        paragraphs: [
          "To organise a shipment, we need clear information about the goods, the destination and the delivery conditions.",
          "We bring these details together and pass them to the carrier before the trip is confirmed. During the shipment, we stay in touch with the parties involved and pass on relevant updates.",
        ],
        listTitle: "What we handle:",
        list: [
          "The type, quantity and dimensions of the goods.",
          "Loading and unloading addresses.",
          "Agreed dates and time windows.",
          "The type of equipment needed.",
          "Special transport instructions.",
          "Communication between the customer and the carrier.",
        ],
        cta: "Talk to our team",
        ctaTarget: "contact",
      },
      {
        id: "carrier-network",
        label: "Service 03 / Carrier network",
        title: "A network of more than 30 partner carriers.",
        paragraphs: [
          "We work with more than 30 independent carriers to organise shipments across Europe.",
          "For each request, we check our partners' availability and find suitable options for the route and the type of goods.",
          "Before we start working with a carrier, we check the documents needed to carry out the transport, including the transport licence, CMR insurance and vehicle documents.",
          "Through this network we can organise transport with different types of semi-trailers, depending on the capacity available.",
        ],
        listTitle: "",
        list: [] as string[],
        cta: "Find out more about our network",
        ctaTarget: "vetting",
      },
    ],
    requirements: {
      eyebrow: "04 / WHAT TO SEND US",
      title: "Tell us what needs to be moved.",
      text: "The more details you give us, the sooner we can send you an accurate quote.",
      listTitle: "What helps us to know:",
      list: "What the goods are, their approximate weight, the dimensions or number of pallets, where they are loaded and delivered, your preferred dates and whether the goods need special handling.",
      note: "If the goods need special equipment or conditions, we check availability first and only then send you the quote.",
      cta: "Request a quote",
    },
    /** [PLACEHOLDER] prototype-only section headings for companyData transport types / industries. */
    extras: {
      typesEyebrow: "05 / EQUIPMENT TYPES",
      typesTitle: "Semi-trailers for different types of goods.",
      industriesEyebrow: "06 / SECTORS",
      industriesTitle: "Businesses we organise transport for.",
    },
    finalCta: {
      title: "Need road freight within Europe?",
      text: "Send us the details of the goods, the route and the loading date. We check carrier availability and come back to you with a quote for the trip.",
      cta: "Request a transport quote",
    },
  },

  howWeWork: {
    hero: {
      eyebrow: "OUR PROCESS",
      titleLines: ["From the transport request", "to confirmed delivery."],
      text: "We organise every trip, from choosing the right carrier to coordinating delivery. You have one point of contact and know who to talk to throughout the shipment.",
    },
    model: {
      eyebrow: "01 / HOW WE OPERATE",
      titleLines: ["We organise the transport.", "Our partners carry it out."],
      paragraphs: [
        "At AXEL SAFE TRANSPORTING, we work with independent transport companies, selected according to the route, the type of goods and the conditions of each trip.",
        "We don't run our own fleet, which lets us look for available trucks across our carrier network instead of depending on a fixed number of vehicles.",
        "We handle the organisation, agree the details and communicate with the carrier, so you have a single partner to talk to.",
        "The customer sends us the details of the goods and the delivery conditions.",
        "AXEL SAFE TRANSPORTING checks the available options, organises the trip and coordinates communication.",
        "The partner carrier collects the goods and carries out the transport under the agreed conditions.",
      ],
      diagram: ["Customer", "AXEL SAFE TRANSPORTING", "Partner carrier"],
      diagramNotes: ["Has goods to move", "Coordinates the transport", "Performs the transport"],
      vettingLink: "How we vet carriers",
    },
    stages: {
      eyebrow: "02 / HOW WE WORK TOGETHER",
      title: "How we organise transport, step by step.",
      items: [
        {
          title: "Tell us what needs to be moved",
          paragraphs: [
            "It all starts with a few pieces of information: what goods need to be moved, where they are loaded, where they need to go and when you need transport.",
            "We check the weight, the volume and any special conditions, so we know exactly what type of truck is needed.",
          ],
        },
        {
          title: "We look for the right carrier",
          paragraphs: [
            "We check the availability of trucks in our network and find the carriers that can make the trip under the requested conditions.",
            "We take into account the route, the loading period, the type of semi-trailer and the specifics of the goods.",
          ],
        },
        {
          title: "We send you the quote and agree the details",
          paragraphs: [
            "Once we have found a transport option, we send you the rate and the conditions of the trip.",
            "When you accept the quote, we confirm the details in writing and set the loading and unloading schedule with the carrier.",
          ],
        },
        {
          title: "We stay in touch until delivery",
          paragraphs: [
            "During the shipment, we communicate with the carrier and send you the updates you need.",
            "If the schedule changes or something else needs coordinating, we step in to clarify the details with the parties involved.",
            "Our dispatch is available 24/7, and the process ends once delivery is confirmed.",
          ],
        },
      ],
    },
    why: {
      eyebrow: "03 / FLEXIBILITY",
      title: "More transport options, without depending on a single fleet.",
      paragraphs: [
        "Every company has different transport needs. Some trips are planned well in advance, others come up with orders, production or delivery deadlines.",
        "That is why we work with a network of independent carriers, which lets us check the availability of many trucks and semi-trailer types.",
        "For you, things stay simple: you send us the request, and we look for a suitable option and organise the transport.",
      ],
    },
    transparency: {
      eyebrow: "04 / COMMUNICATION AND RESPONSIBILITY",
      titleLines: ["You know what has been agreed", "and who to talk to."],
      paragraphs: [
        "A well-organised shipment starts with accurate information and conditions agreed before loading.",
        "We check the documents of the carriers we work with, confirm the trip details in writing and stay in touch with everyone involved during the shipment.",
        "If anything changes, we talk to the carrier and keep you informed.",
        "We want working relationships where each party knows what it has to do and important information is passed on in time.",
      ],
      cta: "Request a transport quote",
    },
  },

  about: {
    hero: {
      eyebrow: "ABOUT AXEL SAFE TRANSPORTING",
      titleLines: ["Organising road freight", "across Europe since 2018."],
      text: "We are a Romanian company from Reghin that organises and coordinates road freight. We work with independent carriers to handle requests from companies that need transport within Europe.",
    },
    intro: {
      eyebrow: "01 / WHO WE ARE",
      title: "Experience in European road freight.",
      paragraphs: [
        "AXEL SAFE TRANSPORTING started operating in 2018, in Reghin, Mureș County.",
        "We organise freight for companies in different industries. We work with a network of independent carriers and handle each trip from the moment we receive the request until delivery is confirmed.",
        "We check carrier availability, agree the conditions of the trip and coordinate communication between the customer and the carrier.",
        "Today we handle around 100 shipments a month, on routes across Europe and the United Kingdom. One of our main routes is Romania–Spain.",
      ],
    },
    philosophy: {
      eyebrow: "03 / OUR PRINCIPLES",
      title: "The principles we work by.",
      items: [
        { title: "Professionalism", text: "We handle every request with care for the transport details and the conditions agreed with the customer." },
        { title: "Transparency", text: "We communicate the rates, conditions and trip details before the transport is confirmed." },
        { title: "Flexibility", text: "We look for transport options based on the route, the type of goods and carrier availability." },
        { title: "Responsibility", text: "We check the documents of our partner carriers and follow each trip until delivery is confirmed." },
      ],
    },
    details: {
      eyebrow: "04 / COMPANY DETAILS",
      labels: {
        legalName: "Company name",
        established: "Year founded",
        office: "Registered office",
        registration: "Trade Register no.",
        vat: "Tax ID (CUI)",
        activity: "CAEN",
        website: "Website",
      },
    },
    finalCta: {
      title: "Looking for a partner for your company's transport?",
      text: "Tell us which routes you need transport on and what type of goods you ship. We will talk through your requirements and how we could work together.",
      cta: "Contact us",
    },
  },

  forCarriers: {
    hero: {
      eyebrow: "CARRIER PARTNERSHIPS",
      titleLines: ["New transport opportunities", "for your company."],
      paragraphs: [
        "We work with independent carriers across Europe, offering access to transport requests, commercial terms set out in writing and operational coordination throughout each trip.",
      ],
      cta: "Become a partner carrier",
    },
    intro: {
      eyebrow: "01 / WORKING TOGETHER",
      title: "We build partnerships with professional transport companies.",
      paragraphs: [
        "AXEL SAFE TRANSPORTING works with operators that have transport capacity, valid documents and experience in road freight.",
        "We are interested in partnerships with companies that run curtainsider, refrigerated or mega semi-trailers on European routes.",
        "We want working relationships based on keeping to the agreed terms, good communication and continuity.",
      ],
    },
    process: {
      eyebrow: "02 / HOW TO BECOME A PARTNER",
      title: "Four steps towards working together.",
      steps: [
        { title: "Tell us about your company", text: "Send us your company details and information about your transport business." },
        { title: "Tell us your available capacity", text: "Let us know your vehicle types, preferred routes and the regions you operate in." },
        { title: "We review the information", text: "We check the relevant documents and discuss the terms of a possible cooperation." },
        { title: "We start working together", text: "Depending on the requests we have, we can offer you trips that fit your company's operations." },
      ],
    },
    /** [PLACEHOLDER] prototype-only headings for companyData carrier requirements / conditions. */
    extras: {
      requirementsEyebrow: "03 / TERMS OF COOPERATION",
      requirementsTitle: "What we check before we start working together.",
      conditionsEyebrow: "",
      conditionsTitle: "",
      requirementsLink: "These checks are part of our carrier selection process",
      benefitsEyebrow: "04 / BENEFITS",
      benefitsTitle: "What we offer our partner carriers.",
    },
    enquiry: {
      title: "Tell us about your transport company.",
      text: "Fill in the form and send us the key information about your business.",
      cta: "Send partnership request",
    },
  },

  /** [PLACEHOLDER] DRAFT written by EDH from facts confirmed on the 10.11.2026 call; needs client approval before launch. */
  vetting: {
    hero: {
      eyebrow: "SAFETY AND CHECKS",
      titleLines: ["Carriers checked", "before each trip is assigned."],
      text: "We work with independent transport operators, and we check the documents and conditions they need to carry out the transport.",
    },
    why: {
      title: "Choosing the carrier is an essential step.",
      paragraphs: [
        "In international road freight, checking the transport operator helps reduce administrative, commercial and operational risks.",
        "At AXEL SAFE TRANSPORTING, the selection process includes checks on the carrier's legal status, its CMR insurance and the documents for the equipment used.",
        "We work with a network of more than 30 independent carriers, selected on the basis of set criteria.",
      ],
    },
    checks: {
      title: "Four essential checks.",
      notes: [
        "We check that the operator legally exists and that it holds a valid EU Community Licence for the international transport concerned.",
        "We check the carrier's CMR policy and confirm with the insurer that it is valid.",
        "We check the truck and semi-trailer documents, and that the equipment suits the requirements of the goods.",
        "We check the company's status, including any insolvency proceedings.",
      ],
    },
    roles: {
      title: "Clear responsibilities for every shipment.",
      paragraphs: [
        "The independent carrier performs the transport using its own vehicles, staff and documents.",
        "AXEL SAFE TRANSPORTING handles the choice of carrier, confirms the terms of cooperation and coordinates communication until delivery.",
        "In addition to the carrier's CMR insurance, the company states that the cargo is insured, under the conditions that apply to the transport.",
      ],
      guideLink: "Guide: freight forwarder, carrier or freight exchange",
    },
    finalCta: {
      title: "Have your goods moved by checked partners.",
      text: "Send us your transport requirements and we will look at the options available.",
      cta: "Request a quote",
    },
  },

  contact: {
    hero: {
      eyebrow: "CONTACT AXEL SAFE TRANSPORTING",
      title: "Request a quote for moving your goods.",
      text: "Send us the transport details, and our team will look at the route, the requirements and the capacity available in our carrier network. We usually reply to requests in under an hour.",
    },
    quote: {
      title: "Tell us what transport you need to organise.",
      text: "Fill in the information below to receive a quote based on your requirements.",
    },
    direct: {
      eyebrow: "DIRECT CONTACT",
      title: "Contact the AXEL SAFE TRANSPORTING team.",
      labels: { email: "Email", phone: "Phone", location: "Registered office", hours: "Dispatch availability" },
      location: "Reghin, Mureș County, Romania",
    },
    carriers: {
      title: "Do you represent a transport company?",
      text: "If you are interested in working with AXEL SAFE TRANSPORTING, go to the section for carriers and send us information about your company.",
      cta: "Become a partner carrier",
    },
  },

  forms: {
    quote: {
      fields: {
        companyName: "Company name",
        contactPerson: "Contact person",
        email: "Email address",
        phone: "Phone number",
        pickupLocation: "Loading place",
        deliveryLocation: "Delivery place",
        cargoDescription: "Description of the goods",
        weight: "Approximate weight and dimensions",
        pickupDate: "Preferred loading date",
        deliveryDate: "Preferred delivery date",
        additional: "Other requirements",
      },
      submit: "Send transport request",
    },
    /** Carrier form labels, derived from the approved copy about the partnership process. */
    carrier: {
      fields: {
        companyName: "Company name",
        contactPerson: "Contact person",
        email: "Email",
        phone: "Phone",
        country: "Country of registration",
        fleetSize: "Number of vehicles",
        vehicleTypes: "Vehicle types",
        regions: "Operating regions and preferred routes",
        message: "Additional information",
        vatNumber: "Company registration / VAT number",
        cmrInsurance: "Valid CMR insurance",
        licenceNumber: "Transport licence number",
      },
      vehicleOptions: { curtainsider: "Curtainsider", reefer: "Refrigerated", mega: "Mega", other: "Other" },
      cmrOptions: { yes: "Yes", no: "No" },
      submit: "Send partnership request",
    },
    /** Quick request: route and phone only. */
    quick: {
      fields: { contactPerson: "Name", phone: "Phone", pickupLocation: "Loading place", deliveryLocation: "Destination", note: "Additional information" },
      submit: "Send quick request",
    },
    /** We call you. */
    callback: {
      fields: { contactPerson: "Name", phone: "Phone", preferredTime: "Preferred time" },
      timeOptions: { any: "Any time", morning: "Morning", afternoon: "Afternoon", evening: "Evening" },
      submit: "Request a call",
    },
    /** Contact page form blocks (tabs + callback box). */
    contactBlocks: {
      tabsLabel: "Request type",
      tabFull: "Full request",
      tabQuick: "Quick request",
      quickText: "Don't have all the details ready? Send us the route and your phone number. We will sort out the rest together.",
      callbackTitle: "Would you rather talk on the phone?",
      callbackText: "Leave your contact details and the time that suits you. Someone from AXEL SAFE TRANSPORTING will call you to discuss your request.",
    },
    consent:
      "I agree that AXEL SAFE TRANSPORTING may use the information sent through this form to reply to me, as described in the Privacy Policy.",
    success: {
      title: "We have received your request.",
      text: "Thank you! We will look over the details and get back to you by phone or email.",
    },
    required: "Required",
    optional: "Optional",
    sending: "Sending…",
    errors: {
      required: "Please fill in this field.",
      email: "The email address is not valid.",
      consent: "Please tick the consent box so we can reply to your request.",
      generic: "Your request was not sent because of an error. Please try again or call us directly.",
      notConfigured:
        "The form is not working yet, so your message was not sent. Please email or call us.",
      rateLimited: "Too many attempts in a short time. Please wait a minute and try again.",
      invalid: "Please check what you entered in this field.",
      tooLong: "The text is too long. Please shorten it.",
    },
  },

  /** [PLACEHOLDER] prototype-only copy for the equipment explorer + example request. Needs client approval. */
  showcase: {
    equipment: {
      title: "The right semi-trailer for each type of goods.",
      text: "Depending on the load, we can organise transport with curtainsider, refrigerated or mega semi-trailers, available through the transport companies we work with.",
      note: "The type of equipment and its availability are confirmed for each shipment. Specifications are indicative and may vary depending on the configuration of the semi-trailer assigned.",
      labels: {
        length: "Loading length",
        pallets: "EUR pallets",
        payload: "Payload",
        height: "Internal height",
        volume: "Volume",
        temperature: "Temperature",
      },
      units: { m: "m", t: "t", m3: "m³" },
      topView: "Top view · 13.6 m deck",
    },
    enquiry: {
      label: "Example request",
      route: { from: "Reghin, RO", to: "Munich, DE", distance: "≈ 1,050 km" },
      fields: { cargo: "Goods", trailer: "Semi-trailer", dates: "Dates" },
      cargo: "24 EUR pallets · furniture",
      trailer: "Curtainsider",
      dates: "03.11 → 05.11",
      steps: ["Request received", "Truck found", "Trip confirmed", "On the road"],
    },
    watermark: "Precision",
  },

  /**
   * FAQ: [PLACEHOLDER] DRAFT written by EDH from verified facts only; needs client approval before launch.
   * Feeds the visible FAQ sections AND the FAQPage JSON-LD (same source).
   */
  faq: {
    title: "Frequently asked questions about road freight.",
    shippers: [
      {
        q: "Which countries does AXEL SAFE TRANSPORTING organise road freight in?",
        a: "AXEL SAFE TRANSPORTING organises road freight across Europe and the United Kingdom, with regular work on the Romania–Spain route. We do not organise transport in Switzerland. Availability is checked according to the requested route and period.",
      },
      {
        q: "Is AXEL SAFE TRANSPORTING a freight forwarder or a transport company?",
        a: "AXEL SAFE TRANSPORTING is a company from Reghin, Mureș County, that organises and coordinates road freight. We work with independent carriers who carry out the trips. We do not run our own fleet.",
      },
      {
        q: "What types of goods can you move within Europe?",
        a: "We organise transport for general, palletised and bulky goods, and for products that need a controlled temperature. For goods with special requirements, we check the availability of carriers and of the equipment needed.",
      },
      {
        q: "What types of semi-trailers are available?",
        a: "Through our network of partner carriers we can organise trips with curtainsider (Tautliner), refrigerated and Mega semi-trailers. The choice of equipment depends on the dimensions, weight and characteristics of the goods.",
      },
      {
        q: "Do you organise road freight between Romania and Spain?",
        a: "Yes. The Romania–Spain route is one of our main transport routes. We organise transport in both directions, depending on carrier availability and the requirements of each trip.",
      },
      {
        q: "How can I request a quote for international freight?",
        a: "You can contact us through the form on the website or using the details on the contact page. To prepare a quote, we need the loading place, the destination, the type of goods, weight, dimensions and the requested date.",
      },
      {
        q: "How soon will I receive a transport quote?",
        a: "We usually reply in under an hour once we have the information we need. Requests that involve special equipment or different transport conditions may need extra checks.",
      },
      {
        q: "How is the price of international road freight calculated?",
        a: "The rate depends on the distance, the requested route, the weight and volume of the goods, the type of semi-trailer and carrier availability. The price is communicated once we have assessed the details of the trip.",
      },
      {
        q: "Do you organise full truck loads (FTL)?",
        a: "We can look at requests for full loads, where the truck's capacity is allocated to a single load. Availability and conditions are confirmed for each trip.",
      },
      {
        q: "Can I request transport for a smaller quantity of goods (LTL)?",
        a: "For loads that do not fill a whole truck, we can check the options available in our partner carrier network. Whether it can be organised depends on the route, the volume and the requested period.",
      },
      {
        q: "Do you organise temperature-controlled freight?",
        a: "Yes. We can organise refrigerated transport through partners with semi-trailers equipped for controlled temperature. The temperature range and transport conditions are agreed before the trip is confirmed.",
      },
      {
        q: "Can you organise ADR transport for dangerous goods?",
        a: "Yes, depending on availability and the class of goods. We work with carriers that have the equipment and certified staff for ADR transport. We do not organise oversized loads or live animal transport.",
      },
      {
        q: "How do you check the carriers you work with?",
        a: "Before we start working with an operator, we check its company documents, transport licence, CMR insurance, vehicle documents and legal status.",
      },
      {
        q: "Is the cargo insured?",
        a: "Yes, the cargo is insured. In addition, partner carriers must hold valid CMR insurance, which covers the carrier's liability under the terms of the policy and the applicable law.",
      },
      {
        q: "Can I find out where my goods are during transport?",
        a: "Yes. AXEL SAFE TRANSPORTING stays in touch with the carrier and can ask for updates on the trip. The information is passed on to the customer as it becomes available.",
      },
      {
        q: "What happens if there are delays during transport?",
        a: "If the transport schedule changes, we talk to the operator to find out what is happening and pass the available information on to the customer. Any changes to delivery are handled according to the agreed conditions.",
      },
      {
        q: "Can I change the delivery address or date after the trip is confirmed?",
        a: "Changes can be looked at together with the carrier. Whether they are possible depends on the stage of the trip, availability and the agreed commercial terms. In some cases there may be extra costs.",
      },
      {
        q: "What documents are needed for international road freight?",
        a: "The documents depend on the type of goods and the countries involved. Usually you may need the CMR consignment note, the commercial invoice and the documents for the load. Some goods or destinations may require additional documents.",
      },
      {
        q: "Do you organise regular transport for companies?",
        a: "Yes. We can organise both one-off shipments and recurring trips. For regular work, we look at the routes, the frequency of shipments, the volumes and the capacity available.",
      },
      {
        q: "How can I work with AXEL SAFE TRANSPORTING long term?",
        a: "Send us information about the routes you use, the types of goods and how often you ship. Based on this, we can discuss the commercial terms and how the trips will be organised.",
      },
      {
        q: "Where is AXEL SAFE TRANSPORTING based?",
        a: "AXEL SAFE TRANSPORTING S.R.L. has its registered office in Reghin, Mureș County, Romania. The company was founded in 2018 and organises road freight on European routes.",
      },
      {
        q: "Which languages can I use with the AXEL SAFE TRANSPORTING team?",
        a: "You can talk to our team in Romanian, English and Spanish. This lets us handle requests from companies operating in different European markets.",
      },
    ],
    carriers: [
      {
        q: "Which transport companies can work with you?",
        a: "Transport companies that want loads and care about keeping their word, clear terms and fair cooperation.",
      },
      {
        q: "What should I write in the partnership request?",
        a: "A few details about your company, the regions you work in, what trucks and equipment you have, the routes you usually run and what kind of goods you carry.",
      },
      {
        q: "What happens after I send the request?",
        a: "We look over your details and contact you to talk about trips and terms. If we are a good fit, we call you when we have loads on your routes.",
      },
    ],
  },

  legal: {
    reviewNote:
      "This page is a draft prepared for legal review. It is not the final text and must be reviewed before publication.",
  },

  common: {
    skip: "Skip to content",
    language: "Language",
    call: "Call us",
    whatsapp: {
      label: "Message us on WhatsApp",
      message: "Hello, I would like a quote for road transport. Loading: … Unloading: … Goods: … Date: …",
    },
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
