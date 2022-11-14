<script setup lang="ts">
import { useEventBus } from '@karpeleslab/fyvue';
const eventBus = useEventBus();
const customMethod = () => {
  eventBus.emit('TestModal', true);
  setTimeout(() => {
    eventBus.emit('TestModal', false);
  }, 5000);
};
</script>
<template>
  <div class="btn-box">
    <FyModal id="Test" title="Hey Title">
      <p>Hey</p>
    </FyModal>
    <FyModal id="Test2" title="Hey Title">
      <p>Hey Test2</p>
    </FyModal>

    <button
      class="btn primary btn-defaults"
      @click="$eventBus.emit('TestModal', true)"
    >
      Open TestModal
    </button>
    <button
      class="btn primary btn-defaults"
      @click="$eventBus.emit('TestModal', true)"
    >
      Close TestModal
    </button>
    <button class="btn primary btn-defaults" @click="customMethod()">
      Close after 5 seconds
    </button>
    <button
      class="btn primary btn-defaults"
      @click="$eventBus.emit('Test2Modal', true)"
    >
      Open Test2Modal
    </button>
  </div>
</template>
