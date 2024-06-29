import type { ITarif } from '../types';
import { Currency, PaymentPeriod } from '../enums';

export const tariffsData: ITarif[] = [
    {
        name: "Стандартный",
        baseCurrency: Currency.RUB,
        paymentOptions: [
            {
                paymentPeriod: PaymentPeriod.Month,
                basePrice: 100,
            },
            {
                paymentPeriod: PaymentPeriod.Year,
                basePrice: 1000,
            },
        ],
    },
    {
        name: "Продвинутый",
        baseCurrency: Currency.RUB,
        paymentOptions: [
            {
                paymentPeriod: PaymentPeriod.Month,
                basePrice: 150,
            },
            {
                paymentPeriod: PaymentPeriod.Year,
                basePrice: 1400,
            },
        ],
    },
];