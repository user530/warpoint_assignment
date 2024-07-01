<script setup lang="ts">
import type { IFormField, ITariff } from '@/shared/types';
import { computed } from 'vue';

interface ITariffSelection extends Pick<ITariff, 'id' | 'name'> { }

interface ITariffSelectProps extends IFormField {
    tariffs: ITariffSelection[];
    modelValue: number | null;
}

// Component definitions
const props = defineProps<ITariffSelectProps>();
const emit = defineEmits(['update:modelValue']);

// Computed props
const labelText = computed(() => props.label || 'Тариф:');
const fieldId = computed(() => props.fieldId || 'calculator-tariff-selection');

const emitSelection = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit('update:modelValue', target.value ? Number(target.value) : null);
};

</script>

<template>
    <div>
        <label :for="fieldId">{{ labelText }}</label>
        <select :id="fieldId" :value="props.modelValue" @change="emitSelection">
            <option value="" disabled hidden>{{ props.placeholderText ?? 'Выберите тариф' }}</option>
            <option v-for="tariff in props.tariffs" :key="tariff.id" :value="tariff.id">{{ tariff.name }}</option>
        </select>
    </div>
</template>