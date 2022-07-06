<template>
  <div class="wrapper">
    <Datepicker :date="selectedDate" placeholder="Select Date" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// import Datepicker from '../dist/vue-datepicker.es.js';
import Datepicker from '../src/Datepicker.vue';
const selectedDate = ref(new Date());
</script>

<style>
/*@import "../dist/style.css";*/
.wrapper {
  padding: 200px;
}
</style>