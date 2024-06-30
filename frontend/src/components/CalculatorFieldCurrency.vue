<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IFormField } from '../shared/types';
import { Currency } from '../shared/enums';

interface ICurrencySelectProps extends IFormField {
    baseCurrency: Currency;
    modelValue: keyof typeof Currency | null;
}

// Component definitions
const props = defineProps<ICurrencySelectProps>();
const emit = defineEmits(['update:modelValue']);

const currencies = Object.entries(Currency);

// Computed props
const labelText = computed(() => props.label || 'Валюта:');
const fieldId = computed(() => props.fieldId || 'calculator-currency-selection');

const emitSelection = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit('update:modelValue', target.value ?? null);
};

</script>

<template>
    <div>
        <label :for="fieldId">{{ labelText }}</label>
        <select :id="fieldId" :value="props.modelValue" @change="emitSelection">
            <option value="" disabled hidden>{{ props.placeholderText ?? 'Выберите валюту' }}</option>
            <option v-for="currency in currencies" :key="currency[0]" :value="currency[0]">{{ currency[1] }}</option>
        </select>
    </div>
</template>