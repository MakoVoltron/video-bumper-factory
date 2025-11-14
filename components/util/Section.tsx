import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

const Section = ({ children, id, className }: SectionProps) => {
  return (
    <div
      id={id}
      className={`flex flex-col sm:h-screen w-full items-center ${className}`}
    >
      {children}
    </div>
  );
};

export default Section;
