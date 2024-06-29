import { PaymentPeriod, Currency } from '../enums';

export interface IPaymentOption {
    basePrice: number;
    paymentPeriod: PaymentPeriod;
}

export interface ITarif {
    name: string;
    paymentOptions: IPaymentOption[];
    baseCurrency: Currency;
}
