import { ChangeEvent } from "react";
import Label from "./Label";

type Input = {
  type?: "text" | "number" | "file";
  name: string;
  placeholder: string;
  required?: boolean;
  cols?: "12" | "8" | "6" | "4";
  validated?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  accept?: "image/png" | "video/mp4";
};

const Input = ({
  type = "text",
  name,
  placeholder,
  required = false,
  onChange,
  cols = "12",
  validated,
  label,
  accept,
}: Input) => {
  return (
    <div className={`col-span-12 sm:col-span-${cols}`}>
      <div className="flex flex-col">
        {type === "file" ? (
          <label
            htmlFor={name}
            className={`border py-2 px-3 h-10 rounded-xl cursor-pointer text-white/50 hover:border-emerald-600 transition duration-300  ${
              validated && "border-emerald-600"
            }`}
          >
            {label && <Label text={label} htmlFor={name} />}

            {placeholder}

            <input
              id={name}
              className={`hidden`}
              type={type}
              name={name}
              placeholder={placeholder}
              required={required}
              onChange={onChange}
              accept={accept}
            />
          </label>
        ) : (
          <>
            {label && <Label text={label} htmlFor={name} />}
            <input
              id={name}
              className={`border border-white/50 py-2 px-3 rounded-xl outline-none cursor-pointer hover:border-emerald-600 transition duration-300  ${
                validated && "border-emerald-600"
              }`}
              type={type}
              name={name}
              placeholder={placeholder}
              required={required}
              onChange={onChange}
              accept={accept}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
