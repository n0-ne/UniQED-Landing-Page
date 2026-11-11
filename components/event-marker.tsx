"use client";

import { useEffect, useRef } from "react";
import { trackEvent, type EventName } from "@/lib/client-analytics";

type EventMarkerProps = {
  eventName: EventName;
  university: string;
  reportVariant: string;
  priceVariant: string;
};

export default function EventMarker({
  eventName,
  university,
  reportVariant,
  priceVariant,
}: EventMarkerProps) {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const storageKey = `uniqed-event-${university}-${eventName}`;
    if (sessionStorage.getItem(storageKey)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        sessionStorage.setItem(storageKey, "1");
        void trackEvent({ eventName, university, reportVariant, priceVariant });
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, [eventName, priceVariant, reportVariant, university]);

  return <span ref={markerRef} aria-hidden="true" className="pointer-events-none absolute h-px w-px" />;
}
