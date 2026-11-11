import EventMarker from "@/components/event-marker";
import Funnel from "@/components/funnel";
import type { LandingConfig } from "@/lib/landing-config";

function ArrowDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path d="M12 4v15m0 0-6-6m6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LandingPage({ config }: { config: LandingConfig }) {
  const universityLabel = config.universityShortName
    ? `${config.universityShortName} 수리논술`
    : "수리논술 AI 첨삭";
  const heroCopy = config.universityShortName
    ? `손글씨로 푼 ${config.universityShortName} 수리논술 답안을 사진으로 올리면, 항목별 점수와 감점 이유를 대학 공개 자료의 근거와 함께 보여드려요.`
    : "손글씨로 푼 수리논술 답안을 사진으로 올리면, 지원 대학의 공개 자료를 찾아 항목별 점수와 감점 이유를 근거와 함께 보여드려요.";
  const sampleTitle = config.universityShortName
    ? `${config.universityShortName} 자연계열 · 문항 2-1`
    : "수리논술 예시 · 문항 2-1";

  return (
    <div className="page-shell min-h-screen">
      <header className="border-b border-[var(--line)] bg-[rgba(245,241,232,0.88)] backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <a href="#top" className="focus-ring flex items-center gap-2 rounded-md" aria-label="UniQED 유니큐드 홈">
            <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--ink)] text-lg font-black text-white">Q</span>
            <span className="text-[18px] font-black tracking-[-0.03em]">UniQED</span>
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-[var(--ink-soft)] sm:inline">{universityLabel}</span>
            <a
              href="#notify"
              className="focus-ring rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--green)]"
            >
              출시 알림 받기
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="container grid min-h-[760px] items-center gap-12 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:py-24">
          <div className="float-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,254,251,0.72)] px-3 py-1.5 text-xs font-bold text-[var(--green)]">
              <span className="h-2 w-2 rounded-full bg-[var(--orange)]" />
              2027학년도 수리논술 · 출시 준비 중
            </div>
            <h1 className="max-w-[680px] text-[clamp(2.6rem,6vw,5.25rem)] font-black leading-[1.02] tracking-[-0.065em]">
              점수보다 먼저,
              <br />
              <span className="text-[var(--orange)]">왜 감점됐는지</span>
              <br />
              확인하세요.
            </h1>
            <p className="mt-7 max-w-[590px] text-[17px] leading-8 text-[var(--ink-soft)] sm:text-lg">
              {heroCopy}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#sample-report"
                className="focus-ring inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[var(--orange)] px-6 py-3.5 font-extrabold text-white shadow-[0_12px_30px_rgba(226,85,39,0.24)] transition hover:-translate-y-0.5 hover:bg-[#cb4217]"
              >
                샘플 채점 리포트 보기 <ArrowDown />
              </a>
              <a
                href="#how-it-works"
                className="focus-ring inline-flex min-h-13 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--white)] px-6 py-3.5 font-bold transition hover:border-[var(--ink)]"
              >
                이용 방법 먼저 보기
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs leading-5 text-[var(--ink-soft)]">
              <span className="inline-grid h-5 w-5 place-items-center rounded-full bg-[var(--green-soft)] text-[var(--green)]"><Check /></span>
              결제 정보를 받지 않습니다. 버튼을 누르면 준비 중임을 즉시 알려드려요.
            </p>
          </div>

          <div className="float-in-delay relative mx-auto w-full max-w-[540px] lg:mr-0">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full border border-[var(--orange)] opacity-30" />
            <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-[var(--green-soft)]" />
            <div className="paper-grid relative rotate-[1.2deg] rounded-[28px] border border-[var(--ink)] bg-[var(--white)] p-5 shadow-[18px_22px_0_rgba(21,32,58,0.11)] sm:p-7">
              <div className="flex items-start justify-between border-b border-dashed border-[var(--line)] pb-5">
                <div>
                  <p className="text-xs font-bold tracking-[0.12em] text-[var(--ink-soft)]">SAMPLE REPORT</p>
                  <h2 className="mt-2 text-xl font-black">{sampleTitle}</h2>
                </div>
                <div className="rounded-2xl bg-[var(--ink)] px-4 py-3 text-center text-white">
                  <strong className="text-2xl">7</strong><span className="text-sm opacity-70"> / 10</span>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-[var(--paper)] p-5">
                <p className="math-serif text-[17px] leading-8 text-[var(--ink)]">
                  f(x)=x³−3x 이므로 f′(x)=3x²−3.
                  <br />x=1에서 극솟값을 갖는다.
                </p>
                <div className="mt-3 h-0.5 w-44 bg-[var(--orange)]" />
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3 rounded-2xl border border-[#e7b9a6] bg-[var(--orange-soft)] p-4">
                  <span className="rounded-lg bg-[var(--orange)] px-2 py-1 text-xs font-black text-white">−2</span>
                  <div>
                    <p className="font-extrabold">극값 판정의 근거가 빠졌어요</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">도함수의 부호 변화를 확인해야 합니다.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-[#a7c9be] bg-[var(--green-soft)] p-4">
                  <span className="mt-0.5 rounded-lg bg-[var(--green)] px-2 py-1 text-xs font-black text-white">근거</span>
                  <div>
                    <p className="font-extrabold">대학 공개 평가 요소와 연결</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">출제 의도 · 풀이 과정 평가 항목 ②</p>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-center text-[11px] leading-5 text-[var(--ink-soft)]">
                위 내용은 랜딩페이지 구성을 보여주기 위한 예시입니다.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-[var(--ink)] text-white">
          <div className="container flex flex-col gap-3 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="font-bold">경희대학교 창업 수업 팀 프로젝트</p>
            <p className="text-white/65">대학이 운영하거나 검수한 공식 서비스가 아닙니다.</p>
          </div>
        </section>

        <section className="container py-24 sm:py-32">
          <div className="max-w-2xl">
            <span className="section-kicker">Why now</span>
            <h2 className="text-3xl font-black tracking-[-0.045em] sm:text-5xl">혼자 준비할수록, 확인할 곳이 없습니다.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["01", "기다림", "첨삭 한 번에 며칠이 걸리면, 고쳐 쓴 답안을 다시 확인하기 어렵습니다."],
              ["02", "설명 없는 점수", "AI가 점수를 줘도 무엇을 근거로 감점했는지 모르면 믿기 어렵습니다."],
              ["03", "끊기는 반복", "한 번의 첨삭으로 끝나면 쓰고, 고치고, 다시 확인하는 연습이 이어지지 않습니다."],
            ].map(([number, title, copy]) => (
              <article key={number} className="group min-h-64 rounded-[24px] border border-[var(--line)] bg-[rgba(255,254,251,0.7)] p-7 transition hover:-translate-y-1 hover:border-[var(--ink)]">
                <p className="math-serif text-4xl italic text-[var(--orange)]">{number}</p>
                <h3 className="mt-8 text-2xl font-black">{title}</h3>
                <p className="mt-4 leading-7 text-[var(--ink-soft)]">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="sample-report" className="bg-[var(--white)] py-24 sm:py-32">
          <EventMarker
            eventName="sample_report_view"
            university={config.slug}
            reportVariant={config.reportVariant}
            priceVariant={config.priceVariant}
          />
          <div className="container grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <span className="section-kicker">Grounded feedback</span>
              <h2 className="text-3xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">감점과 근거를<br />한 화면에서.</h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--ink-soft)]">
                단순히 “설명이 부족합니다”라고 끝내지 않습니다. 어떤 풀이가 빠졌고,
                참고한 공개 자료의 어느 평가 요소와 연결되는지 구분해 보여주는 것이 목표입니다.
              </p>
              <ul className="mt-8 space-y-4">
                {["답안의 어느 줄에서 문제가 생겼는지", "몇 점이 왜 감점됐는지", "대학 공개 자료와 AI 조언이 어떻게 다른지"].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-bold">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--green-soft)] text-[var(--green)]"><Check /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-[var(--ink)] bg-[var(--paper)] shadow-[12px_14px_0_var(--paper-deep)]">
              <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--ink)] px-5 py-4 text-white sm:px-7">
                <div>
                  <p className="text-xs font-bold text-white/60">{config.universityShortName ? `${config.universityShortName} 자연계열` : "수리논술"} · 예시 리포트</p>
                  <p className="mt-1 font-extrabold">문항 2-1 채점 결과</p>
                </div>
                <strong className="text-2xl">7/10</strong>
              </div>
              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="paper-grid border-b border-[var(--line)] p-6 md:border-b-0 md:border-r sm:p-8">
                  <p className="text-xs font-black tracking-[0.12em] text-[var(--ink-soft)]">내 답안</p>
                  <div className="math-serif mt-6 rotate-[-1deg] text-[17px] leading-9">
                    <p>f′(x)=3x²−3=3(x−1)(x+1)</p>
                    <p>x=1에서 극솟값을 갖고,</p>
                    <p>따라서 최솟값은 f(1)=−2이다.</p>
                  </div>
                  <div className="mt-8 rounded-xl border border-dashed border-[var(--orange)] bg-[var(--orange-soft)] p-3 text-sm font-bold text-[var(--orange)]">
                    판정 과정이 생략된 부분
                  </div>
                </div>
                <div className="space-y-4 p-6 sm:p-8">
                  <div className="rounded-2xl border border-[#e7b9a6] bg-[var(--white)] p-5">
                    <div className="flex items-center justify-between">
                      <strong>감점 항목</strong><span className="rounded-full bg-[var(--orange-soft)] px-3 py-1 text-sm font-black text-[var(--orange)]">−2점</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">도함수의 부호 변화를 제시하지 않아 극솟값이라는 결론의 근거가 충분하지 않습니다.</p>
                  </div>
                  <div className="rounded-2xl border border-[#a7c9be] bg-[var(--green-soft)] p-5">
                    <p className="text-xs font-black tracking-[0.1em] text-[var(--green)]">대학 공개 자료 기반</p>
                    <p className="mt-3 font-bold leading-6">평가 요소 ② 풀이 과정을 논리적으로 제시했는가</p>
                    <p className="mt-4 text-sm font-extrabold text-[var(--green)]">자료 출처는 공개 전 연결 예정</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--line)] bg-[var(--white)] p-5">
                    <p className="text-xs font-black tracking-[0.1em] text-[var(--ink-soft)]">다시 쓸 때</p>
                    <p className="mt-2 text-sm leading-6">x=1 전후에서 f′(x)의 부호가 −에서 +로 바뀐다는 문장을 추가해 보세요.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="container py-24 sm:py-32">
          <div className="text-center">
            <span className="section-kicker">How it works</span>
            <h2 className="text-3xl font-black tracking-[-0.045em] sm:text-5xl">종이에 풀던 방식 그대로.</h2>
          </div>
          <div className="relative mt-14 grid gap-5 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-12 hidden border-t border-dashed border-[var(--ink)] md:block" />
            {[
              ["1", "기출 풀기", "지원 대학의 기출문제를 종이에 풉니다."],
              ["2", "사진 올리기", "답안이 잘 보이도록 정면에서 촬영합니다."],
              ["3", "근거로 고치기", "점수, 감점 이유, 근거를 보고 다시 씁니다."],
            ].map(([step, title, copy]) => (
              <article key={step} className="relative text-center">
                <span className="relative z-10 mx-auto grid h-24 w-24 place-items-center rounded-full border border-[var(--ink)] bg-[var(--white)] text-3xl font-black text-[var(--orange)] shadow-[5px_6px_0_var(--paper-deep)]">{step}</span>
                <h3 className="mt-7 text-xl font-black">{title}</h3>
                <p className="mx-auto mt-3 max-w-64 leading-7 text-[var(--ink-soft)]">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <Funnel config={config} />

        <section className="container py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <span className="section-kicker">Before you decide</span>
              <h2 className="text-3xl font-black tracking-[-0.045em] sm:text-5xl">꼭 확인해 주세요.</h2>
              <p className="mt-5 leading-7 text-[var(--ink-soft)]">아직 검증 중인 서비스입니다. 할 수 있는 것과 아직 확인되지 않은 것을 분명히 밝힙니다.</p>
            </div>
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {[
                ["대학의 공식 서비스인가요?", `아니요. 경희대학교 창업 수업에서 진행하는 팀 프로젝트이며, ${config.universityName ? `${config.universityName}가` : "각 대학이"} 운영하거나 검수한 서비스가 아닙니다.`],
                ["실제 입시 점수와 같나요?", "아니요. 공개된 기출·예시답안·평가 자료를 바탕으로 한 연습용 분석입니다. 실제 입시 채점 결과와 다를 수 있습니다."],
                ["손글씨가 잘못 읽히면 어떻게 하나요?", "인식이 불확실한 줄을 별도로 표시하는 방식을 준비하고 있습니다. 현재 정확도는 제품 검증 단계에서 확인할 예정입니다."],
                ["지금 결제할 수 있나요?", "아니요. 이번 페이지에서는 결제나 예약금을 받지 않습니다. 출시 알림을 신청한 분께만 한 번 안내드립니다."],
              ].map(([question, answer]) => (
                <details key={question} className="group py-5">
                  <summary className="focus-ring flex cursor-pointer list-none items-center justify-between rounded-md text-lg font-extrabold">
                    {question}<span className="ml-5 text-2xl font-light transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-2xl pt-4 leading-7 text-[var(--ink-soft)]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="container flex flex-col gap-7 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-lg font-black"><span className="text-[var(--orange)]">Q</span> UniQED</div>
            <p className="mt-3 text-sm leading-6 text-white/60">경희대학교 SW 스타트업 프로젝트 · 수리논술 AI 첨삭 PMF 검증</p>
          </div>
          <div className="flex gap-5 text-sm text-white/70">
            <a className="focus-ring rounded hover:text-white" href="/privacy">개인정보 처리 안내</a>
            <span>문의 이메일 준비 중</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
