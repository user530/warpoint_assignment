<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ITariff } from '../shared/types';
import { tariffsData as tariffs } from '@/shared/data/tariffs';

interface ITariffSelection extends Pick<ITariff, 'id' | 'name'> { }

interface ITariffSelectProps {
    tariffsData: ITariffSelection[];
    label?: string;
    fieldId?: string;
}

// Component definitions
const props = defineProps<ITariffSelectProps>();
const emit = defineEmits(['tariff-selected']);

// State variable
const selectedTariffId = ref<number | null>(tariffs[0].id ?? null);

// Computed props
const labelText = computed(() => props.label || 'Тариф:');
const fieldId = computed(() => props.fieldId || 'calculator-tariff-selection');

const emitSelection = () => emit('tariff-selected', selectedTariffId.value);

</script>

<template>
    <div>
        <label :for="fieldId">{{ labelText }}</label>
        <select :id="fieldId" v-model="selectedTariffId" @change="emitSelection">
            <option v-for="tariff in tariffsData" :key="tariff.id" :value="tariff.id">{{ tariff.name }}</option>
        </select>
    </div>
</template>