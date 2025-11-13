import Hero from "@/components/Hero";
import SocialProofBanner from "@/components/SocialProofBanner";
import ArrowIconTriangle from "@/icons/ArrowIconTriangle";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProofBanner />
      <ArrowIconTriangle className="text-white h-8 w-8 animate-bounce" />
    </>
  );
}
