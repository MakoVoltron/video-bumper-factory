type ButtonProps = {
  text: string;
  size?: "sm" | "lg";
  type?: "submit" | "button";
  onClick?: (e: React.FormEvent) => void;
  disabled?: boolean;
  target?: string;
};

const Button = ({
  text,
  size = "lg",
  onClick,
  disabled = false,
  target,
  type,
}: ButtonProps) => {
  const className = `bg-purple-950 font-bold ${
    size === "sm" ? "py-1 px-4 text-sm" : "py-3 px-5"
  } rounded-2xl text-purple-300 ${
    !disabled && "hover:bg-purple-700 hover:text-white hover:shadow-2xl"
  } transition duration-500  ${
    disabled ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"
  }`;

  if (target) {
    return (
      <a href={`#${target}`} className={className}>
        {text}
      </a>
    );
  }

  return (
    <button
      onClick={onClick ?? undefined}
      type={type}
      disabled={disabled}
      className={className}
    >
      {text}
    </button>
  );
};

export default Button;
