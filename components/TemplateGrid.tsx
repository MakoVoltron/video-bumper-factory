"use client";

import { Template } from "@/types";
import Video from "./ui/Video";
import { useAdmin } from "@/lib/context/AdminContext";
import { Edit, ShoppingCartIcon, Trash } from "lucide-react";
import { VideoAction } from "@/types/video";

const TemplateGrid = ({ templates }: { templates: Template[] }) => {
  const { isAdmin } = useAdmin();

  console.log("isAdmin");
  console.log(isAdmin);

  const buyTemplate = (id: string) => {
    alert(`BUY THIS ID: ${id}`);
  };

  const editTemplate = (id: string) => {
    alert(`EDIT TEMPLATE ID: ${id}`);
  };

  const deleteTemplate = (id: string) => {
    alert(`DELETE TEMPLATE ID: ${id}`);
  };

  const getActions = (template: Template): VideoAction[] => {
    if (isAdmin) {
      return [
        {
          label: "Edit",
          onClick: () => editTemplate(template.id),
          icon: <Edit />,
        },
        {
          label: "Delete",
          variant: "danger",
          onClick: () => deleteTemplate(template.id),
          icon: <Trash />,
        },
      ];
    }
    return [
      {
        label: "Buy",
        onClick: () => buyTemplate(template.id),
        icon: <ShoppingCartIcon />,
      },
    ];
  };

  return (
    <div className="grid grid-cols-12 gap-1">
      {templates.map((template) => {
        return (
          <Video
            key={template.id}
            actions={getActions(template)}
            {...template}
          />
        );
      })}
    </div>
  );
};

export default TemplateGrid;
