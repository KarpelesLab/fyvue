<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { watch, onUnmounted, ref, WatchStopHandle, onMounted } from 'vue';
import type { KlbApiPaging } from '../../../dts/klb';
import { useEventBus } from '../../../utils/helpers';
import { useHistory } from '../../../utils/ssr';
import { useSeo } from '../../helpers/seo';
import { getUrl } from '@karpeleslab/klbfw';
import type { SeoData } from '../../../dts';
import { useRoute } from 'vue-router';
const props = defineProps<{
  items: KlbApiPaging;
  id: string;
}>();
const route = useRoute();
const eventBus = useEventBus();
const history = useHistory();
const prevNextSeo = ref<SeoData>({});
const url = getUrl();
const isNewPage = (page: number) => {
  return (
    page >= 1 && page <= props.items.page_max && page != props.items.page_no
  );
};
const pageWatcher = ref<WatchStopHandle>();

const next = () => {
  const page = props.items.page_no + 1;

  if (!isNewPage(page)) return;

  history.push({
    path: history.currentRoute.path,
    query: { page: page.toString() },
  });
};
const prev = () => {
  const page = props.items.page_no - 1;
  if (!isNewPage(page)) return;

  history.push({
    path: history.currentRoute.path,
    query: { page: page.toString() },
  });
};
const page = (page: number) => {
  if (!isNewPage(page)) return;

  history.push({
    path: history.currentRoute.path,
    query: { page: page.toString() },
  });
};

const checkPageNumber = (page: number = 1) => {
  prevNextSeo.value.next = undefined;
  prevNextSeo.value.prev = undefined;
  if (page + 1 <= props.items.page_max) {
    prevNextSeo.value.next = `${url.scheme}://${url.host}${url.path}?page=${
      page + 1
    }`;
  }
  if (page - 1 >= 1) {
    prevNextSeo.value.prev = `${url.scheme}://${url.host}${url.path}?page=${
      page - 1
    }`;
  }
};
eventBus.on(`${props.id}GoToPage`, checkPageNumber);
onMounted(() => {
  pageWatcher.value = watch(
    () => route.query.page,
    (v, ov) => {
      eventBus.emit(`${props.id}GoToPage`, v ? v : 1);
    }
  );
});
onUnmounted(() => {
  eventBus.off(`${props.id}GoToPage`, checkPageNumber);
  if (pageWatcher.value) pageWatcher.value();
});

checkPageNumber(props.items.page_no);
useSeo(prevNextSeo);

/*
<link rel="prev" href="https://www.example.com/article?story=abc&page=1" />
<link rel="next" href="https://www.example.com/article?story=abc&page=3" />
*/
</script>
<template>
  <div class="fy-paging" v-if="items && items.page_max > 1 && items.page_no">
    <div class="paging-container">
      <nav aria-label="Pagination">
        <a
          href="javascript:void(0);"
          @click="prev()"
          v-if="items.page_no >= 2"
          class="prev-next"
        >
          <span class="is-sr">{{ $t('previous_paging') }}</span>
          <ChevronLeftIcon class="fv-icon-base" />
        </a>
        <a
          v-if="items.page_no - 2 > 1"
          class="innactive"
          href="javascript:void(0);"
          @click="page(1)"
        >
          1
        </a>
        <span v-if="items.page_no - 2 > 2" class="dots"> ... </span>
        <template v-for="i in 2">
          <a
            v-if="items.page_no - (3 - i) >= 1"
            class="innactive"
            href="javascript:void(0);"
            :key="`${i}-sm`"
            @click="page(items.page_no - (3 - i))"
          >
            {{ items.page_no - (3 - i) }}
          </a>
        </template>
        <a href="#" aria-current="page" class="active">
          {{ items.page_no }}
        </a>
        <template v-for="i in 2">
          <a
            v-if="items.page_no + i <= items.page_max"
            class="innactive"
            href="javascript:void(0);"
            :key="`${i}-md`"
            @click="page(items.page_no + i)"
          >
            {{ items.page_no + i }}
          </a>
        </template>
        <span v-if="items.page_no + 2 < items.page_max - 1" class="dots">
          ...
        </span>
        <a
          v-if="items.page_no + 2 < items.page_max"
          class="innactive"
          href="javascript:void(0);"
          @click="page(items.page_max)"
        >
          {{ items.page_max }}
        </a>
        <a
          href="javascript:void(0);"
          @click="next()"
          v-if="items.page_no < items.page_max - 1"
          class="prev-next"
        >
          <span class="is-sr">{{ $t('next_paging') }}</span>
          <ChevronRightIcon class="fv-icon-base" />
        </a>
      </nav>
      <p class="paging-text">
        {{
          $t('global_paging', {
            start: items.results_per_page * (items.page_no - 1),
            end: items.results_per_page * items.page_no,
            total: items.count >= 10000 ? $t('paging_a_lot_of') : items.count,
          })
        }}
      </p>
    </div>
  </div>
</template>
