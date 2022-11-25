<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import { rest } from '../../../utils/rest';
import { useHistory } from '../../../utils/ssr';
import type { KlbAPIResultUnknown } from '../../../dts/klb';
import { useHead } from '@vueuse/head';
import { useRoute } from 'vue-router';
import { useEventBus } from '../../../utils/helpers';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';

defineProps({});
const pageHead = reactive({
  title: `...`,
});
const page = ref();
const route = useRoute();
const is404 = ref<Boolean>(false);
const eventBus = useEventBus();

watch(
  () => route.params.slug,
  async (v) => {
    if (v) await loadPage(v);
  }
);

const loadPage = async (slug) => {
  eventBus.emit('cmspage-loading', true);
  is404.value = false;
  const _page = await rest<KlbAPIResultUnknown>(
    '/Content/Cms/@pages:loadSlug',
    'GET',
    {
      slug: slug,
    }
  ).catch((err) => {
    if (err.code == 404) {
      useHistory().status = 404;
      is404.value = true;
      pageHead.title = '404';
    }
    eventBus.emit('cmspage-loading', false);
  });
  if (_page && _page.result == 'success') {
    page.value = _page;
    pageHead.title = page.value.data.content_cms_entry_data.Title;
  }
  eventBus.emit('cmspage-loading', false);
};
useHead({
  title: computed(() => `${pageHead.title}`),
});
await loadPage(route.params.slug);
console.log(route.params, route.path);
</script>
<template>
  <div class="fv-relative">
    <FyLoader id="cmspage" />
    <div class="fv-typo margins" v-if="page">
      <h1>{{ page.data.content_cms_entry_data.Title }}</h1>
      <div v-html="page.data.content_cms_entry_data.Contents"></div>
    </div>
    <div class="fv-typo" v-if="is404">
      <h1>{{ $t('fv_404_text') }}</h1>
    </div>
  </div>
</template>
