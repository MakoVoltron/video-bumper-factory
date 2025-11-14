"use client";

import { useInView } from "@/app/hooks/useInView";

const SectionTitle = () => {
  const { ref, isVisible } = useInView();

  return (
    <div className="my-15 flex flex-col items-center gap-2">
      <h2 className="font-headline text-4xl">
        You have your logo
        <br />
        <span
          ref={ref}
          className={`text-accent-color transition duration-3000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } `}
        >
          We&apos;ll animate it
        </span>
      </h2>
      <p className="text-center sm:text-xl sm:max-w-3xl">
        This is not just another marketplace selling you AE template and then
        leaving you out in cold wondering what to do with that 🙄 We are a{" "}
        <span className="font-bold text-accent-color">SERVICE</span> that lets{" "}
        <span className="font-bold text-accent-color">YOU SIMPLY CHOOSE</span>{" "}
        and leave the heavy lifting on us!
      </p>
    </div>
  );
};

export default SectionTitle;
