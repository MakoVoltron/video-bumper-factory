"use client";

import { createContext, ReactNode, useContext } from "react";

export type AdminContextType = {
  isAdmin: boolean;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: AdminContextType;
}) => {
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};
