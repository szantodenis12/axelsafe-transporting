import type { PageExtras } from "./extras";

/** Page sections added 13.11.2026 (Roland's texts) that sit outside the Dictionary shape. Same shape in en/es. */
export const roExtra: PageExtras = {
  contact: { officeHeading: "Birou", transportHeading: "Transport și dispecerat" },
  vetting: {
    checkTitles: [
      "Înregistrarea companiei și licența de transport",
      "Asigurarea CMR",
      "Documentele vehiculului",
      "Situația juridică a transportatorului",
    ],
  },
  howWeWork: {
    finalCta: {
      titleLines: ["Ai un transport de organizat?", "Trimite-ne detaliile."],
      text: "Spune-ne ce marfă trebuie transportată, ruta și perioada în care ai nevoie de camion. Verificăm disponibilitatea transportatorilor din rețeaua noastră și revenim cu o ofertă.",
      cta: "Solicită o ofertă de transport",
    },
  },
  about: {
    workStyle: {
      eyebrow: "02 / MODUL NOSTRU DE LUCRU",
      title: "Colaborări bazate pe comunicare și respectarea angajamentelor.",
      paragraphs: [
        "În transportul rutier, disponibilitatea camioanelor, respectarea termenelor și comunicarea dintre părți sunt esențiale.",
        "De aceea, acordăm atenție fiecărei etape: de la verificarea disponibilității și confirmarea condițiilor de transport până la comunicarea pe durata cursei.",
        "Lucrăm atât cu clienți care solicită transporturi ocazionale, cât și cu firme care au nevoie de curse regulate.",
        "Ne dorim colaborări pe termen lung, bazate pe condiții clare și pe respectarea angajamentelor asumate.",
      ],
    },
  },
};
