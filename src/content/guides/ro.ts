/**
 * GHIDURI (RO). [PLACEHOLDER] DRAFT scris de EDH din cunoștințe generale despre domeniu; necesită aprobarea clientului înainte de lansare.
 * Fără cifre ale firmei în afara faptelor verificate din companyData. Fără prețuri.
 */
import type { GuidesContent } from "./types";

export const guidesRo: GuidesContent = {
  index: {
    titleLines: ["Transportul rutier,", "explicat pe înțeles."],
    text: "Ghiduri scurte pentru firmele care trimit marfă pe șosea: documentele, prețul și cine ce face.",
    read: "Citiți ghidul",
  },
  ui: { contents: "În acest ghid", allGuides: "Toate ghidurile", updated: "Actualizat" },
  published: "2026-11-10",
  articles: {
    cmr: {
      title: "Ce este scrisoarea de transport CMR și la ce folosește",
      description:
        "Scrisoarea de transport CMR, explicată pentru expeditori: când se aplică, ce conține, cine o semnează și de ce contează când marfa ajunge deteriorată.",
      lead: "Orice transport rutier internațional în Europa circulă cu o scrisoare de transport CMR. Este un document scurt, dar decide multe când apare o problemă: cine a primit ce, în ce stare și cine răspunde pentru o pagubă.",
      sections: [
        {
          heading: "De unde vine numele",
          body: [
            "CMR este Convenția privind contractul de transport internațional de mărfuri pe șosele, semnată la Geneva în 1956. Aproape toate țările europene au aderat la ea, la fel și câteva țări din afara Europei.",
            "Convenția se aplică atunci când marfa este transportată pe șosea contra cost, iar locul de încărcare și locul de livrare sunt în două țări diferite, dintre care cel puțin una a aderat la convenție. Ea stabilește cine răspunde de ce, până unde merge răspunderea transportatorului și cum se fac reclamațiile. Scrisoarea de transport (numită și scrisoare de trăsură) consemnează fiecare contract în parte după aceste reguli.",
          ],
        },
        {
          heading: "Ce rol are documentul",
          body: [
            "Scrisoarea CMR are trei roluri în același timp:",
            {
              list: [
                "dovedește că există un contract de transport și în ce condiții a fost încheiat;",
                "confirmă că transportatorul a preluat marfa, în cantitatea și starea trecute pe ea;",
                "după ce o semnează destinatarul, arată că marfa a fost livrată.",
              ],
            },
            "Dacă scrisoarea lipsește sau este incompletă, contractul rămâne valabil și convenția se aplică în continuare. Doar că devine mult mai greu de dovedit ce s-a încărcat și în ce stare.",
          ],
        },
        {
          heading: "Cine o semnează și cine păstrează fiecare exemplar",
          body: [
            "Scrisoarea se întocmește în trei exemplare originale, semnate de expeditor și de transportator. Primul exemplar rămâne la expeditor, al doilea însoțește marfa și se predă destinatarului, iar al treilea rămâne la transportator. Formularele tipărite au adesea și exemplare suplimentare, pentru uz intern.",
            "Expeditorul răspunde de corectitudinea datelor despre marfă. Dacă o descriere sau o greutate greșită produce o pagubă sau costuri în plus, expeditorul poate fi tras la răspundere.",
          ],
        },
        {
          heading: "Ce se trece în ea",
          body: [
            "Convenția enumeră datele pe care trebuie să le conțină scrisoarea de transport. Principalele sunt:",
            {
              list: [
                "data și locul întocmirii;",
                "numele și adresele expeditorului, transportatorului și destinatarului;",
                "locul și data preluării mărfii și locul de livrare;",
                "descrierea mărfii și modul de ambalare (pentru mărfurile periculoase, denumirea lor general recunoscută);",
                "numărul de colete, cu marcajele și numerele lor;",
                "greutatea brută sau altă cantitate a mărfii;",
                "costurile legate de transport;",
                "instrucțiunile pentru vamă și alte formalități.",
              ],
            },
            "Se pot adăuga și alte date, acolo unde e cazul: un termen de livrare convenit, o valoare declarată a mărfii sau instrucțiunile expeditorului privind manipularea.",
          ],
        },
        {
          heading: "Rezervele, la încărcare și la livrare",
          body: [
            "Când transportatorul preia marfa, șoferul verifică numărul de colete și starea lor aparentă. Dacă ceva nu este în regulă, de exemplu ambalaje rupte sau mai puțini paleți decât s-a declarat, șoferul trece o rezervă în scrisoare. Fără rezerve, se presupune că marfa era în stare aparent bună la încărcare.",
            "La livrare se aplică aceeași logică. Deteriorările vizibile se trec în scrisoare în momentul primirii mărfii. Pentru deteriorările care nu se văd, rezervele scrise trebuie să ajungă la transportator în cel mult șapte zile de la livrare, fără duminici și sărbători legale. Pentru întârziere, termenul este de 21 de zile de la momentul în care marfa a fost pusă la dispoziția destinatarului.",
          ],
        },
        {
          heading: "Limitele răspunderii și varianta electronică",
          body: [
            "Conform convenției, despăgubirea pentru marfa pierdută sau deteriorată este plafonată la 8,33 drepturi speciale de tragere (DST) pentru fiecare kilogram de greutate brută lipsă sau deteriorată, cu excepția cazului în care în scrisoare s-a declarat o valoare mai mare, contra unei taxe suplimentare convenite. La mărfurile valoroase, acest plafon poate fi mult sub valoarea încărcăturii, așa că asigurarea mărfii merită discutată separat.",
            "Un protocol adoptat în 2008 permite scrisoarea de transport electronică, e-CMR. Între țările care l-au ratificat, e-CMR are aceeași valoare juridică precum documentul pe hârtie.",
          ],
        },
      ],
      cta: {
        title: "Aveți marfă de trimis în Europa?",
        text: "Organizăm transportul cu transportatori independenți a căror asigurare CMR o confirmăm la asigurator înainte de încărcare. Trimiteți-ne ruta și marfa.",
        label: "Solicitați o ofertă",
      },
    },

    pricing: {
      title: "Cum se formează prețul unui transport rutier",
      description:
        "Ce intră în prețul unui transport rutier: distanța, greutatea și metrii liniari, tipul semiremorcii, drumul de întoarcere gol, taxele de drum, combustibilul, datele și sezonul.",
      lead: "Două transporturi cu aceeași greutate și pe aceeași distanță pot primi oferte foarte diferite. Prețul unui transport rutier nu depinde doar de kilometri. Acestea sunt elementele pe care o casă de expediții sau un transportator le cântărește înainte să vă dea o cifră.",
      sections: [
        {
          heading: "Distanța și traseul",
          body: [
            "Distanța este punctul de plecare. Cele mai multe oferte pornesc de la kilometrii dintre încărcare și livrare, dar contează și traseul: pasurile montane, traversările cu feribotul, centrele orașelor și punctele de frontieră adaugă timp și costuri.",
            "Regulile UE privind timpii de conducere și de odihnă limitează distanța pe care un șofer o poate parcurge într-o zi. Un traseu mai lung poate cere o zi în plus pe drum sau un al doilea șofer, iar amândouă se văd în preț.",
          ],
        },
        {
          heading: "Greutatea, volumul și metrii liniari",
          body: [
            "O semiremorcă europeană standard încarcă 33 de europaleți pe o platformă de 13,6 metri. Un camion complet se tarifează ca întreg, indiferent dacă semiremorca este plină sau nu.",
            "La încărcăturile parțiale, prețul depinde de obicei de cât din semiremorcă folosiți, socotit în metri liniari sau locuri de palet, și de greutate. Marfa ușoară, dar voluminoasă, se tarifează după spațiul pe care îl ocupă. Marfa grea și compactă se tarifează după greutate.",
          ],
        },
        {
          heading: "Tipul semiremorcii",
          body: [
            "Prelata este cea mai folosită semiremorcă și, de regulă, prețul de referință. O semiremorcă frigorifică este mai scumpă la exploatare: agregatul de răcire consumă combustibil, iar echipamentul costă mai mult la cumpărare și la întreținere. Pe multe rute sunt și mai puține frigorifice disponibile. Semiremorcile mega, cu înălțime interioară mai mare, se potrivesc mărfii voluminoase, dar nu se găsesc peste tot.",
          ],
        },
        {
          heading: "Drumul de întoarcere gol",
          body: [
            "După livrare, camionul trebuie să găsească următoarea încărcătură undeva în apropiere. Dacă destinația este o zonă din care pleacă puține mărfuri înapoi, transportatorul poate merge o parte din drum gol, iar acest cost intră în preț.",
            "De aceea aceeași distanță poate costa o sumă într-un sens și alta în sensul opus.",
          ],
        },
        {
          heading: "Taxele de drum și combustibilul",
          body: [
            "Taxele de drum diferă de la o țară la alta și se calculează adesea pe kilometru, în funcție de greutatea vehiculului și de clasa de emisii. Combustibilul este unul dintre cele mai mari costuri în transportul rutier, iar prețul lui se schimbă. Unele contracte includ o suprataxă de combustibil legată de prețul motorinei, altele fixează prețul pentru fiecare cursă.",
          ],
        },
        {
          heading: "Datele, urgența și sezonul",
          body: [
            "O încărcătură care trebuie să plece mâine costă mai mult decât una planificată cu o săptămână înainte, pentru că transportatorul are mai puțin loc de manevră. Intervalele fixe la încărcare sau la livrare, lucrul în weekend și termenele stricte de livrare adaugă și ele costuri.",
            "Cererea se schimbă de-a lungul anului. Înainte de sărbători și în sezonul de vârf pentru anumite mărfuri, camioanele se găsesc mai greu și prețurile cresc.",
          ],
        },
        {
          heading: "Ce să trimiteți pentru o ofertă corectă",
          body: [
            {
              list: [
                "adresele de încărcare și de livrare sau măcar codurile poștale;",
                "descrierea mărfii și a ambalajului;",
                "numărul de paleți sau colete, greutatea și, pentru mărfurile nestandard, dimensiunile;",
                "cerințele pentru semiremorcă, de exemplu un interval de temperatură sau încărcare laterală;",
                "datele și eventualele intervale orare fixe;",
                "dacă marfa poate circula împreună cu alte mărfuri sau are nevoie de un camion complet.",
              ],
            },
            "Cu toate detaliile trimise de la început, nu mai revenim cu întrebări, iar prețul rămâne cel din ofertă și după încărcare.",
          ],
        },
      ],
      cta: {
        title: "Aveți nevoie de un preț pentru o rută?",
        text: "Trimiteți-ne ruta, marfa și datele. După ce avem detaliile, de obicei răspundem în mai puțin de o oră.",
        label: "Solicitați o ofertă",
      },
    },

    roles: {
      title: "Casă de expediții, transportator, bursă de transport: cine ce face",
      description:
        "Trei moduri de a vă transporta marfa pe șosea: ce face o casă de expediții, ce face un transportator și ce este o bursă de transport, plus ce înseamnă fiecare pentru expeditor.",
      lead: "Dacă aveți marfă de transportat pe șosea, puteți lucra direct cu un transportator, printr-o casă de expediții sau puteți publica încărcătura pe o bursă de transport. Cele trei se confundă des și fiecare vă lasă altă parte din muncă.",
      sections: [
        {
          heading: "Transportatorul",
          body: [
            "Transportatorul deține sau operează camioanele și are șoferii angajați. El efectuează transportul și, pe rutele internaționale, are asigurare CMR pentru răspunderea față de marfă. Transportatorii pot fi de la un singur proprietar care își conduce camionul până la firme cu sute de vehicule.",
            "Când lucrați direct cu un transportator, lanțul are o verigă mai puțin. Limitele sunt capacitatea și acoperirea: transportatorul vă poate oferi doar camioanele pe care le are, pe rutele pe care se află în acel moment. Dacă nu are camion liber la data dumneavoastră, trebuie să căutați în altă parte.",
          ],
        },
        {
          heading: "Casa de expediții",
          body: [
            "Casa de expediții organizează transportul în numele expeditorului și nu trebuie să dețină vehicule. Treaba ei este să înțeleagă transportul, să găsească un transportator potrivit, să stabilească prețul și condițiile și să coordoneze transportul până la livrare.",
            "Pentru expeditor, asta înseamnă o singură solicitare și o singură persoană de contact, în loc de telefoane la mai mulți transportatori. O casă de expediții ar trebui să își verifice transportatorii, pentru că răspunde față de dumneavoastră pentru alegerea făcută. Marja ei este inclusă în prețul pe care îl plătiți.",
          ],
        },
        {
          heading: "Bursa de transport",
          body: [
            "Bursa de transport este o platformă online pe care se publică încărcături și camioane libere. Expeditorii, casele de expediții și transportatorii o folosesc ca să se găsească repede, adesea pentru o singură cursă. Accesul se face de obicei pe bază de abonament plătit.",
            "Bursa este o piață, nu o parte a transportului. Nu organizează cursa și nu răspunde pentru transportatorul găsit acolo. Platformele își verifică într-o anumită măsură membrii, dar verificarea transportatorului concret, a licenței și a asigurării lui rămâne în sarcina celui care comandă transportul.",
          ],
        },
        {
          heading: "Ce variantă se potrivește fiecărui expeditor",
          body: [
            "Firmele cu volume constante pe aceleași rute lucrează adesea direct cu unul sau doi transportatori. Expeditorii cu volume care variază, cu mai multe destinații sau fără cineva care să se ocupe intern de transport apelează de obicei la o casă de expediții. Bursele se potrivesc firmelor care au propriul departament de transport și sunt obișnuite să își verifice singure transportatorii.",
          ],
        },
        {
          heading: "Cum lucrează AXEL SAFE TRANSPORTING",
          body: [
            "Suntem o casă de expediții. Nu avem camioane proprii: transportul îl efectuează cei peste 30 de transportatori independenți cu care lucrăm, în toată Europa și în Marea Britanie, cel mai des între România și Spania. Organizăm aproximativ 100 de curse pe lună.",
            "Înainte ca un transportator să primească una dintre curse, îi verificăm licența comunitară, îi confirmăm asigurarea CMR la asigurator, verificăm documentele vehiculului și ne asigurăm că firma nu este în insolvență. Aveți un coordonator pentru fiecare transport și un dispecerat care răspunde non-stop. Marfa este asigurată.",
          ],
        },
      ],
      cta: {
        title: "Vreți o singură persoană de contact pentru transporturi?",
        text: "Spuneți-ne ce marfă trebuie transportată, de unde și când. De obicei răspundem în mai puțin de o oră.",
        label: "Solicitați o ofertă",
      },
    },
  },
};
