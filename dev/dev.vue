<template>
  <div class="wrapper">
    <p>current date: {{ selectedDate }}</p>
    <Datepicker :date="selectedDate" @dateChange="(date) => selectedDate = date" placeholder="Select Date" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// import Datepicker from '../dist/vue-datepicker.es.js';
import Datepicker from '../src/Datepicker.vue';
const selectedDate = ref(new Date());
</script>

<style>
@import "./base.css";
/*@import "../dist/style.css";*/
.wrapper {
  padding: 200px;
  text-align: center;
}
</style>