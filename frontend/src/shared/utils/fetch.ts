import axios from 'axios';
import type { ITariff, IExchangeData } from '../types';
import { tickerFromCurrency } from './currency';

const API_URL = import.meta.env.VITE_EXCHANGE_RATE_API_URL;

export const fetchCalculatorData = async (tariffsData: ITariff[]): Promise<{
    tariffs: ITariff[],
    exchangeRates: IExchangeData[]
}> => {
    const tariffs = tariffsData;
    const exchangeRates: IExchangeData[] = [];

    // The list of all base currencies used in the tarriffs
    const baseCurrencies = new Set<string>();

    // Iterate over all tariffs and collect all base currencies
    tariffs.forEach(
        tariff => {
            const ticker = tickerFromCurrency(tariff.baseCurrency);
            if (ticker) baseCurrencies.add(ticker);
        }
    );

    // Prepare an array of promises to get all exchange rates
    const exchangeRatesPromises = Array
        .from(baseCurrencies)
        .map(async (currencyTicker) => {
            const response = await axios.get(`${API_URL}/${currencyTicker}`);

            if (response.data && response.data.result === 'success')
                exchangeRates.push(response.data);
        });

    // Fetch all required exchange rates
    await Promise.all(exchangeRatesPromises);

    return {
        tariffs,
        exchangeRates,
    };
}