import TemplateList from "@/components/TemplateList";

import Section from "@/components/util/Section";

const TemplatesPage = () => {
  return (
    <div className="w-full">
      <h2>Templates page</h2>
      <Section>
        <TemplateList />
      </Section>
    </div>
  );
};

export default TemplatesPage;
