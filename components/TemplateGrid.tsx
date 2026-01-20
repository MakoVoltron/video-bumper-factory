"use client";

import { Template } from "@/types";
import Video from "./ui/Video";

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
