import type { PageExtras } from "./extras";

/** Page sections added 13.11.2026 (Roland's texts) that sit outside the Dictionary shape. Translated from roExtra. Same shape in en/ro. */
export const esExtra: PageExtras = {
  contact: { officeHeading: "Oficina", transportHeading: "Transporte y tráfico" },
  vetting: {
    checkTitles: [
      "Registro de la empresa y licencia de transporte",
      "Seguro CMR",
      "Documentación del vehículo",
      "Situación jurídica del transportista",
    ],
  },
  howWeWork: {
    finalCta: {
      titleLines: ["¿Tienes un transporte que organizar?", "Envíanos los datos."],
      text: "Dinos qué mercancía hay que transportar, la ruta y las fechas en las que necesitas el camión. Comprobamos la disponibilidad de los transportistas de nuestra red y te enviamos una oferta.",
      cta: "Pide presupuesto de transporte",
    },
  },
  about: {
    workStyle: {
      eyebrow: "02 / CÓMO TRABAJAMOS",
      title: "Colaboraciones basadas en la comunicación y en cumplir lo acordado.",
      paragraphs: [
        "En el transporte por carretera, la disponibilidad de camiones, el cumplimiento de los plazos y la comunicación entre las partes son fundamentales.",
        "Por eso cuidamos cada fase: desde comprobar la disponibilidad y confirmar las condiciones del transporte hasta la comunicación durante el porte.",
        "Trabajamos tanto con clientes que piden transportes puntuales como con empresas que necesitan portes regulares.",
        "Buscamos colaboraciones a largo plazo, basadas en condiciones claras y en cumplir los compromisos asumidos.",
      ],
    },
  },
};
