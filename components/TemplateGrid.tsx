"use client";

import { Template } from "@/types/video";
import Video from "./ui/Video";
import { useAdmin } from "@/lib/context/AdminContext";
import { Edit, ShoppingCartIcon, Trash } from "lucide-react";
import { VideoAction } from "@/types/video";
import { useEffect, useState } from "react";
import ConfirmModal from "./ui/ConfirmModal";
import { useDeleteTemplate } from "@/hooks/useDeleteTemplate";
import { toast } from "react-toastify";

import { CategoryLabels } from "@/app/(admin)/dashboard/add-template-form";
import ModalTemplate from "./ModalTemplate";
import EditTemplateForm from "@/app/(admin)/dashboard/edit-template-form";
import StripeCheckoutForm from "./StripeCheckoutForm";

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
  | { type: "buy"; template: Template }
  | null;

const TemplateGrid = ({ templates }: { templates: Template[] }) => {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [sessionKey, setSessionKey] = useState(0);

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

  const requestPurchase = (template: Template) => {
    setSessionKey((k) => k + 1);
    setPendingAction({
      type: "buy",
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
        onClick: () => requestPurchase(template),
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
        <ModalTemplate
          title="Edit template"
          description=""
          closeModal={() => setPendingAction(null)}
        >
          <EditTemplateForm
            template={pendingAction.template}
            onSuccess={() => setPendingAction(null)}
            onError={() => setPendingAction(null)}
          />
        </ModalTemplate>
      )}

      {pendingAction?.type === "buy" && (
        <ModalTemplate
          title={`Buy ${pendingAction.template.title}`}
          description=""
          closeModal={() => setPendingAction(null)}
        >
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <StripeCheckoutForm
                key={sessionKey}
                template={pendingAction.template}
              />
            </div>
            <div className="col-span-6">
              <Video
                posterUrl={pendingAction.template.posterUrl}
                videoUrl={pendingAction.template.videoUrl}
                mode={"loop"}
              />
            </div>
          </div>
        </ModalTemplate>
      )}
    </div>
  );
};

export default TemplateGrid;
