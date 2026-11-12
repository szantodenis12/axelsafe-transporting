/**
 * GUÍAS (ES). [PLACEHOLDER] BORRADOR de EDH a partir de conocimiento general del sector; requiere aprobación del cliente antes del lanzamiento.
 * Sin cifras de la empresa fuera de los datos verificados en companyData. Sin precios.
 */
import type { GuidesContent } from "./types";

export const guidesEs: GuidesContent = {
  index: {
    titleLines: ["El transporte por carretera,", "explicado con claridad."],
    text: "Guías breves para empresas que envían mercancía por carretera: los documentos, el precio y quién hace qué.",
    read: "Leer la guía",
  },
  ui: { contents: "En esta guía", allGuides: "Todas las guías", updated: "Actualizado" },
  published: "2026-11-10",
  articles: {
    cmr: {
      title: "Qué es la carta de porte CMR y para qué sirve",
      description:
        "La carta de porte CMR explicada para cargadores: cuándo se aplica, qué contiene, quién la firma y por qué importa cuando la mercancía llega dañada.",
      lead: "Todo transporte internacional por carretera en Europa viaja con una carta de porte CMR. Es un documento breve, pero decide mucho cuando algo sale mal: quién recibió qué, en qué estado y quién responde de una pérdida.",
      sections: [
        {
          heading: "De dónde viene el nombre",
          body: [
            "CMR es el Convenio relativo al contrato de transporte internacional de mercancías por carretera, firmado en Ginebra en 1956. Casi todos los países europeos se han adherido, y también varios países de fuera de Europa.",
            "El convenio se aplica cuando la mercancía se transporta por carretera a cambio de un precio y los lugares de carga y de entrega están en dos países distintos, al menos uno de ellos parte del convenio. Establece quién responde de qué, hasta dónde llega la responsabilidad del transportista y cómo se reclama. La carta de porte recoge cada contrato concreto según estas reglas.",
          ],
        },
        {
          heading: "Para qué sirve el documento",
          body: [
            "La carta de porte CMR cumple tres funciones a la vez:",
            {
              list: [
                "acredita que existe un contrato de transporte y en qué condiciones;",
                "confirma que el transportista se hizo cargo de la mercancía, en la cantidad y el estado que figuran en ella;",
                "una vez firmada por el destinatario, demuestra que la mercancía se entregó.",
              ],
            },
            "Si la carta falta o está incompleta, el contrato sigue siendo válido y el convenio se sigue aplicando. Lo que se complica es demostrar qué se cargó y en qué estado.",
          ],
        },
        {
          heading: "Quién la firma y quién se queda cada ejemplar",
          body: [
            "La carta se extiende en tres ejemplares originales, firmados por el remitente y el transportista. El primero se queda con el remitente, el segundo acompaña a la mercancía y se entrega al destinatario, y el tercero se lo queda el transportista. Los formularios impresos suelen incluir copias adicionales para uso interno.",
            "El remitente responde de la exactitud de los datos sobre la mercancía. Si una descripción o un peso erróneos causan una pérdida o gastos adicionales, se le puede exigir responsabilidad.",
          ],
        },
        {
          heading: "Qué datos lleva",
          body: [
            "El convenio enumera los datos que debe contener la carta de porte. Los principales son:",
            {
              list: [
                "lugar y fecha de emisión;",
                "nombre y dirección del remitente, del transportista y del destinatario;",
                "lugar y fecha de la carga, y lugar de entrega;",
                "descripción de la mercancía y del embalaje (para mercancías peligrosas, su denominación generalmente reconocida);",
                "número de bultos, con sus marcas y números;",
                "peso bruto u otra cantidad de la mercancía;",
                "gastos relacionados con el transporte;",
                "instrucciones para aduanas y otras formalidades.",
              ],
            },
            "Pueden añadirse otros datos cuando proceda, como un plazo de entrega pactado, un valor declarado de la mercancía o instrucciones del remitente sobre la manipulación.",
          ],
        },
        {
          heading: "Las reservas en la carga y en la entrega",
          body: [
            "Cuando el transportista se hace cargo de la mercancía, el conductor comprueba el número de bultos y su estado aparente. Si algo no está bien, por ejemplo embalajes rotos o menos palés de los declarados, anota una reserva en la carta. Sin reservas, se presume que la mercancía estaba en buen estado aparente al cargarse.",
            "En la entrega se aplica la misma lógica. Los daños visibles se anotan en la carta al recibir la mercancía. Para los daños no aparentes, las reservas por escrito deben llegar al transportista en un plazo de siete días desde la entrega, sin contar domingos ni festivos. Para el retraso, el plazo es de 21 días desde que la mercancía se puso a disposición del destinatario.",
          ],
        },
        {
          heading: "Límites de responsabilidad y la versión electrónica",
          body: [
            "Según el convenio, la indemnización por mercancía perdida o dañada tiene un tope de 8,33 derechos especiales de giro (DEG) por kilogramo de peso bruto que falte o esté dañado, salvo que en la carta se haya declarado un valor superior a cambio de un recargo pactado. Para mercancías de valor, este tope puede quedar muy por debajo de lo que vale la carga, así que conviene hablar del seguro de la mercancía por separado.",
            "Un protocolo adoptado en 2008 permite la carta de porte electrónica, el e-CMR. Entre los países que lo han ratificado, el e-CMR tiene el mismo valor jurídico que el documento en papel.",
          ],
        },
      ],
      cta: {
        title: "¿Tiene mercancía que enviar por Europa?",
        text: "Organizamos el transporte con transportistas independientes cuyo seguro CMR confirmamos con la aseguradora antes de cargar. Envíenos la ruta y la mercancía.",
        label: "Solicitar presupuesto",
      },
    },

    pricing: {
      title: "Cómo se forma el precio de un transporte por carretera",
      description:
        "Qué entra en un presupuesto de transporte por carretera: distancia, peso y metros lineales, tipo de semirremolque, retorno en vacío, peajes, combustible, fechas y temporada.",
      lead: "Dos envíos con el mismo peso y la misma distancia pueden recibir presupuestos muy distintos. El precio de un transporte por carretera depende de algo más que los kilómetros. Estos son los factores que un transitario o un transportista sopesa antes de darle una cifra.",
      sections: [
        {
          heading: "Distancia y ruta",
          body: [
            "La distancia es el punto de partida. La mayoría de los presupuestos parten de los kilómetros entre la carga y la entrega, pero la ruta también cuenta: puertos de montaña, travesías en ferry, centros urbanos y pasos fronterizos añaden tiempo y coste.",
            "Las normas de la UE sobre tiempos de conducción y descanso limitan la distancia que un conductor puede recorrer en un día. Una ruta más larga puede necesitar un día más en carretera o un segundo conductor, y ambas cosas se reflejan en el precio.",
          ],
        },
        {
          heading: "Peso, volumen y metros lineales",
          body: [
            "Un semirremolque europeo estándar carga 33 europalés en una plataforma de 13,6 metros. Un camión completo se factura entero, vaya lleno o no.",
            "En las cargas parciales, el precio suele depender de cuánto semirremolque se ocupa, medido en metros lineales o huecos de palé, y del peso. La mercancía ligera pero voluminosa se factura por el espacio que ocupa. La mercancía pesada y compacta, por su peso.",
          ],
        },
        {
          heading: "Tipo de semirremolque",
          body: [
            "La lona es el semirremolque más habitual y, por lo general, el precio de referencia. Un frigorífico cuesta más de operar: el equipo de frío consume combustible y el semirremolque es más caro de comprar y de mantener. En muchas rutas, además, hay menos frigoríficos disponibles. Los megatráileres, con más altura interior, se adaptan a cargas voluminosas, pero no se encuentran en todas partes.",
          ],
        },
        {
          heading: "El retorno en vacío",
          body: [
            "Tras la entrega, el camión tiene que encontrar su siguiente carga cerca. Si el destino es una zona de la que salen pocas cargas de vuelta, el transportista puede hacer parte del trayecto en vacío, y ese coste entra en el precio.",
            "Por eso la misma distancia puede costar una cantidad en un sentido y otra distinta en el contrario.",
          ],
        },
        {
          heading: "Peajes y combustible",
          body: [
            "Los peajes varían de un país a otro y a menudo se cobran por kilómetro, según el peso del vehículo y su clase de emisiones. El combustible es uno de los mayores costes del transporte por carretera y su precio cambia. Algunos acuerdos incluyen un recargo por combustible ligado al precio del gasóleo; otros fijan el precio de cada viaje.",
          ],
        },
        {
          heading: "Fechas, urgencia y temporada",
          body: [
            "Una carga que tiene que salir mañana cuesta más que una planificada con una semana de antelación, porque el transportista tiene menos margen para encajarla. Las franjas horarias fijas de carga o entrega, el trabajo en fin de semana y los plazos de entrega estrictos también suman.",
            "La demanda cambia a lo largo del año. Antes de los festivos y en la temporada alta de ciertas mercancías, cuesta más encontrar camiones y los precios suben.",
          ],
        },
        {
          heading: "Qué enviar para recibir un presupuesto ajustado",
          body: [
            {
              list: [
                "direcciones de carga y de entrega o, al menos, los códigos postales;",
                "descripción de la mercancía y del embalaje;",
                "número de palés o bultos, peso y, para mercancía no estándar, dimensiones;",
                "requisitos del semirremolque, como un rango de temperatura o carga lateral;",
                "fechas y franjas horarias fijas, si las hay;",
                "si la mercancía puede viajar con otras cargas o necesita un camión completo.",
              ],
            },
            "Una solicitud completa ahorra una segunda ronda de preguntas y evita que el precio cambie después de cargar.",
          ],
        },
      ],
      cta: {
        title: "¿Necesita precio para una ruta?",
        text: "Envíenos la ruta, la mercancía y las fechas. Con los datos completos, normalmente respondemos en menos de una hora.",
        label: "Solicitar presupuesto",
      },
    },

    roles: {
      title: "Transitario, transportista, bolsa de cargas: quién hace qué",
      description:
        "Tres formas de mover mercancía por carretera: qué hace un transitario, qué hace un transportista y qué es una bolsa de cargas, y qué supone cada uno para el cargador.",
      lead: "Si necesita transportar mercancía por carretera, puede tratar directamente con un transportista, trabajar con un transitario o publicar la carga en una bolsa de cargas. Los tres se confunden a menudo, y cada uno le deja a usted una parte distinta del trabajo.",
      sections: [
        {
          heading: "El transportista",
          body: [
            "El transportista posee u opera los camiones y tiene contratados a los conductores. Realiza el transporte y, en rutas internacionales, cuenta con un seguro CMR que cubre su responsabilidad frente a la mercancía. Hay desde autónomos con un solo camión hasta empresas con cientos de vehículos.",
            "Trabajar directamente con un transportista quita un eslabón de la cadena. Los límites son la capacidad y la cobertura: solo puede ofrecerle los camiones que tiene, en las rutas donde estén en ese momento. Si no tiene un camión libre para su fecha, tendrá que buscar en otro sitio.",
          ],
        },
        {
          heading: "El transitario",
          body: [
            "El transitario (también llamado agencia u operador de transporte) organiza el transporte por cuenta del cargador y no necesita tener vehículos propios. Su trabajo es entender el envío, encontrar un transportista adecuado, acordar precio y condiciones y coordinar el transporte hasta la entrega.",
            "Para el cargador, supone una sola solicitud y un solo interlocutor en lugar de llamar a varios transportistas. Un transitario debería verificar a los transportistas que contrata, porque responde ante usted de esa elección. Su margen está incluido en el precio que usted paga.",
          ],
        },
        {
          heading: "La bolsa de cargas",
          body: [
            "Una bolsa de cargas es una plataforma en línea donde se publican cargas y camiones libres. Cargadores, transitarios y transportistas la usan para encontrarse rápido, a menudo para un solo viaje. El acceso suele requerir una suscripción de pago.",
            "La bolsa es un mercado, no una parte del transporte. No organiza el envío ni responde del transportista que se encuentre en ella. Las plataformas hacen algunas comprobaciones de sus miembros, pero verificar al transportista concreto, su licencia y su seguro sigue siendo tarea de quien contrata el transporte.",
          ],
        },
        {
          heading: "Qué opción encaja con cada cargador",
          body: [
            "Las empresas con volúmenes regulares en las mismas rutas suelen trabajar directamente con uno o dos transportistas. Los cargadores con volúmenes variables, varios destinos o sin nadie en plantilla que gestione el transporte suelen recurrir a un transitario. Las bolsas encajan con empresas que tienen su propio departamento de tráfico y están acostumbradas a verificar ellas mismas a los transportistas.",
          ],
        },
        {
          heading: "Cómo trabaja AXEL SAFE TRANSPORTING",
          body: [
            "Somos un transitario. No tenemos camiones propios: el transporte lo realizan los más de 30 transportistas independientes con los que trabajamos, por toda Europa y el Reino Unido, sobre todo entre Rumanía y España. Organizamos unos 100 envíos al mes.",
            "Antes de que un transportista reciba una de nuestras cargas, comprobamos su licencia comunitaria, confirmamos su seguro CMR con la aseguradora, revisamos la documentación del vehículo y nos aseguramos de que la empresa no esté en concurso de acreedores. Usted tiene un coordinador para cada envío y un equipo de tráfico que responde 24/7. La mercancía está asegurada.",
          ],
        },
      ],
      cta: {
        title: "¿Quiere un solo interlocutor para su transporte?",
        text: "Díganos qué hay que mover, desde dónde y cuándo. Normalmente respondemos en menos de una hora.",
        label: "Solicitar presupuesto",
      },
    },
  },
};
