"use client";

import TemplateForm from "@/components/TemplateForm";
import { CategoryLabels } from "./add-template-form";
import { useUpdateTemplate } from "@/hooks/useUpdateTemplate";
import { toast } from "react-toastify";

type EditTemplateFormProps = {
  template: {
    id: string;
    title: string;
    category: CategoryLabels;
    posterUrl: string;
    videoUrl: string;
  };
  closeModal: () => void;
};

const EditTemplateForm = ({ template, closeModal }: EditTemplateFormProps) => {
  const { mutateAsync, isPending } = useUpdateTemplate();

  return (
    <TemplateForm
      submitLabel="Save changes"
      isSubmitting={isPending}
      initialValues={{
        title: template.title,
        category: template.category,
        posterUrl: template.posterUrl,
        videoUrl: template.videoUrl,
      }}
      onSubmit={async ({
        title,
        category,
        posterFile,
        videoFile,
        onProgress,
      }) => {
        const formData = new FormData();
        formData.append("videoId", template.id);
        formData.append("title", title);
        formData.append("category", category);

        if (posterFile) formData.append("poster", posterFile);
        if (videoFile) formData.append("video", videoFile);

        await mutateAsync(
          { formData, onProgress },
          {
            onSuccess: () => {
              closeModal();
              toast.success("Template updated");
            },
            onError: () => {
              toast.warn("Template could not be updated");
            },
          },
        );
      }}
    />
  );
};

export default EditTemplateForm;
