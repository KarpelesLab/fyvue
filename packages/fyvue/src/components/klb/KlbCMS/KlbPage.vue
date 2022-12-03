<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import type { KlbAPIContentCmsSingle } from '../../../dts/klb';
import { useRoute } from 'vue-router';
import { useEventBus } from '../../../utils/helpers';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';
import Fy404View from '../../ui/Fy404/Fy404View.vue';
import KlbBlogInnerPost from './KlbBlogInnerPost.vue';
import type { SeoData } from '../../../dts/index';
import { useSeo } from '../../helpers/seo';
import { useCMS } from './useCms';
import type { WatchStopHandle } from 'vue';
import type { FyVueBreadcrumb } from '../../../dts/index';
const props = withDefaults(
  defineProps<{
    pagesAlias?: string;
    showFooter?: boolean;
    breadcrumbBase?: FyVueBreadcrumb[];
    forceSlug?: string;
  }>(),
  {
    pagesAlias: '@pages',
    showFooter: true,
    breadcrumbBase: () => [],
  }
);
const slugWatcher = ref<WatchStopHandle>();

const page = ref<KlbAPIContentCmsSingle>();
const route = useRoute();
const is404 = ref<Boolean>(false);
const eventBus = useEventBus();

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

const resetSeo = (type: 'blog' | 'search' | 'article' = 'blog') => {
  seo.value = {
    title: undefined,
    image: undefined,
    imageType: undefined,
    description: undefined,
    published: undefined,
    modified: undefined,
    keywords: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    type: type,
  };
};

const getArticle = async (slug: string) => {
  eventBus.emit('cmsPage-loading', true);
  await useCMS().getArticle(
    slug,
    '',
    props.pagesAlias,
    '',
    [],
    seo,
    is404,
    page
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
      :breadcrumbBase="breadcrumbBase"
      :isPage="true"
    />
    <div class="fv-typo" v-if="is404">
      <Fy404View />
    </div>
  </div>
</template>
