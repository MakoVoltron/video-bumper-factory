"use client";

import { Template } from "@/types";
import Video from "./ui/Video";
import { FILTER_TYPE } from "@/app/data";

type Category = typeof FILTER_TYPE.VERTICAL;

export type TemplateProp = {
  id: number;
  name: string;
  poster: string;
  preview: string;
  category: Category;
};

const TemplateGrid = ({ templates }: { templates: Template[] }) => {
  const handleClick = (id: string) => {
    alert(`BUT THIS ID: ${id}`);
  };

  return (
    <div className="grid grid-cols-12 gap-1">
      {templates.map((template) => (
        <Video
          key={template.id}
          {...template}
          onClick={() => handleClick(template.id)}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
