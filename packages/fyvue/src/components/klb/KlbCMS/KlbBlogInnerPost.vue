<script setup lang="ts">
import type { KlbContentCms } from '../../../dts/klb';
import type { FyVueBreadcrumb } from '../../../dts/index';
import FyBreadcrumb from '../../ui/FyBreadcrumb/FyBreadcrumb.vue';
import type { KlbCms } from '../../../dts/klb';
import {
  CalendarDaysIcon,
  ChatBubbleBottomCenterIcon,
  PaperClipIcon,
  TagIcon,
} from '@heroicons/vue/24/solid';
import { SchemaOrgArticle } from '@vueuse/schema-org/runtime';

withDefaults(
  defineProps<{
    post: KlbContentCms;
    single?: boolean;
    basePath?: string;
    breadcrumbBase?: FyVueBreadcrumb[];
    cms: KlbCms;
    showFooter?: boolean;
  }>(),
  {
    single: true,
    basePath: '/blog',
    breadcrumbBase: () => [],
    showFooter: true,
  }
);
</script>
<template>
  <article v-if="post" :class="single ? 'is-single' : 'is-multiple'">
    <SchemaOrgArticle
      v-if="single"
      :headline="post.Title"
      :date-published="new Date(parseInt(post.Published.unixms)).toISOString()"
      :date-modified="
        new Date(parseInt(post.Last_Modified.unixms)).toISOString()
      "
      :description="post.Short_Contents ? post.Short_Contents : undefined"
      :image="
        post.Top_Drive_Item &&
        post.Top_Drive_Item.Media_Image &&
        post.Top_Drive_Item.Media_Image?.Variation
          ? post.Top_Drive_Item.Media_Image?.Variation['banner']
          : undefined
      "
    />
    <header class="entry-header" v-if="!single">
      <RouterLink :to="`${basePath}/${post.Slug}`" :title="post.Title">
        <figure
          class="post-thumbnail"
          v-if="
            post.Top_Drive_Item &&
            post.Top_Drive_Item.Media_Image &&
            post.Top_Drive_Item.Media_Image?.Variation
          "
        >
          <img
            :src="post.Top_Drive_Item.Media_Image?.Variation['banner']"
            :title="post.Title"
            :alt="post.Title"
          />
        </figure>
        <!--<div class="keywords" v-if="post.Keywords.length">
          <span class="tag" v-for="keyword in post.Keywords">{{
            keyword
          }}</span>
        </div>-->
        <h2 :class="post.Top_Drive_Item?.Media_Image ? 'title-has-pic' : ''">
          {{ post.Title }}
        </h2>
      </RouterLink>
    </header>
    <header
      v-else
      class="entry-header"
      :class="post.Top_Drive_Item?.Media_Image ? 'has-pic' : ''"
      :style="
        post.Top_Drive_Item &&
        post.Top_Drive_Item.Media_Image &&
        post.Top_Drive_Item.Media_Image?.Variation
          ? `background-image: url('${post.Top_Drive_Item.Media_Image?.Variation['bannerx100']}'); background-size: cover;`
          : ''
      "
    >
      <div class="h1-bg dark">
        <h1>{{ post.Title }}</h1>
        <FyBreadcrumb v-if="breadcrumbBase.length > 0" :nav="breadcrumbBase" />
      </div>
    </header>

    <div class="entry-main">
      <div class="entry-content">
        <div
          v-html="
            single || !post.Short_Contents
              ? post.Contents
              : '<p>' + post.Short_Contents + '</p>'
          "
        />
        <div v-if="!single && post.Short_Contents">
          <router-link :to="`${basePath}/${post.Slug}`">{{
            $t('klb_blog_readmore')
          }}</router-link>
        </div>
      </div>

      <footer class="entry-footer" v-if="showFooter">
        <span class="comments" v-if="post.Comments && cms.Type == 'article'">
          <ChatBubbleBottomCenterIcon />
          {{
            $t('klb_blog_comment_count', { count: post.Comments.Comment_Count })
          }}
        </span>

        <span class="published">
          <CalendarDaysIcon />
          <time
            class="entry-date published"
            :datetime="new Date(parseInt(post.Published.unixms)).toISOString()"
            >{{ $formatDate(post.Published.unixms) }}
          </time>
        </span>
        <span class="category" v-if="post.Tag_Category">
          <PaperClipIcon />
          <RouterLink
            :to="`${basePath}/category/${post.Tag_Category.Full_Name}`"
            >{{ post.Tag_Category.Full_Name }}</RouterLink
          >
        </span>
        <span class="category" v-if="post.Keywords && post.Keywords.length">
          <TagIcon />
          {{ post.Keywords.join(', ') }}
        </span>
        <span class="modified">
          <CalendarDaysIcon />
          <time
            class="updated"
            :datetime="
              new Date(parseInt(post.Last_Modified.unixms)).toISOString()
            "
            >{{ $formatDate(post.Last_Modified.unixms) }}
          </time>
        </span>
      </footer>
    </div>
  </article>
</template>
