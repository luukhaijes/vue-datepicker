<script setup lang="ts">
import type { DayPickEvent } from "@/interfaces/day-pick-event.interface";
import { ref, watch } from "vue";
import { isEqual, getDaysInMonth as fnsGetDaysInMonth } from "date-fns";

const dateEqual = isEqual

interface Dictionary {
  [key: string]: string | boolean | number
}

interface DateCell {
  day: number;
  date: Date;
  className?: Dictionary;
}

const today = new Date();

const props = defineProps<{
  currentDate: Date;
  selectedDate: Date
}>();

const getRemainingDaysInPreviousMonth = (year: number, month: number): DateCell[] => {
  const pickerDate = new Date(year, month, 1).getDay() - 1;
  const daysInMonth = getDaysInMonth(year, month - 1);

  return daysInMonth.slice(daysInMonth.length - pickerDate);
}

const getRemainingDaysInNextMonth = (year: number, month: number): DateCell[] => {
  const pickerDay = new Date(year, month + 1, 0).getDay();
  const daysInMonth = getDaysInMonth(year, month + 1);

  const DAYS_IN_WEEKS = 7;
  if (pickerDay !== 0) {
    return daysInMonth.slice(0, DAYS_IN_WEEKS - pickerDay);
  }

  return [];
}

const getDaysInMonth = (year: number, month: number): DateCell[] => {
  const pickerDate = new Date(year, month, 1);

  return [...Array(fnsGetDaysInMonth(pickerDate)).keys()].map<DateCell>(day => {
    day = day + 1;

    return {
      day: day,
      date: new Date(year, month, day)
    }
  })
}

const setDaysArgs = (date: Date): [number, number] => [date.getFullYear(), date.getMonth()];

// todo: cache grid
const getDaysGrid = (date: Date) => {
  if (!date) {
    return [];
  }

  return [
    ...getRemainingDaysInPreviousMonth(...setDaysArgs(date)),
    ...getDaysInMonth(...setDaysArgs(date)),
    ...getRemainingDaysInNextMonth(...setDaysArgs(date))
  ];
};

const currentDate = ref<Date>(props.currentDate);
const daysGrid = ref<DateCell[]>([]);
daysGrid.value = getDaysGrid(props.currentDate);


const emits = defineEmits<{
  (e: 'daySelect', value: Date): void
}>()

const handleDaySelect = (date: Date) => {
  emits('daySelect', date);
};

watch(() => props.currentDate, (value: Date) => {
  currentDate.value = value
  daysGrid.value = getDaysGrid(value);
})

const cleanDate = (date: Date) => new Date(date.toDateString())

</script>

<template>
  <template v-for="{day, date, className} in daysGrid" :key="date">
    <div class="cell" @click="handleDaySelect(date)"
         :class="{
            currentDay: dateEqual(date, cleanDate(today)),
            selected: dateEqual(date, cleanDate(selectedDate)),
            otherMonth: date.getMonth() !== currentDate.getMonth()
          }">
      <span>
        {{ day }}
      </span>
    </div>
  </template>
</template>

<style scoped>
.cell {
  box-sizing: border-box;
  width: calc(100% / 7);
  padding: 3px;
  text-align: center;
  height: 42px;
  display: table;
  cursor: pointer;
}

.cell > span {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.cell > span > p {
  line-height: 1;
}

.otherMonth {
  opacity: .4;
}

.currentDay > span {
  font-weight: 500;
  border-radius: 50%;
  color: #000;
  background-color: rgba(244, 245, 249, 1);
}

.currentDay > span::after {
  content: " ";
  width: 5px;
  height: 5px;
  border-radius: 3px;
  display: block;
  margin: 0 auto;
  background-color: rgb(96, 49, 218);
  margin-bottom: -5px;
}

.selected > span {
  font-weight: 500;
  border-radius: 50%;
  color: #fff;
  background-color: rgb(96, 49, 218);
}
</style>