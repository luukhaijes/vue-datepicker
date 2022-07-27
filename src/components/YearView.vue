<script setup lang="ts">
import { useDate } from "../composables/use-date";
import { computed, inject, onMounted } from "vue";

const props = defineProps<{
  selectedItem: number
}>();

const { getYearRange } = useDate();

const years = computed(() => getYearRange);

onMounted(() => {
  const item = document.getElementById(props.selectedItem.toString());
  if (item) {
    item.scrollIntoView({ inline: "center" });
  }
})

const setYear = inject('setYear');

</script>

<template>
    {{selectedItem}}
  <div class="select-overview__gird">
    <template v-for="item in years" :key="item">
      <div class="select-overview__gird-item" :id="item" @click="setYear(item)">
        <span :class="{ 'is-active': item === selectedItem }">
          {{ item }}
        </span>
      </div>
    </template>
  </div>
</template>