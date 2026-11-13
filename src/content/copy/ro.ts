/**
 * ROMANIAN COPY: adapted from the approved English dictionary (en.ts), rewritten for natural Romanian (12.11.2026).
 * Same keys, structure and array lengths as `en`; the Dictionary type enforces the shape.
 * Keys, `key`, `anchor`, `id` and `ctaTarget` values are NOT translated.
 * Business facts (phone, email, hours…) come from companyData.ts.
 * Blocks marked as placeholder in comments are prototype-only additions, not approved copy.
 */
import type { Dictionary } from "./en";

export const ro: Dictionary = {
  meta: {
    home: {
      title: "AXEL SAFE TRANSPORTING | Organizare transport rutier de marfă",
      description:
        "Organizăm transport rutier de marfă în Europa și Marea Britanie, prin transportatori independenți. Dispecerat 24/7. Solicită o ofertă.",
    },
    services: {
      title: "Servicii transport rutier de marfă | AXEL SAFE TRANSPORTING",
      description:
        "Organizarea transportului, planificarea cursei și coordonarea transportatorilor. Ce face AXEL SAFE TRANSPORTING pentru companii.",
    },
    howWeWork: {
      title: "Cum organizăm transportul | AXEL SAFE TRANSPORTING",
      description:
        "Cum lucrează AXEL SAFE TRANSPORTING, de la cererea ta până la confirmarea cursei cu un transportator independent.",
    },
    about: {
      title: "Despre AXEL SAFE TRANSPORTING | Transport rutier de marfă",
      description:
        "AXEL SAFE TRANSPORTING este o firmă românească înființată în 2018, care organizează transport rutier de marfă prin transportatori independenți.",
    },
    forCarriers: {
      title: "Colaborare pentru transportatori | AXEL SAFE TRANSPORTING",
      description:
        "Ai o firmă de transport și cauți curse? Prezintă-ne firma și vedem împreună dacă putem lucra.",
    },
    contact: {
      title: "Solicită o ofertă de transport | AXEL SAFE TRANSPORTING",
      description:
        "Scrie-ne ruta, marfa și data. AXEL SAFE TRANSPORTING îți trimite o ofertă pentru transportul rutier de marfă.",
    },
    vetting: {
      title: "Cum verificăm transportatorii | AXEL SAFE TRANSPORTING",
      description:
        "Înainte ca un transportator să îți încarce marfa, îi verificăm licența comunitară, asigurarea CMR, documentele camionului și situația firmei.",
    },
    guides: {
      title: "Ghiduri despre transportul rutier | AXEL SAFE TRANSPORTING",
      description:
        "Ghiduri pentru expeditori: scrisoarea de transport CMR, cum se calculează prețul unei curse și ce diferență e între casa de expediții, transportator și bursa de transport.",
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
    cta: "Solicită o ofertă",
    menu: "Meniu",
    close: "Închide",
  },

  footer: {
    statement: "Organizăm transport rutier de marfă prin transportatori independenți.",
    explore: "Pagini",
    exploreItems: [
      { key: "home", label: "Acasă" },
      { key: "services", label: "Servicii" },
      { key: "howWeWork", label: "Cum lucrăm" },
      { key: "about", label: "Despre noi" },
      { key: "forCarriers", label: "Pentru transportatori" },
      { key: "contact", label: "Contact" },
      { key: "vetting", label: "Cum verificăm transportatorii" },
      { key: "guides", label: "Ghiduri" },
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
    social: "Ne găsești și pe",
    cta: "Solicită o ofertă",
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
      titleLines: ["Transport rutier european,", "adaptat afacerii tale."],
      text: "Organizăm transporturi rutiere de marfă în Europa și Marea Britanie, printr-o rețea de transportatori verificați. De la identificarea camionului potrivit până la confirmarea livrării, ne ocupăm de organizarea și coordonarea fiecărei curse.",
      primary: "Solicită o ofertă",
      secondary: "Vezi serviciile noastre",
      micro: ["Din 2018 în transporturi", "Aproximativ 100 de curse lunar", "Dispecerat disponibil 24/7"],
    },
    intro: {
      eyebrow: "02 / ORGANIZARE ȘI COORDONARE TRANSPORT",
      title: "Un partener de încredere pentru transporturile companiei tale.",
      paragraphs: [
        "Știm cât de important este ca un transport să fie bine organizat. Camionul trebuie să fie potrivit pentru marfă, încărcarea să respecte programul stabilit, iar informațiile să ajungă la timp la toți cei implicați.",
        "La AXEL SAFE TRANSPORTING, ne ocupăm de aceste detalii. Colaborăm cu transportatori independenți, verificăm opțiunile disponibile și organizăm cursele în funcție de nevoile fiecărui client.",
      ],
      emphasis: "Fie că ai de trimis o singură încărcătură sau ai transporturi regulate, ai la dispoziție o echipă care cunoaște fiecare etapă a procesului și ține legătura cu transportatorul pe parcursul cursei.",
      cta: "Află mai multe despre noi",
    },
    approach: {
      eyebrow: "03 / DE CE SĂ LUCREZI CU NOI",
      titleLines: ["Transporturi bine organizate,", "cu mai puține griji pentru tine."],
      text: "",
      cards: [
        {
          title: "Peste 30 de transportatori în rețeaua noastră",
          text: "Lucrăm cu transportatori independenți ale căror documente, licențe și asigurări sunt verificate. Alegem partenerii în funcție de tipul mărfii, traseu și condițiile de transport.",
        },
        {
          title: "Găsim camionul potrivit pentru marfa ta",
          text: "Fiecare încărcătură are particularitățile ei. Ținem cont de greutate, volum, destinație și tipul de semiremorcă necesar înainte de a propune o variantă de transport.",
        },
        {
          title: "Un singur punct de contact",
          text: "Nu trebuie să ții legătura separat cu fiecare parte implicată. Centralizăm comunicarea cu transportatorul și îți transmitem informațiile de care ai nevoie pe parcursul cursei.",
        },
        {
          title: "Dispecerat 24/7",
          text: "Suntem disponibili pentru comunicare și coordonare inclusiv în afara programului obișnuit de lucru.",
        },
        {
          title: "Mai multe opțiuni de transport",
          text: "Nu depindem de disponibilitatea unei singure flote. Rețeaua noastră de colaboratori ne permite să căutăm variante în funcție de ruta și perioada în care ai nevoie de transport.",
        },
        {
          title: "Răspundem rapid solicitărilor",
          text: "Când avem toate detaliile necesare, îți răspundem, de regulă, în mai puțin de o oră.",
        },
      ],
      cta: "Vezi serviciile noastre",
    },
    services: {
      eyebrow: "04 / SERVICIILE NOASTRE",
      title: "Organizăm transporturile de care afacerea ta are nevoie.",
      text: "De la o singură cursă până la transporturi recurente, ne ocupăm de identificarea transportatorului, stabilirea detaliilor și coordonarea livrării.",
      cards: [
        {
          title: "Transport rutier european",
          text: "Organizăm transporturi de marfă pe rute din Europa și Marea Britanie, în funcție de destinație, caracteristicile încărcăturii și termenul de livrare. Colaborăm cu transportatori care dispun de diferite tipuri de semiremorci, astfel încât să putem identifica o variantă potrivită pentru fiecare transport.",
          anchor: "road-freight-organisation",
        },
        {
          title: "Planificare și coordonare logistică",
          text: "Ne ocupăm de organizarea cursei, de la stabilirea condițiilor de încărcare și descărcare până la comunicarea cu transportatorul. Urmărim desfășurarea transportului și menținem legătura cu părțile implicate, astfel încât eventualele modificări să fie comunicate din timp.",
          anchor: "freight-planning",
        },
        {
          title: "Rețea de transportatori independenți",
          text: "Lucrăm cu firme de transport verificate, cu experiență pe diferite rute europene. În funcție de solicitare, verificăm disponibilitatea camioanelor și selectăm transportatorul care poate îndeplini condițiile cursei.",
          anchor: "carrier-network",
        },
      ],
      cardCta: "Detalii",
    },
    process: {
      eyebrow: "07 / CUM LUCRĂM",
      title: "De la solicitare la livrare, în patru pași.",
      text: "",
      steps: [
        { title: "Ne spui ce ai de transportat", text: "Avem nevoie de locul de încărcare, destinație, tipul mărfii, greutate, volum și perioada în care trebuie efectuat transportul." },
        { title: "Căutăm o variantă potrivită", text: "Verificăm disponibilitatea transportatorilor din rețeaua noastră și alegem opțiunile care corespund cerințelor tale." },
        { title: "Stabilim toate detaliile", text: "Îți comunicăm tariful și condițiile de transport. După confirmare, stabilim programul de încărcare și descărcare împreună cu transportatorul." },
        { title: "Ținem legătura până la livrare", text: "Coordonăm comunicarea pe parcursul cursei și îți transmitem actualizările necesare până la confirmarea livrării." },
      ],
      cta: "Solicită un transport",
    },
    carriers: {
      eyebrow: "08 / COLABOREAZĂ CU NOI",
      title: "Ai o firmă de transport? Hai să discutăm.",
      paragraphs: [
        "Suntem interesați să colaborăm cu transportatori serioși, care pun preț pe respectarea angajamentelor și pe o comunicare clară.",
        "Dacă ai camioane disponibile și operezi pe rute europene, trimite-ne câteva informații despre compania ta, tipurile de semiremorci și rutele pe care lucrezi.",
        "Vom analiza posibilitățile unei colaborări.",
      ],
      cta: "Devino partener AXEL SAFE",
    },
    finalCta: {
      eyebrow: "DISPECERAT DISPONIBIL 24/7",
      titleLines: ["Ai marfă de transportat?", "Trimite-ne detaliile."],
      text: "Spune-ne de unde trebuie încărcată marfa, unde trebuie să ajungă și când ai nevoie de transport. Verificăm variantele disponibile și revenim cu o ofertă în funcție de cerințele tale.",
      primary: "Solicită o ofertă de transport",
      secondary: "Contactează-ne",
    },
    /** [PLACEHOLDER] etichete doar pentru prototip, pentru vizualul rețelei. Nu sunt text aprobat. */
    network: {
      caption: "Principalele drumuri europene. Hartă ilustrativă, nu rutele AXEL SAFE.",
      origin: "Reghin, România",
      coverageLabel: "Acoperire",
      equipmentLabel: "Echipamente",
      baseLabel: "Sediul social",
      baseValue: "Reghin, România · din 2018",
    },
  },

  services: {
    hero: {
      eyebrow: "SERVICII DE TRANSPORT ȘI LOGISTICĂ",
      titleLines: ["Transport rutier european,", "adaptat nevoilor afacerii tale."],
      text: "Organizăm transporturi rutiere de marfă în Europa, printr-o rețea de transportatori verificați. Gestionăm atât curse individuale, cât și transporturi recurente, în funcție de marfă, rută și termenele de livrare.",
      cta: "Solicită o ofertă",
    },
    intro: {
      eyebrow: "01 / ABORDAREA NOASTRĂ",
      title: "Organizăm transportul în funcție de cerințele fiecărei curse.",
      paragraphs: [
        "Fiecare transport presupune condiții diferite. Tipul mărfii, ruta, termenul de livrare și echipamentul necesar influențează modul în care este organizată cursa.",
        "La AXEL SAFE TRANSPORTING, analizăm aceste informații, verificăm disponibilitatea transportatorilor și stabilim condițiile de transport împreună cu clientul.",
        "Ne ocupăm de organizarea cursei și de comunicarea cu transportatorul până la livrare.",
      ],
    },
    core: [
      {
        id: "road-freight-organisation",
        label: "Serviciul 01 / Organizare transport rutier",
        title: "Transport de marfă între destinații europene.",
        paragraphs: [
          "Organizăm transporturi rutiere pentru companii care au nevoie să expedieze marfă în Europa.",
          "Colaborăm cu transportatori independenți și selectăm variantele disponibile în funcție de încărcătură, traseu și perioada solicitată.",
          "Gestionăm atât solicitările punctuale, cât și transporturile regulate.",
        ],
        listTitle: "Ce include serviciul:",
        list: [
          "Analiza cerințelor de transport.",
          "Identificarea transportatorilor disponibili.",
          "Alegerea tipului de semiremorcă.",
          "Stabilirea condițiilor de încărcare și descărcare.",
          "Confirmarea tarifelor și a detaliilor cursei.",
          "Coordonarea transportului până la livrare.",
        ],
        cta: "Solicită o ofertă de transport",
        ctaTarget: "contact",
      },
      {
        id: "freight-planning",
        label: "Serviciul 02 / Planificare și coordonare",
        title: "Planificăm fiecare cursă înainte de încărcare.",
        paragraphs: [
          "Pentru organizarea unui transport avem nevoie de informații clare despre marfă, destinație și condițiile de livrare.",
          "Centralizăm aceste detalii și le transmitem transportatorului înainte de confirmarea cursei. Pe parcursul transportului, menținem comunicarea cu părțile implicate și transmitem actualizările relevante.",
        ],
        listTitle: "Ce gestionăm:",
        list: [
          "Tipul, cantitatea și dimensiunile mărfii.",
          "Adresele de încărcare și descărcare.",
          "Datele și intervalele orare stabilite.",
          "Tipul de echipament necesar.",
          "Instrucțiunile speciale de transport.",
          "Comunicarea dintre client și transportator.",
        ],
        cta: "Discută cu echipa noastră",
        ctaTarget: "contact",
      },
      {
        id: "carrier-network",
        label: "Serviciul 03 / Rețea de transportatori",
        title: "O rețea de peste 30 de transportatori parteneri.",
        paragraphs: [
          "Colaborăm cu peste 30 de transportatori independenți pentru organizarea curselor în Europa.",
          "În funcție de solicitare, verificăm disponibilitatea partenerilor și identificăm variantele potrivite pentru ruta și tipul de marfă.",
          "Înainte de colaborare, verificăm documentele necesare efectuării transportului, inclusiv licența de transport, asigurarea CMR și documentele vehiculului.",
          "Prin această rețea putem organiza transporturi cu diferite tipuri de semiremorci, în funcție de capacitatea disponibilă.",
        ],
        listTitle: "",
        list: [] as string[],
        cta: "Află mai multe despre rețeaua noastră",
        ctaTarget: "vetting",
      },
    ],
    requirements: {
      eyebrow: "04 / CE NE TRIMIȚI",
      title: "Spune-ne ce trebuie transportat.",
      text: "Cu cât ne dai mai multe detalii, cu atât îți trimitem mai repede o ofertă corectă.",
      listTitle: "Ce ne ajută să știm:",
      list: "Ce marfă este, cât cântărește aproximativ, dimensiunile sau numărul de paleți, de unde se încarcă și unde se livrează, ce date preferi și dacă marfa are nevoie de o manipulare specială.",
      note: "Dacă marfa cere un echipament sau condiții speciale, verificăm întâi disponibilitatea și abia apoi îți trimitem oferta.",
      cta: "Solicită o ofertă",
    },
    /** [PLACEHOLDER] titluri doar pentru prototip, pentru tipurile de transport / sectoarele din companyData. */
    extras: {
      typesEyebrow: "05 / TIPURI DE ECHIPAMENTE",
      typesTitle: "Semiremorci pentru diferite tipuri de marfă.",
      industriesEyebrow: "06 / DOMENII",
      industriesTitle: "Firme pentru care organizăm transport.",
    },
    finalCta: {
      title: "Ai nevoie de un transport rutier în Europa?",
      text: "Trimite-ne detaliile despre marfă, ruta și data de încărcare. Verificăm disponibilitatea transportatorilor și revenim cu o ofertă pentru cursa solicitată.",
      cta: "Solicită o ofertă de transport",
    },
  },

  howWeWork: {
    hero: {
      eyebrow: "PROCESUL NOSTRU",
      titleLines: ["De la solicitarea de transport", "până la confirmarea livrării."],
      text: "Ne ocupăm de organizarea fiecărei curse, de la alegerea transportatorului potrivit până la coordonarea livrării. Tu ai un singur punct de contact și știi cu cine să discuți pe tot parcursul transportului.",
    },
    model: {
      eyebrow: "01 / CUM FUNCȚIONĂM",
      titleLines: ["Noi organizăm transportul.", "Partenerii noștri îl efectuează."],
      paragraphs: [
        "La AXEL SAFE TRANSPORTING, colaborăm cu firme de transport independente, selectate în funcție de ruta, tipul mărfii și condițiile fiecărei curse.",
        "Nu avem o flotă proprie, ceea ce ne permite să căutăm camioane disponibile în rețeaua noastră de transportatori, fără să depindem de un număr fix de vehicule.",
        "Noi ne ocupăm de organizare, stabilirea detaliilor și comunicarea cu transportatorul, astfel încât tu să ai un singur partener cu care să discuți.",
        "Clientul ne transmite detaliile mărfii și condițiile de livrare.",
        "AXEL SAFE TRANSPORTING verifică opțiunile disponibile, organizează cursa și coordonează comunicarea.",
        "Transportatorul partener preia marfa și efectuează transportul conform condițiilor stabilite.",
      ],
      diagram: ["Clientul", "AXEL SAFE TRANSPORTING", "Transportatorul partener"],
      diagramNotes: ["Are marfă de transportat", "Coordonează transportul", "Efectuează transportul"],
      vettingLink: "Cum verificăm transportatorii",
    },
    stages: {
      eyebrow: "02 / ETAPELE COLABORĂRII",
      title: "Cum organizăm transportul, pas cu pas.",
      items: [
        {
          title: "Ne spui ce ai de transportat",
          paragraphs: [
            "Totul începe cu câteva informații: ce marfă trebuie transportată, de unde se încarcă, unde trebuie să ajungă și când ai nevoie de transport.",
            "Verificăm greutatea, volumul și eventualele condiții speciale, astfel încât să știm exact ce tip de camion este necesar.",
          ],
        },
        {
          title: "Căutăm transportatorul potrivit",
          paragraphs: [
            "Verificăm disponibilitatea camioanelor din rețeaua noastră și identificăm transportatorii care pot efectua cursa în condițiile solicitate.",
            "Ținem cont de rută, perioada de încărcare, tipul semiremorcii și particularitățile mărfii.",
          ],
        },
        {
          title: "Îți trimitem oferta și stabilim detaliile",
          paragraphs: [
            "După ce identificăm o variantă de transport, îți comunicăm tariful și condițiile cursei.",
            "Odată acceptată oferta, confirmăm în scris detaliile și stabilim programul de încărcare și descărcare împreună cu transportatorul.",
          ],
        },
        {
          title: "Ținem legătura până la livrare",
          paragraphs: [
            "Pe parcursul transportului, comunicăm cu transportatorul și îți transmitem actualizările necesare.",
            "Dacă apar modificări ale programului sau alte situații care necesită coordonare, intervenim pentru a clarifica detaliile cu părțile implicate.",
            "Dispeceratul nostru este disponibil 24/7, iar procesul se încheie odată cu confirmarea livrării.",
          ],
        },
      ],
    },
    why: {
      eyebrow: "03 / FLEXIBILITATE",
      title: "Mai multe opțiuni de transport, fără să depindem de o singură flotă.",
      paragraphs: [
        "Fiecare companie are nevoi diferite de transport. Unele curse sunt planificate din timp, altele apar în funcție de comenzi, producție sau termenele de livrare.",
        "De aceea, lucrăm cu o rețea de transportatori independenți, care ne permite să verificăm disponibilitatea mai multor camioane și tipuri de semiremorci.",
        "Pentru tine, lucrurile rămân simple: ne transmiți solicitarea, iar noi căutăm o variantă potrivită și ne ocupăm de organizarea transportului.",
      ],
    },
    transparency: {
      eyebrow: "04 / COMUNICARE ȘI RESPONSABILITATE",
      titleLines: ["Știi ce s-a stabilit", "și cu cine să discuți."],
      paragraphs: [
        "Un transport bine organizat începe cu informații corecte și condiții stabilite înainte de încărcare.",
        "Verificăm documentele transportatorilor cu care colaborăm, confirmăm în scris detaliile cursei și păstrăm legătura cu cei implicați pe parcursul transportului.",
        "Dacă apar schimbări, comunicăm cu transportatorul și te informăm despre situație.",
        "Ne dorim colaborări în care fiecare parte știe ce are de făcut, iar informațiile importante sunt transmise la timp.",
      ],
      cta: "Solicită o ofertă de transport",
    },
  },

  about: {
    hero: {
      eyebrow: "DESPRE AXEL SAFE TRANSPORTING",
      titleLines: ["Organizăm transporturi rutiere", "de marfă în Europa din 2018."],
      text: "Suntem o companie românească din Reghin, specializată în organizarea și coordonarea transporturilor rutiere de marfă. Colaborăm cu transportatori independenți pentru a răspunde solicitărilor companiilor care au nevoie de transport în Europa.",
    },
    intro: {
      eyebrow: "01 / CINE SUNTEM",
      title: "Experiență în transportul rutier european.",
      paragraphs: [
        "AXEL SAFE TRANSPORTING și-a început activitatea în 2018, în Reghin, județul Mureș.",
        "Organizăm transporturi de marfă pentru companii din diferite domenii de activitate. Lucrăm cu o rețea de transportatori independenți și gestionăm fiecare cursă de la primirea solicitării până la confirmarea livrării.",
        "Verificăm disponibilitatea transportatorilor, stabilim condițiile cursei și coordonăm comunicarea dintre client și transportator.",
        "În prezent, gestionăm aproximativ 100 de curse lunar, pe rute din Europa și Marea Britanie. Una dintre principalele rute pe care activăm este România–Spania.",
      ],
    },
    philosophy: {
      eyebrow: "03 / PRINCIPIILE NOASTRE",
      title: "Principiile după care lucrăm.",
      items: [
        { title: "Profesionalism", text: "Tratăm fiecare solicitare cu atenție la detaliile transportului și la condițiile stabilite cu clientul." },
        { title: "Transparență", text: "Comunicăm tarifele, condițiile și detaliile cursei înainte de confirmarea transportului." },
        { title: "Flexibilitate", text: "Căutăm variante de transport în funcție de rută, tipul mărfii și disponibilitatea transportatorilor." },
        { title: "Responsabilitate", text: "Verificăm documentele transportatorilor parteneri și urmărim desfășurarea curselor până la confirmarea livrării." },
      ],
    },
    details: {
      eyebrow: "04 / DATELE COMPANIEI",
      labels: {
        legalName: "Denumire",
        established: "Anul înființării",
        office: "Sediu social",
        registration: "Nr. Registrul Comerțului",
        vat: "CUI",
        activity: "CAEN",
        website: "Site",
      },
    },
    finalCta: {
      title: "Ai nevoie de un partener pentru transporturile companiei tale?",
      text: "Spune-ne pe ce rute ai nevoie de transport și ce tip de marfă expediezi. Discutăm cerințele și posibilitățile unei colaborări.",
      cta: "Contactează-ne",
    },
  },

  forCarriers: {
    hero: {
      eyebrow: "PARTENERIATE CU TRANSPORTATORI",
      titleLines: ["Noi oportunități de transport", "pentru compania ta."],
      paragraphs: [
        "Colaborăm cu transportatori independenți din Europa, oferind acces la solicitări de transport, condiții comerciale stabilite în scris și coordonare operațională pe parcursul curselor.",
      ],
      cta: "Devino transportator partener",
    },
    intro: {
      eyebrow: "01 / COLABORARE",
      title: "Construim parteneriate cu firme de transport profesioniste.",
      paragraphs: [
        "AXEL SAFE TRANSPORTING colaborează cu operatori care dispun de capacitate de transport, documentație valabilă și experiență în transportul rutier de marfă.",
        "Suntem interesați de parteneriate cu firme care operează semiremorci cu prelată, frigorifice sau mega, pe rute europene.",
        "Ne dorim colaborări bazate pe respectarea condițiilor agreate, comunicare eficientă și continuitate.",
      ],
    },
    process: {
      eyebrow: "02 / CUM DEVII PARTENER",
      title: "Patru pași pentru o posibilă colaborare.",
      steps: [
        { title: "Prezintă-ne compania", text: "Trimite datele firmei și informații despre activitatea de transport." },
        { title: "Comunică-ne capacitatea disponibilă", text: "Precizează tipurile de vehicule, rutele preferate și zonele în care operezi." },
        { title: "Analizăm informațiile", text: "Verificăm documentele relevante și discutăm condițiile unei posibile colaborări." },
        { title: "Începem colaborarea", text: "În funcție de solicitările disponibile, îți putem propune curse compatibile cu activitatea companiei tale." },
      ],
    },
    /** [PLACEHOLDER] titluri doar pentru prototip, pentru cerințele / condițiile de colaborare din companyData. */
    extras: {
      requirementsEyebrow: "03 / CONDIȚII DE COLABORARE",
      requirementsTitle: "Ce verificăm înainte de începerea colaborării.",
      conditionsEyebrow: "",
      conditionsTitle: "",
      requirementsLink: "Aceste verificări fac parte din procesul nostru de selecție a transportatorilor",
      benefitsEyebrow: "04 / BENEFICII",
      benefitsTitle: "Ce oferim transportatorilor parteneri.",
    },
    enquiry: {
      title: "Prezintă-ne compania ta de transport.",
      text: "Completează formularul și transmite-ne informațiile esențiale despre activitatea ta.",
      cta: "Trimite solicitarea de parteneriat",
    },
  },

  /** [PLACEHOLDER] DRAFT scris de EDH din faptele confirmate la apelul din 10.11.2026; necesită aprobarea clientului înainte de lansare. */
  vetting: {
    hero: {
      eyebrow: "SIGURANȚĂ ȘI VERIFICARE",
      titleLines: ["Transportatori verificați", "înainte de atribuirea fiecărei curse."],
      text: "Colaborăm cu operatori de transport independenți, pentru care verificăm documentele și condițiile necesare efectuării transportului.",
    },
    why: {
      title: "Alegerea transportatorului este o etapă esențială.",
      paragraphs: [
        "În transportul rutier internațional, verificarea operatorului de transport contribuie la reducerea riscurilor administrative, comerciale și operaționale.",
        "La AXEL SAFE TRANSPORTING, procesul de selecție include verificări privind statutul legal al transportatorului, asigurarea CMR și documentele echipamentului utilizat.",
        "Lucrăm cu o rețea de peste 30 de transportatori independenți, selectați pe baza unor criterii prestabilite.",
      ],
    },
    checks: {
      title: "Patru verificări esențiale.",
      notes: [
        "Verificăm existența legală a operatorului și valabilitatea licenței comunitare necesare pentru transporturile internaționale aplicabile.",
        "Verificăm polița CMR a transportatorului și confirmăm valabilitatea acesteia cu asigurătorul.",
        "Controlăm documentele camionului și semiremorcii, precum și compatibilitatea echipamentului cu cerințele mărfii.",
        "Verificăm statutul companiei, inclusiv eventualele proceduri de insolvență.",
      ],
    },
    roles: {
      title: "Responsabilități definite pentru fiecare transport.",
      paragraphs: [
        "Transportatorul independent efectuează transportul folosind vehiculele, personalul și documentele proprii.",
        "AXEL SAFE TRANSPORTING gestionează selectarea transportatorului, confirmarea condițiilor de colaborare și coordonarea comunicării până la livrare.",
        "Pe lângă asigurarea CMR a transportatorului, compania precizează că marfa beneficiază de asigurare, în condițiile aplicabile transportului.",
      ],
      guideLink: "Ghid: casă de expediții, transportator sau bursă de transport",
    },
    finalCta: {
      title: "Organizează transportul mărfii tale prin parteneri verificați.",
      text: "Trimite-ne cerințele transportului și vom analiza opțiunile disponibile.",
      cta: "Solicită o ofertă",
    },
  },

  contact: {
    hero: {
      eyebrow: "CONTACT AXEL SAFE TRANSPORTING",
      title: "Solicită o ofertă pentru transportul mărfii tale.",
      text: "Trimite-ne detaliile transportului, iar echipa noastră va analiza ruta, cerințele și capacitatea disponibilă în rețeaua de transportatori. De regulă, răspundem solicitărilor în mai puțin de o oră.",
    },
    quote: {
      title: "Spune-ne ce transport ai nevoie să organizezi.",
      text: "Completează informațiile de mai jos pentru a primi o ofertă adaptată cerințelor tale.",
    },
    direct: {
      eyebrow: "CONTACT DIRECT",
      title: "Contactează echipa AXEL SAFE TRANSPORTING.",
      labels: { email: "E-mail", phone: "Telefon", location: "Sediul social", hours: "Disponibilitate dispecerat" },
      location: "Reghin, județul Mureș, România",
    },
    carriers: {
      title: "Reprezinți o companie de transport?",
      text: "Dacă ești interesat de o colaborare cu AXEL SAFE TRANSPORTING, accesează secțiunea dedicată transportatorilor și transmite-ne informațiile despre compania ta.",
      cta: "Devino transportator partener",
    },
  },

  forms: {
    quote: {
      fields: {
        companyName: "Denumirea companiei",
        contactPerson: "Persoana de contact",
        email: "Adresa de e-mail",
        phone: "Număr de telefon",
        pickupLocation: "Locul de încărcare",
        deliveryLocation: "Locul de livrare",
        cargoDescription: "Descrierea mărfii",
        weight: "Greutatea și dimensiunile aproximative",
        pickupDate: "Data dorită pentru încărcare",
        deliveryDate: "Data dorită pentru livrare",
        additional: "Alte cerințe",
      },
      submit: "Trimite solicitarea de transport",
    },
    /** Etichetele formularului pentru transportatori, derivate din textul aprobat despre procesul de parteneriat. */
    carrier: {
      fields: {
        companyName: "Denumirea companiei",
        contactPerson: "Persoană de contact",
        email: "E-mail",
        phone: "Telefon",
        country: "Țara de înregistrare",
        fleetSize: "Număr de vehicule",
        vehicleTypes: "Tipuri de vehicule",
        regions: "Zone de operare și rute preferate",
        message: "Informații suplimentare",
        vatNumber: "CUI / Cod TVA",
        cmrInsurance: "Asigurare CMR valabilă",
        licenceNumber: "Număr licență de transport",
      },
      vehicleOptions: { curtainsider: "Prelată", reefer: "Frigorific", mega: "Mega", other: "Altele" },
      cmrOptions: { yes: "Da", no: "Nu" },
      submit: "Trimite solicitarea de parteneriat",
    },
    /** Cerere rapidă: doar ruta și telefonul. */
    quick: {
      fields: { contactPerson: "Nume", phone: "Telefon", pickupLocation: "Locul de încărcare", deliveryLocation: "Destinație", note: "Informații suplimentare" },
      submit: "Trimite cererea rapidă",
    },
    /** Te sunăm noi. */
    callback: {
      fields: { contactPerson: "Nume", phone: "Telefon", preferredTime: "Interval preferat" },
      timeOptions: { any: "Oricând", morning: "Dimineața", afternoon: "După-amiaza", evening: "Seara" },
      submit: "Solicită un apel",
    },
    /** Blocurile de formular de pe pagina de contact (taburi + caseta de apel). */
    contactBlocks: {
      tabsLabel: "Tipul cererii",
      tabFull: "Cerere completă",
      tabQuick: "Cerere rapidă",
      quickText: "Nu ai toate detaliile pregătite? Trimite-ne ruta și numărul de telefon. Stabilim împreună restul informațiilor.",
      callbackTitle: "Preferi să discutăm telefonic?",
      callbackText: "Lasă-ne datele tale de contact și intervalul orar preferat. Un reprezentant AXEL SAFE TRANSPORTING te va contacta pentru a discuta solicitarea.",
    },
    consent:
      "Sunt de acord ca AXEL SAFE TRANSPORTING să folosească datele trimise prin acest formular ca să îmi răspundă, conform Politicii de confidențialitate.",
    success: {
      title: "Am primit cererea ta.",
      text: "Mulțumim! Ne uităm peste detalii și revenim la tine pe telefon sau pe e-mail.",
    },
    required: "Obligatoriu",
    optional: "Opțional",
    sending: "Se trimite…",
    errors: {
      required: "Completează acest câmp.",
      email: "Adresa de e-mail nu este corectă.",
      consent: "Bifează acordul ca să putem răspunde cererii.",
      generic: "Cererea nu s-a trimis din cauza unei erori. Încearcă din nou sau sună-ne direct.",
      notConfigured:
        "Formularul nu funcționează încă, așa că mesajul nu a plecat. Scrie-ne pe e-mail sau sună-ne.",
      rateLimited: "Prea multe încercări într-un timp scurt. Așteaptă un minut și încearcă din nou.",
      invalid: "Verifică ce ai scris în acest câmp.",
      tooLong: "Textul e prea lung. Te rugăm să îl scurtezi.",
    },
  },

  /** [PLACEHOLDER] text doar pentru prototip, pentru explorerul de echipamente + exemplul de solicitare. Necesită aprobarea clientului. */
  showcase: {
    equipment: {
      title: "Semiremorca potrivită pentru fiecare tip de marfă.",
      text: "În funcție de încărcătură, putem organiza transportul cu semiremorci cu prelată, frigorifice sau mega, disponibile prin firmele de transport cu care colaborăm.",
      note: "Tipul de echipament și disponibilitatea acestuia se confirmă pentru fiecare transport. Specificațiile sunt orientative și pot varia în funcție de configurația semiremorcii alocate.",
      labels: {
        length: "Lungime utilă",
        pallets: "Paleți EUR",
        payload: "Sarcină utilă",
        height: "Înălțime interioară",
        volume: "Volum",
        temperature: "Temperatură",
      },
      units: { m: "m", t: "t", m3: "m³" },
      topView: "Vedere de sus · platformă de 13,6 m",
    },
    enquiry: {
      label: "Exemplu de cerere",
      route: { from: "Reghin, RO", to: "München, DE", distance: "≈ 1.050 km" },
      fields: { cargo: "Marfă", trailer: "Semiremorcă", dates: "Date" },
      cargo: "24 paleți EUR · mobilier",
      trailer: "Prelată",
      dates: "03.11 → 05.11",
      steps: ["Cerere primită", "Camion găsit", "Cursă confirmată", "Pe drum"],
    },
    watermark: "Precizie",
  },

  /**
   * FAQ: [PLACEHOLDER] DRAFT scris de EDH doar din fapte verificate; necesită aprobarea clientului înainte de lansare.
   * Alimentează secțiunile FAQ vizibile ȘI JSON-LD FAQPage (aceeași sursă).
   */
  faq: {
    title: "Întrebări frecvente despre transportul rutier de marfă.",
    shippers: [
      {
        q: "În ce țări organizează AXEL SAFE TRANSPORTING transporturi rutiere?",
        a: "AXEL SAFE TRANSPORTING organizează transporturi rutiere de marfă în Europa și Marea Britanie, cu activitate frecventă pe ruta România–Spania. Nu organizăm transporturi în Elveția. Disponibilitatea se verifică în funcție de ruta și perioada solicitate.",
      },
      {
        q: "AXEL SAFE TRANSPORTING este o casă de expediții sau o firmă de transport?",
        a: "AXEL SAFE TRANSPORTING este o companie din Reghin, județul Mureș, specializată în organizarea și coordonarea transporturilor rutiere de marfă. Colaborăm cu transportatori independenți care efectuează cursele. Nu operăm o flotă proprie.",
      },
      {
        q: "Ce tipuri de mărfuri puteți transporta în Europa?",
        a: "Organizăm transporturi pentru mărfuri generale, paletizate, voluminoase și produse care necesită temperatură controlată. Pentru mărfurile cu cerințe speciale, verificăm disponibilitatea transportatorilor și a echipamentelor necesare.",
      },
      {
        q: "Ce tipuri de semiremorci sunt disponibile pentru transport?",
        a: "Prin rețeaua de transportatori parteneri putem organiza curse cu semiremorci cu prelată (Tautliner), frigorifice și Mega. Alegerea echipamentului depinde de dimensiunile, greutatea și caracteristicile mărfii.",
      },
      {
        q: "Organizați transport rutier de marfă între România și Spania?",
        a: "Da. Ruta România–Spania este una dintre principalele relații de transport pe care activăm. Organizăm transporturi în ambele sensuri, în funcție de disponibilitatea transportatorilor și de cerințele fiecărei curse.",
      },
      {
        q: "Cum pot solicita o ofertă pentru transport internațional de marfă?",
        a: "Ne poți contacta prin formularul de pe website sau folosind datele din pagina de contact. Pentru ofertare, avem nevoie de locul de încărcare, destinație, tipul mărfii, greutate, dimensiuni și data solicitată.",
      },
      {
        q: "În cât timp primesc o ofertă de transport?",
        a: "De regulă, răspundem în mai puțin de o oră de la primirea informațiilor necesare. Solicitările care implică echipamente speciale sau condiții diferite de transport pot necesita verificări suplimentare.",
      },
      {
        q: "Cum se calculează prețul unui transport rutier internațional?",
        a: "Tariful depinde de distanță, ruta solicitată, greutatea și volumul mărfii, tipul semiremorcii și disponibilitatea transportatorilor. Prețul este comunicat după evaluarea detaliilor cursei.",
      },
      {
        q: "Organizați transporturi complete (FTL)?",
        a: "Putem analiza solicitări pentru transporturi complete, în care capacitatea camionului este alocată unei singure încărcături. Disponibilitatea și condițiile sunt confirmate pentru fiecare cursă.",
      },
      {
        q: "Pot solicita transportul unei cantități mai mici de marfă (LTL)?",
        a: "Pentru încărcături care nu ocupă un camion complet, putem verifica variantele disponibile în rețeaua transportatorilor parteneri. Posibilitatea organizării depinde de rută, volum și perioada solicitată.",
      },
      {
        q: "Organizați transporturi de marfă cu temperatură controlată?",
        a: "Da. Putem organiza transporturi frigorifice prin parteneri care dispun de semiremorci echipate pentru temperatură controlată. Intervalul de temperatură și condițiile de transport se stabilesc înainte de confirmarea cursei.",
      },
      {
        q: "Puteți organiza transporturi ADR pentru mărfuri periculoase?",
        a: "Da, în funcție de disponibilitate și de categoria mărfii. Colaborăm cu transportatori care dispun de echipamente și personal autorizat pentru transporturi ADR. Nu organizăm transporturi agabaritice sau de animale vii.",
      },
      {
        q: "Cum verificați transportatorii cu care colaborați?",
        a: "Verificăm documentele companiei, licența de transport, asigurarea CMR, documentele vehiculului și situația juridică a operatorului înainte de colaborare.",
      },
      {
        q: "Marfa transportată este asigurată?",
        a: "Da, marfa este asigurată. În plus, transportatorii parteneri trebuie să dețină o asigurare CMR valabilă, care acoperă răspunderea transportatorului în condițiile poliței și ale legislației aplicabile.",
      },
      {
        q: "Pot afla unde se află marfa în timpul transportului?",
        a: "Da. AXEL SAFE TRANSPORTING păstrează legătura cu transportatorul și poate solicita actualizări despre desfășurarea cursei. Informațiile sunt comunicate clientului în funcție de disponibilitatea lor.",
      },
      {
        q: "Ce se întâmplă dacă apar întârzieri în timpul transportului?",
        a: "Dacă apar modificări ale programului de transport, comunicăm cu operatorul pentru a afla situația și transmitem clientului informațiile disponibile. Eventualele modificări ale livrării sunt gestionate în funcție de condițiile stabilite.",
      },
      {
        q: "Pot modifica adresa sau data de livrare după confirmarea cursei?",
        a: "Modificările pot fi analizate împreună cu transportatorul. Posibilitatea efectuării lor depinde de stadiul cursei, disponibilitate și condițiile comerciale agreate. În anumite situații pot apărea costuri suplimentare.",
      },
      {
        q: "Ce documente sunt necesare pentru un transport rutier internațional?",
        a: "Documentele depind de tipul mărfii și de țările implicate. În mod obișnuit, pot fi necesare scrisoarea de transport CMR, factura comercială și documentele aferente încărcăturii. Pentru anumite mărfuri sau destinații se pot solicita documente suplimentare.",
      },
      {
        q: "Organizați transporturi regulate pentru companii?",
        a: "Da. Putem organiza atât transporturi individuale, cât și curse recurente. Pentru colaborările regulate, analizăm rutele, frecvența transporturilor, volumele și capacitatea disponibilă.",
      },
      {
        q: "Cum pot colabora cu AXEL SAFE TRANSPORTING pe termen lung?",
        a: "Trimite-ne informații despre rutele utilizate, tipurile de marfă și frecvența transporturilor. Pe baza acestora putem discuta condițiile comerciale și modul de organizare a curselor.",
      },
      {
        q: "Unde se află sediul AXEL SAFE TRANSPORTING?",
        a: "AXEL SAFE TRANSPORTING S.R.L. are sediul în Reghin, județul Mureș, România. Compania a fost înființată în 2018 și organizează transporturi rutiere de marfă pe rute europene.",
      },
      {
        q: "În ce limbi pot comunica cu echipa AXEL SAFE TRANSPORTING?",
        a: "Poți comunica cu echipa noastră în română, engleză și spaniolă. Acest lucru ne permite să gestionăm solicitări din partea companiilor care operează pe diferite piețe europene.",
      },
    ],
    carriers: [
      {
        q: "Ce firme de transport pot lucra cu voi?",
        a: "Firmele de transport care vor curse și țin la vorba dată, la condiții clare și la o colaborare corectă.",
      },
      {
        q: "Ce scriu în cererea de colaborare?",
        a: "Câteva date despre firmă, zonele în care lucrezi, ce camioane și echipamente ai, pe ce rute mergi de obicei și ce fel de marfă transporți.",
      },
      {
        q: "Ce se întâmplă după ce trimit cererea?",
        a: "Ne uităm peste date și te contactăm să vorbim despre curse și condiții. Dacă ne potrivim, te sunăm când avem marfă pe rutele tale.",
      },
    ],
  },

  legal: {
    reviewNote:
      "Această pagină este o ciornă pregătită pentru verificare juridică. Nu este textul final și trebuie revizuită înainte de publicare.",
  },

  common: {
    skip: "Sari la conținut",
    language: "Limbă",
    call: "Sună-ne",
    whatsapp: {
      label: "Scrie-ne pe WhatsApp",
      message: "Bună ziua, aș dori o ofertă pentru un transport rutier. Încărcare: … Descărcare: … Marfă: … Data: …",
    },
  },
};
