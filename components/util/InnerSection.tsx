import { ReactNode } from "react";

const InnerSection = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center max-w-5xl p-3">{children}</div>
  );
};

export default InnerSection;
