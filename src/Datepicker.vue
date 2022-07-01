<script setup lang="ts">
import format from "date-fns/format";
import DatepickerGrid from "./components/DatepickerGrid.vue";
import type { DayPickEvent } from "./interfaces/day-pick-event.interface";
import { ref } from "vue";
import AngleleftIcon from "./icons/AngleleftIcon.vue";
import AnglerightIcon from "./icons/AnglerightIcon.vue";

const years: number[] = [];
const setYearRange = (years: number[]) => {
  for (let i = 1900; i < 2101; i++) {
    years.push(i);
  }
}
setYearRange(years)

defineProps<{ date?: Date }>();
const emits = defineEmits<{ (e: 'dateChange', value: Date): void }>();

const datepickerDate = ref<Date>(new Date());
const selectedDate = ref<Date>(new Date());

const setYear = (year: number) => {
  datepickerDate.value.setFullYear(year);
  setCurrentDate({date: datepickerDate.value, state: "present"});
}

const setMonth = (month: number) => {
  datepickerDate.value.setMonth(month);
  setCurrentDate({date: datepickerDate.value, state: "present"});
}

const setCurrentDate = (payload: DayPickEvent) => {
  if (payload.date) {
    datepickerDate.value = new Date(payload.date);
  }
}

const selectDate = (payload: DayPickEvent) => {
  if (payload.date) {
    selectedDate.value = new Date(payload.date);
    emits('dateChange', selectedDate.value);
  }
}

const getAllMonths = () => [...Array(12).keys()].map(monthNumber => format(new Date(datepickerDate.value.getFullYear(), monthNumber, 1), 'MMMM'));
const months = ref<string[]>(getAllMonths());

</script>

<template>
  <div class="datepicker">
    <div class="datepicker__controls">
      <div class="control">
        <angleleft-icon class="icon" @click="setMonth(datepickerDate.getMonth() - 1)" />
      </div>
      <div>
        <select :value="datepickerDate.getMonth()" @change="(val) => setMonth(val.target.value)">
          <option v-for="(month, index) in months" :value="index" :key="index">
            {{ month }}
          </option>
        </select>
        <select :value="datepickerDate.getFullYear()" @change="(val) => setYear(val.target.value)">
          <option v-for="(year, index) in years" :key="index">
            {{ year }}
          </option>
        </select>
      </div>
      <div class="control">
        <angleright-icon class="icon" @click="setMonth(datepickerDate.getMonth() + 1)" />
      </div>
    </div>
    <div class="datepicker__head">
      <div class="headcell">Mon</div>
      <div class="headcell">Tue</div>
      <div class="headcell">Wed</div>
      <div class="headcell">Thu</div>
      <div class="headcell">Fri</div>
      <div class="headcell">Sat</div>
      <div class="headcell">Sun</div>
    </div>
    <div class="datepicker__grid">
      <DatepickerGrid
        @daySelect="(selectedDay) => selectDate(selectedDay)"
        :current-date="datepickerDate"
        :selected-date="selectedDate">
      </DatepickerGrid>
    </div>
  </div>
</template>

<style scoped>
.datepicker {
  background-color: #fff;
  width: 300px;
  border-radius: 5px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #d9d9d9;
}

.datepicker__controls {
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
}
.datepicker__controls .control .icon {
  width: 16px;
  cursor: pointer;
}

.datepicker__controls > :nth-child(2) {
  margin: 0 auto;
}

.datepicker__grid {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 10px 20px;
}

.datepicker__head {
  display: flex;
  flex-direction: row;
  padding: 0 15px;
}

.datepicker__head .headcell {
  flex: 1;
  text-align: center;
  padding: 2px;
  font-weight: bold;
}
</style>