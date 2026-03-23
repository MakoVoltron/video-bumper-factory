"use client";

import { CategoryLabels } from "@/app/(admin)/dashboard/add-template-form";
import { CATEGORY_TYPE } from "@/lib/constants";

type FilterProps = {
  onChange?: (value?: CategoryLabels) => void;
  selected?: CategoryLabels;
};

const Filters = ({ onChange, selected }: FilterProps) => {
  return (
    <div className="m-2 w-xs">
      <h2 className="text-center text-gray-300 my-2">
        Choose your animated logo style
      </h2>
      <div className="grid grid-cols-12 gap-2 justify-center items-center">
        {CATEGORY_TYPE.map((category) => {
          const Icon = category.icon;
          return (
            <div className={`col-span-6 `} key={category.label}>
              <button
                onClick={() =>
                  onChange?.(
                    selected !== category.label ? category.label : undefined,
                  )
                }
                type="button"
                aria-label={
                  category.label === selected
                    ? `${category.label} filter (selected)`
                    : `Filter by ${category.label}`
                }
                aria-pressed={category.label === selected}
                className={`h-14 w-full   hover:bg-purple-900/80 border-2 ${category.label === selected ? "bg-purple-900" : "bg-purple-900/40"}  border-purple-900 p-2 rounded-sm m-0.5 cursor-pointer flex flex-col justify-center items-center gap-1`}
              >
                {Icon ? <Icon /> : "Show all"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
