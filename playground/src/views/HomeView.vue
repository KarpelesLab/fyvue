<script setup lang="ts">
  import { useEventBus } from "@karpeleslab/fyvue";
  const eventBus = useEventBus();
</script>

<template>
  <main>
    Yop <button @click="() => eventBus.emit('TestModal', true)" >Test</button>
    <FyModal id="Test" title="Test">Yoyoyoyo</FyModal>
  </main>
</template>
