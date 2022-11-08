# FyConfirm
<details>
  <summary>Preview</summary>

  ![FyConfirm](/components/FyConfirm.png)
</details>

[[toc]]

## Usage

This is a root component, it means it should be included in your root layout and only once per app.

```vue
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

```

## Details

### Code

@[code vue](../../src/components/ui/FyConfirm/FyConfirm.vue)
