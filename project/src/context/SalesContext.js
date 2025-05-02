import React, { createContext, useState } from 'react';

export const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  const addSale = (sale) => {
    setSales(prevSales => [...prevSales, sale]);
  };

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
};
