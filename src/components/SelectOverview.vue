<script setup lang="ts">
import MonthView from "./MonthView.vue";
import YearView from "./YearView.vue";
import { provide } from "vue";

defineProps<{
  overviewPeriod: string | null;
  date: Date
}>();

const emits = defineEmits<{
  (e: 'setMonth', value: number): void;
  (e: 'setYear', value: number): void;
}>();

const setMonth = (value: number) => {
  emits('setMonth', value);
  console.log('lala')
};

const setYear = (value: number) => {
  emits('setYear', value);
  console.log('lala')
};
provide('setYear', setYear);
provide('setMonth', setMonth);
</script>

<template>
    <template v-if="overviewPeriod">
      <template v-if="overviewPeriod === 'month'">
        <month-view :selected-item="date?.getMonth()" />
      </template>
      <year-view :selected-item="date?.getFullYear()" v-else />
    </template>
</template>

<style>
.select-overview__gird {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: auto;
  height: 100%;
  margin: 0 4px;
  padding: 0 10px 20px;
}

.select-overview__gird-item {
  display: flex;
  flex-basis: 33.3333%;
  align-items: center;
  justify-content: center;
  padding: 5px 5px;
  box-sizing: border-box;
  margin-bottom: 5px;
  cursor: pointer;
}

.select-overview__gird-item > span {
  padding: 4px 0;
  border-radius: 8px;
  width: 100%;
  display: block;
}

.select-overview__gird-item:hover > span, .is-active {
  background-color: #7047EB;
  color: #fff;
}
</style>
