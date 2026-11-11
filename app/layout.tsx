import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "UniQED [유니큐드] | 수리논술 답안의 감점 근거까지",
    template: "%s | UniQED [유니큐드]",
  },
  description:
    "손글씨 수리논술 답안을 대학별 공개 기준에 따라 분석하고, 감점 이유와 근거를 함께 보여주는 AI 첨삭 서비스입니다.",
  keywords: ["수리논술", "수리논술 첨삭", "대학별 수리논술", "AI 채점"],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
