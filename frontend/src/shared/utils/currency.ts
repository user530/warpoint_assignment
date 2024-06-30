import { Currency } from '../enums';

export const tickerFromCurrency = (currency: Currency): keyof typeof Currency | null => {
    const selectedCurrency = Object.entries(Currency).find(([_, val]) => val === currency);
    return selectedCurrency
        ? selectedCurrency[0] as keyof typeof Currency
        : null;
};