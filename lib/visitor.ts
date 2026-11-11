import { randomUUID } from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";

export const VISITOR_COOKIE = "uniqed_visitor_id";

export function getVisitorId(request: NextRequest) {
  return request.cookies.get(VISITOR_COOKIE)?.value ?? randomUUID();
}

export function setVisitorCookie(response: NextResponse, visitorId: string) {
  response.cookies.set(VISITOR_COOKIE, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 120,
    priority: "medium",
  });
}
