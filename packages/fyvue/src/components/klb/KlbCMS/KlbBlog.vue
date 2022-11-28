<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, WatchStopHandle } from 'vue';
import { rest } from '../../../utils/rest';
import { useHistory } from '../../../utils/ssr';
import type { FyVueBreadcrumb } from '../../../dts/index';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router';
import { useEventBus } from '../../../utils/helpers';
import { useTranslation } from '../../../utils/helpers';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';
import KlbBlogInnerPost from './KlbBlogInnerPost.vue';
import FyBreadcrumb from '../../ui/FyBreadcrumb/FyBreadcrumb.vue';
import FyPaging from '../../ui/FyPaging/FyPaging.vue';
import Fy404View from '../../ui/Fy404/Fy404View.vue';
import { useSeo } from '../../helpers/seo';
import type { SeoData } from '../../../dts/index';
import { useCMS } from './useCms';
import type { CMSDisplayType } from './useCms';
import type {
  KlbAPIClassify,
  KlbAPIContentCmsSingle,
  KlbAPIContentCmsSearch,
  KlbClassifyTag,
} from '../../../dts/klb';
import { SchemaOrgWebPage } from '@vueuse/schema-org/runtime';

const props = withDefaults(
  defineProps<{
    blogAlias?: string;
    basePath?: string;
    breadcrumbBase: FyVueBreadcrumb[];
    siteName: string;
  }>(),
  {
    blogAlias: '@news',
    basePath: '/blog',
  }
);

const route = useRoute();
const translate = useTranslation();
const blogName = ref<string>('');
const seo = ref<SeoData>({});
const is404 = ref<Boolean>(false);
const cats = ref<Array<KlbClassifyTag>>();
const data = ref<KlbAPIContentCmsSearch>();
const dataSingle = ref<KlbAPIContentCmsSingle>();
const displayType = ref<CMSDisplayType>('multiple');
const query = ref<string | undefined>();
const h1Mult = ref<string | undefined>();
const eventBus = useEventBus();
const breadcrumb = ref<Array<FyVueBreadcrumb>>([
  ...props.breadcrumbBase,
  { name: blogName.value },
]);
const slugWatcher = ref<WatchStopHandle>();
/*
const slugWatcher = watch(
  () => route.params.slug,
  (v) => {
    if (typeof v == 'string') checkRoute(v.toString());
  }
);*/

const getArticle = async (slug: string) => {
  eventBus.emit('cmsBlog-loading', true);
  await useCMS().getArticle(
    slug,
    props.basePath,
    props.blogAlias,
    props.siteName,
    props.breadcrumbBase,
    seo,
    is404,
    dataSingle,
    displayType,
    blogName,
    breadcrumb
  );
  eventBus.emit('cmsBlog-loading', false);
};

const getCategories = async (uuid) => {
  const _cats = await rest<KlbAPIClassify>(`Classify/${uuid}`, 'GET');
  if (_cats && _cats.result == 'success') {
    cats.value = _cats.data.Root_Tags;
  }
};

const getArticles = async (
  category: string | undefined,
  search: string | undefined,
  page: any = 1
) => {
  if (route.query.page) page = parseInt(route.query.page.toString());
  eventBus.emit('cmsBlog-loading', true);
  is404.value = false;
  displayType.value = 'multiple';
  h1Mult.value = undefined;
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
    type: 'blog',
  };

  const _data = await rest<KlbAPIContentCmsSearch>(
    `Content/Cms/${props.blogAlias}:search`,
    'GET',
    {
      page_no: page,
      results_per_page: 8,
      sort: 'published:desc',
      image_variation: 'strip&scale_crop=1280x160&alias=banner',
      query: {
        tag: category,
        all: search,
      },
    }
  ).catch((err) => {
    if (err.code == 404) {
      useHistory().status = 404;
      is404.value = true;
      seo.value.title = '404';
    }
    eventBus.emit('cmsBlog-loading', false);
  });
  if (search) {
    query.value = search;
  }
  if (_data && _data.result == 'success') {
    getCategories(_data.data.content_cms.Classify.Classify__);
    data.value = _data;
    blogName.value = _data.data.content_cms.Name;
    if (category) {
      breadcrumb.value = [
        ...props.breadcrumbBase,
        { name: blogName.value, to: props.basePath },
        { name: translate('klb_blog_category_breadcrumb', { category }) },
      ];
      seo.value.title = translate('klb_blog_category_breadcrumb', { category });
      seo.value.type = 'search';
      h1Mult.value = translate('klb_blog_category_breadcrumb', { category });
    } else if (search) {
      breadcrumb.value = [
        ...props.breadcrumbBase,
        { name: blogName.value, to: props.basePath },
        { name: translate('klb_blog_search_breadcrumb', { search }) },
      ];
      seo.value.title = translate('klb_blog_search_breadcrumb', { search });
      seo.value.type = 'search';
      h1Mult.value = translate('klb_blog_search_breadcrumb', { search });
    } else {
      breadcrumb.value = [...props.breadcrumbBase, { name: blogName.value }];
      seo.value.title = blogName.value;
    }
  }
  eventBus.emit('cmsBlog-loading', false);
};

const checkRoute = async (slug: string, page: number = 1) => {
  const args = slug.split('/');
  if (args.length == 1) {
    if (args[0] == '') {
      await getArticles(undefined, undefined, page);
    } else {
      await getArticle(args[0]);
    }
  } else if (args.length == 2) {
    if (args[0] == 'category') {
      await getArticles(args[1], undefined, page);
    } else if (args[0] == 'search') {
      await getArticles(undefined, args[1], page);
    }
  }
};
const checkRoutePage = async (page: number = 1) => {
  await checkRoute(route.params.slug.toString(), page);
};

await checkRoute(route.params.slug.toString());

onMounted(() => {
  eventBus.on('cmsPagingGoToPage', checkRoutePage);

  slugWatcher.value = watch(
    () => route.params.slug,
    (v) => {
      if (typeof v == 'string') checkRoute(v.toString());
    }
  );
});
onUnmounted(() => {
  eventBus.off('cmsPagingGoToPage', checkRoutePage);
  if (slugWatcher.value) {
    slugWatcher.value();
  }
});

useSeo(seo);
</script>
<template>
  <div class="klb-blog">
    <FyLoader id="cmsBlog" />

    <div
      v-if="displayType == 'multiple' && data && data.result"
      class="multiple"
    >
      <SchemaOrgWebPage :type="['CollectionPage', 'SearchResultsPage']" />
      <main>
        <FyBreadcrumb :nav="breadcrumb" />
        <h1 v-if="h1Mult" class="m-h1">{{ h1Mult }}</h1>
        <template
          v-for="(post, index) in data?.data.data"
          :key="post.Content_Cms_Entry__"
        >
          <KlbBlogInnerPost
            :post="post"
            :single="false"
            :basePath="basePath"
            :cms="data.data.content_cms"
          />
          <hr v-if="data && index != data?.data.data.length - 1" />
        </template>
        <div v-if="!data?.data.data.length" class="klb-post-container no-posts">
          <p>{{ $t('klb_blog_no_posts') }}</p>
        </div>
        <FyPaging
          v-if="data && data.paging"
          id="cmsPaging"
          :items="data.paging"
        />
      </main>

      <aside>
        <form
          class="search"
          @submit.prevent="
            () => {
              $router.push(`${basePath}/search/${query}`);
            }
          "
        >
          <MagnifyingGlassIcon class="searchIcon" />
          <input
            type="text"
            :placeholder="$t('klb_blog_search_placeholder')"
            v-model="query"
          />
        </form>
        <div class="widget" v-if="cats && cats.length">
          <h3>Categories</h3>
          <ul>
            <li v-for="cat in cats" :key="cat.Classify_Tag__">
              <RouterLink :to="`${basePath}/category/${cat.Full_Name}`">{{
                cat.Full_Name
              }}</RouterLink>
            </li>
          </ul>
        </div>
        <!--
        <div class="widget">
          <h3>Archives</h3>
        </div>-->
      </aside>
    </div>
    <main
      v-if="displayType == 'single' && dataSingle && dataSingle.result"
      class="single"
    >
      <KlbBlogInnerPost
        :post="dataSingle.data.content_cms_entry_data"
        :single="true"
        :basePath="basePath"
        :breadcrumbBase="breadcrumb"
        :cms="dataSingle.data.content_cms"
      />
    </main>
    <main v-if="is404" class="is-404">
      <Fy404View />
    </main>
  </div>
</template>
