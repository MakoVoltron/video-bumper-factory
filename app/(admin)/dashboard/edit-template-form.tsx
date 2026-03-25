"use client";

import TemplateForm from "@/components/TemplateForm";
import { CategoryLabels } from "./add-template-form";
import { useUpdateTemplate } from "@/hooks/useUpdateTemplate";
import { toast } from "react-toastify";

type EditTemplateFormProps = {
  template: {
    id: string;
    title: string;
    description: string;
    category: CategoryLabels;
    posterUrl: string;
    videoUrl: string;
  };
  onSuccess: () => void;
  onError: () => void;
  modal?: boolean;
};

const EditTemplateForm = ({
  template,
  onSuccess,
  onError,
}: EditTemplateFormProps) => {
  const { mutateAsync, isPending } = useUpdateTemplate();

  return (
    <TemplateForm
      submitLabel="Save changes"
      isSubmitting={isPending}
      initialValues={{
        title: template.title,
        description: template.description,
        category: template.category,
        posterUrl: template.posterUrl,
        videoUrl: template.videoUrl,
      }}
      modal
      onSubmit={async ({
        title,
        description,
        category,
        posterFile,
        videoFile,
        onProgress,
      }) => {
        const formData = new FormData();
        formData.append("videoId", template.id);
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);

        if (posterFile) formData.append("poster", posterFile);
        if (videoFile) formData.append("video", videoFile);

        await mutateAsync(
          { formData, onProgress },
          {
            onSuccess: () => {
              onSuccess();
              toast.success("Template updated");
            },
            onError: () => {
              onError();
              toast.warn("Template could not be updated");
            },
          },
        );
      }}
    />
  );
};

export default EditTemplateForm;
