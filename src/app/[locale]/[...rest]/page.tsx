import { notFound } from "next/navigation";

/** Any unmatched URL inside a locale renders the designed [locale]/not-found page. */
export default function CatchAll() {
  notFound();
}
