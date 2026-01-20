"use client";

import { CategoryLabels } from "@/app/(admin)/dashboard/add-template-form";
import { CATEGORY_TYPE } from "@/lib/constants";

const Filters = ({
  onChange,
}: {
  onChange: (value: CategoryLabels | null) => void;
}) => {
  return (
    <div className="m-2">
      <p className="text-center text-gray-400 text-sm my-2">
        Choose your logo orientation
      </p>
      <div className="grid grid-cols-12 gap-2 justify-center items-center">
        {CATEGORY_TYPE.map((category) => {
          const Icon = category.icon;
          return (
            <div className={`col-span-6 `} key={category.label}>
              <button
                onClick={() => onChange(category.label)}
                type="button"
                className={`h-14 w-full  bg-purple-900/40 hover:bg-purple-900/80 border-2 border-purple-900 p-2 rounded-sm m-0.5 cursor-pointer flex items-center`}
              >
                {Icon && <Icon />}
                <p className="text-xs">{category.label}</p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
