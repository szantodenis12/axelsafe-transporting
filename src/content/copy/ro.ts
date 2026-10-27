/**
 * ROMANIAN COPY: translated from the approved English dictionary (en.ts).
 * Same keys, structure and array lengths as `en`; the Dictionary type enforces the shape.
 * Keys, `key`, `anchor`, `id` and `ctaTarget` values are NOT translated.
 * Business facts (phone, email, hours…) come from companyData.ts.
 * Blocks marked as placeholder in comments are prototype-only additions, not approved copy.
 */
import type { Dictionary } from "./en";

export const ro: Dictionary = {
  meta: {
    home: {
      title: "AXEL SAFE TRANSPORTING | Organizare transport rutier",
      description:
        "AXEL SAFE TRANSPORTING organizează transportul rutier de marfă prin transportatori independenți. Contactați-ne pentru cerințele de transport ale companiei.",
    },
    services: {
      title: "Servicii transport rutier marfă | AXEL SAFE TRANSPORTING",
      description:
        "Organizare transport rutier de marfă, planificarea transportului și coordonarea transportatorilor. Serviciile AXEL SAFE TRANSPORTING pentru companii.",
    },
    howWeWork: {
      title: "Cum organizăm transportul | AXEL SAFE TRANSPORTING",
      description:
        "Cum coordonează AXEL SAFE TRANSPORTING transportul rutier de marfă prin transportatori independenți, de la prima solicitare până la confirmarea transportului.",
    },
    about: {
      title: "Despre AXEL SAFE TRANSPORTING | Transport rutier marfă",
      description:
        "AXEL SAFE TRANSPORTING, companie românească înființată în 2018, organizează transportul rutier de marfă prin transportatori independenți.",
    },
    forCarriers: {
      title: "Parteneriate transportatori | AXEL SAFE TRANSPORTING",
      description:
        "Aveți o firmă de transport și doriți să colaborați cu AXEL SAFE TRANSPORTING? Prezentați-ne compania dumneavoastră și discutăm un posibil parteneriat.",
    },
    contact: {
      title: "Solicitați o ofertă de transport | AXEL SAFE TRANSPORTING",
      description:
        "Contactați AXEL SAFE TRANSPORTING pentru organizarea unui transport rutier de marfă sau pentru a discuta cerințele de transport ale companiei dumneavoastră.",
    },
  },

  nav: {
    items: [
      { key: "home", label: "Acasă" },
      { key: "services", label: "Servicii" },
      { key: "howWeWork", label: "Cum lucrăm" },
      { key: "about", label: "Despre noi" },
      { key: "forCarriers", label: "Pentru transportatori" },
    ],
    cta: "Solicitați o ofertă",
    menu: "Meniu",
    close: "Închide",
  },

  footer: {
    statement: "Organizăm transportul rutier de marfă prin transportatori independenți.",
    explore: "Navigare",
    exploreItems: [
      { key: "home", label: "Acasă" },
      { key: "services", label: "Servicii" },
      { key: "howWeWork", label: "Cum lucrăm" },
      { key: "about", label: "Despre noi" },
      { key: "forCarriers", label: "Pentru transportatori" },
      { key: "contact", label: "Contact" },
    ],
    contact: "Contact",
    legal: "Legal",
    legalItems: [
      { key: "privacy", label: "Politica de confidențialitate" },
      { key: "cookies", label: "Politica de cookie-uri" },
      { key: "terms", label: "Termeni de utilizare" },
    ],
    rights: "AXEL SAFE TRANSPORTING. Toate drepturile rezervate.",
    credit: "Site realizat de",
    social: "Urmăriți-ne",
    cta: "Solicitați o ofertă",
    nav: "Navigare în subsol",
    legalNav: "Informații legale",
    services: "Servicii",
    servicesItems: [
      { id: "road-freight-organisation", label: "Organizare transport rutier" },
      { id: "freight-planning", label: "Planificare și coordonare transport" },
      { id: "carrier-network", label: "Rețea de transportatori independenți" },
    ],
    labels: {
      office: "Birou",
      dispatch: "Transport și dispecerat",
      registeredOffice: "Sediu social",
      regNo: "Nr. Reg. Com.",
      vat: "CUI",
      activity: "Activitate",
      backToTop: "Înapoi sus",
    },
  },

  home: {
    hero: {
      eyebrow: "AXEL SAFE TRANSPORTING / ORGANIZARE TRANSPORT RUTIER",
      titleLines: ["Marfa se mișcă.", "Afacerile se leagă."],
      text: "Organizăm transportul rutier de marfă printr-o rețea de transportatori independenți și potrivim fiecare cerere de expediere cu opțiunile de transport adecvate.",
      primary: "Solicitați o ofertă",
      secondary: "Vedeți serviciile",
      micro: ["Transport rutier", "Organizare transport", "Logistică pentru companii"],
    },
    intro: {
      eyebrow: "01 / COMPANIA",
      title: "Orice transport începe cu legătura potrivită.",
      paragraphs: [
        "Pentru a transporta marfă nu e suficient un camion liber. Este nevoie de planificare, de comunicare și de oamenii potriviți, puși în legătură la momentul potrivit.",
        "La AXEL SAFE TRANSPORTING organizăm transportul rutier de marfă punând în legătură companiile cu transportatori independenți.",
      ],
      emphasis: "Un singur interlocutor. Un proces organizat în funcție de ce aveți de transportat.",
      cta: "Cum lucrăm",
    },
    approach: {
      eyebrow: "02 / CE FACEM",
      titleLines: ["Transportul potrivit.", "Coordonarea potrivită."],
      text: "Lucrăm între companiile care au marfă de transportat și transportatorii care o duc la destinație.",
      cards: [
        {
          title: "Planificarea transportului",
          text: "Înțelegem marfa, destinația, termenele și cerințele specifice înainte de a stabili pașii următori.",
        },
        {
          title: "Coordonarea transportatorilor",
          text: "Identificăm opțiunile de transport potrivite prin transportatori independenți și coordonăm detaliile pentru fiecare transport.",
        },
        {
          title: "Comunicare",
          text: "Ținem informațiile despre transport în ordine și rămânem un punct de contact clar pe tot parcursul coordonării.",
        },
        {
          title: "Variante flexibile",
          text: "Tratăm fiecare cerere de transport separat. Nu suntem legați de o flotă proprie, așa că nu limităm variantele la câteva vehicule.",
        },
      ],
      cta: "Vedeți serviciile",
    },
    services: {
      eyebrow: "03 / SERVICIILE NOASTRE",
      title: "Transport organizat în funcție de cerințele dumneavoastră.",
      text: "Nu există două transporturi cu exact aceleași cerințe. La fiecare solicitare ne uităm la marfă, la destinație, la opțiunile de transport disponibile și la ce trebuie pus la punct.",
      cards: [
        {
          title: "Organizare transport rutier",
          text: "Organizăm transportul rutier de marfă prin transportatori independenți și potrivim fiecare transport cu o variantă adecvată.",
          anchor: "road-freight-organisation",
        },
        {
          title: "Planificarea transportului",
          text: "Stabilim detaliile esențiale ale transportului, condițiile de încărcare și de livrare înainte ca transportul să înceapă.",
          anchor: "freight-planning",
        },
        {
          title: "Rețea de transportatori",
          text: "Lucrăm cu parteneri transportatori ca să identificăm capacitatea disponibilă și să răspundem unor cerințe de transport diferite.",
          anchor: "carrier-network",
        },
      ],
      cardCta: "Vedeți serviciul",
    },
    process: {
      eyebrow: "04 / PROCESUL",
      title: "De la solicitare la livrare.",
      text: "Același parcurs clar pentru fiecare cerere de transport.",
      steps: [
        { title: "Trimiteți detaliile", text: "Spuneți-ne ce trebuie transportat, unde trebuie să ajungă și când." },
        { title: "Analizăm opțiunile", text: "Evaluăm solicitarea și identificăm variantele de transport potrivite." },
        {
          title: "Confirmăm transportul",
          text: "După ce detaliile sunt agreate, coordonăm organizarea cu transportatorul ales.",
        },
        { title: "Rămânem în legătură", text: "Rămânem punctul dumneavoastră de contact pentru coordonarea transportului și pentru informările relevante." },
      ],
      cta: "Vedeți cum lucrăm",
    },
    carriers: {
      eyebrow: "05 / REȚEAUA NOASTRĂ",
      title: "Logistica bună se face cu parteneri buni.",
      paragraphs: [
        "O coordonare solidă a transportului depinde de relația dintre expeditori, organizatori și transportatori.",
        "Așteptăm solicitări din partea firmelor de transport interesate de o colaborare cu AXEL SAFE TRANSPORTING.",
      ],
      cta: "Deveniți partener transportator",
    },
    finalCta: {
      eyebrow: "SĂ VORBIM DESPRE LOGISTICĂ",
      titleLines: ["Aveți marfă de transportat?", "Să discutăm ruta."],
      text: "Trimiteți-ne cerințele de transport și luați legătura cu echipa noastră.",
      primary: "Solicitați o ofertă de transport",
      secondary: "Contactați-ne",
    },
    /** [PLACEHOLDER] etichete doar pentru prototip, pentru vizualul rețelei. Nu sunt text aprobat. */
    network: {
      caption: "Principalele drumuri europene · ilustrativ, nu rutele proprii AXEL SAFE.",
      origin: "Reghin, România",
      coverageLabel: "Acoperire",
      equipmentLabel: "Echipamente",
      baseLabel: "Coordonat din",
      baseValue: "Reghin, România · din 2018",
    },
  },

  services: {
    hero: {
      eyebrow: "AXEL SAFE / SERVICII",
      titleLines: ["Transport rutier de marfă.", "Organizat pentru compania dumneavoastră."],
      text: "Cerințele diferă de la un transport la altul. Rolul nostru este să ajutăm companiile să organizeze transportul rutier prin transportatori potriviți.",
      cta: "Solicitați o ofertă",
    },
    intro: {
      eyebrow: "01 / ORGANIZARE TRANSPORT",
      title: "Cum organizăm, concret, un transport de marfă.",
      paragraphs: [
        "Un singur transport sau cerințe recurente: în ambele cazuri pornim de la detalii.",
        "Analizăm transportul solicitat și căutăm variantele potrivite în rețeaua noastră de transportatori.",
        "Ce urmărim: comunicare clară, variante de transport potrivite și o execuție coordonată.",
      ],
    },
    core: [
      {
        id: "road-freight-organisation",
        label: "01 / Organizare transport rutier",
        title: "Organizarea transportului, redusă la esențial.",
        paragraphs: [
          "Coordonăm cerințele de transport rutier între clienți și transportatori independenți.",
          "Adunăm informațiile, părțile implicate și detaliile practice de care este nevoie pentru a organiza un transport, de la prima solicitare până la condițiile agreate.",
        ],
        listTitle: "Ce include:",
        list: [
          "Analizăm marfa și cerințele transportului.",
          "Identificăm variantele de transport potrivite.",
          "Coordonăm detaliile de încărcare și de livrare.",
          "Ținem legătura între părțile implicate.",
        ],
        cta: "Să discutăm transportul",
        ctaTarget: "contact",
      },
      {
        id: "freight-planning",
        label: "02 / Planificare și coordonare transport",
        title: "Detaliile se stabilesc înainte ca marfa să plece.",
        paragraphs: [
          "Orice cerere de transport presupune decizii despre termene, caracteristicile mărfii, condițiile de încărcare și așteptările la livrare.",
          "Clarificăm informațiile esențiale înainte de a confirma transportul, ca să rămână cât mai puține necunoscute.",
        ],
        listTitle: "Ce contează:",
        list: [
          "Tipul și cantitatea mărfii.",
          "Locurile de încărcare și de livrare.",
          "Datele solicitate pentru încărcare și livrare.",
          "Cerințele de încărcare și descărcare.",
          "Instrucțiuni specifice transportului.",
        ],
        cta: "Trimiteți detaliile transportului",
        ctaTarget: "contact",
      },
      {
        id: "carrier-network",
        label: "03 / Rețea de transportatori independenți",
        title: "Mai multe variante, prin parteneri transportatori.",
        paragraphs: [
          "Modelul nostru de lucru se bazează pe colaborarea cu firme de transport independente, nu pe o flotă proprie.",
          "Așa putem căuta variante de transport în funcție de cerințele fiecărei solicitări și de capacitatea disponibilă în rețea.",
        ],
        listTitle: "",
        list: [] as string[],
        cta: "Vedeți cum lucrăm",
        ctaTarget: "howWeWork",
      },
    ],
    requirements: {
      eyebrow: "02 / TRANSPORTUL DUMNEAVOASTRĂ",
      title: "Spuneți-ne ce trebuie transportat.",
      text: "Cu cât transportul este descris mai precis, cu atât evaluăm mai ușor ce presupune organizarea lui.",
      listTitle: "Informații de care putem avea nevoie:",
      list: "Descrierea mărfii, greutatea aproximativă, dimensiunile sau unitățile de încărcare, locurile de încărcare și de livrare, datele preferate și eventualele cerințe speciale de manipulare.",
      note: "Pentru transporturile care necesită echipamente sau condiții speciale, disponibilitatea trebuie confirmată înainte de a putea face o ofertă.",
      cta: "Solicitați o ofertă",
    },
    /** [PLACEHOLDER] titluri doar pentru prototip, pentru tipurile de transport / sectoarele din companyData. */
    extras: {
      typesEyebrow: "03 / TIPURI DE TRANSPORT",
      typesTitle: "Echipamente pe care le putem organiza prin parteneri.",
      industriesEyebrow: "04 / SECTOARE",
      industriesTitle: "Companii pentru care organizăm transport.",
    },
    finalCta: {
      title: "Aveți un transport de organizat?",
      text: "Trimiteți-ne detaliile esențiale. Analizăm solicitarea și discutăm pașii următori.",
      cta: "Contactați-ne",
    },
  },

  howWeWork: {
    hero: {
      eyebrow: "AXEL SAFE / PROCESUL NOSTRU",
      titleLines: ["Un transport bun", "se organizează pas cu pas."],
      text: "Într-un transport rutier sunt implicate mai multe părți și mai multe detalii. Rolul nostru este să le punem cap la cap într-o organizare clară.",
    },
    model: {
      eyebrow: "01 / ROLUL NOSTRU",
      titleLines: ["Noi organizăm transportul.", "Partenerii noștri transportatori duc marfa."],
      paragraphs: [
        "AXEL SAFE TRANSPORTING lucrează printr-o rețea de transportatori independenți.",
        "Nu ne bazăm pe o flotă proprie: ne ocupăm de organizarea transportului și de coordonarea părților implicate.",
        "De aici pornește felul în care lucrăm: înțelegem cerințele, identificăm variantele potrivite și păstrăm o comunicare clară.",
      ],
      diagram: ["Expeditor", "AXEL SAFE TRANSPORTING", "Transportator independent"],
      diagramNotes: ["Are marfă de transportat", "Coordonează transportul", "Efectuează transportul"],
    },
    stages: {
      eyebrow: "02 / PAS CU PAS",
      title: "Un proces clar, de la prima solicitare.",
      items: [
        {
          title: "Înțelegem transportul",
          paragraphs: [
            "Orice solicitare începe cu informațiile despre transport.",
            "Analizăm detaliile mărfii, locul de încărcare, destinația, termenele cerute și alte cerințe care pot influența organizarea transportului.",
          ],
        },
        {
          title: "Identificăm variantele de transport",
          paragraphs: [
            "Odată stabilite cerințele, căutăm variante de transport potrivite prin partenerii transportatori independenți.",
            "Disponibilitatea, echipamentele necesare și condițiile specifice ale transportului intră în analiza solicitării.",
          ],
        },
        {
          title: "Confirmăm detaliile",
          paragraphs: [
            "Detaliile propuse sunt verificate și agreate înainte de organizarea transportului.",
            "Informațiile relevante sunt transmise transportatorului, pentru ca încărcarea și livrarea să decurgă conform celor agreate.",
          ],
        },
        {
          title: "Coordonăm comunicarea",
          paragraphs: [
            "După ce transportul a fost organizat, rămânem punct de contact pentru coordonare și informări, conform condițiilor de servicii agreate.",
          ],
        },
      ],
    },
    why: {
      eyebrow: "03 / MODELUL NOSTRU",
      title: "Transport rutier organizat printr-o rețea de transportatori.",
      paragraphs: [
        "O flotă proprie înseamnă un număr fix de vehicule și o capacitate dată. O rețea de transportatori independenți este un alt mod de a organiza transportul.",
        "Modelul nostru ne permite să evaluăm fiecare solicitare în raport cu transportatorii disponibili, în loc să limităm organizarea la vehiculele deținute de companie.",
        "Pentru clienți, avantajul este un singur interlocutor cu care discută cerințele și organizarea transportului.",
      ],
    },
    transparency: {
      eyebrow: "04 / COLABORAREA",
      titleLines: ["Condiții clare.", "Comunicare clară."],
      paragraphs: [
        "Înainte de confirmarea unui transport, condițiile, modul de organizare și responsabilitățile trebuie să fie înțelese de toate părțile implicate.",
        "O relație de transport profesionistă ține de informații corecte și de comunicare clară.",
      ],
      cta: "Discutăm cerințele dumneavoastră de transport",
    },
  },

  about: {
    hero: {
      eyebrow: "AXEL SAFE / DESPRE COMPANIE",
      titleLines: ["Construită pe relații.", "Concentrată pe transport."],
      text: "AXEL SAFE TRANSPORTING este o companie din România care organizează transportul rutier de marfă prin parteneriate cu transportatori independenți.",
    },
    intro: {
      eyebrow: "01 / CINE SUNTEM",
      title: "Logistica înseamnă oameni, decizii și sincronizare.",
      paragraphs: [
        "Orice transport înseamnă companii cu termene de respectat, transportatori cu capacitate disponibilă și multe detalii care trebuie să se potrivească.",
        "AXEL SAFE TRANSPORTING lucrează între aceste elemente.",
        "Înființată în 2018, cu sediul în Reghin, județul Mureș, compania activează în transportul rutier de marfă și organizează transporturi prin transportatori independenți.",
        "Activitatea noastră este una practică: legăm cerințele de transport ale clienților de transportatorii care le pot acoperi.",
      ],
    },
    philosophy: {
      eyebrow: "02 / CE NE GHIDEAZĂ",
      title: "O coordonare bună începe cu înțelegerea detaliilor.",
      items: [
        { title: "Claritate", text: "Cerințele de transport se discută clar înainte de confirmarea transportului." },
        { title: "Comunicare", text: "Părțile implicate au nevoie de informații relevante și corecte pe tot parcursul procesului." },
        {
          title: "Adaptabilitate",
          text: "Transporturi diferite cer organizare diferită. Tratăm fiecare solicitare după cerințele ei.",
        },
        {
          title: "Relații profesionale",
          text: "O colaborare pe termen lung depinde de comunicare constantă și de așteptări clar stabilite.",
        },
      ],
    },
    details: {
      eyebrow: "03 / DATELE COMPANIEI",
      labels: {
        legalName: "Denumire legală",
        established: "Anul înființării",
        office: "Sediul social",
        registration: "Nr. Registrul Comerțului",
        vat: "Cod fiscal / TVA",
        activity: "Obiect principal de activitate",
        website: "Site web",
      },
    },
    finalCta: {
      title: "Căutați un partener pentru organizarea transportului?",
      text: "Spuneți-ne despre compania dumneavoastră și despre transporturile pe care trebuie să le gestionați.",
      cta: "Contactați AXEL SAFE",
    },
  },

  forCarriers: {
    hero: {
      eyebrow: "AXEL SAFE / PARTENERIATE CU TRANSPORTATORI",
      titleLines: ["Flota dumneavoastră.", "Legături noi."],
      paragraphs: [
        "Lucrăm cu transportatori independenți pentru a organiza transporturi rutiere de marfă pentru clienți companii.",
        "Dacă aveți o firmă de transport și doriți să discutăm o posibilă colaborare, scrieți-ne.",
      ],
      cta: "Deveniți partener",
    },
    intro: {
      eyebrow: "01 / COLABORAREA",
      title: "Un transport profesionist începe cu parteneri profesioniști.",
      paragraphs: [
        "Modelul nostru de lucru se bazează pe colaborarea cu transportatori independenți.",
        "Legăm cerințele de transport ale clienților de capacitatea disponibilă și coordonăm detaliile.",
        "Căutăm relații cu operatori de transport care pun preț pe comunicare clară, condiții agreate și colaborare profesionistă.",
      ],
    },
    process: {
      eyebrow: "02 / CUM INTRĂM ÎN LEGĂTURĂ",
      title: "Să discutăm cum putem lucra împreună.",
      steps: [
        { title: "Prezentați-vă compania", text: "Spuneți-ne despre firma de transport, zonele în care operați și tipurile de vehicule." },
        {
          title: "Spuneți-ne ce puteți acoperi",
          text: "Trimiteți informații despre echipamentele disponibile, rutele preferate și tipurile de marfă pe care le transportați.",
        },
        {
          title: "Discutăm colaborarea",
          text: "Echipa noastră analizează datele și discută posibile curse și condițiile de colaborare.",
        },
        {
          title: "Rămânem în contact",
          text: "Dacă există o bază potrivită de colaborare, rămânem în legătură pentru solicitările de transport relevante.",
        },
      ],
    },
    /** [PLACEHOLDER] titluri doar pentru prototip, pentru cerințele / condițiile de colaborare din companyData. */
    extras: {
      requirementsEyebrow: "03 / CE VĂ CEREM",
      requirementsTitle: "Înainte să lucrăm împreună.",
      conditionsEyebrow: "04 / CUM COLABORĂM",
      conditionsTitle: "Condiții clare la fiecare transport.",
    },
    enquiry: {
      title: "Doriți să colaborați cu AXEL SAFE?",
      text: "Prezentați-ne compania și spuneți-ne ce capacitate de transport aveți.",
      cta: "Trimiteți o solicitare de parteneriat",
    },
  },

  contact: {
    hero: {
      eyebrow: "AXEL SAFE / CONTACT",
      title: "Să vorbim concret.",
      text: "Marfă de transportat, o întrebare despre servicii sau o colaborare ca transportator: ne puteți scrie aici pentru oricare dintre ele.",
    },
    quote: {
      title: "Spuneți-ne despre transportul dumneavoastră.",
      text: "Completați formularul cu detaliile esențiale ale transportului, ca să putem analiza solicitarea.",
    },
    direct: {
      eyebrow: "PREFERAȚI SĂ NE CONTACTAȚI DIRECT?",
      title: "Să vorbim.",
      labels: { email: "E-mail", phone: "Telefon", location: "Locație", hours: "Program" },
      location: "Reghin, județul Mureș, România",
    },
    carriers: {
      title: "Doriți să colaborați ca transportator?",
      text: "Folosiți formularul pentru parteneriate cu transportatori.",
      cta: "Deveniți partener transportator",
    },
  },

  forms: {
    quote: {
      fields: {
        companyName: "Denumirea companiei",
        contactPerson: "Persoană de contact",
        email: "E-mail (companie)",
        phone: "Telefon",
        pickupLocation: "Locul de încărcare",
        deliveryLocation: "Locul de livrare",
        cargoDescription: "Descrierea mărfii",
        weight: "Greutate aproximativă / unități de încărcare",
        pickupDate: "Data dorită pentru încărcare",
        deliveryDate: "Data dorită pentru livrare",
        additional: "Alte cerințe",
      },
      submit: "Trimiteți solicitarea de transport",
    },
    /** Etichetele formularului pentru transportatori, derivate din textul aprobat despre procesul de parteneriat. */
    carrier: {
      fields: {
        companyName: "Denumirea companiei",
        contactPerson: "Persoană de contact",
        email: "E-mail (companie)",
        phone: "Telefon",
        country: "Țara de înregistrare",
        fleetSize: "Număr de vehicule",
        vehicleTypes: "Tipuri de vehicule",
        regions: "Zone de operare / rute preferate",
        message: "Informații suplimentare",
      },
      submit: "Trimiteți solicitarea de parteneriat",
    },
    consent:
      "Sunt de acord ca AXEL SAFE TRANSPORTING să prelucreze informațiile transmise prin acest formular pentru a răspunde solicitării mele, conform Politicii de confidențialitate.",
    success: {
      title: "Solicitarea dumneavoastră a fost primită.",
      text: "Vă mulțumim că ați contactat AXEL SAFE TRANSPORTING. Echipa noastră analizează informațiile transmise și vă va răspunde folosind datele de contact indicate.",
    },
    required: "Obligatoriu",
    optional: "Opțional",
    sending: "Se trimite…",
    errors: {
      required: "Completați acest câmp.",
      email: "Introduceți o adresă de e-mail validă.",
      consent: "Confirmați că putem prelucra solicitarea dumneavoastră.",
      generic: "A apărut o eroare și solicitarea nu a fost trimisă. Încercați din nou sau contactați-ne direct.",
      notConfigured:
        "Formularul nu este încă activ, așa că mesajul nu a fost trimis. Vă rugăm să ne contactați direct, prin e-mail sau telefon.",
      rateLimited: "Prea multe încercări într-un timp scurt. Așteptați un minut și încercați din nou.",
    },
  },

  /** [PLACEHOLDER] text doar pentru prototip, pentru explorerul de echipamente + exemplul de solicitare. Necesită aprobarea clientului. */
  showcase: {
    equipment: {
      title: "Echipamentele, pe scurt.",
      text: "Valori orientative pentru tipurile de remorci pe care le organizăm prin partenerii noștri transportatori.",
      note: "Valori orientative pentru semiremorcile europene standard. Dimensiunile și capacitatea exacte se confirmă cu transportatorul la fiecare transport.",
      labels: {
        length: "Lungime de încărcare",
        pallets: "Paleți EUR",
        payload: "Sarcină utilă",
        height: "Înălțime interioară",
        volume: "Volum",
        temperature: "Interval de temperatură",
      },
      units: { m: "m", t: "t", m3: "m³" },
      topView: "Vedere de sus · platformă de 13,6 m",
    },
    enquiry: {
      label: "Exemplu de solicitare",
      route: { from: "Reghin, RO", to: "München, DE", distance: "≈ 1.050 km" },
      fields: { cargo: "Marfă", trailer: "Remorcă", dates: "Date" },
      cargo: "24 paleți EUR · mobilier",
      trailer: "Prelată",
      dates: "03.11 → 05.11",
      steps: ["Solicitare primită", "Opțiuni analizate", "Transport confirmat", "În coordonare"],
    },
    watermark: "Precizie",
  },

  /**
   * FAQ: [PLACEHOLDER] DRAFT scris de EDH doar din fapte verificate; necesită aprobarea clientului înainte de lansare.
   * Alimentează secțiunile FAQ vizibile ȘI JSON-LD FAQPage (aceeași sursă).
   */
  faq: {
    title: "Întrebări pe care le primim des.",
    shippers: [
      {
        q: "AXEL SAFE TRANSPORTING deține camioane proprii?",
        a: "Nu. Organizăm transportul rutier de marfă printr-o rețea de parteneri transportatori independenți. Transportul propriu-zis este efectuat de aceste firme de transport, iar noi ne ocupăm de coordonarea fiecărui transport.",
      },
      {
        q: "Pentru ce țări organizați transport rutier?",
        a: "Organizăm transport rutier în toată Europa. Trimiteți-ne locul de încărcare și cel de livrare, iar noi analizăm opțiunile de transport disponibile pentru ruta respectivă.",
      },
      {
        q: "Ce tipuri de remorci puteți organiza?",
        a: "Prin partenerii noștri transportatori organizăm transport cu prelată (tautliner), frigorific și mega. Pentru transporturile care necesită alte echipamente sau condiții speciale, disponibilitatea se confirmă la fiecare solicitare.",
      },
      {
        q: "Ce informații vă trebuie pentru a pregăti o ofertă?",
        a: "Descrierea mărfii, greutatea aproximativă, dimensiunile sau unitățile de încărcare, locurile de încărcare și de livrare, datele preferate și eventualele cerințe speciale de manipulare. Cu cât detaliile sunt mai precise, cu atât evaluăm mai ușor organizarea transportului.",
      },
      {
        q: "Cum decurge procesul?",
        a: "Ne trimiteți detaliile transportului, analizăm solicitarea și identificăm variantele de transport potrivite, condițiile se agreează înainte de confirmarea transportului, iar apoi le coordonăm cu transportatorul ales.",
      },
      {
        q: "Cine este persoana mea de contact după organizarea transportului?",
        a: "AXEL SAFE TRANSPORTING rămâne punctul dumneavoastră de contact pentru coordonare și informări relevante, conform condițiilor de servicii agreate.",
      },
      {
        q: "Unde are sediul compania?",
        a: "AXEL SAFE TRANSPORTING S.R.L. a fost înființată în 2018 și are sediul în Reghin, județul Mureș, România.",
      },
    ],
    carriers: [
      {
        q: "Ce firme de transport pot deveni partenere?",
        a: "Așteptăm solicitări din partea operatorilor de transport interesați de colaborare, care pun preț pe comunicare clară, condiții agreate și o colaborare profesionistă.",
      },
      {
        q: "Ce ar trebui să includ într-o solicitare de parteneriat?",
        a: "Informații despre companie, zonele de operare, tipurile de vehicule, echipamentele disponibile, rutele preferate și tipurile de marfă pe care le transportați.",
      },
      {
        q: "Ce se întâmplă după ce trimit solicitarea?",
        a: "Echipa noastră analizează datele și poate discuta posibile curse și condițiile de colaborare. Dacă există o bază potrivită de colaborare, rămânem în legătură pentru solicitările de transport relevante.",
      },
    ],
  },

  legal: {
    reviewNote:
      "Această pagină este un draft structural, pregătit pentru revizuire juridică de specialitate. Nu este un text juridic final și trebuie revizuit înainte de publicare.",
  },

  common: {
    skip: "Salt la conținut",
    language: "Limbă",
  },
};
