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
      { title: "Semiremorcă cu prelată (Tautliner)", short: "Prelată", text: "Utilizată pentru transportul mărfurilor generale și paletizate. Permite încărcarea din lateral, prin spate sau de sus." },
      { title: "Semiremorcă frigorifică", short: "Frigorific", text: "Utilizată pentru transportul mărfurilor care necesită temperatură controlată. Verificăm disponibilitatea echipamentului și condițiile de temperatură solicitate înainte de confirmarea cursei." },
      { title: "Semiremorcă Mega", short: "Mega", text: "Utilizată pentru mărfuri care necesită o înălțime interioară mai mare decât cea a unei semiremorci standard. Dimensiunile și capacitatea de încărcare sunt confirmate în funcție de vehiculul disponibil." },
    ],
    coverage: ["Toată Europa", "Marea Britanie"],
    businessHours: "24/7",
    responseTime: "De regulă, răspundem solicitărilor în mai puțin de o oră.",
    languages: ["română", "engleză", "spaniolă"],
    caen: "4941, Transporturi rutiere de mărfuri",
    registeredOffice: { ...office, county: "județul Mureș", country: "România" },
    carrierVerification: [
      "Înregistrarea legală a companiei și licența comunitară de transport.",
      "Asigurarea CMR valabilă, confirmată cu asigurătorul.",
      "Documentele vehiculelor și semiremorcilor.",
      "Situația juridică a companiei, inclusiv verificarea insolvenței.",
    ],
    carrierConditions: [
      { title: "Condiții agreate pentru fiecare transport", text: "Tariful, intervalul de încărcare și documentele se confirmă în scris înainte de fiecare transport." },
      { title: "Termen de plată", text: "Termenul de plată se agreează în scris înainte de fiecare transport." },
      { title: "O persoană de contact clară", text: "Un coordonator pentru fiecare transport, de la încărcare până la confirmarea livrării." },
    ],
    carrierBenefits: [
      { title: "Acces la solicitări de transport", text: "Organizăm aproximativ 100 de curse lunar, cu activitate frecventă pe relația România–Spania." },
      { title: "Condiții comerciale confirmate în scris", text: "Tarifele, termenele de plată și cerințele operaționale sunt stabilite înainte de confirmarea fiecărei curse." },
      { title: "Coordonare dedicată", text: "Ai un punct de contact pentru informațiile necesare desfășurării transportului, de la încărcare până la confirmarea livrării." },
      { title: "Dispecerat 24/7", text: "Echipa noastră este disponibilă permanent pentru comunicare și coordonare." },
      { title: "Colaborare pe termen lung", text: "Căutăm parteneri cu care putem dezvolta relații comerciale stabile, în funcție de capacitate, rute și solicitările disponibile." },
    ],
    carrierOffer: [],
    stats: [
      { value: "~100", label: "curse organizate pe lună" },
      { value: "30+", label: "transportatori parteneri independenți" },
      { value: "< 1 h", label: "timp obișnuit până la primul răspuns" },
    ],
    equipmentSpecs: { ...specs, refrigerated: { ...specs.refrigerated, temperature: "între −25 °C și +25 °C" } },
  },
  es: {
    transportTypes: [
      { title: "Semirremolque de lona (tautliner)", short: "Lona", text: "Para mercancía general y paletizada. Permite cargar por el lateral, por detrás o por arriba." },
      { title: "Semirremolque frigorífico", short: "Frigorífico", text: "Para mercancía que necesita temperatura controlada. Antes de confirmar el porte, comprobamos la disponibilidad del equipo y las condiciones de temperatura solicitadas." },
      { title: "Megatráiler", short: "Mega", text: "Para mercancía que necesita más altura interior que un semirremolque estándar. Las dimensiones y la capacidad de carga se confirman según el vehículo disponible." },
    ],
    coverage: ["Toda Europa", "Reino Unido"],
    businessHours: "24/7",
    responseTime: "Normalmente respondemos en menos de una hora.",
    languages: ["rumano", "inglés", "español"],
    caen: "4941, Transporte de mercancías por carretera",
    registeredOffice: { ...office, county: "distrito de Mureș", country: "Rumanía" },
    carrierVerification: [
      "Registro legal de la empresa y licencia comunitaria de transporte.",
      "Seguro CMR en vigor, confirmado con la aseguradora.",
      "Documentación de los vehículos y semirremolques.",
      "Situación jurídica de la empresa, incluida la comprobación de insolvencia.",
    ],
    carrierConditions: [
      { title: "Condiciones acordadas en cada transporte", text: "La tarifa, la franja de carga y los documentos se confirman por escrito antes de cada transporte." },
      { title: "Plazo de pago", text: "El plazo de pago se acuerda por escrito antes de cada transporte." },
      { title: "Un interlocutor claro", text: "Un coordinador para cada transporte, desde la carga hasta la confirmación de la entrega." },
    ],
    carrierBenefits: [
      { title: "Acceso a solicitudes de transporte", text: "Organizamos unos 100 portes al mes, con actividad frecuente en la ruta Rumanía–España." },
      { title: "Condiciones comerciales confirmadas por escrito", text: "Las tarifas, los plazos de pago y los requisitos operativos se fijan antes de confirmar cada porte." },
      { title: "Coordinación dedicada", text: "Tienes un interlocutor para la información que necesitas durante el transporte, desde la carga hasta la confirmación de la entrega." },
      { title: "Tráfico 24/7", text: "Nuestro equipo está disponible en todo momento para comunicación y coordinación." },
      { title: "Colaboración a largo plazo", text: "Buscamos colaboradores con los que construir relaciones comerciales estables, según la capacidad, las rutas y las solicitudes disponibles." },
    ],
    carrierOffer: [],
    stats: [
      { value: "~100", label: "portes organizados al mes" },
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
