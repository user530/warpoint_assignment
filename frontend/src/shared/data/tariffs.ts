import type { ITariff } from '../types';
import { Currency, PaymentPeriod } from '../enums';

export const tariffsData: ITariff[] = [
    {
        id: 1,
        name: "Стандартный",
        baseCurrency: Currency.RUB,
        paymentOptions: [
            {
                id: 1,
                paymentPeriod: PaymentPeriod.Month,
                basePrice: 100,
            },
            {
                id: 2,
                paymentPeriod: PaymentPeriod.Year,
                basePrice: 1000,
            },
        ],
    },
    {
        id: 2,
        name: "Продвинутый",
        baseCurrency: Currency.RUB,
        paymentOptions: [
            {
                id: 1,
                paymentPeriod: PaymentPeriod.Month,
                basePrice: 150,
            },
            {
                id: 2,
                paymentPeriod: PaymentPeriod.Year,
                basePrice: 1400,
            },
        ],
    },
];