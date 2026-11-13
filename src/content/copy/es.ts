/**
 * SPANISH COPY (Spain): translated from the approved Romanian version in ./ro.ts (13.11.2026).
 * Register: "tú", as in the Romanian. Same keys, structure and array lengths as `ro`.
 * Keys, `key`, `anchor`, `id` and `ctaTarget` values are NOT translated.
 * Business facts (phone, email, hours…) come from companyData.ts.
 * Blocks marked as placeholder in comments mirror the prototype-only additions in ro.ts, not approved copy.
 */
import type { Dictionary } from "./en";

export const es: Dictionary = {
  meta: {
    home: {
      title: "AXEL SAFE TRANSPORTING | Organización de transporte de mercancías por carretera",
      description:
        "Organizamos transporte de mercancías por carretera en Europa y el Reino Unido con transportistas independientes. Tráfico 24/7. Solicita un presupuesto.",
    },
    services: {
      title: "Servicios de transporte de mercancías por carretera | AXEL SAFE TRANSPORTING",
      description:
        "Organización del transporte, planificación del porte y coordinación de transportistas. Qué hace AXEL SAFE TRANSPORTING por las empresas.",
    },
    howWeWork: {
      title: "Cómo organizamos el transporte | AXEL SAFE TRANSPORTING",
      description:
        "Cómo trabaja AXEL SAFE TRANSPORTING, desde tu solicitud hasta la confirmación del porte con un transportista independiente.",
    },
    about: {
      title: "Sobre AXEL SAFE TRANSPORTING | Transporte de mercancías por carretera",
      description:
        "AXEL SAFE TRANSPORTING es una empresa rumana fundada en 2018 que organiza transporte de mercancías por carretera con transportistas independientes.",
    },
    forCarriers: {
      title: "Colaboración con transportistas | AXEL SAFE TRANSPORTING",
      description:
        "¿Tienes una empresa de transporte y buscas cargas? Preséntanos tu empresa y vemos juntos si podemos trabajar.",
    },
    contact: {
      title: "Solicita un presupuesto de transporte | AXEL SAFE TRANSPORTING",
      description:
        "Escríbenos la ruta, la mercancía y la fecha. AXEL SAFE TRANSPORTING te envía una oferta para el transporte de mercancías por carretera.",
    },
    vetting: {
      title: "Cómo verificamos a los transportistas | AXEL SAFE TRANSPORTING",
      description:
        "Antes de que un transportista cargue tu mercancía, comprobamos su licencia comunitaria, el seguro CMR, la documentación del camión y la situación de la empresa.",
    },
    guides: {
      title: "Guías sobre el transporte por carretera | AXEL SAFE TRANSPORTING",
      description:
        "Guías para cargadores: la carta de porte CMR, cómo se calcula el precio de un porte y qué diferencia hay entre transitario, transportista y bolsa de cargas.",
    },
  },

  nav: {
    items: [
      { key: "home", label: "Inicio" },
      { key: "services", label: "Servicios" },
      { key: "howWeWork", label: "Cómo trabajamos" },
      { key: "about", label: "Sobre nosotros" },
      { key: "forCarriers", label: "Para transportistas" },
    ],
    cta: "Solicita un presupuesto",
    menu: "Menú",
    close: "Cerrar",
  },

  footer: {
    statement: "Organizamos transporte de mercancías por carretera con transportistas independientes.",
    explore: "Páginas",
    exploreItems: [
      { key: "home", label: "Inicio" },
      { key: "services", label: "Servicios" },
      { key: "howWeWork", label: "Cómo trabajamos" },
      { key: "about", label: "Sobre nosotros" },
      { key: "forCarriers", label: "Para transportistas" },
      { key: "contact", label: "Contacto" },
      { key: "vetting", label: "Cómo verificamos a los transportistas" },
      { key: "guides", label: "Guías" },
    ],
    contact: "Contacto",
    legal: "Legal",
    legalItems: [
      { key: "privacy", label: "Política de privacidad" },
      { key: "cookies", label: "Política de cookies" },
      { key: "terms", label: "Condiciones de uso" },
    ],
    rights: "AXEL SAFE TRANSPORTING. Todos los derechos reservados.",
    credit: "Web desarrollada por",
    social: "También estamos en",
    cta: "Solicita un presupuesto",
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
      eyebrow: "AXEL SAFE TRANSPORTING / ORGANIZACIÓN DE TRANSPORTE POR CARRETERA",
      titleLines: ["Transporte por carretera en Europa,", "adaptado a tu negocio."],
      text: "Organizamos transporte de mercancías por carretera en Europa y el Reino Unido con una red de transportistas verificados. Desde encontrar el camión adecuado hasta la confirmación de la entrega, nos encargamos de organizar y coordinar cada porte.",
      primary: "Solicita un presupuesto",
      secondary: "Ver nuestros servicios",
      micro: ["En el transporte desde 2018", "Unos 100 portes al mes", "Tráfico disponible 24/7"],
    },
    intro: {
      eyebrow: "02 / ORGANIZACIÓN Y COORDINACIÓN DEL TRANSPORTE",
      title: "Un socio de confianza para los transportes de tu empresa.",
      paragraphs: [
        "Sabemos lo importante que es que un transporte esté bien organizado. El camión tiene que ser el adecuado para la mercancía, la carga tiene que cumplir el horario acordado y la información tiene que llegar a tiempo a todos los implicados.",
        "En AXEL SAFE TRANSPORTING nos ocupamos de esos detalles. Trabajamos con transportistas independientes, revisamos las opciones disponibles y organizamos los portes según lo que necesita cada cliente.",
      ],
      emphasis: "Tanto si tienes que enviar una sola carga como si tienes transportes regulares, cuentas con un equipo que conoce cada fase del proceso y está en contacto con el transportista durante todo el porte.",
      cta: "Conoce más sobre nosotros",
    },
    approach: {
      eyebrow: "03 / POR QUÉ TRABAJAR CON NOSOTROS",
      titleLines: ["Transportes bien organizados,", "con menos preocupaciones para ti."],
      text: "",
      cards: [
        {
          title: "Más de 30 transportistas en nuestra red",
          text: "Trabajamos con transportistas independientes cuyos documentos, licencias y seguros están verificados. Elegimos a cada colaborador según el tipo de mercancía, la ruta y las condiciones del transporte.",
        },
        {
          title: "Encontramos el camión adecuado para tu mercancía",
          text: "Cada carga tiene sus particularidades. Tenemos en cuenta el peso, el volumen, el destino y el tipo de semirremolque necesario antes de proponerte una opción de transporte.",
        },
        {
          title: "Un único interlocutor",
          text: "No tienes que hablar por separado con cada parte implicada. Centralizamos la comunicación con el transportista y te pasamos la información que necesitas durante el porte.",
        },
        {
          title: "Tráfico 24/7",
          text: "Estamos disponibles para comunicación y coordinación también fuera del horario habitual de trabajo.",
        },
        {
          title: "Más opciones de transporte",
          text: "No dependemos de la disponibilidad de una sola flota. Nuestra red de colaboradores nos permite buscar opciones según la ruta y las fechas en las que necesitas el transporte.",
        },
        {
          title: "Respondemos rápido",
          text: "Cuando tenemos todos los datos necesarios, normalmente te respondemos en menos de una hora.",
        },
      ],
      cta: "Ver nuestros servicios",
    },
    services: {
      eyebrow: "04 / NUESTROS SERVICIOS",
      title: "Organizamos los transportes que necesita tu negocio.",
      text: "Desde un único porte hasta transportes recurrentes, nos encargamos de encontrar al transportista, acordar los detalles y coordinar la entrega.",
      cards: [
        {
          title: "Transporte por carretera en Europa",
          text: "Organizamos transporte de mercancías en rutas de Europa y el Reino Unido, según el destino, las características de la carga y el plazo de entrega. Trabajamos con transportistas que disponen de distintos tipos de semirremolque, para poder encontrar una opción adecuada para cada transporte.",
          anchor: "road-freight-organisation",
        },
        {
          title: "Planificación y coordinación logística",
          text: "Nos ocupamos de organizar el porte, desde fijar las condiciones de carga y descarga hasta la comunicación con el transportista. Seguimos el transporte y mantenemos el contacto con las partes implicadas, para que cualquier cambio se comunique a tiempo.",
          anchor: "freight-planning",
        },
        {
          title: "Red de transportistas independientes",
          text: "Trabajamos con empresas de transporte verificadas, con experiencia en distintas rutas europeas. Según la solicitud, comprobamos la disponibilidad de camiones y elegimos al transportista que puede cumplir las condiciones del porte.",
          anchor: "carrier-network",
        },
      ],
      cardCta: "Detalles",
    },
    process: {
      eyebrow: "07 / CÓMO TRABAJAMOS",
      title: "De la solicitud a la entrega, en cuatro pasos.",
      text: "",
      steps: [
        { title: "Nos dices qué tienes que transportar", text: "Necesitamos el lugar de carga, el destino, el tipo de mercancía, el peso, el volumen y las fechas en las que hay que hacer el transporte." },
        { title: "Buscamos una opción adecuada", text: "Comprobamos la disponibilidad de los transportistas de nuestra red y elegimos las opciones que cumplen tus requisitos." },
        { title: "Cerramos todos los detalles", text: "Te comunicamos la tarifa y las condiciones del transporte. Una vez confirmado, fijamos el horario de carga y descarga con el transportista." },
        { title: "Seguimos en contacto hasta la entrega", text: "Coordinamos la comunicación durante el porte y te pasamos las novedades necesarias hasta la confirmación de la entrega." },
      ],
      cta: "Solicita un transporte",
    },
    carriers: {
      eyebrow: "08 / COLABORA CON NOSOTROS",
      title: "¿Tienes una empresa de transporte? Hablemos.",
      paragraphs: [
        "Nos interesa colaborar con transportistas serios, que cumplen lo que acuerdan y se comunican con claridad.",
        "Si tienes camiones disponibles y trabajas en rutas europeas, envíanos algunos datos sobre tu empresa, los tipos de semirremolque y las rutas que cubres.",
        "Estudiaremos las posibilidades de colaborar.",
      ],
      cta: "Hazte colaborador de AXEL SAFE",
    },
    finalCta: {
      eyebrow: "TRÁFICO DISPONIBLE 24/7",
      titleLines: ["¿Tienes mercancía que transportar?", "Envíanos los datos."],
      text: "Dinos dónde hay que cargar la mercancía, adónde tiene que llegar y cuándo necesitas el transporte. Revisamos las opciones disponibles y te enviamos una oferta según tus requisitos.",
      primary: "Solicita un presupuesto de transporte",
      secondary: "Contacta con nosotros",
    },
    /** [PLACEHOLDER] etiquetas solo para el prototipo, para el visual de la red. No es texto aprobado. */
    network: {
      caption: "Principales carreteras europeas. Mapa ilustrativo, no son las rutas de AXEL SAFE.",
      origin: "Reghin, Rumanía",
      coverageLabel: "Cobertura",
      equipmentLabel: "Equipos",
      baseLabel: "Domicilio social",
      baseValue: "Reghin, Rumanía · desde 2018",
    },
  },

  services: {
    hero: {
      eyebrow: "SERVICIOS DE TRANSPORTE Y LOGÍSTICA",
      titleLines: ["Transporte por carretera en Europa,", "adaptado a lo que necesita tu negocio."],
      text: "Organizamos transporte de mercancías por carretera en Europa con una red de transportistas verificados. Gestionamos tanto portes puntuales como transportes recurrentes, según la mercancía, la ruta y los plazos de entrega.",
      cta: "Solicita un presupuesto",
    },
    intro: {
      eyebrow: "01 / NUESTRO ENFOQUE",
      title: "Organizamos el transporte según lo que pide cada porte.",
      paragraphs: [
        "Cada transporte tiene condiciones distintas. El tipo de mercancía, la ruta, el plazo de entrega y el equipo necesario influyen en cómo se organiza el porte.",
        "En AXEL SAFE TRANSPORTING analizamos esa información, comprobamos la disponibilidad de los transportistas y fijamos las condiciones del transporte junto con el cliente.",
        "Nos encargamos de organizar el porte y de la comunicación con el transportista hasta la entrega.",
      ],
    },
    core: [
      {
        id: "road-freight-organisation",
        label: "Servicio 01 / Organización del transporte por carretera",
        title: "Transporte de mercancías entre destinos europeos.",
        paragraphs: [
          "Organizamos transporte por carretera para empresas que necesitan enviar mercancía por Europa.",
          "Trabajamos con transportistas independientes y elegimos entre las opciones disponibles según la carga, la ruta y las fechas solicitadas.",
          "Gestionamos tanto solicitudes puntuales como transportes regulares.",
        ],
        listTitle: "Qué incluye el servicio:",
        list: [
          "Análisis de los requisitos del transporte.",
          "Búsqueda de transportistas disponibles.",
          "Elección del tipo de semirremolque.",
          "Fijación de las condiciones de carga y descarga.",
          "Confirmación de las tarifas y de los detalles del porte.",
          "Coordinación del transporte hasta la entrega.",
        ],
        cta: "Solicita un presupuesto de transporte",
        ctaTarget: "contact",
      },
      {
        id: "freight-planning",
        label: "Servicio 02 / Planificación y coordinación",
        title: "Planificamos cada porte antes de la carga.",
        paragraphs: [
          "Para organizar un transporte necesitamos información clara sobre la mercancía, el destino y las condiciones de entrega.",
          "Reunimos esos datos y se los pasamos al transportista antes de confirmar el porte. Durante el transporte, mantenemos la comunicación con las partes implicadas y transmitimos las novedades importantes.",
        ],
        listTitle: "Qué gestionamos:",
        list: [
          "Tipo, cantidad y dimensiones de la mercancía.",
          "Direcciones de carga y descarga.",
          "Fechas y franjas horarias acordadas.",
          "Tipo de equipo necesario.",
          "Instrucciones especiales de transporte.",
          "Comunicación entre el cliente y el transportista.",
        ],
        cta: "Habla con nuestro equipo",
        ctaTarget: "contact",
      },
      {
        id: "carrier-network",
        label: "Servicio 03 / Red de transportistas",
        title: "Una red de más de 30 transportistas colaboradores.",
        paragraphs: [
          "Trabajamos con más de 30 transportistas independientes para organizar portes en Europa.",
          "Según la solicitud, comprobamos la disponibilidad de los colaboradores y buscamos las opciones adecuadas para la ruta y el tipo de mercancía.",
          "Antes de empezar a colaborar, verificamos los documentos necesarios para hacer el transporte, entre ellos la licencia de transporte, el seguro CMR y la documentación del vehículo.",
          "Con esta red podemos organizar transportes con distintos tipos de semirremolque, según la capacidad disponible.",
        ],
        listTitle: "",
        list: [] as string[],
        cta: "Conoce mejor nuestra red",
        ctaTarget: "vetting",
      },
    ],
    requirements: {
      eyebrow: "04 / QUÉ NOS ENVÍAS",
      title: "Dinos qué hay que transportar.",
      text: "Cuantos más detalles nos des, antes te enviamos una oferta ajustada.",
      listTitle: "Nos ayuda saber:",
      list: "Qué mercancía es, cuánto pesa aproximadamente, las dimensiones o el número de palés, dónde se carga y dónde se entrega, qué fechas prefieres y si la mercancía necesita una manipulación especial.",
      note: "Si la mercancía necesita un equipo o condiciones especiales, primero comprobamos la disponibilidad y después te enviamos la oferta.",
      cta: "Solicita un presupuesto",
    },
    /** [PLACEHOLDER] títulos solo para el prototipo, para los tipos de transporte / sectores de companyData. */
    extras: {
      typesEyebrow: "05 / TIPOS DE EQUIPO",
      typesTitle: "Semirremolques para distintos tipos de mercancía.",
      industriesEyebrow: "06 / SECTORES",
      industriesTitle: "Empresas para las que organizamos transporte.",
    },
    finalCta: {
      title: "¿Necesitas un transporte por carretera en Europa?",
      text: "Envíanos los datos de la mercancía, la ruta y la fecha de carga. Comprobamos la disponibilidad de transportistas y te enviamos una oferta para ese porte.",
      cta: "Solicita un presupuesto de transporte",
    },
  },

  howWeWork: {
    hero: {
      eyebrow: "NUESTRO PROCESO",
      titleLines: ["Desde la solicitud de transporte", "hasta la confirmación de la entrega."],
      text: "Nos encargamos de organizar cada porte, desde elegir al transportista adecuado hasta coordinar la entrega. Tienes un único interlocutor y sabes con quién hablar durante todo el transporte.",
    },
    model: {
      eyebrow: "01 / CÓMO FUNCIONAMOS",
      titleLines: ["Nosotros organizamos el transporte.", "Nuestros colaboradores lo realizan."],
      paragraphs: [
        "En AXEL SAFE TRANSPORTING trabajamos con empresas de transporte independientes, elegidas según la ruta, el tipo de mercancía y las condiciones de cada porte.",
        "No tenemos flota propia, y eso nos permite buscar camiones disponibles en nuestra red de transportistas sin depender de un número fijo de vehículos.",
        "Nosotros nos ocupamos de la organización, de cerrar los detalles y de la comunicación con el transportista, para que tú tengas un solo interlocutor.",
        "El cliente nos envía los datos de la mercancía y las condiciones de entrega.",
        "AXEL SAFE TRANSPORTING revisa las opciones disponibles, organiza el porte y coordina la comunicación.",
        "El transportista colaborador recoge la mercancía y hace el transporte según las condiciones acordadas.",
      ],
      diagram: ["El cliente", "AXEL SAFE TRANSPORTING", "El transportista colaborador"],
      diagramNotes: ["Tiene mercancía que transportar", "Coordina el transporte", "Realiza el transporte"],
      vettingLink: "Cómo verificamos a los transportistas",
    },
    stages: {
      eyebrow: "02 / FASES DE LA COLABORACIÓN",
      title: "Cómo organizamos el transporte, paso a paso.",
      items: [
        {
          title: "Nos dices qué tienes que transportar",
          paragraphs: [
            "Todo empieza con unos pocos datos: qué mercancía hay que transportar, dónde se carga, adónde tiene que llegar y cuándo necesitas el transporte.",
            "Revisamos el peso, el volumen y cualquier condición especial, para saber exactamente qué tipo de camión hace falta.",
          ],
        },
        {
          title: "Buscamos al transportista adecuado",
          paragraphs: [
            "Comprobamos la disponibilidad de camiones en nuestra red y buscamos a los transportistas que pueden hacer el porte en las condiciones solicitadas.",
            "Tenemos en cuenta la ruta, las fechas de carga, el tipo de semirremolque y las particularidades de la mercancía.",
          ],
        },
        {
          title: "Te enviamos la oferta y cerramos los detalles",
          paragraphs: [
            "Cuando encontramos una opción de transporte, te comunicamos la tarifa y las condiciones del porte.",
            "Una vez aceptada la oferta, confirmamos los detalles por escrito y fijamos el horario de carga y descarga con el transportista.",
          ],
        },
        {
          title: "Seguimos en contacto hasta la entrega",
          paragraphs: [
            "Durante el transporte, hablamos con el transportista y te pasamos las novedades necesarias.",
            "Si hay cambios de horario u otras situaciones que requieren coordinación, intervenimos para aclarar los detalles con las partes implicadas.",
            "Nuestro departamento de tráfico está disponible 24/7, y el proceso termina con la confirmación de la entrega.",
          ],
        },
      ],
    },
    why: {
      eyebrow: "03 / FLEXIBILIDAD",
      title: "Más opciones de transporte, sin depender de una sola flota.",
      paragraphs: [
        "Cada empresa tiene necesidades de transporte distintas. Algunos portes se planifican con antelación; otros surgen según los pedidos, la producción o los plazos de entrega.",
        "Por eso trabajamos con una red de transportistas independientes, que nos permite comprobar la disponibilidad de más camiones y tipos de semirremolque.",
        "Para ti, todo sigue siendo sencillo: nos envías la solicitud, nosotros buscamos una opción adecuada y nos encargamos de organizar el transporte.",
      ],
    },
    transparency: {
      eyebrow: "04 / COMUNICACIÓN Y RESPONSABILIDAD",
      titleLines: ["Sabes qué se ha acordado", "y con quién hablar."],
      paragraphs: [
        "Un transporte bien organizado empieza con información correcta y condiciones fijadas antes de la carga.",
        "Verificamos los documentos de los transportistas con los que trabajamos, confirmamos por escrito los detalles del porte y mantenemos el contacto con los implicados durante el transporte.",
        "Si hay cambios, hablamos con el transportista y te informamos de la situación.",
        "Buscamos colaboraciones en las que cada parte sabe lo que tiene que hacer y la información importante llega a tiempo.",
      ],
      cta: "Solicita un presupuesto de transporte",
    },
  },

  about: {
    hero: {
      eyebrow: "SOBRE AXEL SAFE TRANSPORTING",
      titleLines: ["Organizamos transporte de mercancías", "por carretera en Europa desde 2018."],
      text: "Somos una empresa rumana de Reghin, especializada en organizar y coordinar transporte de mercancías por carretera. Trabajamos con transportistas independientes para atender a las empresas que necesitan transporte en Europa.",
    },
    intro: {
      eyebrow: "01 / QUIÉNES SOMOS",
      title: "Experiencia en el transporte por carretera en Europa.",
      paragraphs: [
        "AXEL SAFE TRANSPORTING empezó su actividad en 2018, en Reghin, distrito de Mureș.",
        "Organizamos transporte de mercancías para empresas de distintos sectores. Trabajamos con una red de transportistas independientes y gestionamos cada porte desde que recibimos la solicitud hasta la confirmación de la entrega.",
        "Comprobamos la disponibilidad de los transportistas, fijamos las condiciones del porte y coordinamos la comunicación entre el cliente y el transportista.",
        "Hoy gestionamos unos 100 portes al mes, en rutas de Europa y el Reino Unido. Una de nuestras rutas principales es Rumanía–España.",
      ],
    },
    philosophy: {
      eyebrow: "03 / NUESTROS PRINCIPIOS",
      title: "Los principios con los que trabajamos.",
      items: [
        { title: "Profesionalidad", text: "Tratamos cada solicitud con atención a los detalles del transporte y a las condiciones acordadas con el cliente." },
        { title: "Transparencia", text: "Comunicamos las tarifas, las condiciones y los detalles del porte antes de confirmar el transporte." },
        { title: "Flexibilidad", text: "Buscamos opciones de transporte según la ruta, el tipo de mercancía y la disponibilidad de los transportistas." },
        { title: "Responsabilidad", text: "Verificamos los documentos de los transportistas colaboradores y seguimos los portes hasta la confirmación de la entrega." },
      ],
    },
    details: {
      eyebrow: "04 / DATOS DE LA EMPRESA",
      labels: {
        legalName: "Razón social",
        established: "Año de constitución",
        office: "Domicilio social",
        registration: "N.º de registro mercantil",
        vat: "CIF (CUI)",
        activity: "CAEN",
        website: "Web",
      },
    },
    finalCta: {
      title: "¿Necesitas un socio para los transportes de tu empresa?",
      text: "Dinos en qué rutas necesitas transporte y qué tipo de mercancía envías. Hablamos de tus requisitos y de cómo podemos colaborar.",
      cta: "Contacta con nosotros",
    },
  },

  forCarriers: {
    hero: {
      eyebrow: "COLABORACIÓN CON TRANSPORTISTAS",
      titleLines: ["Nuevas oportunidades de carga", "para tu empresa."],
      paragraphs: [
        "Trabajamos con transportistas independientes de toda Europa: te damos acceso a solicitudes de transporte, condiciones comerciales fijadas por escrito y coordinación operativa durante los portes.",
      ],
      cta: "Hazte transportista colaborador",
    },
    intro: {
      eyebrow: "01 / COLABORACIÓN",
      title: "Trabajamos con empresas de transporte profesionales.",
      paragraphs: [
        "AXEL SAFE TRANSPORTING colabora con operadores que tienen capacidad de transporte, documentación en vigor y experiencia en el transporte de mercancías por carretera.",
        "Nos interesa colaborar con empresas que trabajan con semirremolques de lona, frigoríficos o megatráileres en rutas europeas.",
        "Buscamos colaboraciones basadas en el cumplimiento de las condiciones acordadas, una comunicación ágil y la continuidad.",
      ],
    },
    process: {
      eyebrow: "02 / CÓMO SER COLABORADOR",
      title: "Cuatro pasos para empezar a colaborar.",
      steps: [
        { title: "Preséntanos tu empresa", text: "Envíanos los datos de la empresa e información sobre tu actividad de transporte." },
        { title: "Indícanos tu capacidad disponible", text: "Dinos qué tipos de vehículo tienes, tus rutas preferidas y las zonas en las que trabajas." },
        { title: "Revisamos la información", text: "Verificamos los documentos necesarios y hablamos de las condiciones de una posible colaboración." },
        { title: "Empezamos a colaborar", text: "Según las solicitudes que tengamos, podemos proponerte portes que encajen con la actividad de tu empresa." },
      ],
    },
    /** [PLACEHOLDER] títulos solo para el prototipo, para los requisitos / condiciones de colaboración de companyData. */
    extras: {
      requirementsEyebrow: "03 / CONDICIONES DE COLABORACIÓN",
      requirementsTitle: "Qué comprobamos antes de empezar a colaborar.",
      conditionsEyebrow: "",
      conditionsTitle: "",
      requirementsLink: "Estas comprobaciones forman parte de nuestro proceso de selección de transportistas",
      benefitsEyebrow: "04 / VENTAJAS",
      benefitsTitle: "Qué ofrecemos a los transportistas colaboradores.",
    },
    enquiry: {
      title: "Preséntanos tu empresa de transporte.",
      text: "Rellena el formulario y envíanos los datos básicos sobre tu actividad.",
      cta: "Enviar solicitud de colaboración",
    },
  },

  /** [PLACEHOLDER] BORRADOR de EDH a partir de los datos confirmados en la llamada del 10.11.2026; requiere aprobación del cliente antes del lanzamiento. */
  vetting: {
    hero: {
      eyebrow: "SEGURIDAD Y VERIFICACIÓN",
      titleLines: ["Transportistas verificados", "antes de asignar cada porte."],
      text: "Trabajamos con operadores de transporte independientes, de los que verificamos los documentos y las condiciones necesarias para hacer el transporte.",
    },
    why: {
      title: "Elegir al transportista es una fase clave.",
      paragraphs: [
        "En el transporte internacional por carretera, verificar al operador de transporte ayuda a reducir los riesgos administrativos, comerciales y operativos.",
        "En AXEL SAFE TRANSPORTING, el proceso de selección incluye comprobar la situación legal del transportista, el seguro CMR y la documentación del equipo que utiliza.",
        "Trabajamos con una red de más de 30 transportistas independientes, seleccionados con criterios fijados de antemano.",
      ],
    },
    checks: {
      title: "Cuatro comprobaciones clave.",
      notes: [
        "Comprobamos que el operador existe legalmente y que tiene en vigor la licencia comunitaria necesaria para los transportes internacionales que correspondan.",
        "Revisamos la póliza CMR del transportista y confirmamos con la aseguradora que está en vigor.",
        "Revisamos la documentación del camión y del semirremolque, y que el equipo se ajuste a lo que necesita la mercancía.",
        "Comprobamos la situación de la empresa, incluido si hay algún procedimiento de insolvencia.",
      ],
    },
    roles: {
      title: "Responsabilidades definidas en cada transporte.",
      paragraphs: [
        "El transportista independiente hace el transporte con sus propios vehículos, su personal y su documentación.",
        "AXEL SAFE TRANSPORTING se encarga de elegir al transportista, confirmar las condiciones de colaboración y coordinar la comunicación hasta la entrega.",
        "Además del seguro CMR del transportista, la mercancía está asegurada, en las condiciones aplicables al transporte.",
      ],
      guideLink: "Guía: transitario, transportista o bolsa de cargas",
    },
    finalCta: {
      title: "Organiza el transporte de tu mercancía con colaboradores verificados.",
      text: "Envíanos los requisitos del transporte y estudiaremos las opciones disponibles.",
      cta: "Solicita un presupuesto",
    },
  },

  contact: {
    hero: {
      eyebrow: "CONTACTO AXEL SAFE TRANSPORTING",
      title: "Solicita un presupuesto para el transporte de tu mercancía.",
      text: "Envíanos los datos del transporte y nuestro equipo revisará la ruta, los requisitos y la capacidad disponible en la red de transportistas. Normalmente respondemos en menos de una hora.",
    },
    quote: {
      title: "Dinos qué transporte necesitas organizar.",
      text: "Rellena los datos de abajo para recibir una oferta ajustada a tus requisitos.",
    },
    direct: {
      eyebrow: "CONTACTO DIRECTO",
      title: "Contacta con el equipo de AXEL SAFE TRANSPORTING.",
      labels: { email: "Correo electrónico", phone: "Teléfono", location: "Domicilio social", hours: "Disponibilidad del departamento de tráfico" },
      location: "Reghin, distrito de Mureș, Rumanía",
    },
    carriers: {
      title: "¿Representas a una empresa de transporte?",
      text: "Si te interesa colaborar con AXEL SAFE TRANSPORTING, entra en la sección para transportistas y envíanos los datos de tu empresa.",
      cta: "Hazte transportista colaborador",
    },
  },

  forms: {
    quote: {
      fields: {
        companyName: "Nombre de la empresa",
        contactPerson: "Persona de contacto",
        email: "Correo electrónico",
        phone: "Número de teléfono",
        pickupLocation: "Lugar de carga",
        deliveryLocation: "Lugar de entrega",
        cargoDescription: "Descripción de la mercancía",
        weight: "Peso y dimensiones aproximadas",
        pickupDate: "Fecha de carga prevista",
        deliveryDate: "Fecha de entrega prevista",
        additional: "Otros requisitos",
      },
      submit: "Enviar solicitud de transporte",
    },
    /** Etiquetas del formulario para transportistas, derivadas del texto aprobado sobre el proceso de colaboración. */
    carrier: {
      fields: {
        companyName: "Nombre de la empresa",
        contactPerson: "Persona de contacto",
        email: "Correo electrónico",
        phone: "Teléfono",
        country: "País de registro",
        fleetSize: "Número de vehículos",
        vehicleTypes: "Tipos de vehículo",
        regions: "Zonas de operación y rutas preferidas",
        message: "Información adicional",
        vatNumber: "CIF / NIF-IVA",
        cmrInsurance: "Seguro CMR en vigor",
        licenceNumber: "Número de licencia de transporte",
      },
      vehicleOptions: { curtainsider: "Lona (tautliner)", reefer: "Frigorífico", mega: "Mega", other: "Otros" },
      cmrOptions: { yes: "Sí", no: "No" },
      submit: "Enviar solicitud de colaboración",
    },
    /** Solicitud rápida: solo la ruta y el teléfono. */
    quick: {
      fields: { contactPerson: "Nombre", phone: "Teléfono", pickupLocation: "Lugar de carga", deliveryLocation: "Destino", note: "Información adicional" },
      submit: "Enviar solicitud rápida",
    },
    /** Te llamamos nosotros. */
    callback: {
      fields: { contactPerson: "Nombre", phone: "Teléfono", preferredTime: "Horario de contacto preferido" },
      timeOptions: { any: "En cualquier momento", morning: "Por la mañana", afternoon: "Por la tarde", evening: "Por la noche" },
      submit: "Pide que te llamemos",
    },
    /** Bloques de formulario de la página de contacto (pestañas + recuadro de llamada). */
    contactBlocks: {
      tabsLabel: "Tipo de solicitud",
      tabFull: "Solicitud completa",
      tabQuick: "Solicitud rápida",
      quickText: "¿No tienes todos los datos a mano? Envíanos la ruta y tu número de teléfono. El resto lo vemos juntos.",
      callbackTitle: "¿Prefieres hablarlo por teléfono?",
      callbackText: "Déjanos tus datos de contacto y la franja horaria que prefieras. Una persona del equipo de AXEL SAFE TRANSPORTING te llamará para hablar sobre tu solicitud.",
    },
    consent:
      "Acepto que AXEL SAFE TRANSPORTING utilice los datos enviados a través de este formulario para responderme, conforme a la Política de privacidad.",
    success: {
      title: "Hemos recibido tu solicitud.",
      text: "¡Gracias! Revisamos los datos y te contestamos por teléfono o por correo electrónico.",
    },
    required: "Obligatorio",
    optional: "Opcional",
    sending: "Enviando…",
    errors: {
      required: "Rellena este campo.",
      email: "La dirección de correo electrónico no es correcta.",
      consent: "Marca la casilla de consentimiento para que podamos responder a tu solicitud.",
      generic: "La solicitud no se ha enviado por un error. Inténtalo de nuevo o llámanos directamente.",
      notConfigured:
        "El formulario todavía no funciona, así que el mensaje no se ha enviado. Escríbenos por correo electrónico o llámanos.",
      rateLimited: "Demasiados intentos en poco tiempo. Espera un minuto e inténtalo de nuevo.",
      invalid: "Revisa lo que has escrito en este campo.",
      tooLong: "El texto es demasiado largo. Acórtalo, por favor.",
    },
  },

  /** [PLACEHOLDER] texto solo para el prototipo, para el explorador de equipos + el ejemplo de solicitud. Requiere aprobación del cliente. */
  showcase: {
    equipment: {
      title: "El semirremolque adecuado para cada tipo de mercancía.",
      text: "Según la carga, podemos organizar el transporte con semirremolques de lona, frigoríficos o megatráileres, disponibles a través de las empresas de transporte con las que trabajamos.",
      note: "El tipo de equipo y su disponibilidad se confirman en cada transporte. Las especificaciones son orientativas y pueden variar según la configuración del semirremolque asignado.",
      labels: {
        length: "Longitud útil",
        pallets: "Palés EUR",
        payload: "Carga útil",
        height: "Altura interior",
        volume: "Volumen",
        temperature: "Temperatura",
      },
      units: { m: "m", t: "t", m3: "m³" },
      topView: "Vista superior · plataforma de 13,6 m",
    },
    enquiry: {
      label: "Ejemplo de solicitud",
      route: { from: "Reghin, RO", to: "Múnich, DE", distance: "≈ 1.050 km" },
      fields: { cargo: "Mercancía", trailer: "Semirremolque", dates: "Fechas" },
      cargo: "24 palés EUR · muebles",
      trailer: "Lona",
      dates: "03.11 → 05.11",
      steps: ["Solicitud recibida", "Camión encontrado", "Porte confirmado", "En ruta"],
    },
    watermark: "Precisión",
  },

  /**
   * FAQ: [PLACEHOLDER] BORRADOR de EDH solo con datos verificados; requiere aprobación del cliente antes del lanzamiento.
   * Alimenta las secciones FAQ visibles Y el JSON-LD FAQPage (misma fuente).
   */
  faq: {
    title: "Preguntas frecuentes sobre el transporte de mercancías por carretera.",
    shippers: [
      {
        q: "¿En qué países organiza AXEL SAFE TRANSPORTING transporte por carretera?",
        a: "AXEL SAFE TRANSPORTING organiza transporte de mercancías por carretera en Europa y el Reino Unido, con actividad frecuente en la ruta Rumanía–España. No organizamos transportes en Suiza. La disponibilidad se comprueba según la ruta y las fechas solicitadas.",
      },
      {
        q: "¿AXEL SAFE TRANSPORTING es un transitario o una empresa de transporte?",
        a: "AXEL SAFE TRANSPORTING es una empresa de Reghin, distrito de Mureș, especializada en organizar y coordinar transporte de mercancías por carretera. Trabajamos con transportistas independientes, que son quienes hacen los portes. No operamos una flota propia.",
      },
      {
        q: "¿Qué tipos de mercancía podéis transportar en Europa?",
        a: "Organizamos transporte de carga general, paletizada, voluminosa y de productos que necesitan temperatura controlada. Para mercancías con requisitos especiales, comprobamos la disponibilidad de transportistas y del equipo necesario.",
      },
      {
        q: "¿Qué tipos de semirremolque hay disponibles?",
        a: "A través de nuestra red de transportistas colaboradores podemos organizar portes con semirremolques de lona (tautliner), frigoríficos y megatráileres. El equipo se elige según las dimensiones, el peso y las características de la mercancía.",
      },
      {
        q: "¿Organizáis transporte de mercancías por carretera entre Rumanía y España?",
        a: "Sí. La ruta Rumanía–España es una de nuestras rutas principales. Organizamos transportes en ambos sentidos, según la disponibilidad de los transportistas y los requisitos de cada porte.",
      },
      {
        q: "¿Cómo pido un presupuesto para un transporte internacional de mercancías?",
        a: "Puedes contactarnos a través del formulario de la web o con los datos de la página de contacto. Para preparar la oferta necesitamos el lugar de carga, el destino, el tipo de mercancía, el peso, las dimensiones y la fecha solicitada.",
      },
      {
        q: "¿En cuánto tiempo recibo un presupuesto de transporte?",
        a: "Normalmente respondemos en menos de una hora desde que recibimos los datos necesarios. Las solicitudes con equipos especiales o condiciones de transporte distintas pueden necesitar comprobaciones adicionales.",
      },
      {
        q: "¿Cómo se calcula el precio de un transporte internacional por carretera?",
        a: "La tarifa depende de la distancia, la ruta solicitada, el peso y el volumen de la mercancía, el tipo de semirremolque y la disponibilidad de transportistas. El precio se comunica después de evaluar los detalles del porte.",
      },
      {
        q: "¿Organizáis cargas completas (FTL)?",
        a: "Podemos estudiar solicitudes de carga completa, en las que toda la capacidad del camión se destina a un solo envío. La disponibilidad y las condiciones se confirman en cada porte.",
      },
      {
        q: "¿Puedo pedir el transporte de una cantidad más pequeña de mercancía (grupaje / LTL)?",
        a: "Para cargas que no ocupan un camión completo, podemos revisar las opciones disponibles en la red de transportistas colaboradores. Que se pueda organizar depende de la ruta, el volumen y las fechas solicitadas.",
      },
      {
        q: "¿Organizáis transporte de mercancías a temperatura controlada?",
        a: "Sí. Podemos organizar transporte frigorífico con colaboradores que tienen semirremolques equipados para temperatura controlada. El rango de temperatura y las condiciones de transporte se fijan antes de confirmar el porte.",
      },
      {
        q: "¿Podéis organizar transporte ADR de mercancías peligrosas?",
        a: "Sí, según la disponibilidad y la clase de mercancía. Trabajamos con transportistas que tienen equipo y personal autorizado para transporte ADR. No organizamos transportes especiales (sobredimensionados) ni de animales vivos.",
      },
      {
        q: "¿Cómo verificáis a los transportistas con los que trabajáis?",
        a: "Antes de empezar a colaborar, verificamos los documentos de la empresa, la licencia de transporte, el seguro CMR, la documentación del vehículo y la situación jurídica del operador.",
      },
      {
        q: "¿La mercancía transportada está asegurada?",
        a: "Sí, la mercancía está asegurada. Además, los transportistas colaboradores deben tener un seguro CMR en vigor, que cubre la responsabilidad del transportista en las condiciones de la póliza y de la legislación aplicable.",
      },
      {
        q: "¿Puedo saber dónde está la mercancía durante el transporte?",
        a: "Sí. AXEL SAFE TRANSPORTING está en contacto con el transportista y puede pedirle novedades sobre el porte. La información se comunica al cliente según esté disponible.",
      },
      {
        q: "¿Qué pasa si hay retrasos durante el transporte?",
        a: "Si cambia el horario del transporte, hablamos con el operador para conocer la situación y pasamos al cliente la información disponible. Los posibles cambios en la entrega se gestionan según las condiciones acordadas.",
      },
      {
        q: "¿Puedo cambiar la dirección o la fecha de entrega después de confirmar el porte?",
        a: "Los cambios se pueden estudiar con el transportista. Que se puedan hacer depende de en qué punto está el porte, de la disponibilidad y de las condiciones comerciales acordadas. En algunos casos puede haber costes adicionales.",
      },
      {
        q: "¿Qué documentos hacen falta para un transporte internacional por carretera?",
        a: "Los documentos dependen del tipo de mercancía y de los países implicados. Lo habitual es que hagan falta la carta de porte CMR, la factura comercial y los documentos de la carga. Para algunas mercancías o destinos se pueden pedir documentos adicionales.",
      },
      {
        q: "¿Organizáis transportes regulares para empresas?",
        a: "Sí. Podemos organizar tanto transportes puntuales como portes recurrentes. Para las colaboraciones regulares, analizamos las rutas, la frecuencia de los transportes, los volúmenes y la capacidad disponible.",
      },
      {
        q: "¿Cómo puedo trabajar con AXEL SAFE TRANSPORTING a largo plazo?",
        a: "Envíanos información sobre las rutas que usas, los tipos de mercancía y la frecuencia de los transportes. Con esos datos podemos hablar de las condiciones comerciales y de cómo organizar los portes.",
      },
      {
        q: "¿Dónde tiene su sede AXEL SAFE TRANSPORTING?",
        a: "AXEL SAFE TRANSPORTING S.R.L. tiene su domicilio social en Reghin, distrito de Mureș, Rumanía. La empresa se fundó en 2018 y organiza transporte de mercancías por carretera en rutas europeas.",
      },
      {
        q: "¿En qué idiomas puedo hablar con el equipo de AXEL SAFE TRANSPORTING?",
        a: "Puedes hablar con nuestro equipo en rumano, inglés y español. Esto nos permite atender solicitudes de empresas que trabajan en distintos mercados europeos.",
      },
    ],
    carriers: [
      {
        q: "¿Qué empresas de transporte pueden trabajar con vosotros?",
        a: "Las empresas de transporte que buscan cargas y cumplen lo que acuerdan, con condiciones claras y una colaboración seria.",
      },
      {
        q: "¿Qué pongo en la solicitud de colaboración?",
        a: "Algunos datos de la empresa, las zonas en las que trabajas, qué camiones y equipos tienes, qué rutas haces normalmente y qué tipo de mercancía transportas.",
      },
      {
        q: "¿Qué pasa después de enviar la solicitud?",
        a: "Revisamos los datos y te contactamos para hablar de portes y condiciones. Si encajamos, te llamamos cuando tengamos carga en tus rutas.",
      },
    ],
  },

  legal: {
    reviewNote:
      "Esta página es un borrador preparado para revisión jurídica. No es el texto definitivo y debe revisarse antes de publicarse.",
  },

  common: {
    skip: "Saltar al contenido",
    language: "Idioma",
    call: "Llámanos",
    whatsapp: {
      label: "Escríbenos por WhatsApp",
      message: "Hola, quería un presupuesto para un transporte por carretera. Carga: … Descarga: … Mercancía: … Fecha: …",
    },
  },
};
