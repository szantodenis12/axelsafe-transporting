/**
 * SPANISH COPY — translated from the approved English version in ./en.ts.
 * Neutral European Spanish, formal "usted" register. Same keys, structure and array lengths as `en`.
 * Business facts (phone, email, hours…) come from companyData.ts.
 * Blocks marked as placeholder in comments mirror the prototype-only additions in en.ts, not approved copy.
 */
import type { Dictionary } from "./en";

export const es: Dictionary = {
  meta: {
    home: {
      title: "AXEL SAFE TRANSPORTING | Coordinación de transporte",
      description:
        "AXEL SAFE TRANSPORTING organiza transporte de mercancías por carretera con transportistas independientes. Hable con nosotros sobre sus envíos.",
    },
    services: {
      title: "Coordinación de transporte por carretera | AXEL SAFE",
      description:
        "Organización de transporte por carretera, planificación y coordinación de transportistas: los servicios de AXEL SAFE TRANSPORTING.",
    },
    howWeWork: {
      title: "Cómo organizamos el transporte | AXEL SAFE TRANSPORTING",
      description:
        "Así coordina AXEL SAFE TRANSPORTING el transporte por carretera con transportistas independientes, desde la solicitud hasta la confirmación.",
    },
    about: {
      title: "Sobre AXEL SAFE TRANSPORTING | Transporte por carretera",
      description:
        "Conozca AXEL SAFE TRANSPORTING, empresa rumana fundada en 2018 que organiza transporte de mercancías por carretera con transportistas independientes.",
    },
    forCarriers: {
      title: "Colaboración con transportistas | AXEL SAFE TRANSPORTING",
      description:
        "¿Le interesa colaborar con AXEL SAFE TRANSPORTING? Presente su empresa de transporte y hablemos de una posible colaboración.",
    },
    contact: {
      title: "Solicitar presupuesto de transporte | AXEL SAFE",
      description:
        "Contacte con AXEL SAFE TRANSPORTING para solicitar la organización de un transporte por carretera o tratar las necesidades de envío de su empresa.",
    },
  },

  nav: {
    items: [
      { key: "home", label: "Inicio" },
      { key: "services", label: "Servicios" },
      { key: "howWeWork", label: "Cómo trabajamos" },
      { key: "about", label: "Nosotros" },
      { key: "forCarriers", label: "Para transportistas" },
    ],
    cta: "Solicitar presupuesto",
    menu: "Menú",
    close: "Cerrar",
  },

  footer: {
    statement: "Coordinación de transporte de mercancías por carretera a través de transportistas independientes.",
    explore: "Explorar",
    exploreItems: [
      { key: "home", label: "Inicio" },
      { key: "services", label: "Servicios" },
      { key: "howWeWork", label: "Cómo trabajamos" },
      { key: "about", label: "Sobre nosotros" },
      { key: "forCarriers", label: "Para transportistas" },
      { key: "contact", label: "Contacto" },
    ],
    contact: "Contacto",
    legal: "Información legal",
    legalItems: [
      { key: "privacy", label: "Política de privacidad" },
      { key: "cookies", label: "Política de cookies" },
      { key: "terms", label: "Condiciones de uso" },
    ],
    rights: "AXEL SAFE TRANSPORTING. Todos los derechos reservados.",
    credit: "Sitio web realizado por",
    social: "Síganos",
    cta: "Solicitar presupuesto",
    nav: "Navegación del pie de página",
    legalNav: "Información legal",
    services: "Servicios",
    servicesItems: [
      { id: "road-freight-organisation", label: "Organización del transporte por carretera" },
      { id: "freight-planning", label: "Planificación y coordinación de cargas" },
      { id: "carrier-network", label: "Red de transportistas independientes" },
    ],
    labels: {
      office: "Oficina",
      dispatch: "Transporte y despacho",
      registeredOffice: "Domicilio social",
      regNo: "N.º de registro",
      vat: "NIF-IVA",
      activity: "Actividad",
      backToTop: "Volver arriba",
    },
  },

  home: {
    hero: {
      eyebrow: "AXEL SAFE TRANSPORTING / COORDINACIÓN DE TRANSPORTE POR CARRETERA",
      titleLines: ["Mercancías en movimiento.", "Empresas conectadas."],
      text: "Organizamos el transporte de mercancías por carretera a través de una red de transportistas independientes, conectando cada necesidad de envío con la solución de transporte adecuada.",
      primary: "Solicitar presupuesto",
      secondary: "Ver nuestros servicios",
      micro: ["Transporte por carretera", "Coordinación de transportes", "Logística empresarial"],
    },
    intro: {
      eyebrow: "01 / LA EMPRESA",
      title: "Cada envío empieza con la conexión adecuada.",
      paragraphs: [
        "Mover mercancías exige algo más que encontrar un camión disponible. Hace falta planificación, comunicación y la capacidad de reunir a las personas adecuadas.",
        "En AXEL SAFE TRANSPORTING coordinamos el transporte por carretera conectando a las empresas con transportistas independientes.",
      ],
      emphasis: "Un único interlocutor. Un proceso organizado en torno a sus necesidades de transporte.",
      cta: "Cómo trabajamos",
    },
    approach: {
      eyebrow: "02 / QUÉ HACEMOS",
      titleLines: ["El transporte adecuado.", "La coordinación adecuada."],
      text: "Trabajamos entre las empresas que necesitan transportar mercancías y los transportistas que las mueven.",
      cards: [
        {
          title: "Planificación del transporte",
          text: "Entender el envío, el destino, los plazos y los requisitos específicos del transporte antes de organizar los siguientes pasos.",
        },
        {
          title: "Coordinación de transportistas",
          text: "Identificar opciones de transporte adecuadas entre transportistas independientes y coordinar los detalles de cada envío.",
        },
        {
          title: "Comunicación",
          text: "Mantener organizada la información relativa al transporte y ofrecer un interlocutor claro durante todo el proceso de coordinación.",
        },
        {
          title: "Soluciones flexibles",
          text: "Tratar cada solicitud de transporte de forma individual, en lugar de limitar las opciones a una flota propia fija.",
        },
      ],
      cta: "Ver nuestros servicios",
    },
    services: {
      eyebrow: "03 / NUESTROS SERVICIOS",
      title: "Soluciones de transporte organizadas en torno a sus necesidades.",
      text: "No hay dos envíos con exactamente los mismos requisitos. Analizamos cada solicitud teniendo en cuenta la carga, el destino, las opciones de transporte disponibles y las gestiones necesarias.",
      cards: [
        {
          title: "Coordinación de transporte por carretera",
          text: "Organización del transporte de mercancías por carretera a través de transportistas independientes, buscando para cada envío la solución apropiada.",
          anchor: "road-freight-organisation",
        },
        {
          title: "Planificación del transporte",
          text: "Coordinación de los datos esenciales del envío, las condiciones de recogida y los detalles de entrega antes de que comience el transporte.",
          anchor: "freight-planning",
        },
        {
          title: "Red de transportistas",
          text: "Colaboración con transportistas asociados para identificar capacidad disponible y responder a distintas necesidades de carga.",
          anchor: "carrier-network",
        },
      ],
      cardCta: "Ver servicio",
    },
    process: {
      eyebrow: "04 / EL PROCESO",
      title: "De la solicitud a la entrega.",
      text: "Un enfoque estructurado para cada solicitud de transporte.",
      steps: [
        { title: "Envíenos los datos", text: "Indíquenos qué hay que transportar, adónde debe llegar y cuándo." },
        { title: "Revisamos las opciones", text: "Evaluamos su solicitud e identificamos las opciones de transporte adecuadas." },
        {
          title: "Confirmación del transporte",
          text: "Una vez acordados los detalles, coordinamos la operación con el transportista seleccionado.",
        },
        { title: "Seguimos en contacto", text: "Seguimos siendo su interlocutor para la coordinación del transporte y las novedades pertinentes." },
      ],
      cta: "Conozca nuestro proceso",
    },
    carriers: {
      eyebrow: "05 / NUESTRA RED",
      title: "Una buena logística empieza por buenos socios.",
      paragraphs: [
        "Una coordinación de transporte fiable depende de relaciones productivas entre cargadores, organizadores y transportistas.",
        "Atendemos con interés las solicitudes de empresas de transporte que deseen estudiar una colaboración con AXEL SAFE TRANSPORTING.",
      ],
      cta: "Conviértase en transportista colaborador",
    },
    finalCta: {
      eyebrow: "HABLEMOS DE LOGÍSTICA",
      titleLines: ["¿Tiene mercancías que transportar?", "Hablemos de la ruta."],
      text: "Cuéntenos sus necesidades de transporte y póngase en contacto con nuestro equipo.",
      primary: "Solicitar presupuesto de transporte",
      secondary: "Contacto",
    },
    /** [PLACEHOLDER] prototype-only labels for the network visual — not approved copy. */
    network: {
      caption: "Principales ejes viarios europeos · ilustrativo, no son las rutas propias de AXEL SAFE.",
      origin: "Reghin, Rumanía",
      coverageLabel: "Cobertura",
      equipmentLabel: "Equipos",
      baseLabel: "Coordinado desde",
      baseValue: "Reghin, Rumanía · desde 2018",
    },
  },

  services: {
    hero: {
      eyebrow: "AXEL SAFE / SERVICIOS",
      titleLines: ["Transporte por carretera.", "Organizado en torno a su empresa."],
      text: "Las necesidades de transporte cambian de un envío a otro. Nuestra función es ayudar a las empresas a organizar el transporte por carretera con los transportistas adecuados.",
      cta: "Solicitar presupuesto",
    },
    intro: {
      eyebrow: "01 / COORDINACIÓN DE TRANSPORTES",
      title: "Un enfoque práctico del transporte de mercancías.",
      paragraphs: [
        "Tanto si necesita organizar un único envío como tratar necesidades de transporte recurrentes, el proceso empieza por entender los detalles.",
        "Evaluamos el movimiento de mercancías solicitado y buscamos la opción adecuada dentro de nuestra red de transportistas.",
        "El objetivo es sencillo: comunicación clara, opciones de transporte apropiadas y una ejecución coordinada.",
      ],
    },
    core: [
      {
        id: "road-freight-organisation",
        label: "01 / Organización del transporte por carretera",
        title: "Organizar un transporte no tiene por qué ser complicado.",
        paragraphs: [
          "Coordinamos las necesidades de transporte por carretera entre los clientes y transportistas independientes.",
          "Desde la solicitud inicial hasta las condiciones acordadas, ayudamos a reunir la información, las partes y los detalles prácticos que implica organizar un envío.",
        ],
        listTitle: "Qué incluye:",
        list: [
          "Revisión de la carga y de los requisitos del envío.",
          "Identificación de las opciones de transporte adecuadas.",
          "Coordinación de los detalles de recogida y entrega.",
          "Facilitación de la comunicación entre las partes implicadas.",
        ],
        cta: "Hablemos de su envío",
        ctaTarget: "contact",
      },
      {
        id: "freight-planning",
        label: "02 / Planificación y coordinación de cargas",
        title: "Los detalles importan antes de que empiece el viaje.",
        paragraphs: [
          "Cada solicitud de transporte implica decisiones sobre plazos, características de la carga, condiciones de carga y expectativas de entrega.",
          "Repasamos la información esencial antes de confirmar el transporte, para reducir incertidumbres evitables.",
        ],
        listTitle: "Aspectos clave:",
        list: [
          "Tipo y cantidad de la carga.",
          "Lugares de recogida y entrega.",
          "Fechas solicitadas de carga y entrega.",
          "Requisitos de carga y descarga.",
          "Instrucciones específicas del envío.",
        ],
        cta: "Enviar los datos del transporte",
        ctaTarget: "contact",
      },
      {
        id: "carrier-network",
        label: "03 / Red de transportistas independientes",
        title: "Más opciones gracias a socios conectados.",
        paragraphs: [
          "Nuestro modelo de negocio se basa en trabajar con empresas de transporte independientes, en lugar de operar una flota propia fija.",
          "Esto nos permite estudiar las opciones de transporte según los requisitos de cada solicitud y la capacidad disponible en nuestra red.",
        ],
        listTitle: "",
        list: [] as string[],
        cta: "Vea cómo trabajamos",
        ctaTarget: "howWeWork",
      },
    ],
    requirements: {
      eyebrow: "02 / SU ENVÍO",
      title: "Díganos qué hay que transportar.",
      text: "Cuanto más precisa sea la descripción del envío, más fácil resulta evaluar el transporte necesario.",
      listTitle: "Información que podemos necesitar:",
      list: "Descripción de la carga, peso aproximado, dimensiones o unidades de carga, lugares de recogida y entrega, fechas preferidas y cualquier requisito especial de manipulación.",
      note: "Para envíos que requieran equipos o condiciones de transporte particulares, la disponibilidad debe confirmarse antes de poder presentar una oferta.",
      cta: "Solicitar presupuesto",
    },
    /** [PLACEHOLDER] prototype-only section headings for companyData transport types / industries. */
    extras: {
      typesEyebrow: "03 / TIPOS DE TRANSPORTE",
      typesTitle: "Equipos que podemos organizar a través de nuestros socios.",
      industriesEyebrow: "04 / SECTORES",
      industriesTitle: "Empresas para las que organizamos transporte.",
    },
    finalCta: {
      title: "¿Tiene un transporte pendiente sobre la mesa?",
      text: "Envíenos los datos esenciales. Revisaremos su solicitud y le indicaremos los siguientes pasos posibles.",
      cta: "Contactar",
    },
  },

  howWeWork: {
    hero: {
      eyebrow: "AXEL SAFE / NUESTRO PROCESO",
      titleLines: ["Detrás de cada envío,", "un proceso coordinado."],
      text: "El transporte por carretera reúne varias piezas en movimiento. Nuestro trabajo es conectarlas en una operación de transporte clara.",
    },
    model: {
      eyebrow: "01 / NUESTRA FUNCIÓN",
      titleLines: ["Nosotros organizamos el transporte.", "Nuestros transportistas colaboradores mueven la mercancía."],
      paragraphs: [
        "AXEL SAFE TRANSPORTING opera a través de una red de transportistas independientes.",
        "En lugar de depender de una flota propia, nos centramos en organizar el transporte de mercancías y coordinar a las partes implicadas.",
        "Esta distinción define nuestra forma de trabajar: entender los requisitos, identificar las opciones adecuadas y mantener una comunicación clara.",
      ],
      diagram: ["Cargador", "AXEL SAFE TRANSPORTING", "Transportista independiente"],
      diagramNotes: ["Tiene mercancía que transportar", "Coordina el transporte", "Realiza el transporte"],
    },
    stages: {
      eyebrow: "02 / PASO A PASO",
      title: "Un proceso claro desde la primera solicitud.",
      items: [
        {
          title: "Entender el envío",
          paragraphs: [
            "Cada solicitud empieza con la información de transporte pertinente.",
            "Revisamos los datos de la carga, el origen, el destino, los plazos solicitados y otros requisitos que puedan afectar a la operación de transporte.",
          ],
        },
        {
          title: "Identificar opciones de transporte",
          paragraphs: [
            "Con los requisitos definidos, buscamos opciones de transporte adecuadas entre nuestros transportistas colaboradores independientes.",
            "La disponibilidad, los equipos necesarios y las condiciones específicas del envío se tienen en cuenta como parte de la solicitud.",
          ],
        },
        {
          title: "Confirmar las condiciones",
          paragraphs: [
            "Los detalles del transporte propuesto se revisan y se acuerdan antes de organizar el envío.",
            "La información pertinente se coordina con el transportista para respaldar el proceso de recogida y entrega acordado.",
          ],
        },
        {
          title: "Coordinar la comunicación",
          paragraphs: [
            "Una vez organizado el transporte, seguimos siendo un interlocutor para las cuestiones de coordinación y las novedades pertinentes, dentro de las condiciones de servicio acordadas.",
          ],
        },
      ],
    },
    why: {
      eyebrow: "03 / NUESTRO ENFOQUE",
      title: "Un enfoque en red para el transporte por carretera.",
      paragraphs: [
        "Una flota fija ofrece un conjunto definido de vehículos y de capacidad. Una red de transportistas independientes es otra forma de organizar el transporte.",
        "Nuestro modelo nos permite evaluar cada solicitud frente a las opciones de transportistas disponibles, en lugar de limitar el transporte a los vehículos propiedad de la empresa.",
        "Para el cliente, la ventaja es contar con una única organización con la que tratar sus necesidades de transporte y la organización de cada envío.",
      ],
    },
    transparency: {
      eyebrow: "04 / TRABAJAR JUNTOS",
      titleLines: ["Condiciones claras.", "Comunicación clara."],
      paragraphs: [
        "Antes de confirmar un envío, las partes implicadas deben conocer las condiciones, la organización del transporte y las responsabilidades correspondientes.",
        "Creemos que la información precisa y la comunicación clara son esenciales en una relación de transporte profesional.",
      ],
      cta: "Hablemos de sus necesidades de transporte",
    },
  },

  about: {
    hero: {
      eyebrow: "AXEL SAFE / SOBRE LA EMPRESA",
      titleLines: ["Construida sobre conexiones.", "Centrada en el transporte."],
      text: "AXEL SAFE TRANSPORTING es una empresa con sede en Rumanía que organiza el transporte de mercancías por carretera a través de transportistas independientes.",
    },
    intro: {
      eyebrow: "01 / QUIÉNES SOMOS",
      title: "La logística es cuestión de personas, decisiones y plazos.",
      paragraphs: [
        "Detrás de cada movimiento de mercancías hay empresas con plazos, transportistas con capacidad disponible y numerosos detalles que deben encajar.",
        "AXEL SAFE TRANSPORTING trabaja entre esos elementos.",
        "Fundada en 2018 y con sede en Reghin, Rumanía, la empresa opera en el sector del transporte de mercancías por carretera, organizando transportes a través de transportistas independientes.",
        "Nuestra actividad se basa en el trabajo práctico de conectar necesidades de carga con operaciones de transporte.",
      ],
    },
    philosophy: {
      eyebrow: "02 / QUÉ GUÍA NUESTRO TRABAJO",
      title: "Una buena coordinación empieza por entender los detalles.",
      items: [
        { title: "Claridad", text: "Las necesidades de transporte deben tratarse con claridad antes de confirmar la operación." },
        { title: "Comunicación", text: "Las partes implicadas necesitan información pertinente y precisa durante todo el proceso." },
        {
          title: "Adaptabilidad",
          text: "Envíos distintos requieren soluciones distintas. Tratamos cada solicitud según sus requisitos particulares.",
        },
        {
          title: "Relaciones profesionales",
          text: "La colaboración a largo plazo depende de una comunicación constante y de expectativas claramente acordadas.",
        },
      ],
    },
    details: {
      eyebrow: "03 / DATOS DE LA EMPRESA",
      labels: {
        legalName: "Razón social",
        established: "Año de constitución",
        office: "Domicilio social",
        registration: "Número de registro mercantil",
        vat: "N.º de IVA / Código fiscal",
        activity: "Actividad principal",
        website: "Sitio web",
      },
    },
    finalCta: {
      title: "¿Busca un socio para coordinar sus transportes?",
      text: "Háblenos de su empresa y de las necesidades de transporte que debe gestionar.",
      cta: "Contactar con AXEL SAFE",
    },
  },

  forCarriers: {
    hero: {
      eyebrow: "AXEL SAFE / COLABORACIÓN CON TRANSPORTISTAS",
      titleLines: ["Su flota.", "Nuevas conexiones."],
      paragraphs: [
        "Trabajamos con transportistas independientes para organizar envíos de mercancías por carretera para clientes empresariales.",
        "Si dirige una empresa de transporte y le interesa estudiar una posible colaboración, nos gustaría conocerle.",
      ],
      cta: "Hágase colaborador",
    },
    intro: {
      eyebrow: "01 / TRABAJAR JUNTOS",
      title: "El transporte profesional empieza por colaboraciones profesionales.",
      paragraphs: [
        "Nuestro modelo de negocio se basa en la cooperación con transportistas independientes.",
        "Conectamos las necesidades de transporte de los clientes con las opciones disponibles y coordinamos las gestiones correspondientes.",
        "Nos interesa construir relaciones con operadores de transporte que valoren la comunicación clara, las condiciones acordadas y la cooperación profesional.",
      ],
    },
    process: {
      eyebrow: "02 / PÓNGASE EN CONTACTO",
      title: "Hablemos de cómo podemos trabajar juntos.",
      steps: [
        { title: "Presente su empresa", text: "Háblenos de su empresa de transporte, sus zonas de operación y sus tipos de vehículo." },
        {
          title: "Indíquenos su capacidad",
          text: "Facilítenos información sobre los equipos disponibles, las rutas preferidas y los tipos de carga que transporta.",
        },
        {
          title: "Hablemos de la colaboración",
          text: "Nuestro equipo revisará sus datos y podrá tratar con usted posibles oportunidades de transporte y condiciones de colaboración.",
        },
        {
          title: "Mantengamos el contacto",
          text: "Cuando exista una base adecuada para colaborar, podemos mantener el contacto en relación con las solicitudes de transporte pertinentes.",
        },
      ],
    },
    /** [PLACEHOLDER] prototype-only headings for companyData carrier requirements / conditions. */
    extras: {
      requirementsEyebrow: "03 / QUÉ PEDIMOS",
      requirementsTitle: "Antes de trabajar juntos.",
      conditionsEyebrow: "04 / CÓMO COLABORAMOS",
      conditionsTitle: "Condiciones claras en cada envío.",
    },
    enquiry: {
      title: "¿Le interesa trabajar con AXEL SAFE?",
      text: "Presente su empresa y cuéntenos su capacidad de transporte.",
      cta: "Enviar solicitud de colaboración",
    },
  },

  contact: {
    hero: {
      eyebrow: "AXEL SAFE / CONTACTO",
      title: "Hablemos del siguiente paso.",
      text: "Tanto si tiene una carga que organizar, una pregunta sobre nuestros servicios o interés en colaborar como transportista, puede contactarnos aquí.",
    },
    quote: {
      title: "Háblenos de su envío.",
      text: "Rellene el formulario con los datos esenciales del transporte para que podamos revisar su solicitud.",
    },
    direct: {
      eyebrow: "¿PREFIERE CONTACTARNOS DIRECTAMENTE?",
      title: "Hablemos.",
      labels: { email: "Correo electrónico", phone: "Teléfono", location: "Ubicación", hours: "Horario de atención" },
      location: "Reghin, distrito de Mureș, Rumanía",
    },
    carriers: {
      title: "¿Quiere colaborar como transportista?",
      text: "Utilice nuestro formulario específico de solicitud de colaboración para transportistas.",
      cta: "Conviértase en transportista colaborador",
    },
  },

  forms: {
    quote: {
      fields: {
        companyName: "Nombre de la empresa",
        contactPerson: "Persona de contacto",
        email: "Correo electrónico de empresa",
        phone: "Número de teléfono",
        pickupLocation: "Lugar de recogida",
        deliveryLocation: "Lugar de entrega",
        cargoDescription: "Descripción de la carga",
        weight: "Peso aproximado / Unidades de carga",
        pickupDate: "Fecha de recogida preferida",
        deliveryDate: "Fecha de entrega preferida",
        additional: "Requisitos adicionales",
      },
      submit: "Enviar solicitud de transporte",
    },
    /** Carrier form labels — derived from the approved partnership process copy. */
    carrier: {
      fields: {
        companyName: "Nombre de la empresa",
        contactPerson: "Persona de contacto",
        email: "Correo electrónico de empresa",
        phone: "Número de teléfono",
        country: "País de registro",
        fleetSize: "Número de vehículos",
        vehicleTypes: "Tipos de vehículo",
        regions: "Zonas de operación / Rutas preferidas",
        message: "Información adicional",
      },
      submit: "Enviar solicitud de colaboración",
    },
    consent:
      "Acepto que AXEL SAFE TRANSPORTING trate los datos facilitados a través de este formulario para responder a mi solicitud, tal como se describe en la Política de privacidad.",
    success: {
      title: "Hemos recibido su solicitud.",
      text: "Gracias por contactar con AXEL SAFE TRANSPORTING. Nuestro equipo revisará la información facilitada y le responderá a través de sus datos de contacto.",
    },
    required: "Obligatorio",
    optional: "Opcional",
    sending: "Enviando…",
    errors: {
      required: "Rellene este campo.",
      email: "Introduzca un correo electrónico de empresa válido.",
      consent: "Confirme que podemos tratar su solicitud.",
      generic: "Se ha producido un error y su solicitud no se ha enviado. Inténtelo de nuevo o contáctenos directamente.",
      notConfigured:
        "Las solicitudes en línea aún no están activas, por lo que su mensaje no se ha enviado. Contáctenos directamente por correo electrónico o teléfono.",
      rateLimited: "Demasiados intentos en poco tiempo. Espere un minuto e inténtelo de nuevo.",
    },
  },

  /** [PLACEHOLDER] prototype-only copy for the equipment explorer + example enquiry — needs client approval. */
  showcase: {
    equipment: {
      title: "Equipos de un vistazo.",
      text: "Cifras habituales de los tipos de semirremolque que organizamos a través de nuestros transportistas colaboradores.",
      note: "Cifras habituales de semirremolques europeos estándar. Las dimensiones y la capacidad exactas se confirman con el transportista para cada envío.",
      labels: {
        length: "Longitud de carga",
        pallets: "Palés EUR",
        payload: "Carga útil",
        height: "Altura interior",
        volume: "Volumen",
        temperature: "Rango de temperatura",
      },
      units: { m: "m", t: "t", m3: "m³" },
      topView: "Vista superior · plataforma de 13,6 m",
    },
    enquiry: {
      label: "Ejemplo de solicitud",
      route: { from: "Reghin, RO", to: "Múnich, DE", distance: "≈ 1.050 km" },
      fields: { cargo: "Carga", trailer: "Semirremolque", dates: "Fechas" },
      cargo: "24 palés EUR · muebles",
      trailer: "Lona",
      dates: "03.11 → 05.11",
      steps: ["Solicitud recibida", "Opciones revisadas", "Transporte confirmado", "En coordinación"],
    },
    watermark: "Precisión",
  },

  /**
   * FAQ — [PLACEHOLDER] DRAFT translated from the EDH English draft (verified facts only); needs client approval before launch.
   * Feeds the visible FAQ sections AND the FAQPage JSON-LD (same source).
   */
  faq: {
    title: "Preguntas que nos hacen con frecuencia.",
    shippers: [
      {
        q: "¿AXEL SAFE TRANSPORTING tiene camiones propios?",
        a: "No. Organizamos el transporte de mercancías por carretera a través de una red de transportistas colaboradores independientes. El transporte en sí lo realizan esas empresas de transporte; nosotros nos encargamos de la coordinación de cada envío.",
      },
      {
        q: "¿Para qué países organizan transporte por carretera?",
        a: "Organizamos transporte por carretera en toda Europa. Indíquenos los lugares de recogida y entrega y revisaremos las opciones de transporte disponibles para esa ruta.",
      },
      {
        q: "¿Qué tipos de semirremolque pueden organizar?",
        a: "A través de nuestros transportistas colaboradores organizamos semirremolques de lona (tautliner), frigoríficos y mega. Para envíos que necesiten otros equipos o condiciones de transporte particulares, la disponibilidad se confirma en cada solicitud.",
      },
      {
        q: "¿Qué información necesitan para preparar un presupuesto?",
        a: "Una descripción de la carga, el peso aproximado, las dimensiones o unidades de carga, los lugares de recogida y entrega, las fechas preferidas y cualquier requisito especial de manipulación. Cuanto más precisos sean los datos, más fácil resulta evaluar la organización del transporte.",
      },
      {
        q: "¿Cómo funciona el proceso?",
        a: "Usted nos envía los datos del envío, nosotros revisamos la solicitud e identificamos opciones de transporte adecuadas, las condiciones se acuerdan antes de confirmar el envío y las coordinamos con el transportista seleccionado.",
      },
      {
        q: "¿Quién es mi interlocutor una vez organizado el transporte?",
        a: "AXEL SAFE TRANSPORTING sigue siendo su interlocutor para las cuestiones de coordinación y las novedades pertinentes, dentro de las condiciones de servicio acordadas.",
      },
      {
        q: "¿Dónde tiene su sede la empresa?",
        a: "AXEL SAFE TRANSPORTING S.R.L. se constituyó en 2018 y tiene su sede en Reghin, distrito de Mureș, Rumanía.",
      },
    ],
    carriers: [
      {
        q: "¿Qué empresas de transporte pueden ser colaboradoras?",
        a: "Atendemos solicitudes de operadores de transporte interesados en colaborar que valoren la comunicación clara, las condiciones acordadas y la cooperación profesional.",
      },
      {
        q: "¿Qué debo incluir en una solicitud de colaboración?",
        a: "Información sobre su empresa, zonas de operación, tipos de vehículo, equipos disponibles, rutas preferidas y los tipos de carga que transporta.",
      },
      {
        q: "¿Qué ocurre después de enviar una solicitud?",
        a: "Nuestro equipo revisa sus datos y puede tratar con usted posibles oportunidades de transporte y condiciones de colaboración. Cuando existe una base adecuada para colaborar, mantenemos el contacto en relación con las solicitudes de transporte pertinentes.",
      },
    ],
  },

  legal: {
    reviewNote:
      "Esta página es un borrador estructural preparado para su revisión jurídica profesional. No es un texto legal definitivo y debe revisarse antes de su publicación.",
  },

  common: {
    skip: "Saltar al contenido",
    language: "Idioma",
  },
};
