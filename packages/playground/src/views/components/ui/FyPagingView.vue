<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useEventBus } from '@karpeleslab/fyvue';
import { useRoute } from 'vue-router';
const testPaging = [
  [{ text: 'Message 1' }, { text: 'Message 2' }, { text: 'Message 3' }],
  [{ text: 'Message 4' }, { text: 'Message 5' }, { text: 'Message 6' }],
  [{ text: 'Message 7' }, { text: 'Message 8' }],
];
const paging = ref();
const results = ref(null);
const eventBus = useEventBus();
const route = useRoute();
const getData = (page = 1) => {
  if (route.query.page) page = parseInt(route.query.page);
  if (page < 1) page = 1;
  if (page > 3) page = 3;
  const data = {
    data: testPaging[page - 1],
    paging: {
      page_no: page,
      results_per_page: 3,
      page_max: 3,
      count: 7,
    },
  };
  paging.value = data.paging;
  results.value = data.data;
};
onMounted(() => {
  eventBus.on('myPagingGoToPage', getData);
  getData();
});
onUnmounted(() => {
  eventBus.off('myPagingGoToPage', getData);
});
const fvComponent = `
_script_
import { onMounted, onUnmounted, ref } from 'vue';
import { useEventBus } from '@karpeleslab/fyvue';
import { useRoute } from 'vue-router';
const testPaging = [
  [{ text: 'Message 1' }, { text: 'Message 2' }, { text: 'Message 3' }],
  [{ text: 'Message 4' }, { text: 'Message 5' }, { text: 'Message 6' }],
  [{ text: 'Message 7' }, { text: 'Message 8' }],
];
const paging = ref();
const results = ref(null);
const eventBus = useEventBus();
const route = useRoute();
const getData = (page = 1) => {
  if (route.query.page) page = parseInt(route.query.page);
  if (page < 1) page = 1;
  if (page > 3) page = 3;
  const data = { // this would be send by the API.
    data: testPaging[page - 1],
    paging: {
      page_no: page,
      results_per_page: 3,
      page_max: 3,
      count: 7,
    },
  };
  paging.value = data.paging;
  results.value = data.data;
};
onMounted(() => {
  eventBus.on('myPagingGoToPage', getData);
  getData();
});
onUnmounted(() => {
  eventBus.off('myPagingGoToPage', getData);
});
_script_end_
<template>
  <FyPaging id="myPaging" :items="paging" v-if="paging" />
  <pre class="text-xs">{{ results }}</pre>
</template>
`;

const props = [
  {
    name: 'items',
    type: 'KlbPaging',
    info: 'Paging informations.',
  },
  {
    name: 'id',
    type: 'string',
    info: 'This will add an event id+"GoToPage" with an in paramater to eventBus.',
  },
];
const slots = [];
</script>
<template>
  <FyDocPreview :component="fvComponent" :props="props" :slots="slots">
    <template #component>
      <FyPaging id="myPaging" :items="paging" v-if="paging" />
      <pre class="text-xs">{{ results }}</pre>
    </template>
  </FyDocPreview>
</template>
