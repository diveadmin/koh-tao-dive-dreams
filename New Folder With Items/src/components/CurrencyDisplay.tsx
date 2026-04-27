import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { convertPriceText, formatFromThb } from '@/lib/currency';

export const CurrencyText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const { currency } = useCurrency();
  return <span className={className}>{convertPriceText(text, currency)}</span>;
};

export const CurrencyAmount: React.FC<{ amountThb: number; suffix?: string; className?: string }> = ({
  amountThb,
  suffix,
  className,
}) => {
  const { currency } = useCurrency();
  return <span className={className}>{formatFromThb(amountThb, currency, { suffix })}</span>;
};