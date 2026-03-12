import CloseButton from "./ui/CloseButton";
import { ReactNode, useEffect } from "react";

type ModalTemplateProps = {
  title: string;
  description: string;
  children?: ReactNode;
  closeModal: () => void;
};

const ModalTemplate = ({ closeModal, title, children }: ModalTemplateProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center overflow-hidden z-100 w-full md:w-[500px] mx-auto">
      <div className="theme-light bg-bg text-fg p-6 rounded space-y-4 w-[800px] overflow-y-auto md:max-h-[90vh]">
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
