<script setup lang="ts">
import type { KlbContentCms, KlbAPIComments } from '../../KlbApiTypes';
import { rest } from '../../helpers/rest';
import { ref } from 'vue';

/*
import type { FyVueBreadcrumb } from '../../../dts/index';
import FyBreadcrumb from '../../ui/FyBreadcrumb/FyBreadcrumb.vue';
import type { KlbCms } from '../../../dts/klb';
import {
  CalendarDaysIcon,
  ChatBubbleBottomCenterIcon,
  PaperClipIcon,
  TagIcon,
} from '@heroicons/vue/24/solid';*/
import { onMounted } from 'vue';
const props = withDefaults(
  defineProps<{
    post: KlbContentCms;
  }>(),
  {}
);
const comments = ref<KlbAPIComments>();

/*
const postComment = async (message: string) => {
  const _res = await rest<KlbAPIComments>(
    `Content/Cms/Entry/${props.post.Content_Cms_Entry__}:comment`,
    'POST',
    { message }
  );
  console.log(_res);
};*/

const getComments = async (page: number = 1) => {
  if (!props.post.Comments?.Commented) return;
  const _res = await rest<KlbAPIComments>(`Social/Comment/`, 'GET', {
    key: props.post.Comments.Key,
    page_no: page,
    results_per_page: 10,
  });
  if (_res && _res.result == 'success') {
    comments.value = _res;
  }
};
onMounted(async () => {
  await getComments();
});
</script>
<template>
  <!--<button @click="postComment('Test comment :')">test</button>-->
  <div class="fv-comments fv-typo" v-if="comments">
    <hr />
    <h3>Replies</h3>
    <section
      v-for="comment in comments.data"
      :key="comment.Social_Comment__"
      class="card-container mb-2"
    >
      <div class="comment-header">
        {{ comment.Profile.Display_Name }} &bull;

        <small>
          <time
            class="entry-date published"
            :datetime="new Date(parseInt(comment.Date.unixms)).toISOString()"
            >{{ $formatDatetime(comment.Date.unixms) }}
          </time>
        </small>
      </div>
      <p>{{ comment.Message }}</p>
    </section>
  </div>
</template>
