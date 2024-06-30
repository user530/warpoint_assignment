<script setup lang="ts">
import type { ITariff } from '@/shared/types';
import CalculatorFieldTariff from './CalculatorFieldTariff.vue';
import CalculatorFieldCurrency from './CalculatorFieldCurrency.vue';
import CalculatorFieldPeriod from './CalculatorFieldPeriod.vue';
import { tariffsData, exchangeRates } from '@/shared/data';
import { computed, ref, watch } from 'vue';
import { Currency } from '@/shared/enums';

interface IFormValues {
    tariffId: number | null;
    currency: Currency | null;
    paymentOptionId: number | null;
}

// LOAD AND VALIDATE TARIFFS
const initialSelection: IFormValues = {
    tariffId: tariffsData[0]?.id ?? null,
    currency: tariffsData[0]?.baseCurrency ?? null,
    paymentOptionId: tariffsData[0]?.paymentOptions[0]?.id ?? null
};

const formValues = ref<IFormValues>(initialSelection);

// Props and handler for the tariff selection field
const tariffFieldProps = (tariffsData as ITariff[]).map(tariff => ({ id: tariff.id, name: tariff.name }));
const tariffSelectionHandler = (newTariffId: number) => {
    console.log('New tariff selected');
    formValues.value.tariffId = newTariffId;
    console.log(formValues.value);
};

const selectedTariff = computed(() => {
    console.log('Computed selected tariff');
    return tariffsData.find((tariff) => tariff.id === formValues.value.tariffId) ?? null;
});

// Props and handler for the currency selection field 
const currencyProps = computed(() => {
    console.log('Computed currency props');
    return selectedTariff.value?.baseCurrency ?? Currency.RUB;
});
const currencySelectionHandler = (newCurrency: keyof typeof Currency) => {
    console.log('New currency selected');
    formValues.value.currency = Currency[newCurrency];
    console.log(formValues.value);
};

const periodFieldProps = computed(() => {
    console.log('Computed period props');
    return selectedTariff.value && selectedTariff.value.paymentOptions
        ? selectedTariff.value.paymentOptions.map(option => ({ id: option.id, paymentPeriod: option.paymentPeriod }))
        : [];
}
);

const periodSelectionHandler = (newPeriodId: number | null) => {
    console.log('New period selected');
    formValues.value.paymentOptionId = newPeriodId;
    console.log(formValues.value);
}

// Reset form values on the tariff selection
watch(
    () => formValues.value.tariffId,
    (newTariffId: number | null) => {
        console.log('Tarif observer fired! Updating form values');
        const selectedTariff = tariffsData.find((tariff) => tariff.id == newTariffId);
        formValues.value.currency = !selectedTariff ? null : selectedTariff.baseCurrency;
        formValues.value.paymentOptionId = !selectedTariff ? null : selectedTariff.paymentOptions[0].id;
        console.log(formValues.value);
    }
);

watch(
    () => formValues.value.currency,
    (newCurrency: Currency | null) => {
        console.log('Currency observer fired! Calculating exchange rate');
        if (!newCurrency) return;
        console.log(newCurrency);
        const reqCurrency: [string, Currency] = Object.entries(Currency).find(([key, val]) => val === newCurrency) ?? ['RUB', Currency.RUB];
        console.log(reqCurrency[0])
        const rate = exchangeRates.conversion_rates[reqCurrency[0]];
        console.log('Rate: ', rate);
    }
)

</script>

<template>
    <form>
        <CalculatorFieldTariff :tariffs-data="tariffFieldProps" label="Выберите тариф:"
            @tariff-selected="tariffSelectionHandler" />
        <CalculatorFieldCurrency :base-currency="currencyProps" label="Выберите валюту:"
            @currency-selected="currencySelectionHandler" />
        <CalculatorFieldPeriod :periods="periodFieldProps" label="Выберите период оплаты:"
            @period-selected="periodSelectionHandler" />
        <CalculatorFieldTotalCost />
    </form>
</template>