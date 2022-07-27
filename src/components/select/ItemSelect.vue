<script setup lang="ts">
import AngleleftIcon from '../../icons/AngleleftIcon.vue';
import HostedDropdown from "../HostedDropdown.vue";
import DropdownContainer from "../DropdownContainer.vue";
import DropdownContainerItem from "../DropdownContainerItem.vue";
import { onMounted, ref, watch } from "vue";
import { useSlots } from "vue";

type SelectValue = string | number | null;

const props = defineProps<{
  value?: SelectValue,
  compareWith: (a: SelectValue, b: SelectValue) => boolean
}>();

const selectValue = ref<SelectValue>(null);

watch(() => props.value, (value) => {
  if (value) {
    selectValue.value = value;
    const { items } = useSlots();
    console.log(items?.length);
  }
}, { immediate: true })

onMounted(() => {

})

</script>

<template>
  <hosted-dropdown>
    <template v-slot="{ open }">
      <span class="datepicker__date-info" :class="{ 'datepicker__date-info--active': open }">
        {{ selectValue || "" }}
        <angleleft-icon class="icon"/>
      </span>
    </template>
    <template #content>
      <dropdown-container>
        <slot name="items" />
      </dropdown-container>
    </template>
  </hosted-dropdown>
</template>