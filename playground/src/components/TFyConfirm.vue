<script setup lang="ts">
import { useEventBus } from "@karpeleslab/fyvue"
const eventBus = useEventBus();

const testFyConfirm = () => {
  eventBus.emit('showConfirm', {
    title: 'Hey',
    desc: 'What?',
    onConfirm: async () => {
      console.log('yo');
    }
  })
}
</script>
<template>
  <button @click="testFyConfirm()">Test FyConfirm</button>
  <FyConfirm />
</template>
