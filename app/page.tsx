import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import SocialProofBanner from "@/components/SocialProofBanner";
import Section from "@/components/util/Section";
import ArrowIconTriangle from "@/icons/ArrowIconTriangle";

export default function Home() {
  return (
    <>
      <Section>
        <Hero />
        <SocialProofBanner />
        <ArrowIconTriangle
          className="text-white h-8 w-8 animate-bounce hover:text-purple-600 cursor-pointer"
          target="1"
        />
      </Section>

      <Section
        id="1"
        className="bg-linear-to-b from-black via-purple-950/50 to-black"
      >
        <SectionTitle />
      </Section>
    </>
  );
}
