import { Currency } from '../enums';

export const tickerFromCurrency = (currency: Currency): keyof typeof Currency | null => {
    const selectedCurrency = Object.entries(Currency).find(([_, val]) => val === currency);
    return selectedCurrency
        ? selectedCurrency[0] as keyof typeof Currency
        : null;
};

export const stringToCurrency = (currencyString: string): Currency => {
    const currencyValue = Currency[currencyString as keyof typeof Currency];

    if (currencyValue === undefined)
        throw new Error('String to currency - Error: Unsupported currency key!');

    return currencyValue;
}