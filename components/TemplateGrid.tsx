"use client";

import { Template } from "@/types";
import Video from "./ui/Video";
import { useAdmin } from "@/lib/context/AdminContext";
import { Edit, ShoppingCartIcon, Trash } from "lucide-react";
import { VideoAction } from "@/types/video";
import { useState } from "react";
import ConfirmModal from "./ui/ConfirmModal";
import { useDeleteTemplate } from "@/hooks/useDeleteVideo";
import { toast } from "react-toastify";

type TemplateContext = {
  id: string;
  title: string;
  videoUrl: string;
  posterUrl: string;
};
type PendingAction = { type: "delete"; template: TemplateContext } | null;

const TemplateGrid = ({ templates }: { templates: Template[] }) => {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const { isAdmin } = useAdmin();

  const deleteMutation = useDeleteTemplate();

  console.log("isAdmin");
  console.log(isAdmin);

  const buyTemplate = (id: string) => {
    alert(`BUY THIS ID: ${id}`);
  };

  const editTemplate = (id: string) => {
    alert(`EDIT TEMPLATE ID: ${id}`);
  };

  const requestDelete = (template: Template) => {
    setPendingAction({
      type: "delete",
      template: {
        id: template.id,
        title: template.title,
        videoUrl: template.videoUrl,
        posterUrl: template.posterUrl,
      },
    });
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
          onClick: () => requestDelete(template),
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

      {pendingAction?.type === "delete" && (
        <ConfirmModal
          title="Delete template?"
          description="This action cannot be undone"
          videoUrl={pendingAction.template.videoUrl}
          posterUrl={pendingAction.template.posterUrl}
          isLoading={deleteMutation.isPending}
          onCancel={() => setPendingAction(null)}
          onConfirm={() =>
            deleteMutation.mutate(pendingAction.template.id, {
              onSuccess: () => {
                setPendingAction(null);
                toast("Template was deleted.");
              },
            })
          }
        />
      )}
    </div>
  );
};

export default TemplateGrid;
