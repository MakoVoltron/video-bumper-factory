import EditTemplateForm from "@/app/(admin)/dashboard/edit-template-form";
import { Template } from "@/types/video";
import CloseButton from "./CloseButton";

type EditTemplateModalProps = {
  title: string;
  description: string;
  template: Template;
  videoUrl?: string;
  posterUrl?: string;
  isLoading?: boolean;
  closeModal: () => void;
};

const EditTemplateModal = ({
  template,
  closeModal,
}: EditTemplateModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="theme-light bg-bg text-fg p-6 rounded space-y-4 w-[800px]">
        <CloseButton onClick={closeModal} />

        <EditTemplateForm template={template} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default EditTemplateModal;
