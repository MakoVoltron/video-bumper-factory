import CloseButton from "./ui/CloseButton";
import { ReactNode } from "react";

type ModalTemplateProps = {
  title: string;
  description: string;
  children?: ReactNode;
  closeModal: () => void;
};

const ModalTemplate = ({ closeModal, title, children }: ModalTemplateProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="theme-light bg-bg text-fg p-6 rounded space-y-4 w-[800px]">
        <div className="flex justify-between">
          <h3 className="font-bold">{title}</h3>
          <CloseButton onClick={closeModal} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalTemplate;
