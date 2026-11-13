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
const UPDATED = "13.11.2026";

const controllerTable = [
  ["Operator de date", legalName],
  ["Sediul social", addressLine],
  ["Nr. Registrul Comerțului", fact("registrationNumber")],
  ["Cod fiscal / TVA", fact("vatNumber")],
  ["E-mail pentru date personale", companyData.email.value],
] as const;

export const privacyPolicy: LegalDoc = {
  key: "privacy",
  eyebrow: "LEGAL / CONFIDENȚIALITATE",
  title: "Politica de confidențialitate",
  description: `Ce date personale colectează ${legalName} prin acest site, de ce, cât timp le păstrează și ce drepturi ai, conform Regulamentului (UE) 2016/679 (GDPR).`,
  status: `Ultima actualizare: ${UPDATED}`,
  sections: [
    {
      id: "controller",
      title: "Cine suntem",
      blocks: [
        {
          type: "p",
          text: `${legalName} („AXEL SAFE TRANSPORTING”, „noi”) este operatorul datelor personale pe care ni le trimiți prin acest site. Organizăm transport rutier de marfă prin transportatori independenți.`,
        },
        { type: "table", rows: controllerTable },
        {
          type: "p",
          text: "Nu am desemnat un responsabil cu protecția datelor (DPO). Pentru orice întrebare despre datele tale, scrie-ne la adresa de e-mail de mai sus.",
        },
      ],
    },
    {
      id: "data-we-collect",
      title: "Ce date colectăm",
      blocks: [
        { type: "p", text: "Colectăm doar datele pe care ni le trimiți tu: prin formularele de pe site, pe e-mail, la telefon sau pe WhatsApp." },
        {
          type: "list",
          items: [
            "Solicitarea completă de transport: numele firmei, persoana de contact, adresa de e-mail, numărul de telefon, locul de încărcare și de livrare, descrierea mărfii, greutatea și dimensiunile aproximative, datele dorite și alte cerințe.",
            "Cererea rapidă: numele, telefonul, locul de încărcare, destinația și informațiile suplimentare.",
            "Solicitarea de apel: numele, telefonul și intervalul în care preferi să te sunăm.",
            "Formularul pentru transportatori: numele firmei, CUI-ul, persoana de contact, adresa de e-mail, telefonul, țara de înregistrare, numărul și tipurile de vehicule, zonele și rutele pe care lucrezi, numărul licenței de transport, dacă ai asigurare CMR valabilă și alte informații pe care alegi să ni le dai.",
            "Date tehnice trimise odată cu formularul: pagina de pe care ai trimis cererea, parametrii de campanie din link (UTM), limba site-ului, tipul de browser, data și ora la care ți-ai dat acordul și o amprentă criptată (hash) a adresei IP. Adresa IP nu o păstrăm în clar.",
            "Jurnalele serverului: furnizorul care găzduiește site-ul poate înregistra, pentru securitate și funcționare, adresa IP și ora accesării.",
          ],
        },
        {
          type: "p",
          text: "Dacă ești transportator, verificăm și informații publice despre firma ta (de exemplu în baza de date ANAF), iar înainte de prima cursă confirmăm asigurarea CMR direct la asigurator.",
        },
        { type: "p", text: "Te rugăm să nu ne trimiți prin formulare date sensibile, de exemplu despre sănătate. Formularele sunt pentru cereri de transport între firme." },
      ],
    },
    {
      id: "purposes",
      title: "De ce folosim datele și pe ce temei legal",
      blocks: [
        {
          type: "table",
          rows: [
            ["Să îți răspundem la cerere și să îți trimitem o ofertă", "Demersuri făcute la cererea ta înainte de un contract (art. 6 alin. (1) lit. b) GDPR) și interesul nostru legitim de a răspunde cererilor primite de la firme (art. 6 alin. (1) lit. f))"],
            ["Să te sunăm, dacă ne-ai cerut un apel", "Demersuri făcute la cererea ta înainte de un contract (art. 6 alin. (1) lit. b))"],
            ["Să evaluăm și să verificăm o colaborare cu firma ta de transport", "Demersuri înainte de un contract (art. 6 alin. (1) lit. b)) și interesul nostru legitim de a lucra doar cu transportatori verificați (art. 6 alin. (1) lit. f))"],
            ["Să organizăm și să coordonăm o cursă confirmată", "Executarea contractului (art. 6 alin. (1) lit. b))"],
            ["Să ținem evidența contabilă și fiscală", "Obligație legală (art. 6 alin. (1) lit. c)), conform legislației din România"],
            ["Să vedem din ce pagini și campanii vin cererile", "Interes legitim (art. 6 alin. (1) lit. f))"],
            ["Să protejăm site-ul de abuzuri și de trimiteri automate", "Interes legitim (art. 6 alin. (1) lit. f))"],
          ],
        },
        {
          type: "p",
          text: "Nu îți trimitem newslettere sau e-mailuri de marketing pe baza datelor din formulare. Nu luăm decizii automate care să aibă efecte juridice asupra ta.",
        },
      ],
    },
    {
      id: "recipients",
      title: "Cine mai vede datele",
      blocks: [
        { type: "p", text: "Cererile tale le văd colegii din echipa AXEL SAFE TRANSPORTING care se ocupă de ele. Mai departe, le transmitem doar cât e nevoie:" },
        {
          type: "list",
          items: [
            "Transportatorului care face cursa: doar datele de contact și detaliile necesare pentru încărcare și livrare, după ce ai confirmat transportul.",
            "Furnizorilor noștri tehnici: firma care găzduiește site-ul, furnizorul bazei de date în care se salvează cererile și serviciul de e-mail prin care echipa e anunțată de o cerere nouă. Ei lucrează doar după instrucțiunile noastre, pe bază de contract.",
            "Contabilului, avocatului sau autorităților publice, atunci când legea ne obligă.",
          ],
        },
        {
          type: "p",
          text: "Dacă ne scrii pe WhatsApp, mesajele trec prin serviciul WhatsApp (Meta Platforms), conform regulilor lor de confidențialitate.",
        },
        { type: "p", text: "Nu vindem și nu închiriem datele tale nimănui." },
      ],
    },
    {
      id: "transfers",
      title: "Transferuri în afara UE/SEE",
      blocks: [
        {
          type: "p",
          text: "Unii furnizori tehnici pot avea servere sau personal în afara Spațiului Economic European. În acest caz, transferul se face doar pe baza unei decizii de adecvare a Comisiei Europene (de exemplu EU-US Data Privacy Framework) sau a clauzelor contractuale standard aprobate de Comisie. Ne poți cere o copie a garanțiilor aplicabile.",
        },
      ],
    },
    {
      id: "retention",
      title: "Cât timp păstrăm datele",
      blocks: [
        {
          type: "list",
          items: [
            "Cererile care nu ajung la o cursă sau la o colaborare: 12 luni de la ultimul contact, apoi le ștergem.",
            "Cererile care ajung la o cursă sau la o colaborare: pe durata colaborării și încă 3 ani după aceea, cât durează termenul general de prescripție pentru eventuale pretenții.",
            "Documentele contabile și fiscale: cât cere legislația contabilă și fiscală din România.",
            "Jurnalele serverului: o perioadă scurtă, stabilită de furnizorul de găzduire.",
          ],
        },
      ],
    },
    {
      id: "rights",
      title: "Drepturile tale",
      blocks: [
        { type: "p", text: "Conform GDPR, ai dreptul:" },
        {
          type: "list",
          items: [
            "să afli ce date avem despre tine și să primești o copie a lor;",
            "să ne ceri să corectăm datele greșite sau să le completăm;",
            "să ne ceri să ștergem datele, când nu mai avem un motiv legal să le păstrăm;",
            "să ne ceri să restricționăm folosirea lor, în situațiile de la art. 18 GDPR;",
            "să primești datele pe care ni le-ai dat într-un format ușor de transferat, când le folosim pe baza unui contract sau a acordului tău;",
            "să te opui oricând folosirii datelor pe baza interesului nostru legitim;",
            "să îți retragi oricând acordul, când folosirea datelor se bazează pe acord, fără să afecteze ce s-a făcut înainte.",
          ],
        },
        {
          type: "p",
          text: "Ca să îți exerciți aceste drepturi, scrie-ne la adresa de e-mail din secțiunea 1. Răspunsul e gratuit și îl primești în cel mult o lună. Pentru cererile complicate, termenul se poate prelungi cu încă două luni, dar te anunțăm. Putem să îți cerem să îți confirmi identitatea.",
        },
        {
          type: "p",
          text: "Dacă nu ești mulțumit de cum folosim datele tale, poți depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, 010336 București, www.dataprotection.ro.",
        },
      ],
    },
    {
      id: "security",
      title: "Cum protejăm datele",
      blocks: [
        {
          type: "list",
          items: [
            "Site-ul folosește conexiune criptată (HTTPS).",
            "Adresa IP nu se salvează în clar, ci doar ca amprentă criptată.",
            "La cereri au acces doar colegii care se ocupă de ele, fiecare cu contul și parola lui.",
            "Limităm numărul de trimiteri prin formulare, ca să oprim abuzurile.",
          ],
        },
        { type: "p", text: "Nicio transmisie prin internet nu e sigură 100%, dar luăm măsurile potrivite pentru riscurile reale." },
      ],
    },
    {
      id: "changes",
      title: "Modificări",
      blocks: [
        {
          type: "p",
          text: "Putem actualiza această politică atunci când schimbăm felul în care folosim datele sau când se schimbă legea. Varianta în vigoare e mereu pe această pagină, cu data ultimei actualizări sus.",
        },
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  key: "cookies",
  eyebrow: "LEGAL / COOKIE-URI",
  title: "Politica de cookie-uri",
  description: `Ce cookie-uri folosește site-ul ${legalName} și de ce nu îți afișăm un banner de cookie-uri.`,
  status: `Ultima actualizare: ${UPDATED}`,
  sections: [
    {
      id: "what-are-cookies",
      title: "Ce sunt cookie-urile",
      blocks: [
        {
          type: "p",
          text: "Cookie-urile sunt fișiere mici pe care un site le salvează în browserul tău. Tehnologiile asemănătoare, cum ar fi stocarea locală (local storage), fac cam același lucru. Pagina aceasta le acoperă pe toate.",
        },
      ],
    },
    {
      id: "cookies-we-use",
      title: "Ce cookie-uri folosește acest site",
      blocks: [
        {
          type: "p",
          text: "Pe scurt: niciunul pentru vizitatori. Paginile publice ale site-ului nu salvează cookie-uri și nu folosesc stocarea locală în browserul tău. De aceea nu îți afișăm un banner de cookie-uri.",
        },
        { type: "p", text: "Nu folosim cookie-uri de analiză, de publicitate sau de rețele sociale și nu te urmărim de pe un site pe altul." },
        {
          type: "table",
          rows: [
            [
              "axel_admin_session (doar pentru echipă)",
              "Se salvează numai când un coleg AXEL SAFE TRANSPORTING intră în zona internă de administrare. Ține sesiunea deschisă cel mult 12 ore și se șterge la ieșirea din cont. Este strict necesar, deci nu cere acord (art. 4 alin. (5) din Legea nr. 506/2004). Vizitatorii site-ului nu îl primesc.",
            ],
            ["Protecția formularelor", "Se face pe server, fără cookie-uri în browserul tău."],
            ["Fonturi", "Le încărcăm de pe serverul nostru, nu de la Google, așa că deschiderea paginii nu trimite date către Google Fonts."],
            ["Butonul WhatsApp", "E doar un link. WhatsApp poate seta cookie-uri abia după ce dai click și ajungi pe site-ul sau în aplicația lor, conform regulilor WhatsApp."],
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "Dacă vom adăuga cookie-uri opționale",
      blocks: [
        {
          type: "p",
          text: "Pe viitor s-ar putea să folosim instrumente de analiză sau de publicitate, de exemplu ca să vedem ce campanii aduc cereri. Înainte să le pornim:",
        },
        {
          type: "list",
          items: [
            "îți cerem acordul printr-un banner, iar cookie-urile opționale pornesc doar dacă accepți;",
            "poți refuza la fel de ușor cum accepți și poți retrage acordul oricând;",
            "actualizăm această pagină cu lista exactă a cookie-urilor, rolul lor și cât timp rămân în browser.",
          ],
        },
      ],
    },
    {
      id: "managing",
      title: "Cum controlezi cookie-urile",
      blocks: [
        {
          type: "p",
          text: "Poți vedea, bloca sau șterge cookie-urile din setările browserului. Chrome, Firefox, Safari și Edge au pagini de ajutor care arată exact cum. Pe acest site, blocarea cookie-urilor nu schimbă nimic pentru tine, pentru că paginile publice nu le folosesc.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        { type: "p", text: `Pentru întrebări despre cookie-uri, scrie-ne la ${companyData.email.value} sau pe adresa ${legalName}, ${addressLine}.` },
        { type: "p", text: "Despre cum folosim datele personale în general, găsești detalii în Politica de confidențialitate." },
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
