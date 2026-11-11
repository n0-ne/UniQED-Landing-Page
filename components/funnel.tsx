"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/client-analytics";
import type { LandingConfig } from "@/lib/landing-config";

type AcademyStatus = "regular" | "independent" | "final-only";

function getAttribution() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("from") ?? params.get("utm_source") ?? "direct",
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmTerm: params.get("utm_term"),
  };
}

export default function Funnel({ config }: { config: LandingConfig }) {
  const [academyStatus, setAcademyStatus] = useState<AcademyStatus | "">("");
  const [selectedUniversity, setSelectedUniversity] = useState(
    config.universityName ? config.slug : "undecided",
  );
  const [showPrice, setShowPrice] = useState(false);
  const [qualificationError, setQualificationError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const startedAtRef = useRef(0);
  const priceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
    const key = `uniqed-event-${config.slug}-page_view`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      void trackEvent({
        eventName: "page_view",
        university: config.slug,
        reportVariant: config.reportVariant,
        priceVariant: config.priceVariant,
      });
    }
  }, [config.priceVariant, config.reportVariant, config.slug]);

  useEffect(() => {
    if (!modalOpen) return;
    contactRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [modalOpen]);

  function submitQualification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!academyStatus) {
      setQualificationError("현재 준비 방식을 선택해 주세요.");
      return;
    }

    setQualificationError("");
    setShowPrice(true);
    const qualified = academyStatus !== "regular";
    void trackEvent({
      eventName: "qualification_submit",
      university: selectedUniversity,
      reportVariant: config.reportVariant,
      priceVariant: config.priceVariant,
      metadata: { academyStatus, qualified },
    });
    void trackEvent({
      eventName: "price_view",
      university: selectedUniversity,
      reportVariant: config.reportVariant,
      priceVariant: config.priceVariant,
      metadata: { qualified },
    });
    window.setTimeout(() => priceRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  }

  function openPrelaunch() {
    setModalOpen(true);
    void trackEvent({
      eventName: "cta_click",
      university: selectedUniversity,
      reportVariant: config.reportVariant,
      priceVariant: config.priceVariant,
      metadata: { academyStatus, qualified: academyStatus !== "regular" },
    });
    void trackEvent({
      eventName: "prelaunch_notice_view",
      university: selectedUniversity,
      reportVariant: config.reportVariant,
      priceVariant: config.priceVariant,
    });
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    if (!contact.trim()) {
      setSubmitError("이메일 또는 휴대폰 번호를 입력해 주세요.");
      return;
    }
    if (!consent) {
      setSubmitError("출시 알림을 위한 개인정보 수집·이용에 동의해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact,
          consent,
          academyStatus,
          university: selectedUniversity,
          reportVariant: config.reportVariant,
          priceVariant: config.priceVariant,
          website: honeypot,
          formStartedAt: startedAtRef.current,
          ...getAttribution(),
        }),
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "신청을 저장하지 못했습니다.");
      }

      setSubmitted(true);
      void trackEvent({
        eventName: "lead_submit",
        university: selectedUniversity,
        reportVariant: config.reportVariant,
        priceVariant: config.priceVariant,
        metadata: { academyStatus, qualified: academyStatus !== "regular" },
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="notify" className="bg-[var(--green)] py-24 text-white sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.14em] text-[#b8d8cf]">
            <span className="h-px w-5 bg-current" /> EARLY ACCESS
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.045em] sm:text-5xl">내 준비 방식에 맞는지<br className="sm:hidden" /> 먼저 확인해 볼까요?</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/70">두 가지 질문에 답하면 현재 검증 중인 시즌 패스 가격을 보여드려요.</p>
        </div>

        <form onSubmit={submitQualification} className="mx-auto mt-12 max-w-3xl rounded-[28px] bg-[var(--white)] p-5 text-[var(--ink)] shadow-[0_22px_70px_rgba(0,0,0,0.16)] sm:p-9">
          <fieldset>
            <legend className="text-lg font-black sm:text-xl">1. 수리논술 학원이나 과외를 정기적으로 다니고 있나요?</legend>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["independent", "안 다님", "혼자 준비 중"],
                ["final-only", "특강·파이널만", "정규 수업은 안 다님"],
                ["regular", "정기적으로 다님", "학원·과외 이용 중"],
              ].map(([value, label, helper]) => (
                <label key={value} className={`focus-within:ring-3 focus-within:ring-[rgba(226,85,39,0.28)] cursor-pointer rounded-2xl border p-4 transition ${academyStatus === value ? "border-[var(--orange)] bg-[var(--orange-soft)]" : "border-[var(--line)] hover:border-[var(--ink)]"}`}>
                  <input
                    type="radio"
                    name="academyStatus"
                    value={value}
                    checked={academyStatus === value}
                    onChange={() => setAcademyStatus(value as AcademyStatus)}
                    className="sr-only"
                  />
                  <span className="block font-extrabold">{label}</span>
                  <span className="mt-1 block text-xs text-[var(--ink-soft)]">{helper}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8">
            <label htmlFor="university" className="text-lg font-black sm:text-xl">2. 준비하는 대학은 어디인가요?</label>
            <select
              id="university"
              value={selectedUniversity}
              onChange={(event) => setSelectedUniversity(event.target.value)}
              className="focus-ring mt-4 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-4 font-bold"
            >
              {config.universityName ? (
                <option value={config.slug}>{config.universityName}</option>
              ) : (
                <>
                  <option value="undecided">아직 정하지 않았어요</option>
                  <option value="multi">여러 대학을 함께 준비해요</option>
                  <option value="other">기타 대학</option>
                </>
              )}
            </select>
            <p className="mt-2 text-xs text-[var(--ink-soft)]">
              {config.universityName
                ? `${config.universityName} 지원자를 위한 페이지입니다.`
                : "대학별 전용 페이지는 검증 순서에 따라 추가할 예정입니다."}
            </p>
          </div>

          {qualificationError && <p role="alert" className="mt-5 rounded-xl bg-[#fff0ea] p-3 text-sm font-bold text-[#aa3511]">{qualificationError}</p>}

          <button type="submit" className="focus-ring mt-7 w-full rounded-2xl bg-[var(--ink)] px-5 py-4 font-black text-white transition hover:bg-[var(--orange)]">가격 확인하기</button>
        </form>

        {showPrice && (
          <div ref={priceRef} className="mx-auto mt-8 max-w-3xl scroll-mt-10 rounded-[28px] border border-white/25 bg-[#103a33] p-5 sm:p-9">
            <div className="grid items-center gap-7 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-black tracking-[0.14em] text-[#b8d8cf]">검증 중인 단일 상품</p>
                <h3 className="mt-3 text-2xl font-black">수리논술 시즌 패스</h3>
                <ul className="mt-5 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
                  <li className="flex items-center gap-2"><span className="text-[var(--orange)]">✓</span> 답안 최대 {config.packageAnswers}장</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--orange)]">✓</span> 항목별 점수와 감점 이유</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--orange)]">✓</span> 대학 공개 자료 근거</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--orange)]">✓</span> 고쳐 쓴 답안 재확인</li>
                </ul>
              </div>
              <div className="sm:text-right">
                <p className="text-sm text-white/55">출시 검토 가격</p>
                <p className="mt-1 text-4xl font-black tracking-[-0.04em]">{config.priceLabel}<span className="ml-1 text-base">원</span></p>
                <button type="button" onClick={openPrelaunch} className="focus-ring mt-5 w-full rounded-full bg-[var(--orange)] px-6 py-3.5 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#cb4217] sm:w-auto">이 가격으로 시작하기</button>
              </div>
            </div>
            {academyStatus === "regular" && <p className="mt-6 rounded-xl bg-white/8 p-3 text-sm text-white/65">현재 핵심 검증 대상은 정기 학원·과외 없이 준비하는 학생입니다. 그래도 출시 알림은 신청할 수 있어요.</p>}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[rgba(8,16,30,0.72)] p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setModalOpen(false); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="prelaunch-title" className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-[var(--white)] p-6 text-[var(--ink)] shadow-2xl sm:p-8">
            {!submitted ? (
              <>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <span className="inline-block rounded-full bg-[var(--orange-soft)] px-3 py-1 text-xs font-black text-[var(--orange)]">출시 준비 중</span>
                    <h3 id="prelaunch-title" className="mt-4 text-3xl font-black tracking-[-0.04em]">아직 준비 중이에요.</h3>
                  </div>
                  <button type="button" onClick={() => setModalOpen(false)} aria-label="닫기" className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line)] text-xl hover:bg-[var(--paper)]">×</button>
                </div>
                <p className="mt-5 leading-7 text-[var(--ink-soft)]">결제 정보는 받지 않습니다. 출시가 결정되면 방금 확인한 가격안과 함께 한 번만 알려드릴게요.</p>
                <form onSubmit={submitLead} className="mt-7">
                  <label htmlFor="contact" className="text-sm font-black">이메일 또는 휴대폰 번호</label>
                  <input
                    ref={contactRef}
                    id="contact"
                    type="text"
                    inputMode="email"
                    autoComplete="email"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    placeholder="example@email.com"
                    className="focus-ring mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-4"
                  />
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="website">웹사이트</label>
                    <input id="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
                  </div>
                  <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[var(--ink-soft)]">
                    <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-4 w-4 accent-[var(--orange)]" />
                    <span><strong className="text-[var(--ink)]">[필수]</strong> 출시 알림을 위한 연락처 수집·이용에 동의합니다. 프로젝트 종료 시 파기합니다. <a href="/privacy" className="font-bold underline underline-offset-2">자세히</a></span>
                  </label>
                  {submitError && <p role="alert" className="mt-4 rounded-xl bg-[#fff0ea] p-3 text-sm font-bold text-[#aa3511]">{submitError}</p>}
                  <button type="submit" disabled={submitting} className="focus-ring mt-6 w-full rounded-2xl bg-[var(--orange)] px-5 py-4 font-black text-white transition hover:bg-[#cb4217] disabled:cursor-not-allowed disabled:opacity-55">{submitting ? "신청 중..." : "출시 알림 신청하기"}</button>
                </form>
              </>
            ) : (
              <div className="py-5 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--green-soft)] text-3xl text-[var(--green)]">✓</div>
                <h3 id="prelaunch-title" className="mt-6 text-3xl font-black tracking-[-0.04em]">신청됐어요.</h3>
                <p className="mt-4 leading-7 text-[var(--ink-soft)]">출시가 결정되면 남겨주신 연락처로 한 번만 알려드릴게요.</p>
                <button type="button" onClick={() => setModalOpen(false)} className="focus-ring mt-7 rounded-full bg-[var(--ink)] px-7 py-3 font-black text-white">확인</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
