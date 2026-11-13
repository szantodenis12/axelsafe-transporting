/**
 * LEGAL PAGES (ES): privacy + cookies translated from ./ro.ts (13.11.2026); terms are still the earlier structural draft.
 * Not final legal text. Every unconfirmed item is marked "[por confirmar]" in the visible copy.
 * Verified identifiers come from companyData; nothing here asserts facts that are not in that file.
 * Section `id`s are identical to en.ts / ro.ts.
 */
import { factL } from "@/content/facts";
import { companyData, fact } from "@/content/companyData";
import type { LegalDoc } from "./en";

const office = factL("registeredOffice", "es");
const legalName = fact("legalName");
const addressLine = `${office.street}, ${office.postalCode} ${office.city}, ${office.county}, ${office.country}`;
const TBC = "[por confirmar]";
const UPDATED = "13.11.2026";

const controllerTable = [
  ["Responsable del tratamiento", legalName],
  ["Domicilio social", addressLine],
  ["N.º de registro mercantil", fact("registrationNumber")],
  ["Código fiscal / IVA", fact("vatNumber")],
  ["Correo electrónico para datos personales", companyData.email.value],
] as const;

export const privacyPolicy: LegalDoc = {
  key: "privacy",
  eyebrow: "LEGAL / PRIVACIDAD",
  title: "Política de privacidad",
  description: `Qué datos personales recoge ${legalName} a través de esta web, para qué, cuánto tiempo los conserva y qué derechos tienes, conforme al Reglamento (UE) 2016/679 (RGPD).`,
  status: `Última actualización: ${UPDATED}`,
  sections: [
    {
      id: "controller",
      title: "Quiénes somos",
      blocks: [
        {
          type: "p",
          text: `${legalName} («AXEL SAFE TRANSPORTING», «nosotros») es el responsable de los datos personales que nos envías a través de esta web. Organizamos transporte de mercancías por carretera con transportistas independientes.`,
        },
        { type: "table", rows: controllerTable },
        {
          type: "p",
          text: "No hemos designado un delegado de protección de datos (DPD). Para cualquier pregunta sobre tus datos, escríbenos a la dirección de correo electrónico indicada arriba.",
        },
      ],
    },
    {
      id: "data-we-collect",
      title: "Qué datos recogemos",
      blocks: [
        { type: "p", text: "Solo recogemos los datos que nos envías tú: a través de los formularios de la web, por correo electrónico, por teléfono o por WhatsApp." },
        {
          type: "list",
          items: [
            "Solicitud completa de transporte: nombre de la empresa, persona de contacto, correo electrónico, número de teléfono, lugar de carga y de entrega, descripción de la mercancía, peso y dimensiones aproximados, fechas deseadas y otros requisitos.",
            "Solicitud rápida: nombre, teléfono, lugar de carga, destino e información adicional.",
            "Solicitud de llamada: nombre, teléfono y franja horaria en la que prefieres que te llamemos.",
            "Formulario para transportistas: nombre de la empresa, código fiscal, persona de contacto, correo electrónico, teléfono, país de registro, número y tipos de vehículos, zonas y rutas en las que trabajas, número de licencia de transporte, si tienes seguro CMR en vigor y cualquier otra información que decidas darnos.",
            "Datos técnicos enviados con el formulario: la página desde la que enviaste la solicitud, los parámetros de campaña del enlace (UTM), el idioma de la web, el tipo de navegador, la fecha y hora en que diste tu consentimiento y una huella cifrada (hash) de la dirección IP. No guardamos la dirección IP en claro.",
            "Registros del servidor: el proveedor que aloja la web puede registrar, por seguridad y funcionamiento, la dirección IP y la hora de acceso.",
          ],
        },
        {
          type: "p",
          text: "Si eres transportista, también consultamos información pública sobre tu empresa (por ejemplo, en la base de datos de la administración tributaria rumana, ANAF) y, antes del primer porte, confirmamos el seguro CMR directamente con la aseguradora.",
        },
        { type: "p", text: "Te pedimos que no nos envíes datos sensibles por los formularios, por ejemplo datos de salud. Los formularios son para solicitudes de transporte entre empresas." },
      ],
    },
    {
      id: "purposes",
      title: "Para qué usamos los datos y con qué base jurídica",
      blocks: [
        {
          type: "table",
          rows: [
            ["Responder a tu solicitud y enviarte una oferta", "Medidas precontractuales aplicadas a petición tuya (art. 6.1.b RGPD) y nuestro interés legítimo en responder a las solicitudes de empresas (art. 6.1.f)"],
            ["Llamarte, si nos lo has pedido", "Medidas precontractuales aplicadas a petición tuya (art. 6.1.b)"],
            ["Evaluar y verificar una colaboración con tu empresa de transporte", "Medidas precontractuales (art. 6.1.b) y nuestro interés legítimo en trabajar solo con transportistas verificados (art. 6.1.f)"],
            ["Organizar y coordinar un porte confirmado", "Ejecución del contrato (art. 6.1.b)"],
            ["Llevar la contabilidad y cumplir las obligaciones fiscales", "Obligación legal (art. 6.1.c), conforme a la legislación rumana"],
            ["Saber desde qué páginas y campañas llegan las solicitudes", "Interés legítimo (art. 6.1.f)"],
            ["Proteger la web frente a abusos y envíos automatizados", "Interés legítimo (art. 6.1.f)"],
          ],
        },
        {
          type: "p",
          text: "No te enviamos boletines ni correos comerciales con los datos de los formularios. No tomamos decisiones automatizadas que produzcan efectos jurídicos sobre ti.",
        },
      ],
    },
    {
      id: "recipients",
      title: "Quién más ve los datos",
      blocks: [
        { type: "p", text: "Tus solicitudes las ven las personas del equipo de AXEL SAFE TRANSPORTING que se encargan de ellas. Fuera del equipo, solo las compartimos en la medida necesaria:" },
        {
          type: "list",
          items: [
            "Con el transportista que hace el porte: solo los datos de contacto y los detalles necesarios para la carga y la entrega, después de que hayas confirmado el transporte.",
            "Con nuestros proveedores técnicos: la empresa que aloja la web, el proveedor de la base de datos donde se guardan las solicitudes y el servicio de correo con el que avisamos al equipo de una nueva solicitud. Solo actúan siguiendo nuestras instrucciones y en virtud de un contrato.",
            "Con el contable, el abogado o las autoridades públicas, cuando la ley nos obliga.",
          ],
        },
        {
          type: "p",
          text: "Si nos escribes por WhatsApp, los mensajes pasan por el servicio de WhatsApp (Meta Platforms), conforme a sus propias normas de privacidad.",
        },
        { type: "p", text: "No vendemos ni alquilamos tus datos a nadie." },
      ],
    },
    {
      id: "transfers",
      title: "Transferencias fuera de la UE/EEE",
      blocks: [
        {
          type: "p",
          text: "Algunos proveedores técnicos pueden tener servidores o personal fuera del Espacio Económico Europeo. En ese caso, la transferencia solo se hace sobre la base de una decisión de adecuación de la Comisión Europea (por ejemplo, el Marco de Privacidad de Datos UE-EE. UU.) o de las cláusulas contractuales tipo aprobadas por la Comisión. Puedes pedirnos una copia de las garantías aplicables.",
        },
      ],
    },
    {
      id: "retention",
      title: "Cuánto tiempo conservamos los datos",
      blocks: [
        {
          type: "list",
          items: [
            "Solicitudes que no terminan en un porte ni en una colaboración: 12 meses desde el último contacto; después las borramos.",
            "Solicitudes que terminan en un porte o en una colaboración: mientras dure la colaboración y 3 años más, que es el plazo general de prescripción para posibles reclamaciones.",
            "Documentos contables y fiscales: el tiempo que exige la legislación contable y fiscal rumana.",
            "Registros del servidor: un periodo corto, fijado por el proveedor de alojamiento.",
          ],
        },
      ],
    },
    {
      id: "rights",
      title: "Tus derechos",
      blocks: [
        { type: "p", text: "Conforme al RGPD, tienes derecho a:" },
        {
          type: "list",
          items: [
            "saber qué datos tenemos sobre ti y recibir una copia;",
            "pedirnos que corrijamos los datos incorrectos o que los completemos;",
            "pedirnos que borremos los datos, cuando ya no tengamos un motivo legal para conservarlos;",
            "pedirnos que limitemos su uso, en los casos del art. 18 RGPD;",
            "recibir los datos que nos has dado en un formato fácil de transferir, cuando los usamos en base a un contrato o a tu consentimiento;",
            "oponerte en cualquier momento al uso de los datos basado en nuestro interés legítimo;",
            "retirar tu consentimiento en cualquier momento, cuando el uso de los datos se basa en el consentimiento, sin que afecte a lo hecho antes.",
          ],
        },
        {
          type: "p",
          text: "Para ejercer estos derechos, escríbenos a la dirección de correo electrónico de la sección 1. La respuesta es gratuita y la recibes en un plazo máximo de un mes. Para solicitudes complejas, el plazo puede ampliarse dos meses más, pero te avisaremos. Podemos pedirte que confirmes tu identidad.",
        },
        {
          type: "p",
          text: "Si no estás conforme con cómo usamos tus datos, puedes presentar una reclamación ante la autoridad de control rumana, Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, 010336 Bucarest, Rumanía, www.dataprotection.ro. También puedes dirigirte a la autoridad de protección de datos del país de la UE en el que vives o trabajas (en España, la Agencia Española de Protección de Datos).",
        },
      ],
    },
    {
      id: "security",
      title: "Cómo protegemos los datos",
      blocks: [
        {
          type: "list",
          items: [
            "La web usa una conexión cifrada (HTTPS).",
            "La dirección IP no se guarda en claro, solo como huella cifrada.",
            "A las solicitudes solo acceden las personas que se encargan de ellas, cada una con su propio usuario y contraseña.",
            "Limitamos el número de envíos por los formularios para frenar los abusos.",
          ],
        },
        { type: "p", text: "Ninguna transmisión por internet es 100 % segura, pero aplicamos las medidas adecuadas a los riesgos reales." },
      ],
    },
    {
      id: "changes",
      title: "Cambios",
      blocks: [
        {
          type: "p",
          text: "Podemos actualizar esta política cuando cambiemos la forma en que usamos los datos o cuando cambie la ley. La versión vigente está siempre en esta página, con la fecha de la última actualización arriba.",
        },
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  key: "cookies",
  eyebrow: "LEGAL / COOKIES",
  title: "Política de cookies",
  description: `Qué cookies usa la web de ${legalName} y por qué no te mostramos un banner de cookies.`,
  status: `Última actualización: ${UPDATED}`,
  sections: [
    {
      id: "what-are-cookies",
      title: "Qué son las cookies",
      blocks: [
        {
          type: "p",
          text: "Las cookies son pequeños archivos que una web guarda en tu navegador. Las tecnologías parecidas, como el almacenamiento local (local storage), hacen más o menos lo mismo. Esta página las cubre todas.",
        },
      ],
    },
    {
      id: "cookies-we-use",
      title: "Qué cookies usa esta web",
      blocks: [
        {
          type: "p",
          text: "En resumen: ninguna para los visitantes. Las páginas públicas de la web no guardan cookies ni usan el almacenamiento local de tu navegador. Por eso no te mostramos un banner de cookies.",
        },
        { type: "p", text: "No usamos cookies de analítica, de publicidad ni de redes sociales, y no te seguimos de una web a otra." },
        {
          type: "table",
          rows: [
            [
              "axel_admin_session (solo para el equipo)",
              "Solo se guarda cuando una persona de AXEL SAFE TRANSPORTING entra en la zona interna de administración. Mantiene la sesión abierta un máximo de 12 horas y se borra al cerrar sesión. Es estrictamente necesaria, por lo que no requiere consentimiento (art. 4, apartado 5, de la Ley rumana n.º 506/2004). Los visitantes de la web no la reciben.",
            ],
            ["Protección de los formularios", "Se hace en el servidor, sin cookies en tu navegador."],
            ["Fuentes tipográficas", "Las cargamos desde nuestro propio servidor, no desde Google, así que abrir la página no envía datos a Google Fonts."],
            ["Botón de WhatsApp", "Es solo un enlace. WhatsApp puede instalar cookies solo después de que hagas clic y llegues a su web o a su aplicación, conforme a las normas de WhatsApp."],
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "Si añadimos cookies opcionales",
      blocks: [
        {
          type: "p",
          text: "En el futuro podríamos usar herramientas de analítica o de publicidad, por ejemplo para ver qué campañas traen solicitudes. Antes de activarlas:",
        },
        {
          type: "list",
          items: [
            "te pediremos el consentimiento mediante un banner, y las cookies opcionales solo se activarán si aceptas;",
            "podrás rechazarlas con la misma facilidad con la que las aceptas y retirar el consentimiento en cualquier momento;",
            "actualizaremos esta página con la lista exacta de cookies, su función y cuánto tiempo permanecen en el navegador.",
          ],
        },
      ],
    },
    {
      id: "managing",
      title: "Cómo controlar las cookies",
      blocks: [
        {
          type: "p",
          text: "Puedes ver, bloquear o borrar las cookies desde la configuración del navegador. Chrome, Firefox, Safari y Edge tienen páginas de ayuda que explican exactamente cómo. En esta web, bloquear las cookies no cambia nada para ti, porque las páginas públicas no las usan.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contacto",
      blocks: [
        { type: "p", text: `Para preguntas sobre cookies, escríbenos a ${companyData.email.value} o a la dirección de ${legalName}, ${addressLine}.` },
        { type: "p", text: "Sobre cómo usamos los datos personales en general, tienes los detalles en la Política de privacidad." },
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
