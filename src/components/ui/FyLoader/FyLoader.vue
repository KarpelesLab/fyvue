<script setup lang="ts">
import { useEventBus } from '@karpeleslab/fyvue/helpers';
import { onMounted, onUnmounted, ref } from 'vue';
import DefaultLoader from './DefaultLoader.vue';

const props = defineProps({
  id: {
    type: String,
    default: null
  },
  loader: {
    type: Object,
    default: DefaultLoader
  },
  showLoadingText: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: "16"
  }
})
const eventBus = useEventBus();
const loading = ref<boolean>(false)
const setLoading = (value: boolean) => {
  loading.value = value
}
onMounted(() => {
  if (props.id) {
    eventBus.on(`${props.id}-loading`, setLoading)
  } else {
    eventBus.on("loading", setLoading)
  }
})
onUnmounted(() => {
  if (props.id) {
    eventBus.off(`${props.id}-loading`, setLoading)
  } else {
    eventBus.off("loading", setLoading)
  }
})
</script>
<template>
  <div v-if="loading">
    <div class="fy-loader" >
      <div class="loader-container" role="status" :style="`width:${size}rem; height:${size}rem;`">
        <component :is="loader" :size="size" />
      </div>
    </div>
  </div>
</template>
