"use client";

import { useInView } from "@/app/hooks/useInView";

const SectionTitle = () => {
  const { ref, isVisible } = useInView();

  return (
    <div className="my-15">
      <h2 className="font-headline text-4xl whitespace-pre-line">
        You have your logo
        <br />
        <span
          ref={ref}
          className={`text-purple-600 transition duration-3000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } `}
        >
          We&apos;ll animate it
        </span>
      </h2>
    </div>
  );
};

export default SectionTitle;
