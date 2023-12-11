import React, { createContext, useState } from "react";

export const SaleContext = createContext();

export const SaleContextProvider = ({ children }) => {
  const [saleId, setSaleId] = useState(null);

  const contextValue = {
    saleId,
    setSaleId,
  };

  return (
    <SaleContext.Provider value={contextValue}>{children}</SaleContext.Provider>
  );
};
