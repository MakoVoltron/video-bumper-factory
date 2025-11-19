import { ReactNode } from "react";

const Grid = ({ children }: { children: ReactNode }) => {
  return <div className="grid grid-cols-12 w-full gap-3 py-2">{children}</div>;
};

export default Grid;
