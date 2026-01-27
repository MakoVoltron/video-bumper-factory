import clsx from "clsx";
import { X } from "lucide-react";

type CloseButtonProps = {
  theme?: string;
  onClick: () => void;
};

const CloseButton = ({ theme = "theme-light", onClick }: CloseButtonProps) => {
  return (
    <div className="flex justify-end">
      <div className="w-6 h-6">
        <button
          className={clsx(
            theme,
            "text-fg flex justify-center items-center cursor-pointer transition duration-300 hover:scale-115",
          )}
          onClick={onClick}
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default CloseButton;
