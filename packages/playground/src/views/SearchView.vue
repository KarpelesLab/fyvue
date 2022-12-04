<script setup>
import { useSeo, useTranslation } from '@karpeleslab/fyvue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { rest } from '@karpeleslab/fyvue';
import { useRoute } from 'vue-router';
import { useEventBus } from '@karpeleslab/fyvue';
import ComponentIndex from '@/componentIndex';

const route = useRoute();
const results = ref();
const eventBus = useEventBus();
const queryWatcher = ref();
const seo = ref({});
const slugToUrl = {
  'ssr-main': '/ssr',
  'ssr-rest': '/ssr/rest',
  'ssr-router': '/ssr/router',
  'helpers-eventBus': '/helpers/events',
  'helpers-i18n': '/helpers/i18n',
  'helpers-formatting': '/helpers/formatting',
  'helpers-store': '/helpers/store',
  'helpers-styling': '/helpers/styles',
  'getting-started': '/',
};

const doSearch = async (page = 1) => {
  if (route.query.page) page = route.query.page;
  seo.value = {};
  if (route.params.query) {
    seo.value.title = `Search results for: ${route.params.query}`;
  } else {
    seo.value.title = 'Search - fyvue';
  }
  eventBus.emit('search-loading', true);
  results.value = undefined;
  const _data = await rest(
    `Content/Cms/ctcm-dwt7xu-mmez-eh3f-xmg2-pqrzarfa:search`,
    'GET',
    {
      page_no: page,
      results_per_page: 8,
      sort: 'published:desc',
      image_variation: 'strip&scale_crop=1280x160&alias=banner',
      query: {
        all: route.params.query,
      },
    }
  ).catch((err) => {
    eventBus.emit('search-loading', false);
  });
  if (_data && _data.result == 'success') {
    results.value = _data;
  }
};
await doSearch();
useSeo(seo);
onMounted(() => {
  queryWatcher.value = watch(
    () => route.params.query,
    () => {
      doSearch();
    }
  );
  eventBus.on('searchPagingGoToPage', doSearch);
});
onUnmounted(() => {
  if (queryWatcher.value) queryWatcher.value();
  eventBus.off('searchPagingGoToPage', doSearch);
  eventBus.emit('leaveSearchPage');
});
</script>
<template>
  <div class="doc-contained flex-1 fv-typo mt-4">
    <FyBreadcrumb :nav="$route.meta.breadcrumb" />
    <div class="card-container card-defaults mt-4">
      <h1 class="font-bold" v-if="$route.params.query">
        Search results for: <u>{{ $route.params.query }}</u>
      </h1>
      <h1 class="font-bold" v-else>Search</h1>
      <div v-if="results">
        <FyPaging
          v-if="results && results.paging"
          id="searchPaging"
          :items="results.paging"
          class="mb-2"
        />
        <template v-for="c in results.data.data" :key="c.Content_Cms_Entry__">
          <template v-if="ComponentIndex.ui.includes(c.Slug)">
            <div class="card-container mb-2 px-3 py-1">
              <h2>
                <RouterLink :to="`/components/ui/${c.Slug}`">{{
                  c.Title
                }}</RouterLink>
              </h2>
              <p v-if="c.Short_Contents">{{ c.Short_Contents }}</p>
            </div>
          </template>
          <template v-else-if="ComponentIndex.misc.includes(c.Slug)">
            <div class="card-container mb-2 px-3 py-1">
              <h2>
                <RouterLink :to="`/components/misc/${c.Slug}`">{{
                  c.Title
                }}</RouterLink>
              </h2>
              <p v-if="c.Short_Contents">{{ c.Short_Contents }}</p>
            </div>
          </template>
          <template v-else-if="ComponentIndex.klb.includes(c.Slug)">
            <div class="card-container mb-2 px-3 py-1">
              <h2>
                <RouterLink :to="`/components/klb/${c.Slug}`">{{
                  c.Title
                }}</RouterLink>
              </h2>
              <p v-if="c.Short_Contents">{{ c.Short_Contents }}</p>
            </div>
          </template>
          <template v-else-if="slugToUrl.hasOwnProperty(c.Slug.toLowerCase())">
            <div class="card-container mb-2 px-3 py-1">
              <h2>
                <RouterLink :to="`${slugToUrl[c.Slug.toLowerCase()]}`">{{
                  c.Title
                }}</RouterLink>
              </h2>
              <p v-if="c.Short_Contents">{{ c.Short_Contents }}</p>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup></script>
