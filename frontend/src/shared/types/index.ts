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

export interface IFormField {
    label?: string;
    fieldId?: string;
}