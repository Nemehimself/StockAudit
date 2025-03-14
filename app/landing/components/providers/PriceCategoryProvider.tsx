'use client';

import { PriceCategoryEnum } from '@/app/interfaces/versions.enum';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CategoryType {
  priceCategory: PriceCategoryEnum;
  setPriceCategory: React.Dispatch<React.SetStateAction<PriceCategoryEnum>>;
  customCategory: number;
  setCustomCategory: React.Dispatch<React.SetStateAction<number>>;
  showTable: boolean;
  setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
}

const PriceCategoryContext = createContext<CategoryType | undefined>(undefined);

export const PriceCategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [priceCategory, setPriceCategory] = useState<PriceCategoryEnum>(
    PriceCategoryEnum.MONTHLY
  );

  const [customCategory, setCustomCategory] = useState<number>(5);

  const [showTable, setShowTable] = useState<boolean>(false);

  return (
    <PriceCategoryContext.Provider
      value={{
        priceCategory,
        setPriceCategory,
        customCategory,
        setCustomCategory,
        showTable,
        setShowTable,
      }}
    >
      {children}
    </PriceCategoryContext.Provider>
  );
};

export const usePriceCategory = () => {
  const context = useContext(PriceCategoryContext);
  if (!context) {
    throw new Error(
      'usePriceCategory must be used within a PriceCategoryProvider'
    );
  }
  return context;
};
