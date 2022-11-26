<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted, onUnmounted } from 'vue';
import { rest } from '../../../utils/rest';
import { useHistory } from '../../../utils/ssr';
import type { FyVueBreadcrumb } from '../../../dts/index';
import { useHead } from '@vueuse/head';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router';
import { useEventBus } from '../../../utils/helpers';
import { useTranslation } from '../../../utils/helpers';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';
import KlbBlogInnerPost from './KlbBlogInnerPost.vue';
import FyBreadcrumb from '../../ui/FyBreadcrumb/FyBreadcrumb.vue';
import FyPaging from '../../ui/FyPaging/FyPaging.vue';
import type {
  KlbAPIClassify,
  KlbAPIContentCmsSingle,
  KlbAPIContentCmsSearch,
  KlbClassifyTag,
} from '../../../dts/klb';

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
const pageHead = reactive({
  title: `...`,
  ogImage: { name: 'og:image', content: '', key: 'image' },
});
const route = useRoute();
watch(
  () => (route.name == 'cmsNews' ? route.params.slug : false),
  async (v) => {
    if (v !== false) {
      await checkRoute(v.toString());
    }
  }
);

const translate = useTranslation();
const blogName = ref<string>('');
const is404 = ref<Boolean>(false);
const cats = ref<Array<KlbClassifyTag>>();
const data = ref<KlbAPIContentCmsSearch>();
const dataSingle = ref<KlbAPIContentCmsSingle>();
const displayType = ref<'multiple' | 'single'>('multiple');
const query = ref<string | undefined>();
const eventBus = useEventBus();
const breadcrumb = ref<Array<FyVueBreadcrumb>>([
  ...props.breadcrumbBase,
  { name: blogName.value },
]);
const getArticle = async (slug: string) => {
  eventBus.emit('cmsBlog-loading', true);
  is404.value = false;
  displayType.value = 'single';
  const _data = await rest<KlbAPIContentCmsSingle>(
    `Content/Cms/${props.blogAlias}:loadSlug`,
    'GET',
    {
      slug: slug,
      image_variation: [
        'strip&scale_crop=512x512&alias=squared',
        'strip&scale_crop=1280x100&alias=bannerx100',
      ],
    }
  ).catch((err) => {
    if (err.code == 404) {
      useHistory().status = 404;
      is404.value = true;
      pageHead.title = '404';
    }
    eventBus.emit('cmsBlog-loading', false);
  });
  if (_data && _data.result == 'success') {
    blogName.value = _data.data.content_cms.Name;
    breadcrumb.value = [
      ...props.breadcrumbBase,
      { name: blogName.value, to: props.basePath },
      { name: _data.data.content_cms_entry_data.Title },
    ];
    dataSingle.value = _data;
    //pageHead.title = data.value.data.content;
    pageHead.title =
      dataSingle.value.data.content_cms_entry_data.Title +
      ' - ' +
      blogName.value;
    if (
      dataSingle.value.data.content_cms_entry_data.Top_Drive_Item &&
      dataSingle.value.data.content_cms_entry_data.Top_Drive_Item.Media_Image &&
      dataSingle.value.data.content_cms_entry_data.Top_Drive_Item.Media_Image
        .Variation
    ) {
      pageHead.ogImage = {
        name: 'og:image',
        content:
          dataSingle.value.data.content_cms_entry_data.Top_Drive_Item
            .Media_Image?.Variation['squared'],
      };
    }
  }
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
  page: number = 1
) => {
  if (route.query.page) page = parseInt(route.query.page.toString());
  eventBus.emit('cmsBlog-loading', true);
  is404.value = false;
  displayType.value = 'multiple';

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
      pageHead.title = '404';
    }
    eventBus.emit('cmsBlog-loading', false);
  });
  if (search) {
    query.value = search;
  }
  if (_data && _data.result == 'success') {
    await getCategories(_data.data.content_cms.Classify.Classify__);
    data.value = _data;
    blogName.value = _data.data.content_cms.Name;
    if (category) {
      breadcrumb.value = [
        ...props.breadcrumbBase,
        { name: blogName.value, to: props.basePath },
        { name: translate('klb_blog_category_breadcrumb', { category }) },
      ];
      pageHead.title = translate('klb_blog_category_breadcrumb', { category });
    } else if (search) {
      breadcrumb.value = [
        ...props.breadcrumbBase,
        { name: blogName.value, to: props.basePath },
        { name: translate('klb_blog_search_breadcrumb', { search }) },
      ];
      pageHead.title = translate('klb_blog_search_breadcrumb', { search });
    } else {
      breadcrumb.value = [...props.breadcrumbBase, { name: blogName.value }];
      pageHead.title = blogName.value;
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

onMounted(() => {
  eventBus.on('cmsPagingGoToPage', checkRoutePage);
});
onUnmounted(() => {
  eventBus.off('cmsPagingGoToPage', checkRoutePage);
});
useHead({
  title: computed(() => `${pageHead.title} - ${props.siteName}`),
  meta: computed(() => {
    const _res = [
      {
        name: 'og:type',
        content: 'article',
      },
      {
        name: 'robots',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
    ];
    if (pageHead.ogImage.content != '') {
      _res.push(pageHead.ogImage);
    }
    return _res;
  }),
});

await checkRoute(route.params.slug.toString());
</script>
<template>
  <div class="klb-blog">
    <FyLoader id="cmsBlog" />

    <main v-if="displayType == 'multiple'" class="multiple">
      <div>
        <FyBreadcrumb :nav="breadcrumb" />

        <template
          v-for="(post, index) in data?.data.data"
          :key="post.Content_Cms_Entry__"
        >
          <KlbBlogInnerPost :post="post" :single="false" :basePath="basePath" />
          <hr v-if="data && index != data?.data.data.length - 1" />
        </template>
        <p v-if="data && data.data.data.length == 0">
          {{ $t('klb_blog_no_posts') }}
        </p>
        <FyPaging
          v-if="data && data.paging"
          id="cmsPaging"
          :items="data.paging"
        />
      </div>
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
    </main>
    <main v-if="displayType == 'single' && dataSingle" class="single">
      <KlbBlogInnerPost
        :post="dataSingle.data.content_cms_entry_data"
        :single="true"
        :basePath="basePath"
        :breadcrumbBase="breadcrumb"
      />
    </main>
  </div>
</template>
