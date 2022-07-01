<script setup lang="ts">
import type { DayPickEvent } from "@/components/ui/datepicker/interfaces/day-pick-event.interface";
import { ref, watch } from "vue";
import { isEqual, getDaysInMonth as fnsGetDaysInMonth } from "date-fns";

const dateEqual = isEqual

interface DateCell {
  day: number;
  date: Date;
}

let daySelect = false;
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

const getDaysGrid = (date: Date): [DateCell[], DateCell[]] => {
  return [
    getRemainingDaysInPreviousMonth(...setDaysArgs(date)),
    getDaysInMonth(...setDaysArgs(date))
  ]
}

const [_daysPreviousMonth, _days] = getDaysGrid(props.currentDate);

// todo: can be one ref
const daysPreviousMonth = ref(_daysPreviousMonth);
const days = ref(_days);

const currentDate = ref<Date>(props.currentDate);

const emits = defineEmits<{
  (e: 'daySelect', value: DayPickEvent): void
}>()

const handleDaySelect = (tense: DayPickEvent['state'], date: DayPickEvent['date']) => {
  emits('daySelect', {state: tense, date});
  daySelect = true;
};

watch(() => props.currentDate, (value: Date, oldValue: Date) => {
  currentDate.value = value

  if (!daySelect) {
    const [_newDaysPreviousMonth, _newDays] = getDaysGrid(value);
    daysPreviousMonth.value = _newDaysPreviousMonth;
    days.value = _newDays;
  }
  daySelect = false;
})

const cleanDate = (date: Date) => new Date(date.toDateString())

</script>

<template>
  <template v-for="{day, date} in daysPreviousMonth" :key="day">
    <div class="cell prevMonth" @click="handleDaySelect('past', date)">
      <span>
        {{ day }}
      </span>
    </div>
  </template>
  <template v-for="{day, date} in days" :key="day">
    <div class="cell" @click="handleDaySelect('present', date)"
         :class="{
            currentDay: dateEqual(date, cleanDate(today)),
            selected: dateEqual(date, cleanDate(selectedDate))
          }">
      <span>
        {{ day }}
      </span>
    </div>
  </template>
</template>

<style scoped>
.cell {
  flex: 0 0 calc(100% / 7);
  padding: 3px;
  text-align: center;
  width: 50px;
  height: 40px;
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

.prevMonth {
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