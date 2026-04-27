import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCY_LABELS, type SupportedCurrency } from '@/lib/currency';

const options = Object.keys(CURRENCY_LABELS) as SupportedCurrency[];

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
      <span className="hidden lg:inline">Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
        className="rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {CURRENCY_LABELS[option]}
          </option>
        ))}
      </select>
    </label>
  );
};

export default CurrencySelector;