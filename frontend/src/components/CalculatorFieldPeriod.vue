<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IFormField, IPaymentOption } from '../shared/types';

interface IPeriodSelection extends Omit<IPaymentOption, 'basePrice'> { }

interface IPeriodSelectProps extends IFormField {
    periods: IPeriodSelection[];
}

const props = defineProps<IPeriodSelectProps>();
const emit = defineEmits(['period-selected']);

const selectedPeriodId = ref<number | null>(props.periods[0].id ?? null);

const labelText = computed(() => props.label || 'Период оплаты');
const fieldId = computed(() => props.fieldId || 'calculator-period-selection');

const emitSelection = () => emit('period-selected', selectedPeriodId.value);
</script>

<template>
    <div>
        <label :for="fieldId">{{ labelText }}</label>
        <select :id="fieldId" v-model="selectedPeriodId" @change="emitSelection">
            <option v-for="period in periods" :key="period.id" :value="period.id">{{ period.paymentPeriod }}</option>
        </select>
    </div>
</template>