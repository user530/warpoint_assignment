import type { ITariff, IExchangeData } from '@/shared/types';
import axios from 'axios';
import { stringToCurrency, stringToPeriod, tickerFromCurrency } from '@/shared/utils';

const API_URL = import.meta.env.VITE_EXCHANGE_RATE_API_URL;

export const fetchCalculatorData = async (): Promise<{
    tariffs: ITariff[],
    exchangeRates: IExchangeData[]
}> => {
    // Fetch tariffs (placeholder from file)
    const tariffsResponse = await axios.get('/tariffs.json');

    // Transform tariffs, changing strings to enums
    const tariffs = (tariffsResponse
        .data as ITariff[])
        .map(
            tariff => ({
                ...tariff,
                baseCurrency: stringToCurrency(tariff.baseCurrency),
                paymentOptions: tariff.paymentOptions.map(
                    option => ({
                        ...option,
                        paymentPeriod: stringToPeriod(option.paymentPeriod)
                    })
                )
            })
        );

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