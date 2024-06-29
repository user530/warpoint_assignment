<script setup>
import HeaderDefault from '@/components/HeaderDefault.vue';
import FooterDefault from '@/components/FooterDefault.vue';
</script>

<template>
    <HeaderDefault />

    <main>
        <slot></slot>
    </main>

    <FooterDefault />
</template>

<style scoped></style>