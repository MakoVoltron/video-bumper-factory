type ButtonModalProps = {
  label: string;
  variation?: "default" | "danger";
  isLoading?: boolean;
  onClick: () => void;
};

const ButtonModal = ({
  label,
  variation = "default",
  isLoading,
  onClick,
}: ButtonModalProps) => {
  const style =
    variation === "danger"
      ? "bg-rose-500 hover:bg-rose-900 hover:text-rose-200"
      : "bg-slate-200 text-slate-800 hover:bg-slate-800 hover:text-white";

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${style} px-3 py-1 text-sm font-semibold rounded duration-500 transition cursor-pointer`}
    >
      {label}
    </button>
  );
};

export default ButtonModal;
