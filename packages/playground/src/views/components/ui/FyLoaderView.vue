<script setup>
import { useEventBus } from '@karpeleslab/fyvue';
import { ref } from 'vue';
import { InformationCircleIcon } from '@heroicons/vue/24/solid';
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
<template>
  <h2 class="text-xl font-bold">Simple usage:</h2>
  <div class="flex">
    <div
      class="relative w-44 h-44 border border-fv-neutral-400 dark:border-fv-neutral-700"
    >
      <FyLoader id="test" size="12" />
    </div>
    <button
      @click="$eventBus.emit('test-loading', true)"
      class="btn primary btn-defaults"
    >
      Show
    </button>
    <button
      @click="$eventBus.emit('test-loading', false)"
      class="btn neutral btn-defaults"
    >
      Hide
    </button>
  </div>
  <h2 class="text-xl font-bold mt-2">Always loading:</h2>

  <div
    class="relative w-32 h-32 border border-fv-neutral-400 dark:border-fv-neutral-700"
  >
    <FyLoader
      id="other-loader"
      :force="true"
      :showLoadingText="false"
      size="9"
    />
  </div>
</template>
`;
const props = [
  {
    name: 'id?',
    type: 'string',
    info: 'Used for eventBus event name (id+"-loading"), if undefined the event name will be "loading".',
  },
  {
    name: 'loader?',
    type: 'Component',
    info: 'Loader component (packages/fyvue/src/components/ui/FyLoader/DefaultLoader.vue)',
    def: 'DefaultLoader',
  },
  {
    name: 'size?',
    type: 'string',
    info: 'loader size (rem) (passed to loaded component)',
    def: '16',
  },
  {
    name: 'showLoadingText?',
    type: 'boolean',
    info: '(passed to loaded component)',
    def: 'true',
  },
];
</script>
<template>
  <div class="fv-typo mb-2">
    <h1>FyLoader</h1>
    <p>
      Show a loader (enabled and disabled via <b>eventBus</b>, this way the
      loader state is controllable from any component).
    </p>
    <p>
      <InformationCircleIcon class="w-5 inline-block -mt-1" /> You can access
      the <b>eventBus</b> from setup context with <b>useEventbus</b> (from
      @karpeleslab/fyvue)
    </p>
  </div>

  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <h2 class="text-xl font-bold">Simple usage:</h2>
      <div class="flex">
        <div
          class="relative w-44 h-44 border border-fv-neutral-400 dark:border-fv-neutral-700"
        >
          <FyLoader id="test" size="12" />
        </div>
        <button
          @click="$eventBus.emit('test-loading', true)"
          class="btn primary btn-defaults"
        >
          Show
        </button>
        <button
          @click="$eventBus.emit('test-loading', false)"
          class="btn neutral btn-defaults"
        >
          Hide
        </button>
      </div>
      <h2 class="text-xl font-bold mt-2">Always loading:</h2>

      <div
        class="relative w-32 h-32 border border-fv-neutral-400 dark:border-fv-neutral-700"
      >
        <FyLoader
          id="other-loader"
          :force="true"
          :showLoadingText="false"
          size="9"
        />
      </div>
    </template>
  </FyDocPreview>
</template>
