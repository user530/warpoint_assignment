<template>
    <div class="spinner"></div>
</template>

<style scoped>
@import '../assets/variables.css';

.spinner {
    border: 4px solid var(--color-secondary);
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border-left-color: var(--color-secondary-dark);
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>