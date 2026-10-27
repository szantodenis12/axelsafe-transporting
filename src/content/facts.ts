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
  | "caen"
  | "registeredOffice"
  | "carrierVerification"
  | "carrierConditions"
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
    coverage: ["Toată Europa"],
    businessHours: "Luni-vineri, 08:00-17:00",
    responseTime: "în cel mult 2 ore lucrătoare",
    caen: "Transporturi rutiere de mărfuri, CAEN 4941",
    registeredOffice: { ...office, county: "jud. Mureș", country: "România" },
    carrierVerification: [
      "Înregistrare valabilă a firmei și licență comunitară UE",
      "Dovada asigurării CMR active",
      "Documentele vehiculului și ale semiremorcii, corespunzătoare echipamentului solicitat",
      "Referințe sau colaborări anterioare",
    ],
    carrierConditions: [
      { title: "Condiții agreate pentru fiecare transport", text: "Tariful, intervalul de încărcare și documentele se confirmă în scris înainte de fiecare transport." },
      { title: "Termen de plată", text: "Plata în 30 de zile de la primirea facturii și a CMR-ului semnat." },
      { title: "O persoană de contact clară", text: "Un coordonator pentru fiecare transport, de la încărcare până la confirmarea livrării." },
    ],
    stats: [
      { value: "150+", label: "transportatori parteneri independenți" },
      { value: "2 h", label: "timp obișnuit până la primul răspuns" },
    ],
    equipmentSpecs: { ...specs, refrigerated: { ...specs.refrigerated, temperature: "între −25 °C și +25 °C" } },
  },
  es: {
    transportTypes: [
      { title: "Semirremolques de lona", short: "Lona", text: "Para carga paletizada y general, con carga lateral, trasera o superior." },
      { title: "Semirremolques frigoríficos", short: "Frigorífico", text: "Transporte a temperatura controlada para mercancías que deben mantenerse dentro de un rango de temperatura determinado." },
      { title: "Megatráileres", short: "Mega", text: "Mayor altura interior para cargas voluminosas y ligeras." },
    ],
    coverage: ["Toda Europa"],
    businessHours: "Lunes a viernes, 08:00 – 17:00 (EET)",
    responseTime: "en un plazo de 2 horas laborables",
    caen: "Transporte de mercancías por carretera, CAEN 4941",
    registeredOffice: { ...office, county: "distrito de Mureș", country: "Rumanía" },
    carrierVerification: [
      "Registro mercantil vigente y licencia comunitaria UE",
      "Justificante de seguro CMR en vigor",
      "Documentación del vehículo y del semirremolque acorde con el equipo solicitado",
      "Referencias o historial de colaboración previo",
    ],
    carrierConditions: [
      { title: "Condiciones acordadas en cada envío", text: "Tarifa, ventana de carga y documentación se confirman por escrito antes de cada transporte." },
      { title: "Plazo de pago", text: "Pago a 30 días desde la recepción de la factura y del CMR firmado." },
      { title: "Un interlocutor claro", text: "Un coordinador para cada envío, desde la carga hasta la prueba de entrega." },
    ],
    stats: [
      { value: "150+", label: "transportistas colaboradores independientes" },
      { value: "2 h", label: "tiempo habitual de primera respuesta" },
    ],
    equipmentSpecs: { ...specs, refrigerated: { ...specs.refrigerated, temperature: "de −25 °C a +25 °C" } },
  },
};

/** Fact value written for the given locale (falls back to the companyData value). */
export function factL<K extends keyof Overridable>(key: K, locale: string): Overridable[K] {
  const o = locale === "ro" || locale === "es" ? overrides[locale][key] : undefined;
  return (o ?? companyData[key].value) as Overridable[K];
}
