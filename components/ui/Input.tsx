import { ChangeEvent } from "react";
import Label from "./Label";
import { CircleCheck } from "lucide-react";

type Input = {
  type?: "text" | "number" | "file";
  name: string;
  placeholder: string;
  required?: boolean;
  cols?: "12" | "8" | "6" | "4";
  validated?: boolean;
  label?: string;
  accept?: "image/png" | "video/mp4";
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  type = "text",
  name,
  placeholder,
  required = false,
  cols,
  validated,
  label,
  accept,
  value,
  onChange,
}: Input) => {
  return (
    <div className={`col-span-${cols}`}>
      <div className="flex flex-col">
        {type === "file" ? (
          <label
            htmlFor={name}
            className={`relative border py-2 px-3 h-10 rounded-xl cursor-pointer text-white/50 hover:border-emerald-600 transition duration-300  ${
              validated && "border-emerald-600"
            }`}
          >
            {label && <Label text={label} htmlFor={name} />}

            <span className="text-fg">{placeholder}</span>

            {validated && (
              <span className="text-emerald-500 absolute right-1">
                <CircleCheck />
              </span>
            )}

            <input
              id={name}
              className={`hidden`}
              type={type}
              name={name}
              placeholder={placeholder}
              required={required}
              onChange={onChange}
              accept={accept}
              value={value}
            />
          </label>
        ) : (
          <>
            {label && <Label text={label} htmlFor={name} />}
            <input
              id={name}
              className={`border border-border py-2 px-3 rounded-xl outline-none cursor-pointer hover:border-emerald-600 transition duration-300  ${
                validated && "border-emerald-600"
              }`}
              type={type}
              name={name}
              placeholder={placeholder}
              required={required}
              onChange={onChange}
              accept={accept}
              value={value}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
