<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IFormField, IPaymentOption } from '../shared/types';

interface IPeriodSelection extends Omit<IPaymentOption, 'basePrice'> { }

interface IPeriodSelectProps extends IFormField {
    periods: IPeriodSelection[];
    modelValue: number | null;
}

const props = defineProps<IPeriodSelectProps>();
const emit = defineEmits(['update:modelValue']);

const labelText = computed(() => props.label || 'Период оплаты');
const fieldId = computed(() => props.fieldId || 'calculator-period-selection');

const emitSelection = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    emit('update:modelValue', target.value ?? null);
};

</script>

<template>
    <div>
        <label :for="fieldId">{{ labelText }}</label>
        <select :id="fieldId" :value="modelValue" @change="emitSelection">
            <option value="" disabled hidden>{{ props.placeholderText ?? 'Выберите период' }}</option>
            <option v-for="period in periods" :key="period.id" :value="period.id">{{ period.paymentPeriod }}</option>
        </select>
    </div>
</template>