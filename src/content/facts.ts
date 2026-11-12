/**
 * Locale-aware display values for companyData facts.
 * The FACT (and its verified / [PLACEHOLDER] status) lives in companyData.ts;
 * this file only translates how a fact is written in RO / ES. Keep values 1:1 with companyData.
 */
import { companyData, type CompanyData } from "./companyData";

type Lang = "en" | "ro" | "es";
type Overridable = Pick<
  { [K in keyof CompanyData]: CompanyData[K]["value"] },
  | "transportTypes"
  | "coverage"
  | "businessHours"
  | "responseTime"
  | "languages"
  | "caen"
  | "registeredOffice"
  | "carrierVerification"
  | "carrierConditions"
  | "carrierBenefits"
  | "carrierOffer"
  | "stats"
  | "equipmentSpecs"
>;

const office = companyData.registeredOffice.value;
const specs = companyData.equipmentSpecs.value;

const overrides: Record<Exclude<Lang, "en">, Partial<{ [K in keyof Overridable]: unknown }>> = {
  ro: {
    transportTypes: [
      { title: "Semiremorci cu prelată", short: "Prelată", text: "Pentru marfă paletizată și generală, cu încărcare laterală, din spate sau de sus." },
      { title: "Semiremorci frigorifice", short: "Frigorific", text: "Transport cu temperatură controlată pentru mărfuri care trebuie păstrate într-un anumit interval de temperatură." },
      { title: "Semiremorci mega", short: "Mega", text: "Înălțime interioară mărită, pentru mărfuri voluminoase și ușoare." },
    ],
    coverage: ["Toată Europa", "Marea Britanie"],
    businessHours: "Non-stop, 24/7",
    responseTime: "De obicei răspundem în mai puțin de o oră.",
    languages: ["română", "engleză", "spaniolă"],
    caen: "Transporturi rutiere de mărfuri, CAEN 4941",
    registeredOffice: { ...office, county: "jud. Mureș", country: "România" },
    carrierVerification: [
      "Înregistrare valabilă a firmei și licență comunitară UE",
      "Asigurare CMR activă, confirmată la asigurator",
      "Documentele vehiculului și ale semiremorcii, corespunzătoare echipamentului solicitat",
      "Verificarea stării firmei (fără insolvență)",
    ],
    carrierConditions: [
      { title: "Condiții agreate pentru fiecare transport", text: "Tariful, intervalul de încărcare și documentele se confirmă în scris înainte de fiecare transport." },
      { title: "Termen de plată", text: "Termenul de plată se agreează în scris înainte de fiecare transport." },
      { title: "O persoană de contact clară", text: "Un coordonator pentru fiecare transport, de la încărcare până la confirmarea livrării." },
    ],
    carrierBenefits: [
      { title: "Dispecerat disponibil 24/7", text: "Dispeceratul nostru răspunde non-stop, în fiecare zi a săptămânii." },
      { title: "Aproximativ 100 de curse pe lună", text: "Curse în toată Europa și în Marea Britanie, cele mai multe pe ruta România–Spania." },
      { title: "Termen de plată în scris", text: "Termenul de plată se agreează în scris înainte de fiecare transport." },
      { title: "Un coordonator pentru fiecare cursă", text: "Aceeași persoană urmărește cursa de la încărcare până la confirmarea livrării." },
    ],
    carrierOffer: [{ title: "Comandă de transport în scris", text: "Pentru fiecare cursă primiți o comandă de transport scrisă." }],
    stats: [
      { value: "~100", label: "curse organizate pe lună" },
      { value: "30+", label: "transportatori parteneri independenți" },
      { value: "< 1 h", label: "timp obișnuit până la primul răspuns" },
    ],
    equipmentSpecs: { ...specs, refrigerated: { ...specs.refrigerated, temperature: "între −25 °C și +25 °C" } },
  },
  es: {
    transportTypes: [
      { title: "Semirremolques de lona", short: "Lona", text: "Para carga paletizada y general, con carga lateral, trasera o superior." },
      { title: "Semirremolques frigoríficos", short: "Frigorífico", text: "Transporte a temperatura controlada para mercancías que deben mantenerse dentro de un rango de temperatura determinado." },
      { title: "Megatráileres", short: "Mega", text: "Mayor altura interior para cargas voluminosas y ligeras." },
    ],
    coverage: ["Toda Europa", "Reino Unido"],
    businessHours: "24/7, todos los días",
    responseTime: "Normalmente respondemos en menos de una hora.",
    languages: ["rumano", "inglés", "español"],
    caen: "Transporte de mercancías por carretera, CAEN 4941",
    registeredOffice: { ...office, county: "distrito de Mureș", country: "Rumanía" },
    carrierVerification: [
      "Registro mercantil vigente y licencia comunitaria UE",
      "Seguro CMR en vigor, confirmado con la aseguradora",
      "Documentación del vehículo y del semirremolque acorde con el equipo solicitado",
      "Comprobación de la situación de la empresa (sin insolvencia)",
    ],
    carrierConditions: [
      { title: "Condiciones acordadas en cada envío", text: "Tarifa, ventana de carga y documentación se confirman por escrito antes de cada transporte." },
      { title: "Plazo de pago", text: "El plazo de pago se acuerda por escrito antes de cada transporte." },
      { title: "Un interlocutor claro", text: "Un coordinador para cada envío, desde la carga hasta la prueba de entrega." },
    ],
    carrierBenefits: [
      { title: "Tráfico localizable 24/7", text: "Nuestro equipo de tráfico responde a cualquier hora, todos los días de la semana." },
      { title: "Unos 100 envíos al mes", text: "Cargas por toda Europa y el Reino Unido, la mayoría en la ruta Rumanía–España." },
      { title: "Plazo de pago por escrito", text: "El plazo de pago se acuerda por escrito antes de cada transporte." },
      { title: "Un coordinador por envío", text: "Una misma persona sigue el envío desde la carga hasta la prueba de entrega." },
    ],
    carrierOffer: [{ title: "Orden de carga por escrito", text: "Cada envío va acompañado de una orden de carga por escrito." }],
    stats: [
      { value: "~100", label: "envíos organizados al mes" },
      { value: "30+", label: "transportistas colaboradores independientes" },
      { value: "< 1 h", label: "tiempo habitual de primera respuesta" },
    ],
    equipmentSpecs: { ...specs, refrigerated: { ...specs.refrigerated, temperature: "de −25 °C a +25 °C" } },
  },
};

/** Fact value written for the given locale (falls back to the companyData value). */
export function factL<K extends keyof Overridable>(key: K, locale: string): Overridable[K] {
  const o = locale === "ro" || locale === "es" ? overrides[locale][key] : undefined;
  return (o ?? companyData[key].value) as Overridable[K];
}
