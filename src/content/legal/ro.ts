/**
 * PAGINI LEGALE (RO): DRAFTURI STRUCTURALE pentru revizuire juridică de specialitate.
 * Nu sunt texte juridice finale. Fiecare element neconfirmat este marcat „[de confirmat]” în textul vizibil.
 * Identificatorii verificați vin din companyData; nimic de aici nu afirmă fapte care nu sunt în acel fișier.
 * Section `id`s are identical to en.ts.
 */
import { factL } from "@/content/facts";
import { companyData, fact } from "@/content/companyData";
import type { LegalDoc } from "./en";

const office = factL("registeredOffice", "ro");
const legalName = fact("legalName");
const addressLine = `${office.street}, ${office.postalCode} ${office.city}, ${office.county}, ${office.country}`;
const TBC = "[de confirmat]";

const controllerTable = [
  ["Operator de date", legalName],
  ["Sediul social", addressLine],
  ["Nr. Registrul Comerțului", fact("registrationNumber")],
  ["Cod fiscal / TVA", fact("vatNumber")],
  ["Contact pentru protecția datelor", companyData.email.value],
] as const;

export const privacyPolicy: LegalDoc = {
  key: "privacy",
  eyebrow: "LEGAL / CONFIDENȚIALITATE",
  title: "Politica de confidențialitate",
  description: `Cum prelucrează ${legalName} datele cu caracter personal colectate prin acest site, în conformitate cu Regulamentul (UE) 2016/679 (GDPR).`,
  status: `Versiune: draft pentru revizuire juridică · Ultima actualizare: ${TBC}`,
  sections: [
    {
      id: "controller",
      title: "Cine suntem",
      blocks: [
        {
          type: "p",
          text: `${legalName} („AXEL SAFE TRANSPORTING”, „noi”) este operatorul datelor cu caracter personal prelucrate prin acest site. Suntem o companie românească ce organizează transportul rutier de marfă prin transportatori independenți.`,
        },
        { type: "table", rows: controllerTable },
        {
          type: "p",
          text: `Nu a fost desemnat un responsabil cu protecția datelor ${TBC}. Întrebările legate de această politică pot fi trimise la adresa de contact de mai sus.`,
        },
      ],
    },
    {
      id: "data-we-collect",
      title: "Ce date cu caracter personal colectăm",
      blocks: [
        { type: "p", text: "Colectăm date cu caracter personal numai atunci când ni le furnizați, în principal prin cele două formulare de pe acest site." },
        {
          type: "list",
          items: [
            "Formularul de ofertă de transport: denumirea companiei, persoana de contact, adresa de e-mail de serviciu, numărul de telefon, locurile de încărcare și de livrare, descrierea mărfii, greutatea aproximativă sau unitățile de încărcare, datele preferate și orice alte cerințe pe care le introduceți.",
            "Formularul de parteneriat pentru transportatori: denumirea companiei, persoana de contact, adresa de e-mail de serviciu, numărul de telefon, țara de înregistrare, numărul de vehicule, tipurile de vehicule, zonele de operare sau rutele preferate și orice alte informații pe care le introduceți.",
            "Corespondență directă: datele pe care le includeți atunci când ne scrieți pe e-mail sau ne sunați.",
            `Date tehnice: jurnalele serverului (adresa IP, tipul browserului, ora cererii), păstrate de furnizorul nostru de găzduire pentru securitate și funcționare ${TBC}.`,
          ],
        },
        { type: "p", text: "Vă rugăm să nu includeți categorii speciale de date cu caracter personal (de exemplu date privind sănătatea) în câmpurile cu text liber; formularele sunt destinate solicitărilor de transport ale companiilor." },
      ],
    },
    {
      id: "purposes",
      title: "De ce le prelucrăm și pe ce temei legal",
      blocks: [
        {
          type: "table",
          rows: [
            ["Răspunsul la o solicitare de transport și pregătirea unei oferte", "Demersuri înainte de încheierea unui contract (art. 6 alin. (1) lit. b) GDPR) și interesul nostru legitim de a gestiona solicitările comerciale (art. 6 alin. (1) lit. f))"],
            ["Evaluarea unui posibil parteneriat cu un transportator", "Demersuri înainte de încheierea unui contract (art. 6 alin. (1) lit. b)) și interes legitim (art. 6 alin. (1) lit. f))"],
            ["Coordonarea unui transport confirmat cu părțile implicate", "Executarea unui contract (art. 6 alin. (1) lit. b))"],
            ["Păstrarea evidențelor contabile și fiscale", "Obligație legală (art. 6 alin. (1) lit. c)) conform legislației contabile și fiscale din România"],
            ["Securitate, prevenirea abuzurilor și limitarea numărului de trimiteri prin formulare", "Interes legitim (art. 6 alin. (1) lit. f))"],
            ["Cookie-uri de analiză, dacă și când vor fi configurate", "Consimțământ (art. 6 alin. (1) lit. a)), a se vedea Politica de cookie-uri"],
          ],
        },
        { type: "p", text: "Nu folosim datele din formulare pentru e-mailuri de marketing sau newslettere și nu luăm decizii automate care să producă efecte juridice asupra dumneavoastră." },
      ],
    },
    {
      id: "recipients",
      title: "Cine primește datele",
      blocks: [
        { type: "p", text: "Datele cu caracter personal sunt transmise numai în măsura necesară scopurilor de mai sus." },
        {
          type: "list",
          items: [
            "Transportatori independenți: datele de contact și detaliile transportului necesare pentru organizarea unui transport confirmat.",
            `Furnizorul de găzduire și infrastructură al site-ului: ${TBC}`,
            `Serviciul de formulare și baza de date folosite pentru stocarea solicitărilor: ${TBC}`,
            `Serviciul de e-mail folosit pentru notificarea echipei noastre la solicitări noi: ${TBC}`,
            "Consultanți profesioniști (contabili, avocați) și autorități publice, atunci când legea o cere.",
          ],
        },
        { type: "p", text: "Furnizorii de servicii acționează ca persoane împuternicite, pe baza unor acorduri scrise, și pot prelucra datele numai conform instrucțiunilor noastre." },
      ],
    },
    {
      id: "transfers",
      title: "Transferuri în afara UE/SEE",
      blocks: [
        {
          type: "p",
          text: `Furnizorii noștri de servicii pot stoca sau accesa date în afara Spațiului Economic European ${TBC}. În astfel de cazuri ne bazăm pe o decizie privind caracterul adecvat emisă de Comisia Europeană sau pe clauzele contractuale standard, iar dumneavoastră puteți solicita o copie a garanțiilor aplicabile.`,
        },
      ],
    },
    {
      id: "retention",
      title: "Cât timp le păstrăm",
      blocks: [
        {
          type: "list",
          items: [
            `Solicitările care nu duc la un contract: ${TBC} (propunere: 12 luni de la ultimul contact).`,
            `Solicitările care duc la un transport sau la un parteneriat: pe durata relației comerciale și ulterior, cât este necesar pentru eventuale pretenții legale ${TBC}.`,
            "Documentele contabile: 10 ani, conform legislației din România.",
            `Jurnalele serverului: ${TBC} (stabilit de furnizorul de găzduire).`,
          ],
        },
      ],
    },
    {
      id: "rights",
      title: "Drepturile dumneavoastră",
      blocks: [
        { type: "p", text: "În temeiul GDPR, aveți dreptul:" },
        {
          type: "list",
          items: [
            "de acces la datele cu caracter personal pe care le deținem despre dumneavoastră;",
            "la rectificarea datelor inexacte și la completarea datelor incomplete;",
            "la ștergerea datelor, atunci când nu mai există un temei legal pentru continuarea prelucrării;",
            "la restricționarea prelucrării, în situațiile prevăzute la art. 18 GDPR;",
            "la portabilitatea datelor pe care ni le-ați furnizat, atunci când prelucrarea se bazează pe contract sau pe consimțământ;",
            "de a vă opune prelucrării întemeiate pe interesele noastre legitime;",
            "de a vă retrage consimțământul în orice moment, atunci când prelucrarea se bazează pe consimțământ, fără a afecta legalitatea prelucrării anterioare.",
          ],
        },
        {
          type: "p",
          text: "Pentru exercitarea acestor drepturi, contactați-ne folosind datele din secțiunea 1. Răspundem în termen de o lună, termen care poate fi prelungit cu încă două luni pentru cererile complexe, și vă putem cere să vă confirmați identitatea.",
        },
        {
          type: "p",
          text: "Aveți și dreptul de a depune o plângere la autoritatea de supraveghere din România: Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, 010336 București, România, www.dataprotection.ro.",
        },
      ],
    },
    {
      id: "security",
      title: "Securitate",
      blocks: [
        {
          type: "p",
          text: "Aplicăm măsuri tehnice și organizatorice adecvate riscului, printre care conexiuni criptate (HTTPS), acces limitat la persoanele care gestionează solicitările și limitarea numărului de trimiteri prin formulare. Nicio metodă de transmitere prin internet nu este complet sigură.",
        },
      ],
    },
    {
      id: "changes",
      title: "Modificări ale acestei politici",
      blocks: [
        { type: "p", text: "Putem actualiza această politică pentru a reflecta schimbări în modul în care prelucrăm datele sau în legislație. Versiunea curentă este publicată întotdeauna pe această pagină, împreună cu data ultimei actualizări." },
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  key: "cookies",
  eyebrow: "LEGAL / COOKIE-URI",
  title: "Politica de cookie-uri",
  description: `Ce cookie-uri și tehnologii similare folosește acest site și cum solicită ${legalName} consimțământul.`,
  status: `Versiune: draft pentru revizuire juridică · Ultima actualizare: ${TBC}`,
  sections: [
    {
      id: "what-are-cookies",
      title: "Ce sunt cookie-urile",
      blocks: [
        {
          type: "p",
          text: "Cookie-urile sunt fișiere text de mici dimensiuni, stocate pe dispozitivul dumneavoastră de către un site. Tehnologii similare (cum ar fi stocarea locală) pot servi aceluiași scop. Această politică le acoperă pe amândouă.",
        },
      ],
    },
    {
      id: "cookies-we-use",
      title: "Cookie-urile folosite în prezent pe acest site",
      blocks: [
        {
          type: "p",
          text: "În prezent, acest site setează numai cookie-uri și elemente de stocare strict necesare, fără de care site-ul nu poate funcționa și pentru care nu este necesar consimțământul dumneavoastră, potrivit art. 4 alin. (5) din Legea nr. 506/2004 și Directivei ePrivacy.",
        },
        {
          type: "table",
          rows: [
            ["Protecția formularelor", `Valori tehnice folosite pentru a preveni trimiterile automate și pentru a limita numărul de trimiteri prin formulare. Numai pe durata sesiunii. ${TBC}`],
            ["Preferințe", `Opțiunea dumneavoastră privind cookie-urile opționale, după instalarea unui banner de consimțământ. 12 luni ${TBC}`],
          ],
        },
        { type: "p", text: "Nu sunt folosite cookie-uri de publicitate, de rețele sociale sau de urmărire între site-uri." },
      ],
    },
    {
      id: "analytics",
      title: "Cookie-uri de analiză (numai după consimțământ)",
      blocks: [
        {
          type: "p",
          text: `Este posibil să introducem un instrument de analiză care respectă confidențialitatea, pentru a înțelege cum este folosit site-ul. Cookie-urile de analiză vor fi setate numai după ce vă dați consimțământul prin bannerul de cookie-uri, iar consimțământul va putea fi retras în orice moment din același banner. Instrumentul și perioada de păstrare: ${TBC}.`,
        },
      ],
    },
    {
      id: "managing",
      title: "Gestionarea cookie-urilor",
      blocks: [
        {
          type: "p",
          text: "Puteți șterge sau bloca cookie-urile din setările browserului. Blocarea cookie-urilor strict necesare poate împiedica funcționarea formularelor. Instrucțiunile pentru browserele uzuale sunt disponibile pe paginile lor de asistență.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        { type: "p", text: `Întrebările legate de cookie-uri pot fi trimise către ${legalName}, ${addressLine}, sau prin e-mail la ${companyData.email.value}.` },
        { type: "p", text: "Pentru modul în care prelucrăm datele cu caracter personal în general, consultați Politica de confidențialitate." },
      ],
    },
  ],
};

export const termsOfUse: LegalDoc = {
  key: "terms",
  eyebrow: "LEGAL / TERMENI",
  title: "Termeni de utilizare",
  description: `Condițiile în care acest site este pus la dispoziție de ${legalName}.`,
  status: `Versiune: draft pentru revizuire juridică · Ultima actualizare: ${TBC}`,
  sections: [
    {
      id: "operator",
      title: "Operatorul site-ului",
      blocks: [
        { type: "p", text: `Acest site este operat de ${legalName}, societate înregistrată în România.` },
        { type: "table", rows: controllerTable.slice(0, 4) },
      ],
    },
    {
      id: "informational",
      title: "Caracterul informativ al site-ului",
      blocks: [
        {
          type: "p",
          text: "Conținutul acestui site descrie în termeni generali serviciile AXEL SAFE TRANSPORTING. Este furnizat exclusiv cu titlu informativ și nu constituie o ofertă, o cotație sau un angajament de a organiza un transport.",
        },
        {
          type: "p",
          text: "Trimiterea unei solicitări prin site nu dă naștere unui contract. Un transport sau un parteneriat cu un transportator există numai după ce condițiile sale au fost confirmate în scris (inclusiv prin e-mail) de AXEL SAFE TRANSPORTING.",
        },
        {
          type: "p",
          text: "AXEL SAFE TRANSPORTING organizează transportul prin transportatori independenți. Nu operează o flotă proprie și nu efectuează ea însăși transportul mărfurilor. Drepturile și obligațiile aferente unui anumit transport sunt stabilite în documentele agreate pentru acel transport.",
        },
      ],
    },
    {
      id: "use",
      title: "Utilizare acceptabilă",
      blocks: [
        {
          type: "list",
          items: [
            "Folosiți formularele numai pentru solicitări comerciale reale.",
            "Nu transmiteți informații false, înșelătoare sau ilegale și nici informații despre terți fără a avea dreptul să o faceți.",
            "Nu încercați să afectați funcționarea sau securitatea site-ului și nu îl accesați prin mijloace automate, în afara indexării obișnuite de către motoarele de căutare.",
          ],
        },
      ],
    },
    {
      id: "ip",
      title: "Proprietate intelectuală",
      blocks: [
        {
          type: "p",
          text: `Textele, elementele grafice, logourile și fotografiile de pe acest site aparțin ${legalName} sau sunt folosite sub licență ${TBC}. Puteți vizualiza și tipări paginile pentru uzul propriu al companiei dumneavoastră. Orice altă reproducere necesită acordul nostru scris prealabil.`,
        },
      ],
    },
    {
      id: "liability",
      title: "Răspundere",
      blocks: [
        {
          type: "p",
          text: "Depunem eforturi ca site-ul să fie corect și disponibil, dar nu garantăm că este lipsit de erori sau de întreruperi. În limitele permise de lege, AXEL SAFE TRANSPORTING nu răspunde pentru pierderile rezultate din încrederea acordată conținutului site-ului sau din indisponibilitatea sa temporară.",
        },
        { type: "p", text: "Nimic din acești termeni nu limitează răspunderea care nu poate fi limitată potrivit legii române." },
        { type: "p", text: "Linkurile către site-uri ale terților sunt oferite pentru comoditate; nu răspundem pentru conținutul acestora." },
      ],
    },
    {
      id: "privacy",
      title: "Date cu caracter personal și cookie-uri",
      blocks: [{ type: "p", text: "Prelucrarea datelor cu caracter personal prin acest site este descrisă în Politica de confidențialitate. Utilizarea cookie-urilor este descrisă în Politica de cookie-uri." }],
    },
    {
      id: "law",
      title: "Legea aplicabilă și litigii",
      blocks: [
        {
          type: "p",
          text: `Acești termeni sunt guvernați de legea română. Litigiile legate de utilizarea acestui site sunt de competența instanțelor din România ${TBC}, fără a aduce atingere normelor imperative care dau consumatorilor sau altor părți dreptul la o altă instanță.`,
        },
      ],
    },
    {
      id: "changes",
      title: "Modificări",
      blocks: [{ type: "p", text: "Putem actualiza acești termeni din când în când. Versiunea publicată pe această pagină se aplică de la data ultimei sale actualizări." }],
    },
  ],
};

export const legalDocs = { privacy: privacyPolicy, cookies: cookiePolicy, terms: termsOfUse } as const;
