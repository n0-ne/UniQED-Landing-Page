import { createHash } from "node:crypto";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { storeLead } from "@/lib/server-storage";
import { getVisitorId, setVisitorCookie } from "@/lib/visitor";

const nullableText = z.string().trim().max(160).nullable().optional();
const leadSchema = z.object({
  contact: z.string().trim().min(5).max(160),
  consent: z.literal(true),
  academyStatus: z.enum(["regular", "independent", "final-only"]),
  university: z.string().trim().regex(/^[a-z0-9-]{2,40}$/),
  reportVariant: z.string().trim().regex(/^[a-z0-9-]{2,40}$/),
  priceVariant: z.string().trim().regex(/^[a-z0-9-]{2,40}$/),
  source: z.string().trim().min(1).max(80).default("direct"),
  utmSource: nullableText,
  utmMedium: nullableText,
  utmCampaign: nullableText,
  utmTerm: nullableText,
  website: z.string().max(0),
  formStartedAt: z.number().int().positive(),
});

function normalizeContact(contact: string) {
  const trimmed = contact.trim();
  if (trimmed.includes("@")) return { type: "email", value: trimmed.toLowerCase() };
  return { type: "phone", value: trimmed.replace(/[^0-9+]/g, "") };
}

function validContact(type: string, value: string) {
  if (type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return /^\+?[0-9]{10,15}$/.test(value);
}

export async function POST(request: NextRequest) {
  try {
    const payload = leadSchema.parse(await request.json());
    if (Date.now() - payload.formStartedAt < 1200) {
      return NextResponse.json({ ok: false, message: "잠시 후 다시 시도해 주세요." }, { status: 429 });
    }

    const contact = normalizeContact(payload.contact);
    if (!validContact(contact.type, contact.value)) {
      return NextResponse.json({ ok: false, message: "이메일 또는 휴대폰 번호를 확인해 주세요." }, { status: 400 });
    }

    const visitorId = getVisitorId(request);
    const salt = process.env.CONTACT_HASH_SALT ?? (process.env.NODE_ENV === "production" ? "" : "local-development-only");
    if (!salt) throw new Error("HASH_SALT_NOT_CONFIGURED");

    const contactHash = createHash("sha256").update(`${salt}:${contact.value}`).digest("hex");
    const mode = await storeLead({
      visitor_id: visitorId,
      contact_type: contact.type,
      contact_value: contact.value,
      contact_hash: contactHash,
      consent_version: "2026-11-11-v1",
      consented_at: new Date().toISOString(),
      retention_until: "2027-02-28",
      academy_status: payload.academyStatus,
      qualified: payload.academyStatus !== "regular",
      university: payload.university,
      report_variant: payload.reportVariant,
      price_variant: payload.priceVariant,
      source: payload.source,
      utm_source: payload.utmSource ?? null,
      utm_medium: payload.utmMedium ?? null,
      utm_campaign: payload.utmCampaign ?? null,
      utm_term: payload.utmTerm ?? null,
      created_at: new Date().toISOString(),
    });

    const response = NextResponse.json({ ok: true, mode });
    setVisitorCookie(response, visitorId);
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, message: "입력값을 다시 확인해 주세요." }, { status: 400 });
    }
    if (error instanceof Error && error.message === "STORAGE_NOT_CONFIGURED") {
      return NextResponse.json({ ok: false, message: "데이터 저장소가 연결되지 않았습니다." }, { status: 503 });
    }
    if (error instanceof Error && error.message === "HASH_SALT_NOT_CONFIGURED") {
      return NextResponse.json({ ok: false, message: "서버 보안 설정이 완료되지 않았습니다." }, { status: 503 });
    }
    return NextResponse.json({ ok: false, message: "신청을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }
}
