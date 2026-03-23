"use client";

import { useState } from "react";
import PlusIcon from "@/icons/plus-icon.svg";

type Props = { question: string; answer: string };

const AccordionItem = ({ question, answer }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen(!open)}>
      <div
        className={`${open ? "bg-purple-800 text-amber-300" : "bg-purple-600 text-white"} group hover:bg-purple-800 flex justify-between items-center px-6 py-3 shadow-2xl cursor-pointer`}
      >
        <h3 className="text-xl font-semibold">{question}</h3>
        <div
          className={`h-6 w-6 flex-none rounded-full transition duration-300 ${open ? "bg-purple-900 rotate-90 text-amber-300" : "bg-purple-800 rotate-0"} group-hover:text-amber-300 group-hover:bg-purple-700 bg-amber-300 flex justify-center items-center`}
        >
          <PlusIcon className="size-3" />
        </div>
      </div>
      <div
        className={`overflow-hidden grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className={`bg-purple-950 px-6 py-3 text-white/90`}>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
