/**
 * LEGAL PAGES (ES) — STRUCTURAL DRAFTS for professional legal review, translated from ./en.ts.
 * Not final legal text. Every unconfirmed item is marked "[por confirmar]" in the visible copy.
 * Verified identifiers come from companyData; nothing here asserts facts that are not in that file.
 */
import { factL } from "@/content/facts";
import { companyData, fact } from "@/content/companyData";
import type { LegalDoc } from "./en";

const office = factL("registeredOffice", "es");
const legalName = fact("legalName");
const addressLine = `${office.street}, ${office.postalCode} ${office.city}, ${office.county}, ${office.country}`;
const TBC = "[por confirmar]";

const controllerTable = [
  ["Responsable del tratamiento", legalName],
  ["Domicilio social", addressLine],
  ["N.º de registro mercantil", fact("registrationNumber")],
  ["N.º de IVA / Código fiscal", fact("vatNumber")],
  ["Contacto para protección de datos", companyData.email.value],
] as const;

export const privacyPolicy: LegalDoc = {
  key: "privacy",
  eyebrow: "LEGAL / PRIVACIDAD",
  title: "Política de privacidad",
  description: `Cómo trata ${legalName} los datos personales recogidos a través de este sitio web, de conformidad con el Reglamento (UE) 2016/679 (RGPD).`,
  status: `Versión: borrador para revisión jurídica · Última actualización: ${TBC}`,
  sections: [
    {
      id: "controller",
      title: "Quiénes somos",
      blocks: [
        {
          type: "p",
          text: `${legalName} («AXEL SAFE TRANSPORTING», «nosotros») es el responsable del tratamiento de los datos personales tratados a través de este sitio web. Somos una empresa rumana que organiza el transporte de mercancías por carretera a través de transportistas independientes.`,
        },
        { type: "table", rows: controllerTable },
        {
          type: "p",
          text: `No se ha designado un delegado de protección de datos ${TBC}. Las preguntas sobre esta política pueden enviarse a la dirección de contacto indicada más arriba.`,
        },
      ],
    },
    {
      id: "data-we-collect",
      title: "Qué datos personales recogemos",
      blocks: [
        { type: "p", text: "Recogemos datos personales únicamente cuando usted nos los facilita, principalmente a través de los dos formularios de solicitud de este sitio web." },
        {
          type: "list",
          items: [
            "Formulario de solicitud de presupuesto de transporte: nombre de la empresa, persona de contacto, correo electrónico de empresa, número de teléfono, lugares de recogida y entrega, descripción de la carga, peso aproximado o unidades de carga, fechas preferidas y cualquier requisito adicional que indique.",
            "Formulario de colaboración para transportistas: nombre de la empresa, persona de contacto, correo electrónico de empresa, número de teléfono, país de registro, número de vehículos, tipos de vehículo, zonas de operación o rutas preferidas y cualquier información adicional que indique.",
            "Correspondencia directa: los datos que incluya cuando nos escriba por correo electrónico o nos llame.",
            `Datos técnicos: registros del servidor (dirección IP, tipo de navegador, hora de la solicitud) conservados por nuestro proveedor de alojamiento con fines de seguridad y funcionamiento ${TBC}.`,
          ],
        },
        { type: "p", text: "Le rogamos que no incluya categorías especiales de datos personales (como datos de salud) en los campos de texto libre; los formularios están destinados a solicitudes de transporte entre empresas." },
      ],
    },
    {
      id: "purposes",
      title: "Para qué los tratamos y con qué base jurídica",
      blocks: [
        {
          type: "table",
          rows: [
            ["Responder a una solicitud de transporte y preparar una oferta", "Medidas precontractuales (art. 6.1.b RGPD) y nuestro interés legítimo en gestionar solicitudes comerciales (art. 6.1.f)"],
            ["Evaluar una posible colaboración con un transportista", "Medidas precontractuales (art. 6.1.b) e interés legítimo (art. 6.1.f)"],
            ["Coordinar un transporte confirmado con las partes implicadas", "Ejecución de un contrato (art. 6.1.b)"],
            ["Llevar los registros contables y fiscales", "Obligación legal (art. 6.1.c) conforme a la legislación contable y fiscal rumana"],
            ["Seguridad, prevención de abusos y limitación de envíos en los formularios", "Interés legítimo (art. 6.1.f)"],
            ["Cookies analíticas, si se configuran y cuando se configuren", "Consentimiento (art. 6.1.a) — véase la Política de cookies"],
          ],
        },
        { type: "p", text: "No utilizamos los datos de los formularios para correos comerciales ni boletines, y no tomamos decisiones automatizadas que produzcan efectos jurídicos sobre usted." },
      ],
    },
    {
      id: "recipients",
      title: "Quién recibe los datos",
      blocks: [
        { type: "p", text: "Los datos personales se comparten únicamente en la medida necesaria para los fines indicados más arriba." },
        {
          type: "list",
          items: [
            "Transportistas independientes: los datos de contacto y del envío necesarios para organizar un transporte confirmado.",
            `Proveedor de alojamiento e infraestructura del sitio web: ${TBC}`,
            `Servicio de formularios y base de datos utilizado para almacenar las solicitudes: ${TBC}`,
            `Servicio de correo electrónico utilizado para avisar a nuestro equipo de nuevas solicitudes: ${TBC}`,
            "Asesores profesionales (contables, abogados) y autoridades públicas cuando la ley lo exija.",
          ],
        },
        { type: "p", text: "Los proveedores de servicios actúan como encargados del tratamiento en virtud de contratos escritos y solo pueden tratar los datos siguiendo nuestras instrucciones." },
      ],
    },
    {
      id: "transfers",
      title: "Transferencias fuera de la UE/EEE",
      blocks: [
        {
          type: "p",
          text: `Nuestros proveedores de servicios pueden almacenar los datos o acceder a ellos fuera del Espacio Económico Europeo ${TBC}. Cuando esto ocurre, nos basamos en una decisión de adecuación de la Comisión Europea o en cláusulas contractuales tipo, y usted puede solicitar una copia de las garantías correspondientes.`,
        },
      ],
    },
    {
      id: "retention",
      title: "Durante cuánto tiempo los conservamos",
      blocks: [
        {
          type: "list",
          items: [
            `Solicitudes que no dan lugar a un contrato: ${TBC} (propuesta: 12 meses desde el último contacto).`,
            `Solicitudes que dan lugar a un transporte o a una colaboración: mientras dure la relación comercial y, después, durante el tiempo necesario para la defensa de reclamaciones legales ${TBC}.`,
            "Documentos contables: 10 años, conforme a la legislación rumana.",
            `Registros del servidor: ${TBC} (establecido por el proveedor de alojamiento).`,
          ],
        },
      ],
    },
    {
      id: "rights",
      title: "Sus derechos",
      blocks: [
        { type: "p", text: "En virtud del RGPD, como interesado tiene derecho a:" },
        {
          type: "list",
          items: [
            "acceder a los datos personales que tratamos sobre usted;",
            "obtener la rectificación de los datos inexactos y que se completen los datos incompletos;",
            "solicitar la supresión, cuando no exista una base jurídica para seguir tratándolos;",
            "solicitar la limitación del tratamiento en los supuestos previstos en el art. 18 RGPD;",
            "recibir los datos que nos haya facilitado en un formato portable, cuando el tratamiento se base en un contrato o en el consentimiento;",
            "oponerse al tratamiento basado en nuestros intereses legítimos;",
            "retirar el consentimiento en cualquier momento, cuando el tratamiento se base en el consentimiento, sin que ello afecte a la licitud del tratamiento anterior.",
          ],
        },
        {
          type: "p",
          text: "Para ejercer estos derechos, contáctenos a través de los datos indicados en la sección 1. Respondemos en el plazo de un mes, prorrogable otros dos meses en el caso de solicitudes complejas, y podemos pedirle que acredite su identidad.",
        },
        {
          type: "p",
          text: "También tiene derecho a presentar una reclamación ante la autoridad de control rumana: Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru 28–30, Sector 1, 010336 Bucarest, Rumanía — www.dataprotection.ro.",
        },
      ],
    },
    {
      id: "security",
      title: "Seguridad",
      blocks: [
        {
          type: "p",
          text: "Aplicamos medidas técnicas y organizativas adecuadas al riesgo, entre ellas conexiones cifradas (HTTPS), acceso limitado a las personas que gestionan las solicitudes y limitación de envíos en los formularios. Ningún método de transmisión por internet es completamente seguro.",
        },
      ],
    },
    {
      id: "changes",
      title: "Cambios en esta política",
      blocks: [
        { type: "p", text: "Podemos actualizar esta política para reflejar cambios en nuestros tratamientos o en la legislación. La versión vigente se publica siempre en esta página junto con su fecha de última actualización." },
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  key: "cookies",
  eyebrow: "LEGAL / COOKIES",
  title: "Política de cookies",
  description: `Qué cookies y tecnologías similares utiliza este sitio web y cómo solicita ${legalName} el consentimiento.`,
  status: `Versión: borrador para revisión jurídica · Última actualización: ${TBC}`,
  sections: [
    {
      id: "what-are-cookies",
      title: "Qué son las cookies",
      blocks: [
        {
          type: "p",
          text: "Las cookies son pequeños archivos de texto que un sitio web almacena en su dispositivo. Otras tecnologías similares (como el almacenamiento local) pueden cumplir la misma función. Esta política abarca ambas.",
        },
      ],
    },
    {
      id: "cookies-we-use",
      title: "Cookies utilizadas actualmente en este sitio web",
      blocks: [
        {
          type: "p",
          text: "En la actualidad este sitio web solo instala cookies y almacenamiento estrictamente necesarios, imprescindibles para su funcionamiento y que no requieren su consentimiento conforme al artículo 4, apartado 5, de la Ley rumana 506/2004 y a la Directiva sobre la privacidad y las comunicaciones electrónicas.",
        },
        {
          type: "table",
          rows: [
            ["Protección de formularios", `Valores técnicos utilizados para impedir envíos automatizados y limitar la frecuencia de envío de los formularios de solicitud. Solo durante la sesión. ${TBC}`],
            ["Preferencias", `Su elección respecto a las cookies opcionales, una vez que exista un banner de consentimiento. 12 meses ${TBC}`],
          ],
        },
        { type: "p", text: "No se utilizan cookies publicitarias, de redes sociales ni de seguimiento entre sitios." },
      ],
    },
    {
      id: "analytics",
      title: "Cookies analíticas (solo tras su consentimiento)",
      blocks: [
        {
          type: "p",
          text: `Podemos incorporar herramientas de analítica respetuosas con la privacidad para entender cómo se utiliza el sitio web. Las cookies analíticas solo se instalarán después de que usted dé su consentimiento a través del banner de cookies, y podrá retirarlo en cualquier momento desde ese mismo banner. Herramienta y plazo de conservación: ${TBC}.`,
        },
      ],
    },
    {
      id: "managing",
      title: "Gestión de las cookies",
      blocks: [
        {
          type: "p",
          text: "Puede eliminar o bloquear las cookies desde la configuración de su navegador. Bloquear las cookies estrictamente necesarias puede impedir el funcionamiento de los formularios de solicitud. Las páginas de soporte de los navegadores más habituales incluyen instrucciones para hacerlo.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contacto",
      blocks: [
        { type: "p", text: `Las preguntas sobre cookies pueden dirigirse a ${legalName}, ${addressLine}, o por correo electrónico a ${companyData.email.value}.` },
        { type: "p", text: "Para saber cómo tratamos los datos personales en general, consulte la Política de privacidad." },
      ],
    },
  ],
};

export const termsOfUse: LegalDoc = {
  key: "terms",
  eyebrow: "LEGAL / CONDICIONES",
  title: "Condiciones de uso",
  description: `Las condiciones en las que ${legalName} pone a disposición este sitio web.`,
  status: `Versión: borrador para revisión jurídica · Última actualización: ${TBC}`,
  sections: [
    {
      id: "operator",
      title: "Titular del sitio web",
      blocks: [
        { type: "p", text: `Este sitio web es operado por ${legalName}, sociedad registrada en Rumanía.` },
        { type: "table", rows: controllerTable.slice(0, 4) },
      ],
    },
    {
      id: "informational",
      title: "Carácter informativo del sitio web",
      blocks: [
        {
          type: "p",
          text: "El contenido de este sitio web describe los servicios de AXEL SAFE TRANSPORTING en términos generales. Se facilita únicamente a título informativo y no constituye una oferta, un presupuesto ni un compromiso de organizar transporte alguno.",
        },
        {
          type: "p",
          text: "El envío de una solicitud a través del sitio web no da lugar a un contrato. Una operación de transporte o una colaboración con un transportista solo existe una vez que AXEL SAFE TRANSPORTING ha confirmado sus condiciones por escrito (incluido el correo electrónico).",
        },
        {
          type: "p",
          text: "AXEL SAFE TRANSPORTING organiza el transporte a través de transportistas independientes. No opera una flota propia ni realiza por sí misma el transporte de mercancías. Los derechos y obligaciones relativos a un transporte concreto se recogen en los documentos acordados para ese transporte.",
        },
      ],
    },
    {
      id: "use",
      title: "Uso aceptable",
      blocks: [
        {
          type: "list",
          items: [
            "Utilice los formularios de solicitud únicamente para solicitudes comerciales reales.",
            "No envíe información falsa, engañosa o ilícita, ni información sobre terceros sin estar autorizado para ello.",
            "No intente interferir en el funcionamiento o la seguridad del sitio web, ni acceder a él por medios automatizados más allá de la indexación habitual de los motores de búsqueda.",
          ],
        },
      ],
    },
    {
      id: "ip",
      title: "Propiedad intelectual",
      blocks: [
        {
          type: "p",
          text: `Los textos, gráficos, logotipos y fotografías de este sitio web pertenecen a ${legalName} o se utilizan bajo licencia ${TBC}. Puede consultar e imprimir las páginas para el uso propio de su empresa. Cualquier otra reproducción requiere nuestra autorización previa por escrito.`,
        },
      ],
    },
    {
      id: "liability",
      title: "Responsabilidad",
      blocks: [
        {
          type: "p",
          text: "Procuramos mantener el sitio web exacto y disponible, pero no garantizamos que esté libre de errores o interrupciones. En la medida en que la ley lo permita, AXEL SAFE TRANSPORTING no responde de los perjuicios derivados de la confianza depositada en el contenido del sitio web ni de su indisponibilidad temporal.",
        },
        { type: "p", text: "Nada de lo dispuesto en estas condiciones limita la responsabilidad que no pueda limitarse conforme a la legislación rumana." },
        { type: "p", text: "Los enlaces a sitios web de terceros se facilitan por comodidad; no somos responsables de su contenido." },
      ],
    },
    {
      id: "privacy",
      title: "Datos personales y cookies",
      blocks: [{ type: "p", text: "El tratamiento de datos personales a través de este sitio web se describe en la Política de privacidad. El uso de cookies se describe en la Política de cookies." }],
    },
    {
      id: "law",
      title: "Legislación aplicable y controversias",
      blocks: [
        {
          type: "p",
          text: `Estas condiciones se rigen por la legislación rumana. Las controversias relativas al uso de este sitio web se someten a los tribunales competentes de Rumanía ${TBC}, sin perjuicio de las normas imperativas que reconozcan a los consumidores u otras partes el derecho a un fuero distinto.`,
        },
      ],
    },
    {
      id: "changes",
      title: "Cambios",
      blocks: [{ type: "p", text: "Podemos actualizar estas condiciones periódicamente. La versión publicada en esta página se aplica desde su fecha de última actualización." }],
    },
  ],
};

export const legalDocs = { privacy: privacyPolicy, cookies: cookiePolicy, terms: termsOfUse } as const;
