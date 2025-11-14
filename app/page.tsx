import FeatureBox from "@/components/FeatureBox";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import SocialProofBanner from "@/components/SocialProofBanner";
import InnerSection from "@/components/util/InnerSection";
import Section from "@/components/util/Section";
import ArrowIconTriangle from "@/icons/ArrowIconTriangle";

import { featuresData } from "./data";

export default function Home() {
  return (
    <>
      <Section>
        <Hero />
        <SocialProofBanner />
        <ArrowIconTriangle
          className="text-white h-8 w-8 animate-bounce hover:text-purple-600 cursor-pointer"
          target="what-we-do"
        />
      </Section>

      <Section
        id="what-we-do"
        className="bg-linear-to-b from-black via-purple-950/50 to-black"
      >
        <InnerSection>
          <SectionTitle />

          <div className="grid grid-cols-12  w-full gap-3">
            {featuresData.map((props, index) => (
              <FeatureBox key={index} {...props} />
            ))}
          </div>
        </InnerSection>
      </Section>
    </>
  );
}
