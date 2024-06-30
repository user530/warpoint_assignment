<script setup lang="ts">
import type { ITariff, IExchangeData } from '@/shared/types';
import CalculatorFieldTariff from './CalculatorFieldTariff.vue';
import CalculatorFieldCurrency from './CalculatorFieldCurrency.vue';
import CalculatorFieldPeriod from './CalculatorFieldPeriod.vue';
import { tariffsData, RubRates } from '@/shared/data';
import { tickerFromCurrency, getDiscountForOption } from '@/shared/utils';
import { computed, ref, watch } from 'vue';
import { Currency } from '@/shared/enums';

interface IFormValues {
    tariffId: number | null;
    currency: keyof typeof Currency | null;
    paymentOptionId: number | null;
}

// LOAD AND VALIDATE TARIFFS
const tariffs = ref<ITariff[]>([]);
const exchangeRates = ref<IExchangeData[]>([]);

// PLACEHOLDER
tariffs.value = tariffsData;
exchangeRates.value = RubRates;
const formValues = ref<IFormValues>({
    tariffId: null,
    currency: null,
    paymentOptionId: null,
});

// Props and handler for the tariff selection field
const tariffFieldProps = (tariffsData as ITariff[]).map(tariff => ({ id: tariff.id, name: tariff.name }));
const tariffSelectionHandler = (newTariffId: number) => {
    formValues.value.tariffId = newTariffId;
};

const selectedTariff = computed(() => {
    return tariffsData.find((tariff) => tariff.id === formValues.value.tariffId) ?? null;
});

// Props and handler for the currency selection field 
const currencyProps = computed(() => {
    return selectedTariff.value?.baseCurrency ?? Currency.RUB;
});
const currencySelectionHandler = (newCurrency: keyof typeof Currency) => {
    formValues.value.currency = newCurrency;
};

const periodFieldProps = computed(() => {
    console.log(
        selectedTariff.value && selectedTariff.value.paymentOptions
            ? selectedTariff.value.paymentOptions.map(option => ({ id: option.id, paymentPeriod: option.paymentPeriod }))
            : []
    )
    return selectedTariff.value && selectedTariff.value.paymentOptions
        ? selectedTariff.value.paymentOptions.map(option => ({ id: option.id, paymentPeriod: option.paymentPeriod }))
        : [];
}
);

const periodSelectionHandler = (newPeriodId: number | null) => {
    formValues.value.paymentOptionId = newPeriodId;
}

const exchangeRate = computed(
    () => {
        if (!selectedTariff.value || !formValues.value.currency || !formValues.value.paymentOptionId) return 0;
        const baseCurrency = tickerFromCurrency(selectedTariff.value.baseCurrency);
        const rates = exchangeRates.value.find((rate) => rate.base_code === baseCurrency);
        if (!baseCurrency || !rates || !rates.conversion_rates) return 0;
        const { currency } = formValues.value;
        const rate = rates.conversion_rates[currency];
        return rate;
    }
);

const totalAmount = computed(() => {
    if (!selectedTariff.value || !formValues.value || !formValues.value.paymentOptionId) return 0;
    const selectedOption = selectedTariff.value.paymentOptions.find((option) => option.id === formValues.value.paymentOptionId);
    return selectedOption ? selectedOption.basePrice * exchangeRate.value : 0;
});

const discount = computed(
    () => {
        const { paymentOptionId, currency, tariffId } = formValues.value;
        if (!selectedTariff.value || !paymentOptionId || !currency || !tariffId) return 0;

        const disc = getDiscountForOption(selectedTariff.value.paymentOptions, paymentOptionId);

        return disc;
    }
);

// Reset form values on the tariff selection
watch(
    () => formValues.value.tariffId,
    (newTariffId: number | null) => {
        const selectedTariff = tariffsData.find((tariff) => tariff.id == newTariffId);
        if (!selectedTariff) return;
        const { baseCurrency, paymentOptions } = selectedTariff;
        const selectedCurrency = tickerFromCurrency(baseCurrency);
        const firstPeriodId = paymentOptions && Array.isArray(paymentOptions)
            ? paymentOptions[0].id
            : null;
        formValues.value.currency = !selectedCurrency ? null : selectedCurrency;
        formValues.value.paymentOptionId = !firstPeriodId ? null : firstPeriodId;
    }
);

</script>

<template>
    <form>
        <CalculatorFieldTariff :tariffs="tariffFieldProps" v-model="formValues.tariffId" label="Тариф:"
            @tariff-selected="tariffSelectionHandler" />
        <CalculatorFieldCurrency :base-currency="currencyProps" v-model="formValues.currency" label="Валюта:"
            @currency-selected="currencySelectionHandler" />
        <CalculatorFieldPeriod :periods="periodFieldProps" v-model="formValues.paymentOptionId" label="Период оплаты:"
            @period-selected="periodSelectionHandler" />
        <p>{{ totalAmount }}</p>
        <p>{{ discount * exchangeRate }}</p>
        <CalculatorFieldTotalCost />
    </form>
</template>