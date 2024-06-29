<template>
    <header>
        <h1>Main Heading</h1>
    </header>
</template>

<style scoped>
@import '../assets/variables.css';

header {
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    flex-shrink: 0;
}

h1 {
    padding: 0;
    margin: 0;
    font-size: 42px;
    text-align: center;
    text-transform: uppercase;
}
</style>