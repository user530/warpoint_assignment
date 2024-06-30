import { PaymentPeriod } from '../enums';
import type { IPaymentOption } from '../types';

const periodToMonths = (period: PaymentPeriod): number => {
    switch (period) {
        case (PaymentPeriod.Month):
            return 1;
        case (PaymentPeriod.Year):
            return 12;
        default:
            return NaN;
    }
}

export const getDiscountForOption = (paymentOptions: IPaymentOption[], selectedOptionId: number): number => {
    const optionExists = paymentOptions.find((option) => option.id === selectedOptionId);
    if (!optionExists || paymentOptions.length < 2) return 0;

    // Iterate over all options and find the one with the worst one
    const worstOption = paymentOptions.reduce<IPaymentOption>((worstOption, currentOption) => {
        return periodToMonths(worstOption.paymentPeriod) < periodToMonths(currentOption.paymentPeriod)
            ? worstOption
            : currentOption
    }, paymentOptions[0]);

    const monthMultiplier = periodToMonths(optionExists.paymentPeriod) / periodToMonths(worstOption.paymentPeriod);

    // Calculate the discount
    return monthMultiplier * worstOption.basePrice - optionExists.basePrice;
}