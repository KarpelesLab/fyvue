<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { KLBPaging } from '@karpeleslab/fyvue/dts/types';
import { testPaging } from './testData'
import { useEventBus } from '@karpeleslab/fyvue';
const paging = ref<KLBPaging>();
const results = ref<Object|null>(null)
const eventBus = useEventBus();
const getData = (page = 1) => {
  if (page < 1) page = 1;
  if (page > 3) page = 3;
  let data = {
    data: testPaging[page-1], paging: {
      "page_no": page,
      "results_per_page": 3,
      "page_max": 3,
      "page_max_relation": "eq",
      "count": 7
    }
  }
  paging.value = data.paging as KLBPaging;
  results.value = data.data;
}
onMounted(()=> {
  eventBus.on("myPagingGoToPage", getData);
  getData();
})
onUnmounted(()=> {
  eventBus.off("myPagingGoToPage", getData);
})
</script>
<template>
<FyPaging id="myPaging" :items="paging" v-if="paging" />
<template v-if="results">
  <pre class="text-xs">{{results}}</pre>
</template>
<div class="dark bg-neutral-800 p-4">
  <FyPaging id="myPaging" :items="paging" v-if="paging" />
</div>
</template>
