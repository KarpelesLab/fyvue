<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import type { KlbAPIContentCmsSingle } from '../../KlbApiTypes';
import { useRoute } from 'vue-router';
import { useEventBus } from '@fy-/core';
import KlbBlogInnerPost from './KlbBlogInnerPost.vue';
import type { SeoData } from '../../types';
import { useSeo } from '../../../misc/seo';
import { useCMS } from './useCms';
import { BreadcrumbLink } from '@fy-/ui';
import type { WatchStopHandle } from 'vue';

const props = withDefaults(
  defineProps<{
    pagesAlias?: string;
    showFooter?: boolean;
    breadcrumbBase?: BreadcrumbLink[];
    forceSlug?: string;
    isPage?: boolean;
    replaceInContent?: Function;
  }>(),
  {
    pagesAlias: '@pages',
    showFooter: true,
    breadcrumbBase: () => [],
    isPage: true,
  }
);
const slugWatcher = ref<WatchStopHandle>();

const page = ref<KlbAPIContentCmsSingle>();
const route = useRoute();
const is404 = ref<Boolean>(false);
const eventBus = useEventBus();
const breadcrumb = ref<Array<BreadcrumbLink>>([...props.breadcrumbBase]);
const seo = ref<SeoData>({
  title: undefined,
  image: undefined,
  imageType: undefined,
  description: undefined,
  published: undefined,
  modified: undefined,
  keywords: undefined,
  type: 'blog',
});

const getArticle = async (slug: string) => {
  eventBus.emit('cmsPage-loading', true);
  await useCMS().getArticle(
    slug,
    '',
    props.pagesAlias,
    '',
    props.breadcrumbBase,
    seo,
    is404,
    page,
    undefined,
    undefined,
    breadcrumb
  );
  eventBus.emit('cmsPage-loading', false);
};

await getArticle(
  props.forceSlug ? props.forceSlug : route.params.slug.toString()
);

onMounted(() => {
  if (!props.forceSlug) {
    slugWatcher.value = watch(
      () => route.params.slug,
      (v) => {
        if (typeof v == 'string' && v != '') getArticle(v.toString());
      }
    );
  }
});
onUnmounted(() => {
  if (slugWatcher.value) slugWatcher.value();
});
useSeo(seo);
</script>
<template>
  <div class="fv-relative klb-blog">
    <FyLoader id="cmsPage" />
    <KlbBlogInnerPost
      v-if="page"
      :post="page.data.content_cms_entry_data"
      :cms="page.data.content_cms"
      :single="true"
      :showFooter="showFooter"
      :breadcrumbBase="breadcrumb"
      :isPage="isPage"
      :replaceInContent="replaceInContent"
    />
    <div class="fv-typo" v-if="is404">
      <FyError404 />
    </div>
  </div>
</template>
