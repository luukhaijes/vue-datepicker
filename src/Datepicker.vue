<script setup lang="ts">
import DatepickerGrid from "./components/DatepickerGrid.vue";
import { ref } from "vue";
import { useDate } from "./composables/use-date";
import DatepickerHead from "./components/DatepickerHead.vue";
import DatepickerControls from "./components/DatepickerControls.vue";
import SelectOverview from "./components/SelectOverview.vue";

defineProps<{ date?: Date }>();

const { setYear, setMonth, setMonthIncremental, date: datepickerDate } = useDate();

const emits = defineEmits<{ (e: 'dateChange', value: Date): void }>();

const selectedDate = ref<Date>(new Date());

const selectDate = (newSelectedDate: Date) => {
  if (newSelectedDate) {
    selectedDate.value = new Date(newSelectedDate);
    emits('dateChange', selectedDate.value);
  }
}

const selectOverviewVisible = ref<boolean>(false);
const selectOverviewPeriod = ref<string | null>(null);

const setSelectOverview = (event: string) => {
  if (selectOverviewPeriod.value !== event) {
    selectOverviewPeriod.value = event;

    if (!selectOverviewVisible.value) {
      toggleOverview();
    }
    return;
  }
  console.log('la')
  toggleOverview();
}

const toggleOverview = () => {
  selectOverviewVisible.value = !selectOverviewVisible.value;
  return true;
}

</script>

<template>
  <div class="datepicker">
    <DatepickerControls @setMonth="setMonthIncremental($event)" @selectPeriod="setSelectOverview($event)" :picker-date="datepickerDate" />
    <template v-if="!selectOverviewVisible">
      <DatepickerHead />
      <div class="datepicker__grid">
        <datepicker-grid
          @daySelect="(selectedDay) => selectDate(selectedDay)"
          :current-date="datepickerDate"
          :selected-date="selectedDate" />
      </div>
    </template>
    <select-overview
      @setYear="toggleOverview() && setYear($event)"
      @setMonth="toggleOverview() && setMonth($event)"
      :overviewPeriod="selectOverviewPeriod"
      :date="selectedDate"
      v-else />
  </div>
</template>

<style scoped>
.datepicker {
  background-color: #fff;
  width: 315px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  border: 1px solid #d9d9d9;
  height: 306px;
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