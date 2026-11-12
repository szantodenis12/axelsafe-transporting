import { CALLBACK_TIME_LABEL, VEHICLE_LABEL } from "./labels";
import { VEHICLE_TYPES, type VehicleType } from "./schema";
import { vehicleList, type Lead } from "./types";

export const isVehicleType = (value: string): value is VehicleType => (VEHICLE_TYPES as readonly string[]).includes(value);

export const vehicleLabels = (lead: Extract<Lead, { type: "carrier" }>) =>
  vehicleList(lead.details).map((v) => (isVehicleType(v) ? VEHICLE_LABEL[v] : v));

/** One-line summary for lists, cards and e-mails. */
export function leadSummary(lead: Lead): string {
  if (lead.type === "quote") {
    const route = `${lead.details.pickupLocation || "?"} → ${lead.details.deliveryLocation || "?"}`;
    return lead.details.mode === "quick" ? `${route} · cerere rapidă` : route;
  }
  if (lead.type === "callback") return `Sunați: ${CALLBACK_TIME_LABEL[lead.details.preferredTime] ?? lead.details.preferredTime}`;
  return [lead.details.country, vehicleLabels(lead).join(", ")].filter(Boolean).join(" · ");
}
