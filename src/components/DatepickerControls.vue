<template>
  <div class="datepicker__controls">
    <div class="control">
      <angleleft-icon class="icon" @click="$emit('setMonth', -1)"/>
    </div>
    <div>
      <span class="datepicker__date-info" @click="$emit('selectPeriod', 'month')">
        {{ allMonths[pickerDate.getMonth()] }}
        <angleleft-icon class="icon"/>
      </span>
      <span class="datepicker__date-info" @click="$emit('selectPeriod', 'year')">
        {{ pickerDate.getFullYear() }}
        <angleleft-icon class="icon"/>
      </span>
    </div>
    <div class="control">
      <angleright-icon class="icon" @click="$emit('setMonth', 1)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AngleleftIcon from '../icons/AngleleftIcon.vue';
import AnglerightIcon from '../icons/AnglerightIcon.vue';
import { useDate } from "../composables/use-date";

const { getMonthStrings } = useDate();

const props = defineProps<{
  pickerDate: Date
}>();

defineEmits<{
  (e: "selectPeriod", value: "month" | "year"): void;
  (e: "setMonth", value: number): void
}>();

const allMonths = computed(() => getMonthStrings(props.pickerDate.getFullYear()));
</script>

<style>
.datepicker__controls {
  display: flex;
  flex-direction: row;
  padding: 10px 20px 20px;
}

.datepicker__controls > div {
  margin: 0 auto;
  display: flex;
}

.datepicker__controls .control .icon {
  width: 16px;
  cursor: pointer;
}

.datepicker__date-info {
  font-weight: bold;
  cursor: pointer;
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.datepicker__date-info:hover, .datepicker__date-info--active {
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #F8F7FA;
  color: #7047EB;
}

.datepicker__date-info .icon {
  height: 15px;
  transform: rotate(-90deg);
}
</style>