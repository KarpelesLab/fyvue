<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { KLBPaging } from '../../../dts/klb';
import { useEventBus } from '../../../utils/helpers';

const props = defineProps<{
  items: KLBPaging;
  id: string;
}>();

const eventBus = useEventBus();
const route = useRoute();
const router = useRouter();
const getRoutePage = () => {
  if (route && route.query) {
    return route.query.page?.toString() || '1';
  }
  return '1';
};
const isNewPage = (page: number) => {
  return (
    page >= 1 && page <= props.items.page_max && page != props.items.page_no
  );
};
const next = () => {
  const page = props.items.page_no + 1;
  if (!isNewPage(page)) return;
  router
    .push({
      path: route.path,
      query: { page: page },
    })
    .then(() => {
      eventBus.emit(`${props.id}GoToPage`, page);
    });
};
const prev = () => {
  const page = props.items.page_no - 1;
  if (!isNewPage(page)) return;
  router
    .push({
      path: route.path,
      query: { page: page },
    })
    .then(() => {
      eventBus.emit(`${props.id}GoToPage`, page);
    });
};
const page = (page: number) => {
  if (!isNewPage(page)) return;
  router
    .push({
      path: route.path,
      query: { page: page },
    })
    .then(() => {
      eventBus.emit(`${props.id}GoToPage`, page);
    });
};

onMounted(() => {
  const routePage = parseInt(getRoutePage());

  if (!isNaN(routePage) && props.items) {
    eventBus.emit(`${props.id}GoToPage`, routePage);
  }
});
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
