/**
 * GUIDES (EN). [PLACEHOLDER] DRAFT written by EDH from general industry knowledge; needs client approval before launch.
 * No company figures beyond the verified facts in companyData (30+ carriers, ~100 shipments/month, 24/7, < 1 h).
 * No prices.
 */
import type { GuidesContent } from "./types";

export const guidesEn: GuidesContent = {
  index: {
    titleLines: ["Road freight,", "explained plainly."],
    text: "Short guides for companies that ship goods by road: the documents, the price and the people involved.",
    read: "Read the guide",
  },
  ui: { contents: "In this guide", allGuides: "All guides", updated: "Updated" },
  published: "2026-11-10",
  articles: {
    cmr: {
      title: "What a CMR consignment note is and what it does",
      description:
        "The CMR consignment note explained for shippers: when it applies, what it contains, who signs it and why it matters when goods arrive damaged.",
      lead: "Every international road shipment in Europe travels with a CMR consignment note. It is a short document, but it decides a lot when something goes wrong: who received what, in what condition, and who answers for a loss.",
      sections: [
        {
          heading: "Where the name comes from",
          body: [
            "CMR is the Convention on the Contract for the International Carriage of Goods by Road, signed in Geneva in 1956. Almost every European country has joined it, and so have several countries outside Europe.",
            "The convention applies when goods are carried by road for payment and the places of loading and delivery are in two different countries, at least one of which is party to it. It sets out who is responsible for what, how far the carrier's liability goes and how claims are made. The consignment note records each individual contract under these rules.",
          ],
        },
        {
          heading: "What the note does",
          body: [
            "The CMR note does three jobs at once:",
            {
              list: [
                "It is evidence that a contract of carriage exists, and on what terms.",
                "It confirms that the carrier took over the goods, in the quantity and condition written on it.",
                "Once signed by the consignee, it shows that the goods were delivered.",
              ],
            },
            "If the note is missing or incomplete, the contract is still valid and the convention still applies. Proving what was loaded, and in what state, becomes much harder.",
          ],
        },
        {
          heading: "Who signs it and who keeps which copy",
          body: [
            "The note is made out in three original copies, signed by the sender and the carrier. The first copy stays with the sender, the second travels with the goods and is handed to the consignee, and the third stays with the carrier. Printed forms often include extra copies for internal use.",
            "The sender answers for the accuracy of the details about the goods. If a wrong description or weight causes a loss or extra cost, the sender can be held liable for it.",
          ],
        },
        {
          heading: "What goes on it",
          body: [
            "The convention lists the details a consignment note must contain. The main ones are:",
            {
              list: [
                "date and place where the note is made out;",
                "names and addresses of the sender, the carrier and the consignee;",
                "place and date of taking over the goods, and the place of delivery;",
                "description of the goods and how they are packed (for dangerous goods, their generally recognised description);",
                "number of packages, with their marks and numbers;",
                "gross weight or other quantity of the goods;",
                "charges relating to the carriage;",
                "instructions for customs and other formalities.",
              ],
            },
            "Other details can be added where they apply, such as an agreed delivery time, a declared value of the goods or the sender's instructions on handling.",
          ],
        },
        {
          heading: "Reservations at loading and at delivery",
          body: [
            "When the carrier takes over the goods, the driver checks the number of packages and their apparent condition. If something is wrong, for example torn packaging or fewer pallets than declared, the driver writes a reservation on the note. Without reservations, the goods are presumed to have been in apparent good condition when loaded.",
            "The same logic applies at delivery. Visible damage should be written on the note when the goods are received. For damage that is not apparent, written reservations must reach the carrier within seven days of delivery, Sundays and public holidays excepted. For delay, the deadline is 21 days from the moment the goods were placed at the consignee's disposal.",
          ],
        },
        {
          heading: "Liability limits and the electronic note",
          body: [
            "Under the convention, compensation for lost or damaged goods is capped at 8.33 Special Drawing Rights per kilogram of gross weight short or damaged, unless a higher value was declared on the note against an agreed surcharge. For valuable goods, this cap can be far below what the cargo is worth, so cargo insurance deserves a separate conversation.",
            "A protocol adopted in 2008 allows an electronic consignment note, the e-CMR. Between countries that have ratified it, the e-CMR has the same legal value as the paper note.",
          ],
        },
      ],
      cta: {
        title: "Goods to ship across Europe?",
        text: "We arrange the transport with independent carriers whose CMR insurance we confirm with the insurer before loading. Send us the route and the cargo.",
        label: "Request a Quote",
      },
    },

    pricing: {
      title: "How a road freight price is formed",
      description:
        "The factors behind a road freight quote: distance, weight and loading metres, trailer type, the empty return leg, tolls, fuel, dates and season.",
      lead: "Two shipments of the same weight over the same distance can receive very different quotes. The price of a road transport depends on more than kilometres. These are the factors a forwarder or a carrier weighs before giving you a figure.",
      sections: [
        {
          heading: "Distance and route",
          body: [
            "Distance is the starting point. Most quotes are built on the kilometres between loading and delivery, but the route matters too: mountain passes, ferry crossings, city centres and border crossings add time and cost.",
            "EU rules on driving and rest times limit how far one driver can go in a day. A longer route may need an extra day on the road or a second driver, and both show up in the price.",
          ],
        },
        {
          heading: "Weight, volume and loading metres",
          body: [
            "A standard European semi-trailer takes 33 euro pallets on a 13.6 metre loading floor. A full truck load is priced as a whole, whether the trailer is full or not.",
            "For partial loads, the price usually depends on how much of the trailer you use, counted in loading metres or pallet places, and on the weight. Light but bulky goods are priced by the space they take up. Heavy, compact goods are priced by their weight.",
          ],
        },
        {
          heading: "Trailer type",
          body: [
            "A curtainsider is the most common trailer and usually the reference price. A refrigerated trailer costs more to run: the cooling unit uses fuel, and the equipment costs more to buy and maintain. On many routes there are also fewer refrigerated trailers available. Mega trailers, with a higher internal height, suit voluminous cargo but are not available everywhere.",
          ],
        },
        {
          heading: "The empty return leg",
          body: [
            "After delivery, the truck has to find its next load somewhere nearby. If the destination is a region with few loads going back, the carrier may drive part of the way empty, and that cost is built into the price.",
            "This is why the same distance can cost one amount in one direction and a different amount in the other.",
          ],
        },
        {
          heading: "Tolls and fuel",
          body: [
            "Road tolls differ from country to country and are often charged per kilometre, by vehicle weight and emission class. Fuel is one of the largest costs in road transport, and its price moves. Some agreements include a fuel surcharge linked to the diesel price; others fix the price for each trip.",
          ],
        },
        {
          heading: "Dates, urgency and season",
          body: [
            "A load that must leave tomorrow costs more than one planned a week ahead, because the carrier has less room to fit it in. Fixed time slots at loading or delivery, weekend work and strict delivery deadlines also add cost.",
            "Demand changes through the year. Before public holidays and in the peak season for certain goods, trucks are harder to find and prices rise.",
          ],
        },
        {
          heading: "What to send for an accurate quote",
          body: [
            {
              list: [
                "loading and delivery addresses, or at least the postcodes;",
                "a description of the goods and the packaging;",
                "number of pallets or packages, weight and, for non-standard items, dimensions;",
                "trailer requirements, such as a temperature range or side loading;",
                "dates and any fixed time slots;",
                "whether the goods can travel with other cargo or need a full truck.",
              ],
            },
            "A complete request saves a second round of questions and keeps the price from changing after loading.",
          ],
        },
      ],
      cta: {
        title: "Need a price for a route?",
        text: "Send us the route, the cargo and the dates. Once we have the details, we usually reply in under an hour.",
        label: "Request a Quote",
      },
    },

    roles: {
      title: "Freight forwarder, carrier, freight exchange: who does what",
      description:
        "Three ways to get goods moved by road: what a freight forwarder, a carrier and a freight exchange each do, and what that means for a shipper.",
      lead: "If you need goods moved by road, you can deal with a carrier directly, work through a freight forwarder or post the load on a freight exchange. The three are often confused, and each one leaves different work on your side.",
      sections: [
        {
          heading: "The carrier",
          body: [
            "A carrier owns or operates the trucks and employs the drivers. It performs the transport itself and, on international routes, holds CMR insurance for its liability towards the goods. Carriers range from a single owner-driver to companies with hundreds of vehicles.",
            "Working directly with a carrier removes one link from the chain. The limits are capacity and coverage: a carrier can offer only the trucks it has, on the routes where they happen to be. If its truck is not free on your date, you need to look elsewhere.",
          ],
        },
        {
          heading: "The freight forwarder",
          body: [
            "A freight forwarder organises transport on behalf of the shipper and does not need to own vehicles. Its work is to understand the shipment, find a suitable carrier, agree the price and conditions, and coordinate the transport until delivery.",
            "For the shipper, a forwarder means one request and one point of contact instead of calls to several carriers. A forwarder should also check the carriers it books, because it answers to you for that choice. Its margin is included in the price you pay.",
          ],
        },
        {
          heading: "The freight exchange",
          body: [
            "A freight exchange is an online platform where loads and free trucks are posted. Shippers, forwarders and carriers use it to find each other quickly, often for a single trip. Access usually requires a paid subscription.",
            "An exchange is a marketplace, not a party to the transport. It does not organise the shipment or answer for the carrier you find there. Platforms run some checks on their members, but checking the specific carrier, its licence and its insurance remains the job of whoever books the transport.",
          ],
        },
        {
          heading: "Which one fits which shipper",
          body: [
            "Companies with regular volumes on the same lanes often work directly with one or two carriers. Shippers with changing volumes, several destinations or no one in-house to manage transport tend to use a forwarder. Exchanges suit companies that have their own transport staff and are used to checking carriers themselves.",
          ],
        },
        {
          heading: "How AXEL SAFE TRANSPORTING works",
          body: [
            "We are a freight forwarder. We do not run our own trucks: the transport is performed by more than 30 independent carriers we work with, across Europe and the United Kingdom, most often between Romania and Spain. We organise around 100 shipments a month.",
            "Before a carrier gets one of our loads, we check its EU Community Licence, confirm its CMR insurance with the insurer, check the vehicle documents and make sure the company is not in insolvency. You get one coordinator for each shipment and a dispatch team that answers 24/7. The cargo is insured.",
          ],
        },
      ],
      cta: {
        title: "Want one point of contact for your transport?",
        text: "Tell us what needs to move, from where and when. We usually reply in under an hour.",
        label: "Request a Quote",
      },
    },
  },
};
