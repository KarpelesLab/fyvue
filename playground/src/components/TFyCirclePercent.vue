<template>
  <div class="flex space-x-3">
    <div class="w-32 p-2">
      <FyCirclePercent :percent="60" color="red" />
    </div>
    <div class="w-32 p-2">
      <FyCirclePercent :percent="15" color="rgb(0,154,0)" />
    </div>
    <div class="w-32 p-2">
      <FyCirclePercent :percent="100" color="#eeee00" />
    </div>
  </div>
</template>
