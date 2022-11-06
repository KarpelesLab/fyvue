<script setup lang="ts">
  import { useEventBus } from "@karpeleslab/fyvue";
  const eventBus = useEventBus();
</script>

<template>
  <main class="p-20">
    Yop <button @click="() => eventBus.emit('TestModal', true)" >Test</button>
    <FyModal id="Test" title="Hey Title">
    <p>Hey</p>
   </FyModal>
    <div class="w-24 light mt-20"><FyCirclePercent :percent="60" color="red" /></div>
  </main>
</template>
