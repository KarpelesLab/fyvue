<script setup lang="ts">
import { useEventBus } from '@karpeleslab/fyvue';
import { onMounted } from 'vue';
const eventBus = useEventBus();
onMounted(() => {
  eventBus.emit('loading', true);
  setTimeout(() => {
    eventBus.emit('tiny-loading', true);
  }, 500);
  setTimeout(() => {
    eventBus.emit('tiny-loading', false);
  }, 16000);
});
</script>

<template>
  <div class="relative w-full h-96">
    <FyLoader size="16" />
  </div>
  <div class="relative w-48 h-48 mx-auto">
    <FyLoader id="tiny" size="4" />
  </div>

</template>
