/**
 * @file booking.ts
 * @description Single source of truth for the public booking flow. Bookings run
 *   on cal.com (FlowAudit Call, 15 minutes); every confirmation includes a
 *   Cal Video link.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
export const BOOKING_URL = "https://cal.com/curtis-salesos/flowaudit-call";

export const CAL_LINK = "curtis-salesos/flowaudit-call";

export const CAL_NAMESPACE = "flowaudit-call";

export const CAL_ORIGIN = "https://app.cal.com";
