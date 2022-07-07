<script setup lang="ts">
import type { DateCell } from "../interfaces/date-cell.interface";
import { ref, watch } from "vue";
import { isEqual } from "date-fns";
import { useDateGrid } from "../composables/use-date-grid";

const props = defineProps<{
  currentDate: Date;
  selectedDate: Date
}>();

const dateEqual = isEqual;
const today = new Date();
const {getDaysGrid} = useDateGrid();

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