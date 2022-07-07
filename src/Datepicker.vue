<script setup lang="ts">
import DatepickerGrid from "./components/DatepickerGrid.vue";
import { ref } from "vue";
import { useDate } from "./composables/use-date";
import DatepickerHead from "./components/DatepickerHead.vue";
import DatepickerControls from "./components/DatepickerControls.vue";

defineProps<{ date?: Date }>();

const { setYear, setMonth, date: datepickerDate } = useDate();

const emits = defineEmits<{ (e: 'dateChange', value: Date): void }>();

const selectedDate = ref<Date>(new Date());

const selectDate = (newSelectedDate: Date) => {
  if (newSelectedDate) {
    selectedDate.value = new Date(newSelectedDate);
    emits('dateChange', selectedDate.value);
  }
}

const sm = setMonth

</script>

<template>
  <div class="datepicker">
    <DatepickerControls @setYear="setYear($event)" @setMonth="setMonth($event)" :picker-date="datepickerDate" />
    <DatepickerHead />
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
  width: 315px;
  border-radius: 5px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #d9d9d9;
}

.datepicker__controls > :nth-child(2) {
  margin: 0 auto;
}

.datepicker__grid {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px 20px;
}
</style>