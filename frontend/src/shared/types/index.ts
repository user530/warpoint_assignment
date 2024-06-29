import { PaymentPeriod, Currency } from '../enums';

export interface IPaymentOption {
    id: number;
    basePrice: number;
    paymentPeriod: PaymentPeriod;
}

export interface ITariff {
    id: number;
    name: string;
    paymentOptions: IPaymentOption[];
    baseCurrency: Currency;
}
