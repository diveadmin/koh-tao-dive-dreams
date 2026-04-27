export type SupportedCurrency = 'THB' | 'USD' | 'EUR' | 'GBP';

export const CURRENCY_LABELS: Record<SupportedCurrency, string> = {
  THB: 'THB',
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
};

const THB_EXCHANGE_RATES: Record<SupportedCurrency, number> = {
  THB: 1,
  USD: 0.027,
  EUR: 0.025,
  GBP: 0.021,
};

export const DEFAULT_CURRENCY: SupportedCurrency = 'THB';

export function convertFromThb(amountThb: number, currency: SupportedCurrency): number {
  return amountThb * THB_EXCHANGE_RATES[currency];
}

export function formatFromThb(
  amountThb: number,
  currency: SupportedCurrency,
  options?: { suffix?: string }
): string {
  if (currency === 'THB') {
    return `฿${Math.round(amountThb).toLocaleString()}${options?.suffix || ''}`;
  }

  const converted = convertFromThb(amountThb, currency);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: converted >= 100 ? 0 : 2,
    maximumFractionDigits: converted >= 100 ? 0 : 2,
  }).format(converted);

  return `${formatted}${options?.suffix || ''}`;
}

export function convertPriceText(text: string, currency: SupportedCurrency): string {
  if (!text) return text;

  let converted = text.replace(/฿\s?(\d[\d,]*)(\+)?/g, (_, rawAmount: string, suffix: string) => {
    const amount = Number(rawAmount.replace(/,/g, ''));
    return Number.isFinite(amount) ? formatFromThb(amount, currency, { suffix: suffix || '' }) : _;
  });

  converted = converted.replace(/(\d[\d,]*)\s*baht/gi, (_, rawAmount: string) => {
    const amount = Number(rawAmount.replace(/,/g, ''));
    return Number.isFinite(amount) ? formatFromThb(amount, currency) : _;
  });

  return converted;
}