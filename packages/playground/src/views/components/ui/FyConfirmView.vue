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
  <div class="fv-typo mb-2">
    <h1>FyConfirm</h1>
    <p>Show a confirm modal on action using fyvue <b>eventBus</b>.</p>
    <p>
      <ShieldCheckIcon class="w-5 inline-block -mt-1" /> You should include
      <code v-text="`<FyConfirm />`"></code> in your root layout.
    </p>
  </div>

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
