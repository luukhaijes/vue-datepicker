<script setup lang="ts">
import { useDate } from "../composables/use-date";
import { computed, inject } from "vue";

defineProps<{
  selectedItem: number
}>();

const { getMonthStrings } = useDate();

const allMonths = computed(() => getMonthStrings(new Date().getFullYear()));
const setMonth = inject('setMonth');
</script>

<template>
  <div class="select-overview__gird">
    <template v-for="(item, index) in allMonths" :key="item">
      <div class="select-overview__gird-item">
        <span :class="{ 'is-active': index === selectedItem }" @click="setMonth(index)">
          {{ item }}
        </span>
      </div>
    </template>
  </div>
</template>