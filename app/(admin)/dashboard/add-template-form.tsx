"use client";

import { toast } from "react-toastify";
import { useUploadTemplate } from "@/hooks/useUploadTemplate";
import { redirect } from "next/navigation";
import { CATEGORY_TYPE } from "@/lib/constants";
import TemplateForm from "@/components/TemplateForm";

export type CategoryLabels = (typeof CATEGORY_TYPE)[number]["label"];

const AddTemplateForm = () => {
  const { mutateAsync, isPending } = useUploadTemplate();

  return (
    <TemplateForm
      submitLabel="Upload"
      isSubmitting={isPending}
      onSubmit={async ({
        title,
        category,
        posterFile,
        videoFile,
        onProgress,
      }) => {
        if (!posterFile || !videoFile) return;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("poster", posterFile);
        formData.append("video", videoFile);

        await mutateAsync({ formData, onProgress });

        toast.success("New template added.");
        redirect("/dashboard");
      }}
    />
  );
};

export default AddTemplateForm;
