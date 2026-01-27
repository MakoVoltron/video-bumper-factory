"use client";

import { Template } from "@/types/video";
import Video from "./ui/Video";
import { useAdmin } from "@/lib/context/AdminContext";
import { Edit, ShoppingCartIcon, Trash } from "lucide-react";
import { VideoAction } from "@/types/video";
import { useState } from "react";
import ConfirmModal from "./ui/ConfirmModal";
import { useDeleteTemplate } from "@/hooks/useDeleteTemplate";
import { toast } from "react-toastify";
import EditTemplateModal from "./ui/EditTemplateModal";
import { CategoryLabels } from "@/app/(admin)/dashboard/add-template-form";

export type TemplateContext = {
  id: string;
  title: string;
  videoUrl: string;
  posterUrl: string;
  category: CategoryLabels;
};
type PendingAction =
  | { type: "delete"; template: Template }
  | { type: "edit"; template: Template }
  | null;

const TemplateGrid = ({ templates }: { templates: Template[] }) => {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const { isAdmin } = useAdmin();

  const deleteMutation = useDeleteTemplate();

  const buyTemplate = (id: string) => {
    alert(`BUY THIS ID: ${id}`);
  };

  const editTemplate = (id: string) => {
    alert(`EDIT TEMPLATE ID: ${id}`);
  };

  const requestDelete = (template: Template) => {
    setPendingAction({
      type: "delete",
      template,
    });
  };

  const requestEdit = (template: Template) => {
    setPendingAction({
      type: "edit",
      template,
    });
  };

  const getActions = (template: Template): VideoAction[] => {
    if (isAdmin) {
      return [
        {
          label: "Edit",
          onClick: () => requestEdit(template),
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

      {pendingAction?.type === "edit" && (
        <EditTemplateModal
          title="Edit template"
          description=""
          template={pendingAction.template}
          closeModal={() => setPendingAction(null)}
        />
      )}
    </div>
  );
};

export default TemplateGrid;
