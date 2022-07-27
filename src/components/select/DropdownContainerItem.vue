<script></script>

<template>
  <div class="dropdown-container__item">
    <slot />
  </div>
</template>

<style>
.dropdown-container__item {
  padding: 8px 16px;
  cursor: pointer;
}
.dropdown-container__item:hover {
  background-color: #7047EB;
  color: #fff;
}
</style>