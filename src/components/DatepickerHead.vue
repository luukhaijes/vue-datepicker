<template>
  <div class="datepicker__head">
    <div class="headcell">Mon</div>
    <div class="headcell">Tue</div>
    <div class="headcell">Wed</div>
    <div class="headcell">Thu</div>
    <div class="headcell">Fri</div>
    <div class="headcell">Sat</div>
    <div class="headcell">Sun</div>
  </div>
</template>

<style>
.datepicker__head {
  display: flex;
  flex-direction: row;
  padding: 0 10px;
}

.datepicker__head .headcell {
  box-sizing: border-box;
  width: calc(100% / 7);
  flex: 1;
  text-align: center;
  font-weight: bold;
}
</style>