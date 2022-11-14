<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useEventBus } from '@karpeleslab/fyvue';
import type { KLBPaging } from "@karpeleslab/fyvue/src/dts/klb"
const testPaging = [
  [{ text: 'Message 1' }, { text: 'Message 2' }, { text: 'Message 3' }],
  [{ text: 'Message 4' }, { text: 'Message 5' }, { text: 'Message 6' }],
  [{ text: 'Message 7' }, { text: 'Message 8' }],
];

const paging = ref<KLBPaging>();
const results = ref<Object | null>(null);
const eventBus = useEventBus();
const getData = (page = 1) => {
  if (page < 1) page = 1;
  if (page > 3) page = 3;
  const data = {
    data: testPaging[page - 1],
    paging: {
      page_no: page,
      results_per_page: 3,
      page_max: 3,
      page_max_relation: 'eq',
      count: 7,
    },
  };
  paging.value = data.paging as KLBPaging;
  results.value = data.data;
};
onMounted(() => {
  eventBus.on('myPagingGoToPage', getData);
  getData();
});
onUnmounted(() => {
  eventBus.off('myPagingGoToPage', getData);
});
</script>
<template>
  <TFyPaging id="myPaging" :items="paging" v-if="paging" />
  <template v-if="results">
    <pre class="text-xs">{{ results }}</pre>
  </template>
</template>
