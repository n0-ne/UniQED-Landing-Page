export type LandingConfig = {
  slug: string;
  universityName: string | null;
  universityShortName: string | null;
  pageTitle: string;
  description: string;
  reportVariant: string;
  priceVariant: string;
  priceLabel: string;
  packageAnswers: number;
};

export const defaultLandingConfig: LandingConfig = {
  slug: "general",
  universityName: null,
  universityShortName: null,
  pageTitle: "수리논술 답안 첨삭",
  description:
    "손글씨 수리논술 답안을 대학별 공개 자료에 따라 분석하고, 감점 이유와 근거를 함께 보여주는 AI 첨삭 서비스입니다.",
  reportVariant: "grounded",
  priceVariant: "59000",
  priceLabel: "59,000",
  packageAnswers: 30,
};

export const universityLandingConfigs = {
  cau: {
    ...defaultLandingConfig,
    slug: "cau",
    universityName: "중앙대학교",
    universityShortName: "중앙대",
    pageTitle: "중앙대 수리논술 답안 첨삭",
    description:
      "중앙대 수리논술 답안을 사진으로 올리고, 항목별 점수와 감점 근거를 확인하는 UniQED 유니큐드 출시 알림 페이지입니다.",
  },
} satisfies Record<string, LandingConfig>;

export type UniversitySlug = keyof typeof universityLandingConfigs;

export function isUniversitySlug(slug: string): slug is UniversitySlug {
  return slug in universityLandingConfigs;
}

export function getUniversityLandingConfig(slug: UniversitySlug) {
  return universityLandingConfigs[slug];
}
