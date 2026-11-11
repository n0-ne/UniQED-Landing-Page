import LandingPage from "@/components/landing-page";
import { defaultLandingConfig } from "@/lib/landing-config";

export default function Home() {
  return <LandingPage config={defaultLandingConfig} />;
}
