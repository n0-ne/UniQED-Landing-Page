import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPage from "@/components/landing-page";
import {
  getUniversityLandingConfig,
  isUniversitySlug,
  universityLandingConfigs,
} from "@/lib/landing-config";

type UniversityPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(universityLandingConfigs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: UniversityPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isUniversitySlug(slug)) return {};

  const config = getUniversityLandingConfig(slug);
  return {
    title: config.pageTitle,
    description: config.description,
  };
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const { slug } = await params;
  if (!isUniversitySlug(slug)) notFound();

  return <LandingPage config={getUniversityLandingConfig(slug)} />;
}
