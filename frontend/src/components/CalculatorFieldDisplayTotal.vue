<script setup lang="ts">

interface IDisplayTotalProps {
    total: number;
    discount: number;
    labelTotal?: string;
    labelDiscount?: string;
    fieldIdTotal?: string;
    fieldIdDiscount?: string;
}

const { total, discount, labelTotal, labelDiscount, fieldIdTotal, fieldIdDiscount } = defineProps<IDisplayTotalProps>();


</script>

<template>
    <div class="display-total">
        <div>
            <label :for="fieldIdTotal ?? 'total-field'">
                {{ labelTotal ?? 'Сумма к оплате:' }}
            </label>
            <input :id="fieldIdTotal ?? 'discount-field'" type="text" :value="total" disabled>
        </div>

        <div v-if="discount > 0">
            <label :for="fieldIdDiscount ?? 'discount-field'">
                {{ labelDiscount ?? 'Сумма скидки:' }}
            </label>
            <input :id="fieldIdDiscount ?? 'discount-field'" type="text" :value="discount" disabled>
        </div>
    </div>
</template>