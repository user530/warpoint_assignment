<template>
    <header>
        <h1>Calculator Form</h1>
    </header>
</template>

<style scoped>
@import '../assets/variables.css';

header {
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    flex-shrink: 0;
    padding-block: 40px;

    h1 {
        padding: 0;
        margin: 0;
        font-size: 42px;
        text-align: center;
        text-transform: uppercase;
    }

    @media (max-width: 1199px) {
        padding-block: 25px;

        h1 {
            font-size: 34px;
        }
    }

    @media (max-width: 767px) {
        padding-block: 15px;

        h1 {
            font-size: 20px;
        }
    }
}
</style>