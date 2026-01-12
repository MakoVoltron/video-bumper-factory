const Button = ({
  text,
  size = "lg",
}: {
  text: string;
  size?: "sm" | "lg";
}) => {
  return (
    <button
      className={`bg-purple-950 font-bold ${
        size === "sm" ? "py-1 px-4 text-sm" : "py-3 px-5"
      } rounded-2xl text-purple-300 hover:bg-purple-700 hover:text-white hover:shadow-2xl transition duration-500 cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default Button;
