<script setup lang="ts">
import { nanoid } from 'nanoid';
import { onMounted, ref } from 'vue';
// import { elementIntersectsWith } from '@/+core/helpers/is-in-viewport';
import { useIntersectionObserver } from '../../composables/useIntersectionObserver';
import type { UseIntersectionObserver } from '../../composables/useIntersectionObserver';

const elementId = ref();
const props = defineProps<{
  width?: number;
  disableAutoClose?: boolean;
  unstyled?: boolean;
  alignment?: 'left' | 'right';
}>();
const cordsSettled = ref<boolean>(false);
const open = ref<boolean>(false);
const autoClose = ref<boolean | undefined>(props.disableAutoClose);

let dropdownContainer: HTMLDivElement;
let observer: UseIntersectionObserver;

const options = {
  root: null,
  rootMargin: '40px',
  threshold: 1.0,
};

const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      window.requestIdleCallback(() => setCords(entry.boundingClientRect));
    }
  });
};

onMounted(() => {
  observer = useIntersectionObserver(callback, null, options);
  elementId.value = nanoid(6);
});

const handleClose = () => {
  if (!autoClose.value && open.value === true) {
    setTimeout(() => (open.value = false), 100);
    activateResizeListener(false);
  }
};
const handleOpen = (event: MouseEvent) => {
  event.stopPropagation();
  activateResizeListener(!open.value);
  open.value = !open.value;
};

const setCords = (containerElementRect?: DOMRect) => {
  const triggerElement = document.getElementById('element-wrapper-' + elementId.value);
  if (triggerElement) {
    const containerGap = 5;
    const triggerRect = triggerElement.getBoundingClientRect();
    const triggerCordY = triggerRect.top + window.scrollY;
    const containerTop = triggerCordY + triggerRect.height + containerGap;
    const insetLeft = props.alignment === 'right' ? triggerRect.left - triggerRect.width : triggerRect.left;

    const inset: string[] = [`${containerTop}px`, 'auto', 'auto', `${insetLeft}px`];

    // if (containerElementRect) {
    //   const alignment = elementIntersectsWith(containerElementRect);
    //
    //   if (alignment === 'bottom') {
    //     inset[0] = triggerCordY - (containerElementRect.height + containerGap) + 'px';
    //   }
    // }

    if (dropdownContainer) {
      dropdownContainer.style.inset = inset.join(' ');
    }
    cordsSettled.value = true;
  }
};

const activateResizeListener = (openValue: boolean) => {
  setTimeout(() => {
    dropdownContainer = document.getElementById('hosted-dropdown-' + elementId.value) as HTMLDivElement;
    if (dropdownContainer) {
      setCords();
      if (openValue) {
        observer.start(dropdownContainer);
      }
    }
  });

  if (!openValue && dropdownContainer) {
    observer.stop(dropdownContainer);
    cordsSettled.value = false;
  }
};
</script>

<template>
  <div>
    <span :id="'element-wrapper-' + elementId" @click="(event) => handleOpen(event)">
      <slot :open="open" />
    </span>
    <Teleport to="body">
      <div
        v-if="open"
        :id="'hosted-dropdown-' + elementId"
        :hidden="!cordsSettled"
        :style="{ width: width + 'px' }"
        :class="{
          'hosted-dropdown-content': true,
          styled: !unstyled,
        }"
      >
        <slot name="content" />
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.hosted-dropdown-wrapper {
  position: relative;
  display: block;
}

.hosted-dropdown-content {
  position: absolute;
  right: 0;
  z-index: 9999;
}

.hosted-dropdown-content.styled {
  background-color: #fff;
  /*border: 1px solid #d9d9d9;*/
  margin-top: 5px;
  box-shadow: 0px 30px 84px rgba(19, 10, 46, 0.08), 0px 8px 32px rgba(19, 10, 46, 0.07), 0px 3px 14px rgba(19, 10, 46, 0.03), 0px 1px 3px rgba(19, 10, 46, 0.13);
  border-radius: 8px;
  overflow: hidden;
}
</style>
