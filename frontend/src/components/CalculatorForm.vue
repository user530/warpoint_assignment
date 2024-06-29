<script setup lang="ts">
import type { ITariff } from '@/shared/types';
import CalculatorFieldTariff from './CalculatorFieldTariff.vue';
import { tariffsData } from '@/shared/data/tariffs';
import { ref, watch } from 'vue';
import type { Currency } from '@/shared/enums';

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
    formValues.value.tariffId = newTariffId;
    console.log(formValues.value);
}

// Reset form values on the tariff selection
watch(
    () => formValues.value.tariffId,
    (newTariffId: number | null) => {
        const selectedTariff = tariffsData.find((tariff) => tariff.id == newTariffId);
        formValues.value.currency = !selectedTariff ? null : selectedTariff.baseCurrency;
        formValues.value.paymentOptionId = !selectedTariff ? null : selectedTariff.paymentOptions[0].id;
    }
)

</script>

<template>
    <form>
        <CalculatorFieldTariff :tariffs-data="tariffFieldProps" label="Выберите тариф:"
            @tariff-selected="tariffSelectionHandler" />
    </form>
</template>