<script setup>
import { useEventBus } from '@karpeleslab/fyvue';
import { ref } from 'vue';
import { ShieldCheckIcon } from '@heroicons/vue/24/solid';
const eventBus = useEventBus();
const isConfirmed = ref(false);
const areYouSure = () => {
  eventBus.emit('showConfirm', {
    title: 'ARE YOU SURE?',
    desc: 'Do you want to confirm?',
    onConfirm: async () => {
      isConfirmed.value = true;
    },
  });
};
const fvComponent = `
_script_
import { useEventBus } from '@karpeleslab/fyvue';
import { ref } from 'vue';
const eventBus = useEventBus();
const isConfirmed = ref(false);
const areYouSure = () => {
  eventBus.emit('showConfirm', {
    title: 'ARE YOU SURE?',
    desc: 'Do you want to confirm?',
    onConfirm: async () => {
      isConfirmed.value = true;
    },
  });
};
_script_end_
<template>
  <code>IsConfirmed: {{ isConfirmed }}</code>
  <br />
  <div class="btn-box">
    <button @click="areYouSure()" class="btn primary btn-defaults">
      Test confirm
    </button>
    <button class="btn neutral btn-defaults" @click="isConfirmed = false">
      Reset state
    </button>
  </div>
</template>
`;
const props = undefined;
</script>
<template>
  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <code>IsConfirmed: {{ isConfirmed }}</code>
      <br />
      <div class="btn-box">
        <button @click="areYouSure()" class="btn primary btn-defaults">
          Test confirm
        </button>
        <button class="btn neutral btn-defaults" @click="isConfirmed = false">
          Reset state
        </button>
      </div>
    </template>
  </FyDocPreview>
</template>
