<script setup>
import FinancialTable from './components/FinancialTable.vue';
</script>

<template>
  <div>
    <FinancialTable jsonDataUrl="./assets/json/rawData.json" />
  </div>
</template>

<style>
html {
  overflow-y: scroll;
}
</style>