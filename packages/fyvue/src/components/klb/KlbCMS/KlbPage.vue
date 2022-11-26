<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import { rest } from '../../../utils/rest';
import { useHistory } from '../../../utils/ssr';
import type { KlbAPIContentCmsSingle } from '../../../dts/klb';
import { useHead } from '@vueuse/head';
import { useRoute } from 'vue-router';
import { useEventBus } from '../../../utils/helpers';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';
import Fy404View from '../../ui/Fy404/Fy404View.vue';
import KlbBlogInnerPost from './KlbBlogInnerPost.vue';
import type { SeoData } from '../../../dts/index';
import { useSeo } from '../../helpers/seo';
import { cropText } from '../../../utils/display';
const props = withDefaults(
  defineProps<{
    pagesAlias?: string;
  }>(),
  {
    pagesAlias: '@pages',
  }
);
const page = ref();
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
watch(
  () => route.params.slug,
  async (v) => {
    if (v) await getArticle(v.toString());
  }
);

const getArticle = async (slug: string) => {
  eventBus.emit('cmsBlog-loading', true);
  is404.value = false;

  resetSeo('article');

  const _data = await rest<KlbAPIContentCmsSingle>(
    `Content/Cms/${props.pagesAlias}:loadSlug`,
    'GET',
    {
      slug: slug,
      image_variation: [
        'strip&scale_crop=512x512&alias=squared',
        'strip&scale_crop=1280x100&alias=bannerx100',
        'strip&scale_crop=1200x630&alias=seo',
      ],
    }
  ).catch((err) => {
    if (err.code == 404) {
      useHistory().status = 404;
      is404.value = true;
      seo.value.title = '404';
    }
    eventBus.emit('cmsBlog-loading', false);
    return;
  });
  if (_data && _data.result == 'success') {
    page.value = _data;
    seo.value.published = new Date(
      parseInt(_data.data.content_cms_entry_data.Published.unixms)
    ).toISOString();
    seo.value.modified = new Date(
      parseInt(_data.data.content_cms_entry_data.Last_Modified.unixms)
    ).toISOString();
    seo.value.title = _data.data.content_cms_entry_data.Title;
    if (_data.data.content_cms_entry_data.Short_Contents) {
      seo.value.description = _data.data.content_cms_entry_data.Short_Contents;
    } else {
      /*seo.value.description = cropText(
        _data.data.content_cms_entry_data.Contents.replace(/(<([^>]+)>)/gi, ''),
        100,
        '...'
      );*/
    }
    if (_data.data.content_cms_entry_data.Keywords.length) {
      seo.value.keywords =
        _data.data.content_cms_entry_data.Keywords.join(',').trim();
    }
    if (
      _data.data.content_cms_entry_data.Top_Drive_Item &&
      _data.data.content_cms_entry_data.Top_Drive_Item.Media_Image &&
      _data.data.content_cms_entry_data.Top_Drive_Item.Media_Image.Variation
    ) {
      seo.value.imageType =
        _data.data.content_cms_entry_data.Top_Drive_Item.Mime;
      seo.value.image =
        _data.data.content_cms_entry_data.Top_Drive_Item.Media_Image?.Variation[
          'seo'
        ];
      seo.value.imageWidth = '1200';
      seo.value.imageHeight = '630';
    }
  }
  eventBus.emit('cmsBlog-loading', false);
};

await getArticle(route.params.slug.toString());
useSeo(seo);
</script>
<template>
  <div class="fv-relative klb-blog">
    <FyLoader id="cmspage" />
    <KlbBlogInnerPost
      v-if="page"
      :post="page.data.content_cms_entry_data"
      :single="true"
    />
    <div class="fv-typo" v-if="is404">
      <Fy404View />
    </div>
  </div>
</template>
