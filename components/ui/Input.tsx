type Input = {
  type?: "text" | "number" | "file";
  name: string;
  placeholder: string;
  required?: boolean;
  cols?: "12" | "8" | "6" | "4";
  onChange?: () => void;
};

const Input = ({
  type = "text",
  name,
  placeholder,
  required = false,
  onChange,
  cols = "12",
}: Input) => {
  return (
    <div className={`col-span-${cols}`}>
      <div className="flex flex-col">
        <label>{placeholder}</label>
        <input
          className="border py-2 px-3 rounded-xl"
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
