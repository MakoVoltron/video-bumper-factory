import FeatureBox from "@/components/FeatureBox";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import SocialProofBanner from "@/components/SocialProofBanner";
import InnerSection from "@/components/util/InnerSection";
import Section from "@/components/util/Section";
import ArrowIconTriangle from "@/icons/ArrowIconTriangle";

import { featuresData } from "../data";
import Grid from "@/components/util/Grid";
import Button from "@/components/ui/Button";

import TemplateGrid from "@/components/TemplateGrid";
import Filters from "@/components/Filters";
import { prisma } from "@/lib/db/client";

export default async function Home() {
  const templates = await prisma.templatePreview.findMany();
  console.log("templates");
  console.log(templates);

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
          <Grid>
            {featuresData.map((props, index) => (
              <FeatureBox key={index} {...props} />
            ))}
          </Grid>
          <div className="my-15">
            <Button text="Show me templates" />
          </div>
        </InnerSection>
      </Section>
      <Section>
        <Filters />
        <TemplateGrid templates={templates} />
      </Section>
    </>
  );
}
