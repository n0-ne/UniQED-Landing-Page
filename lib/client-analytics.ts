export type EventName =
  | "page_view"
  | "sample_report_view"
  | "qualification_submit"
  | "price_view"
  | "cta_click"
  | "prelaunch_notice_view"
  | "lead_submit";

type EventPayload = {
  eventName: EventName;
  university: string;
  reportVariant: string;
  priceVariant: string;
  metadata?: Record<string, string | number | boolean | null>;
};

function attribution() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("from") ?? params.get("utm_source") ?? "direct",
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmTerm: params.get("utm_term"),
  };
}

export async function trackEvent({
  eventName,
  university,
  reportVariant,
  priceVariant,
  metadata,
}: EventPayload) {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventName,
        university,
        reportVariant,
        priceVariant,
        ...attribution(),
        metadata,
      }),
    });
  } catch {
    // Analytics must never block the visitor's primary action.
  }
}
