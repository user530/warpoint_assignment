<script setup lang="ts">
import { HeaderDefault, FooterDefault } from '@/components';
</script>

<template>
    <HeaderDefault />

    <main class="growing-main">
        <slot></slot>
    </main>

    <FooterDefault />
</template>

<style scoped>
.growing-main {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>