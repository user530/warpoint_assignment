<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IFormField } from '../shared/types';
import { Currency } from '../shared/enums';

interface ICurrencySelectProps extends IFormField {
    baseCurrency: Currency;
}

// Component definitions
const props = defineProps<ICurrencySelectProps>();
const emit = defineEmits(['currency-selected']);

const currencies = Object.entries(Currency);

// State variable
const selectedCurrency = ref<string | null>(currencies[0][0] ?? null);

// Computed props
const labelText = computed(() => props.label || 'Валюта:');
const fieldId = computed(() => props.fieldId || 'calculator-currency-selection');

const emitSelection = () => emit('currency-selected', selectedCurrency.value);
</script>

<template>
    <div>
        <label :for="fieldId">{{ labelText }}</label>
        <select :id="fieldId" v-model="selectedCurrency" @change="emitSelection">
            <option v-for="currency in currencies" :key="currency[0]" :value="currency[0]">{{ currency[1] }}</option>
        </select>
    </div>
</template>