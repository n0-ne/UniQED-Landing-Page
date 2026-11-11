import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보 처리 안내",
  description: "UniQED 유니큐드 출시 알림 신청 시 수집하는 개인정보에 대한 안내입니다.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] py-12 sm:py-20">
      <article className="container max-w-3xl rounded-[28px] border border-[var(--line)] bg-[var(--white)] p-6 sm:p-12">
        <Link href="/" className="focus-ring text-sm font-black text-[var(--orange)] hover:underline">← 랜딩페이지로 돌아가기</Link>
        <h1 className="mt-8 text-3xl font-black tracking-[-0.04em] sm:text-5xl">개인정보 수집·이용 안내</h1>
        <p className="mt-4 leading-7 text-[var(--ink-soft)]">UniQED(유니큐드)는 출시 알림 신청을 위해 아래와 같이 최소한의 개인정보를 수집합니다.</p>

        <div className="mt-10 space-y-8">
          {[
            ["수집 항목", "이메일 주소 또는 휴대폰 번호 중 이용자가 입력한 연락처"],
            ["수집 목적", "수리논술 AI 첨삭 서비스의 출시 여부와 출시 정보를 1회 안내하기 위함"],
            ["보유 기간", "프로젝트 종료 시 또는 2027년 2월 28일까지 보유한 후 파기"],
            ["동의 거부", "개인정보 수집·이용에 동의하지 않을 수 있습니다. 다만 동의하지 않으면 출시 알림을 신청할 수 없습니다."],
            ["처리 범위", "결제 정보는 수집하지 않습니다. 연락처는 이벤트 분석 데이터와 분리해 저장하며 프로젝트 담당자만 접근합니다."],
          ].map(([title, body]) => (
            <section key={title} className="border-t border-[var(--line)] pt-6">
              <h2 className="text-lg font-black">{title}</h2>
              <p className="mt-3 leading-7 text-[var(--ink-soft)]">{body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-[var(--orange-soft)] p-5 text-sm leading-6">
          <strong>확인 필요:</strong> 본 안내는 프로젝트용 초안입니다. 실제 광고 운영 전 담당자 연락처, 처리 위탁·국외 이전 여부와 이용 중인 외부 서비스의 조건을 확인해 최종 문구를 확정해야 합니다.
        </div>
        <p className="mt-8 text-sm text-[var(--ink-soft)]">시행일: 2026년 11월 11일</p>
      </article>
    </main>
  );
}
