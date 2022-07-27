<script></script>

<template>
  <div class="dropdown-container">
    <slot />
  </div>
</template>

<style>
.dropdown-container {
  background-color: #fff;
  padding: 5px 0;
  max-height: 250px;
  overflow-y: auto;
}
</style>