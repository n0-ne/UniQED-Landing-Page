import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { storeEvent } from "@/lib/server-storage";
import { getVisitorId, setVisitorCookie } from "@/lib/visitor";

const nullableText = z.string().trim().max(160).nullable().optional();
const eventSchema = z.object({
  eventName: z.enum([
    "page_view",
    "sample_report_view",
    "qualification_submit",
    "price_view",
    "cta_click",
    "prelaunch_notice_view",
    "lead_submit",
  ]),
  university: z.string().trim().regex(/^[a-z0-9-]{2,40}$/),
  reportVariant: z.string().trim().regex(/^[a-z0-9-]{2,40}$/),
  priceVariant: z.string().trim().regex(/^[a-z0-9-]{2,40}$/),
  source: z.string().trim().min(1).max(80).default("direct"),
  utmSource: nullableText,
  utmMedium: nullableText,
  utmCampaign: nullableText,
  utmTerm: nullableText,
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const payload = eventSchema.parse(await request.json());
    const visitorId = getVisitorId(request);
    const mode = await storeEvent({
      visitor_id: visitorId,
      event_name: payload.eventName,
      university: payload.university,
      report_variant: payload.reportVariant,
      price_variant: payload.priceVariant,
      source: payload.source,
      utm_source: payload.utmSource ?? null,
      utm_medium: payload.utmMedium ?? null,
      utm_campaign: payload.utmCampaign ?? null,
      utm_term: payload.utmTerm ?? null,
      metadata: payload.metadata ?? {},
      created_at: new Date().toISOString(),
    });

    const response = NextResponse.json({ ok: true, mode });
    setVisitorCookie(response, visitorId);
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, message: "잘못된 이벤트 요청입니다." }, { status: 400 });
    }
    if (error instanceof Error && error.message === "STORAGE_NOT_CONFIGURED") {
      return NextResponse.json({ ok: false, message: "데이터 저장소가 연결되지 않았습니다." }, { status: 503 });
    }
    return NextResponse.json({ ok: false, message: "이벤트를 기록하지 못했습니다." }, { status: 500 });
  }
}
