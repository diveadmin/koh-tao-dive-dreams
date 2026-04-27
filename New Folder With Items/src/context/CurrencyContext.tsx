import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_CURRENCY, type SupportedCurrency } from '@/lib/currency';

type CurrencyContextValue = {
  currency: SupportedCurrency;
  setCurrency: (currency: SupportedCurrency) => void;
};

const STORAGE_KEY = 'selectedCurrency';

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<SupportedCurrency>(DEFAULT_CURRENCY);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as SupportedCurrency | null;
    if (saved) {
      setCurrency(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  const value = useMemo(() => ({ currency, setCurrency }), [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}