<template>
  <div class="datepicker__controls">
    <div class="control">
      <angleleft-icon class="icon" @click="setMonth(-1)" />
    </div>
    <div>
      <select :value="pickerDate.getMonth()" @change="(val) => setMonth(val.target.value)">
        <option v-for="(month, index) in allMonths" :value="index" :key="index">
          {{ month }}
        </option>
      </select>
      <select :value="pickerDate.getFullYear()" @change="(val) => setYear(val.target.value)">
        <option v-for="(year, index) in yearRange" :value="year" :key="index">
          {{ year }}
        </option>
      </select>
    </div>
    <div class="control">
      <angleright-icon class="icon" @click="setMonth(1)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import format from "date-fns/format";
import AngleleftIcon from '../icons/AngleleftIcon.vue';
import AnglerightIcon from '../icons/AnglerightIcon.vue';

const props = defineProps<{
  pickerDate: Date
}>()

const emits = defineEmits<{
  (e: 'setMonth', value: number): void;
  (e: 'setYear', value: number): void;
}>();
const setMonth = (value: number) => {
  emits('setMonth', value);
};
const setYear = (value: number) => {
  emits('setYear', value);
};

const yearRange = computed(() => {
  const years: number[] = [];
  for (let i = 1900; i < 2101; i++) {
    years.push(i);
  }

  return years;
})

const allMonths = computed(() => [...Array(12).keys()].map(monthNumber => format(new Date(props.pickerDate.getFullYear(), monthNumber, 1), 'MMMM')));
</script>

<style>
.datepicker__controls {
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
}
.datepicker__controls .control .icon {
  width: 16px;
  cursor: pointer;
}
</style>