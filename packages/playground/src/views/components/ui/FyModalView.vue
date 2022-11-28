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
const fvComponent = `<FyModal title="Test title" id="Test"><p>Plop</p></FyModal>
<button
  @click="$eventBus.emit('TestModal', true)"
  class="btn primary btn-defaults"
>
  Test modal
</button>
`;
const props = undefined;
</script>
<template>
  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <FyModal title="Test title" id="Test">
        <!-- <template #before><div>testazeaze</div></template>-->
        <p>Plop</p></FyModal
      >
      <button
        @click="$eventBus.emit('TestModal', true)"
        class="btn primary btn-defaults"
      >
        Test modal
      </button>
    </template>
  </FyDocPreview>
</template>
